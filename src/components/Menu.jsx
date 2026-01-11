import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';

const Menu = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productQuery = `*[_type == "product"]{ 
          ..., 
          "categoryName": category->title,
          variants 
        } | order(_createdAt desc)`;
        
        const categoryQuery = '*[_type == "category"] | order(title asc)';

        const [productData, categoryData] = await Promise.all([
          client.fetch(productQuery),
          client.fetch(categoryQuery)
        ]);

        const formattedProducts = productData.map(item => {
          const prices = item.variants?.map(v => v.price) || [0];
          const minPrice = Math.min(...prices);

          return {
            id: item._id,
            name: item.name,
            displayPrice: minPrice,
            variants: item.variants || [],
            img: item.image ? urlFor(item.image).width(600).url() : '', // Reduced image width for mobile speed
            category: item.categoryName || 'General',
            description: item.description,
            isSoldOut: item.isSoldOut 
          };
        });

        setProducts(formattedProducts);
        setCategories(['All', ...categoryData.map(c => c.title)]);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Optimization: Memoize the filtering to prevent lag during category switches
  const filteredProducts = useMemo(() => {
    return activeCategory === 'All' 
      ? products 
      : products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  if (loading) return (
    <div className="py-60 text-center font-serif text-[#E89EB8] bg-[#0a0a0a] min-h-screen flex items-center justify-center">
      <div className="space-y-4">
        <div className="w-12 h-12 border-2 border-[#E89EB8] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="tracking-[0.5em] uppercase text-[10px] font-bold">Curating the Collection...</p>
      </div>
    </div>
  );

  return (
    <section className="relative py-20 sm:py-40 px-6 sm:px-12 bg-[#0a0a0a] overflow-hidden" id="menu">
      
      {/* BACKGROUND BRANDING - Hidden on mobile to save GPU */}
      <div className="hidden md:block absolute inset-0 pointer-events-none select-none opacity-[0.02] overflow-hidden">
        <h2 className="text-[25vw] font-serif font-black absolute -left-20 top-20 whitespace-nowrap text-white">
          THE COLLECTION
        </h2>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24 border-b border-white/10 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-[#E89EB8]" />
                <span className="text-[#E89EB8] uppercase tracking-[0.6em] text-[10px] font-bold">Thane Studio Portfolio</span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-none">
              Explore the <br />
              <span className="italic text-[#E89EB8] font-light">Delight Bakehouse.</span>
            </h2>
          </div>

          {/* CATEGORY FILTER - Better scroll performance */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 md:px-8 md:py-3 rounded-full text-[9px] md:text-[10px] font-black tracking-widest uppercase transition-all duration-300 border
                  ${activeCategory === cat 
                    ? 'bg-[#E89EB8] text-black border-[#E89EB8]' 
                    : 'bg-transparent text-white/40 border-white/10 hover:border-[#E89EB8]/50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-20">
          <AnimatePresence mode='wait'>
            {filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }} // Capped delay for faster appearance
                onClick={() => !product.isSoldOut && onProductSelect(product)}
                className={`group relative ${product.isSoldOut ? 'cursor-not-allowed' : 'cursor-pointer'} will-change-transform`}
              >
                {/* IMAGE CONTAINER */}
                <div className="relative overflow-hidden rounded-[1.5rem] aspect-[4/5] mb-6 bg-[#111] border border-white/5">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    loading="lazy" // Critical for mobile performance
                    className={`w-full h-full object-cover transition-transform duration-700
                      ${product.isSoldOut ? 'grayscale opacity-30' : 'group-hover:scale-105'}`} 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {product.isSoldOut && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/40 font-bold text-[9px] uppercase tracking-[0.4em] border border-white/10 px-5 py-2 rounded-full bg-black/20 backdrop-blur-sm">
                        Vaulted
                      </span>
                    </div>
                  )}
                </div>

                {/* PRODUCT INFO AREA */}
                <div className="space-y-3 px-1">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[#E89EB8] uppercase tracking-[0.4em] text-[8px] font-bold block">
                        {product.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-[#E89EB8] transition-colors duration-300">
                        {product.name}
                      </h3>
                    </div>

                    {!product.isSoldOut && (
                      <div className="text-right">
                        <span className="text-white font-mono text-sm tracking-tighter">
                          ₹{product.displayPrice}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-white/30 text-[11px] font-light leading-relaxed line-clamp-2">
                    {product.description || "A signature creation from Khushi's Thane studio."}
                  </p>

                  {/* HOVER INDICATOR - Hidden on Mobile for speed */}
                  <div className="hidden md:flex pt-2 items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                     <span className="text-[9px] text-white uppercase tracking-[0.2em] font-black">Details</span>
                     <div className="h-[1px] flex-grow bg-[#E89EB8]/30" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Menu;