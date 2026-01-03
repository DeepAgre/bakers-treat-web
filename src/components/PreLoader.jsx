import React from 'react';
import { motion } from 'framer-motion';

const PreLoader = ({ onSkip }) => {
  // Animation variants for staggered text reveal
  const textVariant = {
    initial: { y: 100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
      onClick={onSkip}
      className="fixed inset-0 z-[200] bg-[#020617] flex items-center justify-center flex-col cursor-wait overflow-hidden"
    >
      {/* Background Initials for texture - Changed to a subtle Slate-800 gold-ish glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <h2 className="text-[60vw] font-serif font-bold text-white uppercase select-none">BT</h2>
      </div>

      {/* Decorative Glow Orbs for a premium "Midnight" feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#E89EB8] opacity-[0.05] blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#E89EB8] opacity-[0.05] blur-[120px] rounded-full" />

      <div className="relative overflow-hidden px-4">
        <motion.div
          variants={textVariant}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center"
        >
          <h1 className="text-white text-4xl md:text-6xl font-serif font-bold tracking-tighter text-center">
            Delight Bakehouse<span className="text-[#E89EB8]">.</span>
          </h1>
          
          {/* Animated Progress Line - Now with a glow effect */}
          <div className="relative w-full max-w-[140px] mt-8">
             <div className="absolute inset-0 h-[1px] bg-white/10 w-full" />
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 1.8, ease: "easeInOut" }}
               className="relative h-[1.5px] bg-[#E89EB8] shadow-[0_0_15px_#E89EB8]"
             />
          </div>
        </motion.div>
      </div>
      
      {/* Footer Info in Loader */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-6">
          <span className="h-[1px] w-12 bg-white/20" />
          <p className="text-white text-[10px] font-black uppercase tracking-[0.6em]">
            Thane West
          </p>
          <span className="h-[1px] w-12 bg-white/20" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-slate-400 text-[9px] uppercase tracking-[0.2em] font-medium">
            Artisanal Bakes By
          </p>
          <p className="text-[#E89EB8] text-[11px] uppercase tracking-[0.3em] font-black italic">
            Khushi Manjrekar
          </p>
        </div>
      </motion.div>

      {/* Subtle Skip Prompt */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-4 text-white text-[8px] uppercase tracking-[0.4em] font-bold"
      >
        Tap to skip
      </motion.div>
    </motion.div>
  );
};

export default PreLoader;