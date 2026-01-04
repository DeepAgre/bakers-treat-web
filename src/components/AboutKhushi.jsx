import React from 'react';
import { motion } from 'framer-motion';

const AboutKhushi = () => {
  return (
    <section className="relative py-24 sm:py-40 w-full overflow-hidden bg-[#0A0A0A]" id="about">
      
      {/* FUNKY PREMIUM BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#E89EB8]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#E89EB8]/5 blur-[100px] rounded-full" />
        
        {/* Subtle Grid Pattern with Pink Tint */}
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: `radial-gradient(#E89EB8 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
        
        {/* Large Floating "KM" Background Text */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 0.05, x: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute -right-20 top-20 text-[18rem] md:text-[25rem] font-serif font-black select-none text-white will-change-transform"
        >
          KHUSHI
        </motion.div>
      </div>

      {/* WIDER CONTAINER */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* LEFT SIDE: The Statement Card (Darker Theme) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative z-10 bg-white/5 backdrop-blur-sm rounded-[3rem] sm:rounded-[4rem] p-10 sm:p-16 overflow-hidden border border-white/10 shadow-2xl min-h-[550px] flex flex-col justify-center will-change-transform">
              
              {/* Rotating Border Element */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -right-32 w-80 h-80 border-2 border-[#E89EB8]/10 border-dashed rounded-full pointer-events-none"
              />
              
              <div className="text-[#E89EB8] text-7xl font-serif leading-none mb-8 opacity-80 group-hover:opacity-100 transition-opacity">“</div>
              
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white leading-tight z-10">
                A cake should be the <span className="text-[#E89EB8] not-italic font-bold">centerpiece</span> of your most beautiful memories.
              </h3>
              
              <div className="mt-12 pt-10 border-t border-white/10">
                <p className="text-[#E89EB8] font-black uppercase tracking-[0.4em] text-[11px] mb-4">
                  The Founder & Artist
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-[#E89EB8]/50" />
                  <p className="text-white/90 text-sm font-sans tracking-[0.1em] uppercase">
                    Khushi Manjrekar
                  </p>
                </div>
              </div>

              {/* Minimal Branding Stamp */}
              <div className="absolute bottom-12 right-12 opacity-10 group-hover:opacity-20 transition-all duration-700">
                <span className="text-white text-8xl font-serif font-bold italic">KM</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: The Story Content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="h-[1px] w-16 bg-[#E89EB8]" />
              <span className="text-[#E89EB8] uppercase tracking-[0.5em] text-[12px] font-black">
                Our Story
              </span>
            </div>
            
            <h2 className="text-5xl md:text-8xl lg:text-[9rem] font-serif font-bold text-white mb-10 leading-[0.85] tracking-tighter">
              About <br /> 
              <span className="italic text-[#E89EB8]">Khushi Manjrekar</span>.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-l border-white/5 pl-8 sm:pl-12">
              <div className="space-y-6 text-white/70 font-sans leading-relaxed text-lg">
                <p className="text-justify first-letter:text-6xl first-letter:font-serif first-letter:text-[#E89EB8] first-letter:mr-3 first-letter:float-left">
                  Based in the heart of Thane, Khushi transformed her lifelong passion for art into a world of edible wonders. With a perfectionist’s soul, she doesn't just bake—she crafts emotions into every slice.
                </p>
              </div>
              <div className="space-y-6 text-white/70 font-sans leading-relaxed text-lg">
                <p className="text-justify italic">
                  Every creation at <strong className="text-white font-bold">Delight Bakehouse</strong> is a personal labor of love. By blending premium Belgian chocolate with seasonal fruits, she ensures flavor is never sacrificed for beauty.
                </p>
              </div>
            </div>

            {/* NEON STATS SECTION */}
            <div className="relative mt-16 p-1 bg-gradient-to-r from-white/10 to-transparent rounded-[2.5rem]">
              <div className="bg-[#0A0A0A] p-10 rounded-[2.4rem] grid grid-cols-2 sm:grid-cols-3 gap-8 relative z-10 border border-white/5 overflow-hidden group">
                
                {/* Background "KM" for the stats card */}
                <div className="absolute -bottom-8 -right-8 text-white/5 text-[8rem] font-black italic select-none group-hover:scale-110 transition-transform duration-1000">
                    KM
                </div>

                <div className="relative">
                  <p className="text-4xl md:text-6xl font-serif font-bold text-white group-hover:text-[#E89EB8] transition-colors">100+</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#E89EB8] mt-3">Delights Delivered</p>
                </div>
                
                <div className="relative">
                  <p className="text-4xl md:text-6xl font-serif font-bold text-white group-hover:text-[#E89EB8] transition-colors">100%</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#E89EB8] mt-3">Artisanal Craft</p>
                </div>

                <div className="relative hidden sm:block">
                  <p className="text-4xl md:text-6xl font-serif font-bold text-white group-hover:text-[#E89EB8] transition-colors">Thane</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#E89EB8] mt-3">Studio Location</p>
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