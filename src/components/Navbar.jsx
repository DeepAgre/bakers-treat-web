import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/delight.jpeg';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    /* Changed from fixed to sticky and adjusted top spacing */
    <div className={`sticky ${scrolled ? 'top-0' : 'top-2'} left-0 w-full z-[100] px-4 py-2 pointer-events-none transition-all duration-300`}>
      <motion.nav 
        initial={false}
        animate={{
          paddingTop: scrolled ? '10px' : '16px',
          paddingBottom: scrolled ? '10px' : '16px',
          scale: scrolled ? 0.98 : 1, // Subtle shrink effect when scrolling
        }}
        className={`
          max-w-[1400px] mx-auto pointer-events-auto transition-all duration-500
          ${scrolled ? 'bg-white/90 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]' : 'bg-white shadow-sm'} 
          backdrop-blur-xl rounded-[2.5rem] md:rounded-[4rem]
          border border-white/40
          overflow-hidden
        `}
      >
        {/* INNER GRADIENT BORDER */}
        <div className="absolute inset-0 rounded-[inherit] border-2 border-[#E89EB8]/5 pointer-events-none" />

        <div className="px-5 md:px-12 flex items-center justify-between relative z-10">
          
          {/* 1. LEFT: Logo */}
          <div className="flex-1 flex justify-start">
            <button onClick={handleLogoClick} className="flex items-center gap-2 md:gap-3 group outline-none">
              <img 
                src={logo} 
                alt="Delight Bakehouse" 
                className="w-9 h-9 md:w-11 md:h-11 rounded-full object-cover border-2 border-[#E89EB8]/10" 
              />
              <h1 className="text-base md:text-xl font-serif font-bold tracking-tight text-gray-900">
                Delight <span className="hidden sm:inline">Bakehouse</span>
              </h1>
            </button>
          </div>

          {/* 2. CENTER: Nav Links */}
          <div className="hidden lg:flex items-center gap-8 bg-[#FAF9F6] px-8 py-2.5 rounded-full border border-black/[0.03]">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#E89EB8] transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#E89EB8] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* 3. RIGHT: Bag & Toggle */}
          <div className="flex-1 flex justify-end items-center gap-2 md:gap-3">
            <button 
              onClick={onOpenCart}
              className="relative bg-black text-white px-4 py-2 md:px-7 md:py-3 rounded-full flex items-center gap-2 md:gap-3 hover:bg-[#E89EB8] transition-all active:scale-95 shadow-lg shadow-black/10"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[18px] md:h-[18px]">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span className="absolute -top-2.5 -right-2.5 bg-[#E89EB8] text-white text-[9px] font-black w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              </div>
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest hidden sm:inline">Bag</span>
            </button>

            <button 
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-[#FAF9F6] rounded-full active:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-4 h-3 flex flex-col justify-between">
                <motion.span animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 5 : 0 }} className="h-[2px] bg-black rounded-full w-full origin-center transition-transform" />
                <motion.span animate={{ opacity: isMenuOpen ? 0 : 1 }} className="h-[2px] bg-black rounded-full w-full transition-opacity" />
                <motion.span animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -5 : 0 }} className="h-[2px] bg-black rounded-full w-full origin-center transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="lg:hidden border-t border-black/5 bg-[#FAF9F6]/30"
            >
              <div className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="px-6 py-4 rounded-2xl bg-white/80 text-[12px] font-black uppercase tracking-[0.15em] text-gray-800 border border-black/[0.03]"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;