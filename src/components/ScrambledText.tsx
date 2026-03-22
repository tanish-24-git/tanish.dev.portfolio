export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

import React, { useEffect, useRef } from 'react';

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  
  // Custom non-premium scramble effect
  useEffect(() => {
    if (!rootRef.current) return;
    
    const container = rootRef.current.querySelector('p');
    if (!container) return;
    
    // Simple custom split
    const originalText = container.textContent || '';
    container.innerHTML = '';
    
    const chars: HTMLElement[] = [];
    for (let i = 0; i < originalText.length; i++) {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = originalText[i];
        span.dataset.content = originalText[i];
        span.style.display = 'inline-block';
        if (originalText[i] === ' ') {
            span.style.width = '0.3em'; // preserve space width
        }
        container.appendChild(span);
        chars.push(span);
    }
    
    const maxCharsStr = scrambleChars;
    
    const handleMove = (e: PointerEvent) => {
      chars.forEach((c) => {
        const rect = c.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
            // Start simple scramble animation
            const originalChar = c.dataset.content || '';
            if (originalChar === ' ') return; // don't scramble spaces
            
            // Random duration based on distance
            const animDuration = duration * (1 - dist / radius) * 1000;
            const endTime = Date.now() + animDuration;
            
            clearInterval((c as any).scrambleInterval);
            
            (c as any).scrambleInterval = setInterval(() => {
                if (Date.now() > endTime) {
                    clearInterval((c as any).scrambleInterval);
                    c.textContent = originalChar;
                } else {
                    if (Math.random() < speed) {
                        c.textContent = maxCharsStr[Math.floor(Math.random() * maxCharsStr.length)];
                    }
                }
            }, 50);
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
      chars.forEach(c => clearInterval((c as any).scrambleInterval));
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p style={{ margin: 0 }}>{children}</p>
    </div>
  );
};

export default ScrambledText;
