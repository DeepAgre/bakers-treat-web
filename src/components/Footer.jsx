import React from 'react';
import { motion } from 'framer-motion';
// Import the image from your assets
import cakeGallery from '../assets/cake-gallery.jpeg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const khushiNumber = "919136371662"; 
  const bakeryInsta = "https://www.instagram.com/_Delight_Bakehouse_/";
  const personalInsta = "https://www.instagram.com/_khushi_0810_/";
  const bakeryEmail = "Khushimanjrekar08@gmail.com";

  const quickLinks = [
    { name: 'Our Story', href: 'about' },
    { name: 'Menu', href: 'menu' },
    { name: 'Philosophy', href: 'philosophy' },
    { name: 'Reviews', href: 'feedback' },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer 
      id="contact" 
      className="relative pt-32 pb-12 w-full overflow-hidden bg-[#0A0A0A] text-white"
    >
      {/* --- PREMIUM DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Parallax Image Overlay */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{ 
            backgroundImage: `url(${cakeGallery})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) contrast(120%)'
          }}
        />
        {/* Gradient Fade to Black */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        
        {/* Massive Background Text to fill space */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[18vw] font-serif font-black text-white/[0.03] select-none whitespace-nowrap">
          Delight Bakehouse
        </div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-12">
        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* COLUMN 1: BRANDING (Spans 5) */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8">
                Delight <br /> 
                <span className="text-[#E89EB8] italic">Bakehouse.</span>
              </h2>
              <p className="text-white/50 max-w-md leading-relaxed text-lg font-light">
                Handcrafting premium, artisanal bakes in the heart of Thane. 
                Every Bakehouse by <span className="text-white font-medium">Khushi Manjrekar</span> is a masterpiece of Belgian chocolate and local passion.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-5 pt-4">
              <a 
                href={`https://wa.me/${khushiNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-[#E89EB8] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] transition-all"
              >
                <span className="relative z-10">Order via WhatsApp</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <style jsx>{`.group:hover span { color: #0A0A0A; }`}</style>
              </a>
              
              <a 
                href={bakeryInsta}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 hover:border-[#E89EB8] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] transition-all"
              >
                Follow the Studio
              </a>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS (Spans 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#E89EB8] text-[12px] font-black uppercase tracking-[0.4em] mb-12">Exploration</h4>
            <ul className="space-y-6">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <a 
                    href={`#${link.href}`} 
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="group flex items-center gap-3 text-white/40 hover:text-white transition-all text-lg font-serif italic cursor-pointer"
                  >
                    <span className="w-0 group-hover:w-8 h-[1px] bg-[#E89EB8] transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: STUDIO INFO (Spans 4) */}
          <div className="lg:col-span-4">
            <h4 className="text-[#E89EB8] text-[12px] font-black uppercase tracking-[0.4em] mb-12">The Studio</h4>
            <div className="space-y-8">
              <div>
                <p className="text-white/30 text-[10px] uppercase font-black tracking-widest mb-2">Location</p>
                <p className="text-xl font-serif">Thane, Maharashtra, India</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase font-black tracking-widest mb-2">Inquiries</p>
                <a href={`mailto:${bakeryEmail}`} className="text-xl font-serif hover:text-[#E89EB8] transition-colors">
                  {bakeryEmail}
                </a>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase font-black tracking-widest mb-2">Phone</p>
                <a href={`tel:+${khushiNumber}`} className="text-xl font-serif hover:text-[#E89EB8] transition-colors">
                  +91 91363 71662
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR: COPYRIGHT & SOCIALS */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.3em]">
              © {currentYear} Delight Bakehouse • All Rights Reserved
            </p>
          </div>
          
          <div className="flex items-center gap-10">
              <a href={bakeryInsta} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                <span className="text-white/30 group-hover:text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Instagram</span>
                <div className="w-1.5 h-1.5 bg-[#E89EB8] rounded-full scale-0 group-hover:scale-100 transition-transform" />
              </a>
              <a href={personalInsta} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                <span className="text-white/30 group-hover:text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Chef Profile</span>
                <div className="w-1.5 h-1.5 bg-[#E89EB8] rounded-full scale-0 group-hover:scale-100 transition-transform" />
              </a>
          </div>
        </div>
      </div>
      
      {/* Final Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-[#E89EB8] to-transparent opacity-30" />
    </footer>
  );
};

export default Footer;