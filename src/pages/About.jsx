import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, FULL_MOTION } from '../lib/gsap';
import { useIntro } from '../lib/Intro';
import SplitText from '../components/reactbits/SplitText';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { about, site } from '../data/site';

export default function About() {
  const ref = useRef(null);
  const { ready } = useIntro();

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.from('.ahead__word', { yPercent: 105, duration: 1.3, ease: 'power4.out', stagger: 0.08, delay: 0.35 });
        gsap.from('.ahead__aside > *', { y: 24, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.08, delay: 0.7 });
        gsap.fromTo(
          '.aphoto',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: '.aphoto', start: 'top 85%', once: true }
          }
        );
        gsap.from('.aphoto img', {
          scale: 1.15,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.aphoto', start: 'top 85%', once: true }
        });
        gsap.from('.acols .meta__col', {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.acols', start: 'top 85%', once: true }
        });
      });
    },
    { scope: ref, dependencies: [ready] }
  );

  return (
    <main ref={ref} id="main" className="page about">
      <section className="ahead" aria-labelledby="about-title">
        <h1 id="about-title" className="ahead__title" aria-label={`About ${site.name}`}>
          <span className="hero__line">
            <span className="ahead__word">Hello</span>
          </span>
        </h1>
        <div className="ahead__aside">
          <p className="label">(About) {site.name}</p>
          <p className="ahead__statement">
            I’m a designer who builds stories you can <em>feel</em>, cinematic, <em>structured</em>, and a little{' '}
            <em>unruly</em> in all the right ways.
          </p>
        </div>
      </section>

      <section className="abody" aria-label="Biography">
        <div className="aphoto">
          <img src={about.photo.src} alt={about.photo.alt} width={about.photo.w} height={about.photo.h} />
        </div>
        <div className="abody__text">
          <p className="label">(Bio)</p>
          <SplitText
            text={about.bio}
            tag="p"
            className="abody__bio"
            splitType="lines"
            textAlign="left"
            delay={70}
            duration={1.1}
            ease="power4.out"
            from={{ yPercent: 100, opacity: 0 }}
            to={{ yPercent: 0, opacity: 1 }}
            threshold={0.1}
            rootMargin="0px"
          />
        </div>
      </section>

      <section className="acols" aria-label="Disciplines, tools and experience">
        <dl className="meta meta--onblack">
          <div className="meta__col">
            <dt className="label">Disciplines</dt>
            {about.disciplines.map((d) => (
              <dd key={d}>{d}</dd>
            ))}
          </div>
          <div className="meta__col">
            <dt className="label">Skills / Tools</dt>
            {about.tools.map((t) => (
              <dd key={t}>{t}</dd>
            ))}
          </div>
          <div className="meta__col meta__col--wide">
            <dt className="label">Experience</dt>
            {about.experience.map((x) => (
              <dd key={x.org}>
                <Link to={`/work/${x.slug}`} className="text-link">
                  {x.org}
                </Link>
                <span className="meta__sub">{x.role}</span>
              </dd>
            ))}
          </div>
        </dl>
      </section>

      <ContactSection />
      <Footer section="About" />
    </main>
  );
}
