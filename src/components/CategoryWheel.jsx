import React from 'react';
import { motion } from 'framer-motion';
import { Croissant, Coffee, Cake, Wheat } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: <Croissant className="w-5 h-5" /> },
  { id: 'pastry', label: 'Pastries', icon: <Croissant className="w-5 h-5" /> },
  { id: 'cake', label: 'Cakes', icon: <Cake className="w-5 h-5" /> },
  { id: 'bread', label: 'Breads', icon: <Wheat className="w-5 h-5" /> },
  { id: 'coffee', label: 'Coffee', icon: <Coffee className="w-5 h-5" /> },
];

const CategoryWheel = ({ activeCategory, onSelect }) => {
  const activeIndex = categories.findIndex(c => c.id === activeCategory);
  const wheelRotation = activeIndex * -25; // Rotate wheel to bring active item to center

  return (
    // Fixed width container to prevent bleeding
    <div className="relative w-[100px] h-[400px] hidden md:flex items-center z-30">
      
      {/* The Spinning Wheel */}
      {/* Moved 'left' to -280px to pull it back from the content */}
      <motion.div 
        className="absolute left-[-280px] w-[500px] h-[500px] rounded-full border border-white/10 flex items-center justify-center bg-[#121212]"
        animate={{ rotate: wheelRotation }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        {/* Center Hub Decoration */}
        <div className="w-32 h-32 rounded-full bg-[#0A0A0A] border border-white/5 shadow-inner" />

        {/* Items */}
        {categories.map((cat, i) => {
          return (
            <motion.button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="absolute h-12 flex items-center justify-start origin-center"
              style={{
                // 1. Rotate to place on circle
                // 2. Push out to edge (radius 250px)
                // 3. Counter-rotate so the ITEM itself stays horizontal relative to the screen
                transform: `rotate(${i * 25}deg) translate(250px) rotate(${-i * 25}deg)`
              }}
            >
              {/* Icon Circle */}
              {/* We apply the counter-rotation of the WHEEL here to keep the text upright */}
              <motion.div 
                 className={`flex items-center gap-4 transition-all duration-300`}
                 animate={{ rotate: -wheelRotation }} // Counter-rotate against the parent wheel spin
                 transition={{ type: "spring", stiffness: 50, damping: 20 }}
              >
                <div className={`p-3 rounded-full border transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? 'bg-[#E89EB8] text-black border-[#E89EB8] scale-125 shadow-[0_0_20px_rgba(232,158,184,0.3)]' 
                    : 'bg-[#1C1C1C] text-[#A3A3A3] border-white/10 hover:border-white/50'
                }`}>
                  {cat.icon}
                </div>

                {/* Text Label - Now strictly horizontal to the right of icon */}
                <span className={`text-lg font-serif tracking-wider whitespace-nowrap transition-all duration-300 absolute left-14 ${
                  activeCategory === cat.id 
                    ? 'opacity-100 text-white translate-x-0' 
                    : 'opacity-0 -translate-x-4 pointer-events-none'
                }`}>
                  {cat.label}
                </span>
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CategoryWheel;