import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  const bgImage = "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=2000";
  
  // Parallax scroll for floating elements
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

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
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-transparent lg:bg-gradient-to-r lg:from-white lg:via-white/80 lg:to-transparent" />
        <div className="absolute inset-0 bg-white/30 lg:hidden pointer-events-none" /> 
      </div>

      {/* 2. DYNAMIC FLOATING ELEMENTS (The "Cool" Factor) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Floating Chocolate Shard - Top Right */}
        <motion.div style={{ y: y1, rotate }} className="absolute top-[15%] right-[10%] hidden lg:block opacity-80">
          <div className="w-24 h-32 bg-slate-900/10 backdrop-blur-sm rounded-full blur-2xl" />
          <img src="https://pngimg.com/d/chocolate_PNG97184.png" className="w-32 h-auto drop-shadow-2xl" alt="" />
        </motion.div>

        {/* Floating Berry/Element - Bottom Center */}
        <motion.div style={{ y: y2 }} className="absolute bottom-[20%] left-[45%] hidden lg:block opacity-60">
          <div className="w-16 h-16 bg-[#E89EB8]/30 rounded-full blur-xl" />
        </motion.div>

        {/* Soft Pink Glowing Orbs to fill space */}
        <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-[#E89EB8]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[10%] w-96 h-96 bg-slate-200/20 rounded-full blur-[120px]" />
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

        {/* RIGHT SIDE: Interactive 3D Card (Replaces the Brown Cake) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={!isParentLoading ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:flex justify-end" 
        >
          {/* A Floating "Philosophy" Card instead of a simple photo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#E89EB8]/20 blur-3xl rounded-full scale-110 group-hover:bg-[#E89EB8]/30 transition-colors" />
            
            <div className="relative z-10 w-[450px] aspect-[4/5] bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-2xl p-12 flex flex-col justify-between overflow-hidden">
                {/* Decorative Pattern inside card */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E89EB8]/10 rounded-full blur-3xl" />
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white text-xl">✨</div>
                  <h3 className="text-3xl font-serif text-slate-900 italic">"Engineering the art of sweetness"</h3>
                </div>

                <div className="space-y-6">
                  <div className="h-[1px] w-full bg-slate-200" />
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Est. 2024</p>
                      <p className="text-xl font-sans font-bold text-slate-900">Thane West</p>
                    </div>
                    <div className="w-16 h-16 rounded-full border border-[#E89EB8] p-1">
                        <div className="w-full h-full rounded-full bg-[#E89EB8]/10 flex items-center justify-center text-[#E89EB8] font-bold">BT</div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SUBTLE TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </section>
  );
};

export default Hero;