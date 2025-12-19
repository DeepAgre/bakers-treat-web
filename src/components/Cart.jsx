import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react'; // Added ShoppingBag here

const Cart = ({ isOpen, onClose, items, total, updateQty, removeItem }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Higher Z to cover everything */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] cursor-pointer"
          />
          
          {/* Drawer - Highest Z-Index (120) */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1C1C1C] border-l border-white/10 z-[120] shadow-2xl flex flex-col text-white"
          >
            {/* Header - Fixed Background to hide Navbar underneath */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#1C1C1C] sticky top-0 z-20">
              <h2 className="text-2xl font-serif">Your Bag</h2>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors group"
              >
                <X className="w-6 h-6 text-white group-hover:text-[#E89EB8]" />
              </button>
            </div>

            {/* Scrollable Items Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                // This was the part causing the crash! Fixed now.
                <div className="h-full flex flex-col items-center justify-center text-[#A3A3A3] space-y-4">
                  <ShoppingBag size={48} strokeWidth={1} className="opacity-20" />
                  <p className="font-serif italic">Your bag is empty</p>
                  <button 
                    onClick={onClose}
                    className="text-[#E89EB8] text-xs uppercase tracking-widest font-bold border-b border-[#E89EB8] pb-1"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 bg-[#252525] rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-serif text-lg">{item.name}</h4>
                        <span className="text-[#E89EB8] font-medium">{item.price}</span>
                      </div>
                      <p className="text-[10px] text-[#A3A3A3] uppercase tracking-widest mb-4">{item.category}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-[#252525] rounded-full px-3 py-1 border border-white/5">
                          <button onClick={() => updateQty(item.id, -1)} className="hover:text-[#E89EB8] p-1"><Minus className="w-3 h-3" /></button>
                          <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="hover:text-[#E89EB8] p-1"><Plus className="w-3 h-3" /></button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)} 
                          className="text-[#A3A3A3] hover:text-red-400 transition-colors p-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-[#151515]">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#A3A3A3] uppercase text-[10px] tracking-[0.2em]">Subtotal</span>
                <span className="text-2xl font-serif">${total.toFixed(2)}</span>
              </div>
              <button 
                className="w-full bg-[#E89EB8] text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-20 disabled:grayscale active:scale-95" 
                disabled={items.length === 0}
              >
                Checkout Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;