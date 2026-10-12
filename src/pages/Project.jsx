import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap, useGSAP, FULL_MOTION } from '../lib/gsap';
import { useIntro } from '../lib/Intro';
import SplitText from '../components/reactbits/SplitText';
import DecryptedText from '../components/reactbits/DecryptedText';
import ProjectInfo from '../components/ProjectInfo';
import RevealImage from '../components/RevealImage';
import Gallery from '../components/Gallery';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import { num, shortTitle } from '../components/ProjectIndex';
import { projects, getProject } from '../data/projects';

export default function Project() {
  const { slug } = useParams();
  const project = getProject(slug);
  const ref = useRef(null);
  const { ready } = useIntro();

  useGSAP(
    () => {
      if (!project || !ready) return;
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.from('.phead__top > *, .phead__sub, .phead__lede', {
          y: 24,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.07,
          delay: 0.45
        });
        if (ref.current.querySelector('.meta__col'))
          gsap.from('.meta__col', { y: 30, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.06, delay: 0.6 });
        gsap.from('.next__title', {
          yPercent: 100,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.next', start: 'top 80%', once: true }
        });
      });
    },
    { scope: ref, dependencies: [slug, ready] }
  );

  if (!project) return <NotFound />;

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const [main, ...restTitle] = project.title.split(',');

  // Full-width hero: the project's lead image, unless it is too small to run
  // that large — then the largest cover image leads and the small lead image
  // is shown at natural size in the first section instead.
  const heroImage = project.hero && !project.hero.lowRes ? project.hero : project.cover;
  let sections = project.sections.filter((s) => !(s.type === 'feature' && s.image.src === heroImage.src));
  if (project.hero && project.hero.lowRes) sections = [{ type: 'grid', columns: 1, images: [project.hero] }, ...sections];
  const portrait = heroImage.h > heroImage.w;

  return (
    <main ref={ref} id="main" className="page project">
      <header className="phead">
        <div className="phead__top">
          <span className="label">
            {num(index)} / {String(projects.length).padStart(3, '0')}
          </span>
          <span className="label">{project.category}</span>
          <Link to="/" className="label phead__back">
            ← All work
          </Link>
        </div>

        <h1 className="phead__title" aria-label={project.title}>
          <SplitText
            key={slug}
            text={main}
            tag="span"
            splitType="chars"
            textAlign="left"
            delay={25}
            duration={1.1}
            ease="power4.out"
            from={{ yPercent: 110 }}
            to={{ yPercent: 0 }}
            threshold={0}
            rootMargin="0px"
          />
        </h1>
        {restTitle.length > 0 && <p className="phead__sub">{restTitle.join(',').trim()}</p>}

        <div className="phead__body">
          <ProjectInfo project={project} />
          {project.role && <p className="phead__lede">{project.role}</p>}
        </div>
      </header>

      <div className={`phero ${portrait ? 'phero--portrait' : ''}`}>
        <RevealImage image={heroImage} eager parallax={!portrait} sizes="100vw" />
      </div>

      <Gallery sections={sections} />

      <nav className="next" aria-label="Next project">
        <Link to={`/work/${next.slug}`} className="next__link">
          <span className="label">(Next) {num(projects.indexOf(next))} {next.category}</span>
          <span className="next__clip">
            <span className="next__title">{shortTitle(next)}</span>
          </span>
          <span className="tag tag--onblack">
            <DecryptedText text="View project" speed={30} maxIterations={8} animateOn="hover" />
          </span>
          <img className="next__img" src={next.cover.src} alt="" width={next.cover.w} height={next.cover.h} loading="lazy" />
        </Link>
      </nav>

      <ContactSection />
      <Footer section={project.category} />
    </main>
  );
}
