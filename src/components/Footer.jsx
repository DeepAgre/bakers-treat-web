import React from 'react';
import { Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const whatsappUrl = "https://wa.me/919136371662";
  const instagramUrl = "https://www.instagram.com/_bakers_treat_/";

  return (
    <footer className="bg-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif mb-6">Delight Bakehouse<span className="text-[#E89EB8]">.</span></h2>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
              Handcrafted with love in Thane by Khushi Manjarekar. 
              Dedicated to bringing premium artisan bakes and sculptural cakes to your doorstep.
            </p>
            <div className="flex gap-4">
               <a href={instagramUrl} target="_blank" rel="noreferrer" className="p-3 bg-[#F9F8F6] rounded-full hover:text-[#E89EB8] transition-colors">
                  <Instagram size={20} />
               </a>
               <a href={whatsappUrl} target="_blank" rel="noreferrer" className="p-3 bg-[#F9F8F6] rounded-full hover:text-[#25D366] transition-colors">
                  <MessageCircle size={20} />
               </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Location</h4>
            <address className="not-italic text-gray-500 space-y-2">
              <p>Thane, Maharashtra</p>
              <p>India</p>
              <p className="pt-4 text-black font-medium">+91 91363 71662</p>
            </address>
          </div>

          {/* High-Visibility Connect Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Connect</h4>
            <div className="space-y-4">
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between group border-b border-black/5 pb-2 hover:border-[#E89EB8] transition-all"
              >
                <span className="text-lg font-serif group-hover:text-[#E89EB8]">Instagram</span>
                <ArrowUpRight size={18} className="text-gray-300 group-hover:text-[#E89EB8]" />
              </a>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between group border-b border-black/5 pb-2 hover:border-[#25D366] transition-all"
              >
                <span className="text-lg font-serif group-hover:text-[#25D366]">WhatsApp</span>
                <ArrowUpRight size={18} className="text-gray-300 group-hover:text-[#25D366]" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400">© 2025 Delight Bakehouse. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-gray-400">
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;