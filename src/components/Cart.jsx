import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';

const Cart = ({ isOpen, onClose, items, total, updateQty, removeItem }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
          />
          
          {/* Cart Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[200] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="text-[#E89EB8]" />
                <h2 className="text-xl font-serif font-bold">Your Bag</h2>
                <span className="bg-[#FCE7EE] text-[#E89EB8] text-xs font-bold px-2 py-1 rounded-full">
                  {items.length}
                </span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-[#F9F8F6] rounded-full flex items-center justify-center text-gray-300">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="text-gray-500 font-serif">Your bag is empty</p>
                  <button 
                    onClick={onClose}
                    className="text-[#E89EB8] font-bold text-sm uppercase tracking-widest border-b-2 border-[#E89EB8]"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-serif font-bold text-sm">{item.name}</h4>
                        <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-[#E89EB8] font-medium text-sm mb-3">{item.price}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-100 rounded-full px-2 py-1 gap-4">
                          <button onClick={() => updateQty(item.id, -1)} className="text-gray-400 hover:text-black"><Minus size={14}/></button>
                          <span className="text-sm font-bold min-w-[10px] text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="text-gray-400 hover:text-black"><Plus size={14}/></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 bg-[#F9F8F6] border-t border-gray-100">
                <div className="flex justify-between mb-6">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-2xl font-serif font-bold">{total}</span>
                </div>
                <button className="w-full bg-[#1A1A1A] text-white py-5 rounded-full font-bold hover:bg-[#E89EB8] transition-all shadow-xl active:scale-95 mb-4">
                  Proceed to Checkout
                </button>
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                  Shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;