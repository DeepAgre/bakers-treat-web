import React from 'react';
import { motion } from 'framer-motion';

const ingredients = [
  {
    id: "01",
    title: "Pure Cocoa",
    subtitle: "The Foundation",
    // NEW RELIABLE IMAGE: High-quality dark chocolate chunks
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
    img: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=1000&auto=format&fit=crop",
    text: "Hand-selected beans that provide the deep, aromatic heart of our bakes."
  },
  {
    id: "04",
    title: "Artisan Fruit",
    subtitle: "The Finish",
    img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop",
    text: "Fresh, seasonal fruits picked at their peak for natural sweetness."
  }
];

const Ingredients = () => {
  return (
    <section className="bg-[#1A1A1A] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="pt-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-[#E89EB8] font-bold uppercase tracking-[0.4em] text-[10px] mb-6">Our Philosophy</h4>
            <h2 className="text-white text-5xl md:text-7xl font-serif max-w-2xl leading-tight">
              Quality is never an accident<span className="text-[#E89EB8]">.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ingredients.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-8">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <span className="absolute top-6 left-6 text-white/20 text-6xl font-serif">{item.id}</span>
              </div>
              
              <h5 className="text-[#E89EB8] text-[10px] font-bold uppercase tracking-widest mb-2">
                {item.subtitle}
              </h5>
              <h3 className="text-white text-2xl font-serif mb-4">
                {item.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;