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
    <section className="relative py-20 px-6 bg-white dark:bg-[#0F0F0F] transition-colors duration-500 overflow-hidden" id="feedback">
      
      {/* --- SIMPLE ELEGANT BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,#FFF5F7_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_top,#E89EB80a_0%,transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* --- LEFT SIDE: TEXT CONTENT --- */}
          <div className="lg:col-span-5 space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#E89EB8] font-black text-[11px] uppercase tracking-[0.4em] block"
            >
              Guestbook
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900  leading-tight">
              Your sweet words <br /> fuel our oven.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md">
              Help Khushi craft the perfect treats. Your feedback helps us grow the Bakers Treat family in Thane.
            </p>
            
            <div className="pt-4 flex items-center gap-2 text-[#E89EB8] font-bold text-[10px] uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-[#E89EB8]"></span>
              <span>Handmade with Love</span>
            </div>
          </div>

          {/* --- RIGHT SIDE: CLEAN FORM --- */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gray-50 dark:bg-[#151515] p-8 md:p-12 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* NAME FIELD */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">Full Name</label>
                  <input 
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-[#E89EB8] transition-all text-gray-800 " 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>

                {/* STAR RATING */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className={`transition-all duration-300 ${ (hoverRating || formData.rating) >= star ? 'text-[#E89EB8] scale-110' : 'text-gray-200 dark:text-gray-800' }`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* COMMENT FIELD */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">Message</label>
                  <textarea 
                    placeholder="Share your experience..."
                    className="w-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/5 rounded-2xl px-6 py-5 min-h-[120px] outline-none focus:border-[#E89EB8] transition-all text-gray-800  resize-none" 
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    required
                  />
                </div>

                {/* ERROR/SUCCESS MESSAGES */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#E89EB8] font-bold text-xs text-center">
                      Review sent to Khushi! ✨
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-bold text-xs text-center">
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* SUBMIT BUTTON */}
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl shadow-[#E89EB8]/10 ${
                    status === 'loading' ? 'bg-gray-200 text-gray-400' : 'bg-[#E89EB8] text-white hover:bg-black active:scale-95'
                  }`}
                >
                  {status === 'loading' ? 'Sending...' : 'Submit Review'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;