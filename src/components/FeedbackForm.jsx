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
      setErrorMessage("Please select a star rating.");
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
      console.error("Sanity Submission Error:", err);
      setStatus('error');
      setErrorMessage("Could not send feedback. Please check your connection.");
    }
  };

  return (
    <div className="relative min-h-screen py-20 px-4 overflow-hidden bg-[#FAF9F6]">
      {/* --- UNIQUE BACKGROUND DECORATION --- */}
      {/* Soft Pink Glow Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#E89EB8]/15 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#F3C5C1]/20 blur-[80px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* --- THE MAIN FORM CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-xl rounded-[3.5rem] p-8 md:p-14 shadow-[0_32px_64px_-16px_rgba(232,158,184,0.15)] border border-white/80 relative"
        >
          {/* Header Decoration */}
          <header className="text-center mb-12">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#E89EB8] font-black text-[10px] uppercase tracking-[0.4em] mb-3 block"
            >
              Baked with Love in Thane
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Share Your Experience</h2>
            <div className="flex justify-center items-center gap-4">
               <div className="h-[1px] w-8 bg-black/10"></div>
               <p className="text-gray-400 text-xs font-medium italic">Bakers Treat</p>
               <div className="h-[1px] w-8 bg-black/10"></div>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Name Input */}
            <div className="relative group">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Your Name</label>
              <input 
                type="text"
                placeholder="How shall we call you?"
                className="w-full bg-white/50 border border-black/5 rounded-2xl px-7 py-5 outline-none focus:ring-2 focus:ring-[#E89EB8]/30 focus:bg-white transition-all shadow-sm" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>

            {/* Star Rating */}
            <div className="text-center bg-[#F9F8F6]/50 py-8 rounded-[2.5rem] border border-black/[0.02]">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Rate the Taste</label>
              <div className="flex justify-center gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`transform transition-all duration-300 ${ (hoverRating || formData.rating) >= star ? 'text-[#E89EB8] scale-125' : 'text-gray-200 hover:text-gray-300 scale-100' }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Textarea */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Your Feedback</label>
              <textarea 
                placeholder="Tell Khushi about your favorite treats..."
                className="w-full bg-white/50 border border-black/5 rounded-[2.5rem] px-8 py-7 min-h-[180px] resize-none outline-none focus:ring-2 focus:ring-[#E89EB8]/30 focus:bg-white transition-all shadow-sm" 
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                required
              />
            </div>

            {/* Messages */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50 p-5 rounded-2xl text-center">
                   <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
                </motion.div>
              )}
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center p-4">
                  <p className="text-[#E89EB8] font-bold text-lg">Thank you! Sent to Khushi ✨</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Pending her approval</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all shadow-xl ${status === 'loading' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800 shadow-[#E89EB8]/10'}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending to Kitchen...' : 'Post My Review'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackForm;