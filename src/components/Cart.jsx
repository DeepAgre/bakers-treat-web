import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ isOpen, onClose, items, total, updateQty, removeItem, onCheckout }) => {
  const scrollRef = useRef(null);

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

  // 1. CSS Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 2. MOUSE WHEEL FIX
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isOpen) return;
      const el = scrollRef.current;
      if (!el) return;
      const isInsideCart = el.contains(e.target);
      if (isInsideCart) {
        e.stopPropagation();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const freshTomorrow = getTomorrowDate();
      if (!deliveryDate || deliveryDate <= new Date().toISOString().split('T')[0]) {
        setDeliveryDate(freshTomorrow);
      }
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] cursor-pointer"
          />

          {/* Bag Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            /* Updated bg to handle light mode properly with a slight gray border */
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-[#121212] z-[201] shadow-2xl flex flex-col transition-colors duration-500 border-l border-gray-100 dark:border-white/5"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center shrink-0">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white transition-colors">Your Bag</h2>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full text-gray-400 dark:text-gray-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* PRODUCT LIST */}
            <div 
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-6 space-y-6 overscroll-contain custom-scrollbar"
            >
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 dark:text-gray-500 font-medium font-sans">Your bag is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-gray-50 dark:bg-[#1A1A1A] p-4 rounded-2xl border border-black/[0.03] dark:border-white/5 shrink-0 transition-all duration-300">
                    <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm font-sans truncate">{item.name}</h4>
                      <p className="text-[#E89EB8] font-black text-sm">₹{item.price}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <button 
                          onClick={() => updateQty(item.id, -1)} 
                          className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer font-bold text-gray-600 dark:text-gray-400 transition-colors"
                        >
                          -
                        </button>
                        <span className="font-black text-xs text-gray-900 dark:text-white">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item.id, 1)} 
                          className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer font-bold text-gray-600 dark:text-gray-400 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2 shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Section */}
            {items.length > 0 && (
              <div className="p-6 bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-white/5 space-y-4 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] transition-colors">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-2 block">Delivery Date</label>
                    <input 
                      type="date" 
                      min={minDate} 
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      /* Improved visibility for Light Mode date picker */
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white font-sans text-sm outline-none focus:border-[#E89EB8] transition-all cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-2 block">Delivery Address / Area</label>
                    <textarea 
                      placeholder="e.g. Hiranandani Meadows, Thane West..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows="2"
                      /* Improved placeholder color for light mode */
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1A] text-gray-900 dark:text-white font-sans text-sm placeholder:text-gray-400 resize-none outline-none focus:border-[#E89EB8] transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Subtotal</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white transition-colors">{total}</span>
                  </div>
                  <p className="text-[10px] text-[#E89EB8] font-bold italic">
                    *Delivery charges extra based on distance from Thane West.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onCheckout('whatsapp', deliveryDate, address)}
                    className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg cursor-pointer text-sm"
                  >
                    Checkout via WhatsApp
                  </button>
                  <div className="grid grid-cols-2 gap-3 pb-2">
                    <button 
                      onClick={() => onCheckout('call')} 
                      className="bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-black uppercase tracking-widest text-[9px] hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                      Call Khushi
                    </button>
                    <button 
                      onClick={() => onCheckout('whatsapp', 'Inquiry')} 
                      className="border-2 border-black dark:border-white text-black dark:text-white py-3.5 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-[0.98] transition-all"
                    >
                      Inquiry
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;