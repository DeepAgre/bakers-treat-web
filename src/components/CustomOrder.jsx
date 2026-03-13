import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiPairing, setAiPairing] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const generateConcept = async () => {

    if (!prompt || loading) return;

    setLoading(true);
    setImage(null);
    setAiPairing(null);
    setImageLoaded(false);

    try {

      /* TEXT GENERATION */

      const textRes = await fetch(
        `https://text.pollinations.ai/${encodeURIComponent(
          `You are Chef Khushi. Create 1 unique gourmet cake flavor and 1 logical reason why it fits the theme "${prompt}". Return ONLY in this format: Flavor: [Name] | Reason: [Why it fits]`
        )}?model=openai&cache=false`
      );

      const textData = await textRes.text();

      if (textData && !textData.includes("<!DOCTYPE html>")) {

        const cleanData = textData.replace(/^(AI:|Chef:|Response:)/i, "").trim();

        const [flavor, reason] = cleanData
          .replace("Flavor:", "")
          .split("| Reason:");

        if (flavor && reason) {

          setAiPairing({
            combo: flavor.trim(),
            reason: reason.trim()
          });

        }
      }

      /* IMAGE GENERATION */

      const imagePrompt = encodeURIComponent(
        `luxury designer cake, modern pastry art, premium bakery photography, hyper realistic frosting texture, dramatic studio lighting, edible sculpture cake inspired by ${prompt}`
      );

      const imageUrl =
        `https://image.pollinations.ai/prompt/${imagePrompt}?width=1024&height=1280&seed=${Date.now()}&model=flux`;

      setImage(imageUrl);

    } catch (error) {

      console.error("AI Generation Error:", error);

    } finally {

      setLoading(false);

    }

  };

  const handleConsultation = () => {

    const message =
      `Hi Khushi, I'm interested in a custom ${prompt || "bespoke"} cake from Delight Bakehouse!`;

    window.open(
      `https://wa.me/919833503525?text=${encodeURIComponent(message)}`,
      "_blank"
    );

  };

  return (

    <section className="py-24 relative overflow-hidden min-h-screen bg-[#080808] text-white font-sans">

      <KineticBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HERO SECTION */}

        <div className="mb-32 flex flex-col items-start max-w-5xl">

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#E89EB8] uppercase tracking-[0.5em] text-[10px] font-black mb-6"
          >
            Custom Cake Studio
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif leading-[0.9] mb-10"
          >
            Design Your <br /> Dream Cake
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-xl md:text-2xl max-w-3xl mb-12 leading-relaxed"
          >
            Tell us your theme and our AI will generate a unique cake flavor
            and design concept for you.
          </motion.p>

          <motion.button
            onClick={handleConsultation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-16 py-6 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#E89EB8] transition-all shadow-2xl"
          >
            Chat With Baker
          </motion.button>

        </div>

        <div className="w-full h-px bg-white/10 mb-32" />

        {/* AI LAB */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* LEFT SIDE */}

          <div className="space-y-12">

            <div>

              <h3 className="text-4xl font-serif mb-6 text-[#E89EB8]">
                AI Cake Idea Generator
              </h3>

              <p className="text-white/40 text-lg leading-relaxed max-w-lg">
                Enter any theme and instantly generate a cake idea with flavor
                pairing and visual concept.
              </p>

            </div>

            <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[3rem] space-y-8 backdrop-blur-sm">

              <input
                className="w-full bg-black/40 border border-white/10 p-7 rounded-2xl outline-none focus:border-[#E89EB8]"
                placeholder="Example: Cyberpunk, Space Galaxy, Marble Gold..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <button
                onClick={generateConcept}
                disabled={loading}
                className="w-full border border-[#E89EB8] text-[#E89EB8] py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-[#E89EB8] hover:text-black transition-all disabled:opacity-30"
              >
                {loading ? "Generating Cake Idea..." : "Generate Cake Idea"}
              </button>

            </div>

            <AnimatePresence>

              {aiPairing && (

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-10 bg-white/[0.02] border-l-4 border-[#E89EB8]"
                >

                  <div className="text-4xl font-serif mb-4">
                    {aiPairing.combo}
                  </div>

                  <p className="text-white/40 italic">
                    {aiPairing.reason}
                  </p>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

          {/* RIGHT SIDE IMAGE */}

          <div className="relative">

            <div className="sticky top-10">

              <AnimatePresence mode="wait">

                {loading ? (

                  <motion.div
                    key="loader"
                    className="aspect-[4/5] bg-white/[0.02] border border-white/10 rounded-[3rem] flex items-center justify-center"
                  >
                    <div className="w-16 h-16 border-t-2 border-[#E89EB8] rounded-full animate-spin"/>
                  </motion.div>

                ) : image ? (

                  <motion.img
                    key={image}
                    src={image}
                    loading="eager"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImage(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imageLoaded ? 1 : 0 }}
                    className="rounded-[3rem] w-full aspect-[4/5] object-cover border border-white/10"
                    alt="AI Cake Concept"
                  />

                ) : (

                  <div className="aspect-[4/5] border border-dashed border-white/10 rounded-[3rem] flex items-center justify-center text-white/20">
                    AI Cake Preview
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