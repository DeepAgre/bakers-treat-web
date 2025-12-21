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
        // Fetch BOTH products (with category titles) and all categories
        const productQuery = `*[_type == "product"]{
          ...,
          "categoryName": category->title 
        } | order(_createdAt desc)`;
        
        const categoryQuery = '*[_type == "category"] | order(title asc)';

        const [productData, categoryData] = await Promise.all([
          client.fetch(productQuery),
          client.fetch(categoryQuery)
        ]);

        const formattedProducts = productData.map(item => ({
          id: item._id,
          name: item.name,
          price: item.price,
          img: item.image ? urlFor(item.image).url() : '',
          category: item.categoryName || 'Uncategorized',
          description: item.description,
          isSoldOut: item.isSoldOut // Added the Sold Out flag
        }));

        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
        // Map the categories from Sanity
        setCategories(['All', ...categoryData.map(c => c.title)]);
        setLoading(false);
      } catch (error) {
        console.error("Data fetch error:", error);
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

  if (loading) return <div className="py-20 text-center">Loading the menu...</div>;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="menu">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-serif font-bold mb-8">Our Menu</h2>
        
        {/* Dynamic Category Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all
                ${activeCategory === cat ? 'bg-[#E89EB8] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((product) => (
            <motion.div 
              layout
              key={product.id}
              onClick={() => !product.isSoldOut && onProductSelect(product)}
              className={`group relative ${product.isSoldOut ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-square shadow-lg">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${product.isSoldOut ? 'grayscale opacity-60' : 'group-hover:scale-110'}`} 
                />
                
                {/* Sold Out Badge */}
                {product.isSoldOut && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="bg-white text-black font-bold px-6 py-2 rounded-full text-sm uppercase tracking-widest shadow-xl">
                      Sold Out
                    </span>
                  </div>
                )}

                <div className="absolute top-5 right-5 bg-white/90 px-4 py-1.5 rounded-full">
                  <span className="font-bold">₹{product.price}</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif font-bold">{product.name}</h3>
                <p className="text-[#E89EB8] text-[10px] font-bold uppercase tracking-widest mt-1">{product.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Menu;