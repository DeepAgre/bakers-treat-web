import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';

const CustomOrder = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const KHUSHI_PHONE = "919136371662";

  // --- Magnetic & 3D Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { damping: 30, stiffness: 200 });
  const mouseY = useSpring(y, { damping: 30, stiffness: 200 });

  const rotateX = useTransform(mouseY, [-20, 20], [10, -10]);
  const rotateY = useTransform(mouseX, [-20, 20], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      x.set((e.clientX - centerX) / 30);
      y.set((e.clientY - centerY) / 30);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    setError('');
    
    const fullPrompt = `Architectural luxury cake, ${prompt}, high-end food photography, dark moody lighting, sharp focus, 8k, professional pâtisserie style`;
    const seed = Math.floor(Math.random() * 99999);
    const pollinationUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?seed=${seed}&width=1024&height=1024&nologo=true`;

    try {
      const imgCheck = new Image();
      imgCheck.src = pollinationUrl;
      imgCheck.onload = () => { setImage(pollinationUrl); setLoading(false); };
      imgCheck.onerror = () => { setError("Studio is busy. Try again."); setLoading(false); };
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <section id="custom-studio" className="py-32 relative overflow-hidden min-h-screen flex items-center bg-[#080808]">
      
      {/* 1. KINETIC BACKGROUND TYPOGRAPHY */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <motion.div 
          animate={{ x: [0, -1500] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="text-[300px] font-serif font-black text-white whitespace-nowrap"
        >
          BAKERS TREAT • ARCHITECTURAL CAKERY • THANE STUDIO • 
        </motion.div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: THE BRAND STATEMENT */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-[#E89EB8]" />
                <span className="text-[#E89EB8] uppercase tracking-[0.8em] text-[10px] font-bold">The Commission Studio</span>
            </div>
            <h2 className="text-7xl md:text-[10rem] font-serif text-white leading-[0.8] tracking-tighter">
              Dream in <br/>
              <span className="italic text-[#E89EB8] font-light text-[0.9em]">Sugar.</span>
            </h2>
          </motion.div>

          {/* MAIN WHATSAPP CALL TO ACTION */}
          <motion.div 
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="relative group"
          >
            <button 
              onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}?text=Hi Khushi! I want to discuss a custom Bakers Treat order.`, '_blank')}
              className="w-full max-w-2xl bg-[#111] hover:bg-[#151515] border border-white/10 rounded-[2rem] p-10 md:p-16 text-left transition-all duration-500 shadow-2xl relative overflow-hidden group"
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Direct Inquiry</span>
                  </div>
                  <h3 className="text-white text-4xl md:text-5xl font-serif italic">Consult with Khushi</h3>
                  <p className="text-white/40 text-sm font-light max-w-xs uppercase tracking-widest leading-loose">Discuss flavors, blueprints, and delivery in Thane.</p>
                </div>
                <div className="h-20 w-20 rounded-full border border-[#E89EB8]/30 flex items-center justify-center group-hover:bg-[#E89EB8] group-hover:border-[#E89EB8] transition-all duration-700">
                  <span className="text-[#E89EB8] group-hover:text-black text-3xl transition-colors">→</span>
                </div>
              </div>
              
              {/* Abstract Shape Overlay */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#E89EB8]/5 rounded-full blur-3xl group-hover:bg-[#E89EB8]/10 transition-colors" />
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: THE AI VISUALIZER */}
        <div className="lg:col-span-5 relative">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-3xl"
          >
            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-white font-serif text-2xl italic">The Visualizer</h4>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Generate a concept sketch using AI</p>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. A black velvet cake with gold marble..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/20 focus:border-[#E89EB8]/50 transition-all outline-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <button 
                onClick={generateImage}
                disabled={loading}
                className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#E89EB8] transition-all duration-500 disabled:opacity-50"
              >
                {loading ? "Constructing Concept..." : "Initialize Design"}
              </button>

              <AnimatePresence mode="wait">
                {image && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="space-y-6 pt-6 border-t border-white/5"
                  >
                    <div 
                      className="relative rounded-2xl overflow-hidden cursor-zoom-in aspect-square border border-white/10"
                      onClick={() => setIsFullscreen(true)}
                    >
                      <img src={image} className="w-full h-full object-cover" alt="AI Preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                         <span className="text-white text-[10px] uppercase tracking-widest border border-white/40 px-6 py-2 rounded-full">Enlarge</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}?text=Hi Khushi! I've visualized this Bakers Treat concept: ${image}`, '_blank')}
                      className="w-full py-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-[#25D366] hover:text-white transition-all"
                    >
                      Send Concept to Studio
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Floating Decorative Label */}
          <div className="absolute -top-6 -right-6 h-24 w-24 bg-[#E89EB8] rounded-full flex items-center justify-center rotate-12 shadow-2xl hidden md:flex">
             <p className="text-black font-black text-[10px] uppercase tracking-tighter text-center leading-tight">Bespoke<br/>Only</p>
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
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              src={image} className="max-w-4xl max-h-[80vh] w-full object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* NOISE TEXTURE */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
};

export default CustomOrder;