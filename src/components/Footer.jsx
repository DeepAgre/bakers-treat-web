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
      className="relative pt-24 pb-12 px-6 overflow-hidden bg-white border-t border-slate-50"
    >
      {/* --- PREMIUM PARALLAX BACKGROUND --- */}
      {/* Reduced opacity for a more sophisticated "ghosted" look */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{ 
          backgroundImage: `url(${cakeGallery})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Section: Branding & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-16 border-b border-slate-100">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold mb-6 text-slate-900">
              Bakers Treat<span className="text-[#E89EB8]">.</span>
            </h2>
            <p className="text-slate-500 max-w-sm leading-relaxed mb-10 font-medium">
              Handcrafting premium, artisanal bakes in the heart of Thane. 
              Every treat by Khushi Manjrekar is a story of quality and passion.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href={`https://wa.me/${khushiNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#E89EB8] hover:scale-105 transition-all shadow-xl shadow-slate-200"
              >
                Order on WhatsApp
              </a>
              <a 
                href={bakeryInsta}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-50 border border-slate-100 text-slate-900 px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:border-[#E89EB8] hover:text-[#E89EB8] transition-all"
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
                    <a href={link.href} className="text-slate-500 hover:text-[#E89EB8] transition-colors text-sm font-semibold">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.3em] mb-8">Studio</h4>
              <div className="text-sm text-slate-500 space-y-4 leading-relaxed font-semibold">
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
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
              © {currentYear} Bakers Treat • Crafted by Khushi Manjrekar
            </p>
          </div>
          
          <div className="flex items-center gap-8">
             <a href={bakeryInsta} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#E89EB8] text-[9px] font-black uppercase tracking-[0.2em] transition-colors">
                Bakery Feed
             </a>
             <span className="w-1.5 h-1.5 bg-[#E89EB8] rounded-full opacity-30" />
             <a href={personalInsta} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#E89EB8] text-[9px] font-black uppercase tracking-[0.2em] transition-colors">
                Owner Profile
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;