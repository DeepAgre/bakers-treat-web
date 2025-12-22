import React from 'react';
import { motion } from 'framer-motion';

const ingredients = [
  {
    id: "01",
    title: "Pure Cocoa",
    subtitle: "The Foundation",
    img: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1000&auto=format&fit=crop",
    text: "Sourced from premium farms for an intense, honest chocolate experience."
  },
  {
    id: "02",
    title: "Butter",
    subtitle: "The Texture",
    img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=1000&auto=format&fit=crop",
    text: "High-quality dairy butter for that perfect, melt-in-the-mouth pastry finish."
  },
  {
    id: "03",
    title: "Vanilla",
    subtitle: "The Soul",
    // FIXED: Real Vanilla beans/pods image instead of pomegranate
    img: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=1000&auto=format&fit=crop",
    text: "Hand-selected beans that provide the deep, aromatic heart of our bakes."
  },
  {
    id: "04",
    title: "Artisan Fruit",
    subtitle: "The Finish",
    // FIXED: Fresh seasonal berries/fruits instead of a cake
    img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1000&auto=format&fit=crop",
    text: "Fresh, seasonal fruits picked at their peak for natural sweetness."
  }
];

const Ingredients = () => {
  return (
    <section className="bg-[#1A1A1A] py-24 sm:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="pt-12 mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-[#E89EB8] font-bold uppercase tracking-[0.4em] text-[10px] mb-6">Our Philosophy</h4>
            <h2 className="text-white text-4xl md:text-7xl font-serif max-w-2xl leading-tight">
              Quality is never an accident<span className="text-[#E89EB8]">.</span>
            </h2>
          </motion.div>
        </div>

        {/* Improved Grid with consistent card heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {ingredients.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group flex flex-col h-full"
            >
              {/* FIXED: Aspect ratio and h-full ensures the image fills the top half of the dark card area */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 shadow-2xl bg-[#242424]">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Subtle Overlay for the ID number visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                <span className="absolute top-6 left-6 text-white/10 text-6xl font-serif select-none">
                  {item.id}
                </span>
              </div>
              
              <div className="flex-grow">
                <h5 className="text-[#E89EB8] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                  {item.subtitle}
                </h5>
                <h3 className="text-white text-2xl font-serif mb-4 group-hover:text-[#E89EB8] transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;