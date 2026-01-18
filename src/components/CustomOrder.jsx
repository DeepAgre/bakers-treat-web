import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const generateEverything = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setImages([]);
    setAiPairing(null);

    try {
      // 1. GENERATE PURE AI FLAVOR (Using Pollinations Text API)
      const textPrompt = `You are a world-class pastry chef. Given the theme "${prompt}", suggest a unique gourmet cake flavor combination and a 1-sentence reason why it fits. Format: Flavor: [Flavor Name] | Reason: [Reason]`;
      const flavorResponse = await fetch(`https://text.pollinations.ai/${encodeURIComponent(textPrompt)}`);
      const flavorText = await flavorResponse.text();
      
      // Parsing the AI response
      const [combo, reason] = flavorText.replace('Flavor:', '').split('| Reason:');
      setAiPairing({ 
        combo: combo?.trim() || "Dark Chocolate & Sea Salt", 
        reason: reason?.trim() || "A classic sophisticated choice for this theme." 
      });

      // 2. GENERATE 3 PURE THEME IMAGES (Not necessarily cakes)
      // Using unique seeds and timestamps to avoid "Rate Limit Reach" cache
      const newImages = [1, 2, 3].map(i => {
        const seed = Math.floor(Math.random() * 999999);
        const time = Date.now();
        const visualPrompt = `Cinematic, high-detail, 8k, professional photography, focus on ${prompt}, artistic interpretation, moody lighting, sharp focus`;
        return `https://image.pollinations.ai/prompt/${encodeURIComponent(visualPrompt)}?seed=${seed}&width=1024&height=1024&nologo=true&t=${time}`;
      });

      setImages(newImages);
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
        
        {/* PRIMARY FEATURE: CHAT WITH KHUSHI */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-[#E89EB8]" />
            <span className="text-[#E89EB8] uppercase tracking-[0.6em] text-[10px] font-black">Main Service</span>
          </div>
          
          <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 backdrop-blur-md">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">The Custom <span className="italic text-[#E89EB8]">Commission.</span></h2>
              <p className="text-white/50 text-lg font-light leading-relaxed">
                Skip the automation and speak directly with our lead artist. Khushi specializes in translating your specific memories, characters, and themes into edible architecture.
              </p>
            </div>
            
            <button 
              onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}?text=Hi Khushi! I want to discuss a custom cake order.`, '_blank')}
              className="group relative bg-[#E89EB8] text-black px-12 py-8 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all flex items-center gap-4 shrink-0 shadow-[0_0_40px_rgba(232,158,184,0.2)]"
            >
              Consult with Khushi
              <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </div>
        </motion.div>

        {/* SECONDARY FEATURE: AI VISUALIZER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* INPUT SIDE */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-2">
              <h3 className="text-white font-serif text-3xl italic">AI Concept Lab</h3>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Experimental Visualizer</p>
            </div>

            <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 space-y-6">
              <div className="space-y-4">
                <label className="text-white/40 text-[9px] uppercase tracking-widest font-black">Dream your theme</label>
                <input 
                  type="text" 
                  placeholder="e.g. Resident Evil, Raze Valorant..."
                  className="w-full bg-black border border-white/10 rounded-xl p-5 text-white focus:border-[#E89EB8]/50 outline-none transition-all"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <button 
                onClick={generateEverything}
                disabled={loading}
                className="w-full py-5 bg-white text-black rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#E89EB8] transition-all disabled:opacity-30"
              >
                {loading ? "AI is Thinking..." : "Generate 3 Concepts"}
              </button>
            </div>
          </div>

          {/* AI OUTPUT SIDE */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {images.length > 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* AI GENERATED FLAVOR CARD */}
                  {aiPairing && (
                    <motion.div 
                      initial={{ y: 10 }} animate={{ y: 0 }}
                      className="p-8 rounded-[2rem] bg-gradient-to-r from-[#E89EB8]/10 to-transparent border border-[#E89EB8]/20"
                    >
                      <span className="text-[#E89EB8] text-[9px] font-black uppercase tracking-[0.4em] block mb-2">AI Suggested Palette</span>
                      <h4 className="text-2xl font-serif text-white mb-2">{aiPairing.combo}</h4>
                      <p className="text-white/40 text-xs italic font-light">{aiPairing.reason}</p>
                    </motion.div>
                  )}

                  {/* 3 IMAGE GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {images.map((img, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedImg(img)}
                        className={`relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all
                          ${selectedImg === img ? 'border-[#E89EB8]' : 'border-white/5'}`}
                      >
                        <img src={img} className="w-full h-full object-cover shadow-2xl" alt="AI Visual" loading="lazy" />
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[8px] text-white">REF 0{i+1}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* SEND TO KHUSHI */}
                  <button 
                    onClick={() => {
                      const finalImg = selectedImg || images[0];
                      const msg = `Hi Khushi! I used your AI Visualizer for "${prompt}". It suggested "${aiPairing?.combo}" flavor. Here is the visual vibe I want: ${finalImg}`;
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