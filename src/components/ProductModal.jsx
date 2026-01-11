import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductModal = ({ isOpen, onClose, product, onAddToBag }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // Memoize the handleAddClick to prevent unnecessary re-renders
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

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          
          {/* 1. OPTIMIZED BACKDROP - Hardware Accelerated */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0a]/90 md:backdrop-blur-md"
            style={{ willChange: 'opacity' }}
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-[#111111] w-full max-w-lg sm:max-w-4xl h-[80vh] sm:h-auto sm:max-h-[90vh] rounded-[2rem] overflow-hidden flex flex-col sm:flex-row shadow-2xl border border-white/10 z-[310]"
            style={{ 
              willChange: 'transform, opacity',
              transform: 'translateZ(0)' // Forces GPU usage
            }}
          >
            
            {/* CLOSE BUTTON */}
            <button 
              onClick={onClose} 
              className="absolute top-5 right-5 z-[350] bg-black/40 p-3 rounded-full text-white/50 border border-white/10 active:scale-95 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* 2. IMAGE SECTION - Static scale for better perf */}
            <div className="w-full sm:w-2/5 h-[30%] sm:h-auto shrink-0 relative overflow-hidden bg-black">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-70" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent sm:bg-gradient-to-r" />
            </div>

            {/* 3. CONTENT SECTION */}
            <div className="w-full sm:w-3/5 flex flex-col h-[70%] sm:h-auto bg-[#111]">
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-[1px] w-5 bg-[#E89EB8]" />
                  <span className="text-[#E89EB8] text-[8px] font-black uppercase tracking-[0.4em]">
                    {product.category}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-serif text-white mb-3 tracking-tighter">
                  {product.name}
                </h2>

                <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {product.description}
                </p>

                <div className="space-y-4">
                  <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20">Select Portion</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.variants?.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-2.5 rounded-xl border transition-colors duration-200 font-bold text-[9px] uppercase tracking-widest ${
                          selectedVariant?.size === v.size 
                          ? 'border-[#E89EB8] bg-[#E89EB8] text-black' 
                          : 'border-white/5 bg-white/5 text-white/40'
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. FOOTER */}
              <div className="p-6 border-t border-white/5 flex items-center justify-between gap-4 bg-black/20">
                <div className="shrink-0">
                  <p className="text-white/20 text-[7px] font-black uppercase mb-0.5">Price</p>
                  <p className="text-xl font-serif text-white">₹{selectedVariant?.price}</p>
                </div>
                
                <button
                  onClick={handleAddClick}
                  disabled={product.isSoldOut || !selectedVariant}
                  className="flex-1 bg-white text-black py-3.5 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] active:bg-[#E89EB8] transition-colors disabled:opacity-20"
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