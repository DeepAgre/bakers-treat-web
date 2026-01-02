import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  return (
    /* Updated background and added transition-colors for a smooth theme switch */
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-[#0F0F0F] px-6 pt-24 sm:pt-0 transition-colors duration-500" id="hero">
      
      {/* BACKGROUND DECORATION: Soft pink glow for Light Mode, subtle for Dark */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-[#E89EB8]/5 dark:bg-[#E89EB8]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[20vw] h-[20vw] bg-[#E89EB8]/5 dark:bg-[#E89EB8]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* LEFT SIDE: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={!isParentLoading ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-[#E89EB8]"></span>
            <span className="uppercase tracking-[0.5em] text-[10px] font-black text-[#E89EB8] font-sans">
              Thane's Premier Custom Studio
            </span>
          </div>
          
          <h1 
            style={{ fontFamily: "'Playfair Display', serif" }} 
            className="text-6xl md:text-8xl leading-[1.05] mb-8 text-gray-900  tracking-tight transition-colors"
          >
            Delight <br />
            <span className="text-[#E89EB8]">Bakehouse</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-md leading-relaxed font-sans transition-colors">
            Handcrafted luxury chocolates and custom 3D cakes engineered by <span className="font-semibold text-gray-900  transition-colors">Khushi Manjrekar</span>. 
          </p>
          
          <div className="flex flex-wrap gap-5">
            <button 
              onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
              className="bg-black dark:bg-[#E89EB8] text-white dark:text-black px-12 py-5 rounded-full font-sans font-black uppercase tracking-widest hover:bg-[#E89EB8] dark:hover:bg-white transition-all shadow-xl hover:scale-105 active:scale-95 text-[12px]"
            >
              Explore Menu
            </button>
            <button 
              onClick={() => document.getElementById('custom-studio').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-gray-200 dark:border-white/10 text-gray-900  px-10 py-5 rounded-full font-sans font-black uppercase tracking-widest hover:border-[#E89EB8] hover:text-[#E89EB8] transition-all text-[12px]"
            >
              Custom Orders
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Visual Elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={!isParentLoading ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative" 
        >
          {/* Main Image Frame - Changed border color to be soft in Light Mode */}
          <div className="relative z-10 rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-2xl border-[6px] sm:border-[10px] border-white dark:border-[#1A1A1A] transition-all">
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000" 
              alt="Delight Bakehouse Signature Cake" 
              className="w-full h-[400px] sm:h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          
          {/* Floating Badge (New Element for Premium Feel) */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 z-20 bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5 hidden sm:block"
          >
            <p className="text-[#E89EB8] font-black text-[10px] uppercase tracking-widest mb-1">Thane West</p>
            <p className="text-gray-900  font-serif font-bold italic">Bakers Treat</p>
          </motion.div>
        </motion.div>
      </div>

      {/* BACKGROUND TEXT: Adjusted to be almost invisible in Light Mode for clarity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05] select-none pointer-events-none">
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[45vw] font-bold text-gray-300 ">DB</h2>
      </div>
    </section>
  );
};

export default Hero;