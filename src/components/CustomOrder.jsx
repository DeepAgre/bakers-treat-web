import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';

const CustomOrder = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('photorealistic, highly detailed');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const KHUSHI_PHONE = "919136371662";
  const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

  // --- Magnetic & 3D Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { damping: 25, stiffness: 150 });
  const mouseY = useSpring(y, { damping: 25, stiffness: 150 });

  const rotateX = useTransform(mouseY, [-20, 20], [15, -15]);
  const rotateY = useTransform(mouseX, [-20, 20], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      x.set((e.clientX - centerX) / 25);
      y.set((e.clientY - centerY) / 25);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

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

  return (
    <section id="custom-studio" className="py-24 relative overflow-hidden min-h-screen flex items-center bg-[#E89EB8]">
      
      {/* KINETIC BACKGROUND TEXT */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <motion.div 
          animate={{ x: [0, -1200] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="text-[250px] font-serif font-black text-white whitespace-nowrap"
        >
          BAKERS TREAT • DESIGN YOUR VISION • THANE • 
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: INTERACTIVE 3D FIELD */}
        <div className="relative h-[650px] hidden lg:flex items-center justify-center order-2 lg:order-1">
          <motion.div 
            style={{ rotateX, rotateY, perspective: 1200 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Dynamic Glass Orbs */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  x: [0, 30, 0],
                  y: [0, -30, 0]
                }}
                transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-2xl border border-white/10"
                style={{ left: `${i * 10}%`, top: `${i * 5}%` }}
              />
            ))}

            {/* Central Branding Card */}
            <motion.div 
              className="bg-white/10 backdrop-blur-3xl p-20 rounded-[3rem] border border-white/30 shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative z-20 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-white space-y-6">
                <span className="text-xs uppercase tracking-[1em] font-black block opacity-50">Handcrafted in Thane</span>
                <h4 className="text-8xl font-serif font-bold italic tracking-tighter leading-none">
                  Bakers <br/> Treat
                </h4>
                <div className="h-1 w-24 bg-white mx-auto opacity-30 rounded-full" />
              </div>
            </motion.div>

            {/* Floating Elements */}
            <KineticText text="Artisan Craft" x={-250} y={-220} mouseX={mouseX} mouseY={mouseY} delay={0} />
            <KineticText text="Bespoke Art" x={280} y={-150} mouseX={mouseX} mouseY={mouseY} delay={1} />
            <KineticText text="Pure Magic" x={-200} y={200} mouseX={mouseX} mouseY={mouseY} delay={2} />
            <KineticText text="Studio Thane" x={220} y={230} mouseX={mouseX} mouseY={mouseY} delay={0.5} />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: MAIN ACTIONS */}
        <div className="order-1 lg:order-2 space-y-10">
          <div>
            <h2 className="text-7xl md:text-[9rem] font-serif font-bold mb-4 leading-[0.85] text-white">
              Dream it. <br/> Eat it.
            </h2>
            <p className="text-white/80 text-lg font-medium tracking-wide">Bring your wildest cake fantasies to life with Khushi.</p>
          </div>

          {/* MAIN BUTTON: CHAT WITH KHUSHI */}
          <div className="space-y-4">
             <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}?text=Hi Khushi! I want to discuss a custom cake order.`, '_blank')}
                className="w-full bg-white text-[#2D2D2D] p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center text-center group hover:bg-[#2D2D2D] hover:text-white transition-all duration-500"
              >
                <span className="text-xs uppercase font-black tracking-[0.4em] mb-2 opacity-60 group-hover:text-[#E89EB8]">Direct Connection</span>
                <span className="text-4xl md:text-5xl font-serif font-bold italic">Consult with Khushi</span>
                <p className="mt-4 text-sm font-medium opacity-60 group-hover:opacity-100 max-w-xs">Chat directly with the head baker to finalize flavors, sizes, and pricing.</p>
             </motion.button>
          </div>
          
          {/* SECONDARY: AI GENERATOR */}
          <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50">
            <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-[#2D2D2D]/60 flex items-center gap-3">
               <span className="w-2 h-2 bg-[#E89EB8] rounded-full animate-pulse" />
               Option 2: Use AI to Visualize
            </h4>

            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Describe a cake design (e.g. A space nebula)"
                className="w-full bg-[#f8f8f8] border-2 border-transparent rounded-2xl p-5 text-[#2D2D2D] font-medium placeholder:text-[#2D2D2D]/40 focus:border-[#E89EB8] transition-all outline-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <button 
                onClick={generateImage}
                disabled={loading}
                className="w-full bg-[#2D2D2D] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <WhiskLoader />
                    <span>Baking Pixels...</span>
                  </>
                ) : "Generate AI Visual"}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {error && <motion.p initial={{opacity:0}} className="mt-4 text-sm text-red-500 font-bold text-center">{error}</motion.p>}
              
              {image && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 pt-8 border-t border-black/5">
                  <div className="relative group cursor-zoom-in overflow-hidden rounded-3xl" onClick={() => setIsFullscreen(true)}>
                    <img src={image} className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" alt="Result" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                       <span className="text-white font-bold text-xs border border-white px-6 py-3 rounded-full uppercase tracking-widest">Enlarge Design</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}?text=Hi Khushi! I've visualized this design: ${image}`, '_blank')}
                    className="mt-4 w-full bg-[#25D366] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Send this idea to Khushi
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-6 backdrop-blur-xl"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.img 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              src={image} className="max-w-5xl max-h-[85vh] w-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- Awwwards Style Kinetic Text ---
const KineticText = ({ text, x, y, mouseX, mouseY, delay }) => (
  <motion.div
    style={{ x: mouseX, y: mouseY, left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
    className="absolute pointer-events-none"
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -15, 0] }}
      transition={{ y: { duration: 5, repeat: Infinity, delay }, opacity: { duration: 2 } }}
      className="text-white font-serif italic text-3xl font-light opacity-80"
    >
      {text}
    </motion.div>
  </motion.div>
);

// --- Whisking SVG Animation ---
const WhiskLoader = () => (
  <motion.svg 
    animate={{ rotate: 360 }}
    transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
    width="24" height="24" viewBox="0 0 24 24" fill="none"
  >
    <path d="M12 2L12 10M12 2C10.5 2 9 3.5 9 5V14C9 16.5 10.5 18 12 18C13.5 18 15 16.5 15 14V5C15 3.5 13.5 2 12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 14C7 16.7614 9.23858 19 12 19C14.7614 19 17 16.7614 17 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 18V22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </motion.svg>
);

export default CustomOrder;