import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// HELPER: This component prevents blank screens if AI fails
const SafeImage = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
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

  // Pure AI Text Generation with dynamic retry
  const fetchAiFlavor = async (userPrompt, attempt = 1) => {
    try {
      const textPrompt = `You are a world-class pastry chef at Delight Bakehouse. For the theme "${userPrompt}", create one completely unique, artistic gourmet cake flavor combination and a 1-sentence architectural reason. Format: Flavor: [Name] | Reason: [Reason]`;
      
      const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(textPrompt)}?model=openai&cache=false`);
      
      if (!res.ok) throw new Error("Text Service Busy");
      
      const text = await res.text();
      if (text.includes("502") || text.includes("Cloudflare")) throw new Error("Gateway Error");

      const [combo, reason] = text.replace('Flavor:', '').split('| Reason:');
      return { 
        combo: combo?.trim() || "Midnight Truffle & Gold Leaf", 
        reason: reason?.trim() || "An elegant solution for this specific visual concept." 
      };
    } catch (err) {
      if (attempt < 3) return fetchAiFlavor(userPrompt, attempt + 1);
      // Absolute final fallback if internet/API is totally dead
      return { combo: "Madagascar Vanilla & Belgian Praline", reason: "A timeless architectural pairing." };
    }
  };

  const generateEverything = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setImages([]);
    setAiPairing(null);

    try {
      // 1. GENERATE DYNAMIC AI FLAVOR
      const flavorData = await fetchAiFlavor(prompt);
      setAiPairing(flavorData);

      // 2. GENERATE 3 IMAGES (Staggered with unique IDs to bypass Rate Limits)
      const results = [];
      for (let i = 0; i < 3; i++) {
        // Wait 1.5s between requests to be extra safe with Pollinations rate limits
        await new Promise(r => setTimeout(r, 1500)); 
        
        const randomSeed = Math.floor(Math.random() * 1000000);
        const enhancedPrompt = `High-end luxury ${prompt} themed cake, professional food photography, architectural cake design, intricate details, moody lighting, 8k resolution, sharp focus, masterpiece`;
        
        // Using a dynamic timestamp 't' and a large random seed helps bypass the 502/Rate limit screens
        results.push(`https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?seed=${randomSeed}&width=1024&height=1024&nologo=true&cache=false&t=${Date.now()}`);
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
                className="w-full bg-black border border-white/10 rounded-xl p-5 text-white outline-none focus:border-[#E89EB8]/50 transition-colors"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && generateEverything()}
              />
              <button 
                onClick={generateEverything} 
                disabled={loading} 
                className="w-full py-5 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#E89EB8] transition-all disabled:opacity-30"
              >
                {loading ? "Chef AI is Dreaming..." : "Generate Concepts"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {images.length > 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  {aiPairing && (
                    <div className="p-8 rounded-[2rem] bg-gradient-to-r from-[#E89EB8]/10 border border-[#E89EB8]/20">
                      <span className="text-[#E89EB8] text-[9px] font-black uppercase tracking-[0.4em] block mb-2">AI Patissier Suggestion</span>
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
                        <SafeImage src={img} className="w-full h-full object-cover" alt={`AI Concept ${i}`} />
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white">CONCEPT 0{i+1}</div>
                      </motion.div>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      const finalImg = selectedImg || images[0];
                      const msg = `Hi Khushi! I used the AI Concept Lab for "${prompt}". It suggested "${aiPairing?.combo}". I love this visual vibe: ${finalImg}`;
                      window.open(`https://wa.me/${KHUSHI_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-white/60 text-[10px] uppercase tracking-widest font-bold hover:bg-[#E89EB8] hover:text-black transition-all"
                  >
                    Send selection to Khushi
                  </button>
                </motion.div>
              ) : (
                <div className="h-[450px] border border-dashed border-white/10 rounded-[3rem] flex items-center justify-center bg-white/[0.01]">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-2 border-[#E89EB8]/20 border-t-[#E89EB8] rounded-full animate-spin mx-auto opacity-20" style={{ display: loading ? 'block' : 'none' }} />
                    <span className="text-white/10 uppercase tracking-[0.5em] text-[10px] font-black italic block">
                      {loading ? "Analyzing Aesthetic..." : "Awaiting Parameters"}
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