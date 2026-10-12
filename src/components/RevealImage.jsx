import { useRef } from 'react';
import { gsap, useGSAP, FULL_MOTION } from '../lib/gsap';
import { useLightbox } from './Lightbox';

/**
 * Artwork image with a scroll-triggered mask reveal. The artwork file itself is
 * never altered — the motion is a clip-path on the frame plus a gentle settle
 * of the image inside it. Optional `parallax` drifts the image while scrolling.
 * Under reduced motion the image is simply shown.
 */
export default function RevealImage({
  image,
  className = '',
  sizes,
  eager = false,
  zoomable = true,
  parallax = false,
  direction = 'up',
  delay = 0,
  fit = 'natural'
}) {
  const ref = useRef(null);
  const openLightbox = useLightbox();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        const frame = ref.current;
        const inner = frame.querySelector('img');
        const from = {
          up: 'inset(100% 0% 0% 0%)',
          left: 'inset(0% 100% 0% 0%)',
          right: 'inset(0% 0% 0% 100%)'
        }[direction];
        const st = { trigger: frame, start: 'top 90%', once: true };

        gsap.fromTo(
          frame,
          { clipPath: from },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut', delay, scrollTrigger: st }
        );
        gsap.fromTo(
          inner,
          { scale: 1.12, yPercent: direction === 'up' ? 6 : 0 },
          { scale: 1, yPercent: 0, duration: 1.8, ease: 'power3.out', delay, scrollTrigger: st }
        );

        if (parallax) {
          // Moves the whole frame (never crops the artwork inside it).
          gsap.fromTo(
            frame,
            { y: 40 },
            {
              y: -40,
              ease: 'none',
              scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true }
            }
          );
        }
      });
    },
    { scope: ref }
  );

  const { src, w, h, alt, lowRes, bg } = image;
  const style = { '--ar': `${w} / ${h}`, background: bg };
  if (fit === 'natural' && lowRes) style.maxWidth = `${w * 1.25}px`;

  const img = (
    <img src={src} alt={alt} width={w} height={h} sizes={sizes} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  );

  return (
    <div ref={ref} className={`reveal ${parallax ? 'reveal--parallax' : ''} ${className}`} style={style}>
      <div className="reveal__parallax">
        {zoomable ? (
          <button type="button" className="reveal__button" onClick={() => openLightbox(image)}>
            {img}
            <span className="visually-hidden">View larger</span>
          </button>
        ) : (
          img
        )}
      </div>
    </div>
  );
}
