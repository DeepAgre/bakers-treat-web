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
          setTimeout(() => setIsComplete(true), 1200); // Slight pause for visual impact
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Animation variants for the heavy staggered reveal
  const containerVariants = {
    exit: {
      y: "-100%",
      transition: { 
        duration: 0.8, 
        ease: [0.83, 0, 0.17, 1],
        when: "afterChildren"
      }
    }
  };

  const textVariants = {
    initial: { y: 100, rotate: 10, opacity: 0 },
    animate: { 
      y: 0, 
      rotate: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[1000] bg-[#E89EB8] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* 1. BACKGROUND KINETIC MASKING (Heavily Animated) */}
          <div className="absolute inset-0 flex flex-row pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: progress / 100 }}
                className="flex-1 bg-black/5 origin-top"
                transition={{ duration: 0.5, delay: i * 0.05 }}
              />
            ))}
          </div>

          {/* 2. OVERLAPPING LARGE TEXT (Liquid Feel) */}
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="overflow-hidden">
              <motion.h1 
                variants={textVariants}
                animate="animate"
                initial="initial"
                className="text-[18vw] md:text-[12vw] font-serif font-black text-black leading-none tracking-tighter"
              >
                Delight
              </motion.h1>
            </div>
            
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "60vw" }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="h-[2px] bg-black my-4"
            />

            <div className="overflow-hidden">
              <motion.h1 
                variants={textVariants}
                animate="animate"
                initial="initial"
                transition={{ delay: 0.2 }}
                className="text-[18vw] md:text-[12vw] font-serif italic font-light text-black leading-none tracking-tighter"
              >
                Bakehouse
              </motion.h1>
            </div>
          </div>

          {/* 3. BIG COUNTER (Mobile Optimized) */}
          <div className="absolute bottom-[10%] left-0 w-full flex flex-col items-center justify-center">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex flex-col items-center"
             >
                <span className="text-black font-serif italic text-xl mb-2">Thane Studio</span>
                <div className="relative overflow-hidden h-24">
                   <motion.span 
                    key={progress}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-8xl font-black text-black block"
                   >
                     {progress}
                   </motion.span>
                </div>
             </motion.div>
          </div>

          {/* 4. LIQUID DECORATION */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-64 h-64 border-[1px] border-black/20 rounded-full"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-96 h-96 border-[1px] border-black/10 rounded-full"
          />

          {/* 5. GRAIN OVERLAY */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;