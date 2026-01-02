import React from 'react';
import { motion } from 'framer-motion';

const AboutKhushi = () => {
  return (
    <section className="py-20 sm:py-32 px-6 max-w-7xl mx-auto overflow-hidden bg-white dark:bg-[#0F0F0F] transition-colors duration-500" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* LEFT SIDE: Typography "Philosophy" Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Main Visual Card - Dark mode uses a slightly lighter charcoal for depth */}
          <div className="relative z-10 bg-[#1A1A1A] dark:bg-[#151515] rounded-[2.5rem] sm:rounded-[3.5rem] p-10 sm:p-16 overflow-hidden shadow-2xl min-h-[450px] sm:min-h-[550px] flex flex-col justify-center border border-white/5">
            
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E89EB8]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            {/* Quote Icon */}
            <div className="text-[#E89EB8] text-6xl font-serif opacity-50 mb-6">“</div>
            
            <h3 className="text-2xl sm:text-4xl font-serif italic text-white leading-relaxed z-10">
              I believe a cake should be the <span className="text-[#E89EB8]">centerpiece</span> of your most beautiful memories.
            </h3>
            
            <div className="mt-10 pt-10 border-t border-white/10">
              <p className="text-[#E89EB8] font-black uppercase tracking-[0.3em] text-[12px]">
                The Visionary
              </p>
              <p className="text-white/50 text-sm mt-2 font-sans">
                Khushi Manjrekar — Founder, Delight Bakehouse
              </p>
            </div>

            {/* Subtle Signature Branding at bottom */}
            <div className="absolute bottom-10 right-10 opacity-10">
              <span className="text-white text-6xl font-serif font-bold italic tracking-tighter">KM</span>
            </div>
          </div>
          
          {/* Decorative Glow for the section */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#E89EB8]/10 rounded-full blur-3xl -z-10" />
        </motion.div>

        {/* RIGHT SIDE: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-[#E89EB8]" />
            <span className="text-[#E89EB8] uppercase tracking-[0.4em] text-[10px] sm:text-[12px] font-black font-sans">
              The Story
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-8 leading-[1.1]">
            About Khushi <br className="hidden sm:block" /> 
            Manjrekar<span className="text-[#E89EB8]">.</span>
          </h2>
          
          <div className="space-y-6 text-gray-500 dark:text-gray-400 font-sans leading-relaxed text-[16px] sm:text-lg">
            <p className="text-justify">
              Based in the heart of <span className="text-gray-900 dark:text-white font-medium underline decoration-[#E89EB8]/30 underline-offset-4">Thane</span>, Khushi transformed her lifelong passion for art into a world of edible wonders. With a background in design and a perfectionist’s soul, she doesn't just bake—she crafts experiences.
            </p>
            <p className="text-justify">
              Every creation at <strong className="text-gray-900 dark:text-white">Delight Bakehouse</strong> is a personal labor of love. By blending premium Belgian chocolate with seasonal artisanal fruits, Khushi ensures that her treats are as sophisticated in flavor as they are in appearance.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-100 dark:border-white/10">
            <div className="group">
              <p className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white group-hover:text-[#E89EB8] transition-colors duration-300">100+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#E89EB8] mt-2">Cakes Delivered</p>
            </div>
            <div className="group">
              <p className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white group-hover:text-[#E89EB8] transition-colors duration-300">100%</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#E89EB8] mt-2">Eggless Options</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutKhushi;