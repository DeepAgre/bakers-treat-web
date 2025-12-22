import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductModal = ({ product, isOpen, onClose, onAddToBag }) => {
  // If no product or not open, return nothing
  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop - High Z-Index to block other clicks */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row z-[10000]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-[10001] bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {/* Left: Image Container */}
          <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-gray-50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Info Section */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col bg-white overflow-y-auto">
            <div className="flex-grow">
              <span className="text-[#E89EB8] text-[11px] font-black uppercase tracking-[0.4em] mb-3 block font-sans">
                {product.category || "Artisan Bake"}
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                {product.name}
              </h2>
              <p className="text-2xl font-serif text-gray-700 mb-8 font-medium">
                ₹{product.price}
              </p>
              <p className="text-gray-500 leading-relaxed font-sans text-base mb-8">
                {product.description || "Freshly baked in Thane with premium ingredients. A signature creation by Khushi Manjrekar."}
              </p>
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => {
                onAddToBag(product);
                onClose();
              }}
              className="w-full bg-black text-white py-5 rounded-2xl font-sans font-black uppercase tracking-widest hover:bg-[#E89EB8] transition-all shadow-xl active:scale-95"
            >
              Add to Bag
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;