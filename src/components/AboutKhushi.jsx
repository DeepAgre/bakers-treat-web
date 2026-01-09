import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutKhushi = () => {
  const containerRef = useRef(null);

  // Scroll tracking for "Idea Bakery" style fades
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animation values
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.1]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-40 w-full overflow-hidden bg-[#0a0a0a]" 
      id="about"
    >
      {/* 1. CINEMATIC BACKGROUND TYPOGRAPHY (Bernice Bakery Style) */}
      <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-between py-20 opacity-[0.02]">
        <motion.h2 
           style={{ x: useTransform(scrollYProgress, [0, 1], [-200, 200]) }}
           className="text-[25vw] font-serif leading-none text-white whitespace-nowrap"
        >
          THE ART OF CAKERY
        </motion.h2>
        <motion.h2 
           style={{ x: useTransform(scrollYProgress, [0, 1], [200, -200]) }}
           className="text-[25vw] font-serif leading-none text-white whitespace-nowrap text-right"
        >
          KHUSHI MANJREKAR
        </motion.h2>
      </div>

      <motion.div 
        style={{ opacity, y }}
        className="max-w-[1400px] mx-auto px-6 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* LEFT: THE STORY IMAGE (The Olly Style) */}
          <div className="lg:col-span-6 relative">
             <motion.div 
               style={{ scale: imageScale }}
               className="aspect-[4/5] w-full rounded-[2rem] overflow-hidden border border-white/10 relative"
             >
                <img 
                  src="https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1200&auto=format&fit=crop" 
                  alt="Khushi's Workspace"
                  className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
             </motion.div>

             {/* Floating Caption */}
             <motion.div 
               style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
               className="absolute -bottom-10 -right-10 bg-white/5 backdrop-blur-2xl p-8 rounded-2xl border border-white/10 hidden md:block"
             >
                <p className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.4em] mb-2">Thane Studio</p>
                <p className="text-white font-serif italic text-xl">"Where blueprints become sugar."</p>
             </motion.div>
          </div>

          {/* RIGHT: THE CONTENT (Idea Bakery Style) */}
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-[1px] bg-[#E89EB8]" />
                 <span className="text-[#E89EB8] uppercase tracking-[0.6em] text-[10px] font-bold">The Founder</span>
              </div>
              <h2 className="text-7xl lg:text-9xl font-serif text-white leading-[0.85] tracking-tighter">
                Meet <br />
                <span className="italic text-[#E89EB8] font-light">Khushi.</span>
              </h2>
            </div>

            <div className="space-y-8 text-white/50 text-xl font-light leading-relaxed max-w-xl">
              <p>
                Based in the heart of <span className="text-white">Thane</span>, Khushi Manjrekar deconstructs the traditional bakery experience. 
                At <span className="text-white italic">Bakers Treat</span>, we view every cake as a piece of edible architecture.
              </p>
              <p className="border-l border-[#E89EB8]/30 pl-8 italic">
                “My goal is to balance the structural precision of a designer with the soul of a storyteller. Every layer is a calculated decision; every flavor is a memory.”
              </p>
            </div>

            {/* PREMIUM STATS GRID (The Olly Style) */}
            <div className="grid grid-cols-2 gap-12 pt-10 border-t border-white/10">
              <div className="group">
                <p className="text-4xl font-serif text-white group-hover:text-[#E89EB8] transition-colors">100%</p>
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 mt-2 font-black">Bespoke Design</p>
              </div>
              <div className="group">
                <p className="text-4xl font-serif text-white group-hover:text-[#E89EB8] transition-colors">Premium</p>
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 mt-2 font-black">Belgian Ingredients</p>
              </div>
            </div>

            <button 
              className="px-12 py-5 border border-white/10 rounded-full text-white text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-white hover:text-black transition-all duration-500"
            >
              The Story Continued
            </button>
          </div>

        </div>
      </motion.div>

      {/* 4. TEXTURE OVERLAY */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </section>
  );
};

export default AboutKhushi;