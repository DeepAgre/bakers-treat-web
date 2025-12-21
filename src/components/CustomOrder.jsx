import React from 'react';
import { motion } from 'framer-motion';

// Using your images from the screenshot
import cake1 from '../assets/custom1.jpg'; // The white floral cake
import box from '../assets/custom2.jpg';  // The chocolate box
import cupcake from '../assets/custom3.jpg'; // The yellow cupcake
import pinkCake from '../assets/custom4.jpg'; // The dripping pink cake

const CustomOrder = () => {
  return (
    <section className="py-24 bg-[#E89EB8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image Collage */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4 pt-12">
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              src={cake1} 
              className="rounded-[2rem] w-full h-80 object-cover shadow-2xl border-4 border-white/20"
            />
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              src={cupcake} 
              className="rounded-[2rem] w-full h-64 object-cover shadow-2xl border-4 border-white/20"
            />
          </div>
          <div className="space-y-4">
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              src={box} 
              className="rounded-[2rem] w-full h-64 object-cover shadow-2xl border-4 border-white/20"
            />
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              src={pinkCake} 
              className="rounded-[2rem] w-full h-80 object-cover shadow-2xl border-4 border-white/20"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="text-white">
          <span className="uppercase tracking-[0.3em] text-[12px] font-black opacity-80 mb-4 block">
            The Custom Studio
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">
            If you can dream it, we can create it.
          </h2>
          <p className="text-lg opacity-90 mb-12 leading-relaxed max-w-lg font-medium">
            Khushi Manjrekar specializes in high-detail 3D cakes. From luxury cars to grand ships, our cakes are handcrafted in Thane and engineered for both awe and taste.
          </p>

          {/* Features */}
          <div className="space-y-8 mb-12">
            <div className="flex gap-5 items-start group">
              <div className="bg-white/20 p-4 rounded-2xl group-hover:bg-white/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Bespoke Design</h4>
                <p className="opacity-80">Every cake is a unique blueprint designed just for you.</p>
              </div>
            </div>

            <div className="flex gap-5 items-start group">
              <div className="bg-white/20 p-4 rounded-2xl group-hover:bg-white/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Edible Engineering</h4>
                <p className="opacity-80">Gravity-defying structures built from premium ingredients.</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Button - Inverted for contrast */}
          <button 
            onClick={() => window.open('https://wa.me/919136371662', '_blank')}
            className="flex items-center gap-3 bg-white text-[#E89EB8] px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Chat with Khushi on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomOrder;