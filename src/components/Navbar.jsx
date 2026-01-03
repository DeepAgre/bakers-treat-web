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
    { name: 'Philosophy', href: 'philosophy' },
    { name: 'Contact', href: 'contact' },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`w-full transition-all duration-300 z-[100] border-none fixed top-0 left-0 ${
        scrolled ? 'py-3 shadow-2xl' : 'py-6'
      }`}
      style={{ 
        backgroundColor: scrolled ? 'rgba(232, 158, 184, 0.98)' : '#E89EB8',
        backdropFilter: scrolled ? 'blur(10px)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LEFT: Branding */}
        <div className="flex-1 flex justify-start">
          <button 
            onClick={handleLogoClick} 
            className="flex items-center gap-3 transition-transform active:scale-95"
          >
            <img 
              src={logo} 
              alt="Delight Bakehouse" 
              className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-white/40" 
            />
            <span className="text-xl font-serif font-bold text-white tracking-tight">
              Delight Bakehouse<span className="text-black">.</span>
            </span>
          </button>
        </div>

        {/* CENTER: Navigation (Desktop) */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:text-black transition-colors relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* RIGHT: Premium Bag Button */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-full flex items-center gap-3 transition-all shadow-lg group"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">Bag</span>
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 bg-[#E89EB8] text-black text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.button>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`h-[2px] bg-white transition-all ${isMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-5'}`} />
            <div className={`h-[2px] bg-white w-6 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`h-[2px] bg-white transition-all ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4'}`} />
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
            className="lg:hidden border-t border-white/10 overflow-hidden"
            style={{ backgroundColor: '#E89EB8' }}
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={`#${link.href}`}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-lg font-serif font-bold text-white hover:text-black transition-colors"
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