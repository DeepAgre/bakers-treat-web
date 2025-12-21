import React from 'react';
import logo from '../assets/delight.jpeg';

const Navbar = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="flex justify-between items-center py-6 px-10">
      {/* Clickable Logo and Name */}
      <a href="/" className="flex items-center gap-3 group transition-transform active:scale-95">
        <img 
          src={logo} 
          alt="Delight Bakehouse" 
          className="h-10 w-auto object-contain mix-blend-multiply" 
        />
        <span className="text-2xl font-serif font-bold tracking-tight text-gray-900 group-hover:text-[#E89EB8] transition-colors">
          Delight Bakehouse
        </span>
      </a>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-10 uppercase tracking-[0.2em] text-[11px] font-bold">
        <a href="#home" className="hover:text-[#E89EB8] transition-colors">Our Story</a>
        <a href="#menu" className="hover:text-[#E89EB8] transition-colors">Menu</a>
        <a href="#contact" className="hover:text-[#E89EB8] transition-colors">Contact</a>
      </div>

      {/* RESTORED: Original Bag Button with Text */}
      <button 
        onClick={onOpenCart}
        className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-black/5 hover:shadow-md transition-all active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span className="text-[11px] font-bold uppercase tracking-widest">Bag</span>
        <span className="bg-[#E89EB8] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold ml-1">
          {cartCount}
        </span>
      </button>
    </nav>
  );
};

export default Navbar;