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
      setErrorMessage("Please pick a star rating!");
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
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage("Kitchen connection busy! Try again.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-10 md:py-20 px-4 bg-[#FAF9F6] overflow-hidden font-sans">
      
      {/* --- PERFORMANCE OPTIMIZED BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated blobs only show on Desktop (md+) to prevent mobile lag */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="hidden md:block absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#E89EB8]/10 blur-[100px]" 
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-0 relative z-10 shadow-2xl rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-white">
        
        {/* --- LEFT PANEL: HIDDEN ON MOBILE FOR BETTER FLOW --- */}
        <div className="hidden md:flex md:col-span-5 bg-black p-16 flex-col justify-between text-white relative">
          <div className="relative z-10">
            <span className="text-[#E89EB8] font-black text-[10px] uppercase tracking-[0.6em] mb-8 block">Delight Bakehouse</span>
            <h2 className="text-5xl font-serif font-bold leading-tight mb-6">Your sweet words fuel our oven.</h2>
            <p className="text-gray-400 font-light text-lg">Help Khushi craft the perfect treats.</p>
          </div>
          <div className="flex items-center gap-3 text-[#E89EB8] font-bold text-[10px] uppercase tracking-widest">
            <span>✨ Trusted by Foodies</span>
          </div>
        </div>

        {/* --- RIGHT PANEL: THE FORM --- */}
        <div className="col-span-1 md:col-span-7 p-8 md:p-16 bg-white">
          
          <div className="mb-8 md:mb-12">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Leave a Review</h3>
            <div className="h-1 w-10 bg-[#E89EB8] rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* NAME FIELD */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
              <input 
                type="text"
                placeholder="How should we call you?"
                className="w-full bg-[#F9F8F6] border border-transparent rounded-2xl px-6 py-4 md:py-5 outline-none focus:border-[#E89EB8]/30 transition-all text-gray-800" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>

            {/* STAR RATING */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 text-center block md:text-left">Overall Satisfaction</label>
              <div className="flex items-center justify-center md:justify-start gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`transition-all ${ (hoverRating || formData.rating) >= star ? 'text-[#E89EB8] scale-110' : 'text-gray-200' }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <svg className="w-8 h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* COMMENT FIELD */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Your Message</label>
              <textarea 
                placeholder="What did you think of our treats?"
                className="w-full bg-[#F9F8F6] border border-transparent rounded-[2rem] px-6 py-5 md:py-7 min-h-[140px] md:min-h-[160px] outline-none focus:border-[#E89EB8]/30 transition-all text-gray-800 resize-none shadow-sm" 
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                required
              />
            </div>

            {/* STATUS MESSAGES */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-3 bg-green-50 rounded-xl">
                  <p className="text-[#E89EB8] font-bold text-sm">Review sent to Khushi! ✨</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" 
              className={`w-full py-5 md:py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all ${
                status === 'loading' ? 'bg-gray-100 text-gray-400' : 'bg-black text-white active:scale-95'
              }`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Post My Review'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;