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
    <div className="relative w-[100px] h-[400px] hidden md:flex items-center z-30">
      
      {/* The Spinning Wheel */}
      <motion.div 
        /* UI FIX: Background is now a very soft blush-white with a clean border */
        className="absolute left-[-280px] w-[500px] h-[500px] rounded-full border border-slate-100 flex items-center justify-center bg-[#FFF5F7]/30 shadow-xl"
        animate={{ rotate: wheelRotation }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        {/* Center Hub Decoration - Clean & Minimal */}
        <div className="w-32 h-32 rounded-full bg-white border border-slate-100 shadow-inner flex items-center justify-center">
           <div className="w-2 h-2 rounded-full bg-[#E89EB8]" />
        </div>

        {/* Items */}
        {categories.map((cat, i) => {
          return (
            <motion.button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="absolute h-12 flex items-center justify-start origin-center"
              style={{
                transform: `rotate(${i * 25}deg) translate(250px) rotate(${-i * 25}deg)`
              }}
            >
              {/* Icon Circle */}
              <motion.div 
                 className={`flex items-center gap-4 transition-all duration-300`}
                 animate={{ rotate: -wheelRotation }} 
                 transition={{ type: "spring", stiffness: 50, damping: 20 }}
              >
                {/* UI FIX: Icons use slate-gray and pink instead of dark-gray and black */}
                <div className={`p-4 rounded-full border-2 transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? 'bg-[#E89EB8] text-white border-[#E89EB8] scale-125 shadow-[0_10px_20px_rgba(232,158,184,0.3)]' 
                    : 'bg-white text-slate-400 border-slate-100 hover:border-[#E89EB8]/50 hover:text-slate-600'
                }`}>
                  {cat.icon}
                </div>

                {/* Text Label - High contrast Slate-900 for Light Mode */}
                <span className={`text-lg font-serif font-bold tracking-wider whitespace-nowrap transition-all duration-300 absolute left-16 ${
                  activeCategory === cat.id 
                    ? 'opacity-100 text-slate-900 translate-x-0' 
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