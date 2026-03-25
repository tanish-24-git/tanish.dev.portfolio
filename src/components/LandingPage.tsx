import React, { useState, useRef, useEffect } from 'react';
import LetterGlitch from './LetterGlitch';
import Shuffle from './Shuffle';
import PortfolioSections from './PortfolioSections';
import Footer from './Footer';
import SidebarMargin from './SidebarMargin';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { ReactLenis } from 'lenis/react';

export default function LandingPage() {
  const [currentView, setCurrentView] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('home');
  const lenisRef = useRef<any>(null);

  const sectionThemes: Record<string, { bg: string; accent: string }> = {
    home:     { bg: 'rgba(0, 0, 0, 0.95)',  accent: '#61dca3' }, // Sleek black theme
    about:    { bg: 'rgba(0, 0, 0, 0.95)',   accent: '#ffffff' }, // White/monochrome theme
    awards:   { bg: 'rgba(17, 17, 17, 0.95)', accent: '#9ca3af' }, // Grey
    blogs:    { bg: 'rgba(26, 26, 26, 0.95)', accent: '#9ca3af' }, // Grey
    project:  { bg: 'rgba(34, 34, 34, 0.95)', accent: '#9ca3af' }, // Grey
    contacts: { bg: 'rgba(45, 45, 45, 0.95)', accent: '#9ca3af' }, // Grey
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'awards', 'blogs', 'project', 'contacts'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id === 'hero' ? 'home' : entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.3 }
    );

    // Timeout ensures elements are mounted before observing
    setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, [currentView]);

  const effectiveThemeId = currentView === 'home' ? activeSectionId : currentView;
  const currentTheme = sectionThemes[effectiveThemeId] || sectionThemes.home;

  const heroWrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroWrapperRef,
    offset: ['start start', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.001,
  });

  const targetX = isMobile ? '0vw' : '25.5vw';
  const targetY = isMobile ? '80vh' : '108vh';

  const imageX       = useTransform(smooth, [0, 0.15, 1], ['0vw', '0vw', targetX]);
  const imageY       = useTransform(smooth, [0, 0.15, 1], ['0vh', '0vh', targetY]);
  const imageRotateY = useTransform(smooth, [0, 0.15, 1], [0, 0, 180]);
  const imageScale   = useTransform(smooth, [0, 0.15, 1], [1, 1, 1]);
  const imageOpacity = useTransform(smooth, [0, 0.99, 1], [1, 1, 0]);

  const frontOpacity = useTransform(smooth, [0, 0.574, 0.575, 1], [1, 1, 0, 0]);
  const backOpacity  = useTransform(smooth, [0, 0.575, 0.576, 1], [0, 0, 1, 1]);

  useMotionValueEvent(smooth, "change", (latest) => {
    if (currentView !== 'home') return;
    const el = document.getElementById('about-static-image');
    if (el) el.style.opacity = latest >= 0.99 ? '1' : '0';
  });

  useEffect(() => {
    if (currentView === 'home') {
      const el = document.getElementById('about-static-image');
      if (el) el.style.opacity = smooth.get() >= 0.99 ? '1' : '0';
    }
  }, [currentView, smooth]);

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

        <div 
          ref={heroWrapperRef} 
          id="hero" 
          className={`relative z-[50] min-h-screen w-full bg-black flex-col ${currentView === 'home' ? 'flex' : 'hidden'}`}
        >
          {currentView === 'home' && (
            <SidebarMargin 
              onOpen={() => setIsSidebarOpen(true)} 
              accentColor={currentTheme.accent}
            />
          )}

          <div className="absolute inset-0 z-0 opacity-30">
            <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={false} smooth={true} />
          </div>

          <main className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center w-full max-w-[1600px] mx-auto px-4 md:px-10 mt-16 md:mt-0 gap-8 md:gap-0">
            <motion.div
              style={{ x: leftX, opacity: textFade }}
              className="w-full shrink-0 md:flex-1 flex flex-col items-center md:items-end justify-center md:pr-10 z-20 min-w-0"
            >
              <Shuffle text="HI I'M" tag="h1" stagger={40} scrambleDuration={350} triggerOnHover={true} waitLoading={true} textAlign="left"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1, whiteSpace: 'nowrap', cursor: 'default' }}
              />
              <Shuffle text="TANISH" tag="h1" stagger={40} scrambleDuration={350} triggerOnHover={true} waitLoading={true} textAlign="right"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1, whiteSpace: 'nowrap', cursor: 'default' }}
              />
            </motion.div>

            <div style={{ perspective: '1500px' }} className="relative z-30 flex-shrink-0">
              <motion.div
                style={{ x: imageX, y: imageY, scale: imageScale, rotateY: imageRotateY, opacity: imageOpacity, transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
                className="w-[80vw] md:w-[35vw] max-w-[480px] aspect-[3/4] relative rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.9)] border border-white/10"
              >
                <motion.div className="absolute inset-0" style={{ opacity: frontOpacity, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                  <img src="/about/overlay.png" alt="Tanish Jagtap Overlay" className="w-full h-full object-cover object-center rounded-[2rem] overflow-hidden" />
                </motion.div>
                <motion.div className="absolute inset-0" style={{ opacity: backOpacity, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <img src="/about/base.jpeg" alt="Tanish Jagtap Base" className="w-full h-full object-cover object-center rounded-[2rem] overflow-hidden" />
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              style={{ x: rightX, opacity: textFade }}
              className="w-full shrink-0 md:flex-1 flex flex-col items-center md:items-start justify-center md:pl-10 z-20 min-w-0 pointer-events-auto"
            >
              <div className="flex flex-col gap-4 max-w-[320px] text-left">
                <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1.5 min-w-[max-content] rounded-sm text-[0.65rem] font-medium tracking-wide text-white/80 border border-white/5 backdrop-blur-sm cursor-default">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                  <span>AI Engineer</span>
                </div>
                <h2 className="text-3xl lg:text-[2.5rem] font-semibold leading-[1.1] text-white tracking-tight mt-1">Building AI that<br/>actually does things</h2>
                <p className="text-[0.8rem] text-white/60 leading-[1.7] mt-1 font-light pr-2">Stacking attention over layers but I care more about what happens after the forward pass.</p>
                <button className="bg-white/10 hover:bg-white/20 transition-all duration-300 border border-transparent hover:border-white/20 px-8 py-3 text-[0.8rem] font-medium w-fit text-white rounded-sm mt-3">Send a Message</button>
              </div>
            </motion.div>
          </main>

          <motion.div style={{ opacity: textFade }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-12 w-full flex flex-col items-center justify-center animate-bounce cursor-pointer z-10"
            onClick={() => {
              const el = document.getElementById('about');
              if (el) {
                if (lenisRef.current?.lenis) lenisRef.current.lenis.scrollTo(el, { duration: 1.5 });
                else el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="text-xs tracking-[0.2em] uppercase mb-2 font-medium opacity-70">Scroll down</span>
            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </motion.div>


        </div>

        <PortfolioSections 
          currentView={currentView} 
          onGoHome={() => setCurrentView('home')} 
          onOpenSidebar={() => setIsSidebarOpen(true)}
          accentColor={currentTheme.accent}
        >
          <Footer />
        </PortfolioSections>

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '-100%' }}
              transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
              style={{ backgroundColor: currentTheme.bg }}
              className="fixed inset-0 z-[500] backdrop-blur-xl flex flex-col"
            >
              <div className={`flex justify-between items-center px-10 py-8 border-b border-white/10`}>
                <div className="font-bold text-xl tracking-wider" style={{ color: currentTheme.accent }}>tanish.dev</div>
                <button 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="flex items-center gap-2 text-white/70 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300"
                  onMouseEnter={(e) => (e.currentTarget.style.color = currentTheme.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  <span>Close</span>
                </button>
              </div>
              
              <div className="flex-1 flex flex-col justify-center items-start px-12 md:px-24 gap-4">
                {['Home', 'About', 'Awards', 'Blogs', 'Project', 'Contacts'].map((item, index) => (
                  <motion.a
                    key={item} href={`#${item.toLowerCase()}`}
                    onClick={(e) => { e.preventDefault(); setIsSidebarOpen(false); handleNavClick(item); }}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.1 + index * 0.05, ease: "easeOut" } }}
                    whileHover={{ x: 15, color: currentTheme.accent }}
                    className="text-4xl md:text-6xl font-extrabold tracking-tight transition-colors duration-300 text-white/90 hover:opacity-100"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ReactLenis>
  );
}
