import React, { useState, useEffect } from 'react';
import RotatingText from './RotatingText';
import { AnimatePresence, motion } from 'motion/react';

const greetings = [
  "Hi", "Hello", "Namaste", "Hola", "Bonjour", "Ciao", "Hallo", "Olá", 
  "Привет", "你好", "こんにちは", "안녕하세요", "مرحبا", "שלום", "Hej", 
  "Hoi", "Selam", "Sawubona", "Halo", "Sawasdee"
];

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  // 🔥 MAIN CONTROL (change this only)
  const TOTAL_DURATION = 8000; 

  // ⚡ auto-calculated per word timing
  const ROTATION_INTERVAL = TOTAL_DURATION / greetings.length;

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = 'hidden';

    // Add small buffer for exit animation
    const EXIT_BUFFER = 800;

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, TOTAL_DURATION + EXIT_BUFFER);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.76, 0, 0.24, 1] 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
        >
          <div className="flex items-center text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
            <RotatingText
              texts={greetings}
              rotationInterval={ROTATION_INTERVAL} // 🔥 dynamic speed
              mainClassName="overflow-hidden justify-center text-white"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.015} // smoother feel
              splitLevelClassName="overflow-hidden"
              transition={{ 
                type: "spring", 
                damping: 28, 
                stiffness: 380 
              }}
              loop={false}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}