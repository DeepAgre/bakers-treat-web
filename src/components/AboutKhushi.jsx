import React from 'react';
import { motion } from 'framer-motion';
import khushiImg from '../assets/khushi.jpg'; 

const AboutKhushi = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE: Image Container */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] border border-black/5">
            <img 
              src={khushiImg} 
              alt="Khushi Manjrekar" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Decorative background shape */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#E89EB8]/10 rounded-full blur-3xl -z-10" />
          
          {/* NOTICE: The pink "Est. 2025" badge has been removed from here */}
        </motion.div>

        {/* RIGHT SIDE: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-[#E89EB8] uppercase tracking-[0.4em] text-[12px] font-black mb-6 block font-sans">
            The Artist
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Meet Khushi Manjrekar<span className="text-[#E89EB8]">.</span>
          </h2>
          
          <div className="space-y-6 text-gray-500 font-sans leading-relaxed text-lg text-justify">
            <p>
              Based in the heart of Thane, Khushi transformed her passion for art into a world of edible wonders. With a keen eye for detail and a background in design, she doesn't just bake cakes—she builds dreams.
            </p>
            <p>
              Every creation at **Bakers Treat** is a labor of love, using only the finest ingredients. For Khushi, the goal is simple: to create a centerpiece that tastes even better than it looks.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-100">
            <div>
              <p className="text-3xl font-serif font-bold text-gray-900">500+</p>
              <p className="text-[10px] uppercase tracking-widest font-black text-[#E89EB8] mt-1">Cakes Delivered</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-gray-900">100%</p>
              <p className="text-[10px] uppercase tracking-widest font-black text-[#E89EB8] mt-1">Eggless Options</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutKhushi;