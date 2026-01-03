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

  // CLEAN RUPEE FIX: Ensures we don't get ₹₹
  const formatPrice = (price) => {
    if (!price) return "0";
    return price.toString().replace(/₹/g, '').trim();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Prevent the smooth scroll from capturing wheel events
      const stopScroll = (e) => {
        if (scrollRef.current && scrollRef.current.contains(e.target)) {
          e.stopPropagation();
        }
      };
      window.addEventListener('wheel', stopScroll, { passive: false });
      window.addEventListener('touchmove', stopScroll, { passive: false });
      
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('wheel', stopScroll);
        window.removeEventListener('touchmove', stopScroll);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[9998]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white z-[9999] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Your Bag</h2>
                <p className="text-[10px] text-[#E89EB8] uppercase tracking-[0.3em] font-black">Delight Bakehouse Studio</p>
              </div>
              <button onClick={onClose} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* PRODUCT LIST - This is the part that must scroll */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto overflow-x-hidden bg-white p-6 space-y-4"
              style={{ 
                WebkitOverflowScrolling: 'touch', 
                touchAction: 'pan-y',
                overscrollBehavior: 'contain'
              }}
            >
              {items.length === 0 ? (
                <div className="text-center py-24 text-slate-400">Your bag is empty.</div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                      <p className="text-[#E89EB8] font-black text-sm">₹{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center bg-white hover:bg-[#E89EB8] hover:text-white transition-all">-</button>
                        <span className="w-8 text-center font-black text-xs">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center bg-white hover:bg-[#E89EB8] hover:text-white transition-all">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-slate-100 shrink-0 shadow-[0_-15px_30px_rgba(0,0,0,0.02)]">
                <div className="space-y-4 mb-6">
                  <input 
                    type="date" min={minDate} value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
                  />
                  <textarea 
                    placeholder="Delivery Area in Thane..." value={address}
                    onChange={(e) => setAddress(e.target.value)} rows="2"
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none resize-none"
                  />
                </div>
                <div className="flex justify-between items-end mb-6">
                  <span className="text-slate-500 font-medium">Total Amount</span>
                  <span className="text-3xl font-black text-slate-900 leading-none tracking-tight">
                    ₹{formatPrice(total)}
                  </span>
                </div>
                <button
                  onClick={() => onCheckout('whatsapp', deliveryDate, address)}
                  className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all text-xs"
                >
                  Send Order to WhatsApp
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