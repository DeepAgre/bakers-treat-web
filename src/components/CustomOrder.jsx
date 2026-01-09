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
      
      {/* KINETIC BACKGROUND TEXT (Awwwards Style) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-20">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-[200px] font-serif font-black text-white whitespace-nowrap"
        >
          CUSTOM ORDER • ARTISAN BAKING • BESPOKE DESIGNS • 
        </motion.div>
        <motion.div 
          animate={{ x: [-1000, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="text-[200px] font-serif font-black text-white whitespace-nowrap"
        >
          WHISK • BAKE • FROST • REPEAT • 
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: KINETIC 3D ELEMENT FIELD */}
        <div className="relative h-[600px] hidden lg:flex items-center justify-center order-2 lg:order-1">
          <motion.div 
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Morphing Background Liquid */}
            <motion.div 
              animate={{ 
                borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 70%", "60% 40% 30% 70% / 50% 30% 70% 50%"],
                rotate: [0, 90]
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
              className="absolute w-[550px] h-[550px] bg-white/10 backdrop-blur-3xl border border-white/20"
            />

            {/* Central Awwwards Branding Card */}
            <motion.div 
              className="bg-white/20 backdrop-blur-md p-16 rounded-2xl border border-white/30 shadow-2xl relative z-20 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-white space-y-4">
                <span className="text-[10px] uppercase tracking-[0.8em] font-black block opacity-60">Thane, India</span>
                <h4 className="text-7xl font-serif font-bold italic tracking-tighter leading-tight">
                  Delight <br/> Bakehouse
                </h4>
                <div className="flex justify-center gap-2 pt-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Kinetic Text Elements */}
            <KineticText text="Artisan" x={-220} y={-180} mouseX={mouseX} mouseY={mouseY} delay={0} />
            <KineticText text="Bespoke" x={240} y={-120} mouseX={mouseX} mouseY={mouseY} delay={1} />
            <KineticText text="Est. 2024" x={-180} y={150} mouseX={mouseX} mouseY={mouseY} delay={2} />
            <KineticText text="Premium" x={200} y={180} mouseX={mouseX} mouseY={mouseY} delay={0.5} />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: AI GENERATOR */}
        <div className="order-1 lg:order-2">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-[0.9] text-white">
              Customised <br/> Cakes.
            </h2>
          </motion.div>
          
          <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50">
            <h4 className="text-xl font-bold mb-6 text-[#2D2D2D] flex items-center gap-3">
               <span className="w-2 h-2 bg-[#E89EB8] rounded-full animate-pulse" />
               AI Design Visualizer
            </h4>

            <div className="space-y-5">
              <input 
                type="text" 
                placeholder="Describe your vision (e.g. A Vintage Camera)"
                className="w-full bg-[#f8f8f8] border-2 border-transparent rounded-2xl p-5 text-[#2D2D2D] font-medium placeholder:text-[#2D2D2D]/40 focus:border-[#E89EB8] transition-all outline-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <button 
                onClick={generateImage}
                disabled={loading}
                className="w-full bg-[#2D2D2D] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 active:scale-[0.98] shadow-lg flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <WhiskLoader />
                    <span>Whisking Up...</span>
                  </>
                ) : "Visualize My Design"}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {error && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="mt-4 text-sm text-red-500 font-bold text-center">{error}</motion.p>}
              
              {image && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 pt-8 border-t border-black/5">
                  <div className="relative group cursor-zoom-in overflow-hidden rounded-3xl" onClick={() => setIsFullscreen(true)}>
                    <img src={image} className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" alt="Result" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <span className="text-white font-bold text-xs border border-white px-4 py-2 rounded-full uppercase tracking-widest">Fullscreen View</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}?text=Hi Khushi! I've designed a custom cake design on your website. View it here: ${image}`, '_blank')}
                    className="mt-4 w-full bg-[#25D366] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Send Design to Khushi
                  </button>
                  <p className="text-[10px] text-center mt-4 text-[#2D2D2D]/40 uppercase font-black tracking-widest">Design shared as a live design link</p>
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
            <motion.button whileHover={{rotate: 90}} className="absolute top-10 right-10 text-white text-5xl font-light">&times;</motion.button>
            <motion.img 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              src={image} className="max-w-5xl max-h-[85vh] w-full object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- Awwwards Style Kinetic Text Component ---
const KineticText = ({ text, x, y, mouseX, mouseY, delay }) => (
  <motion.div
    style={{ x: mouseX, y: mouseY, left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
    className="absolute pointer-events-none"
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{ y: { duration: 4, repeat: Infinity, delay }, opacity: { duration: 1.5 } }}
      className="text-white font-serif italic text-2xl font-light border-b border-white/20 pb-1"
    >
      {text}
    </motion.div>
  </motion.div>
);

// --- Custom Whisking SVG Loader ---
const WhiskLoader = () => (
  <motion.svg 
    animate={{ rotate: 360 }}
    transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C10.34 2 9 3.34 9 5V13.38C7.24 14.19 6 15.95 6 18C6 20.21 7.79 22 10 22C11.66 22 13 20.66 13 19V5C13 3.34 11.66 2 10 2Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 13.38C16.76 14.19 18 15.95 18 18C18 20.21 16.21 22 14 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </motion.svg>
);

export default CustomOrder;