import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomOrder from './components/CustomOrder'; 
import Ingredients from './components/Ingredients';
import AboutKhushi from './components/AboutKhushi'; 
import Marquee from './components/Marquee';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
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
  
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('bakers_treat_cart');
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

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
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

  const cartTotal = cartItems.reduce((acc, item) => {
    const priceValue = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^\d.]/g, '')) 
      : item.price;
    return acc + (priceValue * item.qty);
  }, 0);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(cartTotal);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleCheckout = (type, deliveryDate) => {
    const khushiNumber = "919136371662"; 
    if (type === 'call') {
      window.location.href = `tel:+${khushiNumber}`;
      return;
    }
    if (!deliveryDate) {
      alert("Please select a delivery date first!");
      return;
    }
    const itemSummary = cartItems.map(i => `• ${i.name} (x${i.qty})`).join('\n');
    const headerMsg = type === 'whatsapp' 
      ? "Hi Khushi! I have a question about this order:" 
      : "NEW ORDER REQUEST";
    const message = encodeURIComponent(
      `${headerMsg}\n\n${itemSummary}\n\n*Total: ${formattedTotal}*\n*Requested Date: ${deliveryDate}*\n\nDelight Bakehouse Website Order`
    );
    window.open(`https://wa.me/${khushiNumber}?text=${message}`, '_blank');
  };

  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        {isLoading && <PreLoader key="loader" onSkip={handleSkipIntro} />}
      </AnimatePresence>

      <Toast show={showToast} message="Added to your bag!" />

      {!isLoading && (
        <header className="fixed top-0 left-0 w-full z-[120] animate-in fade-in duration-700">
          {/* TOP BAR: Increased font size and padding */}
          <div className="bg-[#1A1A1A] text-white text-[13px] sm:text-[14px] font-black uppercase tracking-[0.3em] py-4 text-center border-b border-white/10 shadow-lg">
            Orders must be placed 24 hours in advance • Handmade in Thane
          </div>
          
          <div className="bg-[#F9F8F6]/90 backdrop-blur-xl border-b border-black/10">
            <Navbar 
              cartCount={cartCount} 
              onOpenCart={() => setIsCartOpen(true)} 
            />
          </div>
        </header>
      )}

      <main className={!isLoading ? "pt-40" : ""}>
        <div id="home">
          <Hero isParentLoading={isLoading} />
        </div>

        <CustomOrder />

        <div id="about">
          <Ingredients />
          <AboutKhushi /> 
        </div>

        <div className="relative z-10 bg-[#F9F8F6] rounded-t-[4rem] mt-[-60px] shadow-[0_-30px_60px_rgba(0,0,0,0.08)] border-t border-black/5">
          <Marquee />
          <div id="menu">
            <Menu onProductSelect={setSelectedProduct} /> 
          </div>
          <Testimonials />
          <div id="contact">
            <Footer />
          </div>
        </div>
      </main>

      {/* NEW: ENLARGED 24HR STICKY NOTE */}
      {!isLoading && (
        <div className="fixed bottom-12 left-12 z-[100] hidden md:block">
           <div className="bg-[#E89EB8] text-white p-8 rounded-[2.5rem] shadow-[0_25px_60px_rgba(232,158,184,0.5)] border-[5px] border-white transform -rotate-3 hover:rotate-0 transition-all duration-500 cursor-help group">
            <div className="flex items-center gap-6">
              <div className="bg-white text-[#E89EB8] p-4 rounded-full shadow-inner animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <p className="text-[12px] font-black uppercase tracking-[0.4em] mb-1 opacity-90 group-hover:tracking-[0.5em] transition-all">Freshly Baked</p>
                <p className="text-3xl font-serif font-bold leading-tight italic">24-Hour Notice Required</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </SmoothScroll>
  );
};

export default BakeryApp;