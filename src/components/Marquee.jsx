import React from 'react';
import { motion } from 'framer-motion';

const Marquee = () => {
  const items = [
    "Custom Sculptural Cakes",
    "Hand-Painted Chocolates",
    "Luxury Patisserie",
    "Designed for You",
    "Crafted in Thane",
    "Artisanal Sweets"
  ];

  return (
    <div className="py-12 bg-[#E89EB8] overflow-hidden whitespace-nowrap">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex items-center"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-black font-serif text-4xl md:text-5xl mx-12 lowercase tracking-tighter">
                  {item}
                </span>
                <div className="w-3 h-3 rounded-full bg-black mx-4" />
              </React.Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;