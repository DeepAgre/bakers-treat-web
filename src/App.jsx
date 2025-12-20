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
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const updateQty = (id, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) return { ...item, qty: Math.max(0, item.qty + change) };
      return item;
    }).filter(item => item.qty > 0));
  };

  const cartTotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.toString().replace(/[₹,]/g, ''));
    return acc + (price * item.qty);
  }, 0);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(cartTotal);

  // NEW: Updated Checkout Logic for Khushi's Workflow
  const handleCheckout = (type, deliveryDate) => {
    if (!deliveryDate) {
      alert("Please select a delivery date first!");
      return;
    }

    const phoneNumber = "919136371662";
    const itemSummary = cartItems.map(i => `• ${i.name} (x${i.qty})`).join('\n');
    
    const header = type === 'whatsapp' 
      ? "Hi Khushi! I have a question about this order:" 
      : "NEW ORDER REQUEST";
    
    const footer = type === 'whatsapp'
      ? "Can we discuss the details?"
      : "Please confirm if you are available to bake this. I will pay once you confirm!";

    const message = encodeURIComponent(
      `${header}\n\n${itemSummary}\n\n*Total: ${formattedTotal}*\n*Requested Date: ${deliveryDate}*\n\n${footer}`
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <SmoothScroll>
      <AnimatePresence>{isLoading && <PreLoader onSkip={() => setIsLoading(false)} />}</AnimatePresence>
      
      {/* 24-Hour Policy Banner */}
      <div className="bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.2em] py-2.5 text-center sticky top-0 z-[100]">
        Orders must be placed 24 hours in advance • Handmade in Thane
      </div>

      <div className="bg-[#F9F8F6] text-[#1A1A1A]">
        <Navbar cartCount={cartItems.reduce((a, b) => a + b.qty, 0)} onOpenCart={() => setIsCartOpen(true)} />
        <Hero isParentLoading={isLoading} />
        <CustomOrder />
        <Ingredients />
        <AboutKhushi />
        <div className="relative z-10 bg-[#F9F8F6] rounded-t-[3rem] mt-[-50px]">
          <Marquee />
          <Menu onProductSelect={setSelectedProduct} />
          <Testimonials />
          <Footer />
        </div>

        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems} 
          total={formattedTotal}
          updateQty={updateQty}
          removeItem={(id) => setCartItems(prev => prev.filter(i => i.id !== id))}
          onCheckout={handleCheckout} 
        />

        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
        <Toast show={showToast} message="Added to your bag!" />
      </div>
    </SmoothScroll>
  );
};

export default BakeryApp;