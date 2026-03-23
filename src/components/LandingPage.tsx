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

  // Keep opacity in sync in case motion value doesn't fire a 'change' when remounting/switching to home
  useEffect(() => {
    if (currentView === 'home') {
      const el = document.getElementById('about-static-image');
      if (el) {
        el.style.opacity = smooth.get() >= 0.99 ? '1' : '0';
      }
    }
  }, [currentView, smooth]);

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

      {/* Hero section is always mounted to preserve useScroll refs, but hidden when not 'home' */}
      <div 
        ref={heroWrapperRef} 
        id="hero" 
        className={`relative z-[50] min-h-screen w-full bg-black flex flex-col ${currentView === 'home' ? 'flex' : 'hidden'}`}
      >


        {/* NEW LEFT SIDEBAR FOR HOME */}
        <div className="absolute top-0 left-0 w-[80px] h-full bg-[#080d0b]/85 backdrop-blur-md border-r border-[#12241d]/50 hidden lg:flex flex-col justify-between items-center py-8 z-[100] pointer-events-auto">
          <div className="w-8 h-8 flex flex-col justify-center items-end gap-[5px] cursor-pointer hover:opacity-70 transition-opacity mt-2">
            <div className="w-full h-[2px] bg-[#61dca3]"></div>
            <div className="w-[60%] h-[2px] bg-[#61dca3]"></div>
            <div className="w-full h-[2px] bg-[#61dca3]"></div>
          </div>
          <div className="flex flex-col gap-14 text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-white/50 pb-8">
            <span className="-rotate-90 cursor-pointer hover:text-[#61dca3] transition-all duration-300 flex items-center justify-center w-4 h-4">Tw</span>
            <span className="-rotate-90 cursor-pointer hover:text-[#61dca3] transition-all duration-300 flex items-center justify-center w-4 h-4">In</span>
            <span className="-rotate-90 cursor-pointer hover:text-[#61dca3] transition-all duration-300 flex items-center justify-center w-4 h-4">Fb</span>
          </div>
        </div>

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
                className="w-full shrink-0 md:flex-1 flex flex-col items-center md:items-end justify-center md:pr-10 z-20 min-w-0"
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

              {/* RIGHT — Artoo Sidebar Text (Replaces AI Engineer) */}
              <motion.div
                style={{ x: rightX, opacity: textFade }}
                className="w-full shrink-0 md:flex-1 flex flex-col items-center md:items-start justify-center md:pl-10 z-20 min-w-0 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 max-w-[320px] text-left">
                  <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1.5 min-w-[max-content] rounded-sm text-[0.65rem] font-medium tracking-wide text-white/80 border border-white/5 backdrop-blur-sm cursor-default">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                    <span>Explore 3D Art Creations</span>
                  </div>
                  <h2 className="text-3xl lg:text-[2.5rem] font-semibold leading-[1.1] text-white tracking-tight mt-1">
                    Shape the Future<br/>with Artoo
                  </h2>
                  <p className="text-[0.8rem] text-white/60 leading-[1.7] mt-1 font-light pr-2">
                    Dive into a collection of stunning 3D models and designs crafted with Artoo software, tailored for the modern digital artist.
                  </p>
                  <button className="bg-white/10 hover:bg-white/20 transition-all duration-300 border border-transparent hover:border-white/20 px-8 py-3 text-[0.8rem] font-medium w-fit text-white rounded-sm mt-3">
                    Start your work
                  </button>
                </div>
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

            {/* Bottom Info Strip for Home view */}
            <motion.div 
              style={{ opacity: textFade }}
              className="absolute bottom-0 left-0 lg:left-[80px] right-0 bg-[#080d0b]/85 backdrop-blur-md border-t border-[#12241d]/50 z-20 hidden lg:flex h-36 mt-auto pointer-events-auto"
            >
              {/* Left: Events */}
              <div className="flex-[1.5] flex flex-col justify-center px-10 border-r border-[#12241d]/50">
                <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[#61dca3] opacity-90 mb-3">Events</span>
                <div className="flex gap-16 text-white/80">
                  <div>
                    <p className="text-[0.8rem] font-medium hover:text-[#61dca3] transition-colors cursor-default">SF - 3D Art Workshop, Aug 12, 5-7 PM</p>
                    <p className="text-[0.65rem] text-white/40 mt-1">Created by @darshan Ui Ux Designer</p>
                  </div>
                  <div>
                    <p className="text-[0.8rem] font-medium hover:text-[#61dca3] transition-colors cursor-default">Live VR Session - Aug 15, 6-8 PM.</p>
                    <p className="text-[0.65rem] text-white/40 mt-1">For @Xyz tec company</p>
                  </div>
                </div>
                <span className="text-[#61dca3]/50 mt-2 text-sm">...</span>
              </div>
              
              {/* Center Card */}
              <div className="w-36 h-full relative overflow-hidden flex items-center justify-center p-0 border-r border-[#12241d]/50 bg-[#0a1411] bg-cover bg-center">
                <img src="/about/lego_neo.jpeg" alt="Lego Neo" className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500" />
              </div>
              
              {/* Right: News */}
              <div className="flex-1 flex flex-col justify-center px-10">
                <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[#61dca3] opacity-90 mb-3">News</span>
                <div>
                  <p className="text-[0.8rem] font-medium hover:text-[#61dca3] transition-colors cursor-default">Meet Artist of the Month: @Alex Chen</p>
                  <p className="text-[0.7rem] text-white/60 mt-1 max-w-[400px]">Discover Alex's stunning 3D worlds created with Artoo. Read More for an exclusive interview.</p>
                  <span className="text-[0.7rem] font-medium text-[#61dca3] hover:text-[#61b3dc] cursor-pointer inline-block mt-2 transition-colors">Read More...</span>
                </div>
              </div>
            </motion.div>

          </div>

      {/* Portfolio sections (sticky card stacking) */}
      <PortfolioSections currentView={currentView} onGoHome={() => setCurrentView('home')}>
        {/* Footer */}
        <Footer />
      </PortfolioSections>
    </div>
    </ReactLenis>
  );
}
