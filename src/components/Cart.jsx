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

  const phoneNumber = "919136371662";

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

    const encoded = encodeURIComponent(message);

    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[9998]"
          />

          {/* CART PANEL */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-[100dvh] w-full max-w-md bg-white z-[9999] flex flex-col shadow-2xl"
          >

            {/* HEADER */}
            <div className="p-6 border-b flex justify-between items-center shrink-0">

              <h2 className="text-2xl font-bold text-black">
                Your Bag
              </h2>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-black text-xl"
              >
                ✕
              </button>

            </div>

            {/* SCROLLABLE ITEMS AREA */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >

              <div className="p-6 space-y-4">

                {items.length === 0 ? (
                  <div className="text-center py-24 text-gray-400">
                    Your bag is empty
                  </div>
                ) : (
                  items.map((item) => (

                    <div
                      key={item.id}
                      className="flex gap-4 items-center bg-gray-100 p-4 rounded-xl"
                    >

                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">

                        <h4 className="font-bold text-black text-sm">
                          {item.name}
                        </h4>

                        <p className="text-pink-500 font-bold">
                          ₹{cleanPrice(item.price)}
                        </p>

                        <div className="flex items-center gap-2 mt-2">

                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-8 h-8 border border-gray-300 rounded text-black"
                          >
                            -
                          </button>

                          <span className="font-bold text-black w-6 text-center">
                            {item.qty}
                          </span>

                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-8 h-8 border border-gray-300 rounded text-black"
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

            {/* FOOTER */}
            {items.length > 0 && (

              <div className="p-6 border-t shrink-0 bg-white">

                <div className="space-y-4 mb-6">

                  {/* DATE */}
                  <div>

                    <label className="text-xs font-bold text-gray-600">
                      Delivery Date
                    </label>

                    <input
                      type="date"
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    />

                  </div>

                  {/* ADDRESS */}
                  <div>

                    <label className={`text-xs font-bold ${showError ? 'text-red-500' : 'text-gray-600'}`}>
                      {showError ? 'Please enter delivery address' : 'Delivery Address'}
                    </label>

                    <textarea
                      placeholder="Building, Flat No, Area..."
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (showError) setShowError(false);
                      }}
                      rows="2"
                      className="w-full p-3 border border-gray-300 rounded-lg text-black"
                    />

                  </div>

                </div>

                {/* TOTAL */}
                <div className="flex justify-between mb-4">

                  <span className="text-gray-700">
                    Estimated Total
                  </span>

                  <span className="font-bold text-xl text-black">
                    ₹{cleanPrice(total)}
                  </span>

                </div>

                {/* WHATSAPP BUTTON */}
                <button
                  onClick={handleCheckout}
                  disabled={!isAddressValid}
                  className={`w-full py-4 rounded-xl font-bold mb-3
                  ${isAddressValid
                      ? 'bg-[#25D366] text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  Send Order via WhatsApp
                </button>

                {/* EXTRA BUTTONS */}
                <div className="grid grid-cols-2 gap-3">

                  <button
                    onClick={handleCall}
                    className="bg-black text-white py-3 rounded-xl font-bold text-sm"
                  >
                    Direct Call
                  </button>

                  <button
                    onClick={onClose}
                    className="border border-gray-300 py-3 rounded-xl font-bold text-sm text-black"
                  >
                    Keep Browsing
                  </button>

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