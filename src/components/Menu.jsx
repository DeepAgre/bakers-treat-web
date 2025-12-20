import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';

const Menu = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = '*[_type == "product"] | order(_createdAt desc)';
        const data = await client.fetch(query);
        
        const formattedData = data.map(item => ({
          id: item._id,
          name: item.name,
          price: item.price,
          img: item.image ? urlFor(item.image).url() : '',
          category: item.category || 'Other',
          description: item.description
        }));
        
        setProducts(formattedData);
        setFilteredProducts(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Sanity fetch error:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. Filter logic when category changes
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => 
        p.category.toLowerCase() === activeCategory.toLowerCase()
      ));
    }
  }, [activeCategory, products]);

  const categories = ['All', 'Cakes', 'Brownies', 'Hampers', 'Cookies'];

  if (loading) return <div className="py-20 text-center font-serif">Mixing the batter...</div>;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="menu">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-serif font-bold mb-6">Our Menu</h2>
        
        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all
                ${activeCategory === cat 
                  ? 'bg-[#E89EB8] text-white shadow-lg' 
                  : 'bg-white text-gray-400 hover:text-gray-900 border border-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((product) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={product.id}
              onClick={() => onProductSelect(product)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-square shadow-md">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                  <span className="font-bold text-gray-900">₹{product.price}</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif font-bold text-gray-800">{product.name}</h3>
                <p className="text-[#E89EB8] uppercase tracking-widest text-[10px] font-bold mt-1">
                  {product.category}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Menu;