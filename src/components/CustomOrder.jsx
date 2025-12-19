import React from 'react';
import { Palette, Hammer, MessageCircle } from 'lucide-react';

const CustomOrder = () => {
  // Encoded message for better UX: "Hi Khushi! I'd like to inquire about a custom cake from Bakers Treat."
  const whatsappUrl = "https://wa.me/919136371662?text=Hi%20Khushi!%20I'd%20like%20to%20inquire%20about%20a%20custom%20cake%20from%20Bakers%20Treat.";

  return (
    <section id="custom-order" className="py-24 bg-[#F3F1ED]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                   <img src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800&auto=format&fit=crop" className="rounded-3xl shadow-lg rotate-[-2deg]" alt="Custom Cake" />
                   <img src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop" className="rounded-3xl shadow-lg" alt="Artisan Detail" />
                </div>
                <div className="space-y-4">
                   <img src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=800&auto=format&fit=crop" className="rounded-3xl shadow-lg rotate-[2deg]" alt="Chocolate Craft" />
                   <img src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop" className="rounded-3xl shadow-lg" alt="Sculptural Cake" />
                </div>
             </div>
          </div>

          <div className="order-1 md:order-2">
            <h4 className="text-[#E89EB8] font-bold uppercase tracking-widest text-xs mb-4">The Custom Studio</h4>
            <h2 className="text-5xl font-serif mb-8 leading-tight">If you can dream it, we can create it.</h2>
            <p className="text-[#666666] text-lg mb-10 leading-relaxed font-light">
              Khushi Manjrekar specializes in high-detail 3D cakes. From luxury cars to grand ships, our cakes are handcrafted in Thane and engineered for both awe and taste.
            </p>
            
            <div className="space-y-6 mb-12">
               <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-sm h-fit text-[#E89EB8]"><Palette size={20}/></div>
                  <div>
                    <h5 className="font-bold text-sm">Bespoke Design</h5>
                    <p className="text-xs text-[#888]">Every cake is a unique blueprint designed just for you.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-sm h-fit text-[#E89EB8]"><Hammer size={20}/></div>
                  <div>
                    <h5 className="font-bold text-sm">Edible Engineering</h5>
                    <p className="text-xs text-[#888]">Gravity-defying structures built from premium ingredients.</p>
                  </div>
               </div>
            </div>

            {/* HIGHLY VISIBLE WHATSAPP BUTTON */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 bg-[#1A1A1A] text-white px-10 py-5 rounded-full font-bold hover:bg-[#25D366] transition-all shadow-xl active:scale-95"
            >
              <MessageCircle className="group-hover:animate-pulse" />
              Chat with Khushi on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomOrder;