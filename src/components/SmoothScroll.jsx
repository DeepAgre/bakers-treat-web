import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const SmoothScroll = ({ children, isPaused }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // This is the secret: it allows elements with this attribute to scroll normally
      prevent: (node) => node.hasAttribute('data-lenis-prevent') || node.closest('[data-lenis-prevent]'),
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Pause background scroll when Cart or Modal is open
  useEffect(() => {
    if (lenisRef.current) {
      if (isPaused) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isPaused]);

  return <>{children}</>;
};

export default SmoothScroll;