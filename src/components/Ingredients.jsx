import React, { memo } from 'react';
import { motion } from 'framer-motion';

// IMPORTING LOCAL ASSETS
import cocoaImg from '../assets/cocoa.jpeg';
import butterImg from '../assets/butter.jpeg';
import vanillaImg from '../assets/vanilla.jpeg';
import fruitImg from '../assets/fruit.jpeg';

const ingredients = [
  {
    id: "01",
    title: "Pure Cocoa",
    subtitle: "Structural Base",
    img: cocoaImg,
    spec: "72% Arriba Dark",
    text: "Sourced from single-origin farms for a deep, architectural flavor profile.",
    gridClass: "lg:col-span-2"
  },
  {
    id: "02",
    title: "Dairy Fat",
    subtitle: "The Emulsion",
    img: butterImg,
    spec: "82% Butterfat",
    text: "High-grade cultured butter engineered for a gold-standard finish.",
    gridClass: "lg:col-span-1"
  },
  {
    id: "03",
    title: "Vanilla Bean",
    subtitle: "Aromatic Soul",
    img: vanillaImg,
    spec: "Grade A Bourbon",
    text: "Hand-cured pods providing the aromatic backbone of every layer.",
    gridClass: "lg:col-span-1"
  },
  {
    id: "04",
    title: "Seasonal Harvest",
    subtitle: "Vibrancy Layer",
    img: fruitImg,
    spec: "Thane Local Sourcing",
    text: "Fruits selected at peak maturity to balance sweetness with acidity.",
    gridClass: "lg:col-span-4" 
  }
];

// Memoized to prevent re-renders during parent state changes
const TechnicalGrid = memo(() => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.15] select-none">
    <div className="h-full w-full" style={{ 
      backgroundImage: `linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)`,
      backgroundSize: '80px 80px' 
    }} />
  </div>
));

const Ingredients = () => {
  return (
    <section className="relative bg-[#080808] py-20 sm:py-40 w-full overflow-hidden" id="ingredients">
      
      <TechnicalGrid />
      
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* HEADER SECTION - Static or simple entry for performance */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-[#E89EB8]" />
                <h4 className="text-[#E89EB8] font-bold uppercase tracking-[0.5em] text-[9px]">Material Specifications</h4>
            </div>
            <h2 className="text-white text-5xl md:text-[8rem] lg:text-[9rem] font-serif leading-[0.9] tracking-tighter">
              The <span className="italic font-light text-[#E89EB8]">Foundation</span> <br /> 
              of Every Crumb.
            </h2>
          </motion.div>

          <div className="hidden lg:block pb-6">
             <p className="text-white/20 text-[9px] uppercase tracking-[0.4em] font-mono leading-loose text-right">
                [ Ingredient Assay ] <br />
                Ver: 2026.Studio <br />
                Bakers Treat Thane
             </p>
          </div>
        </div>

        {/* BENTO GRID - Optimized Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {ingredients.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative group rounded-[1.8rem] overflow-hidden bg-[#111] border border-white/5 ${item.gridClass} h-[450px] md:h-[550px] will-change-transform`}
              style={{ transform: 'translateZ(0)' }}
            >
              {/* IMAGE: Using pure CSS for hover transitions to save JS cycles */}
              <div 
                className="absolute inset-0 w-full h-full transition-transform duration-[1.2s] ease-out scale-100 group-hover:scale-110 opacity-60"
                style={{ 
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
              
              {/* CONTENT AREA */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                
                <div className="flex justify-between items-start">
                   <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">{item.spec}</span>
                   <span className="text-[9px] font-mono text-[#E89EB8]">BT // {item.id}</span>
                </div>
                
                <div className="relative z-10">
                    <h5 className="text-[#E89EB8] text-[8px] font-black uppercase tracking-[0.4em] mb-3">
                        {item.subtitle}
                    </h5>
                    <h3 className="text-white text-3xl md:text-4xl font-serif mb-4 leading-tight group-hover:text-[#E89EB8] transition-colors duration-500">
                        {item.title}
                    </h3>
                    
                    {/* Animated Progress line - Only triggers once */}
                    <div className="h-[1px] w-full bg-white/10 relative overflow-hidden mb-5">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "0%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        className="absolute inset-0 bg-[#E89EB8]"
                      />
                    </div>

                    <p className="text-white/50 text-[12px] md:text-sm leading-relaxed font-light max-w-xs">
                        {item.text}
                    </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FOOTER CALLOUT */}
        <div className="mt-20 flex flex-col items-center">
            <div className="h-16 w-[1px] bg-gradient-to-b from-[#E89EB8] to-transparent mb-6" />
            <p className="text-white/20 text-[9px] uppercase tracking-[0.6em]">Studio Grade Materials</p>
        </div>
      </div>

      {/* NOISE OVERLAY - Hardware accelerated */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] will-change-transform" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
    </section>
  );
};

export default memo(Ingredients);