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
        <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center">
          {/* Dark Backdrop - Fades out quickly */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            /* CHANGED: Removed spring physics for a direct, fast slide-down */
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative bg-white w-full max-w-4xl h-[92vh] sm:h-auto sm:max-h-[90vh] sm:rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-[320] bg-white p-2 rounded-full text-black shadow-xl border border-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* 1. IMAGE SECTION */}
            <div className="w-full md:w-1/2 h-[40%] md:h-auto shrink-0">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* 2. CONTENT SECTION */}
            <div className="w-full md:w-1/2 flex flex-col h-[60%] md:h-auto bg-white">
              <div className="flex-1 overflow-y-auto p-6 sm:p-10">
                <span className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
                  {product.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mb-3">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Variant selection buttons */}
                <div className="mb-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Select Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.variants?.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-5 py-2.5 rounded-xl border-2 transition-all font-bold text-xs sm:text-sm ${
                          selectedVariant?.size === v.size 
                          ? 'border-[#E89EB8] bg-[#E89EB8]/5 text-[#E89EB8]' 
                          : 'border-gray-100 text-gray-400'
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. FIXED FOOTER */}
              <div className="p-6 sm:p-10 border-t border-gray-100 flex items-center justify-between gap-4 bg-white">
                <div>
                  <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-1">Price</p>
                  <p className="text-2xl sm:text-3xl font-black text-gray-900">₹{selectedVariant?.price}</p>
                </div>
                
                <button
                  onClick={handleAddClick}
                  disabled={product.isSoldOut || !selectedVariant}
                  className="bg-black text-white px-8 py-4 sm:py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#E89EB8] active:scale-95 transition-all shadow-xl disabled:bg-gray-200"
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