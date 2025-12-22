import React from 'react';
import { motion } from 'framer-motion';
import khushiImg from '../assets/khushi.jpg'; 

const AboutKhushi = () => {
  return (
    <section className="py-20 sm:py-32 px-6 max-w-7xl mx-auto overflow-hidden" id="about">
      {/* items-stretch ensures the image height matches the text height for a balanced look */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
        
        {/* LEFT SIDE: Image Container */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-full min-h-[400px] sm:min-h-[550px]"
        >
          {/* Main Image Frame - Now without any badges */}
          <div className="relative z-10 rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl h-full border border-black/5">
            <img 
              src={khushiImg} 
              alt="Khushi Manjrekar" 
              className="w-full h-full object-cover"
            />
            
            {/* Elegant Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-30" />
          </div>
          
          {/* Decorative Background Glow for depth */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#E89EB8]/10 rounded-full blur-3xl -z-10" />
        </motion.div>

        {/* RIGHT SIDE: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center py-4"
        >
          <span className="text-[#E89EB8] uppercase tracking-[0.4em] text-[10px] sm:text-[12px] font-black mb-6 block font-sans">
            The Artist
          </span>
          
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">
            Meet Khushi Manjrekar<span className="text-[#E89EB8]">.</span>
          </h2>
          
          <div className="space-y-6 text-gray-500 font-sans leading-relaxed text-[16px] sm:text-lg">
            <p className="text-justify">
              Based in the heart of Thane, Khushi transformed her passion for art into a world of edible wonders. With a keen eye for detail and a background in design, she doesn't just bake cakes—she builds dreams.
            </p>
            <p className="text-justify">
              Every creation at <strong className="text-gray-900">Bakers Treat</strong> is a labor of love, using only the finest ingredients like Belgian chocolate and fresh artisan fruits. For Khushi, the goal is simple: to create a centerpiece that tastes even better than it looks.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-100">
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">100+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#E89EB8] mt-2">Cakes Delivered</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">100%</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#E89EB8] mt-2">Eggless Options</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutKhushi;