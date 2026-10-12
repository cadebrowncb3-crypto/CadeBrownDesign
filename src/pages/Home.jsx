import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, FULL_MOTION } from '../lib/gsap';
import SplitText from '../components/reactbits/SplitText';
import ScrollReveal from '../components/reactbits/ScrollReveal';
import ProjectIndex from '../components/ProjectIndex';
import RevealImage from '../components/RevealImage';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import { about, site } from '../data/site';

const COVER = {
  src: '/images/cover/portfolio-cover-graphic.webp',
  w: 4096,
  h: 2092,
  alt: '“portfolio” set in red and slate letters, joined by continuous rounded red and slate lines that carry the name Cade Brown, a phone number and an email address.'
};

export default function Home() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        // The cover's continuous lines are revealed left-to-right, as if being drawn.
        gsap.fromTo(
          '.hero__art',
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 2, ease: 'power3.inOut', delay: 0.2 }
        );
        gsap.from('.hero__meta > *', { y: 20, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.1, delay: 1.2 });
        gsap.to('.hero__art img', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
        });
        gsap.utils.toArray('.feature').forEach((el) => {
          gsap.from(el.querySelectorAll('.feature__head > *'), {
            y: 40,
            opacity: 0,
            duration: 1.1,
            ease: 'power4.out',
            stagger: 0.07,
            scrollTrigger: { trigger: el, start: 'top 80%', once: true }
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <main ref={ref} id="main" className="page page--home">
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title" className="visually-hidden">
          {site.name} — {site.tagline}
        </h1>
        <div className="hero__art">
          <img src={COVER.src} alt={COVER.alt} width={COVER.w} height={COVER.h} fetchPriority="high" />
        </div>
        <div className="hero__meta">
          <span>{site.name}</span>
          <span>Editorial · Branding · Posters</span>
          <span>{site.tagline}</span>
        </div>
      </section>

      <section className="intro" aria-label="Introduction">
        <SplitText
          text={about.intro}
          tag="p"
          className="intro__text"
          splitType="words"
          textAlign="left"
          delay={45}
          duration={1.2}
          ease="power4.out"
          from={{ yPercent: 100, opacity: 0 }}
          to={{ yPercent: 0, opacity: 1 }}
          threshold={0.15}
          rootMargin="0px"
        />
      </section>

      <ProjectIndex />

      <section className="selected" aria-labelledby="selected-title">
        <h2 id="selected-title" className="eyebrow">
          Selected work
        </h2>
        {projects.map((p, i) => (
          <article key={p.slug} className={`feature ${i % 2 ? 'feature--flip' : ''}`}>
            <div className="feature__head">
              <span className="feature__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="feature__title">
                <Link to={`/work/${p.slug}`}>{p.category}</Link>
              </h3>
              <p className="feature__name">{p.title}</p>
              {p.focus && <p className="feature__focus">{p.focus}</p>}
              <Link to={`/work/${p.slug}`} className="pill pill--small" aria-label={`View project: ${p.title}`}>
                View project
              </Link>
            </div>
            <Link to={`/work/${p.slug}`} className="feature__media" tabIndex={-1} aria-hidden="true">
              <RevealImage
                image={p.cover}
                zoomable={false}
                parallax
                className={`frame ${p.cover.h > p.cover.w ? 'frame--tall' : ''}`}
                sizes="(min-width: 900px) 60vw, 100vw"
              />
            </Link>
          </article>
        ))}
      </section>

      <section className="about-teaser" aria-labelledby="about-teaser-title">
        <div className="about-teaser__head">
          <h2 id="about-teaser-title" className="eyebrow">
            About
          </h2>
          <Link to="/about" className="pill pill--small">
            More about Cade
          </Link>
        </div>
        <ScrollReveal
          baseOpacity={0.12}
          enableBlur
          baseRotation={0}
          blurStrength={3}
          containerClassName="about-teaser__reveal"
          textClassName="about-teaser__text"
          rotationEnd="bottom 60%"
          wordAnimationEnd="bottom 60%"
        >
          {about.bio}
        </ScrollReveal>
      </section>

      <ContactSection />
      <Footer section="Selected Work" />
    </main>
  );
}
