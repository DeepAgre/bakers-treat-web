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
      // 1. AUTONOMOUS AI FLAVOR GENERATION (Keeping your preferred logic)
      const textRes = await fetch(`https://text.pollinations.ai/${encodeURIComponent(
        `You are Chef Khushi. Create 1 unique, gourmet cake flavor and 1 logical reason why it fits the theme: "${prompt}". 
        Return ONLY in this format: Flavor: [Name] | Reason: [Why it fits]`
      )}?model=openai&cache=false`);
      
      const textData = await textRes.text();
      
      if (textData && !textData.includes("<!DOCTYPE html>") && !textData.includes("502")) {
        const cleanData = textData.replace(/^(AI:|Chef:|Response:)/i, "").trim();
        const [flavor, reason] = cleanData.replace("Flavor:", "").split("| Reason:");
        
        if (flavor && reason) {
          setAiPairing({ 
            combo: flavor.trim(), 
            reason: reason.trim() 
          });
        }
      }

      // 2. ROBUST IMAGE GENERATION (With Retry Mechanism)
      const fetchWithRetry = async (retries = 3) => {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
          {
            headers: { 
              "Authorization": `Bearer ${HF_TOKEN}`, 
              "Content-Type": "application/json" 
            },
            method: "POST",
            body: JSON.stringify({ 
              inputs: `Professional food photography of a high-end architectural cake, theme: ${prompt}, edible art, hyper-realistic, 8k, cinematic lighting, studio background`,
              options: { wait_for_model: true } 
            }),
          }
        );

        // If 503 (Model Loading), wait 5 seconds and try again
        if (response.status === 503 && retries > 0) {
          await new Promise(res => setTimeout(res, 5000));
          return fetchWithRetry(retries - 1);
        }

        if (response.ok) {
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        }
        
        throw new Error("Failed to generate image after retries");
      };

      const imageUrl = await fetchWithRetry();
      if (imageUrl) setImage(imageUrl);

    } catch (error) {
      console.error("AI Generation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConsultation = () => {
    const message = `Hi Khushi, I'm interested in a custom ${prompt || 'bespoke'} cake from Delight Bakehouse! I loved the AI concept.`;
    window.open(`https://wa.me/919833503525?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-24 relative overflow-hidden min-h-screen bg-[#080808] text-white font-sans">
      <KineticBackground />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* PRIMARY SECTION: THE COMMISSION */}
        <div className="mb-32 flex flex-col items-start max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#E89EB8] uppercase tracking-[0.5em] text-[10px] font-black mb-6"
          >
            Bespoke Edible Architecture
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-serif leading-[0.85] mb-10"
          >
            The Custom <br /> Commission.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-xl md:text-2xl max-w-3xl mb-12 leading-relaxed"
          >
            Collaborate with **Chef Khushi Manjrekar** to transform your vision into structural art. Our Thane studio specializes in gravity-defying cakes that bridge the gap between fine art and pastry.
          </motion.p>
          
          <motion.button 
            onClick={handleConsultation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-16 py-6 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#E89EB8] transition-all shadow-2xl"
          >
            Consult with Khushi
          </motion.button>
        </div>

        <div className="w-full h-px bg-white/10 mb-32" />

        {/* SECONDARY SECTION: AI CONCEPT VISUALIZER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div>
              <h3 className="text-4xl font-serif mb-6 text-[#E89EB8]">AI Concept Lab</h3>
              <p className="text-white/40 text-lg leading-relaxed max-w-lg">
                Enter your theme to trigger our autonomous Chef-AI. It will generate a custom flavor profile and a conceptual architectural visual for your review.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[3rem] space-y-8 backdrop-blur-sm">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black ml-2">Theme Architecture</label>
                <input 
                  className="w-full bg-black/40 border border-white/10 p-7 rounded-2xl outline-none focus:border-[#E89EB8] transition-all text-xl"
                  placeholder="e.g. Cyberpunk, Gothic Arch, Marble Flow..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <button 
                onClick={generateConcept}
                disabled={loading}
                className="w-full bg-transparent border border-[#E89EB8] text-[#E89EB8] py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-[#E89EB8] hover:text-black transition-all disabled:opacity-30 shadow-lg shadow-[#E89EB8]/5"
              >
                {loading ? "Chef AI is Rendering..." : "Generate Concept Design"}
              </button>
            </div>

            <AnimatePresence>
              {aiPairing && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="p-10 bg-white/[0.02] border-l-4 border-[#E89EB8] rounded-r-[2rem] backdrop-blur-md"
                >
                  <h4 className="text-[#E89EB8] text-[10px] font-black uppercase mb-4 tracking-[0.3em]">Autonomous Flavor Suggestion</h4>
                  <div className="text-4xl font-serif mb-4 leading-tight text-white">{aiPairing.combo}</div>
                  <p className="text-white/40 italic text-lg leading-relaxed">"{aiPairing.reason}"</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <div className="sticky top-10">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-[4/5] bg-white/[0.02] border border-white/10 rounded-[3rem] flex flex-col items-center justify-center space-y-6">
                    <div className="w-16 h-16 border-t-2 border-[#E89EB8] rounded-full animate-spin shadow-[0_0_20px_rgba(232,158,184,0.2)]" />
                    <span className="text-white/20 text-[10px] uppercase tracking-[0.5em] animate-pulse">Designing Structure</span>
                  </motion.div>
                ) : image ? (
                  <motion.div key="image" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
                    <img 
                      src={image} 
                      className="rounded-[3rem] w-full aspect-[4/5] object-cover border border-white/10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000" 
                      alt="AI Concept" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent rounded-[3rem]" />
                    <div className="absolute bottom-12 left-12">
                      <p className="text-[10px] uppercase tracking-widest text-[#E89EB8] font-black mb-3">AI Visual Concept</p>
                      <h5 className="text-3xl font-serif uppercase tracking-tighter">{prompt}</h5>
                    </div>
                  </motion.div>
                ) : (
                  <div className="aspect-[4/5] border border-dashed border-white/10 rounded-[3rem] flex items-center justify-center text-white/5 uppercase tracking-[0.8em] text-[10px] font-black italic">
                    Studio Display Awaiting Input
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