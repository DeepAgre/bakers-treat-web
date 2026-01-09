import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  const heroRef = useRef(null);
  
  // A high-end, architectural cake-layer / texture image
  const bgImage = "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=2000&auto=format&fit=crop";
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Mouse Parallax for the "Unique Element"
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
  }, []);

  // Scroll Animations (Idea Bakery / Olly Style)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]" 
      id="hero"
    >
      {/* 1. ARCHITECTURAL CAKE BACKGROUND */}
      <motion.div 
        style={{ scale, opacity: imageOpacity, filter: `blur(${blurValue}px)` }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={bgImage} 
          alt="Layered Cake Texture" 
          className="w-full h-full object-cover grayscale-[20%] contrast-[110%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />
      </motion.div>

      {/* 2. THE UNIQUE ELEMENT: FLOATING "DNA" FRAGMENTS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              x: useTransform(smoothMouseX, [ -0.5, 0.5], [i * -50, i * 50]),
              y: useTransform(smoothMouseY, [ -0.5, 0.5], [i * -30, i * 30]),
            }}
            className="absolute hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1 + (i * 0.2) }}
            style={{
                left: `${20 + (i * 15)}%`,
                top: `${15 + (i * 12)}%`,
            }}
          >
            <div className="flex flex-col items-start">
                <div className="h-[1px] w-12 bg-[#E89EB8]/40 mb-2" />
                <span className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-mono">
                    {["Structure", "Sugar", "Air", "Butter", "Heat", "Art"][i]}
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
          initial={{ opacity: 0, x: -50 }}
          animate={!isParentLoading ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 mb-10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="h-[1px] bg-[#E89EB8]"
            />
            <span className="uppercase tracking-[0.8em] text-[10px] font-bold text-[#E89EB8]">
              Thane's Bespoke Studio
            </span>
          </div>
          
          <h1 className="text-[16vw] lg:text-[11rem] font-serif leading-[0.75] mb-12 text-white tracking-tighter">
            Bakers <br />
            <span className="italic font-light text-[#E89EB8] ml-[8vw] relative">
                Treat
                <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-white/10 origin-left"
                />
            </span>
          </h1>
          
          <div className="max-w-md space-y-10">
            <p className="text-xl text-white/60 leading-relaxed font-light italic">
              Deconstructing the art of the cakery. <br/>
              Engineered layer by layer in <span className="text-white">Thane</span>.
            </p>
            
            <div className="flex flex-wrap gap-12">
              <button 
                onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                className="group relative text-white uppercase tracking-[0.4em] text-[10px] font-black"
              >
                <span className="relative z-10">View Layers</span>
                <div className="absolute -bottom-4 left-0 w-0 h-[2px] bg-[#E89EB8] transition-all duration-500 group-hover:w-full" />
              </button>

              <button 
                onClick={() => document.getElementById('custom-studio').scrollIntoView({ behavior: 'smooth' })}
                className="group relative text-white/40 uppercase tracking-[0.4em] text-[10px] font-black hover:text-[#E89EB8] transition-colors"
              >
                <span className="relative z-10">Start Commission</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: THE INTERACTIVE TEXTURE CARD */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={!isParentLoading ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.8, delay: 0.6 }}
          className="lg:col-span-4 hidden lg:flex items-center justify-end"
        >
          <div className="relative group">
            {/* The "Interactive" Element - A rotating, glass-morphism data ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-16 border border-white/5 rounded-full"
            />
            
            <div className="w-[320px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-12 rounded-[3rem] shadow-2xl transition-all duration-700 group-hover:bg-white/[0.07] group-hover:border-white/20">
              <div className="space-y-10">
                <div className="space-y-2">
                   <div className="flex justify-between items-end">
                      <span className="text-[9px] font-black text-[#E89EB8] uppercase tracking-widest">Process</span>
                      <span className="text-[10px] text-white/20 font-mono">01/03</span>
                   </div>
                   <h3 className="text-2xl font-serif italic text-white leading-tight">Calculated <br/> Perfection.</h3>
                </div>

                <div className="space-y-4">
                  <div className="h-[1px] w-full bg-gradient-to-r from-[#E89EB8]/40 to-transparent" />
                  <p className="text-xs text-white/40 leading-loose">
                    Every crumb is a result of precise engineering. From moisture ratios to structural integrity, Khushi transforms ingredients into architecture.
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                   <div className="h-2 w-2 rounded-full bg-[#E89EB8] animate-pulse" />
                   <span className="text-[10px] uppercase tracking-widest text-white/60">Handcrafted in Thane</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. PREMIUM FOOTER ELEMENT */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        className="absolute bottom-12 left-12 hidden lg:flex items-center gap-6"
      >
        <span className="text-[10px] text-white/20 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">Scroll to Deconstruct</span>
        <div className="h-24 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;