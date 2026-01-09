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
      setStatus('error');
      setErrorMessage("Studio connection busy. Please try again.");
    }
  };

  return (
    <section className="relative py-24 sm:py-40 w-full overflow-hidden bg-[#0a0a0a]" id="feedback">
      
      {/* --- PREMIUM DARK BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#E89EB8]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-[#E89EB8]/5 blur-[120px] rounded-full" />
        
        {/* Large Decorative Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-black text-white/[0.02] select-none tracking-tighter uppercase">
          Guestbook
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT SIDE: THE EDITORIAL --- */}
          <div className="lg:col-span-5 space-y-10">
            <div className="inline-flex items-center gap-4">
              <div className="h-[1px] w-12 bg-[#E89EB8]" />
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[#E89EB8] font-black text-[10px] uppercase tracking-[0.6em]"
              >
                Document your Experience.
              </motion.span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.85]">
              Give us your <br />
              <span className="italic text-[#E89EB8] font-light">Feedback.</span>
            </h2>
            
            <div className="space-y-6 max-w-lg">
              <p className="text-white/40 text-xl leading-relaxed font-light">
                Every endorsement helps refine our craft. Share your thoughts on your latest <strong className="text-white font-medium">Delight Bakehouse</strong> creation from our Thane studio.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                 <div className="px-5 py-2 rounded-full border border-white/10 text-white/30 text-[9px] uppercase tracking-widest font-black">
                   #BakersTreatThane
                 </div>
                 <div className="px-5 py-2 rounded-full border border-white/10 text-white/30 text-[9px] uppercase tracking-widest font-black">
                   #ArtisanCakes
                 </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: BOUTIQUE FORM --- */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] backdrop-blur-3xl p-8 md:p-16 rounded-[2.5rem] border border-white/5 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* NAME FIELD */}
                <div className="group space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 ml-1 group-focus-within:text-[#E89EB8] transition-colors">
                    The Benefactor (Name)
                  </label>
                  <input 
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 outline-none focus:border-[#E89EB8]/50 focus:ring-1 focus:ring-[#E89EB8]/20 transition-all text-white placeholder:text-white/10 text-lg font-light" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>

                {/* STAR RATING */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 ml-1">
                    Studio Rating
                  </label>
                  <div className="flex gap-4 bg-white/[0.03] w-fit p-4 rounded-2xl border border-white/5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className={`transition-all duration-500 transform ${ (hoverRating || formData.rating) >= star ? 'text-[#E89EB8] scale-110 drop-shadow-[0_0_10px_rgba(232,158,184,0.4)]' : 'text-white/10 scale-100 hover:text-white/30' }`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* COMMENT FIELD */}
                <div className="group space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 ml-1 group-focus-within:text-[#E89EB8] transition-colors">
                    The Testimony (Review)
                  </label>
                  <textarea 
                    placeholder="Describe your tasting experience..."
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-6 min-h-[160px] outline-none focus:border-[#E89EB8]/50 focus:ring-1 focus:ring-[#E89EB8]/20 transition-all text-white resize-none placeholder:text-white/10 text-lg font-light leading-relaxed" 
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    required
                  />
                </div>

                {/* STATUS ALERTS */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#E89EB8]/10 text-[#E89EB8] p-5 rounded-xl text-center text-[10px] font-black uppercase tracking-widest border border-[#E89EB8]/20">
                      Signature received. Thank you. ✨
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-950/20 text-red-400 p-5 rounded-xl text-center text-[10px] font-black uppercase tracking-widest border border-red-500/20">
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SUBMIT BUTTON */}
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`relative w-full py-6 rounded-2xl font-black uppercase tracking-[0.6em] text-[11px] transition-all duration-500 ${
                    status === 'loading' ? 'bg-white/5 text-white/20' : 'bg-[#E89EB8] text-black hover:bg-white hover:tracking-[0.8em] shadow-2xl shadow-[#E89EB8]/10 active:scale-[0.98]'
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

export default FeedbackForm;