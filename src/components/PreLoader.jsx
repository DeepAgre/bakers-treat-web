import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PreLoader = () => {
  const [progress, setProgress] = useState(0);

  // Smooth counter animation for the progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 25); // Fast, snappy progress
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100vh",
        transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] } 
      }}
      className="fixed inset-0 z-[500] bg-[#FFF5F7] flex items-center justify-center overflow-hidden"
    >
      {/* --- BACKGROUND ACCENTS (Optimized - No Lag) --- */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-[#E89EB8]/20 blur-[100px] rounded-full"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-[20vw] font-serif font-black text-[#E89EB8]/5 select-none tracking-tighter">
          BAKERY
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Modern Minimal Logo Reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-serif font-black text-slate-900 tracking-tighter"
          >
            Delight Bakehouse<span className="text-[#E89EB8]">.</span>
          </motion.h1>
        </div>

        {/* The "Gen-Z" Counter Style */}
        <div className="flex flex-col items-center gap-2">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: "200px" }}
             transition={{ duration: 1, delay: 0.2 }}
             className="h-[2px] bg-slate-900/5 relative overflow-hidden"
           >
             <motion.div 
               className="absolute top-0 left-0 h-full bg-[#E89EB8]"
               style={{ width: `${progress}%` }}
             />
           </motion.div>
           
           <div className="flex justify-between w-[200px] mt-2">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
               Loading Studio
             </span>
             <span className="text-[10px] font-black font-mono text-[#E89EB8]">
               {progress}%
             </span>
           </div>
        </div>
      </div>

      {/* --- BOTTOM BRANDS --- */}
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-slate-900 font-bold text-xs tracking-tighter">Delight Bakehouse</p>
          <p className="text-slate-400 text-[9px] uppercase tracking-[0.2em]">Thane, MH</p>
        </div>
        
        <div className="text-right">
          <p className="text-slate-400 text-[9px] uppercase tracking-[0.2em] mb-1">Creative Director</p>
          <p className="text-slate-900 font-bold text-xs tracking-tighter uppercase">Khushi Manjrekar</p>
        </div>
      </div>

      {/* Floating Sparkle for Visual Pop */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute top-12 left-12 text-2xl"
      >
        ✨
      </motion.div>
    </motion.div>
  );
};

export default PreLoader;