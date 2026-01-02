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
    isVerified: false
  },
  {
    _id: 'seed-2',
    name: "Siddharth Malhotra",
    comment: "Ordered a customized hamper for my sister's birthday. Every single item was fresh and beautifully packed. Highly recommend!",
    location: "Hiranandani Estate",
    rating: 5,
    isVerified: false
  },
  {
    _id: 'seed-3',
    name: "Riya Sharma",
    comment: "Khushi's signature chocolate cake is the best I've had in Thane. Not too sweet, just perfect.",
    location: "Majiwada",
    rating: 5,
    isVerified: false
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
    /* UI FIX: Changed Light Mode bg to a softer pink-white so the white cards stand out beautifully */
    <section className="py-24 bg-[#FFF5F7] dark:bg-[#FFF5F7] transition-colors duration-500" id="reviews">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h4 className="text-[#E89EB8] font-black uppercase tracking-[0.4em] text-[10px] mb-4">Kind Words</h4>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900  transition-colors duration-500">
            From our <span className="text-[#E89EB8]">Bakers Treat</span> family
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allTestimonials.map((item, index) => (
            <motion.div 
              key={item._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              /* UI FIX: Cards now have a clear border in Light Mode to separate from the light pink bg */
              className="bg-white dark:bg-[#151515] p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgba(232,158,184,0.1)] dark:shadow-2xl border border-[#E89EB8]/10 dark:border-white/5 flex flex-col justify-between transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl text-[#E89EB8] font-serif leading-none block">“</span>
                  {item.isVerified && (
                    <span className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Verified
                    </span>
                  )}
                </div>
                
                {/* UI FIX: Text color adjusted for high contrast in both modes */}
                <p className="text-gray-600 dark:text-gray-300 italic text-lg leading-relaxed mb-8">
                  {item.comment}
                </p>
              </div>

              <div>
                <div className="flex text-yellow-400 text-xs mb-3 space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < (item.rating || 5) ? "opacity-100" : "opacity-30"}>★</span>
                  ))}
                </div>
                
                <h4 className="font-bold text-gray-900  text-xl transition-colors">{item.name}</h4>
                <p className="text-[#E89EB8] text-[10px] font-black uppercase tracking-[0.2em] mt-1.5">
                  {item.location || "Thane Customer"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;