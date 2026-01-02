import React from 'react';
import { motion } from 'framer-motion';
// Import the image from your assets
import cakeGallery from '../assets/cake-gallery.jpeg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const khushiNumber = "919136371662"; 
  const bakeryInsta = "https://www.instagram.com/_bakers_treat_/";
  const personalInsta = "https://www.instagram.com/_khushi_0810_/";
  const bakeryEmail = "Khushimanjrekar08@gmail.com";

  const quickLinks = [
    { name: 'Our Story', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#feedback' },
  ];

  return (
    <footer 
      className="relative pt-24 pb-12 px-6 overflow-hidden transition-colors duration-500 bg-white dark:bg-[#FFF5F7]"
    >
      {/* --- DYNAMIC BACKGROUND IMAGE WITH PARALLAX --- */}
      <div 
        className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: `url(${cakeGallery})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Section: Branding & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-16 border-b border-gray-100 dark:border-white/5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold mb-6 text-gray-900 ">
              Delight Bakehouse<span className="text-[#E89EB8]">.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed mb-10">
              Handcrafting premium, artisanal bakes in the heart of Thane. 
              Every treat by Khushi Manjrekar is a story of quality and passion.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href={`https://wa.me/${khushiNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black dark:bg-[#E89EB8] text-white dark:text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-lg"
              >
                Order on WhatsApp
              </a>
              <a 
                href={bakeryInsta}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 text-gray-900  px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:border-[#E89EB8] hover:text-[#E89EB8] transition-all"
              >
                Visit Instagram
              </a>
            </div>
          </motion.div>

          {/* Quick Links & Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-12"
          >
            <div>
              <h4 className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.3em] mb-8">Navigation</h4>
              <ul className="space-y-4">
                {quickLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-[#E89EB8] dark:hover:text-white transition-colors text-sm font-medium">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.3em] mb-8">Studio</h4>
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-4 leading-relaxed font-medium">
                <p>Thane, Maharashtra</p>
                <a href={`mailto:${bakeryEmail}`} className="block hover:text-[#E89EB8] transition-colors break-all">
                  {bakeryEmail}
                </a>
                <a href={`tel:+${khushiNumber}`} className="block hover:text-[#E89EB8] transition-colors">
                  +91 91363 71662
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-gray-400 /20 text-[10px] font-black uppercase tracking-widest">
              © {currentYear} Bakers Treat • Designed for Khushi Manjrekar
            </p>
          </div>
          
          <div className="flex items-center gap-8">
             <a href={bakeryInsta} target="_blank" rel="noopener noreferrer" className="text-gray-400 /20 hover:text-[#E89EB8] text-[9px] font-black uppercase tracking-[0.2em] transition-colors">
               Bakery Feed
             </a>
             <span className="w-1 h-1 bg-[#E89EB8] rounded-full opacity-30" />
             <a href={personalInsta} target="_blank" rel="noopener noreferrer" className="text-gray-400 /20 hover:text-[#E89EB8] text-[9px] font-black uppercase tracking-[0.2em] transition-colors">
               Owner Profile
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;