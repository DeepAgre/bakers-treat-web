import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';

const Menu = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
            img: item.image ? urlFor(item.image).url() : '',
            category: item.categoryName || 'General',
            description: item.description,
            isSoldOut: item.isSoldOut 
          };
        });

        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
        setCategories(['All', ...categoryData.map(c => c.title)]);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  if (loading) return (
    <div className="py-60 text-center font-serif text-[#E89EB8] animate-pulse bg-[#0a0a0a] min-h-screen flex items-center justify-center">
      <div className="space-y-4">
        <div className="w-12 h-12 border-2 border-[#E89EB8] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="tracking-[0.5em] uppercase text-[10px] font-bold">Curating the Collection...</p>
      </div>
    </div>
  );

  return (
    <section className="relative py-24 sm:py-40 px-6 sm:px-12 bg-[#0a0a0a] overflow-hidden" id="menu">
      
      {/* BACKGROUND BRANDING */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.02] overflow-hidden">
        <h2 className="text-[25vw] font-serif font-black absolute -left-20 top-20 whitespace-nowrap text-white">
          THE COLLECTION
        </h2>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 border-b border-white/10 pb-16">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
                <div className="h-[1px] w-12 bg-[#E89EB8]" />
                <span className="text-[#E89EB8] uppercase tracking-[0.6em] text-[10px] font-bold">Thane Studio Portfolio</span>
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none">
              Explore the <br />
              <span className="italic text-[#E89EB8] font-light">Delight Bakehouse.</span>
            </h2>
          </div>

          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-700 border
                  ${activeCategory === cat 
                    ? 'bg-[#E89EB8] text-black border-[#E89EB8] shadow-2xl shadow-[#E89EB8]/20' 
                    : 'bg-transparent text-white/40 border-white/10 hover:border-[#E89EB8]/50 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                key={product.id}
                onClick={() => !product.isSoldOut && onProductSelect(product)}
                className={`group relative ${product.isSoldOut ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {/* IMAGE CONTAINER */}
                <div className="relative overflow-hidden rounded-[1.5rem] aspect-[4/5] mb-8 bg-[#111] border border-white/5 shadow-2xl shadow-black/50">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className={`w-full h-full object-cover transition-all duration-[1500ms] ease-out
                      ${product.isSoldOut ? 'grayscale contrast-125 opacity-30' : 'group-hover:scale-110 group-hover:grayscale-[20%]'}`} 
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                  {product.isSoldOut && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/40 font-bold text-[10px] uppercase tracking-[0.5em] border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
                        Vaulted
                      </span>
                    </div>
                  )}
                </div>

                {/* PRODUCT INFO AREA */}
                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[#E89EB8] uppercase tracking-[0.4em] text-[9px] font-bold block mb-2">
                        {product.category}
                      </span>
                      <h3 className="text-2xl font-serif text-white group-hover:italic transition-all duration-500">
                        {product.name}
                      </h3>
                    </div>

                    {/* PRICE PLACED BELOW IMAGE, NEXT TO TITLE */}
                    {!product.isSoldOut && (
                      <div className="text-right">
                        <span className="text-white font-mono text-sm tracking-tighter">
                          ₹{product.displayPrice}
                          <span className="text-[10px] opacity-30 ml-0.5">+</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-white/30 text-xs font-light leading-relaxed line-clamp-2 group-hover:text-white/60 transition-colors">
                    {product.description || "A signature architectural creation from the Delight Bakehouse Thane studio."}
                  </p>

                  {/* HOVER INTERACTION INDICATOR */}
                  <div className="pt-2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                     <span className="text-[10px] text-white uppercase tracking-[0.3em] font-black">View Details</span>
                     <div className="h-[1px] flex-grow bg-gradient-to-r from-[#E89EB8] to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* TEXTURE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
};

export default Menu;