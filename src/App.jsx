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

  // ... (keep your existing handler functions like handleProductSelect, addToCart, etc.)

  return (
    <div className={`relative w-full min-h-screen overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'dark bg-[#0F0F0F] text-white' : 'bg-white text-gray-900'}`}>
      <SmoothScroll>
        <AnimatePresence mode="wait">
          {isLoading && <PreLoader key="loader" onSkip={handleSkipIntro} />}
        </AnimatePresence>

        <Toast show={showToast} message="Added to your bag!" />

        {!isLoading && (
          /* FIX 1: Removed the fixed 'bg-white' from header that was causing the weird space */
          <header className="fixed top-0 left-0 w-full z-[120] pointer-events-none">
            <div className="bg-[#1A1A1A] dark:bg-black text-white text-[11px] sm:text-[13px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] py-3 sm:py-4 text-center border-b border-white/10 px-4 pointer-events-auto">
               <span className="text-[#E89EB8] animate-pulse mr-2">✦</span>
               24-Hour Notice Required • Handmade with love in Thane
               <span className="text-[#E89EB8] animate-pulse ml-2">✦</span>
            </div>
            {/* The Navbar component handles its own background/blur, so we don't wrap it in a bg div here */}
            <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
          </header>
        )}

        <main className={`relative w-full transition-colors duration-500 ${!isLoading ? "pt-24 sm:pt-32" : ""}`}>
          {/* FIX 2: Ensure sections use 'bg-transparent' so they show the main div's theme color */}
          <section id="home" className="bg-transparent"><Hero isParentLoading={isLoading} /></section>
          
          <section className="bg-transparent"><CustomOrder /></section>
          
          <section id="about" className="bg-transparent">
            <Ingredients />
            <AboutKhushi />
          </section>
          
          <div className="relative z-10 bg-transparent rounded-t-[2rem] sm:rounded-t-[3rem] mt-[-30px] sm:mt-[-50px]">
            <Marquee />
            
            <section id="menu" className="bg-transparent">
              <Menu onProductSelect={handleProductSelect} />
            </section>

            <section id="feedback" className="py-20 bg-transparent">
              <div className="max-w-7xl mx-auto px-6">
                <FeedbackForm />
              </div>
            </section>

            <Testimonials />
          </div>

          <section id="contact" className="bg-[#0A0A0A] dark:bg-black">
            <Footer />
          </section>
        </main>

        {/* ... (Cart and Modals) */}
      </SmoothScroll>
    </div>
  );
};

export default BakeryApp;