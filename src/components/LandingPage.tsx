import React from 'react';
import LetterGlitch from './LetterGlitch';
import CardNav from './CardNav';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-outfit flex flex-col">
      {/* Background Glitch Canvas */}
      <div className="absolute inset-0 z-[-1]">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      {/* Top Navigation */}
      <CardNav />

      {/* Hero Center Text */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 text-center mt-[-60px]">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter pointer-events-none"
        >
          Hi, I’m Tanish Jagtap.
        </motion.h1>
      </main>

      {/* Bottom Scroll Down Element */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 w-full flex flex-col items-center justify-center animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
      >
        <span className="text-xs tracking-[0.2em] uppercase mb-2 font-medium">Scroll down</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
}
