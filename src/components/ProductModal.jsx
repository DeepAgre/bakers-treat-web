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
          
          {/* 1. PREMIUM DARK BACKDROP */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ y: "20%", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "20%", opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#111111] w-full max-w-6xl h-[94vh] sm:h-auto sm:max-h-[90vh] sm:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10"
          >
            
            {/* CLOSE BUTTON: Subtle & Floating */}
            <button 
              onClick={onClose} 
              className="absolute top-8 right-8 z-[320] bg-black/50 backdrop-blur-md p-4 rounded-full text-white/50 border border-white/10 hover:text-[#E89EB8] hover:border-[#E89EB8]/30 transition-all group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* 2. IMAGE SECTION: Cinematographic */}
            <div className="w-full md:w-3/5 h-[45%] md:h-auto shrink-0 relative overflow-hidden bg-black">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent md:hidden" />
              
              {/* Product Badge */}
              <div className="absolute bottom-8 left-8 hidden md:block">
                <p className="text-[#E89EB8] font-mono text-[10px] tracking-[0.5em] uppercase mb-2">Delight Bakehouse // Thane</p>
                <h3 className="text-white text-xl font-serif italic">Artisan Batch No. {product.id?.slice(-3) || '012'}</h3>
              </div>
            </div>

            {/* 3. CONTENT SECTION: Dark Editorial */}
            <div className="w-full md:w-2/5 flex flex-col h-[55%] md:h-auto bg-[#111]">
              <div className="flex-1 overflow-y-auto p-10 sm:p-14 custom-scrollbar">
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-8 bg-[#E89EB8]" />
                  <span className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.6em]">
                    {product.category}
                  </span>
                </div>

                <h2 className="text-4xl sm:text-6xl font-serif text-white mb-6 leading-[0.9] tracking-tighter">
                  {product.name}
                </h2>

                <p className="text-white/40 text-base leading-relaxed mb-12 font-light">
                  {product.description}
                </p>

                {/* Variant selection */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Select Portion</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.variants?.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-6 py-4 rounded-xl border transition-all duration-500 font-bold text-[10px] uppercase tracking-widest ${
                          selectedVariant?.size === v.size 
                          ? 'border-[#E89EB8] bg-[#E89EB8] text-black shadow-[0_0_20px_rgba(232,158,184,0.2)]' 
                          : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. FOOTER: The "Check-out" feel */}
              <div className="p-10 border-t border-white/5 flex items-center justify-between gap-8 bg-black/20">
                <div className="shrink-0">
                  <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em] mb-1">Investment</p>
                  <p className="text-3xl font-serif text-white tracking-tighter">
                    ₹{selectedVariant?.price}
                  </p>
                </div>
                
                <button
                  onClick={handleAddClick}
                  disabled={product.isSoldOut || !selectedVariant}
                  className="flex-1 bg-white text-black py-5 rounded-xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#E89EB8] hover:tracking-[0.6em] transition-all duration-500 disabled:bg-white/5 disabled:text-white/10 disabled:tracking-widest"
                >
                  {product.isSoldOut ? 'Sold Out' : 'Reserve to Bag'}
                </button>
              </div>
            </div>
          </motion.div>
          
          <style dangerouslySetInnerHTML={{ __html: `
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
          `}} />
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;