import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ isOpen, onClose, items, total, updateQty, removeItem, onCheckout }) => {
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  
  const [address, setAddress] = useState('');
  const [showError, setShowError] = useState(false);

  const isAddressValid = address.trim().length > 5;

  const handleCheckout = () => {
    if (!isAddressValid) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    onCheckout('whatsapp', deliveryDate, address);
  };

  const cleanPrice = (val) => {
    if (!val) return "0";
    return val.toString().replace(/₹/g, '').trim();
  };

  const handleDateClick = (e) => {
    try { e.target.showPicker(); } catch (err) {}
  };

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
            className="fixed right-0 top-0 h-[100dvh] w-full max-w-md bg-white z-[9999] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* FIXED HEADER */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Your Bag</h2>
                <p className="text-[10px] text-[#E89EB8] uppercase tracking-[0.3em] font-black italic">Bakers Treat Studio</p>
              </div>
              <button onClick={onClose} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* SCROLLABLE PRODUCT LIST ONLY */}
            <div 
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-white" 
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {items.length === 0 ? (
                <div className="text-center py-24 text-slate-400">Your bag is empty.</div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                      <p className="text-[#E89EB8] font-black text-sm">₹{cleanPrice(item.price)}</p>
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

            {/* FIXED FOOTER (Delivery + Total + Buttons) */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-slate-100 shrink-0 shadow-[0_-15px_30px_rgba(0,0,0,0.08)] pb-safe">
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-1.5 block">Delivery Date</label>
                      <input 
                        type="date" 
                        min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} 
                        value={deliveryDate}
                        onClick={handleDateClick}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs outline-none cursor-pointer focus:border-[#E89EB8] transition-colors"
                      />
                    </div>
                    <div>
                      <label className={`text-[9px] uppercase font-black tracking-widest mb-1.5 block transition-colors ${showError ? 'text-red-500' : 'text-slate-400'}`}>
                        {showError ? 'Please provide a delivery address' : 'Delivery Area in Thane'}
                      </label>
                      <textarea 
                        placeholder="e.g. Hiranandani Estate, Majiwada..." 
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          if(showError) setShowError(false);
                        }} 
                        rows="2"
                        className={`w-full p-3 rounded-xl border bg-slate-50 text-xs outline-none resize-none transition-all ${showError ? 'border-red-300 ring-2 ring-red-50' : 'border-slate-200 focus:border-[#E89EB8]'}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-500 font-medium text-sm">Estimated Total</span>
                  <span className="text-2xl font-black text-slate-900 leading-none">₹{cleanPrice(total)}</span>
                </div>

                <div className="space-y-3">
                  <motion.div
                    animate={showError ? { x: [-4, 4, -4, 4, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <button
                      onClick={handleCheckout}
                      className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all text-xs shadow-lg 
                        ${isAddressValid 
                          ? 'bg-[#25D366] text-white hover:brightness-105 active:scale-[0.98] shadow-green-100' 
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                        }`}
                    >
                      {isAddressValid ? 'Send Order to WhatsApp' : 'Enter Address to Order'}
                    </button>
                  </motion.div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => onCheckout('call')} className="bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-800 transition-colors">Direct Call</button>
                    <button onClick={onClose} className="border border-slate-200 text-slate-500 py-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-50 transition-colors">Keep Browsing</button>
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