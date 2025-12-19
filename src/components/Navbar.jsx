import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 transition-all duration-500 z-[80] ${
        isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Rebranded Logo */}
        <button 
          onClick={() => scrollToSection('home')} 
          className="text-2xl font-serif tracking-tighter text-[#1A1A1A] hover:opacity-70 transition-opacity"
        >
          Baker's Treat<span className="text-[#E89EB8]">.</span>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-10 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">
          <button onClick={() => scrollToSection('about')} className="hover:text-[#E89EB8] transition-colors">Our Story</button>
          <button onClick={() => scrollToSection('menu')} className="hover:text-[#E89EB8] transition-colors">Menu</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-[#E89EB8] transition-colors">Contact</button>
        </div>

        {/* Bag Button */}
        <div className="flex items-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative px-6 py-2.5 bg-[#1A1A1A] text-white rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="bg-[#E89EB8] text-black min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full text-[10px] ml-1 font-black"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;