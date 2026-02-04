import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';

const Menu = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
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
            img: item.image ? urlFor(item.image).width(600).url() : '',
            category: item.categoryName || 'General',
            description: item.description,
            isSoldOut: item.isSoldOut,
            // LOGIC: Use real order data if it exists, otherwise use hardcoded mock data for your teacher
            totalOrders: item.totalOrders || Math.floor(Math.random() * 100)
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

  // Calculate which items are bestsellers within their specific categories
  const processedProducts = useMemo(() => {
    // 1. Group max order counts by category
    const maxOrdersPerCategory = {};
    
    products.forEach(p => {
      if (!maxOrdersPerCategory[p.category] || p.totalOrders > maxOrdersPerCategory[p.category]) {
        maxOrdersPerCategory[p.category] = p.totalOrders;
      }
    });

    // 2. Mark products as bestsellers if they have the highest orders in their category
    return products.map(p => ({
      ...p,
      isBestSeller: p.totalOrders === maxOrdersPerCategory[p.category] && p.totalOrders > 0
    }));
  }, [products]);

  // Combined Filter and Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = activeCategory === 'All' 
      ? [...processedProducts] 
      : processedProducts.filter(p => p.category === activeCategory);

    if (sortBy === 'lowHigh') {
      result.sort((a, b) => a.displayPrice - b.displayPrice);
    } else if (sortBy === 'highLow') {
      result.sort((a, b) => b.displayPrice - a.displayPrice);
    }

    return result;
  }, [activeCategory, processedProducts, sortBy]);

  if (loading) return (
    <div className="py-60 text-center font-serif text-[#E89EB8] bg-[#0a0a0a] min-h-screen flex items-center justify-center">
      <div className="space-y-4">
        <div className="w-12 h-12 border-2 border-[#E89EB8] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="tracking-[0.5em] uppercase text-[10px] font-bold text-white/40">Curating the Collection...</p>
      </div>
    </div>
  );

  return (
    <section className="relative py-20 sm:py-40 px-6 sm:px-12 bg-[#0a0a0a] overflow-hidden" id="menu">
      
      {/* Background Decor */}
      <div className="hidden md:block absolute inset-0 pointer-events-none select-none opacity-[0.02] overflow-hidden">
        <h2 className="text-[25vw] font-serif font-black absolute -left-20 top-20 whitespace-nowrap text-white">
          THE COLLECTION
        </h2>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* HEADER & FILTERS */}
        <div className="flex flex-col gap-12 mb-16 md:mb-24 border-b border-white/10 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-[#E89EB8]" />
                <span className="text-[#E89EB8] uppercase tracking-[0.6em] text-[10px] font-black">Thane Studio Portfolio</span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-none">
              Explore the <br />
              <span className="italic text-[#E89EB8] font-light">Delight Bakehouse.</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* CATEGORY TABS */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[9px] font-black tracking-widest uppercase transition-all duration-300 border
                    ${activeCategory === cat 
                      ? 'bg-[#E89EB8] text-black border-[#E89EB8]' 
                      : 'bg-transparent text-white/40 border-white/10 hover:border-[#E89EB8]/50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* SORT BUTTON */}
            <div className="flex items-center gap-4">
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Sort by:</span>
               <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#111] text-white text-[10px] font-black uppercase tracking-widest border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#E89EB8]/50 transition-colors cursor-pointer appearance-none"
               >
                 <option value="default">Latest</option>
                 <option value="lowHigh">Price: Low to High</option>
                 <option value="highLow">Price: High to Low</option>
               </select>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence mode='popLayout'>
            {filteredAndSortedProducts.map((product) => (
              <motion.div 
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => !product.isSoldOut && onProductSelect(product)}
                className={`group relative ${product.isSoldOut ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] mb-6 bg-[#111] border border-white/5">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className={`w-full h-full object-cover transition-transform duration-700
                      ${product.isSoldOut ? 'grayscale opacity-30' : 'group-hover:scale-110'}`} 
                  />

                  {/* BEST SELLER TAG */}
                  {product.isBestSeller && !product.isSoldOut && (
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="absolute top-5 left-5 z-20"
                    >
                      <div className="bg-[#E89EB8] text-black text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full flex items-center gap-2 shadow-2xl">
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                        Best Seller
                      </div>
                    </motion.div>
                  )}
                  
                  {product.isSoldOut && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                      <span className="text-white font-black text-[10px] uppercase tracking-[0.4em] border border-white/20 px-6 py-2 rounded-full">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[#E89EB8] uppercase tracking-[0.4em] text-[8px] font-black block">
                        {product.category}
                      </span>
                      <h3 className="text-2xl font-serif text-white group-hover:text-[#E89EB8] transition-colors duration-300 leading-tight">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  {/* PRICE TAG */}
                  {!product.isSoldOut && (
                    <div className="inline-block bg-white/[0.03] border border-white/10 px-4 py-2 rounded-xl group-hover:border-[#E89EB8]/30 transition-colors">
                      <span className="text-[#E89EB8] font-mono text-xl font-bold tracking-tighter drop-shadow-[0_0_8px_rgba(232,158,184,0.3)]">
                        ₹{product.displayPrice}
                      </span>
                      <span className="text-white/20 text-[10px] ml-2 uppercase tracking-widest font-bold">Starting</span>
                    </div>
                  )}

                  <p className="text-white/40 text-[12px] font-light leading-relaxed line-clamp-2 italic">
                    {product.description || `A signature creation from Khushi's Thane studio.`}
                  </p>
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