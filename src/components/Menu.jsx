import React, { useState, useEffect } from 'react';
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
        // UPDATED QUERY: Now specifically fetching the variants array
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
          // LOGIC: Find the lowest price among variants to show on the card
          const prices = item.variants?.map(v => v.price) || [0];
          const minPrice = Math.min(...prices);

          return {
            id: item._id,
            name: item.name,
            displayPrice: minPrice, // Lowest price for the "Starting at" label
            variants: item.variants || [], // Pass all variants to the modal
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
    <div className="py-40 text-center font-serif text-gray-400 animate-pulse">
      Loading Delight Bakehouse Menu...
    </div>
  );

  return (
    <section className="py-20 sm:py-32 px-6 max-w-7xl mx-auto overflow-hidden" id="menu">
      <div className="text-center mb-16 sm:mb-24">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#E89EB8] uppercase tracking-[0.4em] text-[10px] sm:text-[12px] font-black mb-4 block"
        >
          Freshly Baked in Thane
        </motion.span>
        <h2 className="text-4xl sm:text-6xl font-serif font-bold mb-8 text-gray-900">Our Menu</h2>
        
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 sm:px-8 sm:py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300
                ${activeCategory === cat 
                  ? 'bg-[#E89EB8] text-white shadow-lg shadow-[#E89EB8]/20 scale-105' 
                  : 'bg-white text-gray-400 border border-black/5 hover:border-[#E89EB8]/30 hover:text-[#E89EB8]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
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
              <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] aspect-[4/5] shadow-xl mb-8 bg-gray-50">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className={`w-full h-full object-cover object-center transition-transform duration-1000 ease-out 
                    ${product.isSoldOut ? 'grayscale opacity-40' : 'group-hover:scale-110'}`} 
                />
                
                {product.isSoldOut && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                    <span className="bg-white/95 text-black font-black px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] shadow-xl">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>

              <div className="text-center px-4">
                <p className="text-[#E89EB8] uppercase tracking-[0.3em] text-[9px] font-black mb-2">
                  {product.category}
                </p>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:text-[#E89EB8] transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px w-4 bg-gray-200"></div>
                  <p className="text-lg font-bold text-gray-700">
                    {/* UPDATED: Shows "Starting at" for products with multiple sizes */}
                    {product.variants.length > 1 ? 'From ' : ''}₹{product.displayPrice}
                  </p>
                  <div className="h-px w-4 bg-gray-200"></div>
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