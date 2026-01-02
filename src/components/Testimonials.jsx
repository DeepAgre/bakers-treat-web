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
    /* 1. Added dynamic background: Pink in light mode, Very Dark in dark mode */
    <section className="py-24 bg-[#E89EB8] dark:bg-[#0A0A0A] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-serif font-bold text-center mb-16 text-white dark:text-[#E89EB8]">
          Sweet Words
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allTestimonials.map((item, index) => (
            <motion.div 
              key={item._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              /* 2. Updated Card Colors: White in light mode, Dark Gray in dark mode */
              className="bg-white dark:bg-[#151515] p-10 rounded-[2.5rem] shadow-xl border border-white/20 dark:border-white/5 flex flex-col justify-between transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl text-[#E89EB8] font-serif leading-none block">“</span>
                  {item.isVerified && (
                    /* 3. Adjusted Verified badge for Dark Mode visibility */
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Verified
                    </span>
                  )}
                </div>
                
                {/* 4. Text color adjusted for Dark Mode readability */}
                <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed mb-6">
                  {item.comment}
                </p>
              </div>

              <div>
                <div className="flex text-yellow-400 text-xs mb-2">
                  {"★".repeat(item.rating || 5)}
                </div>
                {/* 5. Name and Location color updates */}
                <h4 className="font-bold text-gray-900 dark:text-white text-xl">{item.name}</h4>
                <p className="text-[#E89EB8] text-xs font-black uppercase tracking-[0.2em] mt-1">
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