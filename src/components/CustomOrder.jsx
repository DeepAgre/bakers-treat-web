import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';

// Separate Memoized Background to prevent re-renders when the user types
const KineticBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.02] will-change-transform">
    <motion.div 
      animate={{ x: [0, -1000] }} 
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="text-[200px] md:text-[300px] font-serif font-black text-white whitespace-nowrap"
      style={{ translateZ: 0 }}
    >
      Bakers Treat • ARCHITECTURAL CAKERY • THANE STUDIO • 
    </motion.div>
  </div>
));

const CustomOrder = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const KHUSHI_PHONE = "919136371662";

  // --- Optimized 3D Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { damping: 40, stiffness: 250 });
  const mouseY = useSpring(y, { damping: 40, stiffness: 250 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    // Normalize values between -0.5 and 0.5
    x.set((mouseXPos / width) - 0.5);
    y.set((mouseYPos / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const generateImage = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    
    const fullPrompt = `Architectural luxury cake, ${prompt}, high-end food photography, dark moody lighting, sharp focus, 8k, professional pâtisserie style`;
    const seed = Math.floor(Math.random() * 99999);
    const pollinationUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?seed=${seed}&width=1024&height=1024&nologo=true`;

    const img = new Image();
    img.src = pollinationUrl;
    img.onload = () => {
      setImage(pollinationUrl);
      setLoading(false);
    };
    img.onerror = () => setLoading(false);
  };

  return (
    <section id="custom" className="py-24 sm:py-32 relative overflow-hidden min-h-screen flex items-center bg-[#080808]">
      
      <KineticBackground />

      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-[#E89EB8]" />
                <span className="text-[#E89EB8] uppercase tracking-[0.6em] text-[9px] font-black">The Commission Studio</span>
            </div>
            <h2 className="text-6xl md:text-[9rem] font-serif text-white leading-[0.85] tracking-tighter">
              Dream in <br/>
              <span className="italic text-[#E89EB8] font-light text-[0.9em]">Sugar.</span>
            </h2>
          </motion.div>

          <motion.div 
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative group will-change-transform"
          >
            <button 
              onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}?text=Hi Khushi! I want to discuss a custom Bakers Treat order.`, '_blank')}
              className="w-full max-w-2xl bg-[#111] hover:bg-[#151515] border border-white/10 rounded-[2rem] p-10 md:p-14 text-left transition-colors duration-500 shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#25D366] rounded-full" />
                    <span className="text-white/40 text-[9px] uppercase tracking-widest font-black">Direct Inquiry</span>
                  </div>
                  <h3 className="text-white text-4xl md:text-5xl font-serif italic">Consult with Khushi</h3>
                  <p className="text-white/30 text-[11px] font-light max-w-xs uppercase tracking-[0.2em] leading-relaxed">Blueprints, flavors, and delivery in Thane.</p>
                </div>
                <div className="h-16 w-16 rounded-full border border-[#E89EB8]/30 flex items-center justify-center group-hover:bg-[#E89EB8] transition-all duration-300">
                  <span className="text-[#E89EB8] group-hover:text-black text-2xl transition-colors">→</span>
                </div>
              </div>
              
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#E89EB8]/5 rounded-full blur-3xl pointer-events-none" />
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: AI VISUALIZER */}
        <div className="lg:col-span-5">
          <div className="bg-white/5 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-3xl">
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-white font-serif text-2xl italic">The Visualizer</h4>
                <p className="text-white/20 text-[9px] uppercase tracking-[0.2em]">Concept sketch by AI</p>
              </div>

              <input 
                type="text" 
                placeholder="Describe your cake..."
                className="w-full bg-black/40 border border-white/5 rounded-xl p-5 text-white placeholder:text-white/10 focus:border-[#E89EB8]/40 transition-all outline-none text-sm"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <button 
                onClick={generateImage}
                disabled={loading}
                className="w-full py-5 bg-white text-black rounded-xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#E89EB8] active:scale-[0.98] transition-all disabled:opacity-30"
              >
                {loading ? "Constructing..." : "Initialize Design"}
              </button>

              <AnimatePresence mode="wait">
                {image && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="space-y-4 pt-6 border-t border-white/5"
                  >
                    <div 
                      className="relative rounded-xl overflow-hidden cursor-zoom-in aspect-square border border-white/5"
                      onClick={() => setIsFullscreen(true)}
                    >
                      <img src={image} className="w-full h-full object-cover" alt="AI Preview" loading="lazy" />
                    </div>
                    
                    <button 
                      onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}?text=Hi Khushi! I've visualized this Bakers Treat concept: ${image}`, '_blank')}
                      className="w-full py-3 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-lg font-bold uppercase tracking-widest text-[8px] hover:bg-[#25D366] hover:text-white transition-all"
                    >
                      Send to Studio
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN PREVIEW */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-6 backdrop-blur-md"
            onClick={() => setIsFullscreen(false)}
          >
            <img src={image} className="max-w-4xl max-h-[85vh] w-full object-contain rounded-lg" alt="Full view" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
};

export default memo(CustomOrder);