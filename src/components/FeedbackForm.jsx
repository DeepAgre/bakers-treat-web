import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { moderateFeedback } from '../lib/aiModerator';
import { client } from '../lib/sanity';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: '', rating: 0, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.rating === 0) {
      setErrorMessage("Please select a star rating.");
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // 1. CALL AI MODERATOR
      const aiResult = await moderateFeedback(formData.comment);
      console.log("AI Decision:", aiResult);

      // 2. THE WALL: If REJECTED, we stop everything here.
      if (aiResult.status === "REJECTED") {
        setStatus('error');
        setErrorMessage(`Rejected by AI: ${aiResult.reason || "Content policy violation"}`);
        // We do NOT clear the form so the user can see what they did wrong
        return; 
      }

      // 3. THE SAVE: This code ONLY runs if status is NOT "REJECTED"
      const doc = {
        _type: 'feedback',
        name: formData.name,
        rating: Number(formData.rating),
        comment: formData.comment,
        isApproved: aiResult.status === "APPROVED", // Auto-approve if AI is happy
        aiFlaggedReason: aiResult.reason,
        createdAt: new Date().toISOString(),
      };

      await client.create(doc);
      
      // 4. SUCCESS: Only clear form and show success if the save worked
      setStatus('success');
      setFormData({ name: '', rating: 0, comment: '' });
      setTimeout(() => setStatus('idle'), 5000);

    } catch (err) {
      console.error("Critical Error:", err);
      setStatus('error');
      setErrorMessage("System Error: Could not process feedback.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E89EB8]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="relative z-10">
          <header className="text-center mb-10">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Share Your Experience</h2>
            <p className="text-gray-500 uppercase tracking-widest text-xs font-black">Delight Bakehouse • Thane</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Your Name</label>
              <input 
                type="text"
                className="w-full bg-[#F9F8F6] border-none rounded-2xl px-6 py-4 text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-[#E89EB8] transition-all outline-none" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>

            <div className="text-center">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Rate your delight</label>
              <div className="flex justify-center items-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform active:scale-90 focus:outline-none"
                  >
                    <svg 
                      className={`w-10 h-10 transition-colors duration-300 ${
                        (hoverRating || formData.rating) >= star ? 'fill-[#E89EB8]' : 'fill-gray-200'
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Your Thoughts</label>
              <textarea 
                className="w-full bg-[#F9F8F6] border-none rounded-[2rem] px-6 py-5 text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-[#E89EB8] transition-all outline-none min-h-[150px] resize-none" 
                placeholder="Please drop your feedback here..."
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                required
              />
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border border-red-200 p-4 rounded-2xl"
                >
                   <p className="text-red-600 text-xs font-black uppercase tracking-widest text-center mb-1">Moderation Alert</p>
                   <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                </motion.div>
              )}
              {status === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#E89EB8] text-sm text-center font-medium"
                >
                  Thank you! Your feedback has been sent to Khushi. ✨
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 shadow-lg ${
                status === 'loading' 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-[#E89EB8]'
              }`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'AI is analyzing...' : 'Submit Feedback'}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;