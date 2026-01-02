import React from 'react';
import { motion } from 'framer-motion';

const PreLoader = ({ onSkip }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onClick={onSkip}
      /* Changed bg-[#1A1A1A] to handle light mode (white) and dark mode (dark gray) */
      className="fixed inset-0 z-[100] bg-white dark:bg-[#1A1A1A] flex items-center justify-center flex-col cursor-pointer transition-colors duration-500"
    >
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          /* Changed text-white to text-gray-900 (light mode) and dark:text-white (dark mode) */
          className="text-gray-900 dark:text-white text-4xl md:text-6xl font-serif tracking-tighter text-center transition-colors duration-500"
        >
          Delight Bakehouse<span className="text-[#E89EB8]">.</span>
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
        {/* Updated both p tags to shift from dark gray to white based on theme */}
        <p className="text-gray-900 dark:text-white text-[9px] uppercase tracking-[0.4em] transition-colors duration-500">
          Thane • Artisan Bakes
        </p>
        <p className="text-gray-900 dark:text-white text-[8px] uppercase tracking-[0.2em] mt-1 italic transition-colors duration-500">
          By Khushi Manjrekar
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PreLoader;