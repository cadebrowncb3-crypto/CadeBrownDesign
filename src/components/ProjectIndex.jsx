import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, FULL_MOTION } from '../lib/gsap';
import { projects } from '../data/projects';

/**
 * The PDF's contents slide (slide 2) as a navigable index. On devices with a
 * fine pointer, hovering a row floats that project's cover image next to the
 * cursor — a preview of the artwork rather than decoration.
 */
export default function ProjectIndex() {
  const ref = useRef(null);
  const previewRef = useRef(null);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.from('.index__row', {
          clipPath: 'inset(0% 0% 100% 0%)',
          y: 24,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.09,
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true }
        });
      });
    },
    { scope: ref }
  );

  const canHover = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const xTo = useRef(null);
  const yTo = useRef(null);

  const onEnter = contextSafe((e, slug) => {
    if (!canHover()) return;
    const preview = previewRef.current;
    preview.querySelectorAll('img').forEach((img) => {
      img.style.opacity = img.dataset.slug === slug ? '1' : '0';
    });
    if (!xTo.current) {
      xTo.current = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3.out' });
      yTo.current = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3.out' });
      gsap.set(preview, { x: e.clientX, y: e.clientY });
    }
    gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
  });

  const onMove = contextSafe((e) => {
    if (!xTo.current) return;
    xTo.current(e.clientX);
    yTo.current(e.clientY);
  });

  const onLeave = contextSafe(() => {
    if (!xTo.current) return;
    gsap.to(previewRef.current, { autoAlpha: 0, scale: 0.9, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
  });

  return (
    <section ref={ref} className="index" aria-labelledby="index-title">
      <h2 id="index-title" className="eyebrow">
        Contents
      </h2>
      <ol className="index__list" onMouseMove={onMove} onMouseLeave={onLeave}>
        {projects.map((p, i) => (
          <li key={p.slug} className={`index__row ${i % 2 ? 'index__row--red' : ''}`}>
            <Link to={`/work/${p.slug}`} className="index__link" onMouseEnter={(e) => onEnter(e, p.slug)}>
              <span className="index__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="index__title">{p.category}</span>
              <span className="index__meta">{p.title}</span>
              <span className="index__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
        <li className="index__row index__row--about">
          <Link to="/about" className="index__link" onMouseEnter={onLeave}>
            <span className="index__num">{String(projects.length + 1).padStart(2, '0')}</span>
            <span className="index__title">About</span>
            <span className="index__meta">Cade Brown</span>
            <span className="index__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      </ol>
      <div ref={previewRef} className="index__preview" aria-hidden="true">
        {projects.map((p) => (
          <img key={p.slug} data-slug={p.slug} src={p.cover.src} alt="" width={p.cover.w} height={p.cover.h} loading="lazy" />
        ))}
      </div>
    </section>
  );
}
