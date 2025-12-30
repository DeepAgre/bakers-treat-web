import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../lib/sanity';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: '', rating: 0, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      setErrorMessage("Please pick a star rating to share the love!");
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const doc = {
        _type: 'feedback',
        name: formData.name,
        rating: Number(formData.rating),
        comment: formData.comment,
        isApproved: false, 
        createdAt: new Date().toISOString(),
      };

      await client.create(doc);
      
      setStatus('success');
      setFormData({ name: '', rating: 0, comment: '' });
      
      // Reset status after 5 seconds to allow new feedback
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error("Sanity Submission Error:", err);
      setStatus('error');
      setErrorMessage("The kitchen connection is busy! Please try again.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 bg-[#FAF9F6] overflow-hidden font-sans">
      
      {/* --- CATCHY BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#E89EB8]/10 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 50, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#F3C5C1]/20 blur-[100px]" 
        />
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>

      <div className="max-w-5xl w-full grid md:grid-cols-12 gap-0 relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-[4rem] overflow-hidden border border-white/50">
        
        {/* --- LEFT PANEL: BRAND POWER (Hidden on small screens) --- */}
        <div className="hidden md:flex md:col-span-5 bg-black p-16 flex-col justify-between text-white relative">
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#E89EB8] font-black text-[10px] uppercase tracking-[0.6em] mb-8 block"
            >
              Delight Bakehouse • Thane
            </motion.div>
            <h2 className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Your sweet words fuel our oven.
            </h2>
            <p className="text-gray-400 font-light text-lg leading-relaxed max-w-xs">
              Help Khushi craft the perfect treats by sharing your experience.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-2">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-[#E89EB8]/20 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-[10px]">✨</span>
                    </div>
                  ))}
               </div>
               <span className="text-xs font-bold uppercase tracking-widest text-[#E89EB8]">Trusted by Foodies</span>
            </div>
          </div>

          {/* Decorative Circle */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 border border-white/10 rounded-full pointer-events-none" />
        </div>

        {/* --- RIGHT PANEL: INTERACTIVE FORM --- */}
        <div className="col-span-12 md:col-span-7 bg-white/80 backdrop-blur-2xl p-8 md:p-16">
          
          <div className="mb-12">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Leave a Review</h3>
            <div className="h-1.5 w-12 bg-[#E89EB8] rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* NAME FIELD */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
              <input 
                type="text"
                placeholder="How should we call you?"
                className="w-full bg-white border border-black/5 rounded-2xl px-6 py-5 outline-none focus:ring-4 focus:ring-[#E89EB8]/10 focus:border-[#E89EB8]/30 transition-all text-gray-800 shadow-sm" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>

            {/* RATING FIELD */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Overall Satisfaction</label>
              <div className="flex items-center gap-3 bg-[#FAF9F6] w-fit p-4 rounded-[2rem] border border-black/[0.03] shadow-inner">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`relative transition-colors ${ (hoverRating || formData.rating) >= star ? 'text-[#E89EB8]' : 'text-gray-200' }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {(hoverRating || formData.rating) >= star && (
                      <motion.div layoutId="starGlow" className="absolute inset-0 bg-[#E89EB8]/20 blur-xl rounded-full" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* COMMENT FIELD */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Your Message</label>
              <textarea 
                placeholder="What did you think of our treats?"
                className="w-full bg-white border border-black/5 rounded-[2.5rem] px-8 py-7 min-h-[160px] outline-none focus:ring-4 focus:ring-[#E89EB8]/10 focus:border-[#E89EB8]/30 transition-all text-gray-800 resize-none shadow-sm" 
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                required
              />
            </div>

            {/* FEEDBACK STATUS */}
            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="bg-[#E89EB8]/10 p-4 rounded-2xl text-center border border-[#E89EB8]/20"
                >
                  <p className="text-[#E89EB8] font-bold">Sent to Khushi! ✨</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#E89EB8]/60 mt-1">Pending Approval</p>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   className="bg-red-50 p-4 rounded-2xl text-center border border-red-100"
                >
                   <p className="text-red-500 text-xs font-bold">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SUBMIT BUTTON */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-300 shadow-2xl ${
                status === 'loading' 
                ? 'bg-gray-100 text-gray-400 cursor-wait' 
                : 'bg-black text-white hover:bg-[#E89EB8] hover:shadow-[#E89EB8]/20'
              }`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Whisking it away...' : 'Post My Review'}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;