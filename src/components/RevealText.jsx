import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const RevealText = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  // Split text into words based on spaces
  const words = typeof children === 'string' ? children.split(" ") : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each word
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9], // Custom "luxury" ease curve
      },
    },
  };

  if (typeof children !== 'string') {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-block overflow-hidden ${className}`} // overflow-hidden is key!
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em] overflow-hidden align-top">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default RevealText;