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

  // CSS Scroll Lock
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

  // MOUSE WHEEL FIX
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] cursor-pointer"
          />

          {/* Bag Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            /* UI FIX: Pure bg-white and gray-50 for cards makes it feel much "lighter" */
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-[#0F0F0F] z-[201] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col transition-colors duration-500 border-l border-gray-100 dark:border-white/5"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center shrink-0 bg-white dark:bg-[#0F0F0F]">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 ">Your Bag</h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Khushi's Studio</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-gray-900  transition-all active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* PRODUCT LIST */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 overscroll-contain bg-white dark:bg-[#0F0F0F]"
            >
              {items.length === 0 ? (
                <div className="text-center py-32">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E89EB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  </div>
                  <p className="text-gray-400 dark:text-gray-500 font-medium font-sans">Your bag is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-gray-50 dark:bg-[#161616] p-4 rounded-2xl border border-gray-100 dark:border-white/5 transition-all">
                    <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900  text-sm truncate">{item.name}</h4>
                      <p className="text-[#E89EB8] font-black text-sm mb-2">₹{item.price}</p>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQty(item.id, -1)} 
                          className="w-7 h-7 rounded-lg border border-gray-200 dark:border-white/10 flex items-center justify-center bg-white dark:bg-[#222] text-gray-900  hover:bg-gray-100 transition-colors"
                        >
                          <span className="mt-[-2px]">-</span>
                        </button>
                        <span className="w-8 text-center font-black text-xs text-gray-900 ">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item.id, 1)} 
                          className="w-7 h-7 rounded-lg border border-gray-200 dark:border-white/10 flex items-center justify-center bg-white dark:bg-[#222] text-gray-900  hover:bg-gray-100 transition-colors"
                        >
                          <span className="mt-[-2px]">+</span>
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="text-gray-300 hover:text-red-500 transition-colors p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Section */}
            {items.length > 0 && (
              <div className="p-6 bg-white dark:bg-[#0F0F0F] border-t border-gray-100 dark:border-white/10 space-y-4 shrink-0 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#E89EB8] mb-2 block">Delivery Date</label>
                    <input 
                      type="date" 
                      min={minDate} 
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#161616] text-gray-900  font-sans text-sm outline-none focus:ring-2 focus:ring-[#E89EB8]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#E89EB8] mb-2 block">Delivery Area in Thane</label>
                    <textarea 
                      placeholder="e.g. Majiwada, Vasant Vihar..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows="2"
                      className="w-full p-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#161616] text-gray-900  font-sans text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#E89EB8]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="text-3xl font-black text-gray-900  leading-none tracking-tight">₹{total}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold">
                    *Excludes delivery from Thane West.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onCheckout('whatsapp', deliveryDate, address)}
                    className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(37,211,102,0.2)] text-sm"
                  >
                    Send Order to WhatsApp
                  </button>
                  <div className="grid grid-cols-2 gap-3 pb-2">
                    <button 
                      onClick={() => onCheckout('call')} 
                      className="bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:opacity-90 transition-all"
                    >
                      Direct Call
                    </button>
                    <button 
                      onClick={() => onClose()} 
                      className="border-2 border-gray-200 dark:border-white/10 text-gray-900  py-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                    >
                      Keep Browsing
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