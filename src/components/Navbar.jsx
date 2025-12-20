import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Navbar = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="w-full py-6 px-6 md:px-12 flex justify-between items-center bg-transparent relative z-[100]">
      <div className="text-2xl font-serif font-bold tracking-tighter">
        Baker's <span className="text-[#E89EB8]">Treat.</span>
      </div>
      
      {/* Increased text size to text-sm and added font-medium */}
      <div className="hidden md:flex gap-10 text-sm font-medium uppercase tracking-widest text-gray-500">
        <a href="#home" className="hover:text-black transition-colors">Our Story</a>
        <a href="#menu" className="hover:text-black transition-colors">Menu</a>
        <a href="#contact" className="hover:text-black transition-colors">Contact</a>
      </div>

      <button 
        onClick={onOpenCart}
        className="flex items-center gap-3 bg-white/80 backdrop-blur-md py-3 px-6 rounded-full shadow-sm hover:shadow-md transition-all group border border-black/5"
      >
        <ShoppingBag size={18} className="group-hover:text-[#E89EB8] transition-colors" />
        {/* Increased Bag text size */}
        <span className="text-xs font-bold uppercase tracking-widest">Bag</span>
        {cartCount > 0 && (
          <span className="bg-[#E89EB8] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
};

export default Navbar;