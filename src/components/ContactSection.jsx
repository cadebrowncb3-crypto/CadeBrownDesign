import { useRef } from 'react';
import { gsap, useGSAP, FULL_MOTION } from '../lib/gsap';
import SplitText from './reactbits/SplitText';
import Magnet from './reactbits/Magnet';
import { site } from '../data/site';

/** "Let's talk" — closes every page. Black panel, yellow accent. */
export default function ContactSection() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.from('.contact__row', {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.contact__rows', start: 'top 85%', once: true }
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="contact" className="contact" aria-labelledby="contact-title">
      <p className="label contact__eyebrow">(Contact)</p>
      <h2 id="contact-title" className="contact__title" aria-label="Let's talk">
        <SplitText
          text="Let’s talk"
          tag="span"
          splitType="chars"
          textAlign="left"
          delay={40}
          duration={1.1}
          ease="power4.out"
          from={{ yPercent: 110 }}
          to={{ yPercent: 0 }}
          threshold={0.15}
          rootMargin="0px"
        />
      </h2>

      <div className="contact__grid">
        <Magnet padding={90} magnetStrength={3.5} maxOffset={22} wrapperClassName="contact__magnet">
          <a className="contact__cta" href={`mailto:${site.email}`}>
            Write to me <span aria-hidden="true">↗</span>
          </a>
        </Magnet>

        <dl className="contact__rows">
          <div className="contact__row">
            <dt className="label">Email</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          <div className="contact__row">
            <dt className="label">Phone</dt>
            <dd>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
            </dd>
          </div>
          <div className="contact__row">
            <dt className="label">Social</dt>
            <dd>{site.handle}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
