import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

const CustomOrder = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('photorealistic, highly detailed');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const KHUSHI_PHONE = "919136371662";
  const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

  // --- Magnetic Animation Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize values for movement range
      mouseX.set((e.clientX - window.innerWidth / 2) / 25);
      mouseY.set((e.clientY - window.innerHeight / 2) / 25);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    setError('');
    setImage(null);

    const fullPrompt = `Masterpiece cake art: ${prompt}, ${style}, bakery photography, high quality, pastel colors, 8k resolution, cinematic lighting`;
    const seed = Math.floor(Math.random() * 100000);
    const pollinationUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?seed=${seed}&width=1024&height=1024&nologo=true`;

    try {
      const imgCheck = new Image();
      imgCheck.src = pollinationUrl;
      imgCheck.onload = () => { setImage(pollinationUrl); setLoading(false); };
      imgCheck.onerror = () => tryHuggingFace(fullPrompt);
    } catch (err) {
      tryHuggingFace(fullPrompt);
    }
  };

  const tryHuggingFace = async (fullPrompt) => {
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1", {
        headers: { Authorization: `Bearer ${HF_TOKEN}` },
        method: "POST",
        body: JSON.stringify({ inputs: fullPrompt }),
      });
      if (!response.ok) throw new Error("Busy");
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
      setLoading(false);
    } catch (err) {
      setError("AI bakers are busy! Try again in a minute.");
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `Custom-Cake-Design.png`;
    link.click();
  };

  return (
    <section id="custom-studio" className="py-24 relative overflow-hidden min-h-screen flex items-center bg-[#E89EB8]">
      
      {/* LANDO NORRIS STYLE BACKGROUND ANIMATION - Error Fixed here */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{ x: dx, y: dy }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 10 + i, repeat: Infinity }}
            className={`absolute rounded-full bg-white/20 blur-3xl w-[400px] h-[400px]`}
            css={{
                top: `${i * 15}%`,
                left: `${(i % 3) * 30}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: FUTURISTIC HOVER ELEMENTS */}
        <div className="relative h-[500px] hidden lg:flex items-center justify-center order-2 lg:order-1">
          <motion.div style={{ x: dx, y: dy }} className="relative w-full h-full flex items-center justify-center">
             <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
               className="absolute w-[450px] h-[450px] border border-white/30 rounded-full border-dashed"
             />
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="bg-white/10 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/40 shadow-2xl relative z-20 text-center"
             >
               <h3 className="text-white text-8xl font-serif font-black opacity-10 absolute inset-0 flex items-center justify-center select-none">BAKERS</h3>
               <div className="text-white space-y-4 relative z-10">
                 <div className="h-1 w-12 bg-white mx-auto" />
                 <h4 className="text-5xl font-serif font-bold italic tracking-tighter">Bakers <br/> Treat</h4>
                 <p className="text-xs uppercase tracking-[0.6em] opacity-70">Thane / Custom Studio</p>
               </div>
             </motion.div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: AI GENERATOR */}
        <div className="order-1 lg:order-2">
          <h2 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-[0.9] text-white">
            Customised <br/> Cakes.
          </h2>
          
          <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50">
            <h4 className="text-xl font-bold mb-6 text-[#2D2D2D] flex items-center gap-3">
               <span className="w-2 h-2 bg-[#E89EB8] rounded-full animate-pulse" />
               AI Design Visualizer
            </h4>

            <div className="space-y-5">
              <input 
                type="text" 
                placeholder="Describe your vision (e.g. A Ferrari car)"
                className="w-full bg-[#f8f8f8] border-2 border-transparent rounded-2xl p-5 text-[#2D2D2D] font-medium placeholder:text-[#2D2D2D]/40 focus:border-[#E89EB8] transition-all outline-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <p className="text-[12px] text-[#2D2D2D]/60 italic font-medium leading-relaxed">
                💡 <strong>PRO TIP:</strong> Describe the object directly (e.g. "Ferrari car"). <br/>
                Don't add words like "cake" or "as a cake" for the best results!
              </p>

              <button 
                onClick={generateImage}
                disabled={loading}
                className="w-full bg-[#2D2D2D] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 active:scale-[0.98]"
              >
                {loading ? "Simulating Design..." : "Generate AI Design"}
              </button>
            </div>

            <AnimatePresence>
              {error && <p className="mt-4 text-sm text-red-500 font-bold">{error}</p>}
              
              {image && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 pt-8 border-t border-black/5">
                  <div className="relative group cursor-zoom-in" onClick={() => setIsFullscreen(true)}>
                    <img src={image} className="w-full h-72 object-cover rounded-3xl shadow-inner border border-black/10" alt="Result" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center">
                       <span className="text-white font-bold text-xs bg-black/40 px-4 py-2 rounded-full">Expand Design</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button onClick={downloadImage} className="bg-white border-2 border-[#2D2D2D] text-[#2D2D2D] py-4 rounded-2xl font-bold text-sm hover:bg-[#f8f8f8] transition-all">
                      Download Image
                    </button>
                    <button 
                      onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}?text=Hi Khushi! I've designed a custom cake on your site. I'm sending you the design image now!`, '_blank')}
                      className="bg-[#25D366] text-white py-4 rounded-2xl font-bold text-sm hover:brightness-110 flex items-center justify-center gap-2 transition-all"
                    >
                      Share with Khushi
                    </button>
                  </div>
                  <p className="text-[10px] text-center mt-3 text-[#2D2D2D]/40 uppercase font-black">Download first, then attach on WhatsApp</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button 
            whileHover={{ x: 10 }}
            onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}`, '_blank')}
            className="mt-10 flex items-center gap-6 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full border border-white/40 backdrop-blur-md transition-all group"
          >
            <span className="font-black uppercase tracking-[0.2em] text-xs">Direct Consultation</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform text-[#E89EB8]">→</div>
          </motion.button>
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-6 backdrop-blur-lg"
            onClick={() => setIsFullscreen(false)}
          >
            <button className="absolute top-10 right-10 text-white text-5xl font-light">&times;</button>
            <motion.img 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              src={image} className="max-w-5xl max-h-[85vh] w-full object-contain rounded-3xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CustomOrder;