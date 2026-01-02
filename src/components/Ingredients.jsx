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
    /* Changed bg to adapt to both modes */
    <section className="bg-white dark:bg-[#0A0A0A] py-24 sm:py-32 px-6 overflow-hidden transition-colors duration-500" id="philosophy">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 sm:mb-24 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-[#E89EB8] font-bold uppercase tracking-[0.4em] text-[10px] mb-6">Our Philosophy</h4>
            <h2 className="text-gray-900 dark:text-white text-4xl md:text-7xl font-serif max-w-3xl leading-tight">
              Quality is never an accident<span className="text-[#E89EB8]">.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              /* Added border for light mode visibility */
              className="relative group h-[550px] rounded-[2.5rem] overflow-hidden bg-gray-100 dark:bg-[#1A1A1A] shadow-2xl border border-gray-100 dark:border-transparent"
            >
              {/* IMAGE AS BACKGROUND */}
              <div 
                className="absolute inset-0 w-full h-full transition-all duration-1000 group-hover:scale-110 opacity-70 dark:opacity-60 group-hover:opacity-100"
                style={{ 
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              
              {/* Improved Gradient: Stronger at bottom for light mode text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-black dark:via-black/40" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
                {/* ID Number - Reduced opacity for cleaner look */}
                <span className="absolute top-8 left-8 text-white/20 dark:text-white/10 text-7xl font-serif select-none pointer-events-none">
                  {item.id}
                </span>
                
                <div className="relative z-10">
                  <h5 className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                    {item.subtitle}
                  </h5>
                  <h3 className="text-white text-2xl font-serif mb-3 group-hover:text-[#E89EB8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/80 dark:text-white/60 text-sm leading-relaxed font-light">
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;