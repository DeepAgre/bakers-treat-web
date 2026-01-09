import React from 'react';
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
    text: "High-grade cultured butter engineered for a crisp, gold-standard finish.",
    gridClass: "lg:col-span-1"
  },
  {
    id: "03",
    title: "Vanilla Bean",
    subtitle: "Aromatic Soul",
    img: vanillaImg,
    spec: "Grade A Bourbon",
    text: "Hand-cured pods providing the aromatic backbone of every Baker's Treat layer.",
    gridClass: "lg:col-span-1"
  },
  {
    id: "04",
    title: "Seasonal Harvest",
    subtitle: "Vibrancy Layer",
    img: fruitImg,
    spec: "Thane Local Sourcing",
    text: "Fruits selected at peak maturity to balance structural sweetness with acidity.",
    gridClass: "lg:col-span-4" 
  }
];

const TechnicalGrid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-20">
    <div className="h-full w-full" style={{ 
      backgroundImage: `linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)`,
      backgroundSize: '100px 100px' 
    }} />
  </div>
);

const Ingredients = () => {
  return (
    <section className="relative bg-[#080808] py-24 sm:py-40 w-full overflow-hidden" id="ingredients">
      
      {/* 1. ARCHITECTURAL BACKGROUND */}
      <TechnicalGrid />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-white/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* 2. HEADER: THE OLLY STYLE */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-[#E89EB8]" />
                <h4 className="text-[#E89EB8] font-bold uppercase tracking-[0.6em] text-[10px]">Material Specifications</h4>
            </div>
            <h2 className="text-white text-6xl md:text-[8rem] lg:text-[10rem] font-serif leading-[0.8] tracking-tighter">
              The <span className="italic font-light text-[#E89EB8]">Foundation</span> <br /> 
              of Every Crumb.
            </h2>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="hidden lg:block pb-6"
          >
             <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-mono leading-loose text-right">
                [ Ingredient Assay ] <br />
                Ver: 2026.Studio <br />
                Bakers Treat Thane
             </p>
          </motion.div>
        </div>

        {/* 3. BENTO GRID: IDEA BAKERY STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ingredients.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`relative group rounded-[1.5rem] overflow-hidden bg-[#111] border border-white/5 ${item.gridClass} h-[550px] cursor-none`}
            >
              {/* IMAGE: Gray to Color on Hover */}
              <div 
                className="absolute inset-0 w-full h-full transition-all duration-[1500ms] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-60"
                style={{ 
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* CONTENT AREA */}
              <div className="absolute inset-0 p-10 flex flex-col justify-between">
                
                {/* Top: Technical Spec */}
                <div className="flex justify-between items-start translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                   <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{item.spec}</span>
                   <span className="text-[10px] font-mono text-[#E89EB8]">00{item.id} // BT</span>
                </div>
                
                {/* Bottom: Title & Subtitle */}
                <div className="relative z-10">
                    <h5 className="text-[#E89EB8] text-[9px] font-bold uppercase tracking-[0.5em] mb-4">
                        {item.subtitle}
                    </h5>
                    <h3 className="text-white text-4xl font-serif mb-6 leading-tight group-hover:italic transition-all duration-500">
                        {item.title}
                    </h3>
                    <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-[#E89EB8] to-transparent transition-all duration-1000 mb-6" />
                    <p className="text-white/40 text-sm leading-relaxed font-light max-w-xs h-0 group-hover:h-20 opacity-0 group-hover:opacity-100 transition-all duration-700 overflow-hidden">
                        {item.text}
                    </p>
                </div>
              </div>

              {/* Minimal Border Glow */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-700 rounded-[1.5rem]" />
            </motion.div>
          ))}
        </div>

        {/* 4. FOOTER CALLOUT */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-20 flex flex-col items-center"
        >
            <div className="h-20 w-[1px] bg-gradient-to-b from-[#E89EB8]/50 to-transparent mb-8" />
            <p className="text-white/20 text-[10px] uppercase tracking-[0.8em]">Handcrafted in Thane</p>
        </motion.div>
      </div>

      {/* NOISE TEXTURE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] contrast-150 mix-blend-screen" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
    </section>
  );
};

export default Ingredients;