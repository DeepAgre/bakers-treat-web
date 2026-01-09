import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/delight.jpeg';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: 'about' },
    { name: 'Menu', href: 'menu' },
    { name: 'Philosophy', href: 'ingredients' },
    { name: 'Custom Studio', href: 'custom' },
    { name: 'Reviews', href: 'feedback' },
    { name: 'Contact', href: 'contact' },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 140; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 300);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[200]">
      {/* 1. PERMANENT ANNOUNCEMENT BAR (Bigger and Always Visible) */}
      <div className="w-full bg-black py-3 px-4 flex items-center justify-center gap-4 text-[11px] md:text-sm font-black uppercase tracking-[0.25em] z-[210]">
        <span className="text-[#E89EB8]">✨ 24-Hour Notice Required</span>
        <span className="hidden md:inline text-white/40">•</span>
        <span className="text-white">Handcrafted in Thane</span>
        <span className="animate-pulse">✨</span>
      </div>

      {/* 2. MAIN NAVBAR (Updated to Soft Pink Theme) */}
      <nav 
        className={`w-full transition-all duration-500 border-none ${
          scrolled 
          ? 'py-3 bg-[#E89EB8]/95 backdrop-blur-lg shadow-xl' 
          : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LEFT: Logo */}
          <div className="flex-1 flex justify-start">
            <button onClick={handleLogoClick} className="flex items-center gap-4 group">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Delight Bakehouse" 
                  className={`rounded-full object-cover transition-all duration-500 border-2 border-white/20 ${
                    scrolled ? 'w-9 h-9 md:w-11 md:h-11' : 'w-10 h-10 md:w-14 md:h-14'
                  }`} 
                />
                <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/50 transition-all duration-500 scale-110" />
              </div>
              <div className="flex flex-col items-start text-white">
                <span className={`font-serif tracking-tighter leading-none transition-all ${scrolled ? 'text-lg' : 'text-xl md:text-3xl'}`}>
                  Delight <span className={`italic font-light ${scrolled ? 'text-black' : 'text-[#E89EB8]'}`}>Bakehouse</span>
                </span>
                {!scrolled && (
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors mt-1">
                    Thane Studio
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* CENTER: Navigation */}
          <div className={`hidden lg:flex items-center gap-8 px-8 py-3 rounded-full transition-all duration-500 ${
            scrolled ? 'bg-black/10' : 'bg-white/10 backdrop-blur-md border border-white/10'
          }`}>
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group ${
                  scrolled ? 'text-black hover:text-white' : 'text-white hover:text-[#E89EB8]'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                  scrolled ? 'bg-black' : 'bg-[#E89EB8]'
                }`} />
              </button>
            ))}
          </div>

          {/* RIGHT: Actions */}
          <div className="flex-1 flex justify-end items-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className={`relative flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-500 ${
                scrolled ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              <div className="hidden md:flex flex-col items-end mr-1">
                <span className={`text-[8px] uppercase tracking-widest ${scrolled ? 'text-white/60' : 'text-black/60'}`}>Bag</span>
                <span className="text-[10px] font-mono">Qty: {cartCount}</span>
              </div>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {cartCount > 0 && (
                  <span className={`absolute -top-2 -right-2 text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border ${
                    scrolled ? 'bg-[#E89EB8] text-black border-black' : 'bg-black text-white border-white'
                  }`}>
                    {cartCount}
                  </span>
                )}
              </div>
            </motion.button>

            <button className={`lg:hidden flex flex-col items-center justify-center gap-1.5 transition-colors ${scrolled ? 'text-black' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className={`h-[2px] w-6 transition-all duration-500 ${scrolled ? 'bg-black' : 'bg-white'} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`h-[2px] w-6 transition-all duration-500 ${scrolled ? 'bg-black' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <div className={`h-[2px] w-6 transition-all duration-500 ${scrolled ? 'bg-black' : 'bg-white'} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[150] bg-[#E89EB8] flex flex-col justify-center p-12 lg:hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif font-black text-black/[0.05] pointer-events-none select-none">BT</div>
            <div className="flex flex-col gap-8 relative z-10">
              <p className="text-black/40 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Navigation</p>
              {navLinks.map((link, idx) => (
                <motion.button 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-left text-5xl font-serif text-black hover:italic transition-all"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;