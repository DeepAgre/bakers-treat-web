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
    comment: "Ordered a customized hamper for my sister's birthday. Every single item was fresh and beautifully packed.",
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
    comment: "The attention to detail in the wedding cake was mind-blowing. It was the star of the evening.",
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
  }
];

const Testimonials = () => {
  const [realReviews, setRealReviews] = useState([]);

  useEffect(() => {
    const query = `*[_type == "feedback" && isApproved == true] | order(createdAt desc)`;
    client.fetch(query)
      .then((data) => {
        setRealReviews(data.map(rev => ({ ...rev, isVerified: true })));
      })
      .catch((err) => console.error("Sanity Fetch Error:", err));
  }, []);

  const allTestimonials = [...realReviews, ...hardcodedTestimonials];
  // We double the array to ensure a seamless loop
  const displayReviews = [...allTestimonials, ...allTestimonials];

  return (
    <section className="relative py-24 sm:py-40 w-full overflow-hidden bg-[#0a0a0a]" id="reviews">
      
      {/* 1. BRANDING BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.02] overflow-hidden">
        <h2 className="text-[25vw] font-serif font-black absolute -right-20 top-20 whitespace-nowrap text-white">
          TESTIMONIALS
        </h2>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 relative z-10 mb-20">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-[#E89EB8]" />
            <span className="text-[#E89EB8] uppercase tracking-[0.6em] text-[10px] font-bold">Client Experiences</span>
          </motion.div>
          
          <h2 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none mb-4">
            Customer <br />
            <span className="italic text-[#E89EB8] font-light">Reviews.</span>
          </h2>
        </div>
      </div>

      {/* 2. INFINITE MARQUEE CONTAINER */}
      <div className="relative w-full">
        
        {/* PREMIUM FADE GELS (Left & Right) */}
        <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

        <div className="flex overflow-hidden group">
          {/* ANIMATED TRACK */}
          <div className="flex animate-marquee whitespace-nowrap py-10 hover:[animation-play-state:paused]">
            {displayReviews.map((item, index) => (
              <div 
                key={index}
                className="inline-block w-[350px] sm:w-[450px] mx-4 sm:mx-8 whitespace-normal vertical-top"
              >
                <div className="bg-white/[0.03] backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 hover:border-[#E89EB8]/30 transition-all duration-700 h-full flex flex-col justify-between shadow-2xl">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="text-4xl text-[#E89EB8]/30 font-serif">“</div>
                      {item.isVerified && (
                        <span className="text-[#E89EB8] text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#E89EB8]/20 bg-[#E89EB8]/5">
                          Verified
                        </span>
                      )}
                    </div>
                    
                    <p className="text-white/70 font-light text-lg leading-relaxed mb-10 italic">
                      {item.comment}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <h4 className="font-serif font-bold text-white text-xl mb-1">{item.name}</h4>
                    <p className="text-[#E89EB8]/50 text-[9px] font-black uppercase tracking-[0.3em]">
                      {item.location || "Thane Studio"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. STYLE TAG FOR THE ANIMATION (No separate CSS file needed) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}} />

      {/* DECORATIVE ELEMENTS */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#E89EB8]/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Testimonials;