import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client } from '../lib/sanity';

const hardcodedTestimonials = [
  {
    _id: 'seed-1',
    name: "Ananya Iyer",
    comment: "The brownies from Bakers Treat are out of this world! So fudgy and rich. Khushi really knows her craft.",
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
    /* UI FIX: Soft Slate-50 background makes the white cards feel like they are floating */
    <section className="py-24 bg-slate-50/50 relative overflow-hidden" id="reviews">
      {/* Decorative Brand Accent */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none hidden lg:block">
        <h2 className="text-[15vw] font-serif font-bold text-slate-900 leading-none">Reviews</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#E89EB8] font-black uppercase tracking-[0.5em] text-[10px] mb-4"
          >
            Kind Words
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-slate-900"
          >
            From our <span className="text-[#E89EB8]">Bakers Treat</span> family
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {allTestimonials.map((item, index) => (
            <motion.div 
              key={item._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              /* UI FIX: Premium card styling with slow hover lift */
              className="group bg-white p-10 rounded-[3rem] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-white hover:border-[#E89EB8]/20 transition-all duration-700 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-6xl text-slate-100 group-hover:text-[#E89EB8]/20 font-serif leading-none block transition-colors duration-700">“</span>
                  {item.isVerified && (
                    <span className="bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-slate-100 group-hover:bg-[#E89EB8]/5 group-hover:text-[#E89EB8] transition-all duration-500">
                      Verified
                    </span>
                  )}
                </div>
                
                <p className="text-slate-600 font-medium text-lg leading-relaxed mb-10 group-hover:text-slate-900 transition-colors duration-500">
                  {item.comment}
                </p>
              </div>

              <div>
                <div className="flex text-[#E89EB8] text-[10px] mb-4 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < (item.rating || 5) ? "opacity-100" : "opacity-20"}>★</span>
                  ))}
                </div>
                
                <h4 className="font-serif font-bold text-slate-900 text-2xl mb-1">{item.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-slate-200"></span>
                  <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.3em]">
                    {item.location || "Thane Customer"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;