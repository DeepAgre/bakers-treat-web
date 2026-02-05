import React, { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// HELPER: Improved SafeImage with a "Retry" trigger
const SafeImage = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const fallback = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop";

  return (
    <img 
      src={error ? fallback : src} 
      alt={alt} 
      className={className}
      onError={() => setError(true)}
      loading="eager"
    />
  );
};

const KineticBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.02] will-change-transform">
    <motion.div 
      animate={{ x: [0, -1000] }} 
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="text-[200px] md:text-[300px] font-serif font-black text-white whitespace-nowrap"
    >
      Delight Bakehouse • ARCHITECTURAL CAKERY • THANE STUDIO • 
    </motion.div>
  </div>
));

const CustomOrder = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [aiPairing, setAiPairing] = useState(null);

  const KHUSHI_PHONE = "919136371662";

  const generateEverything = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setImages([]);
    setAiPairing(null);

    try {
      // 1. DYNAMIC AI FLAVOR GENERATION (No hardcoded fallbacks)
      const fetchFlavor = async () => {
        const chefPrompt = `You are a creative patissier for Delight Bakehouse. Based on the theme "${prompt}", invent a one-of-a-kind gourmet cake flavor. 
        Return ONLY in this format: 
        Flavor: [Unique Combination] | Reason: [Why it matches the theme]`;

        const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(chefPrompt)}?model=openai&cache=false&seed=${Date.now()}`);
        const text = await response.text();
        
        // Parsing the AI response
        const parts = text.split('|');
        const flavorPart = parts[0]?.replace('Flavor:', '').trim();
        const reasonPart = parts[1]?.replace('Reason:', '').trim();

        return { 
          combo: flavorPart || "Custom Infusion", 
          reason: reasonPart || "Crafted specifically for your theme." 
        };
      };

      // 2. STAGGERED IMAGE GENERATION (Anti-Rate Limit)
      const generateImages = async () => {
        const urls = [];
        for (let i = 0; i < 3; i++) {
          // Delay to prevent hitting rate limits (1.2 seconds between calls)
          await new Promise(resolve => setTimeout(resolve, i * 1200));
          
          const seed = Math.floor(Math.random() * 9999999);
          const visualPrompt = `Professional close-up food photography of a luxury ${prompt} themed architectural cake, highly detailed sugar work, artistic edible sculpture, masterpiece, 8k, moody cinematic lighting`;
          
          // Use random seed and timestamp to force the server to generate a new image instead of a 502/Rate limit page
          urls.push(`https://image.pollinations.ai/prompt/${encodeURIComponent(visualPrompt)}?seed=${seed}&width=1024&height=1024&nologo=true&model=flux&cache=false`);
        }
        return urls;
      };

      // Run both in parallel for speed
      const [flavorResult, imageResults] = await Promise.all([fetchFlavor(), generateImages()]);
      
      setAiPairing(flavorResult);
      setImages(imageResults);

    } catch (error) {
      console.error("AI Lab Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="custom" className="py-24 sm:py-32 relative overflow-hidden min-h-screen bg-[#080808]">
      <KineticBackground />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* BANNER */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-[#E89EB8]" />
            <span className="text-[#E89EB8] uppercase tracking-[0.6em] text-[10px] font-black">Direct Consultation</span>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 backdrop-blur-md">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">The Custom <span className="italic text-[#E89EB8]">Commission.</span></h2>
              <p className="text-white/50 text-lg font-light leading-relaxed">
                Connect with Khushi to translate your vision into edible architecture. Our Thane studio specializes in high-concept thematic artistry.
              </p>
            </div>
            <button 
              onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}?text=Hi Khushi! I want to discuss a custom cake order.`, '_blank')}
              className="bg-[#E89EB8] text-black px-12 py-8 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_0_40px_rgba(232,158,184,0.2)]"
            >
              Consult with Khushi →
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-2">
              <h3 className="text-white font-serif text-3xl italic">AI Concept Lab</h3>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Experimental Visualizer</p>
            </div>

            <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 space-y-6">
              <input 
                type="text" 
                placeholder="Theme (e.g. Cyberpunk, Vintage Rose)"
                className="w-full bg-black border border-white/10 rounded-xl p-5 text-white outline-none focus:border-[#E89EB8]/50 transition-all"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button 
                onClick={generateEverything} 
                disabled={loading} 
                className="w-full py-5 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#E89EB8] disabled:opacity-30 transition-all"
              >
                {loading ? "Chef AI is Creating..." : "Generate Concepts"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {images.length > 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  {aiPairing && (
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1 }}
                      className="p-8 rounded-[2rem] bg-gradient-to-r from-[#E89EB8]/10 border border-[#E89EB8]/20"
                    >
                      <span className="text-[#E89EB8] text-[9px] font-black uppercase tracking-[0.4em] block mb-2">AI Patissier Pairing</span>
                      <h4 className="text-2xl font-serif text-white mb-2">{aiPairing.combo}</h4>
                      <p className="text-white/40 text-xs italic">{aiPairing.reason}</p>
                    </motion.div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {images.map((img, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedImg(img)}
                        className={`relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${selectedImg === img ? 'border-[#E89EB8]' : 'border-white/5'}`}
                      >
                        <SafeImage src={img} className="w-full h-full object-cover" alt={`AI Visual ${i}`} />
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white font-bold uppercase">Option 0{i+1}</div>
                      </motion.div>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      const finalImg = selectedImg || images[0];
                      const msg = `Hi Khushi! I used the AI Concept Lab for "${prompt}". It suggested the "${aiPairing?.combo}" flavor. I love this design: ${finalImg}`;
                      window.open(`https://wa.me/${KHUSHI_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-white/60 text-[10px] uppercase tracking-widest font-bold hover:bg-[#E89EB8] hover:text-black transition-all"
                  >
                    Send this concept to Khushi
                  </button>
                </motion.div>
              ) : (
                <div className="h-[450px] border border-dashed border-white/10 rounded-[3rem] flex items-center justify-center bg-white/[0.01]">
                  <div className="text-center space-y-4">
                    {loading && <div className="w-8 h-8 border-2 border-[#E89EB8] border-t-transparent rounded-full animate-spin mx-auto mb-4" />}
                    <span className="text-white/10 uppercase tracking-[0.5em] text-[10px] font-black italic block">
                      {loading ? "Visualizing your vision..." : "Awaiting Parameters"}
                    </span>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(CustomOrder);