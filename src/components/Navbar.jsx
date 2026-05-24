import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/delight.jpeg';

const Navbar = ({ cartCount, onOpenCart, onAdminClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // Transition for Page Changes
  const triggerTransition = (targetId = null) => {
    setIsTransitioning(true);
    setIsMenuOpen(false);

    setTimeout(() => {
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'auto' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }, 900);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    triggerTransition(id);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    triggerTransition();
  };

  return (
    <>
      {/* 1. THE BUBBLE OVERLAY - PINK THEME */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-[3000] bg-[#E89EB8] pointer-events-none flex items-center justify-center overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1.1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                <img 
                  src={logo} 
                  alt="Loading Logo" 
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white/30 shadow-2xl"
                />
                <motion.div 
                  animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-white"
                />
              </motion.div>

              <div className="flex flex-col items-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white font-serif italic text-2xl md:text-4xl tracking-tight"
                >
                  Delight Bakehouse
                </motion.span>
                <motion.div 
                  className="mt-4 flex gap-1 items-baseline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-white font-black">
                    Loading
                  </span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
                    className="text-[12px] text-white font-black"
                  >
                    ...
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 w-full z-[200]">
        {/* ANNOUNCEMENT BAR */}
        <div className="w-full bg-black py-3 px-4 flex items-center justify-center gap-4 text-[11px] md:text-sm font-black uppercase tracking-[0.25em] z-[210]">
          <span className="text-[#E89EB8]">✨ 24-Hour Notice Required</span>
          <span className="hidden md:inline text-white/40">•</span>
          <span className="text-white">Handcrafted in Thane</span>
          <span className="animate-pulse">✨</span>
        </div>

        {/* MAIN NAVBAR */}
        <nav 
          className={`w-full transition-all duration-500 border-none ${
            scrolled 
            ? 'py-3 bg-[#E89EB8]/95 backdrop-blur-lg shadow-xl' 
            : 'py-6 bg-transparent'
          }`}
        >
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
            
            {/* LEFT: Logo & Brand Name */}
            <div className="flex-1 flex justify-start">
              <button onClick={handleLogoClick} className="flex items-center gap-4 group text-left outline-none">
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

                <div className="flex flex-col items-start transition-colors duration-300">
                  <span className={`font-serif tracking-tighter leading-none transition-all ${
                    scrolled ? 'text-lg text-black' : 'text-xl md:text-3xl text-white'
                  }`}>
                    Delight <span className={`italic font-light ${scrolled ? 'text-white' : 'text-[#E89EB8]'}`}>Bakehouse</span>
                  </span>
                  {!scrolled && (
                    <span className="text-[8px] uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors mt-1">
                      Thane Studio
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* CENTER: Navigation (Desktop) */}
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
            <div className="flex-1 flex justify-end items-center gap-4">
              {/* Secure Workspace Entry Portal Button (Desktop) */}
              <button 
                onClick={onAdminClick}
                className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-[9px] font-black uppercase tracking-widest ${
                  scrolled 
                  ? 'border-black/35 text-black hover:bg-black hover:text-white' 
                  : 'border-white/20 text-white hover:bg-white hover:text-black'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Console
              </button>

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

              {/* Hamburger Button */}
              <button 
                className={`lg:hidden flex flex-col items-center justify-center gap-1.5 transition-colors ${scrolled ? 'text-black' : 'text-white'}`} 
                onClick={() => setIsMenuOpen(true)}
              >
                <div className={`h-[2.5px] w-6 ${scrolled ? 'bg-black' : 'bg-white'}`} />
                <div className={`h-[2.5px] w-6 ${scrolled ? 'bg-black' : 'bg-white'}`} />
                <div className={`h-[2.5px] w-4 ml-auto ${scrolled ? 'bg-black' : 'bg-white'}`} />
              </button>
            </div>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[250] bg-[#E89EB8] flex flex-col justify-between p-12 lg:hidden"
            >
              {/* CLOSE BUTTON (The "X") */}
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif font-black text-black/[0.05] pointer-events-none select-none">DB</div>
              
              <div className="flex flex-col gap-8 relative z-10 mt-16">
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

              {/* Secure Workspace Entry Portal Button (Mobile Menu) */}
              <div className="relative z-10 pt-8 border-t border-black/10 mt-auto">
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    onAdminClick();
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black/90 active:scale-[0.98] transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Chef Management Workspace
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;