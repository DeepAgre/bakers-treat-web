import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './components/ThemeContext'; 
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomOrder from './components/CustomOrder'; 
import Ingredients from './components/Ingredients';
import AboutKhushi from './components/AboutKhushi'; 
import Marquee from './components/Marquee';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
import FeedbackForm from './components/FeedbackForm'; 
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductModal from './components/ProductModal';
import Toast from './components/Toast';
import PreLoader from './components/PreLoader';

const BakeryApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const { isDarkMode } = useTheme(); 

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('bakers_treat_cart'); // Updated key name
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bakers_treat_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSkipIntro = () => setIsLoading(false);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const addToCart = (productWithVariant) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productWithVariant.id);
      if (existing) {
        return prev.map(item => 
          item.id === productWithVariant.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...productWithVariant, qty: 1 }];
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const updateQty = (id, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + change);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(cartTotal);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleCheckout = (type, deliveryDate, address) => {
    const khushiNumber = "919136371662"; 
    
    if (type === 'call') {
      window.location.href = `tel:+${khushiNumber}`;
      return;
    }

    if (!deliveryDate || deliveryDate === 'Inquiry') {
      const msg = encodeURIComponent("Hi Khushi! I'm interested in ordering from Delight Bakehouse...");
      window.open(`https://wa.me/${khushiNumber}?text=${msg}`, '_blank');
      return;
    }

    if (!address || address.trim().length < 3) {
      alert("Please enter a delivery address or area first!");
      return;
    }

    const itemSummary = cartItems.map(i => `• ${i.name} (x${i.qty})`).join('\n');
    
    const message = encodeURIComponent(
      `🥯 *NEW ORDER FROM Delight Bakehouse*\n\n` +
      `${itemSummary}\n\n` +
      `*Subtotal: ${formattedTotal}*\n` +
      `*Delivery Date: ${deliveryDate}*\n` +
      `*Location: ${address}*\n\n` +
      `_Note: Please confirm the order and let me know the delivery charges for my area._`
    );

    window.open(`https://wa.me/${khushiNumber}?text=${message}`, '_blank');
  };

  return (
    /* Updated background and text colors to be globally reactive */
    <div className="relative w-full min-h-screen overflow-x-hidden bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <SmoothScroll>
        <AnimatePresence mode="wait">
          {isLoading && <PreLoader key="loader" onSkip={handleSkipIntro} />}
        </AnimatePresence>

        <Toast show={showToast} message="Added to your bag!" />

        {!isLoading && (
          <header className="fixed top-0 left-0 w-full z-[120] animate-in fade-in duration-700">
            <div className="bg-[#1A1A1A] dark:bg-black text-white text-[11px] sm:text-[13px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] py-3 sm:py-4 text-center border-b border-white/10 px-4">
               <span className="text-[#E89EB8] animate-pulse mr-2">✦</span>
               24-Hour Notice Required • Handmade with love in Thane
               <span className="text-[#E89EB8] animate-pulse ml-2">✦</span>
            </div>
            <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
          </header>
        )}

        <main className={`relative w-full ${!isLoading ? "pt-24 sm:pt-32" : ""}`}>
          <section id="home"><Hero isParentLoading={isLoading} /></section>
          
          <section><CustomOrder /></section>
          
          <section id="about" className="bg-white dark:bg-[#0F0F0F] transition-colors duration-500">
            <Ingredients />
            <AboutKhushi />
          </section>
          
          <div className="relative z-10 bg-white dark:bg-[#0F0F0F] rounded-t-[2rem] sm:rounded-t-[3rem] mt-[-30px] sm:mt-[-50px] shadow-[0_-25px_50px_rgba(0,0,0,0.05)] border-t border-black/5 dark:border-white/5 transition-colors duration-500">
            <Marquee />
            
            <section id="menu">
              <Menu onProductSelect={handleProductSelect} />
            </section>

            <section id="feedback" className="py-20 bg-white dark:bg-[#151515] transition-colors duration-500">
              <div className="max-w-7xl mx-auto px-6">
                <FeedbackForm />
              </div>
            </section>

            <Testimonials />
          </div>

          <section id="contact" className="bg-[#0A0A0A]">
            <Footer />
          </section>
        </main>

        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems} 
          total={formattedTotal} 
          updateQty={updateQty}
          removeItem={(id) => setCartItems(prev => prev.filter(i => i.id !== id))}
          onCheckout={handleCheckout}
        />

        <ProductModal 
          product={selectedProduct} 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToBag={addToCart}
        />
      </SmoothScroll>
    </div>
  );
};

export default BakeryApp;