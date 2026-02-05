import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KineticBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.02]">
    <motion.div 
      animate={{ x: [0, -1000] }} 
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="text-[200px] font-serif font-black text-white whitespace-nowrap"
    >
      Delight Bakehouse • ARCHITECTURAL CAKERY • THANE STUDIO • 
    </motion.div>
  </div>
));

const CustomOrder = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiPairing, setAiPairing] = useState(null);

  // SECURE ACCESS: Pulling the token from your .env file
  const HF_TOKEN = import.meta.env.VITE_HF_TOKEN; 

  const generateEverything = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setImages([]);
    setAiPairing(null);

    try {
      // 1. DYNAMIC AI FLAVOR GENERATION
      // We use Pollinations for text as it's faster for chat-style responses
      const textRes = await fetch(`https://text.pollinations.ai/${encodeURIComponent(
        `You are a chef at Delight Bakehouse. For a ${prompt} themed cake, suggest 1 unique flavor and 1 reason. Format: Flavor: [Name] | Reason: [Reason]`
      )}?model=openai&cache=false`);
      
      const textData = await textRes.text();
      // Split the string based on our custom format
      const [flavor, reason] = textData.replace("Flavor:", "").split("| Reason:");
      
      setAiPairing({ 
        combo: flavor?.trim() || "Artisan Infusion", 
        reason: reason?.trim() || "Designed to match your unique aesthetic." 
      });

      // 2. DYNAMIC IMAGE GENERATION (Hugging Face)
      // Generating 3 distinct visuals
      const imagePromises = [1, 2, 3].map(async (seed) => {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
          {
            headers: { 
              Authorization: `Bearer ${HF_TOKEN}`, 
              "Content-Type": "application/json" 
            },
            method: "POST",
            body: JSON.stringify({ 
              inputs: `Luxury gourmet cake, theme: ${prompt}, architectural style, high-end pastry photography, 8k, bokeh background, sharp focus, intricate edible details`,
              parameters: { seed: Math.floor(Math.random() * 100000) } // Randomizes each image
            }),
          }
        );

        if (!response.ok) throw new Error("Hugging Face API Busy");

        const blob = await response.blob();
        return URL.createObjectURL(blob); // Creates a local, secure URL for the generated image
      });

      const imageUrls = await Promise.all(imagePromises);
      setImages(imageUrls);

    } catch (error) {
      console.error("AI Lab Error:", error);
      // Optional: Set a user-friendly error state here
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden min-h-screen bg-[#080808] text-white">
      <KineticBackground />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-serif text-[#E89EB8] mb-4">AI Concept Lab</h2>
          <p className="text-white/40 uppercase tracking-[0.3em] text-xs">The Future of Custom Commissions</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-2">Define Your Theme</label>
                <input 
                  className="w-full bg-black/40 border border-white/10 p-6 rounded-2xl outline-none focus:border-[#E89EB8] transition-all text-lg"
                  placeholder="e.g. Omen Valorant, Neon Cyberpunk, Pastel Bloom"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <button 
                onClick={generateEverything}
                disabled={loading}
                className="w-full bg-[#E89EB8] text-black py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-[#f3b5ca] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-[#E89EB8]/10"
              >
                {loading ? "Chef AI is Visualizing..." : "Generate Concept Designs"}
              </button>
            </div>

            <AnimatePresence>
              {aiPairing && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8 bg-gradient-to-br from-white/[0.05] to-transparent border-l-4 border-[#E89EB8] rounded-r-3xl"
                >
                  <h4 className="text-[#E89EB8] text-[10px] font-black uppercase mb-3 tracking-[0.2em]">Flavor Profile Suggestion</h4>
                  <div className="text-3xl font-serif mb-3 leading-tight">{aiPairing.combo}</div>
                  <p className="text-white/50 italic text-sm leading-relaxed">"{aiPairing.reason}"</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative min-h-[400px]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-2 border-[#E89EB8]/20 border-t-[#E89EB8] rounded-full animate-spin" />
                <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] animate-pulse">Rendering 3D Visuals</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <AnimatePresence>
                  {images.length > 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-4">
                      {images.map((src, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.05 }} className="group relative">
                          <img 
                            src={src} 
                            alt="AI Cake" 
                            className="rounded-2xl aspect-[4/5] object-cover border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 cursor-zoom-in"
                          />
                          <div className="absolute inset-0 rounded-2xl bg-[#E89EB8]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="h-full border border-dashed border-white/10 rounded-[3rem] flex items-center justify-center">
                      <span className="text-white/10 uppercase tracking-[0.5em] text-[10px] font-black italic">Awaiting Parameters</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(CustomOrder);