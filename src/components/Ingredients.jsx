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
    subtitle: "The Foundation",
    img: cocoaImg,
    text: "Sourced from premium farms for an intense, honest chocolate experience.",
    gridClass: "lg:col-span-2 lg:h-[600px]" // Larger card to fill space
  },
  {
    id: "02",
    title: "Butter",
    subtitle: "The Texture",
    img: butterImg,
    text: "High-quality dairy butter for that perfect, melt-in-the-mouth pastry finish.",
    gridClass: "lg:col-span-1 lg:h-[600px]"
  },
  {
    id: "03",
    title: "Vanilla",
    subtitle: "The Soul",
    img: vanillaImg,
    text: "Hand-selected beans that provide the deep, aromatic heart of our bakes.",
    gridClass: "lg:col-span-1 lg:h-[600px]"
  },
  {
    id: "04",
    title: "Artisan Fruit",
    subtitle: "The Finish",
    img: fruitImg,
    text: "Fresh, seasonal fruits picked at their peak for natural sweetness.",
    gridClass: "lg:col-span-4 lg:h-[400px]" // Full width bottom card
  }
];

const Ingredients = () => {
  return (
    <section className="relative bg-[#FFF5F7] py-24 sm:py-32 px-4 overflow-hidden" id="philosophy">
      
      {/* BACKGROUND DECORATIONS: Floating Blobs & Grain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#E89EB8]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[0%] -right-[5%] w-[30%] h-[50%] bg-[#E89EB8]/10 blur-[100px] rounded-full" />
        {/* SVG Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* HEADER AREA */}
        <div className="mb-16 sm:mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-[#E89EB8]" />
                <h4 className="text-[#E89EB8] font-black uppercase tracking-[0.4em] text-[10px]">Quality Ingredients</h4>
            </div>
            <h2 className="text-slate-900 text-5xl md:text-8xl font-serif leading-[0.9] tracking-tight mb-4">
              Quality is never <br /> 
              <span className="italic">an accident</span><span className="text-[#E89EB8]">.</span>
            </h2>
            <p className="text-slate-500 font-light text-lg max-w-xl mt-8 leading-relaxed">
                We believe the secret to world-class baking lies in the purity of the source. 
                Every element is selected to engineer the perfect moment of sweetness.
            </p>
          </motion.div>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
          {ingredients.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className={`relative group rounded-[2.5rem] overflow-hidden bg-white shadow-xl shadow-pink-200/20 border border-white/50 ${item.gridClass} h-[500px]`}
            >
              {/* IMAGE AS BACKGROUND */}
              <div 
                className="absolute inset-0 w-full h-full transition-transform duration-[3000ms] ease-out group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

              {/* CONTENT AREA */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                
                {/* ID Number Overlay */}
                <div className="absolute top-8 right-8 overflow-hidden h-20 w-24">
                    <span className="text-white/10 text-9xl font-serif leading-none absolute -top-4 -right-2 group-hover:text-[#E89EB8]/30 transition-colors duration-700">
                      {item.id}
                    </span>
                </div>
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h5 className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.5em] mb-2">
                        {item.subtitle}
                    </h5>
                    <h3 className="text-white text-3xl md:text-4xl font-serif mb-4">
                        {item.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light max-w-xs md:max-w-md group-hover:text-white/90 transition-colors duration-500">
                        {item.text}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Interaction Border */}
              <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-all duration-700 rounded-[2rem] pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;