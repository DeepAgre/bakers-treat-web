import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Navbar = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="max-w-7xl mx-auto py-5 px-6 md:px-12 flex justify-between items-center bg-transparent">
      {/* Brand Logo */}
      <div className="text-2xl font-serif font-bold tracking-tighter cursor-pointer">
        Delight <span className="text-[#E89EB8]">Bakehouse</span>
      </div>
      
      {/* Menu Links - Increased size to 13px and made medium weight */}
      <div className="hidden md:flex gap-10 text-[13px] font-medium uppercase tracking-[0.15em] text-gray-600">
        <a href="#home" className="hover:text-black transition-colors duration-300">Our Story</a>
        <a href="#menu" className="hover:text-black transition-colors duration-300">Menu</a>
        <a href="#contact" className="hover:text-black transition-colors duration-300">Contact</a>
      </div>

      {/* Bag Button - Increased text size to 11px */}
      <button 
        onClick={onOpenCart}
        className="flex items-center gap-3 bg-white py-2.5 px-6 rounded-full shadow-sm hover:shadow-md transition-all group border border-black/5"
      >
        <ShoppingBag size={18} className="group-hover:text-[#E89EB8] transition-colors" />
        <span className="text-[11px] font-bold uppercase tracking-widest">Bag</span>
        {cartCount > 0 && (
          <span className="bg-[#E89EB8] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
};

export default Navbar;