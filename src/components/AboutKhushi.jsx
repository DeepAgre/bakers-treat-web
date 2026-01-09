import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// Your local asset import
import KhushiProfile from '../assets/chococake.jpeg';

const AboutKhushi = () => {
  const containerRef = useRef(null);

  // Scroll tracking for "Idea Bakery" style fades and movements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animation values for smooth transitions
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1.1]);
  const textParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-40 w-full overflow-hidden bg-[#0a0a0a]" 
      id="about"
    >
      {/* 1. CINEMATIC BACKGROUND TYPOGRAPHY (Scrolling Background Text) */}
      <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-between py-20 opacity-[0.03]">
        <motion.h2 
           style={{ x: useTransform(scrollYProgress, [0, 1], [-300, 300]) }}
           className="text-[22vw] font-serif leading-none text-white whitespace-nowrap"
        >
          ARCHITECTURAL EDIBLES
        </motion.h2>
        <motion.h2 
           style={{ x: useTransform(scrollYProgress, [0, 1], [300, -300]) }}
           className="text-[22vw] font-serif leading-none text-white whitespace-nowrap text-right"
        >
          {/* Using the friend's name from your context */}
          KHUSHI MANJREKAR
        </motion.h2>
      </div>

      <motion.div 
        style={{ opacity, y }}
        className="max-w-[1400px] mx-auto px-6 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: THE ARTWORK IMAGE (Your local chococake.jpeg) */}
          <div className="lg:col-span-6 relative">
             <motion.div 
               style={{ scale: imageScale }}
               className="aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden border border-white/10 relative shadow-2xl"
             >
                <img 
                  src={KhushiProfile} 
                  alt="Delight Bakehouse Signature Cake" 
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000 ease-out"
                />
                {/* Deep Overlay for the Olly Aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
             </motion.div>

             {/* Floating Engineering Caption */}
             <motion.div 
               style={{ y: useTransform(scrollYProgress, [0, 1], [80, -80]) }}
               className="absolute -bottom-10 -right-6 lg:-right-10 bg-[#111] backdrop-blur-3xl p-10 rounded-3xl border border-white/10 hidden md:block shadow-2xl"
             >
                <p className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.5em] mb-3">Studio Thane</p>
                <p className="text-white font-serif italic text-2xl leading-tight">
                    "Precision is the <br/> secret ingredient."
                </p>
                <div className="mt-6 h-[1px] w-12 bg-[#E89EB8]/40" />
             </motion.div>
          </div>

          {/* RIGHT: THE STORY CONTENT */}
          <motion.div 
            style={{ y: textParallax }}
            className="lg:col-span-6 space-y-12"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    transition={{ duration: 1 }}
                    className="h-[1px] bg-[#E89EB8]" 
                 />
                 <span className="text-[#E89EB8] uppercase tracking-[0.8em] text-[11px] font-bold">The Visionary</span>
              </div>
              <h2 className="text-7xl lg:text-[8.5rem] font-serif text-white leading-[0.8] tracking-tighter">
                Crafting <br />
                <span className="italic text-[#E89EB8] font-light">Emotions.</span>
              </h2>
            </div>

            <div className="space-y-8 text-white/50 text-xl font-light leading-relaxed max-w-xl">
              <p>
                Based in <span className="text-white">Thane</span>, Khushi Manjrekar founded <span className="text-white italic">Delight Bakehouse</span> to bridge the gap between structural design and artisanal baking.
              </p>
              <p className="border-l-2 border-[#E89EB8] pl-8 italic text-white/70">
                “I don't just see layers of sponge and cream; I see structural integrity, flavor profiles, and the emotional resonance of a celebration.”
              </p>
            </div>

            {/* PREMIUM STATS GRID */}
            <div className="grid grid-cols-2 gap-12 pt-10 border-t border-white/10">
              <div className="group cursor-default">
                <p className="text-5xl font-serif text-white group-hover:text-[#E89EB8] transition-colors duration-500">100%</p>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mt-3 font-black">Custom Designed</p>
              </div>
              <div className="group cursor-default">
                <p className="text-5xl font-serif text-white group-hover:text-[#E89EB8] transition-colors duration-500">Pure</p>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mt-3 font-black">Belgian Cocoa</p>
              </div>
            </div>

            <button 
              className="group relative px-12 py-5 overflow-hidden rounded-full border border-white/10 text-white text-[11px] uppercase tracking-[0.5em] font-black transition-all duration-500 hover:border-[#E89EB8]"
            >
              <span className="relative z-10">Discover Her Process</span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                Discover Her Process
              </span>
            </button>
          </motion.div>

        </div>
      </motion.div>

      {/* 4. GRAIN & TEXTURE OVERLAY */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </section>
  );
};

export default AboutKhushi;