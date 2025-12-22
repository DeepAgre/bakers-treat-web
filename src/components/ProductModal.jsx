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
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-0 sm:p-4">
          {/* Background Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative bg-white w-full max-w-4xl h-full sm:h-auto sm:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button - Always visible on top of image */}
            <button 
              onClick={onClose} 
              className="absolute top-5 right-5 z-[310] bg-white/90 backdrop-blur-md p-2.5 rounded-full text-black shadow-xl border border-black/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* IMAGE SECTION: Fixed height on mobile to prevent overlap */}
            <div className="w-full md:w-1/2 h-[45vh] md:h-auto shrink-0 relative">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
              {/* Bottom fade for a smoother transition to white section on mobile */}
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white md:hidden" />
            </div>

            {/* CONTENT SECTION: Pure white background, no transparency */}
            <div className="w-full md:w-1/2 p-7 sm:p-12 flex flex-col bg-white h-full overflow-y-auto">
              <span className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">
                {product.category}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
                {product.description}
              </p>

              {/* SIZE SELECTION */}
              <div className="mb-10">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Select Size / Weight</h4>
                <div className="flex flex-wrap gap-3">
                  {product.variants?.map((v) => (
                    <button
                      key={v.size}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-6 py-3 rounded-2xl border-2 transition-all font-bold text-sm ${
                        selectedVariant?.size === v.size 
                        ? 'border-[#E89EB8] bg-[#E89EB8]/5 text-[#E89EB8]' 
                        : 'border-gray-100 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* PRICE & BUTTON: Pinned at the bottom */}
              <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-between gap-4 bg-white">
                <div>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Price</p>
                  <p className="text-3xl font-black text-gray-900">₹{selectedVariant?.price}</p>
                </div>
                
                <button
                  onClick={handleAddClick}
                  disabled={product.isSoldOut || !selectedVariant}
                  className="bg-black text-white px-8 py-5 rounded-[1.25rem] font-black uppercase tracking-widest text-[11px] hover:bg-[#E89EB8] active:scale-95 transition-all shadow-xl disabled:bg-gray-200 shrink-0"
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