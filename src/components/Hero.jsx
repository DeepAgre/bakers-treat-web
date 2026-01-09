import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  const heroRef = useRef(null);
  
  // Immersive architectural background
  const bgImage = "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=2000&auto=format&fit=crop";
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Mouse Parallax (Disabled on mobile for performance/logic)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return; // Don't run on mobile
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Optimized Scroll Animations
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const driftX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);

  // Reveal Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 }
    }
  };

  const itemVars = {
    hidden: { y: "100%", opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]" 
      id="hero"
    >
      {/* 1. BACKGROUND LAYER */}
      <motion.div 
        style={{ scale, opacity: imageOpacity }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img 
          src={bgImage} 
          alt="Bakers Treat Texture" 
          className="w-full h-full object-cover grayscale-[40%] contrast-[110%]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-black/50 lg:bg-black/30" />
      </motion.div>

      {/* 2. CONTENT */}
      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <motion.div 
          style={{ y: textY, x: driftX }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* Studio Tag */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="h-[1px] bg-[#E89EB8]"
            />
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="uppercase tracking-[0.6em] text-[9px] font-bold text-[#E89EB8]"
            >
              Thane Studio
            </motion.span>
          </div>
          
          {/* NAME REVEAL */}
          <motion.div 
            variants={containerVars}
            initial="hidden"
            animate={!isParentLoading ? "show" : "hidden"}
            className="mb-8 lg:mb-12"
          >
            <div className="overflow-hidden leading-[1]">
              <motion.h1 variants={itemVars} className="text-[18vw] lg:text-[11rem] font-serif text-white tracking-tighter">
                Delight
              </motion.h1>
            </div>
            <div className="overflow-hidden leading-[1] mt-[-2vw]">
              <motion.h1 
                variants={itemVars} 
                className="text-[18vw] lg:text-[11rem] font-serif italic font-light text-[#E89EB8] ml-[8vw]"
              >
                Bakehouse
              </motion.h1>
            </div>
          </motion.div>
          
          {/* SLOGAN & BUTTONS */}
          <div className="max-w-lg space-y-10 lg:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-lg md:text-2xl text-white/60 font-light italic"
            >
              Crafting sculptural confections <br/>
              <span className="text-white/90 font-normal not-italic text-sm md:text-lg block mt-2">
                Designed by Khushi Manjrekar
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 items-center lg:items-start"
            >
              <button 
                onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-10 py-4 bg-[#E89EB8] text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-transform"
              >
                Deconstruct Menu
              </button>

              <button 
                onClick={() => document.getElementById('custom').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-10 py-4 border border-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 active:scale-95 transition-all"
              >
                Start Project
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 3. SCROLL HINT */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
        className="absolute bottom-10 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-[8px] text-white/20 uppercase tracking-[0.5em]">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#E89EB8]/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;