import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductModal = ({ isOpen, onClose, product, onAddToBag }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) return null;

  const handleAddClick = () => {
    if (!selectedVariant) return;
    onAddToBag({
      ...product,
      id: `${product.id}-${selectedVariant.size}`,
      name: `${product.name} (${selectedVariant.size})`,
      price: selectedVariant.price,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Dark Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            /* UI FIX: Added dark mode background and border */
            className="relative bg-white dark:bg-[#121212] w-full max-w-4xl h-[92vh] sm:h-auto sm:max-h-[90vh] sm:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-gray-100 dark:border-white/5 transition-colors duration-500"
          >
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-[320] bg-white dark:bg-[#1A1A1A] p-3 rounded-full text-gray-900  shadow-xl border border-gray-100 dark:border-white/10 hover:scale-110 active:scale-90 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* 1. IMAGE SECTION */}
            <div className="w-full md:w-1/2 h-[35%] md:h-auto shrink-0 relative">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
            </div>

            {/* 2. CONTENT SECTION */}
            <div className="w-full md:w-1/2 flex flex-col h-[65%] md:h-auto bg-white dark:bg-[#121212] transition-colors duration-500">
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                <span className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">
                  {product.category}
                </span>
                {/* UI FIX: Contrast-aware Heading */}
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900  mb-4 leading-tight">
                  {product.name}
                </h2>
                {/* UI FIX: Contrast-aware Description */}
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Variant selection buttons */}
                <div className="mb-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Select Size / Quantity</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.variants?.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => setSelectedVariant(v)}
                        /* UI FIX: Buttons adapt to theme */
                        className={`px-6 py-3 rounded-xl border-2 transition-all font-bold text-xs sm:text-sm ${
                          selectedVariant?.size === v.size 
                          ? 'border-[#E89EB8] bg-[#E89EB8]/5 text-[#E89EB8]' 
                          : 'border-gray-100 dark:border-white/5 text-gray-400 dark:text-gray-600 hover:border-[#E89EB8]/30'
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. FIXED FOOTER */}
              <div className="p-6 sm:p-10 border-t border-gray-100 dark:border-white/5 flex items-center justify-between gap-4 bg-gray-50 dark:bg-[#1A1A1A]/50 transition-colors duration-500">
                <div>
                  <p className="text-gray-400 dark:text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Price</p>
                  <p className="text-2xl sm:text-3xl font-black text-gray-900  leading-none">₹{selectedVariant?.price}</p>
                </div>
                
                <button
                  onClick={handleAddClick}
                  disabled={product.isSoldOut || !selectedVariant}
                  /* UI FIX: High-contrast button for Light/Dark */
                  className="bg-black dark:bg-[#E89EB8] text-white dark:text-black px-8 py-4 sm:py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:bg-gray-200 dark:disabled:bg-white/5 disabled:text-gray-400"
                >
                  {product.isSoldOut ? 'Sold Out' : 'Add to Bag'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;