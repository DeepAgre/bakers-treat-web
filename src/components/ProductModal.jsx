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
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6">
          
          {/* 1. PREMIUM DARK BACKDROP */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#111111] w-full max-w-lg sm:max-w-4xl h-[85vh] sm:h-auto sm:max-h-[90vh] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden flex flex-col sm:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 z-[310]"
          >
            
            {/* CLOSE BUTTON */}
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 z-[350] bg-black/50 backdrop-blur-md p-3 rounded-full text-white/50 border border-white/10 hover:text-[#E89EB8] hover:border-[#E89EB8]/30 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* 2. IMAGE SECTION */}
            <div className="w-full sm:w-2/5 h-[35%] sm:h-auto shrink-0 relative overflow-hidden bg-black">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent hidden sm:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent sm:hidden" />
              
              <div className="absolute bottom-6 left-6 hidden sm:block">
                <p className="text-[#E89EB8] font-mono text-[8px] tracking-[0.5em] uppercase mb-1">Delight Bakehouse</p>
                <h3 className="text-white text-sm font-serif italic">Artisan Batch {product.id?.slice(-3) || '012'}</h3>
              </div>
            </div>

            {/* 3. CONTENT SECTION */}
            <div className="w-full sm:w-3/5 flex flex-col h-[65%] sm:h-auto bg-[#111]">
              <div className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar">
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-6 bg-[#E89EB8]" />
                  <span className="text-[#E89EB8] text-[9px] font-black uppercase tracking-[0.5em]">
                    {product.category}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4 leading-tight tracking-tighter">
                  {product.name}
                </h2>

                <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 font-light">
                  {product.description}
                </p>

                {/* Variant selection - Now clearly visible */}
                <div className="space-y-4 mb-4">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Select Portion</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.variants?.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-5 py-3 rounded-xl border transition-all duration-300 font-bold text-[9px] uppercase tracking-widest ${
                          selectedVariant?.size === v.size 
                          ? 'border-[#E89EB8] bg-[#E89EB8] text-black shadow-[0_0_15px_rgba(232,158,184,0.15)]' 
                          : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. FOOTER */}
              <div className="p-8 border-t border-white/5 flex items-center justify-between gap-6 bg-black/40 backdrop-blur-md">
                <div className="shrink-0">
                  <p className="text-white/20 text-[8px] font-black uppercase tracking-[0.2em] mb-0.5">Investment</p>
                  <p className="text-2xl font-serif text-white tracking-tighter">
                    ₹{selectedVariant?.price}
                  </p>
                </div>
                
                <button
                  onClick={handleAddClick}
                  disabled={product.isSoldOut || !selectedVariant}
                  className="flex-1 bg-white text-black py-4 rounded-xl font-black uppercase tracking-[0.3em] text-[9px] hover:bg-[#E89EB8] transition-all duration-500 disabled:bg-white/5 disabled:text-white/10"
                >
                  {product.isSoldOut ? 'Sold Out' : 'Reserve to Bag'}
                </button>
              </div>
            </div>
          </motion.div>
          
          <style dangerouslySetInnerHTML={{ __html: `
            .custom-scrollbar::-webkit-scrollbar { width: 3px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
          `}} />
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;