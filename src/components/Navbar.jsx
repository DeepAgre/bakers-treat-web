import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import logo from '../assets/delight.jpeg';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme(); 

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
    <div className={`fixed ${scrolled ? 'top-0' : 'top-4'} left-0 w-full z-[100] px-4 py-2 pointer-events-none transition-all duration-300`}>
      <motion.nav 
        initial={false}
        animate={{
          paddingTop: scrolled ? '10px' : '14px',
          paddingBottom: scrolled ? '10px' : '14px',
          scale: scrolled ? 0.98 : 1,
        }}
        /* UI FIX: Enhanced contrast for the navbar container */
        className={`
          max-w-[1400px] mx-auto pointer-events-auto transition-all duration-500
          ${scrolled 
            ? 'bg-white/95 dark:bg-[#0F0F0F]/90 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-white dark:bg-[#161616] shadow-sm'} 
          backdrop-blur-xl rounded-[2.5rem] md:rounded-full
          border border-gray-100 dark:border-white/10
          overflow-hidden
        `}
      >
        <div className="px-5 md:px-10 flex items-center justify-between relative z-10">
          
          {/* 1. LEFT: Logo & Brand */}
          <div className="flex-1 flex justify-start">
            <motion.button 
              onClick={handleLogoClick} 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 md:gap-3 group outline-none cursor-pointer"
            >
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Bakers Treat" 
                  className="w-9 h-9 md:w-11 md:h-11 rounded-full object-cover border-2 border-[#E89EB8]/20 group-hover:border-[#E89EB8] transition-all" 
                />
              </div>
              
              <h1 className="text-[14px] md:text-xl font-serif font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300 whitespace-nowrap">
                Bakers Treat
              </h1>
            </motion.button>
          </div>

          {/* 2. CENTER: Nav Links */}
          <div className="hidden lg:flex flex-1 justify-center">
            {/* UI FIX: High contrast pill for navigation */}
            <div className="flex items-center gap-8 bg-gray-50 dark:bg-white/5 px-8 py-2.5 rounded-full border border-gray-100 dark:border-white/5">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 dark:text-gray-300 hover:text-[#E89EB8] dark:hover:text-[#E89EB8] transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#E89EB8] transition-all group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          {/* 3. RIGHT: Theme Toggle & Bag */}
          <div className="flex-1 flex justify-end items-center gap-3 md:gap-4">
            
            {/* THEME TOGGLE */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                toggleTheme();
              }}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-[#E89EB8] hover:bg-[#E89EB8] hover:text-white dark:hover:bg-[#E89EB8] dark:hover:text-white transition-all duration-300 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </button>

            {/* BAG BUTTON - UI FIX: Darker black in light mode for "pop" */}
            <button 
              onClick={onOpenCart}
              className="relative bg-gray-900 dark:bg-[#E89EB8] text-white dark:text-black px-4 py-2 md:px-7 md:py-3 rounded-full flex items-center gap-2 md:gap-3 hover:scale-105 transition-all active:scale-95 shadow-lg"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[18px] md:h-[18px]">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span className="absolute -top-3 -right-3 bg-[#E89EB8] dark:bg-white text-white dark:text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#E89EB8]">
                  {cartCount}
                </span>
              </div>
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest hidden sm:inline">Bag</span>
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button 
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-4 h-3 flex flex-col justify-between">
                <motion.span animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 5 : 0 }} className="h-[2px] bg-gray-900 dark:bg-white rounded-full w-full origin-center" />
                <motion.span animate={{ opacity: isMenuOpen ? 0 : 1 }} className="h-[2px] bg-gray-900 dark:bg-white rounded-full w-full" />
                <motion.span animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -5 : 0 }} className="h-[2px] bg-gray-900 dark:bg-white rounded-full w-full origin-center" />
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#161616]"
            >
              <div className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="px-6 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.15em] text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
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