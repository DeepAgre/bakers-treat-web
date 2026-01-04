import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PreLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Snappy 2-second load
    return () => clearInterval(timer);
  }, []);

  // Floating elements logic
  const floatingIcons = ["🧁", "💖", "✨", "🎀", "🌸", "☁️"];

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100vh",
        transition: { duration: 1, ease: [0.85, 0, 0.15, 1] } 
      }}
      // Girlie Gradient Background
      className="fixed inset-0 z-[500] bg-gradient-to-br from-[#FFF0F5] via-[#FFDDEE] to-[#FFF5F7] flex items-center justify-center overflow-hidden"
    >
      {/* --- DECORATIVE BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Soft Pink Glows */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] bg-[#E89EB8]/30 blur-[120px] rounded-full"
        />
        
        {/* Big Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-[22vw] font-serif font-black text-[#E89EB8]/10 select-none tracking-tighter italic">
          Sweet
        </div>

        {/* Floating "Aesthetic" Icons */}
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: -200, 
              x: Math.sin(i) * 100,
              rotate: 360 
            }}
            transition={{ 
              duration: 5 + i, 
              repeat: Infinity, 
              delay: i * 0.8,
              ease: "linear" 
            }}
            className="absolute text-2xl md:text-3xl"
            style={{ 
              left: `${15 + (i * 15)}%`, 
              bottom: "-10%" 
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* --- MAIN CONTENT CARD --- */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Decorative Bow Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-4xl mb-2"
        >
          
        </motion.div>

        {/* Brand Name */}
        <div className="overflow-hidden mb-6 text-center">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-serif font-black text-slate-800 tracking-tighter"
          >
            Delight <span className="italic font-light text-[#E89EB8]">Bakehouse</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[9px] uppercase tracking-[0.5em] text-[#E89EB8] font-black mt-2"
          >
            Handcrafted with Love
          </motion.p>
        </div>

        {/* Glassmorphism Progress Container */}
        <div className="bg-white/30 backdrop-blur-md border border-white/40 p-6 rounded-[30px] shadow-xl shadow-pink-200/50 flex flex-col items-center">
           <div className="flex justify-between w-[200px] mb-3 px-1">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
               Preparing...
             </span>
             <span className="text-[10px] font-black font-mono text-[#E89EB8]">
               {progress}%
             </span>
           </div>

           <div className="w-[200px] h-[6px] bg-white/50 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-gradient-to-r from-[#FFB7CE] to-[#E89EB8] rounded-full"
               style={{ width: `${progress}%` }}
             />
           </div>
           
           <motion.p 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[8px] uppercase tracking-widest text-slate-400 mt-4"
           >
              Thane
           </motion.p>
        </div>
      </div>

      {/* --- REFINED BOTTOM BRANDS --- */}
      <div className="absolute bottom-10 left-8 right-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#E89EB8]/20 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E89EB8] flex items-center justify-center text-white text-xs">
            DB
          </div>
          <div className="text-left">
            <p className="text-slate-800 font-black text-[10px] tracking-tight">DELIGHT BAKEHOUSE</p>
            <p className="text-[#E89EB8] text-[8px] font-bold uppercase tracking-widest">Premium Cakery</p>
          </div>
        </div>
        
        <div className="hidden md:block h-[1px] flex-1 mx-10 bg-gradient-to-r from-transparent via-[#E89EB8]/20 to-transparent" />

        <div className="text-center md:text-right">
          <p className="text-slate-400 text-[8px] uppercase tracking-[0.3em] mb-1">Owner & Pastry Chef</p>
          <p className="text-slate-800 font-black text-[10px] tracking-widest uppercase">
            Khushi Manjrekar
          </p>
        </div>
      </div>

      {/* Top Corner Badge */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 right-10 bg-white px-4 py-2 rounded-full shadow-sm border border-pink-100 flex items-center gap-2"
      >
        <span className="text-xs">✨</span>
        <span className="text-[9px] font-black uppercase tracking-tighter text-[#E89EB8]">Magic in every bite</span>
      </motion.div>
    </motion.div>
  );
};

export default PreLoader;