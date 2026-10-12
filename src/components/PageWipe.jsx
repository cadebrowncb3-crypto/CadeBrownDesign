import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, useGSAP } from '../lib/gsap';

/**
 * Route-change transition: a black panel that is in place the moment the new
 * page mounts and then lifts away. No panel on first load (the Preloader
 * handles that) or under reduced motion.
 */
export default function PageWipe() {
  const { pathname } = useLocation();
  const ref = useRef(null);
  const first = useRef(true);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        ref.current,
        { yPercent: 0, autoAlpha: 1 },
        { yPercent: -100, duration: 0.85, ease: 'power4.inOut', delay: 0.05, onComplete: () => gsap.set(ref.current, { autoAlpha: 0 }) }
      );
    },
    { dependencies: [pathname] }
  );

  return (
    <div ref={ref} className="pagewipe" aria-hidden="true">
      <span>Cade Brown</span>
    </div>
  );
}
