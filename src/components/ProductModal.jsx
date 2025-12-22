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
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-2 sm:p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="relative bg-white w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button - More visible for mobile */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full text-black shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Image Section: Height controlled for mobile */}
            <div className="w-full md:w-1/2 h-[35vh] md:h-auto shrink-0">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Content Section: Padding adjusted for mobile */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col">
              <span className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
                {product.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mb-3">{product.name}</h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">{product.description}</p>

              {/* Variant Selection */}
              <div className="mb-6">
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

              {/* Price and Action: Stay pinned or bottom-aligned */}
              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                <div>
                  <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest">Total Price</p>
                  <p className="text-2xl sm:text-3xl font-black text-gray-900">₹{selectedVariant?.price}</p>
                </div>
                
                <button
                  onClick={handleAddClick}
                  disabled={product.isSoldOut}
                  className="bg-black text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#E89EB8] transition-all shadow-xl disabled:bg-gray-200 shrink-0"
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