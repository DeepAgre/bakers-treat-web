import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductModal = ({ product, isOpen, onClose, onAddToBag }) => {
  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-[10001] bg-white p-2 rounded-full shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {/* Image */}
          <div className="w-full md:w-1/2 h-[250px] md:h-auto">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between bg-white">
            <div>
              <span className="text-[#E89EB8] text-[10px] font-black uppercase tracking-widest mb-2 block">
                {product.category}
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-bold mb-4">
                {product.name}
              </h2>
              <p className="text-xl font-bold mb-6">₹{product.price}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {product.description || "A signature creation from Delight Bakehouse, Thane."}
              </p>
            </div>

            <button 
              onClick={() => {
                onAddToBag(product);
                onClose();
              }}
              className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#E89EB8] transition-all"
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