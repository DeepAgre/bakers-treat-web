import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ isOpen, onClose, items, total, updateQty, removeItem, onCheckout }) => {
  // Robust logic to calculate strictly "Tomorrow"
  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    // Force the date to tomorrow
    tomorrow.setDate(today.getDate() + 1);
    
    // Format to YYYY-MM-DD for the HTML5 date input
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const minDate = getTomorrowDate();
  
  // Initialize with tomorrow's date by default
  const [deliveryDate, setDeliveryDate] = useState(minDate);

  // Re-verify the date whenever the cart opens to handle date changes if the site stays open overnight
  useEffect(() => {
    if (isOpen) {
      const freshTomorrow = getTomorrowDate();
      // If the currently selected date is now in the past or is "today", reset it to the new tomorrow
      if (!deliveryDate || deliveryDate <= new Date().toISOString().split('T')[0]) {
        setDeliveryDate(freshTomorrow);
      }
    }
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] cursor-pointer"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-gray-900">Your Bag</h2>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 font-medium font-sans">Your bag is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-black/5">
                    <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm font-sans">{item.name}</h4>
                      <p className="text-[#E89EB8] font-black text-sm">₹{item.price}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <button 
                          onClick={() => updateQty(item.id, -1)}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white cursor-pointer font-bold text-gray-600"
                        >
                          -
                        </button>
                        <span className="font-black text-xs text-gray-900">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item.id, 1)}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white cursor-pointer font-bold text-gray-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Section */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-100 space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block font-sans">
                    Select Pickup/Delivery Date (Min 24h Notice)
                  </label>
                  <input 
                    type="date" 
                    min={minDate} // THIS NOW STYRICTLY BLOCKS TODAY
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E89EB8] cursor-pointer font-sans text-sm"
                  />
                </div>

                <div className="flex justify-between items-center px-1">
                  <span className="text-gray-500 font-medium font-sans">Subtotal</span>
                  <span className="text-2xl font-black text-gray-900">{total}</span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onCheckout('whatsapp', deliveryDate)}
                    className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-lg cursor-pointer text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.161 1.237 8.404 3.48s3.481 5.229 3.481 8.406c0 6.556-5.333 11.888-11.889 11.888-2.003 0-3.96-.503-5.712-1.458l-6.271 1.681zm6.122-3.612c1.554.922 3.191 1.409 4.881 1.409 5.419 0 9.829-4.41 9.83-9.831.001-2.625-1.02-5.093-2.876-6.95s-4.325-2.877-6.951-2.877c-5.42 0-9.83 4.41-9.831 9.831 0 1.761.468 3.48 1.355 4.977l-1.011 3.693 3.783-.982z"/></svg>
                    Checkout via WhatsApp
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => onCheckout('call')}
                      className="bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      Call Khushi
                    </button>
                    <button
                      onClick={() => onCheckout('whatsapp', 'General Inquiry')}
                      className="border-2 border-black text-black py-4 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 cursor-pointer hover:bg-black hover:text-white transition-all"
                    >
                      Discuss More
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