import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { useIntro, markIntroSeen } from '../lib/Intro';
import { useSmoothScroll } from '../lib/SmoothScroll';

/** First-visit counter (000 → 100), then the panel lifts away. Skipped under reduced motion. */
export default function Preloader() {
  const { ready, setReady } = useIntro();
  const [done, setDone] = useState(ready);
  const ref = useRef(null);
  const { stop, start } = useSmoothScroll();

  useGSAP(
    () => {
      if (done) return;
      stop();
      const counter = { v: 0 };
      const num = ref.current.querySelector('.preloader__count');
      const tl = gsap.timeline({
        onComplete: () => {
          markIntroSeen();
          start();
          setDone(true);
        }
      });
      tl.from('.preloader__label > *', { yPercent: 110, duration: 0.7, ease: 'power4.out', stagger: 0.06 })
        .to(
          counter,
          {
            v: 100,
            duration: 1.6,
            ease: 'power2.inOut',
            onUpdate: () => {
              num.textContent = String(Math.round(counter.v)).padStart(3, '0');
            }
          },
          0
        )
        .to('.preloader__bar', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0)
        .add(() => setReady(true))
        .to(ref.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' });
    },
    { scope: ref }
  );

  if (done) return null;
  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <div className="preloader__label">
        <span>Cade Brown</span>
        <span>Design Portfolio</span>
      </div>
      <div className="preloader__count">000</div>
      <div className="preloader__bar" />
    </div>
  );
}
