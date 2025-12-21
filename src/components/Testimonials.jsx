import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Ananya Iyer",
    text: "The brownies from Delight Bakehouse are out of this world! So fudgy and rich. Khushi really knows her craft.",
    location: "Thane West"
  },
  {
    id: 2,
    name: "Siddharth Malhotra",
    text: "Ordered a customized hamper for my sister's birthday. Every single item was fresh and beautifully packed. Highly recommend!",
    location: "Hiranandani Estate"
  },
  {
    id: 3,
    name: "Riya Sharma",
    text: "Khushi's signature chocolate cake is the best I've had in Thane. Not too sweet, just perfect.",
    location: "Majiwada"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-serif font-bold text-center mb-16 text-gray-900">Sweet Words</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-black/5 flex flex-col justify-between"
            >
              <p className="text-gray-600 italic mb-6">"{item.text}"</p>
              <div>
                <h4 className="font-bold text-gray-900">{item.name}</h4>
                <p className="text-[#E89EB8] text-xs font-bold uppercase tracking-widest">{item.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;