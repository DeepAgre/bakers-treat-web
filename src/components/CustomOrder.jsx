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
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiPairing, setAiPairing] = useState(null);

  // SECURE ACCESS: Pulling the token from your .env file
  const HF_TOKEN = import.meta.env.VITE_HF_TOKEN; 

  const generateConcept = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setImage(null);
    setAiPairing(null);

    try {
      // 1. DYNAMIC AI FLAVOR GENERATION
      const textRes = await fetch(`https://text.pollinations.ai/${encodeURIComponent(
        `You are the head pastry chef at Delight Bakehouse. Based on the theme "${prompt}", invent a sophisticated, unique cake flavor combination. 
        Return ONLY in this format: Flavor: [Name] | Reason: [Why it fits the theme]`
      )}?model=openai&cache=false&seed=${Date.now()}`);
      
      const textData = await textRes.text();
      
      // Safety check: If API returns 502/HTML, use a premium fallback
      if (textData.includes("<!DOCTYPE html>") || textData.includes("502")) {
        setAiPairing({
          combo: "Midnight Truffle & Himalayan Salt",
          reason: "An architectural classic designed to match bold visual themes."
        });
      } else {
        const [flavor, reason] = textData.replace("Flavor:", "").split("| Reason:");
        setAiPairing({ 
          combo: flavor?.trim() || "Artisan Signature Infusion", 
          reason: reason?.trim() || "Crafted specifically for your architectural vision." 
        });
      }

      // 2. DYNAMIC IMAGE GENERATION (Hugging Face)
      // We generate only 1 high-quality visual now
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: { 
            Authorization: `Bearer ${HF_TOKEN}`, 
            "Content-Type": "application/json" 
          },
          method: "POST",
          body: JSON.stringify({ 
            inputs: `Professional food photography of a luxury high-end cake, theme: ${prompt}, architectural design, edible art, highly detailed, 8k resolution, sharp focus, cinematic lighting, bokeh background`,
            parameters: { seed: Math.floor(Math.random() * 100000) }
          }),
        }
      );

      if (!response.ok) throw new Error("Image API Busy");

      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));

    } catch (error) {
      console.error("AI Lab Error:", error);
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Inputs & Flavor */}
          <div className="space-y-8">
            <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-2">Define Your Theme</label>
                <input 
                  className="w-full bg-black/40 border border-white/10 p-6 rounded-2xl outline-none focus:border-[#E89EB8] transition-all text-lg"
                  placeholder="e.g. Omen Valorant, Gothic Noir, Ethereal Gold"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && generateConcept()}
                />
              </div>
              <button 
                onClick={generateConcept}
                disabled={loading}
                className="w-full bg-[#E89EB8] text-black py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-[#f3b5ca] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-[#E89EB8]/10"
              >
                {loading ? "Chef AI is Designing..." : "Generate Concept Design"}
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

          {/* Right: Visual Display */}
          <div className="relative aspect-square md:aspect-[4/5] w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center space-y-4 border border-white/10 rounded-[3rem] bg-white/[0.01]"
                >
                  <div className="w-12 h-12 border-2 border-[#E89EB8]/20 border-t-[#E89EB8] rounded-full animate-spin" />
                  <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] animate-pulse text-center px-6">
                    Analyzing theme &<br/>Generating Architectural Visuals
                  </p>
                </motion.div>
              ) : image ? (
                <motion.div 
                  key="image"
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative h-full w-full"
                >
                  <img 
                    src={image} 
                    alt="AI Cake Concept" 
                    className="rounded-[3rem] w-full h-full object-cover border border-white/10 shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Concept Visual 01</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  className="h-full border border-dashed border-white/10 rounded-[3rem] flex items-center justify-center bg-white/[0.01]"
                >
                  <span className="text-white/10 uppercase tracking-[0.5em] text-[10px] font-black italic">Awaiting Parameters</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(CustomOrder);