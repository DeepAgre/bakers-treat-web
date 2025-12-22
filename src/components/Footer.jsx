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
    { name: 'Custom Orders', href: '#home' },
  ];

  return (
    <footer 
      className="relative pt-20 pb-10 px-6 overflow-hidden text-white"
      style={{ 
        // This gradient makes the top part black to blend with the rest of the site, 
        // then slowly reveals the image behind a dark tint
        backgroundImage: `linear-gradient(to bottom, #0A0A0A 0%, rgba(10, 10, 10, 0.85) 100%), url(${cakeGallery})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' // This gives a cool parallax effect!
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Section: Branding & CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-16 border-b border-white/10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif mb-6">Bakers Treat<span className="text-[#E89EB8]">.</span></h2>
            <p className="text-white/70 max-w-sm leading-relaxed mb-8">
              Handcrafting premium, artisanal bakes in the heart of Thane. 
              Every treat is a story of quality and passion.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href={`https://wa.me/${khushiNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E89EB8] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
              >
                Order on WhatsApp
              </a>
              <a 
                href={bakeryInsta}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#E89EB8] hover:border-[#E89EB8] transition-all"
              >
                Visit Instagram
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8"
          >
            <div>
              <h4 className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.3em] mb-6">Explore</h4>
              <ul className="space-y-4">
                {quickLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-white/60 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.3em] mb-6">Contact</h4>
              <div className="text-sm text-white/60 space-y-4 leading-relaxed">
                <p>Thane, Maharashtra</p>
                <a href={`mailto:${bakeryEmail}`} className="block hover:text-white transition-colors break-all">
                  {bakeryEmail}
                </a>
                <a href={`tel:+${khushiNumber}`} className="block hover:text-white transition-colors">
                  +91 91363 71662
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Copyright & Secondary Links */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-[10px] font-black uppercase tracking-widest text-center md:text-left">
            © {currentYear} Bakers Treat • Handcrafted with love in Thane
          </p>
          
          <div className="flex gap-8">
             <a href={bakeryInsta} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#E89EB8] text-[10px] font-black uppercase tracking-widest transition-colors">
               Bakery Instagram
             </a>
             <a href={personalInsta} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#E89EB8] text-[10px] font-black uppercase tracking-widest transition-colors">
               Khushi's Profile
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;