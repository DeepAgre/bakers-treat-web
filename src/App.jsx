import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomOrder from './components/CustomOrder'; 
import Ingredients from './components/Ingredients';
import AboutKhushi from './components/AboutKhushi'; // New Section Added
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
  
  // Persistent Cart via LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('bakers_treat_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bakers_treat_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Loader Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSkipIntro = () => setIsLoading(false);

  // Cart Functions
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

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
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

  // RUPEE LOGIC: Parsing price strings with ₹ and commas
  const cartTotal = cartItems.reduce((acc, item) => {
    const priceString = item.price.toString().replace(/[₹,]/g, '');
    const price = parseFloat(priceString);
    return acc + (price * item.qty);
  }, 0);

  // INDIAN LOCALE FORMATTING
  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(cartTotal);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        {isLoading && <PreLoader key="loader" onSkip={handleSkipIntro} />}
      </AnimatePresence>

      <Toast show={showToast} message="Added to your bag!" />

      <div className="bg-[#F9F8F6] text-[#1A1A1A] font-sans selection:bg-[#E89EB8] selection:text-white">
        
        <Navbar 
          cartCount={cartCount} 
          onOpenCart={() => setIsCartOpen(true)} 
        />

        <div id="home">
          <Hero isParentLoading={isLoading} />
        </div>

        <CustomOrder />

        <div id="about">
          <Ingredients />
          <AboutKhushi /> 
        </div>

        <div className="relative z-10 bg-[#F9F8F6] rounded-t-[3rem] mt-[-50px] shadow-[0_-25px_50px_rgba(0,0,0,0.05)] border-t border-black/5">
          <Marquee />
          
          <div id="menu">
            <Menu onProductSelect={setSelectedProduct} /> 
          </div>

          <Testimonials />

          <div id="contact">
            <Footer />
          </div>
        </div>

        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems} 
          total={formattedTotal} 
          updateQty={updateQty}
          removeItem={removeFromCart}
        />

        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      </div>
    </SmoothScroll>
  );
};

export default BakeryApp;