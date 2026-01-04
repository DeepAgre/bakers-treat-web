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
import FeedbackForm from './components/FeedbackForm'; 
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductModal from './components/ProductModal';
import Toast from './components/Toast';
import PreLoader from './components/PreLoader';
import AnnouncementBanner from './components/AnnouncementBanner';

const BakeryApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
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
    }, 3500);
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
    const itemSummary = cartItems.map(i => `• ${i.name} (x${i.qty})`).join('\n');
    const message = encodeURIComponent(
      `Hi Khushi! I'd like to place an order from Delight Bakehouse:\n\n` +
      `Items:\n${itemSummary}\n\n` +
      `Delivery Date: ${deliveryDate}\n` +
      `Address: ${address}\n\n` +
      `Total: ${formattedTotal}`
    );
    window.open(`https://wa.me/${khushiNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="relative w-full min-h-screen bg-white text-slate-900 selection:bg-[#E89EB8]/20">
      
      {/* MODALS & OVERLAYS (Outside SmoothScroll for better scrolling performance) */}
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

      <SmoothScroll isPaused={isCartOpen || isModalOpen}>
        <AnimatePresence mode="wait">
          {isLoading && <PreLoader key="loader" onSkip={handleSkipIntro} />}
        </AnimatePresence>

        <Toast show={showToast} message="Added to your bag!" />

        {!isLoading && (
          <header className="fixed top-0 left-0 w-full z-[150] flex flex-col items-stretch shadow-sm">
            <AnnouncementBanner />
            <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
          </header>
        )}

        <main className={`relative w-full pt-[110px] md:pt-[120px] ${!isLoading ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}`}>
          
          {/* 1. HERO PAGE */}
          <Hero isParentLoading={isLoading} />
          
          <div className="space-y-0">
            {/* Transition Marquee */}
            <Marquee />

            {/* 2. ABOUT KHUSHI SECTION */}
            <AboutKhushi />

            {/* 3. INGREDIENTS SECTION */}
            <Ingredients />

            {/* 4. CUSTOM ORDER SECTION */}
            <CustomOrder />

            {/* 5. MENU SECTION */}
            <Menu onProductSelect={handleProductSelect} />

            {/* 6. REVIEWS (TESTIMONIALS) SECTION */}
            <Testimonials />

            {/* 7. FEEDBACK FORM */}
            <FeedbackForm />

            {/* 8. FOOTER */}
            <Footer />
          </div>
        </main>
      </SmoothScroll>
    </div>
  );
};

export default BakeryApp;