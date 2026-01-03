import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ isOpen, onClose, items, total, updateQty, removeItem, onCheckout }) => {
  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const minDate = getTomorrowDate();
  const [deliveryDate, setDeliveryDate] = useState(minDate);
  const [address, setAddress] = useState('');

  // EFFECT 1: Strict Background Lock (Prevents background scroll)
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      // Prevent touchmove on body for iOS Safari
      const preventDefault = (e) => e.preventDefault();
      document.addEventListener('touchmove', preventDefault, { passive: false });
      
      return () => {
        document.body.style.overflow = originalStyle;
        document.removeEventListener('touchmove', preventDefault);
      };
    }
  }, [isOpen]);

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            style={{ touchAction: 'none' }} // Stops background touches
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 w-full max-w-md bg-white z-[9999] shadow-2xl flex flex-col"
            style={{ 
              height: '100dvh', // Use Dynamic Viewport Height for mobile
              touchAction: 'none' // We re-enable it for the list below
            }}
          >
            {/* 1. Header (Static) */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Your Bag</h2>
                <p className="text-[10px] text-[#E89EB8] uppercase tracking-[0.3em] font-black">Delight Bakehouse Studio</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* 2. Scrollable Product List (The "Nuclear" Fix) */}
            <div 
              className="flex-1 overflow-y-auto"
              onWheel={(e) => e.stopPropagation()} // Stop wheel event from reaching body
              onTouchMove={(e) => e.stopPropagation()} // Stop touch event from reaching body
              style={{ 
                touchAction: 'pan-y', // Explicitly allow vertical scrolling ONLY here
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'none'
              }}
            >
              <div className="p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">Your bag is empty.</div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                      <img src={item.img} alt={item.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                        <p className="text-[#E89EB8] font-black text-sm">₹{item.price}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded border bg-white">-</button>
                          <span className="font-bold text-xs">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded border bg-white">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 3. Footer (Static) */}
            {items.length > 0 && (
              <div className="p-6 border-t border-slate-100 shrink-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className="space-y-4 mb-6">
                  <input 
                    type="date" min={minDate} value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
                  />
                  <textarea 
                    placeholder="Delivery Area (Thane)..." value={address}
                    onChange={(e) => setAddress(e.target.value)} rows="2"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none resize-none"
                  />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500">Total Amount</span>
                  <span className="text-2xl font-black text-slate-900">₹{total}</span>
                </div>
                <button
                  onClick={() => onCheckout('whatsapp', deliveryDate, address)}
                  className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs mb-4"
                >
                  Order on WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;