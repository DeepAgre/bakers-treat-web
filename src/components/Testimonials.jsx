import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Ananya Sharma",
    location: "Hiranandani Estate, Thane",
    text: "I ordered a custom 3D 'Vintage Camera' cake for my husband's birthday. Not only was the detail mind-blowing, but the Belgian chocolate sponge was incredibly moist. Khushi is truly an artist!",
    rating: 5
  },
  {
    id: 2,
    name: "Rohan Mehra",
    location: "Majiwada, Thane",
    text: "The best sourdough and macarons in the city, hands down. You can really taste the quality of the butter and vanilla. It’s hard to find this level of French finesse in Thane.",
    rating: 5
  },
  {
    id: 3,
    name: "Priya Vaghani",
    location: "Vasant Vihar, Thane",
    text: "Bakers Treat made our gender reveal cake. It was a gravity-defying sculpture that became the talk of the party. Professional service and world-class taste!",
    rating: 5
  },
  {
    id: 4,
    name: "Vikram Malhotra",
    location: "Ghodbunder Road, Thane",
    text: "Finally, a baker who understands edible engineering! The structural integrity of the 'Ship Cake' Khushi built was amazing, and it tasted as good as it looked.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    // Changed to a deeper, more defined Rose Pink (#FCE7EE)
    <section className="py-32 bg-[#FCE7EE]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h4 className="text-[#E89EB8] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Kind Words</h4>
          <h2 className="text-5xl font-serif text-[#1A1A1A]">Loved by locals<span className="text-[#E89EB8]">.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              // Cards are now white with a more pronounced shadow to lift them off the darker pink
              className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-white relative group hover:shadow-2xl transition-all duration-500"
            >
              {/* Quote icon is now slightly darker to be visible on the white card */}
              <Quote className="absolute top-10 right-10 text-[#FCE7EE] group-hover:text-[#E89EB8]/20 transition-colors" size={60} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-[#E89EB8] text-lg">★</span>
                ))}
              </div>

              <p className="text-xl font-light leading-relaxed mb-8 italic text-[#1A1A1A]">
                "{review.text}"
              </p>

              <div>
                <h5 className="font-bold text-sm tracking-wide text-[#1A1A1A]">{review.name}</h5>
                <p className="text-[10px] uppercase tracking-widest text-[#E89EB8] font-bold mt-1">{review.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;