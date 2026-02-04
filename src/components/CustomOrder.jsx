import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// HELPER: This component prevents blank screens if AI fails
const SafeImage = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  // Elegant fallback image from Unsplash if AI 502s
  const fallback = "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop";

  return (
    <img 
      src={error ? fallback : src} 
      alt={alt} 
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
};

const KineticBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.02] will-change-transform">
    <motion.div 
      animate={{ x: [0, -1000] }} 
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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

  const getFallbackFlavor = (input) => {
    const p = input.toLowerCase();
    if (p.includes('resident') || p.includes('evil')) {
        return { combo: "Zinfandel Soaked Velvet & Charcoal Ganache", reason: "A dark, atmospheric palette matching the survival horror aesthetic." };
    }
    if (p.includes('valorant') || p.includes('omen') || p.includes('game')) {
        return { combo: "Electric Blueberry & Neon Citrus Cream", reason: "Vibrant, high-energy flavors inspired by tactical ability effects." };
    }
    return { combo: "Madagascar Vanilla Bean & Belgian Dark Praline", reason: "A timeless, architectural pairing that works perfectly with any design." };
  };

  const generateEverything = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setImages([]);
    setAiPairing(null);

    try {
      // 1. GENERATE AI FLAVOR (With Error Catching)
      try {
        const textPrompt = `You are a world-class pastry chef. Suggest 1 gourmet cake flavor and 1 reason for theme "${prompt}". Format: Flavor: [Name] | Reason: [Reason]`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(textPrompt)}`, { signal: controller.signal });
        if (!res.ok) throw new Error();
        const text = await res.text();
        const [combo, reason] = text.replace('Flavor:', '').split('| Reason:');
        setAiPairing({ combo: combo?.trim(), reason: reason?.trim() });
        clearTimeout(timeoutId);
      } catch (e) {
        setAiPairing(getFallbackFlavor(prompt));
      }

      // 2. GENERATE 3 IMAGES (Staggered to prevent Rate Limit)
      const results = [];
      for (let i = 0; i < 3; i++) {
        await new Promise(r => setTimeout(r, 1200)); // 1.2s gap between requests
        const seed = Math.floor(Math.random() * 99999);
        // We force the AI to think about "Cake Design" specifically
        const enhancedPrompt = `${prompt} theme luxury gourmet cake design, cinematic food photography, highly detailed, 8k, sharp focus`;
        results.push(`https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?seed=${seed}&width=1024&height=1024&nologo=true&t=${Date.now()}`);
      }
      setImages(results);
    } catch (error) {
      console.error("Lab Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="custom" className="py-24 sm:py-32 relative overflow-hidden min-h-screen bg-[#080808]">
      <KineticBackground />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* CONSULTATION BANNER */}
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
              Start Chat with Khushi →
            </button>
          </div>
        </motion.div>

        {/* AI LAB */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-2">
              <h3 className="text-white font-serif text-3xl italic">AI Concept Lab</h3>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Experimental Visualizer</p>
            </div>

            <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 space-y-6">
              <input 
                type="text" 
                placeholder="Theme (e.g. Resident Evil, Omen)"
                className="w-full bg-black border border-white/10 rounded-xl p-5 text-white outline-none focus:border-[#E89EB8]/50"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button onClick={generateEverything} disabled={loading} className="w-full py-5 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#E89EB8] transition-all disabled:opacity-30">
                {loading ? "AI is Thinking..." : "Generate Concepts"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {images.length > 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  {aiPairing && (
                    <div className="p-8 rounded-[2rem] bg-gradient-to-r from-[#E89EB8]/10 border border-[#E89EB8]/20">
                      <span className="text-[#E89EB8] text-[9px] font-black uppercase tracking-[0.4em] block mb-2">Chef's AI Suggestion</span>
                      <h4 className="text-2xl font-serif text-white mb-2">{aiPairing.combo}</h4>
                      <p className="text-white/40 text-xs italic">{aiPairing.reason}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {images.map((img, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedImg(img)}
                        className={`relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${selectedImg === img ? 'border-[#E89EB8]' : 'border-white/5'}`}
                      >
                        <SafeImage src={img} className="w-full h-full object-cover" alt="AI Visual" />
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white">REF 0{i+1}</div>
                      </motion.div>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      const finalImg = selectedImg || images[0];
                      const msg = `Hi Khushi! I used your AI Visualizer for "${prompt}". It suggested "${aiPairing?.combo}" flavor. Check this visual: ${finalImg}`;
                      window.open(`https://wa.me/${KHUSHI_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-white/60 text-[10px] uppercase tracking-widest font-bold hover:bg-[#E89EB8] hover:text-black transition-all"
                  >
                    Send selection to Khushi
                  </button>
                </motion.div>
              ) : (
                <div className="h-[400px] border border-dashed border-white/10 rounded-[3rem] flex items-center justify-center">
                  <span className="text-white/10 uppercase tracking-[0.5em] text-[10px] font-black italic">Lab Results Will Appear Here</span>
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