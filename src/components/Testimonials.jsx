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
    /* Background changed to the signature brand pink */
    <section className="py-24 bg-[#E89EB8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading color changed to white for better contrast on pink */}
        <h2 className="text-5xl font-serif font-bold text-center mb-16 text-white">
          Sweet Words
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              /* Review cards kept white for readability */
              className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-white/20 flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div>
                {/* Quotation mark icon for style */}
                <span className="text-4xl text-[#E89EB8] font-serif leading-none block mb-4">“</span>
                <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
                  {item.text}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xl">{item.name}</h4>
                <p className="text-[#E89EB8] text-xs font-black uppercase tracking-[0.2em] mt-1">
                  {item.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;