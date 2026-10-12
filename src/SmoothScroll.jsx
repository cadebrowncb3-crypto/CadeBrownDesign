import { useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis
// stay in sync on the same frame.
export default function SmoothScroll() {
  const lenisRef = useRef(null);

  useLenis(ScrollTrigger.update);

  useEffect(() => {
    const update = time => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return <ReactLenis root ref={lenisRef} options={{ autoRaf: false, anchors: true, lerp: 0.1 }} />;
}
