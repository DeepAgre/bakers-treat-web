import React from 'react';
import { motion } from 'framer-motion';

// IMPORTING LOCAL ASSETS
import cocoaImg from '../assets/cocoa.jpeg';
import butterImg from '../assets/butter.jpeg';
import vanillaImg from '../assets/vanilla.jpeg';
import fruitImg from '../assets/fruit.jpeg';

const ingredients = [
  {
    id: "01",
    title: "Pure Cocoa",
    subtitle: "The Foundation",
    img: cocoaImg,
    text: "Sourced from premium farms for an intense, honest chocolate experience.",
    gridClass: "lg:col-span-2"
  },
  {
    id: "02",
    title: "Butter",
    subtitle: "The Texture",
    img: butterImg,
    text: "High-quality dairy butter for that perfect, melt-in-the-mouth pastry finish.",
    gridClass: "lg:col-span-1"
  },
  {
    id: "03",
    title: "Vanilla",
    subtitle: "The Soul",
    img: vanillaImg,
    text: "Hand-selected beans that provide the deep, aromatic heart of our bakes.",
    gridClass: "lg:col-span-1"
  },
  {
    id: "04",
    title: "Artisan Fruit",
    subtitle: "The Finish",
    img: fruitImg,
    text: "Fresh, seasonal fruits picked at their peak for natural sweetness.",
    gridClass: "lg:col-span-4 lg:h-[450px]" 
  }
];

const FloatingElement = ({ children, delay = 0, duration = 5, x = 0, y = 0 }) => (
  <motion.div
    animate={{ 
      y: [y, y - 15, y],
      rotate: [0, 5, 0]
    }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    style={{ left: x, top: y }}
    className="absolute pointer-events-none opacity-20 text-4xl will-change-transform"
  >
    {children}
  </motion.div>
);

const Ingredients = () => {
  return (
    <section className="relative bg-[#FFF5F7] py-20 sm:py-32 w-full overflow-hidden" id="philosophy">
      
      {/* PERFORMANCE OPTIMIZED BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Simplified Static Blobs (No heavy parallax scroll recalculations) */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#E89EB8]/10 blur-[80px] rounded-full" />
        <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#E89EB8]/10 blur-[80px] rounded-full" />
        
        {/* Lightweight Floating Icons */}
        <FloatingElement y={100} x="10%" delay={0}>🍫</FloatingElement>
        <FloatingElement y={400} x="85%" delay={1} duration={6}>🍓</FloatingElement>
        <FloatingElement y={800} x="15%" delay={2} duration={4}>🧈</FloatingElement>

        {/* CSS-only Grain (Much faster than SVG filters) */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply" 
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} 
        />
      </div>

      {/* FULL WIDTH CONTAINER */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-12 relative z-10">
        
        {/* HEADER AREA */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-4 mb-6">
                <span className="h-[2px] w-12 bg-[#E89EB8]" />
                <h4 className="text-[#E89EB8] font-black uppercase tracking-[0.4em] text-[10px] sm:text-[12px]">The Studio Philosophy</h4>
            </div>
            <h2 className="text-slate-900 text-5xl md:text-[8rem] lg:text-[10rem] font-serif leading-[0.85] tracking-tighter mb-8 will-change-transform">
              Quality is never <br /> 
              <span className="italic text-[#E89EB8]">an accident</span>.
            </h2>
          </motion.div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ingredients.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative group rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden bg-white shadow-xl border border-white/60 ${item.gridClass} h-[500px] md:h-[600px] ${item.id === "04" ? "lg:h-[450px]" : ""} will-change-transform`}
            >
              {/* IMAGE BACKGROUND (Hover scale optimized with will-change) */}
              <div 
                className="absolute inset-0 w-full h-full transition-transform duration-[2000ms] ease-out group-hover:scale-105 will-change-transform"
                style={{ 
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-80" />

              {/* CONTENT AREA */}
              <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end">
                
                {/* ID Number */}
                <div className="absolute top-6 right-8 overflow-hidden">
                    <span className="text-white/10 text-8xl sm:text-[10rem] font-serif leading-none block group-hover:text-[#E89EB8]/30 transition-colors duration-700">
                      {item.id}
                    </span>
                </div>
                
                <div className="relative z-10">
                    <h5 className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.5em] mb-3">
                        {item.subtitle}
                    </h5>
                    <h3 className="text-white text-3xl sm:text-4xl font-serif mb-4 leading-tight">
                        {item.title}
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light max-w-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        {item.text}
                    </p>
                </div>
              </div>

              {/* Simplified Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;