import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  const heroRef = useRef(null);
  
  // High-end, architectural cake-layer texture
  const bgImage = "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=2000&auto=format&fit=crop";
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 100 });

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
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 15]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]" 
      id="hero"
    >
      {/* 1. CINEMATIC CAKE LAYER BACKGROUND */}
      <motion.div 
        style={{ scale, opacity: imageOpacity, filter: `blur(${blurValue}px)` }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={bgImage} 
          alt="Architectural Cake Layers" 
          className="w-full h-full object-cover grayscale-[30%] contrast-[120%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />
      </motion.div>

      {/* 2. THE UNIQUE ELEMENT: FLOATING "DNA" FRAGMENTS (FIXED CODE) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1 + (i * 0.2), duration: 1.5 }}
            className="absolute hidden lg:block"
            style={{
              // Merged all styles into one block to fix the error
              x: useTransform(smoothMouseX, [-0.5, 0.5], [i * -40, i * 40]),
              y: useTransform(smoothMouseY, [-0.5, 0.5], [i * -25, i * 25]),
              left: `${20 + (i * 12)}%`,
              top: `${15 + (i * 10)}%`,
            }}
          >
            <div className="flex flex-col items-start group">
              <motion.div 
                animate={{ width: [0, 48, 32] }}
                transition={{ duration: 2, delay: 1.5 + (i * 0.1) }}
                className="h-[1px] bg-[#E89EB8]/60 mb-3" 
              />
              <span className="text-[10px] text-white/40 uppercase tracking-[0.5em] font-mono italic">
                {["Structure", "Hydration", "Aeration", "Crystalline", "Thermal", "Aesthetic"][i]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
        
        {/* LEFT: BOUTIQUE TYPOGRAPHY */}
        <motion.div 
          style={{ y: textY }}
          initial={{ opacity: 0, x: -60 }}
          animate={!isParentLoading ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 flex flex-col justify-center"
        >
          <div className="flex items-center gap-6 mb-12">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="h-[1px] bg-[#E89EB8]"
            />
            <span className="uppercase tracking-[1em] text-[10px] font-bold text-[#E89EB8]/80">
              Thane • Maharashtra
            </span>
          </div>
          
          <h1 className="text-[15vw] lg:text-[12rem] font-serif leading-[0.75] mb-14 text-white tracking-tighter">
            Delight <br />
            <span className="italic font-light text-[#E89EB8] ml-[10vw] relative inline-block">
                Bakehouse
                <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2, duration: 1.5 }}
                    className="absolute -bottom-4 left-0 w-full h-[1px] bg-white/20 origin-left"
                />
            </span>
          </h1>
          
          <div className="max-w-md space-y-12">
            <p className="text-2xl text-white/50 leading-relaxed font-light italic">
              Architecting sweetness, <br/>
              <span className="text-white/80">layer by calculated layer.</span>
            </p>
            
            <div className="flex flex-wrap gap-16">
              <button 
                onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                className="group relative text-white uppercase tracking-[0.5em] text-[11px] font-black"
              >
                <span className="relative z-10">Deconstruct Menu</span>
                <div className="absolute -bottom-4 left-0 w-0 h-[1px] bg-[#E89EB8] transition-all duration-700 group-hover:w-full" />
              </button>

              <button 
                onClick={() => document.getElementById('custom-studio').scrollIntoView({ behavior: 'smooth' })}
                className="group relative text-white/30 uppercase tracking-[0.5em] text-[11px] font-black hover:text-[#E89EB8] transition-colors duration-500"
              >
                <span className="relative z-10">Start Project</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: INTERACTIVE GLASS CARD */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={!isParentLoading ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 2, delay: 0.8 }}
          className="lg:col-span-4 hidden lg:flex items-center justify-end"
        >
          <div className="relative group">
            {/* The Rotating Decorative Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-24 border border-white/5 rounded-full"
            />
            
            <div className="w-[340px] bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-14 rounded-[4rem] shadow-2xl transition-all duration-1000 group-hover:bg-white/[0.05] group-hover:border-[#E89EB8]/20 group-hover:-translate-y-4">
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

      {/* 4. SCROLL INDICATOR (IDEA BAKERY STYLE) */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 flex items-center gap-8"
      >
        <span className="text-[10px] text-white/20 uppercase tracking-[0.6em] [writing-mode:vertical-lr] lg:[writing-mode:horizontal-tb]">Scroll to reveal</span>
        <div className="h-[1px] w-24 bg-gradient-to-r from-white/20 to-transparent hidden lg:block" />
      </motion.div>
    </section>
  );
};

export default Hero;