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

  // --- HARDCORE SCROLL LOCK LOGIC ---
  useEffect(() => {
    if (isOpen) {
      // 1. Get the current scroll position
      const scrollY = window.scrollY;
      
      // 2. Lock the body in place
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll'; // Keep scrollbar space to prevent layout shift
    } else {
      // 3. Get the scroll position back from the "top" property
      const scrollY = document.body.style.top;
      
      // 4. Reset body styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      // 5. Scroll back to where the user was
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] cursor-pointer"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col border-l border-slate-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-50 flex justify-between items-center shrink-0 bg-white">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900 leading-tight">Your Bag</h2>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Delight Bakehouse Studio</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-900 transition-all active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Scrollable Items - The internal scroll area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-white scroll-smooth"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {items.length === 0 ? (
                <div className="text-center py-32">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E89EB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  </div>
                  <p className="text-slate-400 font-medium font-sans">Your bag is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-slate-50/50 p-4 rounded-2xl border border-slate-100 transition-all hover:bg-slate-50">
                    <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                      <p className="text-[#E89EB8] font-black text-sm mb-2">₹{item.price.toString().replace('₹', '')}</p>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQty(item.id, -1)} 
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center bg-white text-slate-900 hover:bg-[#E89EB8] hover:text-white hover:border-[#E89EB8] transition-all"
                        >
                          <span className="text-lg leading-none">-</span>
                        </button>
                        <span className="w-8 text-center font-black text-xs text-slate-900">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item.id, 1)} 
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center bg-white text-slate-900 hover:bg-[#E89EB8] hover:text-white hover:border-[#E89EB8] transition-all"
                        >
                          <span className="text-lg leading-none">+</span>
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="text-slate-300 hover:text-red-500 transition-colors p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-slate-100 space-y-5 shrink-0 shadow-[0_-15px_30px_rgba(0,0,0,0.02)]">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#E89EB8] mb-2 block">Requested Delivery Date</label>
                    <input 
                      type="date" 
                      min={minDate} 
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-sans text-sm outline-none focus:ring-2 focus:ring-[#E89EB8]/20 focus:border-[#E89EB8] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#E89EB8] mb-2 block">Delivery Area in Thane</label>
                    <textarea 
                      placeholder="e.g. Hiranandani Estate, Majiwada..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows="2"
                      className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-sans text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#E89EB8]/20 focus:border-[#E89EB8] transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-slate-500 font-medium">Estimated Total</span>
                    <span className="text-3xl font-black text-slate-900 leading-none tracking-tight">
                      ₹{total.toString().replace('₹', '')}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold">
                    *Excludes delivery charges from Thane.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onCheckout('whatsapp', deliveryDate, address)}
                    className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(37,211,102,0.15)] text-[11px]"
                  >
                    Send Order to WhatsApp
                  </button>
                  <div className="grid grid-cols-2 gap-3 pb-2">
                    <button 
                      onClick={() => onCheckout('call')} 
                      className="bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-800 transition-all"
                    >
                      Direct Call
                    </button>
                    <button 
                      onClick={() => onClose()} 
                      className="border border-slate-200 text-slate-600 py-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-50 transition-all"
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