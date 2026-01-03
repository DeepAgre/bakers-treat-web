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
    text: "Sourced from premium farms for an intense, honest chocolate experience."
  },
  {
    id: "02",
    title: "Butter",
    subtitle: "The Texture",
    img: butterImg,
    text: "High-quality dairy butter for that perfect, melt-in-the-mouth pastry finish."
  },
  {
    id: "03",
    title: "Vanilla",
    subtitle: "The Soul",
    img: vanillaImg,
    text: "Hand-selected beans that provide the deep, aromatic heart of our bakes."
  },
  {
    id: "04",
    title: "Artisan Fruit",
    subtitle: "The Finish",
    img: fruitImg,
    text: "Fresh, seasonal fruits picked at their peak for natural sweetness."
  }
];

const Ingredients = () => {
  return (
    /* UI FIX: Soft blush background to replace dark mode completely */
    <section className="bg-[#FFF5F7]/50 py-24 sm:py-32 px-6 overflow-hidden" id="philosophy">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 sm:mb-24 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-[#E89EB8] font-bold uppercase tracking-[0.4em] text-[10px] mb-6">Our Philosophy</h4>
            <h2 className="text-slate-900 text-4xl md:text-7xl font-serif max-w-3xl leading-tight">
              Quality is never <br /> an accident<span className="text-[#E89EB8]">.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ingredients.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              /* UI FIX: Premium Card Styling */
              className="relative group h-[600px] rounded-[3rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white"
            >
              {/* IMAGE AS BACKGROUND with ultra-smooth slow hover */}
              <div 
                className="absolute inset-0 w-full h-full transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* GRADIENT OVERLAY: Interactive darkening on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent transition-opacity duration-700 opacity-80 group-hover:opacity-90" />

              {/* CONTENT AREA */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-left">
                
                {/* ID Number - Floating background effect */}
                <span className="absolute top-10 left-10 text-white/10 text-8xl font-serif select-none pointer-events-none group-hover:text-[#E89EB8]/20 transition-colors duration-700">
                  {item.id}
                </span>
                
                <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <h5 className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.4em] mb-3">
                    {item.subtitle}
                  </h5>
                  <h3 className="text-white text-3xl font-serif mb-4">
                    {item.title}
                  </h3>
                  
                  {/* Text reveals/expands slightly on hover */}
                  <p className="text-white/70 text-sm leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 max-w-[220px]">
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Decorative "Inner Glow" border on hover */}
              <div className="absolute inset-0 border-[0px] group-hover:border-[1px] border-white/20 transition-all duration-700 rounded-[3rem]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;