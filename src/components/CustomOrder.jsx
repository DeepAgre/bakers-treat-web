import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomOrder = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('photorealistic, highly detailed');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

    // Primary: Pollinations AI (Direct URL method is most reliable for them)
    const pollinationUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?seed=${seed}&width=1024&height=1024&nologo=true`;

    try {
      // We "ping" the image to see if Pollinations is up
      const imgCheck = new Image();
      imgCheck.src = pollinationUrl;
      
      imgCheck.onload = () => {
        setImage(pollinationUrl);
        setLoading(false);
      };

      imgCheck.onerror = async () => {
        console.log("Pollinations down, trying Hugging Face backup...");
        await tryHuggingFace(fullPrompt);
      };
    } catch (err) {
      await tryHuggingFace(fullPrompt);
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
      
      if (!response.ok) throw new Error("Both AI services are currently busy.");
      
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
      setLoading(false);
    } catch (err) {
      setError("Our AI bakers are resting! Please try again in a minute or chat with Khushi directly.");
      setLoading(false);
    }
  };

  const handleWhatsAppShare = () => {
    const message = `Hi Khushi! I used the AI tool on your site to design this cake: "${prompt}". Check it out: ${image}`;
    window.open(`https://wa.me/${KHUSHI_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section 
      id="custom-studio"
      className="py-24 relative overflow-hidden min-h-screen flex items-center" 
      style={{ backgroundColor: '#E89EB8', color: '#ffffff' }}
    >
      {/* Background Decorative Text */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden">
         <h2 className="text-[30vw] font-serif font-bold text-white leading-none translate-x-1/4">Bakes</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Column: Image Gallery */}
        <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
          <div className="space-y-4 pt-12">
            <motion.img whileHover={{ scale: 1.02 }} src={images.cake1} className="rounded-[2.5rem] w-full h-80 object-cover shadow-2xl border-4 border-white/40" alt="Cake" />
            <motion.img whileHover={{ scale: 1.02 }} src={images.cupcake} className="rounded-[2.5rem] w-full h-64 object-cover shadow-2xl border-4 border-white/40" alt="Cupcake" />
          </div>
          <div className="space-y-4">
            <motion.img whileHover={{ scale: 1.02 }} src={images.box} className="rounded-[2.5rem] w-full h-64 object-cover shadow-2xl border-4 border-white/40" alt="Box" />
            <motion.img whileHover={{ scale: 1.02 }} src={images.pinkCake} className="rounded-[2.5rem] w-full h-80 object-cover shadow-2xl border-4 border-white/40" alt="Pink Cake" />
          </div>
        </div>

        {/* Right Column: AI & Info */}
        <div className="order-1 lg:order-2">
          <span className="uppercase tracking-[0.5em] text-[11px] font-black mb-6 block text-white">
            The Custom Studio
          </span>
          
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight text-white">
            If you can dream it, <br /> we can create it.
          </h2>
          
          <p className="text-xl mb-12 leading-relaxed max-w-lg font-medium text-white/90">
            Khushi Manjrekar specializes in high-detail 3D cakes in Thane. Use our AI tool to visualize your idea, or chat with us directly!
          </p>

          {/* AI Generator Box */}
          <div className="bg-white/20 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/30 shadow-2xl mb-10">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="bg-white text-[#E89EB8] px-2 py-0.5 rounded text-xs uppercase">New</span>
              AI Design Visualizer
            </h4>
            
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Describe your dream cake..."
                className="w-full bg-white/10 border border-white/40 rounded-2xl p-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {['photorealistic', '3d render', 'watercolor', 'minimalist'].map((s) => (
                  <button 
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`whitespace-nowrap text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${style === s ? 'bg-white text-[#E89EB8]' : 'border-white/40 text-white hover:bg-white/10'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button 
                onClick={generateImage}
                disabled={loading}
                className="w-full bg-white py-4 rounded-2xl font-black uppercase tracking-widest text-[#E89EB8] hover:shadow-xl transition-all disabled:opacity-50"
              >
                {loading ? "Whisking up your design..." : "Visualize My Cake"}
              </button>
            </div>

            <AnimatePresence>
              {error && <p className="mt-4 text-sm text-white bg-red-400/40 p-3 rounded-xl border border-red-200/30">{error}</p>}
              
              {image && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6">
                  <img src={image} alt="AI Result" className="w-full h-72 object-cover rounded-3xl border-4 border-white/20 shadow-inner" />
                  <button 
                    onClick={handleWhatsAppShare}
                    className="mt-4 w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:brightness-110"
                  >
                    Send Design to Khushi
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Original Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
             <button 
                onClick={() => window.open(`https://wa.me/${KHUSHI_PHONE}`, '_blank')}
                className="bg-white px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] shadow-2xl transition-transform active:scale-95 text-[12px]"
                style={{ color: '#E89EB8' }}
              >
                Chat with Khushi
              </button>
              <p className="text-white/60 text-sm italic py-4">Direct consultation for complex 3D designs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomOrder;