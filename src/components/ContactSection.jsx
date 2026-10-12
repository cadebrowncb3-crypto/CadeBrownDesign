import { useRef } from 'react';
import { gsap, useGSAP, FULL_MOTION } from '../lib/gsap';
import SplitText from './reactbits/SplitText';
import Magnet from './reactbits/Magnet';
import ContentNote from './ContentNote';
import { site, contactMissing } from '../data/site';

/** Slide 15, "Get in touch", rebuilt as a section that closes every page. */
export default function ContactSection() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.from('.contact__rule', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true }
        });
        gsap.from('.contact__details > *', {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.contact__details', start: 'top 85%', once: true }
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="contact" className="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="contact__title" aria-label="Get in touch">
        <SplitText
          text="Get in touch"
          tag="span"
          splitType="chars"
          textAlign="left"
          delay={35}
          duration={1.1}
          ease="power4.out"
          from={{ yPercent: 110 }}
          to={{ yPercent: 0 }}
          threshold={0.2}
          rootMargin="0px"
          className="contact__split"
        />
      </h2>
      <div className="contact__rule" aria-hidden="true" />
      <div className="contact__grid">
        <div className="contact__cell" aria-hidden="true" />
        <div className="contact__cell contact__details">
          <Magnet padding={80} magnetStrength={4} maxOffset={18} wrapperClassName="contact__magnet">
            <a className="pill pill--large" href={`mailto:${site.email}`}>
              Contact
            </a>
          </Magnet>
          <a className="contact__line" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="contact__line" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>
          <span className="contact__line">{site.handle}</span>
        </div>
        <div className="contact__cell contact__cell--note">
          <ContentNote items={contactMissing} />
        </div>
      </div>
      <div className="contact__bar" aria-hidden="true" />
    </section>
  );
}
