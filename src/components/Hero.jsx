import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  const heroRef = useRef(null);
  
  const bgImage = "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=2000&auto=format&fit=crop";
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Scroll Animations
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  // Mouse Parallax for Typography
  const driftX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const driftY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]" 
      id="hero"
    >
      {/* 1. CINEMATIC BACKGROUND */}
      <motion.div 
        style={{ scale, opacity: imageOpacity, filter: `blur(${blurValue}px)` }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={bgImage} 
          alt="Architectural Cake Layers" 
          className="w-full h-full object-cover grayscale-[20%] contrast-[110%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
      </motion.div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
        
        {/* LEFT: BOUTIQUE TYPOGRAPHY */}
        <motion.div 
          style={{ y: textY, x: driftX }}
          initial={{ opacity: 0, x: -60 }}
          animate={!isParentLoading ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 flex flex-col justify-center perspective-[1000px]"
        >
          <div className="flex items-center gap-6 mb-10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="h-[1px] bg-[#E89EB8]"
            />
            <span className="uppercase tracking-[1em] text-[10px] font-bold text-[#E89EB8]">
              Thane • Maharashtra
            </span>
          </div>
          
          <h1 className="text-[16vw] lg:text-[11rem] font-serif leading-[0.75] mb-12 text-white tracking-tighter">
            Delight <br />
            <span className="italic font-light text-[#E89EB8] ml-[8vw] relative inline-block">
                Bakehouse
                <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2, duration: 1.5 }}
                    className="absolute -bottom-4 left-0 w-full h-[1px] bg-white/10 origin-left"
                />
            </span>
          </h1>
          
          <div className="max-w-md space-y-12">
            <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-light italic">
              Architecting sweetness, <br/>
              <span className="text-white/70">layer by calculated layer.</span>
            </p>
            
            {/* BUTTONS: REDESIGNED FOR HIGH VISIBILITY AND MOBILE CLARITY */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-10 py-5 bg-[#E89EB8] text-black rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(232,158,184,0.3)] hover:shadow-[0_15px_40px_rgba(232,158,184,0.5)] transition-all duration-500"
              >
                Deconstruct Menu
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('custom').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 backdrop-blur-md rounded-full text-white text-[11px] font-black uppercase tracking-[0.3em] hover:border-[#E89EB8] transition-all duration-500"
              >
                Start Project
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: INTERACTIVE GLASS CARD */}
        <motion.div 
          style={{ y: driftY, x: driftX }}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={!isParentLoading ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 2, delay: 0.8 }}
          className="lg:col-span-4 hidden lg:flex items-center justify-end"
        >
          <div className="relative group">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-20 border border-white/5 rounded-full pointer-events-none"
            />
            
            <div className="w-[340px] bg-white/[0.01] backdrop-blur-2xl border border-white/10 p-14 rounded-[4rem] shadow-2xl transition-all duration-1000 group-hover:bg-white/[0.04] group-hover:border-[#E89EB8]/20 group-hover:-translate-y-4">
              <div className="space-y-12">
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black text-[#E89EB8] uppercase tracking-widest">The Studio</span>
                       <div className="px-2 py-1 border border-white/10 rounded-md text-[8px] text-white/30 font-mono tracking-widest uppercase">Live 2026</div>
                    </div>
                    <h3 className="text-3xl font-serif italic text-white leading-tight">Edible <br/> Blueprints.</h3>
                </div>

                <div className="space-y-6">
                  <div className="h-[1px] w-full bg-gradient-to-r from-[#E89EB8]/30 via-white/10 to-transparent" />
                  <p className="text-sm text-white/40 leading-relaxed font-light">
                    Founded by Khushi Manjrekar, Delight Bakehouse merges industrial precision with artisanal soul to create Thane's most exclusive cakes.
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 group-hover:gap-6 transition-all duration-500">
                   <div className="h-[1px] w-8 bg-[#E89EB8]" />
                   <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">Commission only</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. SCROLL INDICATOR */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 flex items-center gap-8"
      >
        <span className="text-[10px] text-white/20 uppercase tracking-[0.6em] [writing-mode:vertical-lr] lg:[writing-mode:horizontal-tb]">Scroll to reveal</span>
        <div className="h-[1px] w-24 bg-gradient-to-r from-white/10 to-transparent hidden lg:block" />
      </motion.div>
    </section>
  );
};

export default Hero;