import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Calendar, Phone, MessageCircle } from 'lucide-react';

const Cart = ({ isOpen, onClose, items, total, updateQty, removeItem, onCheckout }) => {
  const [deliveryDate, setDeliveryDate] = useState('');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

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
          
          {/* Side Panel */}
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[200] shadow-2xl flex flex-col"
          >
            
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                <ShoppingBag className="text-[#E89EB8]" /> Your Bag
              </h2>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              >
                <X size={20}/>
              </button>
            </div>

            {/* Product List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center mt-20">
                  <p className="text-gray-400 font-serif">Your bag is empty</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.name} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between font-bold text-sm">
                        <span>{item.name}</span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors duration-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[#E89EB8] text-sm">{item.price}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-2 border border-gray-100 w-fit rounded-full px-3 py-1 bg-gray-50/50">
                        <button 
                          onClick={() => updateQty(item.id, -1)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <Minus size={12}/>
                        </button>
                        <span className="text-sm font-bold min-w-[12px] text-center">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item.id, 1)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <Plus size={12}/></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout Section */}
            {items.length > 0 && (
              <div className="p-8 bg-[#F9F8F6] border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                
                {/* Date Picker */}
                <div className="mb-6">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 flex items-center gap-2">
                    <Calendar size={12} /> Requested Delivery Date
                  </label>
                  <input 
                    type="date" 
                    min={minDate}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#E89EB8] focus:ring-1 focus:ring-[#E89EB8] outline-none bg-white transition-all"
                  />
                </div>

                <div className="flex justify-between mb-6 font-bold font-serif text-xl">
                  <span className="text-gray-600">Total</span>
                  <span className="text-black">{total}</span>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="space-y-3">
                  {/* Primary WhatsApp Button */}
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: '#E89EB8' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onCheckout('preorder', deliveryDate)}
                    className="w-full bg-[#1A1A1A] text-white py-5 rounded-full font-bold shadow-lg flex items-center justify-center gap-3 transition-colors duration-300"
                  >
                    <MessageCircle size={20} />
                    Place Order via WhatsApp
                  </motion.button>
                  
                  {/* Secondary Options */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.03, borderColor: '#1A1A1A' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onCheckout('whatsapp', deliveryDate)}
                      className="flex items-center justify-center gap-2 border-2 border-gray-200 bg-white py-4 rounded-full font-bold text-[11px] uppercase tracking-wider text-gray-700 hover:text-black transition-all"
                    >
                      Chat
                    </motion.button>

                    <motion.button 
                      whileHover={{ scale: 1.03, borderColor: '#1A1A1A' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onCheckout('call', '')}
                      className="flex items-center justify-center gap-2 border-2 border-gray-200 bg-white py-4 rounded-full font-bold text-[11px] uppercase tracking-wider text-gray-700 hover:text-black transition-all"
                    >
                      <Phone size={14} /> Call Khushi
                    </motion.button>
                  </div>
                </div>

                <p className="text-[9px] text-center text-gray-400 mt-5 leading-relaxed italic">
                  *Orders are confirmed only after Khushi's approval. <br/>
                  Baking begins once the advance payment is received.
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