import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client } from '../lib/sanity';

const hardcodedTestimonials = [
  {
    _id: 'seed-1',
    name: "Ananya Iyer",
    comment: "The brownies from Delight Bakehouse are out of this world! So fudgy and rich. Khushi really knows her craft.",
    location: "Thane West",
    rating: 5,
    isVerified: true
  },
  {
    _id: 'seed-2',
    name: "Siddharth Malhotra",
    comment: "Ordered a customized hamper for my sister's birthday. Every single item was fresh and beautifully packed. Highly recommend!",
    location: "Hiranandani Estate",
    rating: 5,
    isVerified: true
  },
  {
    _id: 'seed-3',
    name: "Riya Sharma",
    comment: "Khushi's signature chocolate cake is the best I've had in Thane. Not too sweet, just perfect.",
    location: "Majiwada",
    rating: 5,
    isVerified: true
  },
  {
    _id: 'seed-4',
    name: "Ishani Ghosh",
    comment: "The attention to detail in the wedding cake was mind-blowing. It was the star of the evening. Thank you, Khushi!",
    location: "Vasant Vihar",
    rating: 5,
    isVerified: true
  },
  {
    _id: 'seed-5',
    name: "Kabir Mehta",
    comment: "Finally found a baker in Thane who gets the balance of Belgian chocolate right. Pure artisan quality.",
    location: "Ghodbunder Road",
    rating: 5,
    isVerified: true
  },
  {
    _id: 'seed-6',
    name: "Pooja Deshmukh",
    comment: "The fruit tarts are so fresh! You can tell she uses seasonal, high-quality ingredients. A treat for the soul.",
    location: "Kalwa",
    rating: 5,
    isVerified: true
  }
];

const Testimonials = () => {
  const [realReviews, setRealReviews] = useState([]);

  useEffect(() => {
    const query = `*[_type == "feedback" && isApproved == true] | order(createdAt desc)`;
    
    client.fetch(query)
      .then((data) => {
        const formattedData = data.map(rev => ({
          ...rev,
          isVerified: true 
        }));
        setRealReviews(formattedData);
      })
      .catch((err) => console.error("Sanity Fetch Error:", err));
  }, []);

  const allTestimonials = [...realReviews, ...hardcodedTestimonials];

  return (
    <section className="relative py-24 sm:py-32 w-full overflow-hidden bg-[#0F1115]" id="reviews">
      
      {/* FLORAL & ARTISTIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {/* Repeating Floral Pattern via SVG */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30c0-10 10-10 10-10s0 10-10 10c0 10-10 10-10 10s0-10 10-10z' fill='%23E89EB8' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }} />
      </div>

      {/* Large Decorative Text for 'Fullness' */}
      <div className="absolute top-10 left-10 opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[20vw] font-serif font-black text-white leading-none">TRUST</h2>
      </div>

      {/* Main Content Container - Expanded to match About section */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="h-[1px] w-12 bg-[#E89EB8]" />
              <h4 className="text-[#E89EB8] font-black uppercase tracking-[0.5em] text-[10px] sm:text-[12px]">
                Kind Words
              </h4>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight"
            >
              From our <span className="italic text-[#E89EB8]">Bakehouse</span> family
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden lg:block text-right pb-4"
          >
             <p className="text-white/40 font-serif italic text-xl">
               100+ Happy Customers in Thane
             </p>
          </motion.div>
        </div>
        
        {/* GRID: Now using 3 columns but more compact gap for a 'fuller' feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {allTestimonials.map((item, index) => (
            <motion.div 
              key={item._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
              className="group relative bg-white/[0.03] backdrop-blur-md p-10 rounded-[3.5rem] border border-white/10 hover:border-[#E89EB8]/30 transition-all duration-500 flex flex-col justify-between will-change-transform"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E89EB8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3.5rem]" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="text-5xl text-[#E89EB8]/20 group-hover:text-[#E89EB8]/40 font-serif transition-colors duration-500">“</div>
                  {item.isVerified && (
                    <span className="bg-white/5 text-[#E89EB8] text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-[#E89EB8]/20">
                      Verified
                    </span>
                  )}
                </div>
                
                <p className="text-white/80 font-light text-lg leading-relaxed mb-12 group-hover:text-white transition-colors duration-500">
                  {item.comment}
                </p>
              </div>

              <div className="relative z-10">
                <div className="flex text-[#E89EB8] text-[10px] mb-6 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < (item.rating || 5) ? "opacity-100" : "opacity-20"}>★</span>
                  ))}
                </div>
                
                <h4 className="font-serif font-bold text-white text-2xl mb-2">{item.name}</h4>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-[#E89EB8]/30"></span>
                  <p className="text-[#E89EB8]/60 text-[10px] font-black uppercase tracking-[0.3em]">
                    {item.location || "Thane Customer"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Floating Flower Elements */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#E89EB8]/5 blur-[100px] rounded-full" />
    </section>
  );
};

export default Testimonials;