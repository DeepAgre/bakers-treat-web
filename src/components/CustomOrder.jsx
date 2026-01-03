import React from 'react';
import { motion } from 'framer-motion';

const CustomOrder = () => {
  const images = {
    cake1: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
    box: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&q=80&w=800",
    cupcake: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800",
    pinkCake: "https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&q=80&w=800"
  };

  return (
    /* FORCE PINK BACKGROUND & WHITE TEXT using style={{}} 
      This ignores all CSS files and forces the browser to use these colors.
    */
    <section 
      id="custom-studio"
      className="py-24 relative overflow-hidden" 
      style={{ backgroundColor: '#E89EB8', color: '#ffffff' }}
    >
      
      {/* Background Decorative Text */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden">
         <h2 className="text-[30vw] font-serif font-bold text-white leading-none translate-x-1/4">Bakes</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Images */}
        <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
          <div className="space-y-4 pt-12">
            <img src={images.cake1} className="rounded-[2.5rem] w-full h-80 object-cover shadow-2xl border-4 border-white/40" alt="Cake" />
            <img src={images.cupcake} className="rounded-[2.5rem] w-full h-64 object-cover shadow-2xl border-4 border-white/40" alt="Cupcake" />
          </div>
          <div className="space-y-4">
            <img src={images.box} className="rounded-[2.5rem] w-full h-64 object-cover shadow-2xl border-4 border-white/40" alt="Box" />
            <img src={images.pinkCake} className="rounded-[2.5rem] w-full h-80 object-cover shadow-2xl border-4 border-white/40" alt="Pink Cake" />
          </div>
        </div>

        {/* Text Content */}
        <div className="order-1 lg:order-2">
          <span className="uppercase tracking-[0.5em] text-[11px] font-black mb-6 block text-white">
            The Custom Studio
          </span>
          
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight text-white" style={{ color: '#ffffff' }}>
            If you can dream it, <br /> we can create it.
          </h2>
          
          <p className="text-xl mb-12 leading-relaxed max-w-lg font-medium text-white" style={{ color: '#ffffff' }}>
            Khushi Manjrekar specializes in high-detail 3D cakes. From luxury cars to grand ships, our cakes are handcrafted in Thane and engineered for both awe and taste.
          </p>

          <div className="space-y-10 mb-14">
            <div className="flex gap-6 items-start">
              <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="text-white">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-2xl mb-2 text-white" style={{ color: '#ffffff' }}>Bespoke Design</h4>
                <p className="text-white/80 text-lg" style={{ color: 'rgba(255,255,255,0.8)' }}>Every cake is a unique blueprint designed just for you.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => window.open('https://wa.me/919136371662', '_blank')}
            className="bg-white px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] shadow-2xl transition-transform active:scale-95 text-[12px]"
            style={{ color: '#E89EB8' }}
          >
            Chat with Khushi
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomOrder;