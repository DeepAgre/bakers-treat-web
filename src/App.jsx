import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

const BakeryApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  // Lazy state init
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('Delight_Bakehouse_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('Delight_Bakehouse_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleSkipIntro = useCallback(() => setIsLoading(false), []);

  const handleProductSelect = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const addToCart = useCallback((productWithVariant) => {
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
  }, []);

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  const updateQty = useCallback((id, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + change);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  }, []);

  const { cartTotal, cartCount } = useMemo(() => {
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const count = cartItems.reduce((acc, item) => acc + item.qty, 0);
    return { cartTotal: total, cartCount: count };
  }, [cartItems]);

  const formattedTotal = useMemo(() => 
    new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(cartTotal), [cartTotal]
  );

  const handleCheckout = useCallback((type, deliveryDate, address) => {
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
  }, [cartItems, formattedTotal]);

  return (
    <div className="relative w-full min-h-screen bg-[#080808] text-white selection:bg-[#E89EB8]/20 overflow-x-hidden">
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={useCallback(() => setIsCartOpen(false), [])} 
        items={cartItems} 
        total={formattedTotal} 
        updateQty={updateQty}
        removeItem={useCallback((id) => setCartItems(prev => prev.filter(i => i.id !== id)), [])}
        onCheckout={handleCheckout}
      />

      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen}
        onClose={useCallback(() => setIsModalOpen(false), [])}
        onAddToBag={addToCart}
      />

      <SmoothScroll isPaused={isCartOpen || isModalOpen}>
        <AnimatePresence mode="wait">
          {isLoading && <PreLoader key="loader" onSkip={handleSkipIntro} />}
        </AnimatePresence>

        <Toast show={showToast} message="Added to your bag!" />

        {!isLoading && (
          <>
            <Navbar cartCount={cartCount} onOpenCart={useCallback(() => setIsCartOpen(true), [])} />
            
            <main className="relative w-full animate-in fade-in duration-700">
              <Hero isParentLoading={isLoading} />
              
              <div className="space-y-0 will-change-transform">
                <Marquee />

                <section id="about">
                  <AboutKhushi />
                </section>

                <section id="ingredients">
                  <Ingredients />
                </section>

                <section id="custom">
                  <CustomOrder />
                </section>

                <section id="menu">
                  <Menu onProductSelect={handleProductSelect} />
                </section>

                <section id="feedback">
                  <Testimonials />
                  <FeedbackForm />
                </section>

                <section id="contact">
                  <Footer />
                </section>
              </div>
            </main>
          </>
        )}
      </SmoothScroll>
    </div>
  );
};

export default BakeryApp;