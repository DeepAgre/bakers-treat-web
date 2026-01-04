import React from 'react';
import { motion } from 'framer-motion';

const AboutKhushi = () => {
  return (
    <section className="relative py-24 sm:py-40 w-full overflow-hidden bg-white" id="about">
      
      {/* FUNKY PREMIUM BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `radial-gradient(#E89EB8 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        {/* Large Floating "KM" Text in Background */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 0.03, x: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute -right-20 top-20 text-[20rem] font-serif font-black select-none"
        >
          KHUSHI
        </motion.div>

        {/* Soft Pink Blobs - Performance Optimized (No heavy blurs) */}
        <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-[#E89EB8]/5 rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-[#E89EB8]/5 rounded-full" />
      </div>

      {/* WIDER CONTAINER (Max-w expanded to 1600px) */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT SIDE: Typography Statement Piece (Spans 5 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative z-10 bg-[#141414] rounded-[3rem] sm:rounded-[4rem] p-10 sm:p-16 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.2)] min-h-[500px] flex flex-col justify-center will-change-transform">
              
              {/* Animated Inner Accent */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-64 h-64 border border-white/5 rounded-full pointer-events-none"
              />
              
              <div className="text-[#E89EB8] text-7xl font-serif leading-none mb-8">“</div>
              
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white leading-tight z-10">
                A cake should be the <span className="text-[#E89EB8] not-italic font-bold">centerpiece</span> of your most beautiful memories.
              </h3>
              
              <div className="mt-12 pt-10 border-t border-white/10">
                <p className="text-[#E89EB8] font-black uppercase tracking-[0.4em] text-[11px] mb-3">
                  The Founder & Artist
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-[1px] bg-white/30" />
                  <p className="text-white/80 text-sm font-sans tracking-wide">
                    Khushi Manjrekar
                  </p>
                </div>
              </div>

              {/* Minimal Branding Stamp */}
              <div className="absolute bottom-12 right-12 opacity-5 rotate-12">
                <span className="text-white text-8xl font-serif font-bold italic">KM</span>
              </div>
            </div>
            
            {/* Background Shadow Glow */}
            <div className="absolute -inset-4 bg-[#E89EB8]/10 rounded-[4.5rem] blur-2xl -z-10 group-hover:bg-[#E89EB8]/20 transition-colors duration-700" />
          </motion.div>

          {/* RIGHT SIDE: The Story (Spans 7 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center lg:pl-10"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="h-[2px] w-16 bg-[#E89EB8]" />
              <span className="text-[#E89EB8] uppercase tracking-[0.5em] text-[12px] font-black">
                Personal Story
              </span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 mb-10 leading-[0.9] tracking-tighter">
              Crafting <span className="italic">Sweetness</span> <br /> 
              in Thane<span className="text-[#E89EB8]">.</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6 text-slate-600 font-sans leading-relaxed text-lg">
                <p className="text-justify first-letter:text-5xl first-letter:font-serif first-letter:text-[#E89EB8] first-letter:mr-3 first-letter:float-left">
                  Based in the heart of Thane, Khushi transformed her lifelong passion for art into a world of edible wonders. With a perfectionist’s soul, she doesn't just bake—she crafts emotions.
                </p>
              </div>
              <div className="space-y-6 text-slate-600 font-sans leading-relaxed text-lg">
                <p className="text-justify border-l-2 border-[#E89EB8]/20 pl-6 py-2">
                  Every creation at <strong className="text-slate-900">Delight Bakehouse</strong> is a personal labor of love. By blending premium Belgian chocolate with seasonal fruits, she ensures flavor is never sacrificed for beauty.
                </p>
              </div>
            </div>

            {/* HIGH-LEVEL STATS */}
            <div className="relative mt-16 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden group">
              {/* Funky Background element for stats */}
              <div className="absolute -bottom-10 -right-10 text-slate-200/50 text-9xl font-black italic select-none opacity-20 transition-transform duration-700 group-hover:scale-110">
                KM
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 relative z-10">
                <div>
                  <p className="text-4xl md:text-6xl font-serif font-bold text-slate-900">100+</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#E89EB8] mt-2">Delights Delivered</p>
                </div>
                <div>
                  <p className="text-4xl md:text-6xl font-serif font-bold text-slate-900">100%</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#E89EB8] mt-2">Artisanal Craft</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-4xl md:text-6xl font-serif font-bold text-slate-900">2026</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#E89EB8] mt-2">Established</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutKhushi;