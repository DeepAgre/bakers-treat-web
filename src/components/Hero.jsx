import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  // A premium, slightly moody baking-themed image
  const bgImage = "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=2000";

  return (
    <section 
      /* UI ADJUSTMENT: 
        1. Reduced pt-48 to pt-32 on mobile to pull content up.
        2. Added items-start on mobile so it doesn't try to vertically center in a way that hides buttons.
      */
      className="relative min-h-screen flex items-start lg:items-center justify-center overflow-hidden px-6 pt-32 pb-10 lg:pt-32 bg-white" 
      id="hero"
    >
      {/* 1. BACKGROUND IMAGE & OVERLAYS */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="Baking background" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-transparent lg:bg-gradient-to-r lg:from-white lg:via-white/90 lg:to-transparent" />
        
        <div className="absolute inset-0 bg-white/40 lg:hidden pointer-events-none" /> 
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center relative z-10">
        
        {/* LEFT SIDE: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={!isParentLoading ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4 lg:mb-6">
            <span className="w-10 h-[2px] bg-[#E89EB8]"></span>
            <span className="uppercase tracking-[0.3em] lg:tracking-[0.5em] text-[10px] md:text-[12px] font-black text-[#E89EB8] font-sans">
              Thane's Premier Custom Studio
            </span>
          </div>
          
          <h1 
            style={{ 
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 2px 10px rgba(255,255,255,0.5)" 
            }} 
            className="text-5xl md:text-8xl leading-[1.1] mb-4 lg:mb-8 text-slate-900 tracking-tight"
          >
            Bakers <br />
            <span className="text-slate-800">Treat</span>
          </h1>
          
          <p className="text-base md:text-xl text-slate-700 mb-6 lg:mb-10 max-w-sm lg:max-w-md leading-relaxed font-sans font-medium">
            Handcrafted luxury chocolates and custom 3D cakes engineered by <span className="font-bold text-slate-900 underline decoration-[#E89EB8] decoration-2 underline-offset-4">Khushi Manjrekar</span>. 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-5">
            <button 
              onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
              className="bg-slate-900 text-white px-8 lg:px-12 py-4 lg:py-5 rounded-full font-sans font-black uppercase tracking-widest hover:bg-[#E89EB8] transition-all shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 text-[11px] lg:text-[12px] text-center"
            >
              Explore Menu
            </button>
            <button 
              onClick={() => document.getElementById('custom-studio').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-slate-200 bg-white/80 backdrop-blur-md text-slate-900 px-8 lg:px-10 py-4 lg:py-5 rounded-full font-sans font-black uppercase tracking-widest hover:border-[#E89EB8] hover:text-[#E89EB8] transition-all shadow-sm text-[11px] lg:text-[12px] text-center"
            >
              Custom Orders
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Visual Elements (Desktop only) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={!isParentLoading ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block" 
        >
          <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] border-[12px] border-white">
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000" 
              alt="Signature Cake" 
              className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50"
          >
            <p className="text-[#E89EB8] font-black text-[10px] uppercase tracking-widest mb-1">Thane West</p>
            <p className="text-slate-900 font-serif font-bold italic text-lg">Bakers Treat</p>
          </motion.div>
        </motion.div>
      </div>

      {/* SUBTLE TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </section>
  );
};

export default Hero;