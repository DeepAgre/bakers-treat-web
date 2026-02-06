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

  const HF_TOKEN = import.meta.env.VITE_HF_TOKEN; 

  const generateConcept = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setImage(null);
    setAiPairing(null);

    try {
      // 1. DYNAMIC AI FLAVOR GENERATION (Strictly from Prompt)
      const textRes = await fetch(`https://text.pollinations.ai/${encodeURIComponent(
        `As a chef at Delight Bakehouse, suggest 1 unique flavor and 1 reason for a ${prompt} cake. Format: Flavor: [Name] | Reason: [Reason]`
      )}?model=openai&cache=false&seed=${Date.now()}`);
      
      const textData = await textRes.text();
      
      if (!textData.includes("502") && !textData.includes("<!DOCTYPE html>")) {
        const [flavor, reason] = textData.replace("Flavor:", "").split("| Reason:");
        setAiPairing({ 
          combo: flavor?.trim(), 
          reason: reason?.trim() 
        });
      }

      // 2. DYNAMIC IMAGE GENERATION (Strictly from Prompt)
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: { 
            Authorization: `Bearer ${HF_TOKEN}`, 
            "Content-Type": "application/json" 
          },
          method: "POST",
          body: JSON.stringify({ 
            inputs: `Professional architectural cake photography, theme: ${prompt}, luxury edible art, hyper-realistic, 8k, cinematic lighting, studio background`,
            parameters: { seed: Math.floor(Math.random() * 100000) }
          }),
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        setImage(URL.createObjectURL(blob));
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConsultation = () => {
    const message = `Hi Khushi, I'm interested in a custom ${prompt || 'architectural'} cake from Delight Bakehouse!`;
    window.open(`https://wa.me/919833503525?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-24 relative overflow-hidden min-h-screen bg-[#080808] text-white font-sans">
      <KineticBackground />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* PRIMARY SECTION: THE COMMISSION */}
        <div className="mb-24 flex flex-col items-start max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#E89EB8] uppercase tracking-[0.5em] text-xs font-bold mb-6"
          >
            Bespoke Edible Architecture
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8"
          >
            The Custom <br /> Commission.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-xl max-w-2xl mb-10 leading-relaxed"
          >
            Collaborate with Chef Khushi Manjrekar to bring your structural vision to life. From Thane Studio to your celebration, we craft cakes that defy gravity and expectations.
          </motion.p>
          
          <motion.button 
            onClick={handleConsultation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#E89EB8] transition-colors shadow-2xl"
          >
            Consult with Khushi
          </motion.button>
        </div>

        <hr className="border-white/10 mb-24" />

        {/* SECONDARY SECTION: THE AI VISUALIZER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-10">
            <div>
              <h3 className="text-3xl font-serif mb-4">Visualize Your Idea</h3>
              <p className="text-white/40 leading-relaxed">
                Use our AI laboratory to preview textures, color palettes, and flavor profiles based on your specific theme.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[2.5rem] space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold ml-2">Theme Architecture</label>
                <input 
                  className="w-full bg-black/60 border border-white/10 p-6 rounded-2xl outline-none focus:border-[#E89EB8] transition-all text-lg"
                  placeholder="e.g. Cyberpunk structure, Marble Flow..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <button 
                onClick={generateConcept}
                disabled={loading}
                className="w-full border border-[#E89EB8] text-[#E89EB8] py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-[#E89EB8] hover:text-black transition-all disabled:opacity-20"
              >
                {loading ? "Generating Concept..." : "Generate AI Visual"}
              </button>
            </div>

            <AnimatePresence>
              {aiPairing && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="p-10 bg-white/[0.02] border-l-2 border-[#E89EB8] rounded-r-3xl backdrop-blur-md"
                >
                  <h4 className="text-[#E89EB8] text-[10px] font-black uppercase mb-4 tracking-[0.2em]">Chef's AI Flavor Recommendation</h4>
                  <div className="text-4xl font-serif mb-4 text-white/90">{aiPairing.combo}</div>
                  <p className="text-white/40 italic leading-relaxed text-lg">{aiPairing.reason}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <div className="sticky top-10">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-[4/5] bg-white/[0.02] border border-white/10 rounded-[3rem] flex items-center justify-center">
                    <div className="w-16 h-16 border-t-2 border-[#E89EB8] rounded-full animate-spin" />
                  </motion.div>
                ) : image ? (
                  <motion.div key="i" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
                    <img src={image} className="rounded-[3rem] w-full aspect-[4/5] object-cover border border-white/10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" alt="Concept" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-[3rem]" />
                    <div className="absolute bottom-10 left-10">
                      <p className="text-[10px] uppercase tracking-widest text-[#E89EB8] font-black mb-2">AI Generated Preview</p>
                      <h5 className="text-2xl font-serif uppercase tracking-tighter">{prompt}</h5>
                    </div>
                  </motion.div>
                ) : (
                  <div className="aspect-[4/5] border border-dashed border-white/10 rounded-[3rem] flex items-center justify-center text-white/10 uppercase tracking-[1em] text-[10px]">
                    Design Preview Area
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(CustomOrder);