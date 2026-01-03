import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  return (
    /* UI FIX: Pure white background with zero dark-mode logic */
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white px-6 pt-24 sm:pt-0" id="hero">
      
      {/* BACKGROUND DECORATION: Soft pink glows for depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] bg-[#E89EB8]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[25vw] h-[25vw] bg-[#E89EB8]/5 rounded-full blur-[100px]" />
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
            className="text-6xl md:text-8xl leading-[1.05] mb-8 text-slate-900 tracking-tight"
          >
            Bakers <br />
            <span className="text-[#E89EB8]">Treat</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-md leading-relaxed font-sans">
            Handcrafted luxury chocolates and custom 3D cakes engineered by <span className="font-bold text-slate-900">Khushi Manjrekar</span>. 
          </p>
          
          <div className="flex flex-wrap gap-5">
            <button 
              onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
              className="bg-slate-900 text-white px-12 py-5 rounded-full font-sans font-black uppercase tracking-widest hover:bg-[#E89EB8] transition-all shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 text-[12px]"
            >
              Explore Menu
            </button>
            <button 
              onClick={() => document.getElementById('custom-studio').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-slate-100 bg-white text-slate-900 px-10 py-5 rounded-full font-sans font-black uppercase tracking-widest hover:border-[#E89EB8] hover:text-[#E89EB8] transition-all shadow-sm text-[12px]"
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
          {/* Main Image Frame - Clean White border with soft shadow */}
          <div className="relative z-10 rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] border-[8px] sm:border-[12px] border-white">
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000" 
              alt="Bakers Treat Signature Cake" 
              className="w-full h-[400px] sm:h-[650px] object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          
          {/* Floating Badge */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 hidden sm:block"
          >
            <p className="text-[#E89EB8] font-black text-[10px] uppercase tracking-widest mb-1">Thane West</p>
            <p className="text-slate-900 font-serif font-bold italic text-lg">Bakers Treat</p>
          </motion.div>
        </motion.div>
      </div>

      {/* BACKGROUND TEXT: Subtle "BT" Initialism */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-[45vw] font-bold text-slate-900">BT</h2>
      </div>
    </section>
  );
};

export default Hero;