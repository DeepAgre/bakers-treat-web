import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Cakes', 'Pastries', 'Chocolates'];

const products = [
  { 
    id: 1, 
    name: "Velvet Sculpt Cake", 
    category: "Cakes", 
    price: "₹2,500", 
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop", 
    desc: "A bespoke custom creation tailored to your theme, handcrafted by Khushi." 
  },
  { 
    id: 2, 
    name: "Signature 3D Car Cake", 
    category: "Cakes", 
    price: "₹4,500", 
    img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=1000&auto=format&fit=crop", 
    desc: "High-detail sculptural cake for special celebrations. Price varies by detail." 
  },
  { 
    id: 3, 
    name: "Berry Choux Box", 
    category: "Pastries", 
    price: "₹850", 
    img: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?q=80&w=1000&auto=format&fit=crop", 
    desc: "Box of 4 delicate cream puffs with fresh summer berries." 
  },
  { 
    id: 4, 
    name: "Gold Leaf Macarons", 
    category: "Pastries", 
    price: "₹1,200", 
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000&auto=format&fit=crop", 
    desc: "Box of 6 signature macarons decorated with 24k edible gold leaf." 
  },
  { 
    id: 5, 
    name: "Artisan Bonbons", 
    category: "Chocolates", 
    price: "₹950", 
    img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000&auto=format&fit=crop", 
    desc: "Hand-painted chocolate truffles with exotic, premium fillings." 
  },
  { 
    id: 6, 
    name: "Dark Ganache Bar", 
    category: "Chocolates", 
    price: "₹450", 
    img: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=1000&auto=format&fit=crop", 
    desc: "70% Single origin dark chocolate with sea salt flakes." 
  }
];

const Menu = ({ onProductSelect }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="menu" className="py-32 px-6 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h4 className="text-[#E89EB8] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Patisserie Collection</h4>
            <h2 className="text-5xl md:text-6xl font-serif">The Sweetest Treats<span className="text-[#E89EB8]">.</span></h2>
          </div>
          
          <div className="flex gap-8 border-b border-black/5 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative ${
                  activeCategory === cat ? 'text-black' : 'text-[#A3A3A3] hover:text-black'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div layoutId="underline" className="absolute -bottom-[9px] left-0 right-0 h-[2px] bg-[#E89EB8]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={product.id}
                className="group cursor-pointer"
                onClick={() => onProductSelect(product)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-6 bg-[#F3F1ED]">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-serif mb-1">{product.name}</h3>
                    <p className="text-[#A3A3A3] text-[10px] uppercase tracking-widest">{product.category}</p>
                  </div>
                  <span className="font-medium text-[#E89EB8]">{product.price}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;