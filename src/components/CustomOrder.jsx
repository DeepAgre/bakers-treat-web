import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomOrder = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('photorealistic, highly detailed');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const images = {
    cake1: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
    box: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&q=80&w=800",
    cupcake: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800",
    pinkCake: "https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&q=80&w=800"
  };

  const KHUSHI_PHONE = "919136371662"; 
  const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    setError('');
    setImage(null);

    const fullPrompt = `Cake design: ${prompt}, ${style}, bakery photography, high quality, pastel colors, 8k resolution`;
    const seed = Math.floor(Math.random() * 100000);
    const pollinationUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?seed=${seed}&width=1024&height=1024&nologo=true`;

    try {
      const imgCheck = new Image();
      imgCheck.src = pollinationUrl;
      imgCheck.onload = () => {
        setImage(pollinationUrl);
        setLoading(false);
      };
      imgCheck.onerror = () => tryHuggingFace(fullPrompt);
    } catch (err) {
      tryHuggingFace(fullPrompt);
    }
  };

  const tryHuggingFace = async (fullPrompt) => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
        {
          headers: { Authorization: `Bearer ${HF_TOKEN}` },
          method: "POST",
          body: JSON.stringify({ inputs: fullPrompt }),
        }
      );
      if (!response.ok) throw new Error("Busy");
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
      setLoading(false);
    } catch (err) {
      setError("AI bakers are busy! Try again in a minute.");
      setLoading(false);
    }
  };

  return (
    <section id="custom-studio" className="py-24 relative overflow-hidden min-h-screen flex items-center" style={{ backgroundColor: '#E89EB8' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Gallery */}
        <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
          <div className="space-y-4 pt-12">
            <img src={images.cake1} className="rounded-[2.5rem] w-full h-80 object-cover shadow-2xl border-4 border-white/40" alt="Cake" />
            <img src={images.cupcake} className="rounded-[2.5rem] w-full h-64 object-cover shadow-2xl border-4 border-white/40" alt="Cupcake" />
          </div>
          <div className="space-y-4">
            <img src={images.box} className="rounded-[2.5rem] w-full h-64 object-cover shadow-2xl border-4 border-white/40" alt="Box" />
            <img src={images.pinkCake} className="rounded-[2.5rem] w-full h-80 object-cover shadow-2xl border-4 border-white/40" alt="Pink Cake" />
          </div>
        </div>

        {/* AI Generator UI */}
        <div className="order-1 lg:order-2 text-[#2D2D2D]">
          <span className="uppercase tracking-[0.3em] text-[12px] font-bold mb-4 block opacity-80">AI Design Studio</span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">Dream It. <br/> We'll Bake It.</h2>
          <p className="text-lg mb-8 font-medium">Visualize your custom 3D cake idea with our AI tool.</p>

          <div className="bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/50 shadow-xl mb-8">
            <input 
              type="text" 
              placeholder="e.g. A blue vintage car"
              className="w-full bg-white/60 border-none rounded-xl p-4 mb-2 text-[#2D2D2D] placeholder:text-[#2D2D2D]/50 focus:ring-2 focus:ring-[#E89EB8]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            {/* Suggestion Note */}
            <p className="text-[11px] mb-4 text-[#2D2D2D]/70 italic px-1">
              💡 <strong>Pro-Tip:</strong> Just describe the object (e.g. "Red Ferrari"). Avoid adding words like "cake" or "as a cake" for the best results!
            </p>

            <button 
              onClick={generateImage}
              disabled={loading}
              className="w-full bg-[#E89EB8] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#d689a4] transition-all disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate AI Design"}
            </button>

            <AnimatePresence>
              {image && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <p className="text-[10px] text-center mb-2 font-bold opacity-60 uppercase tracking-tighter">Click image to expand</p>
                  <img 
                    src={image} 
                    onClick={() => setIsFullscreen(true)}
                    className="w-full h-56 object-cover rounded-2xl cursor-zoom-in hover:opacity-90 transition-opacity border-2 border-white/50 shadow-md" 
                    alt="AI Result" 
                  />
                  <button 
                    onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}?text=Hi Khushi! Check out this design: ${image}`, '_blank')}
                    className="mt-4 w-full bg-[#25D366] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1fae53]"
                  >
                    Share with Khushi
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chat with Khushi Button */}
          <button 
            onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}`, '_blank')}
            className="group relative flex items-center gap-4 bg-white px-10 py-5 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <span className="text-[#E89EB8] font-black uppercase tracking-widest text-sm">Chat with Khushi</span>
            <div className="w-8 h-8 bg-[#E89EB8] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white">→</span>
            </div>
          </button>
        </div>
      </div>

      {/* Fullscreen Overlay Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <button className="absolute top-8 right-8 text-white text-4xl font-light hover:scale-110 transition-transform">&times;</button>
            <motion.img 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={image} className="max-w-full max-h-full rounded-lg shadow-2xl" 
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CustomOrder;