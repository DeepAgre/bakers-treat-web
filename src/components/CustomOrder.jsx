import React, { useState, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ENHANCED FLAVOR ENGINE (The "Brain") ---
const getFlavorPairing = (prompt) => {
  const p = prompt.toLowerCase();
  
  // VALORANT AGENTS
  if (p.includes('raze')) {
    return { 
      combo: "Spiced Brazilian Cocoa & Zesty Blood Orange", 
      reason: "Reflecting her explosive personality and warm skin tones with deep dark chocolate and a sharp citrus burst." 
    };
  }
  if (p.includes('jett')) {
    return { 
      combo: "Blueberry Cloud Frosting & Korean Yuzu Lemon", 
      reason: "A light, airy texture representing her wind abilities with a sharp, fast-acting citrus kick." 
    };
  }
  if (p.includes('reyna')) {
    return { 
      combo: "Midnight Blackberry & Purple Lavender Ganache", 
      reason: "Dark, mysterious, and elegant—matching her ethereal purple aesthetic and soul-consuming lore." 
    };
  }
  if (p.includes('sage')) {
    return { 
      combo: "Matcha Green Tea & Jade Mint Cream", 
      reason: "Earthful and healing tones representing her orb abilities and tranquil nature." 
    };
  }

  // POP CULTURE & THEMES
  if (p.includes('spongebob')) {
    return { 
      combo: "Caramelized Pineapple & Salted Yellow Buttercream", 
      reason: "A bright yellow profile inspired by his pineapple house and sunny disposition." 
    };
  }
  if (p.includes('spider-man') || p.includes('spiderman')) {
    return { 
      combo: "Red Velvet & New York Cheesecake Swirl", 
      reason: "Classic Red & White palette with a flavor profile straight from the streets of Queens." 
    };
  }
  if (p.includes('cyberpunk') || p.includes('neon')) {
    return { 
      combo: "Electric Dragonfruit & Sour Pop-Rocks Chocolate", 
      reason: "Neon colors with a 'high-tech' popping sensation to mimic a futuristic aesthetic." 
    };
  }
  if (p.includes('barbie')) {
    return { 
      combo: "Strawberry Champagne & Rose Water Silk", 
      reason: "The ultimate pink luxury combination, sophisticated yet playfully sweet." 
    };
  }

  // DEFAULT
  return { 
    combo: "Madagascar Vanilla Bean & Belgian Dark Praline", 
    reason: "A timeless, architectural pairing that works perfectly with any high-end custom design." 
  };
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
  const [pairing, setPairing] = useState(null);

  const KHUSHI_PHONE = "919136371662";

  const generateImages = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setImages([]);
    
    // Improved Prompt Engineering for specific character resemblance
    const basePrompt = `A high-end luxury tiered cake inspired by ${prompt}, artistic cake sculpture, culinary masterpiece, macro food photography, 8k, bokeh background, cinematic lighting, using colors and themes from ${prompt} in a sophisticated patisserie style.`;
    
    const newImages = [1, 2, 3].map(i => {
      const seed = Math.floor(Math.random() * 1000000);
      return `https://image.pollinations.ai/prompt/${encodeURIComponent(basePrompt)}?seed=${seed}&width=1024&height=1024&nologo=true`;
    });

    setTimeout(() => {
      setImages(newImages);
      setPairing(getFlavorPairing(prompt));
      setLoading(false);
    }, 2000);
  };

  return (
    <section id="custom" className="py-24 sm:py-32 relative overflow-hidden min-h-screen bg-[#080808]">
      <KineticBackground />

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: THE INPUT PANEL */}
          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-[#E89EB8]" />
                <span className="text-[#E89EB8] uppercase tracking-[0.6em] text-[9px] font-black">AI Concept Lab</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-serif text-white leading-[0.9] tracking-tighter mb-8">
                The AI <br/>
                <span className="italic text-[#E89EB8] font-light">Patissier.</span>
              </h2>
            </motion.div>

            <div className="space-y-6 bg-white/[0.03] p-8 rounded-[2rem] border border-white/5 backdrop-blur-sm">
              <div className="space-y-2">
                <label className="text-white/40 text-[9px] uppercase tracking-widest font-black ml-2">Describe your vision</label>
                <input 
                  type="text" 
                  placeholder="e.g. Raze from Valorant or a Midnight Forest"
                  className="w-full bg-black/60 border border-white/10 rounded-2xl p-6 text-white focus:border-[#E89EB8]/50 outline-none transition-all text-sm"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <button 
                onClick={generateImages}
                disabled={loading}
                className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] hover:bg-[#E89EB8] transition-all disabled:opacity-30"
              >
                {loading ? "Generating Concepts..." : "Analyze & Design"}
              </button>
            </div>
          </div>

          {/* RIGHT: THE GALLERY & BRAIN OUTPUT */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {images.length > 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="space-y-10"
                >
                  {/* DYNAMIC FLAVOR RECOMMENDATION */}
                  {pairing && (
                    <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#E89EB8]/10 to-transparent border border-white/10 relative overflow-hidden group">
                      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-grow space-y-3">
                          <div className="flex items-center gap-2">
                             <span className="w-2 h-2 bg-[#E89EB8] rounded-full animate-pulse" />
                             <span className="text-[#E89EB8] text-[9px] font-black uppercase tracking-[0.4em]">Delight Bakehouse Pairing Engine</span>
                          </div>
                          <h4 className="text-3xl font-serif text-white leading-tight">{pairing.combo}</h4>
                          <p className="text-white/40 text-sm font-light leading-relaxed max-w-xl italic">"{pairing.reason}"</p>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                         <span className="text-8xl text-white font-serif">“</span>
                      </div>
                    </div>
                  )}

                  {/* 3-IMAGE GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {images.map((img, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedImg(img)}
                        className={`relative aspect-[3/4] rounded-[2rem] overflow-hidden border-2 cursor-pointer transition-all duration-500
                          ${selectedImg === img ? 'border-[#E89EB8] shadow-[0_20px_50px_rgba(232,158,184,0.2)]' : 'border-white/5'}`}
                      >
                        <img src={img} className="w-full h-full object-cover" alt="AI Pâtisserie Concept" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6">
                           <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em]">Option 0{i+1}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CONTACT REDIRECT */}
                  <div className="pt-6">
                    <button 
                      onClick={() => {
                        const finalImg = selectedImg || images[0];
                        const msg = `Hi Khushi! I used the AI Lab on your website. I want a custom cake for "${prompt}". The AI suggested "${pairing.combo}" and I loved this design: ${finalImg}`;
                        window.open(`https://wa.me/${KHUSHI_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                      className="w-full flex items-center justify-between p-8 bg-white/[0.02] border border-white/10 rounded-[2rem] hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="text-left">
                        <span className="text-white font-serif text-xl block mb-1 italic">Ready to commission?</span>
                        <span className="text-white/30 text-[9px] uppercase tracking-widest font-black">Send this concept to Khushi's Thane Studio</span>
                      </div>
                      <div className="h-14 w-14 rounded-full bg-[#E89EB8] flex items-center justify-center text-black text-xl group-hover:scale-110 transition-transform">→</div>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="h-[600px] w-full rounded-[3rem] border border-white/5 flex flex-col items-center justify-center space-y-6 bg-white/[0.01]">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center animate-spin [animation-duration:10s]">
                       <div className="w-2 h-2 bg-[#E89EB8] rounded-full" />
                    </div>
                  </div>
                  <p className="text-white/20 uppercase tracking-[0.6em] text-[10px] font-black italic">Awaiting Input Parameters</p>
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