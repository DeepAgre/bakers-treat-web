import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ isOpen, onClose, items, total, updateQty, removeItem }) => {

  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });

  const [address, setAddress] = useState('');
  const [showError, setShowError] = useState(false);

  const isAddressValid = address.trim().length >= 1;

  const cleanPrice = (val) => {
    if (!val) return "0";
    return val.toString().replace(/₹/g, '').trim();
  };

  const handleCheckout = () => {

    if (!isAddressValid) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const itemDetails = items.map(item => {

      const lineTotal = item.price * item.qty;

      return `• ${item.name}
${item.price} x ${item.qty} = ₹${lineTotal}`;

    }).join('\n\n');

    const message =
`Hii, I want to order these products from your bakery.

${itemDetails}

-------------------------
Total Amount : ₹${cleanPrice(total)}
-------------------------

Delivery Date : ${deliveryDate}

Address :
${address}

Thank you.`;

    const encodedMessage = encodeURIComponent(message);

    const phoneNumber = "919999999999"; // replace with bakery whatsapp number

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
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

            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
              <h2 className="text-2xl font-serif font-bold text-slate-900">Your Bag</h2>

              <button onClick={onClose} className="p-3 bg-slate-50 rounded-full">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-white">

              <div className="p-6 space-y-4">

                {items.length === 0 ? (
                  <div className="text-center py-24 text-slate-400">
                    Your bag is empty.
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl">

                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div className="flex-1">

                        <h4 className="font-bold text-sm">
                          {item.name}
                        </h4>

                        <p className="text-[#E89EB8] font-bold">
                          ₹{cleanPrice(item.price)}
                        </p>

                        <div className="flex items-center gap-2 mt-2">

                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-8 h-8 border rounded"
                          >
                            -
                          </button>

                          <span>{item.qty}</span>

                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-8 h-8 border rounded"
                          >
                            +
                          </button>

                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>

                    </div>
                  ))
                )}

              </div>
            </div>

            {items.length > 0 && (

              <div className="p-6 border-t">

                <div className="space-y-4 mb-6">

                  <div>

                    <label className="text-xs font-bold text-slate-500">
                      Delivery Date
                    </label>

                    <input
                      type="date"
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                    />

                  </div>

                  <div>

                    <label className={`text-xs font-bold ${showError ? 'text-red-500' : 'text-slate-500'}`}>

                      {showError ? 'Please enter delivery address' : 'Delivery Address'}

                    </label>

                    <textarea
                      placeholder="Building, Flat, Area..."
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if(showError) setShowError(false);
                      }}
                      rows="2"
                      className="w-full p-3 border rounded-lg"
                    />

                  </div>

                </div>

                <div className="flex justify-between mb-4">

                  <span>Total</span>

                  <span className="font-bold text-xl">
                    ₹{cleanPrice(total)}
                  </span>

                </div>

                <button
                  onClick={handleCheckout}
                  disabled={!isAddressValid}
                  className={`w-full py-4 rounded-xl font-bold
                    ${isAddressValid
                      ? 'bg-[#25D366] text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  Send Order via WhatsApp
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