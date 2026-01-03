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
      Preparing the Bakers Treat Menu...
    </div>
  );

  return (
    <section className="py-20 sm:py-32 px-6 max-w-7xl mx-auto bg-white" id="menu">
      <div className="text-center mb-16 sm:mb-24">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#E89EB8] uppercase tracking-[0.4em] text-[10px] sm:text-[12px] font-black mb-4 block"
        >
          Freshly Baked in Thane
        </motion.span>
        
        <h2 className="text-4xl sm:text-6xl font-serif font-bold mb-8 text-slate-900">Our Menu</h2>
        
        {/* CATEGORY FILTER: Refined pill design */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 sm:px-8 sm:py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-500
                ${activeCategory === cat 
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105' 
                  : 'bg-slate-50 text-slate-500 border border-slate-100 hover:border-[#E89EB8] hover:text-[#E89EB8]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((product) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              key={product.id}
              onClick={() => !product.isSoldOut && onProductSelect(product)}
              className={`group flex flex-col ${product.isSoldOut ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {/* IMAGE CONTAINER: Smooth overflow hidden */}
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] shadow-[0_20px_40px_rgba(0,0,0,0.08)] mb-8 bg-slate-50 border border-white">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className={`w-full h-full object-cover transition-transform duration-[1500ms] cubic-bezier(0.25, 1, 0.5, 1)
                    ${product.isSoldOut ? 'grayscale opacity-40' : 'group-hover:scale-110'}`} 
                />
                
                {product.isSoldOut && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
                    <span className="bg-white text-slate-900 font-black px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] shadow-lg border border-slate-100">
                      Sold Out
                    </span>
                  </div>
                )}

                {/* Subtle overlay on hover */}
                {!product.isSoldOut && (
                  <div className="absolute inset-0 bg-[#E89EB8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                )}
              </div>

              {/* PRODUCT INFO */}
              <div className="text-center px-4">
                <p className="text-[#E89EB8] uppercase tracking-[0.3em] text-[9px] font-black mb-3 opacity-80">
                  {product.category}
                </p>
                
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-[#E89EB8] transition-colors duration-500">
                  {product.name}
                </h3>

                {/* PRICE DISPLAY: Minimalist line divider */}
                <div className="flex items-center justify-center gap-4">
                  <div className="h-[1px] w-8 bg-slate-100 group-hover:w-12 group-hover:bg-[#E89EB8]/30 transition-all duration-700"></div>
                  <p className="text-lg font-bold text-slate-600">
                    {product.variants.length > 1 ? 'From ' : ''}₹{product.displayPrice}
                  </p>
                  <div className="h-[1px] w-8 bg-slate-100 group-hover:w-12 group-hover:bg-[#E89EB8]/30 transition-all duration-700"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Menu;