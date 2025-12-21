import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  return (
    /* Adjusted padding to ensure it never goes under the navbar */
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#F9F8F6] px-6 pt-12 sm:pt-0">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={!isParentLoading ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="z-10 mt-8 sm:mt-0"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-[#E89EB8]"></span>
            <span className="uppercase tracking-[0.5em] text-[10px] font-black text-[#E89EB8] font-sans">
              Thane's Premier Custom Studio
            </span>
          </div>
          
          {/* NEW PREMIUM FONT: Playfair Display */}
          <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 text-gray-900">
            Delight <br />
            <span className="italic text-[#E89EB8]">Bakehouse</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-md leading-relaxed font-sans">
            Handcrafted luxury chocolates and custom 3D cakes engineered by Khushi Manjrekar. 
          </p>
          
          <div className="flex flex-wrap gap-5">
            <button 
              onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
              className="bg-black text-white px-10 py-5 rounded-full font-sans font-black uppercase tracking-widest hover:bg-[#E89EB8] transition-all shadow-xl hover:scale-105 active:scale-95 text-[12px]"
            >
              Explore Menu
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Visual Elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={!isParentLoading ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative hidden sm:block" 
        >
          {/* Main Floating Image - Using a more reliable URL */}
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white transform rotate-3">
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000" 
              alt="Delight Bakehouse Signature" 
              className="w-full h-[550px] object-cover"
            />
          </div>
          
          {/* Glass Card Overlay */}
          <div className="absolute -bottom-6 -right-6 bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl z-20 border border-white/20">
            <p className="text-[#E89EB8] font-serif italic text-2xl">Bespoke</p>
            <p className="text-gray-900 font-sans font-black uppercase tracking-widest text-[10px]">Quality Guaranteed</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none">
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[40vw] font-bold">D B</h2>
      </div>
    </section>
  );
};

export default Hero;