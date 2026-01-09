import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PreLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Faster, smoother progress increment
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 15); // Snappy loading
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        exit={{ 
          y: "-100vh",
          transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] } 
        }}
        className="fixed inset-0 z-[500] bg-[#080808] flex items-center justify-center overflow-hidden"
      >
        {/* --- STUDIO BACKGROUND ELEMENTS --- */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Subtle Pink Ambient Glow (Lower Left) */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1], 
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[10%] -left-[10%] w-[60vw] h-[60vw] bg-[#E89EB8]/20 blur-[150px] rounded-full"
          />

          {/* Large Architectural "B" Outline */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-[30vw] font-serif font-black text-white/[0.02] select-none tracking-tighter">
            DB
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-10">
          
          {/* Brand Name with Staggered Letter Reveal */}
          <div className="overflow-hidden mb-12 text-center">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-serif text-white tracking-tighter"
            >
              Delight <span className="italic font-light text-[#E89EB8]">Bakehouse</span>
            </motion.h1>
            
            <div className="flex items-center justify-center gap-3 mt-4">
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-[1px] w-8 bg-[#E89EB8]/50 origin-left"
              />
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-[9px] uppercase tracking-[0.6em] text-white/40 font-medium"
              >
                Artisan Studio • Thane
              </motion.p>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-[1px] w-8 bg-[#E89EB8]/50 origin-right"
              />
            </div>
          </div>

          {/* Minimalist Progress Section */}
          <div className="w-full space-y-4">
            <div className="flex justify-between items-end px-1">
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 mb-1">
                  Loading Experience
                </span>
                <motion.span 
                  className="text-[10px] font-mono text-[#E89EB8] font-bold"
                >
                  {progress < 10 ? `00${progress}` : `0${progress}`} / 0100
                </motion.span>
              </div>
              
              <div className="text-right">
                 <span className="text-[8px] font-mono text-white/20 uppercase">Ver 2.6.0</span>
              </div>
            </div>

            {/* Architectural Loading Bar */}
            <div className="relative w-full h-[2px] bg-white/[0.05] overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#E89EB8]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
              {/* Secondary Glow line */}
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white/40 blur-[2px]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* --- BOTTOM STUDIO MARKS --- */}
        <div className="absolute bottom-12 left-10 right-10 flex justify-between items-center opacity-30">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-serif italic text-white">Khushi Manjrekar</span>
          </div>
          <div className="h-[1px] flex-1 mx-8 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="text-right">
            <p className="text-white font-mono text-[8px] tracking-widest uppercase">
              
            </p>
          </div>
        </div>

        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute top-12 flex items-center gap-3"
        >
          <div className="w-[6px] h-[6px] rounded-full bg-[#E89EB8] animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/40">Studio Connection Active</span>
        </motion.div>

        {/* NOISE OVERLAY FOR TEXTURE */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] contrast-150 mix-blend-screen" 
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
      </motion.div>
    </AnimatePresence>
  );
};

export default PreLoader;