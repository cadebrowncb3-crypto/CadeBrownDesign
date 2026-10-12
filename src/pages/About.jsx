import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, FULL_MOTION } from '../lib/gsap';
import SplitText from '../components/reactbits/SplitText';
import ContentNote from '../components/ContentNote';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { about, site } from '../data/site';

export default function About() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.fromTo(
          '.about__photo',
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut', delay: 0.2 }
        );
        gsap.from('.about__photo img', { scale: 1.15, duration: 2, ease: 'power3.out', delay: 0.2 });
        gsap.from('.about__pill', { scaleX: 0.6, opacity: 0, duration: 1.1, ease: 'power4.out', delay: 0.35 });
        gsap.from('.about__rule', { scaleX: 0, transformOrigin: 'left', duration: 1.3, ease: 'power4.inOut', delay: 0.5 });
        gsap.from('.about .info__row', {
          clipPath: 'inset(0% 0% 100% 0%)',
          y: 20,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.about__facts', start: 'top 85%', once: true }
        });
      });
    },
    { scope: ref }
  );

  return (
    <main ref={ref} id="main" className="page about">
      <section className="about__grid">
        <div className="about__photo">
          <img src={about.photo.src} alt={about.photo.alt} width={about.photo.w} height={about.photo.h} />
        </div>
        <div className="about__body">
          <h1 className="about__pill pill pill--display">{site.name}</h1>
          <div className="about__rule" aria-hidden="true" />
          <SplitText
            text={about.bio}
            tag="p"
            className="about__bio"
            splitType="lines"
            textAlign="left"
            delay={90}
            duration={1.1}
            ease="power4.out"
            from={{ yPercent: 100, opacity: 0 }}
            to={{ yPercent: 0, opacity: 1 }}
            threshold={0}
            rootMargin="0px"
          />
          <div className="about__bar" aria-hidden="true" />
        </div>
      </section>

      <section className="about__facts" aria-label="Disciplines, tools and experience">
        <dl className="info">
          <div className="info__row">
            <dt>Disciplines</dt>
            <dd>
              <ul className="info__tools">
                {about.disciplines.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="info__row">
            <dt>Skills / Tools</dt>
            <dd>
              <ul className="info__tools">
                {about.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="info__row">
            <dt>Experience</dt>
            <dd>
              {about.experience.map((x) => (
                <p key={x.org} className="info__focus">
                  <Link to={`/work/${x.slug}`} className="text-link">
                    {x.org}
                  </Link>
                  <span className="info__sub">{x.role}</span>
                </p>
              ))}
            </dd>
          </div>
        </dl>
        <ContentNote items={about.missing} />
      </section>

      <ContactSection />
      <Footer section="About" />
    </main>
  );
}
