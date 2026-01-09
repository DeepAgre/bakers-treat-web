import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PreLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Variable speed loading to feel more "organic" like high-end studios
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 800);
          return 100;
        }
        // Jumps slightly to simulate "data loading"
        const jump = Math.random() > 0.8 ? 3 : 1;
        return prev + jump;
      });
    }, 20); 
    return () => clearInterval(interval);
  }, []);

  // Animation Variants
  const textReveal = {
    initial: { y: "100%", skewY: 7 },
    animate: { y: 0, skewY: 0 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  const containerExit = {
    initial: { clipPath: "inset(0% 0% 0% 0%)" },
    exit: { 
      clipPath: "inset(0% 0% 100% 0%)",
      transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1], delay: 0.2 } 
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          variants={containerExit}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[1000] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* 1. LARGE ARCHITECTURAL BACKGROUND INITIALS */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <h2 className="text-[50vw] font-serif font-black tracking-tighter text-white">
              DB
            </h2>
          </motion.div>

          {/* 2. MAIN CENTER CONTENT */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Staggered Word Reveal */}
            <div className="flex flex-col items-center mb-16">
              <div className="overflow-hidden h-20 md:h-32">
                <motion.h1 
                  variants={textReveal}
                  initial="initial"
                  animate="animate"
                  className="text-6xl md:text-9xl font-serif text-white tracking-tighter"
                >
                  Delight
                </motion.h1>
              </div>
              <div className="overflow-hidden h-20 md:h-32 -mt-4 md:-mt-8">
                <motion.h1 
                  variants={textReveal}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1, duration: 1.2 }}
                  className="text-6xl md:text-9xl font-serif italic text-[#E89EB8] tracking-tighter"
                >
                  Bakehouse
                </motion.h1>
              </div>
            </div>

            {/* Counter - Elegant and Minimal */}
            <div className="overflow-hidden flex flex-col items-center gap-4">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="flex flex-col items-center"
               >
                 <span className="text-[10px] uppercase tracking-[0.8em] text-white/20 mb-2 font-black">
                   Initializing Studio
                 </span>
                 <span className="text-4xl md:text-6xl font-mono text-white font-light tracking-widest">
                   {progress}%
                 </span>
               </motion.div>
            </div>
          </div>

          {/* 3. PERIMETER DETAILS (High-End Studio Feel) */}
          <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.4, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-1 h-1 bg-[#E89EB8] rounded-full animate-pulse" />
                <span className="text-[9px] uppercase tracking-[0.4em] text-white">Thane, MH</span>
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.4, x: 0 }}
                className="text-[9px] uppercase tracking-[0.4em] text-white"
              >
                © 2026
              </motion.span>
            </div>

            <div className="flex justify-between items-end">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 0.4, y: 0 }}
                 className="max-w-[150px]"
               >
                 <p className="text-[8px] uppercase tracking-widest leading-relaxed text-white">
                   Architectural Patisserie <br />
                   By Khushi Manjrekar
                 </p>
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 0.4, y: 0 }}
                 className="text-right"
               >
                 <p className="text-[8px] uppercase tracking-widest text-white">
                   Precision // Soul // Craft
                 </p>
               </motion.div>
            </div>
          </div>

          {/* 4. SCANLINE / NOISE EFFECT */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          {/* Architectural Grid Overlay */}
          <div className="absolute inset-0 border-[1px] border-white/5 pointer-events-none m-8 md:m-16" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;