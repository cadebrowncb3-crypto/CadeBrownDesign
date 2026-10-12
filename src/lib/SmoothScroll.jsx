import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from './gsap';
import useReducedMotion from './useReducedMotion';

const SmoothScrollContext = createContext(null);

/**
 * Lenis smooth scrolling, synchronised with GSAP ScrollTrigger exactly as the
 * Lenis README documents ("GSAP ScrollTrigger" section):
 *   lenis.on('scroll', ScrollTrigger.update)
 *   gsap.ticker.add((time) => lenis.raf(time * 1000))
 *   gsap.ticker.lagSmoothing(0)
 * When the visitor prefers reduced motion, Lenis is not created at all and the
 * browser's native scrolling is used.
 */
export function SmoothScrollProvider({ children }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;

    const lenis = new Lenis({ lerp: 0.1, anchors: false });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33); // GSAP default
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const scrollTo = useCallback(
    (target, { immediate = false, offset = 0 } = {}) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { immediate, offset, duration: 1.4 });
        return;
      }
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'auto' });
      } else {
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'auto' });
      }
    },
    []
  );

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  const value = useMemo(() => ({ scrollTo, stop, start, reduced }), [scrollTo, stop, start, reduced]);
  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);
