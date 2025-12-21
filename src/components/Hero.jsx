import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ isParentLoading }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#F9F8F6] px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center -mt-16 sm:-mt-24">
        
        {/* LEFT SIDE: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={!isParentLoading ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-[#E89EB8]"></span>
            <span className="uppercase tracking-[0.4em] text-[12px] font-black text-[#E89EB8]">
              Thane's Premier Custom Cake Studio
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-8 text-gray-900">
            Delight <br />
            <span className="italic text-[#E89EB8]">Bakehouse</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-md leading-relaxed font-medium">
            From hand-painted chocolates to gravity-defying 3D cakes. If you can dream it, Khushi can bake it.
          </p>
          
          <div className="flex flex-wrap gap-5">
            <button 
              onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
              className="bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#E89EB8] transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              View Menu
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={!isParentLoading ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white transform rotate-3 hover:rotate-0 transition-transform duration-700">
            <img 
              src="https://images.unsplash.com/photo-1535141192574-5d4897c82536?auto=format&fit=crop&q=80&w=800" 
              alt="Signature Cake" 
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
          
          {/* Glowing Accents */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E89EB8]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#E89EB8]/20 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
      
      {/* Large Background Decoration */}
      <div className="absolute bottom-0 right-0 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[20vw] font-serif font-bold leading-none translate-y-1/2">Fresh</h2>
      </div>
    </section>
  );
};

export default Hero;