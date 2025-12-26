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
      // Step 1: Create the document for Sanity
      // We set isApproved to FALSE so no spam shows up on the site automatically.
      const doc = {
        _type: 'feedback',
        name: formData.name,
        rating: Number(formData.rating),
        comment: formData.comment,
        isApproved: false, 
        createdAt: new Date().toISOString(),
      };

      // Step 2: Save directly to Sanity
      await client.create(doc);
      
      setStatus('success');
      setFormData({ name: '', rating: 0, comment: '' });
      
      // Reset back to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);

    } catch (err) {
      console.error("Sanity Submission Error:", err);
      setStatus('error');
      setErrorMessage("Could not send feedback. Please check your connection.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-black/5 relative overflow-hidden">
        <div className="relative z-10">
          <header className="text-center mb-10">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Share Your Experience</h2>
            <p className="text-gray-500 uppercase tracking-widest text-xs font-black">Bakers Treat • Thane</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Name</label>
              <input 
                type="text"
                className="w-full bg-[#F9F8F6] rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#E89EB8]" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>

            <div className="text-center">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Rating</label>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`w-10 h-10 transition-colors ${ (hoverRating || formData.rating) >= star ? 'text-[#E89EB8]' : 'text-gray-200' }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Feedback</label>
              <textarea 
                className="w-full bg-[#F9F8F6] rounded-[2rem] px-6 py-5 min-h-[150px] resize-none outline-none focus:ring-2 focus:ring-[#E89EB8]" 
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                required
              />
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 p-4 rounded-2xl text-center">
                   <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
                </motion.div>
              )}
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                  <p className="text-[#E89EB8] font-bold">Sent to Khushi! ✨</p>
                  <p className="text-[10px] text-gray-400 uppercase mt-1">Review pending approval</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${status === 'loading' ? 'bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;