import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/delight.jpeg';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Our Story', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="relative px-4 py-4 sm:px-12 sm:py-6 max-w-[1600px] mx-auto flex items-center justify-between">
      {/* LOGO - Scaled down for mobile */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Delight Bakehouse" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover shadow-md" />
        <h1 className="text-lg sm:text-2xl font-serif font-bold tracking-tight">Delight Bakehouse</h1>
      </div>

      {/* DESKTOP LINKS - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-12">
        {navLinks.map((link) => (
          <a 
            key={link.name}
            href={link.href} 
            className="text-[14px] font-black uppercase tracking-[0.2em] hover:text-[#E89EB8] transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* RIGHT SIDE: Bag & Hamburger */}
      <div className="flex items-center gap-4">
        {/* BAG BUTTON */}
        <button 
          onClick={onOpenCart}
          className="bg-white border border-black/5 px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center gap-3 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span className="absolute -top-2 -right-2 bg-[#E89EB8] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {cartCount}
            </span>
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest hidden xs:block">Bag</span>
        </button>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 bg-black rounded-full transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 bg-black rounded-full transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-black rounded-full transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#F9F8F6] border-b border-black/5 p-6 md:hidden z-50 flex flex-col gap-6 shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-black uppercase tracking-[0.2em] text-center"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;