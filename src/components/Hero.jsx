import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  return (
    /* 1. Added bg-white dark:bg-[#0F0F0F] and transition classes */
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white dark:bg-[#0F0F0F] px-6 pt-24 sm:pt-0 transition-colors duration-500">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={!isParentLoading ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-[#E89EB8]"></span>
            <span className="uppercase tracking-[0.5em] text-[10px] font-black text-[#E89EB8] font-sans">
              Thane's Premier Custom Studio
            </span>
          </div>
          
          {/* 2. Updated Branding: Delight Bakehouse and dark:text-white */}
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: '400' }} className="text-5xl md:text-8xl leading-[1.1] mb-8 text-gray-900 dark:text-white tracking-tight transition-colors">
            Delight <br />
            <span className="text-[#E89EB8]">Bakehouse</span>
          </h1>
          
          {/* 3. Text color adjusted for Dark Mode visibility */}
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-md leading-relaxed font-sans transition-colors">
            Handcrafted luxury chocolates and custom 3D cakes engineered by Khushi Manjrekar. 
          </p>
          
          <div className="flex flex-wrap gap-5">
            <button 
              onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
              className="bg-black dark:bg-[#E89EB8] text-white dark:text-black px-10 py-5 rounded-full font-sans font-black uppercase tracking-widest hover:bg-[#E89EB8] dark:hover:bg-white transition-all shadow-xl hover:scale-105 active:scale-95 text-[12px]"
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
          className="relative block w-full" 
        >
          {/* 4. Added dark:border-white/10 to the image frame */}
          <div className="relative z-10 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-[8px] sm:border-[12px] border-white dark:border-[#1A1A1A] transition-colors">
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000" 
              alt="Delight Bakehouse Signature" 
              className="w-full h-[350px] sm:h-[550px] object-cover"
            />
          </div>
          
          {/* Glowing Accents */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E89EB8]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#E89EB8]/20 rounded-full blur-3xl"></div>
        </motion.div>
      </div>

      {/* 5. Decorative Background Text: Adjusted opacity for Dark Mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] dark:opacity-[0.05] select-none pointer-events-none">
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[40vw] font-bold text-black dark:text-white">D B</h2>
      </div>
    </section>
  );
};

export default Hero;