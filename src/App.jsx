import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import SmoothScroll from './SmoothScroll.jsx';
import useReducedMotion from './useReducedMotion.js';
import { projects } from './projects.js';

import SplitText from './components/reactbits/SplitText.jsx';
import BlurText from './components/reactbits/BlurText.jsx';
import Grainient from './components/reactbits/Grainient.jsx';
import TiltedCard from './components/reactbits/TiltedCard.jsx';
import Magnet from './components/reactbits/Magnet.jsx';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CONTACT_EMAIL = 'hello@example.com'; // TODO: replace with your real address.
const HERO_COLORS = ['#141210', '#2b1c13', '#6e3f22', '#b8743f', '#e9cfae'];

function SectionTitle({ children, reduced }) {
  if (reduced) return <h2 className="section-title">{children}</h2>;
  return <BlurText tag="h2" text={children} className="section-title" delay={90} direction="bottom" />;
}

function HeroTitle({ reduced }) {
  if (reduced) {
    return (
      <h1 className="hero-title">
        Cade Brown <br />
        <em>Design</em>
      </h1>
    );
  }
  const from = { opacity: 0, y: '0.5em' };
  return (
    <h1 className="hero-title">
      <SplitText text="Cade Brown" tag="span" textAlign="left" delay={45} from={from} to={{ opacity: 1, y: 0 }} />
      <br />
      <SplitText
        text="Design"
        tag="em"
        textAlign="left"
        delay={45}
        from={from}
        to={{ opacity: 1, y: 0, delay: 0.45 }}
      />
    </h1>
  );
}

export default function App() {
  const reduced = useReducedMotion();
  const root = useRef(null);

  useGSAP(
    () => {
      // Solid header once the hero has scrolled out from under it.
      const header = root.current.querySelector('.site-header');
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'bottom top+=72',
        onEnter: () => header.classList.add('is-solid'),
        onLeaveBack: () => header.classList.remove('is-solid')
      });

      if (reduced) return;

      gsap.from('.hero-reveal', { y: 20, opacity: 0, duration: 0.9, stagger: 0.1, delay: 0.9, ease: 'power3.out' });

      // Hero content drifts up and fades as you scroll away.
      gsap.to('.hero-content', {
        yPercent: -25,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });

      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        });
      });

      // The track holds two copies, so -50% loops seamlessly.
      gsap.to('.marquee-track', { xPercent: -50, duration: 24, ease: 'none', repeat: -1 });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true }
  );

  return (
    <div ref={root}>
      {!reduced && <SmoothScroll />}

      <header className="site-header">
        <a className="logo" href="#top">
          CB
        </a>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-bg" aria-hidden="true">
            <Grainient colors={HERO_COLORS} angle={60} speed={0.6} grainAmount={0.07} silk={0.4} />
          </div>
          <div className="hero-content">
            <p className="eyebrow hero-reveal">Portfolio — 2026</p>
            <HeroTitle reduced={reduced} />
            <p className="hero-sub hero-reveal">Brand identity, visual systems and digital work.</p>
          </div>
          <a className="scroll-cue hero-reveal" href="#work">
            Scroll
          </a>
        </section>

        <section id="work" className="work">
          <SectionTitle reduced={reduced}>Selected work</SectionTitle>
          <div className="grid">
            {projects.map(p => (
              <article className="card reveal" key={p.title}>
                <div className="card-media">
                  <TiltedCard
                    imageSrc={p.image}
                    altText={p.title}
                    captionText={p.title}
                    containerHeight="auto"
                    imageHeight="100%"
                    imageWidth="100%"
                    rotateAmplitude={reduced ? 0 : 8}
                    scaleOnHover={reduced ? 1 : 1.03}
                    showMobileWarning={false}
                  />
                </div>
                <h3>{p.title}</h3>
                <p>{p.meta}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>Identity · Typography · Layout · Motion · Print · Web ·&nbsp;</span>
            <span>Identity · Typography · Layout · Motion · Print · Web ·&nbsp;</span>
          </div>
        </section>

        <section id="about" className="about">
          <SectionTitle reduced={reduced}>About</SectionTitle>
          <p className="about-text reveal">
            I&apos;m Cade, a designer focused on clear, considered work. Replace this paragraph with a short
            introduction: what you do, who you do it for, and what you care about.
          </p>
        </section>

        <section id="contact" className="contact">
          <SectionTitle reduced={reduced}>Let&apos;s work together</SectionTitle>
          <Magnet padding={80} magnetStrength={4}>
            <a className="contact-link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </Magnet>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Cade Brown Design</p>
      </footer>
    </div>
  );
}
