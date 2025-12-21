import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = ({ isParentLoading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  const revealTransition = {
    duration: 1.2,
    delay: isParentLoading ? 3.5 : 0.2, 
    ease: [0.22, 1, 0.36, 1]
  };

  return (
    <section ref={targetRef} className="h-[110vh] relative z-0"> 
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#E89EB8] rounded-full blur-[140px] opacity-10" />
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={!isParentLoading ? { opacity: 1, y: 0 } : {}}
            transition={revealTransition}
          >
            <div className="flex items-center gap-2 mb-6">
               <Sparkles className="w-4 h-4 text-[#E89EB8]" />
               <span className="text-[#E89EB8] font-bold uppercase tracking-[0.3em] text-[10px] block font-sans">
                 Thane's Premier Custom Cake Studio
               </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-8 text-[#1A1A1A]">
              Delight<br/> Bakehouse<span className="text-[#E89EB8]">.</span>
            </h1>
            
            <p className="text-[#666666] text-lg max-w-md mb-10 leading-relaxed font-light">
              From hand-painted chocolates to gravity-defying 3D cakes. If you can dream it, Khushi can bake it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-[#1A1A1A] text-white px-8 py-5 rounded-full font-bold flex items-center justify-center hover:bg-[#E89EB8] hover:text-black transition-all shadow-xl active:scale-95"
              >
                View Menu
              </button>
              
              <button 
                onClick={() => document.getElementById('custom-order')?.scrollIntoView({ behavior: 'smooth' })}
                className="group border border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 rounded-full font-bold flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all active:scale-95"
              >
                Custom Request <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            style={{ scale, opacity }}
            initial={{ opacity: 0, x: 40 }}
            animate={!isParentLoading ? { opacity: 1, x: 0 } : {}}
            transition={{ ...revealTransition, delay: revealTransition.delay + 0.3 }}
            className="relative hidden md:block"
          >
             <div className="rounded-[3rem] overflow-hidden shadow-2xl rotate-2 aspect-[4/5] bg-[#F3F1ED]">
               {/* FIXED IMAGE: Using a reliable high-end cake image */}
               <img 
                 src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop" 
                 alt="Delight Bakehouse Art" 
                 className="w-full h-full object-cover transition-all duration-700"
               />
               <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[3rem]" />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;