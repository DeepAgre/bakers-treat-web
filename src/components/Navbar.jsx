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
    /* Background spans full width to remove transparent corner gaps */
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-black/5 z-[100] relative">
      <div className="px-4 py-3 sm:px-12 sm:py-6 max-w-[1600px] mx-auto flex items-center justify-between">
        
        {/* LOGO SECTION: Adjusted to ensure 'Bakehouse' is visible */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <img 
            src={logo} 
            alt="Delight Bakehouse" 
            className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover shadow-sm border border-black/5" 
          />
          <h1 className="text-[16px] sm:text-2xl font-serif font-bold tracking-tight text-gray-900 leading-tight">
            Delight Bakehouse
          </h1>
        </div>

        {/* DESKTOP LINKS: Visible only on larger screens */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-[13px] font-black uppercase tracking-[0.2em] hover:text-[#E89EB8] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* RIGHT SIDE: Bag & Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* BAG BUTTON: Keeping text for clarity with optimized sizing */}
          <button 
            onClick={onOpenCart}
            className="bg-white border border-black/10 px-3 py-2 sm:px-6 sm:py-3 rounded-full flex items-center gap-2 shadow-sm active:scale-95 transition-all group"
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[20px] sm:h-[20px]">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span className="absolute -top-2 -right-2 bg-[#E89EB8] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            </div>
            <span className="text-[10px] sm:text-[12px] font-black uppercase tracking-tighter sm:tracking-widest">
              Bag
            </span>
          </button>

          {/* MOBILE MENU TOGGLE (Hamburger) */}
          <button 
            className="lg:hidden p-2 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-[2px] bg-black rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-[2px] bg-black rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] bg-black rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-black/10 overflow-hidden z-[200] lg:hidden shadow-2xl"
          >
            <div className="flex flex-col py-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-8 py-4 text-[13px] font-black uppercase tracking-[0.2em] border-b border-black/[0.03] active:bg-gray-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;