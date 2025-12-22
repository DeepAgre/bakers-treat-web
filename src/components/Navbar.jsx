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

  const handleLogoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    /* FIXED: Using overflow-hidden here prevents the mobile menu from widening the page */
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-black/5 z-[100] sticky top-0 overflow-hidden">
      <div className="px-4 py-3 sm:px-8 max-w-full mx-auto flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <button 
          onClick={handleLogoClick}
          className="flex items-center gap-2 shrink-0 cursor-pointer group outline-none border-none bg-transparent p-0 text-left"
        >
          <img 
            src={logo} 
            alt="Delight Bakehouse" 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm border border-black/5 pointer-events-none" 
          />
          <h1 className="text-[15px] sm:text-xl font-serif font-bold tracking-tight text-gray-900 leading-tight group-hover:text-[#E89EB8] pointer-events-none">
            Delight Bakehouse
          </h1>
        </button>

        {/* RIGHT SIDE: Bag & Hamburger */}
        <div className="flex items-center gap-2">
          {/* BAG BUTTON */}
          <button 
            onClick={onOpenCart}
            className="bg-white border border-black/10 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <div className="relative pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span className="absolute -top-2 -right-2 bg-[#E89EB8] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest hidden xs:inline pointer-events-none">
              Bag
            </span>
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="p-2 cursor-pointer lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between pointer-events-none">
              <span className={`h-[2.5px] bg-black rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-[2.5px] bg-black rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2.5px] bg-black rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-8 ml-4">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-[11px] font-black uppercase tracking-[0.2em] hover:text-[#E89EB8] transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-white border-t border-black/5 overflow-hidden lg:hidden"
          >
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-5 text-[12px] font-black uppercase tracking-[0.2em] border-b border-black/[0.02] active:bg-gray-50"
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