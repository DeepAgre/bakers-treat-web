import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';

const Menu = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetching directly from your Sanity Project
        const query = '*[_type == "product"] | order(_createdAt desc)';
        const data = await client.fetch(query);
        
        const formattedData = data.map(item => ({
          id: item._id,
          name: item.name || 'Untitled Bake',
          // Keep price as a string/number, we will format it in the UI
          price: item.price || '0',
          img: item.image ? urlFor(item.image).url() : 'https://via.placeholder.com/500',
          category: item.category || 'General',
          description: item.description || 'No description provided.'
        }));
        
        setProducts(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching from Sanity:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center font-serif text-xl animate-pulse">
        Mixing the batter... Loading Khushi's latest treats
      </div>
    );
  }

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="menu">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif font-bold mb-4">Our Menu</h2>
        <p className="text-gray-500 italic">Freshly baked in Thane by Khushi Manjrekar</p>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No products found. Make sure to click "Publish" in Sanity!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => onProductSelect(product)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-square shadow-lg bg-white">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                  <span className="font-bold text-gray-900">₹{product.price}</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif font-bold group-hover:text-[#E89EB8] transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold mt-1">
                  {product.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Menu;