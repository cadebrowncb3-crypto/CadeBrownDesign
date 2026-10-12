import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP, FULL_MOTION } from '../lib/gsap';
import DecryptedText from './reactbits/DecryptedText';
import { projects } from '../data/projects';

export const num = (i) => `(${String(i + 1).padStart(3, '0')})`;
export const shortTitle = (p) => p.title.split(',')[0];

/**
 * Numbered work index (AUGE "Works" pattern). The active project's cover sits
 * in a pinned frame; it follows hover/focus and, while scrolling, whichever
 * row crosses the middle of the screen. On phones each row shows its image.
 */
export default function ProjectIndex() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const show = (i) => {
    if (i === activeRef.current) return;
    activeRef.current = i;
    setActive(i);
  };

  useGSAP(
    () => {
      const rows = gsap.utils.toArray('.index__row');
      rows.forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && show(i)
        });
      });
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.from('.index__row', {
          yPercent: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.index__list', start: 'top 80%', once: true }
        });
      });
    },
    { scope: ref }
  );

  // Reveal the newly active cover with a short mask wipe.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        const img = ref.current.querySelector(`.index__frame img[data-i="${active}"]`);
        if (img) gsap.fromTo(img, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 0.9, ease: 'power4.out' });
      });
    },
    { scope: ref, dependencies: [active] }
  );

  return (
    <section ref={ref} className="index" aria-labelledby="index-title">
      <div className="index__head">
        <h2 id="index-title" className="label">
          (Index) Selected work
        </h2>
        <span className="label">{String(projects.length).padStart(3, '0')} projects</span>
      </div>

      <div className="index__body">
        <ol className="index__list">
          {projects.map((p, i) => (
            <li key={p.slug} className={`index__row ${i === active ? 'is-active' : ''}`}>
              <Link
                to={`/work/${p.slug}`}
                className="index__link"
                onMouseEnter={() => show(i)}
                onFocus={() => show(i)}
              >
                <span className="label index__num">{num(i)}</span>
                <span className="index__title">{shortTitle(p)}</span>
                <span className="label index__cat">{p.category}</span>
                <span className="tag index__tag" aria-hidden="true">
                  <DecryptedText text="View project" speed={30} maxIterations={10} animateOn="view" sequential revealDirection="start" key={i === active ? `a${i}` : `i${i}`} />
                </span>
                <img className="index__thumb" src={p.cover.src} alt="" width={p.cover.w} height={p.cover.h} loading="lazy" />
              </Link>
            </li>
          ))}
        </ol>

        <div className="index__frame" aria-hidden="true">
          {projects.map((p, i) => (
            <img
              key={p.slug}
              data-i={i}
              src={p.cover.src}
              alt=""
              width={p.cover.w}
              height={p.cover.h}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={i === active ? 'is-active' : ''}
            />
          ))}
          <span className="index__frame-label label">
            {num(active)} {projects[active].category}
          </span>
        </div>
      </div>
    </section>
  );
}
