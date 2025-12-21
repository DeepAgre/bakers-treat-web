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
          className="h-12 w-auto object-contain mix-blend-multiply" 
        />
        <span className="text-3xl font-serif font-bold tracking-tight text-gray-900 group-hover:text-[#E89EB8] transition-colors">
          Delight Bakehouse
        </span>
      </a>
      
      {/* ENLARGED: Desktop Navigation Links */}
      <div className="hidden md:flex gap-12 uppercase tracking-[0.15em] text-[14px] font-extrabold text-gray-800">
        <a href="#home" className="hover:text-[#E89EB8] transition-colors border-b-2 border-transparent hover:border-[#E89EB8] pb-1">Our Story</a>
        <a href="#menu" className="hover:text-[#E89EB8] transition-colors border-b-2 border-transparent hover:border-[#E89EB8] pb-1">Menu</a>
        <a href="#contact" className="hover:text-[#E89EB8] transition-colors border-b-2 border-transparent hover:border-[#E89EB8] pb-1">Contact</a>
      </div>

      {/* ENLARGED: Bag Button */}
      <button 
        onClick={onOpenCart}
        className="flex items-center gap-3 bg-white px-7 py-3 rounded-full shadow-md border border-black/10 hover:shadow-lg transition-all active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span className="text-sm font-black uppercase tracking-widest">Bag</span>
        <span className="bg-[#E89EB8] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-black ml-1 shadow-inner">
          {cartCount}
        </span>
      </button>
    </nav>
  );
};

export default Navbar;