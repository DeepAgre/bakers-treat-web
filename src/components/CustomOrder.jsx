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

  // Rotate card based on mouse
  const rotateX = useTransform(mouseY, [-20, 20], [10, -10]);
  const rotateY = useTransform(mouseX, [-20, 20], [-10, 10]);

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

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `Custom-Cake-Design.png`;
    link.click();
  };

  return (
    <section id="custom-studio" className="py-24 relative overflow-hidden min-h-screen flex items-center bg-[#E89EB8]">
      
      {/* BACKGROUND FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 rounded-full blur-xl"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              x: mouseX,
              y: mouseY,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: INTERACTIVE 3D BAKERY ANIMATION */}
        <div className="relative h-[600px] hidden lg:flex items-center justify-center order-2 lg:order-1">
          <motion.div 
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Spinning Dashed Ring */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[500px] h-[500px] border-2 border-white/20 rounded-full border-dashed"
            />

            {/* Central 3D Card */}
            <motion.div 
              className="bg-white/10 backdrop-blur-2xl p-16 rounded-[4rem] border border-white/40 shadow-2xl relative z-20 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-white text-9xl font-serif font-black opacity-10 absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                CAKE
              </h3>
              <div className="text-white space-y-6 relative z-10">
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-1 bg-white mx-auto rounded-full" 
                />
                <h4 className="text-6xl font-serif font-bold italic tracking-tighter leading-none">
                  Bakers <br/> Treat
                </h4>
                <p className="text-sm uppercase tracking-[0.8em] opacity-80 font-black">Studio / Thane</p>
              </div>
            </motion.div>

            {/* Floating Bakery Icons (Animated) */}
            <FloatingIcon icon="🎂" delay={0} x={-200} y={-150} mouseX={mouseX} mouseY={mouseY} />
            <FloatingIcon icon="🥣" delay={1} x={220} y={-100} mouseX={mouseX} mouseY={mouseY} />
            <FloatingIcon icon="🧁" delay={2} x={-180} y={180} mouseX={mouseX} mouseY={mouseY} />
            <FloatingIcon icon="✨" delay={1.5} x={200} y={150} mouseX={mouseX} mouseY={mouseY} />
            <FloatingIcon icon="❤️" delay={0.5} x={0} y={-240} mouseX={mouseX} mouseY={mouseY} />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: AI GENERATOR */}
        <div className="order-1 lg:order-2">
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-[0.9] text-white"
          >
            Customised <br/> Cakes.
          </motion.h2>
          
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
              
              <div className="p-4 bg-[#E89EB8]/10 rounded-2xl border border-[#E89EB8]/20">
                <p className="text-[12px] text-[#2D2D2D]/70 italic leading-relaxed">
                  💡 <strong>PRO TIP:</strong> Describe the object directly (e.g. "Ferrari car"). 
                  Our AI is trained to visualize objects as edible art. Don't add "cake".
                </p>
              </div>

              <button 
                onClick={generateImage}
                disabled={loading}
                className="w-full bg-[#2D2D2D] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 active:scale-[0.98] shadow-lg"
              >
                {loading ? "Whisking up pixels..." : "Visualize My Design"}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {error && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="mt-4 text-sm text-red-500 font-bold text-center">{error}</motion.p>}
              
              {image && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 pt-8 border-t border-black/5">
                  <div className="relative group cursor-zoom-in overflow-hidden rounded-3xl" onClick={() => setIsFullscreen(true)}>
                    <img src={image} className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" alt="Result" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <span className="text-white font-bold text-xs border border-white px-4 py-2 rounded-full uppercase tracking-widest">View Fullscreen</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button onClick={downloadImage} className="bg-white border-2 border-[#2D2D2D] text-[#2D2D2D] py-4 rounded-2xl font-bold text-sm hover:bg-[#f8f8f8] transition-all">
                      Save Design
                    </button>
                    <button 
                      onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}?text=Hi Khushi! I've designed a custom cake. Sending you the image now!`, '_blank')}
                      className="bg-[#25D366] text-white py-4 rounded-2xl font-bold text-sm hover:brightness-110 flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      Share with Khushi
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button 
            whileHover={{ x: 10 }}
            onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}`, '_blank')}
            className="mt-10 flex items-center gap-6 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full border border-white/30 backdrop-blur-md transition-all group"
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
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-6 backdrop-blur-xl"
            onClick={() => setIsFullscreen(false)}
          >
            <button className="absolute top-10 right-10 text-white text-5xl font-light hover:rotate-90 transition-transform">&times;</button>
            <motion.img 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              src={image} className="max-w-5xl max-h-[85vh] w-full object-contain rounded-3xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Helper component for floating elements
const FloatingIcon = ({ icon, delay, x, y, mouseX, mouseY }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: 1,
      y: [y, y - 20, y],
    }}
    transition={{ 
      y: { duration: 4, repeat: Infinity, delay },
      opacity: { duration: 1 }
    }}
    style={{ x: mouseX, y: mouseY, left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
    className="absolute text-4xl pointer-events-none drop-shadow-lg"
  >
    {icon}
  </motion.div>
);

export default CustomOrder;