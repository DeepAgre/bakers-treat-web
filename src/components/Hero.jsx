import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  const heroRef = useRef(null);
  
  // High-end, moody artisanal background
  const bgImage = "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2000&auto=format&fit=crop";
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Scroll Animations (Idea Bakery Style)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]" 
      id="hero"
    >
      {/* 1. CINEMATIC BACKGROUND LAYER */}
      <motion.div 
        style={{ scale, y, opacity: 0.7 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={bgImage} 
          alt="Artisan Bakery" 
          className="w-full h-full object-cover"
        />
        {/* Deep Gradient Overlays for Readability (The Olly Style) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
      </motion.div>

      {/* 2. FLOATING GRAIN TEXTURE */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
        
        {/* LEFT CONTENT: TYPOGRAPHY (Bernice Bakery Vibe) */}
        <motion.div 
          style={{ y: textY, opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={!isParentLoading ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-8 flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-[1px] bg-[#E89EB8]"
            />
            <span className="uppercase tracking-[0.6em] text-[10px] font-bold text-[#E89EB8]">
              Thane • Maharashtra
            </span>
          </div>
          
          <h1 className="text-[14vw] lg:text-[10rem] font-serif leading-[0.8] mb-10 text-white tracking-tighter">
            Bakers <br />
            <span className="italic font-light text-[#E89EB8] ml-[5vw]">Treat</span>
          </h1>
          
          <div className="max-w-md space-y-8">
            <p className="text-xl text-white/70 leading-relaxed font-light italic">
              Where engineering meets edible art. Handcrafted by <span className="text-white border-b border-[#E89EB8]">Khushi Manjrekar</span>.
            </p>
            
            <div className="flex flex-wrap gap-8">
              <button 
                onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden text-white uppercase tracking-[0.3em] text-[11px] font-bold"
              >
                <span className="relative z-10">Explore Collection</span>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white transition-transform duration-500 scale-x-100 group-hover:scale-x-0 origin-right" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E89EB8] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left" />
              </button>

              <button 
                onClick={() => document.getElementById('custom-studio').scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden text-[#E89EB8] uppercase tracking-[0.3em] text-[11px] font-bold"
              >
                <span className="relative z-10">Commission Art</span>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E89EB8]/30" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT: FLOATING PHILOSOPHY (The Olly Style Glass) */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={!isParentLoading ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="lg:col-span-4 hidden lg:flex items-center justify-end"
        >
          <motion.div 
            whileHover={{ y: -10, rotate: -2 }}
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-2xl relative"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E89EB8]/20 blur-3xl rounded-full" />
            
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Philosophy</span>
                <h3 className="text-3xl font-serif italic text-white leading-tight">"We don't just bake; we architect emotions."</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] text-white/50 uppercase">Texture</span>
                  <span className="text-xs text-white font-medium italic">Perfected</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] text-white/50 uppercase">Design</span>
                  <span className="text-xs text-white font-medium italic">Custom 3D</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] text-white/50 uppercase">Origin</span>
                  <span className="text-xs text-white font-medium italic">Thane Studio</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#E89EB8] flex items-center justify-center text-[10px] text-[#E89EB8] font-bold">
                  KM
                </div>
                <span className="text-xs text-white/60 font-serif italic">Khushi Manjrekar</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 3. SCROLL INDICATOR (Idea Bakery Style) */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[8px] uppercase tracking-[0.4em] text-white">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;