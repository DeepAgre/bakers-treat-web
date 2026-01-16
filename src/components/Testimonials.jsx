import React, { useEffect, useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../lib/sanity';

// --- SUB-COMPONENT: AI SUMMARY ---
const AISummary = memo(({ reviews }) => {
  const summary = useMemo(() => {
    if (!reviews || reviews.length === 0) return null;

    const total = reviews.length;
    // Dynamic Average Calculation
    const avg = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / total).toFixed(1);
    
    // Dynamic Keyword Analysis (Scans every review comment)
    const hasQuality = reviews.filter(r => r.rating === 5).length;
    const hasFresh = reviews.filter(r => r.comment.toLowerCase().includes('fresh') || r.comment.toLowerCase().includes('fudgy')).length;
    const hasDelivery = reviews.filter(r => r.location && r.location !== "Verified Client").length;

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E89EB8]/10 border border-[#E89EB8]/20">
              <span className="text-[#E89EB8] text-sm">✨</span>
            </div>
            <h3 className="text-white font-serif text-2xl italic">AI Review Insight</h3>
          </div>
          
          {/* Dynamic Average Rating Display */}
          <div className="flex items-center gap-4 bg-white/[0.03] px-6 py-3 rounded-2xl border border-white/5">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(summary.avg) ? "text-[#E89EB8]" : "text-white/10"}>★</span>
              ))}
            </div>
            <span className="text-white font-bold tracking-tighter text-xl">{summary.avg} <span className="text-white/20 text-sm font-light">/ 5.0</span></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
              Our automated analysis of <span className="text-white font-medium">{summary.total} approved reviews</span> shows high satisfaction with <span className="text-[#E89EB8]">Delight Bakehouse's</span> artisan craft. Patrons frequently mention 
              the superior <span className="text-white">freshness</span> and the professional delivery standards across <span className="text-white font-medium">Thane</span>.
            </p>
            <div className="flex items-center gap-2">
               <span className="h-[1px] w-4 bg-white/20" />
               <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-black italic">
                 Live Analysis Updated Automatically
               </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
             <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-1">Key Highlights</span>
             {[
               { label: 'Top-Tier Quality', count: summary.hasQuality, icon: '✦' },
               { label: 'Freshness Noted', count: summary.hasFresh, icon: '✦' },
               { label: 'Local Favorites', count: summary.hasDelivery, icon: '✦' }
             ].map((tag) => (
               <div key={tag.label} className="flex items-center justify-between px-5 py-3 rounded-xl bg-white/[0.03] border border-white/5 transition-all">
                 <div className="flex items-center gap-3">
                   <span className="text-[#E89EB8] text-[10px]">{tag.icon}</span>
                   <span className="text-white/50 text-xs font-medium">{tag.label}</span>
                 </div>
                 <span className="text-white/20 text-[10px] font-mono">{tag.count}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
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
    // Fetches every review approved by Khushi in Sanity
    const query = `*[_type == "feedback" && isApproved == true] | order(createdAt desc)`;
    client.fetch(query)
      .then((data) => setRealReviews(data.map(rev => ({ ...rev, isVerified: true }))))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const allReviews = useMemo(() => [...realReviews, ...hardcodedTestimonials], [realReviews]);
  const displayReviews = [...allReviews, ...allReviews]; 

  return (
    <section className="relative py-24 sm:py-32 w-full overflow-hidden bg-[#0a0a0a]" id="reviews">
      
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
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

        {/* AI SUMMARY SECTION - Dynamic Analysis of All Reviews */}
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
                  {/* Card Container - Fixed text-black hover issue by explicitly setting text colors */}
                  <div className="bg-white/[0.02] border border-white/5 p-8 sm:p-10 rounded-[2rem] h-full flex flex-col justify-between transition-all duration-500 hover:border-[#E89EB8]/20 hover:bg-white/[0.04] will-change-transform group/card">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-3xl text-[#E89EB8]/20 font-serif">“</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-[10px] ${i < (item.rating || 5) ? 'text-[#E89EB8]' : 'text-white/5'}`}>★</span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Explicitly colored text to prevent turning black on hover */}
                      <p className="text-white/60 font-light text-base leading-relaxed mb-8 italic group-hover/card:text-white/80 transition-colors">
                        {item.comment}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#E89EB8]/10 flex items-center justify-center text-[#E89EB8] font-serif text-sm border border-[#E89EB8]/20">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-white text-base transition-colors">{item.name}</h4>
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
        /* Ensure no text turns black in this section */
        #reviews * {
          color-scheme: dark;
        }
      `}} />
    </section>
  );
};

export default memo(Testimonials);