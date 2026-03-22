import React, { useState, useRef, useEffect } from 'react';
import LetterGlitch from './LetterGlitch';
import CardNav from './CardNav';
import Shuffle from './Shuffle';
import PortfolioSections from './PortfolioSections';
import Footer from './Footer';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
import { ReactLenis } from 'lenis/react';

export default function LandingPage() {
  const [currentView, setCurrentView] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // This tall wrapper gives us the scroll distance to animate against
  const heroWrapperRef = useRef<HTMLDivElement>(null);

  // Tracks scroll from top of wrapper to its bottom leaving the viewport
  const { scrollYProgress } = useScroll({
    target: heroWrapperRef,
    offset: ['start start', 'end start'],
  });

  // Spring smooth for a premium cinematic feel
  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.001,
  });

  // === Image: Maps to About placeholder + flips around ===
  const targetX = isMobile ? '0vw' : '25.5vw'; // Exact grid right col alignment prediction
  const targetY = isMobile ? '80vh' : '108vh'; // Exact grid vertical alignment prediction

  // Dead zone [0, 0.15] makes it feel completely steady on accidental tiny scrolls
  const imageX       = useTransform(smooth, [0, 0.15, 1], ['0vw', '0vw', targetX]);
  const imageY       = useTransform(smooth, [0, 0.15, 1], ['0vh', '0vh', targetY]);
  const imageRotateY = useTransform(smooth, [0, 0.15, 1], [0, 0, 180]);
  const imageScale   = useTransform(smooth, [0, 0.15, 1], [1, 1, 1]);
  const imageOpacity = useTransform(smooth, [0, 0.99, 1], [1, 1, 0]); // Hand off at the last frame

  // Hard toggles for faces to cleanly snap between overlay and base (prevents transparent ghosting)
  // Flip midpoint is exactly halfway between 0.15 and 1.0 (0.575)
  const frontOpacity = useTransform(smooth, [0, 0.574, 0.575, 1], [1, 1, 0, 0]);
  const backOpacity  = useTransform(smooth, [0, 0.575, 0.576, 1], [0, 0, 1, 1]);

  useMotionValueEvent(smooth, "change", (latest) => {
    if (currentView !== 'home') return;
    const el = document.getElementById('about-static-image');
    if (el) {
      el.style.opacity = latest >= 0.99 ? '1' : '0';
    }
  });

  // === Text: splits apart as image leaves ===
  const leftX     = useTransform(smooth, [0, 0.15, 1], ['0px', '0px', '-80px']);
  const rightX    = useTransform(smooth, [0, 0.15, 1], ['0px', '0px',  '80px']);
  const textFade  = useTransform(smooth, [0, 0.15, 0.5], [1, 1, 0]);

  const handleNavClick = (label: string) => {
    const viewName = label.toLowerCase();
    if (viewName === 'about' || viewName === 'contacts') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(viewName);
        if (el) {
          if (lenisRef.current?.lenis) {
            lenisRef.current.lenis.scrollTo(el, { duration: 1.5 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      setCurrentView(viewName);
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }
  };

  return (
    <ReactLenis root ref={lenisRef} autoRaf={true} options={{ lerp: 0.05 }}>
      <div className="relative w-full text-white font-outfit flex flex-col">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none">
        <div className="w-full max-w-[800px] pointer-events-auto mt-[2em]">
          <CardNav onItemClick={handleNavClick} />
        </div>
      </div>

      {currentView === 'home' && (
        <div ref={heroWrapperRef} id="hero" className="relative z-[50] h-screen w-full bg-black flex flex-col">
          {/* Background Glitch */}
          <div className="absolute inset-0 z-0 opacity-30">
            <LetterGlitch
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={false}
              smooth={true}
            />
          </div>

            {/* 3-column hero layout */}
            <main className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center w-full max-w-[1600px] mx-auto px-4 md:px-10 mt-16 md:mt-0 gap-8 md:gap-0">

              {/* LEFT — HI I'M + TANISH */}
              <motion.div
                style={{ x: leftX, opacity: textFade }}
                className="flex-1 flex flex-col items-center md:items-end justify-center w-full md:pr-10 z-20 min-w-0"
              >
                <Shuffle
                  text="HI I'M"
                  tag="h1"
                  stagger={40}
                  scrambleDuration={350}
                  triggerOnHover={true}
                  waitLoading={true}
                  textAlign="left"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 6rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    cursor: 'default',
                  }}
                />
                <Shuffle
                  text="TANISH"
                  tag="h1"
                  stagger={40}
                  scrambleDuration={350}
                  triggerOnHover={true}
                  waitLoading={true}
                  textAlign="right"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 6rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    cursor: 'default',
                  }}
                />
              </motion.div>

              {/* CENTER IMAGE — Flips to base.jpeg as it scrolls */}
              <div style={{ perspective: '1500px' }} className="relative z-30 flex-shrink-0">
                <motion.div
                  style={{
                    x: imageX,
                    y: imageY,
                    scale: imageScale,
                    rotateY: imageRotateY,
                    opacity: imageOpacity,
                    transformStyle: 'preserve-3d'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="w-[80vw] md:w-[35vw] max-w-[480px] aspect-[3/4] relative rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.9)] border border-white/10"
                >
                  <motion.div className="absolute inset-0" style={{ opacity: frontOpacity, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                    <img
                      src="/about/overlay.png"
                      alt="Tanish Jagtap Overlay"
                      className="w-full h-full object-cover object-center rounded-[2rem] overflow-hidden"
                    />
                  </motion.div>
                  <motion.div className="absolute inset-0" style={{ opacity: backOpacity, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <img
                      src="/about/base.jpeg"
                      alt="Tanish Jagtap Base"
                      className="w-full h-full object-cover object-center rounded-[2rem] overflow-hidden"
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* RIGHT — AI ENGINEER + JAGTAP */}
              <motion.div
                style={{ x: rightX, opacity: textFade }}
                className="flex-1 flex flex-col items-center md:items-start justify-center w-full md:pl-10 z-20 min-w-0"
              >
                <span className="text-white/80 text-[0.65rem] md:text-[0.75rem] tracking-[0.2em] uppercase font-semibold mb-3 md:text-left text-center w-full">
                  Ai Engineer
                </span>
                <Shuffle
                  text="JAGTAP"
                  tag="h1"
                  stagger={40}
                  scrambleDuration={350}
                  triggerOnHover={true}
                  waitLoading={true}
                  textAlign="left"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 7rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    cursor: 'default',
                  }}
                />
              </motion.div>

            </main>

            {/* Scroll hint */}
            <motion.div
              style={{ opacity: textFade }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute bottom-12 w-full flex flex-col items-center justify-center animate-bounce cursor-pointer z-10"
              onClick={() => {
                const el = document.getElementById('about');
                if (el) {
                  if (lenisRef.current?.lenis) {
                    lenisRef.current.lenis.scrollTo(el, { duration: 1.5 });
                  } else {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              <span className="text-xs tracking-[0.2em] uppercase mb-2 font-medium opacity-70">Scroll down</span>
              <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>

          </div>
      )}

      {/* Portfolio sections (sticky card stacking) */}
      <PortfolioSections currentView={currentView} onGoHome={() => setCurrentView('home')} />

      {/* Footer */}
      <Footer />
    </div>
    </ReactLenis>
  );
}
