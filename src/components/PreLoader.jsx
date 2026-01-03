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
      className="fixed inset-0 z-[200] bg-white flex items-center justify-center flex-col cursor-wait"
    >
      {/* Background Initials for texture */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <h2 className="text-[60vw] font-serif font-bold text-slate-900">BT</h2>
      </div>

      <div className="relative overflow-hidden px-4">
        <motion.div
          variants={textVariant}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center"
        >
          <h1 className="text-slate-900 text-4xl md:text-6xl font-serif font-bold tracking-tighter text-center">
            Delight Bakehouse<span className="text-[#E89EB8]">.</span>
          </h1>
          
          {/* Animated Progress Line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="h-[1.5px] bg-[#E89EB8] mt-6 max-w-[120px]"
          />
        </motion.div>
      </div>
      
      {/* Footer Info in Loader */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-4">
          <span className="h-[1px] w-8 bg-slate-200" />
          <p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.5em]">
            Thane West
          </p>
          <span className="h-[1px] w-8 bg-slate-200" />
        </div>
        <p className="text-slate-500 text-[9px] uppercase tracking-[0.2em] font-medium italic">
          Handcrafted by Khushi Manjrekar
        </p>
      </motion.div>

      {/* Subtle Skip Prompt */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 text-slate-300 text-[8px] uppercase tracking-widest"
      >
        Click anywhere to enter
      </motion.div>
    </motion.div>
  );
};

export default PreLoader;