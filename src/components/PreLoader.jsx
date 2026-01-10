import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PreLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true); 
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    initial: { clipPath: "inset(0% 0% 0% 0%)" },
    exit: {
      clipPath: "inset(0% 0% 100% 0%)",
      transition: { 
        duration: 0.8, 
        ease: [0.8, 0, 0.1, 1] 
      }
    }
  };

  const textVariants = {
    initial: { y: "110%", opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[1000] bg-[#E89EB8] flex flex-col items-center justify-center overflow-hidden touch-none"
        >
          {/* 1. KINETIC PROGRESS PILLARS */}
          <div className="absolute inset-0 flex flex-row pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: progress / 100 }}
                className="flex-1 bg-black/5 origin-bottom"
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>

          {/* 2. CENTER BRANDING - Fixed Clipping */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Delight Container */}
            <div className="overflow-hidden py-2">
              <motion.h1 
                variants={textVariants}
                initial="initial"
                animate="animate"
                className="text-[16vw] md:text-[10vw] font-serif font-black text-black leading-[0.9] tracking-tighter"
              >
                Delight
              </motion.h1>
            </div>

            {/* Bakehouse Container - Fixed Height & Added Padding */}
            <div className="overflow-hidden py-4 -mt-2 md:-mt-4">
              <motion.h1 
                variants={textVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.1 }}
                className="text-[16vw] md:text-[10vw] font-serif italic font-light text-black leading-[0.9] tracking-tighter"
              >
                Bakehouse
              </motion.h1>
            </div>
          </div>

          {/* 3. OPTIMIZED COUNTER */}
          <div className="absolute bottom-12 flex flex-col items-center">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="text-[10px] uppercase tracking-[0.4em] text-black font-bold mb-4"
            >
              Artisan Bakes
            </motion.p>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black text-black tabular-nums">
                {progress}
              </span>
              <span className="text-xl font-bold text-black/40">%</span>
            </div>
          </div>

          {/* 4. LIGHTWEIGHT ROTATING ELEMENT */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[150vw] h-[150vw] border-[1px] border-black/5 rounded-full pointer-events-none"
          />

          {/* 5. PERFORMANCE-FRIENDLY NOISE */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-black" 
               style={{ maskImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAElBMVEUAAAD8/Pz09PT4+Pj29vb////038p7AAAABnRSTlMA//////96eeOZAAAALUlEQVQ4y2NgwAaY8CH8/f0Z8CH8/f0Z8CH8/f0Z8CH8/f0Z8CH8/f0Z8CH8PwMA9vMDf3T4E40AAAAASUVORK5CYII=")' }} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;