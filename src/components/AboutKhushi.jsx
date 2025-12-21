import React from 'react';
import { motion } from 'framer-motion';

const AboutKhushi = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556210335-0921327a683f?q=80&w=800&auto=format&fit=crop" 
                alt="Khushi Manjrekar" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E89EB8] rounded-full flex items-center justify-center text-white font-serif text-center p-4 leading-none rotate-12 shadow-xl">
              Est. 2025
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h4 className="text-[#E89EB8] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">The Artist</h4>
            <h2 className="text-5xl font-serif mb-8 leading-tight">Meet Khushi Manjarekar<span className="text-[#E89EB8]">.</span></h2>
            
            <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-light">
              <p>
                Based in the heart of Thane, Khushi transformed her lifelong passion for art into a world of edible wonders. With a keen eye for detail and a background in structural design, she doesn't just bake cakes—she builds dreams.
              </p>
              <p>
                Every creation at <strong>Delight Bakehouse</strong> is a labor of love, using only the finest ingredients like Belgian chocolate and fresh artisan fruits. For Khushi, the goal is simple: to create a centerpiece that tastes even better than it looks.
              </p>
            </div>

            <div className="mt-12 flex gap-8 border-t border-black/5 pt-8">
               <div>
                  <p className="text-2xl font-serif text-black">500+</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#E89EB8] font-bold">Cakes Delivered</p>
               </div>
               <div>
                  <p className="text-2xl font-serif text-black">100%</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#E89EB8] font-bold">Eggless Options</p>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutKhushi;