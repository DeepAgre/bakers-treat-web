import React from 'react';
import { motion } from 'framer-motion';

// Using your images from the screenshot
import cake1 from '../assets/custom1.jpg'; 
import box from '../assets/custom2.jpg';  
import cupcake from '../assets/custom3.jpg'; 
import pinkCake from '../assets/custom4.jpg'; 

const CustomOrder = () => {
  return (
    /* This bg-[#E89EB8] now exactly matches your Testimonials section */
    <section className="py-24 bg-[#E89EB8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image Collage */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4 pt-12">
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              src={cake1} 
              className="rounded-[2.5rem] w-full h-80 object-cover shadow-2xl border-4 border-white/30"
            />
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              src={cupcake} 
              className="rounded-[2.5rem] w-full h-64 object-cover shadow-2xl border-4 border-white/30"
            />
          </div>
          <div className="space-y-4">
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              src={box} 
              className="rounded-[2.5rem] w-full h-64 object-cover shadow-2xl border-4 border-white/30"
            />
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              src={pinkCake} 
              className="rounded-[2.5rem] w-full h-80 object-cover shadow-2xl border-4 border-white/30"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="text-white">
          <span className="uppercase tracking-[0.4em] text-[13px] font-black text-white/90 mb-6 block">
            The Custom Studio
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight text-white">
            If you can dream it, we can create it.
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-lg font-medium">
            Khushi Manjrekar specializes in high-detail 3D cakes. From luxury cars to grand ships, our cakes are handcrafted in Thane and engineered for both awe and taste.
          </p>

          {/* Features with Glass-morphism effect */}
          <div className="space-y-10 mb-14">
            <div className="flex gap-6 items-start group">
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/30 group-hover:bg-white/40 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-2 text-white">Bespoke Design</h4>
                <p className="text-white/80 text-lg">Every cake is a unique blueprint designed just for you.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/30 group-hover:bg-white/40 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-2 text-white">Edible Engineering</h4>
                <p className="text-white/80 text-lg">Gravity-defying structures built from premium ingredients.</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Button - High Contrast White */}
          <button 
            onClick={() => window.open('https://wa.me/919136371662', '_blank')}
            className="flex items-center gap-4 bg-white text-[#E89EB8] px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-2xl transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Chat with Khushi
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomOrder;