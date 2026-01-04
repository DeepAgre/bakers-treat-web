import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
      y: [y, y - 20, y],
      x: [x, x + 10, x],
      rotate: [0, 5, 0]
    }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    className="absolute pointer-events-none opacity-20 text-4xl"
  >
    {children}
  </motion.div>
);

const Ingredients = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section className="relative bg-[#FFF5F7] py-24 sm:py-32 w-full overflow-hidden" id="philosophy">
      
      {/* LIVELY BACKGROUND SYSTEM */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Parallax Blobs */}
        <motion.div style={{ y: y1 }} className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#E89EB8]/20 blur-[120px] rounded-full" />
        <motion.div style={{ y: y2 }} className="absolute top-1/2 -right-20 w-[600px] h-[600px] bg-[#E89EB8]/10 blur-[130px] rounded-full" />
        
        {/* Floating Icons for "Liveliness" */}
        <FloatingElement y={100} x={100} delay={0}>🍫</FloatingElement>
        <FloatingElement y={400} x={1500} delay={1} duration={6}>🍓</FloatingElement>
        <FloatingElement y={800} x={200} delay={2} duration={4}>🧈</FloatingElement>
        <FloatingElement y={200} x={1200} delay={1.5}>🍦</FloatingElement>

        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* FULL WIDTH CONTAINER */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* HEADER AREA - Shifted slightly left for edge-filling */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-8">
                <span className="h-[2px] w-16 bg-[#E89EB8]" />
                <h4 className="text-[#E89EB8] font-black uppercase tracking-[0.5em] text-[11px]">The Studio Philosophy</h4>
            </div>
            <h2 className="text-slate-900 text-6xl md:text-[9rem] font-serif leading-[0.85] tracking-tighter mb-8">
              Quality is never <br /> 
              <span className="italic text-[#E89EB8]">an accident</span>.
            </h2>
            <p className="text-slate-500 font-light text-xl md:text-2xl max-w-2xl leading-relaxed italic">
                Sourcing the world's finest ingredients to engineer the art of sweetness.
            </p>
          </motion.div>
        </div>

        {/* BENTO GRID - Optimized for massive displays */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ingredients.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className={`relative group rounded-[3.5rem] overflow-hidden bg-white shadow-2xl shadow-pink-200/30 border border-white/60 ${item.gridClass} h-[550px] md:h-[650px] ${item.id === "04" ? "lg:h-[450px]" : ""}`}
            >
              {/* IMAGE BACKGROUND */}
              <div 
                className="absolute inset-0 w-full h-full transition-transform duration-[4000ms] ease-out group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* GLASS OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-700" />

              {/* CONTENT AREA */}
              <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                
                {/* ID Number */}
                <div className="absolute top-10 right-10 overflow-hidden">
                    <span className="text-white/10 text-[10rem] font-serif leading-none block translate-y-4 group-hover:text-[#E89EB8]/40 group-hover:translate-y-0 transition-all duration-1000">
                      {item.id}
                    </span>
                </div>
                
                <div className="relative z-10">
                    <h5 className="text-[#E89EB8] text-xs font-black uppercase tracking-[0.6em] mb-4">
                        {item.subtitle}
                    </h5>
                    <h3 className="text-white text-4xl md:text-5xl font-serif mb-6 leading-tight">
                        {item.title}
                    </h3>
                    <p className="text-white/60 text-base md:text-lg leading-relaxed font-light max-w-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                        {item.text}
                    </p>
                </div>
              </div>

              {/* High-End Gloss Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;