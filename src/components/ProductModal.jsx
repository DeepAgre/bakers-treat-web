import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Product Image */}
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-[#E89EB8] font-bold uppercase tracking-[0.2em] text-[10px]">{product.category}</span>
              <h2 className="text-4xl font-serif mt-2 mb-4">{product.name}</h2>
              <p className="text-2xl font-medium text-black/80">{product.price}</p>
            </div>

            <p className="text-gray-500 leading-relaxed mb-10">
              {product.desc || "Handcrafted with love in Thane by Khushi Manjrekar. Dedicated to bringing premium artisan bakes to your doorstep."}
            </p>

            {/* UPDATED BUTTON TEXT */}
            <button 
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full bg-[#1A1A1A] text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#E89EB8] transition-all active:scale-95 shadow-lg shadow-black/10"
            >
              <ShoppingBag size={18} />
              Add to Bag
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;