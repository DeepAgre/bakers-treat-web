import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const khushiNumber = "919136371662"; // Your stored contact

  const quickLinks = [
    { name: 'Our Story', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Custom Orders', href: '#home' },
  ];

  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Branding & CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-16 border-b border-white/10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif mb-6">Bakers Treat<span className="text-[#E89EB8]">.</span></h2>
            <p className="text-white/50 max-w-sm leading-relaxed mb-8">
              Handcrafting premium, artisanal bakes in the heart of Thane. 
              Every treat is a story of quality and passion.
            </p>
            <div className="flex gap-4">
              <a 
                href={`https://wa.me/${khushiNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E89EB8] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
              >
                Order on WhatsApp
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
              <p className="text-sm text-white/60 leading-loose">
                Thane, Maharashtra<br />
                Mon - Sun: 9AM - 9PM<br />
                <a href={`tel:+${khushiNumber}`} className="hover:text-white transition-colors">
                  +91 91363 71662
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-10 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
            © {currentYear} Bakers Treat • Handcrafted with love in Thane
          </p>
          
          <div className="flex gap-8">
             <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">Instagram</span>
             <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">Facebook</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;