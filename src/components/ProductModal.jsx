import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductModal = ({ product, isOpen, onClose, onAddToBag }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button - Moved inside for better mobile access */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-50 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Product Image */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto overflow-hidden bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between bg-white overflow-y-auto">
              <div className="mb-6">
                <span className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
                  {product.category || 'Cakes'}
                </span>
                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h2>
                <p className="text-2xl font-serif text-gray-800 mb-6">
                  ₹{product.price}
                </p>
                <div className="h-[1px] w-full bg-gray-100 mb-6"></div>
                <p className="text-gray-500 leading-relaxed font-sans text-sm sm:text-base">
                  {product.description || `Handcrafted with love in Thane by Khushi Manjrekar. Dedicated to bringing premium artisan bakes to your doorstep.`}
                </p>
              </div>

              {/* Action Button - Large and easy to click on mobile */}
              <button 
                onClick={() => {
                  onAddToBag(product);
                  onClose();
                }}
                className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#E89EB8] transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] mt-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Add to Bag
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;