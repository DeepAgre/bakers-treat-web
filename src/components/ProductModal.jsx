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
          {/* PREMIUM BACKDROP: Soft blur with very subtle tint */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white w-full max-w-5xl h-[94vh] sm:h-auto sm:max-h-[85vh] sm:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_30px_100px_rgba(0,0,0,0.2)] border border-white"
          >
            {/* CLOSE BUTTON: Clean and Floating */}
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 z-[320] bg-white p-3 rounded-full text-slate-900 shadow-xl border border-slate-50 hover:scale-110 active:scale-90 transition-all group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-[#E89EB8] transition-colors"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* 1. IMAGE SECTION: Larger and clearer */}
            <div className="w-full md:w-1/2 h-[40%] md:h-auto shrink-0 relative bg-slate-50">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
            </div>

            {/* 2. CONTENT SECTION */}
            <div className="w-full md:w-1/2 flex flex-col h-[60%] md:h-auto bg-white">
              <div className="flex-1 overflow-y-auto p-8 sm:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-[1px] bg-[#E89EB8]"></span>
                  <span className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.4em]">
                    {product.category}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                  {product.name}
                </h2>

                <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-10 font-sans">
                  {product.description}
                </p>

                {/* Variant selection */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Options</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.variants?.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-8 py-4 rounded-2xl border-2 transition-all duration-300 font-bold text-xs uppercase tracking-widest ${
                          selectedVariant?.size === v.size 
                          ? 'border-[#E89EB8] bg-[#E89EB8]/5 text-[#E89EB8] shadow-inner' 
                          : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. FOOTER SECTION: Fixed at bottom */}
              <div className="p-8 sm:p-10 border-t border-slate-50 flex items-center justify-between gap-6 bg-slate-50/50">
                <div className="shrink-0">
                  <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Total Price</p>
                  <p className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                    ₹{selectedVariant?.price}
                  </p>
                </div>
                
                <button
                  onClick={handleAddClick}
                  disabled={product.isSoldOut || !selectedVariant}
                  className="flex-1 max-w-[240px] bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#E89EB8] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-200 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:scale-100"
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