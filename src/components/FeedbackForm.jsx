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
    <section className="relative py-24 sm:py-40 w-full overflow-hidden bg-[#FFF5F7]" id="feedback">
      
      {/* --- FUN PINK MODERN BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Pink Mesh Gradients */}
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#E89EB8]/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#E89EB8]/15 blur-[100px] rounded-full" />
        
        {/* Floating "Fun" Elements (Optimized - No lag) */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] text-6xl opacity-20 filter grayscale group-hover:grayscale-0 transition-all"
        >
          🍰
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-[10%] text-6xl opacity-20"
        >
          ✨
        </motion.div>

        {/* Big Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-serif font-black text-[#E89EB8]/5 select-none tracking-tighter">
          HELLO
        </div>
      </div>

      {/* WIDER CONTAINER (1600px) */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* --- LEFT SIDE: THE VIBE --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-4">
              <span className="h-[2px] w-12 bg-[#E89EB8]" />
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[#E89EB8] font-black text-[12px] uppercase tracking-[0.5em]"
              >
                Guestbook
              </motion.span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 leading-[0.9] tracking-tighter">
              Leave a <br />
              <span className="italic text-[#E89EB8]">Sweet Note</span>.
            </h2>
            
            <p className="text-slate-600 text-xl leading-relaxed max-w-lg font-sans">
              Every review helps Khushi grow the <strong className="text-slate-900">Delight Bakehouse</strong> family. Share your experience and help us spread the sweetness in Thane!
            </p>
            
            <div className="flex flex-wrap gap-4 pt-6">
               <div className="px-6 py-3 bg-white rounded-full shadow-sm border border-[#E89EB8]/10 text-slate-500 text-sm font-bold">
                 #BakersTreatFamily
               </div>
               <div className="px-6 py-3 bg-white rounded-full shadow-sm border border-[#E89EB8]/10 text-slate-500 text-sm font-bold">
                 #ThaneBakes
               </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: MODERN FLOATING FORM --- */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-xl p-8 md:p-16 rounded-[4rem] border border-white shadow-[0_40px_100px_rgba(232,158,184,0.15)] will-change-transform"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* NAME FIELD */}
                <div className="group space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 group-focus-within:text-[#E89EB8] transition-colors">
                    What's your name?
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Ananya Iyer"
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-3xl px-8 py-5 outline-none focus:bg-white focus:border-[#E89EB8] focus:ring-[10px] focus:ring-[#E89EB8]/5 transition-all text-slate-800 placeholder:text-slate-300 text-lg" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>

                {/* STAR RATING - MODERN SIZE */}
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                    How was the treat?
                  </label>
                  <div className="flex gap-3 bg-slate-50/50 w-fit p-3 rounded-3xl border border-slate-100">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className={`transition-all duration-300 transform ${ (hoverRating || formData.rating) >= star ? 'text-[#E89EB8] scale-125' : 'text-slate-200 scale-100 hover:scale-110' }`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* COMMENT FIELD */}
                <div className="group space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 group-focus-within:text-[#E89EB8] transition-colors">
                    Your message
                  </label>
                  <textarea 
                    placeholder="Share your experience with Khushi..."
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-[2rem] px-8 py-6 min-h-[160px] outline-none focus:bg-white focus:border-[#E89EB8] focus:ring-[10px] focus:ring-[#E89EB8]/5 transition-all text-slate-800 resize-none placeholder:text-slate-300 text-lg" 
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    required
                  />
                </div>

                {/* STATUS ALERTS */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 text-green-600 p-4 rounded-2xl text-center text-sm font-bold border border-green-100">
                      Successfully sent to Khushi's Kitchen! ✨
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50 text-red-500 p-4 rounded-2xl text-center text-sm font-bold border border-red-100">
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* SUBMIT BUTTON - FUNKY STYLING */}
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`relative w-full overflow-hidden group/btn py-6 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[12px] transition-all ${
                    status === 'loading' ? 'bg-slate-200 text-slate-400' : 'bg-[#E89EB8] text-white hover:bg-slate-900 shadow-[0_20px_40px_rgba(232,158,184,0.3)] active:scale-[0.98]'
                  }`}
                >
                  <span className="relative z-10">
                    {status === 'loading' ? 'Whisking...' : 'Send Review'}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
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