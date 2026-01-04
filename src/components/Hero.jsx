import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  const bgImage = "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=2000";
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const rotate = useTransform(scrollY, [0, 500], [0, 25]);

  return (
    <section 
      className="relative min-h-screen flex items-start lg:items-center justify-center overflow-hidden px-6 pt-32 pb-10 lg:pt-20 bg-white" 
      id="hero"
    >
      {/* 1. BACKGROUND IMAGE & OVERLAYS */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="Baking background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent lg:bg-gradient-to-r lg:from-white lg:via-white/90 lg:to-transparent" />
        <div className="absolute inset-0 bg-white/40 lg:hidden pointer-events-none" /> 
      </div>

      {/* 2. UNIQUE ABSTRACT ELEMENTS (Replaced Chocolates) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden lg:block">
        {/* Floating Geometric Wireframe */}
        <motion.div style={{ y: y1, rotate }} className="absolute top-[20%] right-[15%] opacity-20">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-slate-900">
            <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" strokeWidth="0.5" strokeDasharray="2 2" />
            <path d="M50 10 L50 90 M10 50 L90 50" strokeWidth="0.2" />
          </svg>
        </motion.div>

        {/* Soft Decorative Blobs */}
        <div className="absolute top-[10%] left-[50%] w-72 h-72 bg-[#E89EB8]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center relative z-20">
        
        {/* LEFT SIDE: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={!isParentLoading ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4 lg:mb-6">
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              className="h-[2px] bg-[#E89EB8]"
            ></motion.span>
            <span className="uppercase tracking-[0.3em] lg:tracking-[0.5em] text-[10px] md:text-[12px] font-black text-[#E89EB8] font-sans">
              Thane's Premier Custom Studio
            </span>
          </div>
          
          <h1 
            style={{ fontFamily: "'Playfair Display', serif" }} 
            className="text-6xl md:text-9xl leading-[1] mb-6 lg:mb-8 text-slate-900 tracking-tight"
          >
            Bakers <br />
            <span className="text-slate-800 italic">Treat</span>
          </h1>
          
          <p className="text-base md:text-xl text-slate-700 mb-8 lg:mb-10 max-w-sm lg:max-w-md leading-relaxed font-sans font-medium">
            Handcrafted luxury chocolates and custom 3D cakes engineered by <span className="font-bold text-slate-900 underline decoration-[#E89EB8] decoration-2 underline-offset-4">Khushi Manjrekar</span>. 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-6">
            <button 
              onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
              className="bg-slate-900 text-white px-10 py-5 rounded-xl font-sans font-black uppercase tracking-widest hover:bg-[#E89EB8] transition-all shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95 text-[11px] lg:text-[12px] text-center"
            >
              Explore Menu
            </button>
            <button 
              onClick={() => document.getElementById('custom-studio').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-slate-200 bg-white/60 backdrop-blur-md text-slate-900 px-10 py-5 rounded-xl font-sans font-black uppercase tracking-widest hover:border-[#E89EB8] hover:text-[#E89EB8] transition-all shadow-sm text-[11px] lg:text-[12px] text-center"
            >
              Custom Orders
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Overhauled Philosophy Card (Filled & Detailed) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={!isParentLoading ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:flex justify-end" 
        >
          <div className="relative group w-full max-w-[480px]">
            {/* Soft Glow Background */}
            <div className="absolute inset-0 bg-[#E89EB8]/15 blur-[100px] rounded-full" />
            
            <div className="relative z-10 w-full bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-10 flex flex-col gap-8 overflow-hidden">
                
                {/* 1. Header Section */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E89EB8]">The Philosophy</p>
                    <h3 className="text-3xl font-serif text-slate-900 leading-tight">Engineering the <br/> art of sweetness.</h3>
                  </div>
                  <div className="text-4xl text-slate-300 italic font-serif opacity-50">"</div>
                </div>

                {/* 2. Middle Content (Fills the blank space) */}
                <div className="grid grid-cols-2 gap-6 bg-white/30 rounded-2xl p-6 border border-white/40">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-slate-400">Precision</p>
                    <p className="text-sm font-sans text-slate-700">Calculated textures and custom 3D structures.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-slate-400">Purity</p>
                    <p className="text-sm font-sans text-slate-700">100% Handcrafted in our Thane studio.</p>
                  </div>
                </div>

                {/* 3. Footer Section */}
                <div className="space-y-6 pt-4 border-t border-slate-200/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-white p-1">
                       <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-black">BT</div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Khushi Manjrekar</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">Founder & Head Engineer</p>
                    </div>
                  </div>
                  
                  {/* Digital Signature Appearance */}
                  <div className="flex justify-between items-center">
                    <p className="font-serif italic text-slate-400 text-lg opacity-60">K. Manjrekar</p>
                    <div className="px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-black tracking-widest uppercase">
                      Est. 2024
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </section>
  );
};

export default Hero;