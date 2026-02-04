import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KineticBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.02] will-change-transform">
    <motion.div 
      animate={{ x: [0, -1000] }} 
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="text-[200px] md:text-[300px] font-serif font-black text-white whitespace-nowrap"
    >
      Bakers Treat • ARCHITECTURAL CAKERY • THANE STUDIO • 
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

  // EMERGENCY FALLBACK BRAIN: If the API 502s, we use these gourmet defaults
  const getFallbackFlavor = (input) => {
    const p = input.toLowerCase();
    if (p.includes('resident') || p.includes('evil')) {
        return { combo: "Zinfandel Soaked Velvet & Charcoal Ganache", reason: "A dark, atmospheric palette matching the survival horror aesthetic." };
    }
    if (p.includes('valorant') || p.includes('omen') || p.includes('game')) {
        return { combo: "Electric Blueberry & Neon Citrus Cream", reason: "Vibrant, high-energy flavors inspired by tactical ability effects." };
    }
    return { combo: "Madagascar Vanilla Bean & Belgian Dark Praline", reason: "A timeless, architectural pairing that works perfectly with any high-end custom design." };
  };

  const generateEverything = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setImages([]);
    setAiPairing(null);

    try {
      // 1. GENERATE AI FLAVOR (With 5-second timeout and Fallback)
      try {
        const textPrompt = `You are a world-class pastry chef. Given the theme "${prompt}", suggest a unique gourmet cake flavor combination and a 1-sentence reason why it fits. Format: Flavor: [Name] | Reason: [Reason]`;
        
        // We use a timeout so the app doesn't hang if the API is slow
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const flavorResponse = await fetch(`https://text.pollinations.ai/${encodeURIComponent(textPrompt)}`, { signal: controller.signal });
        
        if (!flavorResponse.ok) throw new Error("API Offline");
        
        const flavorText = await flavorResponse.text();
        const [combo, reason] = flavorText.replace('Flavor:', '').split('| Reason:');
        
        setAiPairing({ 
          combo: combo?.trim() || getFallbackFlavor(prompt).combo, 
          reason: reason?.trim() || getFallbackFlavor(prompt).reason 
        });
        clearTimeout(timeoutId);
      } catch (e) {
        // Use our local "brain" if the internet/API fails
        setAiPairing(getFallbackFlavor(prompt));
      }

      // 2. GENERATE 3 IMAGES (Staggered to avoid "Rate Limit Reached")
      const imageResults = [];
      for (let i = 1; i <= 3; i++) {
        // Wait 800ms between each request to be polite to the server
        await new Promise(resolve => setTimeout(resolve, i * 800));
        
        const seed = Math.floor(Math.random() * 999999);
        const visualPrompt = `Cinematic, highly detailed, 8k photography, ${prompt} atmosphere, artistic composition, moody lighting, professional grade, sharp focus`;
        const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(visualPrompt)}?seed=${seed}&width=1024&height=1024&nologo=true&now=${Date.now()}`;
        
        imageResults.push(imgUrl);
      }

      setImages(imageResults);
    } catch (error) {
      console.error("AI Generation failed", error);
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
                Speak directly with Khushi. She specializes in translating your specific memories and themes into edible architecture at our Thane studio.
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
                placeholder="Enter theme (e.g. Omen Valorant)"
                className="w-full bg-black border border-white/10 rounded-xl p-5 text-white outline-none focus:border-[#E89EB8]/50"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button onClick={generateEverything} disabled={loading} className="w-full py-5 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#E89EB8] disabled:opacity-30">
                {loading ? "AI is Processing..." : "Generate 3 Concepts"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {images.length > 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  {aiPairing && (
                    <motion.div initial={{ y: 10 }} animate={{ y: 0 }} className="p-8 rounded-[2rem] bg-gradient-to-r from-[#E89EB8]/10 border border-[#E89EB8]/20">
                      <span className="text-[#E89EB8] text-[9px] font-black uppercase tracking-[0.4em] block mb-2">AI Suggested Palette</span>
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
                        <img src={img} className="w-full h-full object-cover" alt="AI Visual" />
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white">REF 0{i+1}</div>
                      </motion.div>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      const finalImg = selectedImg || images[0];
                      const msg = `Hi Khushi! I used your AI Visualizer for "${prompt}". It suggested "${aiPairing?.combo}" flavor. Here is the visual vibe: ${finalImg}`;
                      window.open(`https://wa.me/${KHUSHI_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-white/60 text-[10px] uppercase tracking-widest font-bold hover:bg-[#E89EB8] hover:text-black transition-all"
                  >
                    Use this visual for my custom cake
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