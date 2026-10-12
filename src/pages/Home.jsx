import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, FULL_MOTION } from '../lib/gsap';
import { useIntro } from '../lib/Intro';
import useReducedMotion from '../lib/useReducedMotion';
import SplitText from '../components/reactbits/SplitText';
import DecryptedText from '../components/reactbits/DecryptedText';
import ScrollVelocity from '../components/reactbits/ScrollVelocity';
import ProjectIndex, { num, shortTitle } from '../components/ProjectIndex';
import RevealImage from '../components/RevealImage';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import { about, site } from '../data/site';

/** Sets the given words of a sentence in the italic serif accent. */
const emphasize = (text, words) =>
  text.split(/(\s+)/).map((w, k) => {
    const bare = w.replace(/[^\p{L}]/gu, '');
    if (!words.includes(bare)) return w;
    const [lead, trail] = w.split(bare);
    return (
      <span key={k}>
        {lead}
        <em>{bare}</em>
        {trail}
      </span>
    );
  });

/** Hero card that cycles through the projects (AUGE's rotating "View project"). */
function FeatureCycler() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || paused) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % projects.length), 3200);
    return () => clearInterval(t);
  }, [reduced, paused]);

  const p = projects[i];
  return (
    <Link
      to={`/work/${p.slug}`}
      className="cycler"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label={`Featured: ${p.title} — view project`}
    >
      <span className="cycler__media">
        {projects.map((q, k) => (
          <img key={q.slug} src={q.cover.src} alt="" width={q.cover.w} height={q.cover.h} className={k === i ? 'is-active' : ''} fetchPriority={k === 0 ? 'high' : 'auto'} />
        ))}
      </span>
      <span className="cycler__meta" aria-hidden="true">
        <span className="cycler__title">{shortTitle(p)}</span>
        <span className="label">
          {num(i)} {p.category}
        </span>
      </span>
      <span className="tag cycler__tag" aria-hidden="true">
        <DecryptedText key={p.slug} text="View project" speed={30} maxIterations={10} animateOn="view" sequential />
      </span>
    </Link>
  );
}

export default function Home() {
  const ref = useRef(null);
  const { ready } = useIntro();

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        const tl = gsap.timeline({ delay: 0.15 });
        tl.from('.hero__word', { yPercent: 105, duration: 1.3, ease: 'power4.out', stagger: 0.08 })
          .from('.hero__aside > *', { y: 24, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.08 }, '-=0.9')
          .from('.cycler', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }, '-=1.1')
          .from('.hero__grid', { opacity: 0, duration: 1.2 }, 0);

        // The wordmark drifts and the hero dims slightly as you leave it.
        gsap.to('.hero__wordmark', {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
        });

        gsap.utils.toArray('.story-card').forEach((card) => {
          gsap.from(card.querySelectorAll('.story-card__meta > *'), {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.07,
            scrollTrigger: { trigger: card, start: 'top 75%', once: true }
          });
        });
      });
    },
    { scope: ref, dependencies: [ready] }
  );


  return (
    <main ref={ref} id="main" className="page home">
      {/* ---------- Hero ---------- */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__grid" aria-hidden="true">
          {Array.from({ length: 12 }, (_, k) => (
            <span key={k} />
          ))}
        </div>

        <div className="hero__aside">
          <p className="label">
            {site.name} • {site.tagline}
          </p>
          <p className="hero__statement">{emphasize(about.intro, ['feel', 'unruly'])}</p>
          <p className="label">Editorial · Branding · Album Design</p>
        </div>

        <FeatureCycler />

        <h1 id="hero-title" className="hero__wordmark" aria-label={`${site.name} — ${site.tagline}`}>
          <span className="hero__line">
            <span className="hero__word">Cade</span>
          </span>
          <span className="hero__line">
            <span className="hero__word">Brown</span>
          </span>
        </h1>
      </section>

      {/* ---------- Index ---------- */}
      <ProjectIndex />

      {/* ---------- Case stories (Cody Brown "Success stories") ---------- */}
      <section className="stories" aria-labelledby="stories-title">
        <div className="section-head">
          <h2 id="stories-title" className="label">
            (Work) Case stories
          </h2>
        </div>
        {projects.map((p, i) => (
          <article key={p.slug} className={`story-card story-card--${i % 2 ? 'right' : 'left'}`}>
            <Link to={`/work/${p.slug}`} className="story-card__media" tabIndex={-1} aria-hidden="true">
              <RevealImage image={p.cover} zoomable={false} parallax sizes="(min-width: 900px) 66vw, 100vw" />
            </Link>
            <div className="story-card__meta">
              <span className="label">
                {num(i)} {p.category}
              </span>
              <h3 className="story-card__title">
                <Link to={`/work/${p.slug}`}>{shortTitle(p)}</Link>
              </h3>
              {(p.focus || p.info?.[0]?.text) && <p className="story-card__line">{p.focus || p.info[0].text}</p>}
              <Link to={`/work/${p.slug}`} className="tag tag--link" aria-label={`View project: ${p.title}`}>
                <DecryptedText text="View project" speed={30} maxIterations={8} animateOn="hover" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* ---------- Disciplines strip ---------- */}
      <section className="strip" aria-label="Disciplines">
        <p className="visually-hidden">Editorial systems, branding, layout and album package design.</p>
        <div aria-hidden="true">
          <ScrollVelocity
            texts={['Editorial systems ✦ Branding ✦ Layout ✦ Album package design ✦']}
            velocity={40}
            className="strip__text"
            numCopies={4}
          />
        </div>
      </section>

      {/* ---------- About statement (inverted) ---------- */}
      <section className="statement" aria-labelledby="statement-title">
        <p className="label statement__eyebrow" id="statement-title">
          (About)
        </p>
        <SplitText
          text={about.closing}
          tag="p"
          className="statement__text"
          splitType="words"
          textAlign="left"
          delay={35}
          duration={1.1}
          ease="power4.out"
          from={{ yPercent: 100, opacity: 0 }}
          to={{ yPercent: 0, opacity: 1 }}
          threshold={0.2}
          rootMargin="0px"
        />
        <ul className="statement__keys" aria-label="Approach">
          <li>
            <em>clarity</em>
          </li>
          <li>
            <em>tension</em>
          </li>
          <li>
            <em>personality</em>
          </li>
        </ul>
        <Link to="/about" className="tag tag--link tag--onblack">
          <DecryptedText text="More about Cade" speed={30} maxIterations={8} animateOn="hover" />
        </Link>
      </section>

      <ContactSection />
      <Footer section="Selected Work" />
    </main>
  );
}
