import React from 'react';
import { motion } from 'framer-motion';

const CustomOrder = () => {
  // Using direct URL links so Vercel doesn't crash looking for local files
  const images = {
    cake1: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
    box: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&q=80&w=800",
    cupcake: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800",
    pinkCake: "https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&q=80&w=800"
  };

  return (
    /* Changed bg to use a softer pink in light mode and Khushi's brand pink in dark mode */
    <section className="py-24 bg-[#FFF5F7] dark:bg-[#E89EB8] relative overflow-hidden transition-colors duration-500" id="custom-studio">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image Collage */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4 pt-12">
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              src={images.cake1} 
              className="rounded-[2.5rem] w-full h-80 object-cover shadow-2xl border-4 border-white/50 dark:border-white/30"
              alt="Artisan Cake"
            />
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              src={images.cupcake} 
              className="rounded-[2.5rem] w-full h-64 object-cover shadow-2xl border-4 border-white/50 dark:border-white/30"
              alt="Gourmet Cupcake"
            />
          </div>
          <div className="space-y-4">
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              src={images.box} 
              className="rounded-[2.5rem] w-full h-64 object-cover shadow-2xl border-4 border-white/50 dark:border-white/30"
              alt="Chocolate Box"
            />
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              src={images.pinkCake} 
              className="rounded-[2.5rem] w-full h-80 object-cover shadow-2xl border-4 border-white/50 dark:border-white/30"
              alt="Pink Drip Cake"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div>
          <span className="uppercase tracking-[0.4em] text-[13px] font-black text-[#E89EB8] dark:text-white/90 mb-6 block transition-colors">
            The Custom Studio
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight text-gray-900 dark:text-white transition-colors">
            If you can dream it, we can create it.
          </h2>
          <p className="text-xl text-gray-700 dark:text-white/90 mb-12 leading-relaxed max-w-lg font-medium transition-colors">
            Khushi Manjrekar specializes in high-detail 3D cakes. From luxury cars to grand ships, our cakes are handcrafted in Thane and engineered for both awe and taste.
          </p>

          <div className="space-y-10 mb-14">
            <div className="flex gap-6 items-start">
              {/* Adjusted icon box to have visible borders in both modes */}
              <div className="bg-[#E89EB8]/10 dark:bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-[#E89EB8]/20 dark:border-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#E89EB8] dark:text-white">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white transition-colors">Bespoke Design</h4>
                <p className="text-gray-600 dark:text-white/80 text-lg transition-colors">Every cake is a unique blueprint designed just for you.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => window.open('https://wa.me/919136371662', '_blank')}
            className="flex items-center gap-4 bg-[#E89EB8] dark:bg-white text-white dark:text-[#E89EB8] px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-2xl active:scale-95"
          >
            Chat with Khushi
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomOrder;