import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/delight.jpeg';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation mapping for all key sections
  const navLinks = [
    { name: 'Our Story', href: 'about' },
    { name: 'Menu', href: 'menu' },
    { name: 'Philosophy', href: 'ingredients' },
    { name: 'Custom Studio', href: 'custom' }, // Link to Customization Section
    { name: 'Reviews', href: 'feedback' },
    { name: 'Contact', href: 'contact' },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 100; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ${
        scrolled 
        ? 'py-4 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5' 
        : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LEFT: Logo & Branding */}
        <div className="flex-1 flex justify-start">
          <button 
            onClick={handleLogoClick} 
            className="flex items-center gap-4 group"
          >
            <div className="relative">
              <img 
                src={logo} 
                alt="Delight Bakehouse" 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10" 
              />
              <div className="absolute inset-0 rounded-full border border-[#E89EB8]/0 group-hover:border-[#E89EB8]/50 transition-all duration-500 scale-110" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl md:text-2xl font-serif text-white tracking-tighter leading-none">
                Bakers <span className="italic font-light text-[#E89EB8]">Treat</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 group-hover:text-[#E89EB8] transition-colors mt-1">
                Thane Studio
              </span>
            </div>
          </button>
        </div>

        {/* CENTER: Navigation (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 bg-white/5 px-8 py-3 rounded-full border border-white/5 backdrop-blur-md">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#E89EB8] transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#E89EB8] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* RIGHT: Actions */}
        <div className="flex-1 flex justify-end items-center gap-6">
          {/* Bag Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative flex items-center gap-3 group"
          >
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-[8px] uppercase tracking-widest text-white/40">Your Bag</span>
              <span className="text-[10px] font-mono text-[#E89EB8]">Item: {cartCount}</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center relative group-hover:bg-[#E89EB8] transition-colors duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-[#E89EB8] text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white/20">
                  {cartCount}
                </span>
              )}
            </div>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`h-[1px] bg-white transition-all duration-500 ${isMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
            <div className={`h-[1px] bg-white w-6 transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`h-[1px] bg-white transition-all duration-500 ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-[#080808] flex flex-col justify-center p-12 lg:hidden"
          >
            {/* Background Decorative Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif font-black text-white/[0.02] pointer-events-none select-none">
              BT
            </div>

            <div className="flex flex-col gap-8 relative z-10">
              <p className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.5em] mb-4">Navigation</p>
              {navLinks.map((link, idx) => (
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-left text-5xl font-serif text-white hover:italic hover:text-[#E89EB8] transition-all"
                >
                  {link.name}
                </motion.button>
              ))}
              
              <div className="h-[1px] w-full bg-white/10 my-8" />
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest">Studio Location</p>
                  <p className="text-white text-sm font-light">Thane, Maharashtra</p>
                </div>
                <div className="text-right">
                  <p className="text-white/30 text-[9px] uppercase tracking-widest">Connect</p>
                  <p className="text-[#E89EB8] text-sm font-light">@bakerstreat_</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;