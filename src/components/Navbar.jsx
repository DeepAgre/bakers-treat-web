import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/delight.jpeg';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for a dynamic "shrink" effect
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
    <div className="fixed top-0 left-0 w-full z-[100] px-4 py-4 pointer-events-none">
      <motion.nav 
        initial={false}
        animate={{
          y: 0,
          paddingTop: scrolled ? '12px' : '20px',
          paddingBottom: scrolled ? '12px' : '20px',
        }}
        className={`
          max-w-[1400px] mx-auto pointer-events-auto transition-all duration-500
          ${scrolled ? 'bg-white/80' : 'bg-white'} 
          backdrop-blur-xl rounded-[2.5rem] md:rounded-[4rem]
          border border-white/40 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]
          overflow-hidden
        `}
      >
        {/* INNER GRADIENT BORDER EFFECT */}
        <div className={`absolute inset-0 rounded-[inherit] border-2 border-[#E89EB8]/5 pointer-events-none`} />

        <div className="px-6 md:px-12 flex items-center justify-between relative z-10">
          
          {/* 1. LEFT: Logo & Brand */}
          <div className="flex-1 flex justify-start">
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-3 group outline-none"
            >
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Delight Bakehouse" 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[#E89EB8]/20 group-hover:border-[#E89EB8] transition-all" 
                />
                <div className="absolute inset-0 rounded-full bg-[#E89EB8]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h1 className="text-lg md:text-xl font-serif font-bold tracking-tight text-gray-900 group-hover:text-[#E89EB8] transition-colors">
                Delight <span className="hidden sm:inline">Bakehouse</span>
              </h1>
            </button>
          </div>

          {/* 2. CENTER: Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-10 bg-[#FAF9F6] px-8 py-3 rounded-full border border-black/[0.03]">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 hover:text-[#E89EB8] transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#E89EB8] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* 3. RIGHT: Bag & Hamburger */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <button 
              onClick={onOpenCart}
              className="relative bg-black text-white px-5 py-2.5 md:px-7 md:py-3.5 rounded-full flex items-center gap-3 hover:bg-[#E89EB8] transition-all hover:shadow-lg hover:shadow-[#E89EB8]/20 active:scale-95 group"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <motion.span 
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 bg-[#E89EB8] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest hidden md:inline">Bag</span>
            </button>

            <button 
              className="lg:hidden w-11 h-11 flex items-center justify-center bg-[#FAF9F6] rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-5 h-3 flex flex-col justify-between">
                <motion.span animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 5 : 0 }} className="h-[2px] bg-black rounded-full w-full origin-center" />
                <motion.span animate={{ opacity: isMenuOpen ? 0 : 1 }} className="h-[2px] bg-black rounded-full w-full" />
                <motion.span animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -5 : 0 }} className="h-[2px] bg-black rounded-full w-full origin-center" />
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="lg:hidden border-t border-black/5 bg-[#FAF9F6]/50"
            >
              <div className="flex flex-col p-6 gap-2">
                {navLinks.map((link) => (
                  <motion.a 
                    whileTap={{ scale: 0.98 }}
                    key={link.name}
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="px-6 py-4 rounded-2xl bg-white text-[13px] font-black uppercase tracking-[0.2em] text-gray-900 border border-black/[0.03] shadow-sm"
                  >
                    {link.name}
                  </motion.a>
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