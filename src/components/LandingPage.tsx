import React from 'react';
import LetterGlitch from './LetterGlitch';
import CardNav from './CardNav';
import Shuffle from './Shuffle';
import PortfolioSections from './PortfolioSections';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="relative w-full text-white font-outfit flex flex-col">
      {/* Navbar - Fixed on top */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none">
        <div className="w-full max-w-[800px] pointer-events-auto mt-[2em]">
          <CardNav />
        </div>
      </div>

      {/* Hero Section */}
      <div className="h-screen w-full relative flex flex-col overflow-hidden">
        {/* Background Glitch Canvas */}
        <div className="absolute inset-0 z-[-1]">
          <LetterGlitch
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
          />
        </div>

        {/* Hero Center Text */}
        <main className="flex-1 flex flex-col items-center justify-center w-full px-4 text-center mt-[-60px]">
          <Shuffle
            text="Hi, I'm Tanish Jagtap."
            tag="h1"
            stagger={40}
            scrambleDuration={350}
            triggerOnHover={false}
            waitLoading={true}
            textAlign="center"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              lineHeight: 1.1,
              cursor: 'default',
            }}
          />
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

      {/* Portfolio Sections below the fold */}
      <PortfolioSections />
    </div>
  );
}
