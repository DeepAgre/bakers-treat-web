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
    <div className="py-40 text-center font-serif text-slate-400 animate-pulse bg-white">
      Preparing the Delight Bakehouse Menu...
    </div>
  );

  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-10 bg-white overflow-hidden" id="menu">
      
      {/* CREATIVE ELEMENT: Subtle background text/motif to fill space */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <h2 className="text-[20vw] font-serif font-bold absolute -left-20 top-40 rotate-90 whitespace-nowrap text-slate-900">
          Delight Bakehouse
        </h2>
        <h2 className="text-[20vw] font-serif font-bold absolute -right-20 bottom-40 -rotate-90 whitespace-nowrap text-slate-900">
          HANDCRAFTED
        </h2>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="text-center mb-16 sm:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#E89EB8] uppercase tracking-[0.4em] text-[10px] sm:text-[12px] font-black mb-4 block"
          >
            Freshly Baked in Thane
          </motion.span>
          
          <h2 className="text-5xl sm:text-7xl font-serif font-bold mb-8 text-slate-900 tracking-tight">Our Menu</h2>
          
          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 sm:px-8 sm:py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-500
                  ${activeCategory === cat 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-400 scale-105' 
                    : 'bg-slate-50 text-slate-400 border border-slate-100 hover:border-[#E89EB8] hover:text-[#E89EB8] hover:bg-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* UPDATED GRID: grid-cols-4 for full look */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                key={product.id}
                onClick={() => !product.isSoldOut && onProductSelect(product)}
                className={`group flex flex-col ${product.isSoldOut ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {/* IMAGE CONTAINER: Aspect-square for modern gallery feel */}
                <div className="relative overflow-hidden rounded-[2rem] aspect-square shadow-[0_15px_35px_rgba(0,0,0,0.06)] mb-6 bg-slate-50 border border-slate-100">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className={`w-full h-full object-cover transition-transform duration-[1200ms]
                      ${product.isSoldOut ? 'grayscale opacity-40' : 'group-hover:scale-110'}`} 
                  />
                  
                  {product.isSoldOut && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
                      <span className="bg-white text-slate-900 font-black px-5 py-2 rounded-full text-[9px] uppercase tracking-[0.2em] shadow-lg border border-slate-100">
                        Sold Out
                      </span>
                    </div>
                  )}

                  {/* Hover Floating Badge */}
                  {!product.isSoldOut && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-[#E89EB8]" viewBox="0 0 16 16">
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                            </svg>
                        </div>
                    </div>
                  )}
                </div>

                {/* PRODUCT INFO */}
                <div className="text-center px-2">
                  <p className="text-[#E89EB8] uppercase tracking-[0.2em] text-[8px] font-black mb-2 opacity-70">
                    {product.category}
                  </p>
                  
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 group-hover:text-[#E89EB8] transition-colors duration-300">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-center gap-3">
                    <span className="text-sm font-bold text-slate-500">
                      {product.variants.length > 1 ? 'From ' : ''}₹{product.displayPrice}
                    </span>
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