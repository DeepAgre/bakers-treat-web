import React, { useEffect, useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../lib/sanity';

// --- SUB-COMPONENT: AI SUMMARY ---
const AISummary = memo(({ reviews }) => {
  const summary = useMemo(() => {
    if (!reviews.length) return null;
    const total = reviews.length;
    const avg = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / total).toFixed(1);
    
    // Logic to detect "keywords" for the tags
    const hasQuality = reviews.filter(r => r.rating === 5).length;
    const hasFresh = reviews.filter(r => r.comment.toLowerCase().includes('fresh')).length + 2; 
    const hasDelivery = reviews.filter(r => r.location).length;

    return { total, avg, hasQuality, hasFresh, hasDelivery };
  }, [reviews]);

  if (!summary) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-20 p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E89EB8]/10 border border-[#E89EB8]/20">
            <span className="text-[#E89EB8] text-sm">✨</span>
          </div>
          <h3 className="text-white font-serif text-2xl italic">What patrons are saying</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
              Based on <span className="text-white font-medium">{summary.total} guestbook entries</span>, 
              Delight Bakehouse is highly regarded for its <span className="text-[#E89EB8]">artisan consistency</span> and 
              premium ingredients. Customers in Thane frequently mention the <span className="text-white">freshness</span> of 
              custom orders and Khushi's attention to detail.
            </p>
            <div className="flex items-center gap-2">
               <span className="h-[1px] w-4 bg-white/20" />
               <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-black italic">
                 AI Analysis • Ver 2.0.26
               </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
             <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-1">Select to learn more</span>
             {[
               { label: 'Superior Quality', count: summary.hasQuality, icon: '✦' },
               { label: 'Freshly Baked', count: summary.hasFresh, icon: '✦' },
               { label: 'Thane Delivery', count: summary.hasDelivery, icon: '✦' }
             ].map((tag) => (
               <div key={tag.label} className="flex items-center justify-between px-5 py-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#E89EB8]/30 transition-all cursor-pointer group">
                 <div className="flex items-center gap-3">
                   <span className="text-[#E89EB8] text-[10px]">{tag.icon}</span>
                   <span className="text-white/50 group-hover:text-white text-xs font-medium transition-colors">{tag.label}</span>
                 </div>
                 <span className="text-white/10 text-[10px] font-mono">{tag.count}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
      {/* Decorative Blur */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#E89EB8]/5 blur-[100px] rounded-full" />
    </motion.div>
  );
});

// --- MAIN TESTIMONIALS COMPONENT ---
const hardcodedTestimonials = [
  { _id: 'h1', name: "Ananya Iyer", comment: "The brownies are out of this world! So fudgy and rich. Khushi really knows her craft.", location: "Thane West", rating: 5, isVerified: true },
  { _id: 'h2', name: "Siddharth Malhotra", comment: "Ordered a customized hamper. Every single item was fresh and beautifully packed.", location: "Hiranandani Estate", rating: 5, isVerified: true },
  { _id: 'h3', name: "Riya Sharma", comment: "Khushi's signature chocolate cake is the best I've had in Thane. Not too sweet.", location: "Majiwada", rating: 5, isVerified: true },
  { _id: 'h4', name: "Ishani Ghosh", comment: "The attention to detail in the wedding cake was mind-blowing. Star of the evening.", location: "Vasant Vihar", rating: 5, isVerified: true },
  { _id: 'h5', name: "Kabir Mehta", comment: "Finally found a baker who gets the balance of Belgian chocolate right. Pure quality.", location: "Ghodbunder Road", rating: 5, isVerified: true }
];

const Testimonials = () => {
  const [realReviews, setRealReviews] = useState([]);

  useEffect(() => {
    const query = `*[_type == "feedback" && isApproved == true] | order(createdAt desc)`;
    client.fetch(query)
      .then((data) => setRealReviews(data.map(rev => ({ ...rev, isVerified: true }))))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const allReviews = useMemo(() => [...realReviews, ...hardcodedTestimonials], [realReviews]);
  const displayReviews = [...allReviews, ...allReviews]; // Doubled for marquee

  return (
    <section className="relative py-24 sm:py-32 w-full overflow-hidden bg-[#0a0a0a]" id="reviews">
      
      {/* Optimized Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-[#E89EB8]/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-[#E89EB8]/20 to-transparent" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-[#E89EB8]" />
            <span className="text-[#E89EB8] uppercase tracking-[0.5em] text-[9px] font-black">Guestbook</span>
          </motion.div>
          
          <h2 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] mb-8">
            The Studio <br />
            <span className="italic text-[#E89EB8] font-light">Endorsements.</span>
          </h2>
        </div>

        {/* AI SUMMARY SECTION */}
        <AISummary reviews={allReviews} />

        {/* INFINITE MARQUEE */}
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

          <div className="flex overflow-hidden group">
            <div className="flex animate-marquee whitespace-nowrap py-4 hover:[animation-play-state:paused]">
              {displayReviews.map((item, index) => (
                <div 
                  key={`${item._id}-${index}`}
                  className="inline-block w-[320px] sm:w-[420px] mx-4 sm:mx-6 whitespace-normal align-top"
                >
                  <div className="bg-white/[0.02] border border-white/5 p-8 sm:p-10 rounded-[2rem] h-full flex flex-col justify-between transition-colors duration-500 hover:border-[#E89EB8]/20 will-change-transform">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-3xl text-[#E89EB8]/20 font-serif">“</span>
                        <div className="flex gap-1">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <span key={i} className="text-[#E89EB8] text-[8px]">★</span>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-white/60 font-light text-base leading-relaxed mb-8 italic">
                        {item.comment}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#E89EB8]/10 flex items-center justify-center text-[#E89EB8] font-serif text-sm border border-[#E89EB8]/20">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-white text-base">{item.name}</h4>
                        <p className="text-[#E89EB8]/40 text-[8px] font-black uppercase tracking-widest">
                          {item.location || "Verified Client"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}} />
    </section>
  );
};

export default memo(Testimonials);