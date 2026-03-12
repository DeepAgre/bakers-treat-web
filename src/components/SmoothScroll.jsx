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

      // Allow specific elements to scroll normally
      prevent: (node) =>
        node.hasAttribute('data-lenis-prevent') ||
        node.closest('[data-lenis-prevent]')
    });

    lenisRef.current = lenis;

    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };

  }, []);

  // Pause background scrolling when overlays open
  useEffect(() => {

    const lenis = lenisRef.current;
    if (!lenis) return;

    if (isPaused) {

      // stop smooth scrolling
      lenis.stop();

      // allow browser scroll inside overlays
      document.documentElement.style.overflow = 'hidden';

    } else {

      lenis.start();

      document.documentElement.style.overflow = '';

    }

  }, [isPaused]);

  return <>{children}</>;
};

export default SmoothScroll;