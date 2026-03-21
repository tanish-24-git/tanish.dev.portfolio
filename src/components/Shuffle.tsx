import React, { useEffect, useRef, useState } from 'react';
import './Shuffle.css';

export interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  scrambleDuration?: number;
  triggerOnHover?: boolean;
  loopInterval?: number; // ms between auto-replays, 0 = disabled
  waitLoading?: boolean; // if true, waits for 'loading-complete' event before playing for the first time
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onShuffleComplete?: () => void;
}

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*0123456789';

const Shuffle: React.FC<ShuffleProps> = ({
  text,
  className = '',
  style = {},
  stagger = 35,
  scrambleDuration = 380,
  triggerOnHover = true,
  loopInterval = 0,
  waitLoading = false,
  tag: Tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chars = Array.from(text);
  const [display, setDisplay] = useState<string[]>(chars.map(() => ''));
  const animRunning = useRef(false);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);
  const loopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopAll = () => {
    intervals.current.forEach(clearInterval);
    intervals.current = [];
  };

  const playAnimation = () => {
    if (animRunning.current) return;
    animRunning.current = true;
    stopAll();
    setDisplay(chars.map(() => ''));

    let settledCount = 0;
    const nonSpaceCount = chars.filter(c => c !== ' ').length;

    chars.forEach((realChar, i) => {
      if (realChar === ' ') {
        setTimeout(() => {
          setDisplay(prev => { const n = [...prev]; n[i] = ' '; return n; });
        }, i * stagger);
        return;
      }

      setTimeout(() => {
        // Scramble
        const intv = setInterval(() => {
          const randChar = CHARSET[Math.floor(Math.random() * CHARSET.length)];
          setDisplay(prev => { const n = [...prev]; n[i] = randChar; return n; });
        }, 40);
        intervals.current.push(intv);

        // Land on real char
        setTimeout(() => {
          clearInterval(intv);
          setDisplay(prev => { const n = [...prev]; n[i] = realChar; return n; });
          settledCount++;
          if (settledCount === nonSpaceCount) {
            animRunning.current = false;
            onShuffleComplete?.();
            // Schedule next loop
            if (loopInterval > 0) {
              loopTimer.current = setTimeout(() => {
                playAnimation();
              }, loopInterval);
            }
          }
        }, scrambleDuration);
      }, i * stagger);
    });
  };

  // Trigger on viewport entry OR loading event
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleLoaded = () => {
      playAnimation();
    };

    if (waitLoading) {
      // Subscribe to global loading event
      window.addEventListener('loading-complete', handleLoaded);
    } else {
      // Standard IntersectionObserver logic
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            playAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      
      return () => observer.disconnect();
    }

    return () => {
      window.removeEventListener('loading-complete', handleLoaded);
      if (loopTimer.current) clearTimeout(loopTimer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitLoading]);

  const handleHover = () => {
    if (!animRunning.current) playAnimation();
  };

  /* We render a wrapper <div> then use `Tag` as the actual heading element.
     This keeps TypeScript happy while still using the correct semantic tag. */
  return (
    <div ref={containerRef} style={{ display: 'inline' }}>
      <Tag
        className={`shuffle-parent is-ready ${className}`.trim()}
        style={{ textAlign, ...style }}
        onMouseEnter={triggerOnHover ? handleHover : undefined}
      >
        {chars.map((realChar, i) => {
          const isSpace = realChar === ' ';
          const shown = display[i];
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                width: isSpace ? '0.3em' : undefined,
                minWidth: isSpace ? undefined : '0.55ch',
                textAlign: 'center',
                opacity: shown === '' ? 0 : 1,
                transition: 'opacity 0.06s',
              }}
            >
              {isSpace ? '\u00A0' : (shown || realChar)}
            </span>
          );
        })}
      </Tag>
    </div>
  );
};

export default Shuffle;
