import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Calendar } from 'lucide-react';

const Cart = ({ isOpen, onClose, items, total, updateQty, removeItem, onCheckout }) => {
  const [deliveryDate, setDeliveryDate] = useState('');

  // Calculate "Tomorrow" for the date picker minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[200] shadow-2xl flex flex-col">
            
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                <ShoppingBag className="text-[#E89EB8]" /> Your Bag
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <p className="text-center text-gray-400 mt-20 font-serif">Your bag is empty</p>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.img} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                    <div className="flex-1">
                      <div className="flex justify-between font-bold text-sm">
                        <span>{item.name}</span>
                        <button onClick={() => removeItem(item.id)}><Trash2 size={14} className="text-gray-300" /></button>
                      </div>
                      <p className="text-[#E89EB8] text-sm">{item.price}</p>
                      <div className="flex items-center gap-4 mt-2 border w-fit rounded-full px-3 py-1">
                        <button onClick={() => updateQty(item.id, -1)}><Minus size={12}/></button>
                        <span className="text-sm font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)}><Plus size={12}/></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 bg-[#F9F8F6] border-t">
                {/* Date Selection */}
                <div className="mb-6">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 flex items-center gap-2">
                    <Calendar size={12} /> Desired Delivery Date
                  </label>
                  <input 
                    type="date" 
                    min={minDate}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-3 rounded-xl border focus:border-[#E89EB8] outline-none"
                  />
                </div>

                <div className="flex justify-between mb-6 font-bold font-serif text-xl">
                  <span>Total</span>
                  <span>{total}</span>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => onCheckout('preorder', deliveryDate)}
                    className="w-full bg-[#E89EB8] text-white py-5 rounded-full font-bold shadow-lg hover:scale-[1.02] transition-transform"
                  >
                    Request Booking & Pay
                  </button>
                  <button 
                    onClick={() => onCheckout('whatsapp', deliveryDate)}
                    className="w-full border-2 border-[#1A1A1A] text-[#1A1A1A] py-4 rounded-full font-bold hover:bg-[#1A1A1A] hover:text-white transition-all text-sm"
                  >
                    Discuss on WhatsApp
                  </button>
                </div>
                <p className="text-[9px] text-center text-gray-400 mt-4 italic">
                  *Khushi will confirm availability. Baking starts only after payment.
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