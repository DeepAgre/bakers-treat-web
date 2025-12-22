import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductModal = ({ isOpen, onClose, product, onAddToBag }) => {
  // Track which size the user has clicked (e.g., 500g or 1kg)
  const [selectedVariant, setSelectedVariant] = useState(null);

  // When a new product is opened, default to the first variant (usually 500g)
  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) return null;

  const handleAddClick = () => {
    if (!selectedVariant) return;

    // Send the specific variant details to the cart
    onAddToBag({
      ...product,
      id: `${product.id}-${selectedVariant.size}`, // Unique ID for cart
      name: `${product.name} (${selectedVariant.size})`,
      price: selectedVariant.price,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Product Image */}
            <div className="md:w-1/2 h-64 md:h-auto">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <span className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">
                {product.category}
              </span>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">{product.name}</h2>
              <p className="text-gray-500 leading-relaxed mb-8">{product.description}</p>

              {/* VARIANT SELECTOR: This fixes the "blank" area in your screenshot */}
              <div className="mb-8">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Select Size</h4>
                <div className="flex flex-wrap gap-3">
                  {product.variants?.map((v) => (
                    <button
                      key={v.size}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-6 py-3 rounded-xl border-2 transition-all font-bold text-sm ${
                        selectedVariant?.size === v.size 
                        ? 'border-[#E89EB8] bg-[#E89EB8]/5 text-[#E89EB8]' 
                        : 'border-gray-100 text-gray-400 hover:border-gray-200 hover:text-gray-600'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price and Add Button */}
              <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Price</p>
                  <p className="text-3xl font-black text-gray-900">
                    ₹{selectedVariant ? selectedVariant.price : '---'}
                  </p>
                </div>
                
                <button
                  onClick={handleAddClick}
                  disabled={product.isSoldOut || !selectedVariant}
                  className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#E89EB8] transition-all shadow-xl disabled:bg-gray-200"
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