import React from 'react';
import logo from '../assets/delight.jpeg'; // Importing your new logo

const Navbar = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="flex justify-between items-center py-6 px-10">
      <div className="flex items-center gap-4">
        {/* Logo Image replaces the old text */}
        <img 
          src={logo} 
          alt="Delight Bakehouse Logo" 
          className="h-12 w-auto object-contain mix-blend-multiply" 
        />
      </div>
      
      <div className="hidden md:flex gap-10 uppercase tracking-widest text-[11px] font-bold">
        <a href="#home" className="hover:text-[#E89EB8] transition-colors">Our Story</a>
        <a href="#menu" className="hover:text-[#E89EB8] transition-colors">Menu</a>
        <a href="#contact" className="hover:text-[#E89EB8] transition-colors">Contact</a>
      </div>

      <button 
        onClick={onOpenCart}
        className="relative p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
      >
        <span className="sr-only">Bag</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#E89EB8] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
};

export default Navbar;