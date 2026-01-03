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
    { name: 'Our Story', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed left-0 w-full z-[100] transition-all duration-500 ease-in-out px-4 md:px-8 
      ${scrolled ? 'top-4' : 'top-8'}`}
    >
      <motion.nav 
        layout
        className={`max-w-6xl mx-auto rounded-full transition-all duration-500 border
        ${scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.05)] py-3' 
          : 'bg-white border-transparent py-5'}`}
      >
        <div className="px-6 md:px-10 flex items-center justify-between">
          
          {/* LEFT: Branding */}
          <div className="flex-1 flex justify-start">
            <button 
              onClick={handleLogoClick} 
              className="flex items-center gap-3 group transition-transform active:scale-95"
            >
              <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border border-slate-100 group-hover:border-[#E89EB8] transition-colors">
                <img 
                  src={logo} 
                  alt="Bakers Treat" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="text-lg font-serif font-bold text-slate-900 tracking-tight hidden sm:block">
                Bakers Treat<span className="text-[#E89EB8]">.</span>
              </span>
            </button>
          </div>

          {/* CENTER: Navigation (Desktop) */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 hover:text-[#E89EB8] transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-[#E89EB8] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* RIGHT: Actions */}
          <div className="flex-1 flex justify-end items-center gap-4">
            {/* Bag Button - Pure Charcoal Design */}
            <button 
              onClick={onOpenCart}
              className="group relative bg-slate-900 text-white pl-6 pr-5 py-2.5 rounded-full flex items-center gap-3 hover:bg-[#E89EB8] transition-all duration-300 shadow-xl shadow-slate-200 active:scale-95"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bag</span>
              <div className="relative border-l border-white/20 pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-4 -right-3 bg-white text-[#E89EB8] text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 group-hover:border-[#E89EB8] transition-colors shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-slate-50 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.span animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 4 : 0 }} className="h-[2px] bg-slate-900 w-5 rounded-full" />
              <motion.span animate={{ opacity: isMenuOpen ? 0 : 1 }} className="h-[2px] bg-slate-900 w-5 rounded-full" />
              <motion.span animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -4 : 0 }} className="h-[2px] bg-slate-900 w-5 rounded-full" />
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-50 bg-white px-8 overflow-hidden"
            >
              <div className="flex flex-col py-8 gap-6">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-bold uppercase tracking-widest text-slate-900 hover:text-[#E89EB8]"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;