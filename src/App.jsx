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
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSkipIntro = () => setIsLoading(false);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

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
    <div className="relative w-full overflow-x-hidden bg-[#F9F8F6]">
      <SmoothScroll>
        <AnimatePresence mode="wait">
          {isLoading && <PreLoader key="loader" onSkip={handleSkipIntro} />}
        </AnimatePresence>

        <Toast show={showToast} message="Added to your bag!" />

        {!isLoading && (
          <header className="fixed top-0 left-0 w-full z-[120] animate-in fade-in duration-700">
            <div className="bg-[#1A1A1A] text-white text-[11px] sm:text-[13px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] py-3 sm:py-4 text-center border-b border-white/10 px-4">
               <span className="text-[#E89EB8] animate-pulse mr-2">✦</span>
               24-Hour Notice Required • Handmade with love in Thane
               <span className="text-[#E89EB8] animate-pulse ml-2">✦</span>
            </div>
            <Navbar 
              cartCount={cartCount} 
              onOpenCart={() => setIsCartOpen(true)} 
            />
          </header>
        )}

        <main className={`relative w-full ${!isLoading ? "pt-24 sm:pt-32" : ""}`}>
          <section id="home" className="w-full overflow-hidden">
            <Hero isParentLoading={isLoading} />
          </section>

          <section className="w-full">
            <CustomOrder />
          </section>

          <section id="about" className="w-full bg-[#F9F8F6]">
            <Ingredients />
            <AboutKhushi /> 
          </section>

          {/* This container has the rounded top effect */}
          <div className="relative z-10 bg-[#F9F8F6] rounded-t-[2rem] sm:rounded-t-[3rem] mt-[-30px] sm:mt-[-50px] shadow-[0_-25px_50px_rgba(0,0,0,0.05)] border-t border-black/5">
            <Marquee />
            <section id="menu" className="w-full">
              <Menu onProductSelect={handleProductSelect} /> 
            </section>
            <Testimonials />
          </div>

          {/* Footer is now OUTSIDE the rounded block so it flows perfectly from dark to dark */}
          <section id="contact" className="w-full bg-[#0A0A0A]">
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