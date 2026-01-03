import React from 'react';
import { motion } from 'framer-motion';

const PreLoader = ({ onSkip }) => {
  // Animation for each individual letter for a "luxury reveal"
  const containerVars = {
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const letterVars = {
    initial: { y: 40, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.2, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.9, 0, 0.1, 1] }}
      onClick={onSkip}
      className="fixed inset-0 z-[200] bg-[#110C0D] flex items-center justify-center flex-col cursor-wait overflow-hidden"
    >
      {/* 1. Cinematic Grain Overlay - Makes the color feel "textured" and cool */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* 2. Floating Ambient Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.12, 0.08] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[60vw] h-[60vw] bg-[#E89EB8] rounded-full blur-[120px] pointer-events-none"
      />

      {/* 3. Main Branding Reveal */}
      <div className="relative z-10">
        <motion.div
          variants={containerVars}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center"
        >
          <div className="flex overflow-hidden pb-2">
            {"Bakers Treat".split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVars}
                className={`text-white text-4xl md:text-7xl font-serif font-bold tracking-tight ${char === " " ? "mr-4" : ""}`}
              >
                {char}
              </motion.span>
            ))}
            <motion.span variants={letterVars} className="text-[#E89EB8] text-4xl md:text-7xl font-serif font-bold">.</motion.span>
          </div>
          
          {/* Minimalist Loading Bar */}
          <div className="relative w-32 md:w-48 h-[1px] mt-4 overflow-hidden">
            <div className="absolute inset-0 bg-white/10" />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[#E89EB8] shadow-[0_0_8px_#E89EB8]"
            />
          </div>
        </motion.div>
      </div>
      
      {/* 4. Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-16 flex flex-col items-center gap-6"
      >
        <div className="flex flex-col items-center">
          <p className="text-white/40 text-[9px] uppercase tracking-[0.6em] mb-2 font-medium">
            Thane West
          </p>
          <div className="h-[30px] w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
        </div>
        
        <p className="text-[#E89EB8]/80 text-[10px] uppercase tracking-[0.4em] font-bold">
          Khushi Manjrekar
        </p>
      </motion.div>

      {/* Subtle Interaction Prompt */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ delay: 3, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 text-white text-[7px] uppercase tracking-[0.5em]"
      >
        Enter Studio
      </motion.div>
    </motion.div>
  );
};

export default PreLoader;