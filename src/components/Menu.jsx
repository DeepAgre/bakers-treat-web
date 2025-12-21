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
        const productQuery = `*[_type == "product"]{ ..., "categoryName": category->title } | order(_createdAt desc)`;
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
          category: item.categoryName || 'General',
          description: item.description,
          isSoldOut: item.isSoldOut 
        }));

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

  if (loading) return <div className="py-24 text-center font-serif text-gray-400">Loading Delight Bakehouse Menu...</div>;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="menu">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif font-bold mb-4">Our Menu</h2>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all
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
              className={`group ${product.isSoldOut ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-square shadow-lg">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${product.isSoldOut ? 'grayscale opacity-50' : 'group-hover:scale-110'}`} 
                />
                
                {product.isSoldOut && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <span className="bg-white/90 backdrop-blur-sm text-black font-bold px-6 py-2 rounded-full text-xs uppercase tracking-[0.2em]">Sold Out</span>
                  </div>
                )}

                <div className="absolute top-5 right-5 bg-white/90 px-4 py-1.5 rounded-full shadow-sm">
                  <span className="font-bold text-gray-900 font-serif">₹{product.price}</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif font-bold text-gray-800">{product.name}</h3>
                <p className="text-[#E89EB8] uppercase tracking-[0.2em] text-[10px] font-bold mt-1">{product.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Menu;