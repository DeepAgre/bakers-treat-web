import React from 'react';
import { motion } from 'framer-motion';

const PreLoader = ({ onSkip }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onClick={onSkip}
      className="fixed inset-0 z-[100] bg-[#1A1A1A] flex items-center justify-center flex-col cursor-pointer"
    >
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white text-4xl md:text-6xl font-serif tracking-tighter text-center"
        >
          Bakers Treat<span className="text-[#E89EB8]">.</span>
        </motion.h1>
      </div>
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "150px" }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
        className="h-[1px] bg-[#E89EB8] mt-6"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <p className="text-white text-[9px] uppercase tracking-[0.4em]">Thane • Artisan Bakes</p>
        <p className="text-white text-[8px] uppercase tracking-[0.2em] mt-1 italic">By Khushi Manjarekar</p>
      </motion.div>
    </motion.div>
  );
};

export default PreLoader;