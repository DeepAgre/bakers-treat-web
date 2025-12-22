import React from 'react';
import { motion } from 'framer-motion';

const ingredients = [
  {
    id: "01",
    title: "Pure Cocoa",
    subtitle: "The Foundation",
    img: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=800",
    text: "Sourced from premium farms for an intense, honest chocolate experience."
  },
  {
    id: "02",
    title: "Butter",
    subtitle: "The Texture",
    img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=800",
    text: "High-quality dairy butter for that perfect, melt-in-the-mouth pastry finish."
  },
  {
    id: "03",
    title: "Vanilla",
    subtitle: "The Soul",
    img: "https://images.unsplash.com/photo-1590779033100-9f60705a2d3d?auto=format&fit=crop&q=80&w=800",
    text: "Hand-selected beans that provide the deep, aromatic heart of our bakes."
  },
  {
    id: "04",
    title: "Artisan Fruit",
    subtitle: "The Finish",
    img: "https://images.unsplash.com/photo-1610832958506-aa56338406cd?auto=format&fit=crop&q=80&w=800",
    text: "Fresh, seasonal fruits picked at their peak for natural sweetness."
  }
];

const Ingredients = () => {
  return (
    <section className="bg-[#0A0A0A] py-24 sm:py-32 px-6" id="philosophy">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-[#E89EB8] font-bold uppercase tracking-[0.4em] text-[10px] mb-6">Our Philosophy</h4>
            <h2 className="text-white text-4xl md:text-7xl font-serif max-w-3xl leading-tight">
              Quality is never an accident<span className="text-[#E89EB8]">.</span>
            </h2>
          </motion.div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              {/* IMAGE AS BACKGROUND: This ensures it fills the entire 500px height */}
              <img 
                src={item.img} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50"
              />
              
              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Content positioned on top of image */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* ID Number inside the card */}
                <span className="absolute top-8 left-8 text-white/10 text-7xl font-serif select-none">
                  {item.id}
                </span>
                
                <div className="relative z-10">
                  <h5 className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                    {item.subtitle}
                  </h5>
                  <h3 className="text-white text-2xl font-serif mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed font-light">
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