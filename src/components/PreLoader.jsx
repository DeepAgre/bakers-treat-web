import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PreLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);

  // The "Funky" Pendragon-style cycling descriptors
  const phrases = ["Delight Bakehouse", "THANE STUDIO", "PRECISION CRAFT", "KHUSHI MANJREKAR", "EST. 2026"];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 1000);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
      // Cycle phrases rapidly for that kinetic energy
      setCycleIndex((prev) => (prev + 1) % phrases.length);
    }, 60); 

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ 
            clipPath: "inset(50% 0% 50% 0%)", // Shutter-style exit
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[1000] bg-[#E89EB8] flex items-center justify-center overflow-hidden"
        >
          {/* 1. KINETIC BACKGROUND TEXT (Moving horizontally like Pendragon) */}
          <div className="absolute inset-0 flex flex-col justify-around opacity-10 pointer-events-none select-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: i % 2 === 0 ? "-20%" : "20%" }}
                animate={{ x: i % 2 === 0 ? "20%" : "-20%" }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-[12vw] font-black italic whitespace-nowrap text-black leading-none"
              >
                Delight Bakehouse — Delight Bakehouse — Delight Bakehouse
              </motion.div>
            ))}
          </div>

          {/* 2. MAIN CENTER ENGINE */}
          <div className="relative z-10 flex flex-col items-center">
            {/* The Glitchy/Cycling Phrase */}
            <div className="h-24 flex items-center justify-center">
                <motion.span 
                    key={cycleIndex}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    className="text-4xl md:text-7xl font-black text-black tracking-tightest uppercase italic"
                >
                    {phrases[cycleIndex]}
                </motion.span>
            </div>

            {/* Progress Bar (Heavy & Brutalist) */}
            <div className="mt-12 w-64 md:w-96">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-black font-black text-[10px] tracking-tighter">ENGINE_STATUS: LOADING</span>
                    <span className="text-black font-mono text-2xl font-black">{progress}%</span>
                </div>
                <div className="w-full h-4 border-2 border-black p-[2px]">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-black"
                    />
                </div>
            </div>
          </div>

          {/* 3. CORNER MARKS (Funky UI Elements) */}
          <div className="absolute top-10 left-10 text-black">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-black animate-bounce" />
                <span className="font-black text-xs">BT_SYS_v2.6</span>
             </div>
          </div>

          <div className="absolute bottom-10 right-10 text-black text-right font-black text-[10px] leading-none uppercase">
            <p>Calculated Sweetness</p>
            <p>Thane / Mumbai</p>
            <p className="mt-2 text-white bg-black px-1">Limited Access</p>
          </div>

          {/* 4. FLICKER OVERLAY */}
          <motion.div 
            animate={{ opacity: [0, 0.05, 0] }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0 bg-white pointer-events-none"
          />

          {/* SCANLINE EFFECT */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;