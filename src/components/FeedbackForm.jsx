import React, { useState, memo } from 'react';
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
      setStatus('error');
      setErrorMessage("Studio connection busy. Please try again.");
    }
  };

  return (
    <section className="relative py-20 sm:py-32 w-full overflow-hidden bg-[#0a0a0a]" id="feedback">
      
      {/* --- OPTIMIZED BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Simplified glows without heavy blur filters */}
        <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-[#E89EB8]/5 rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[20%] h-[20%] bg-[#E89EB8]/3 rounded-full" />
        
        {/* SVG Noise texture for hardware-accelerated detail */}
        <div className="absolute inset-0 opacity-[0.03] contrast-150" 
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* --- LEFT SIDE: EDITORIAL --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-4">
              <div className="h-[1px] w-12 bg-[#E89EB8]" />
              <span className="text-[#E89EB8] font-black text-[9px] uppercase tracking-[0.5em]">
                Document your Experience.
              </span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9]">
              Give us your <br />
              <span className="italic text-[#E89EB8] font-light">Feedback.</span>
            </h2>
            
            <div className="space-y-6 max-w-lg">
              <p className="text-white/40 text-lg leading-relaxed font-light">
                Every endorsement helps refine our craft. Share your thoughts on your latest <strong className="text-white font-medium">Bakers Treat</strong> creation from our Thane studio.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                 {['#BakersTreatThane', '#ArtisanCakes'].map(tag => (
                   <div key={tag} className="px-4 py-1.5 rounded-full border border-white/5 text-white/20 text-[8px] uppercase tracking-widest font-black">
                     {tag}
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: BOUTIQUE FORM --- */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#111] p-8 md:p-14 rounded-[2rem] border border-white/5 shadow-2xl will-change-transform"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* NAME FIELD */}
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 ml-1">
                    The Benefactor (Name)
                  </label>
                  <input 
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-[#E89EB8]/30 transition-all text-white placeholder:text-white/10 text-base font-light" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>

                {/* STAR RATING */}
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 ml-1">
                    Studio Rating
                  </label>
                  <div className="flex gap-3 bg-white/[0.02] w-fit p-3 rounded-xl border border-white/5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className={`transition-all duration-300 transform ${ (hoverRating || formData.rating) >= star ? 'text-[#E89EB8] scale-110' : 'text-white/5' }`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* COMMENT FIELD */}
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 ml-1">
                    The Testimony (Review)
                  </label>
                  <textarea 
                    placeholder="Describe your tasting experience..."
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 min-h-[140px] outline-none focus:border-[#E89EB8]/30 transition-all text-white resize-none placeholder:text-white/10 text-base font-light leading-relaxed" 
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    required
                  />
                </div>

                {/* STATUS ALERTS */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#E89EB8]/5 text-[#E89EB8] p-4 rounded-lg text-center text-[9px] font-black uppercase tracking-widest border border-[#E89EB8]/10">
                      Signature received. Thank you. ✨
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/5 text-red-400 p-4 rounded-lg text-center text-[9px] font-black uppercase tracking-widest border border-red-500/10">
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SUBMIT BUTTON */}
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`relative w-full py-5 rounded-xl font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-300 ${
                    status === 'loading' ? 'bg-white/5 text-white/10' : 'bg-[#E89EB8] text-black hover:bg-white active:scale-[0.98]'
                  }`}
                >
                  {status === 'loading' ? 'Submitting...' : 'Send Testimony'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(FeedbackForm);