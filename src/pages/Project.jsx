import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap, useGSAP, FULL_MOTION } from '../lib/gsap';
import SplitText from '../components/reactbits/SplitText';
import ProjectInfo from '../components/ProjectInfo';
import RevealImage from '../components/RevealImage';
import Gallery from '../components/Gallery';
import ContentNote from '../components/ContentNote';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import { projects, getProject } from '../data/projects';

export default function Project() {
  const { slug } = useParams();
  const project = getProject(slug);
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!project) return;
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.from('.project__name, .project__eyebrow', {
          y: 24,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.08,
          delay: 0.35
        });
        if (ref.current.querySelector('.info__row')) gsap.from('.info__row', {
          clipPath: 'inset(0% 0% 100% 0%)',
          y: 20,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.1,
          delay: 0.45
        });
        gsap.from('.next', {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.next', start: 'top 90%', once: true }
        });
      });
    },
    { scope: ref, dependencies: [slug] }
  );

  if (!project) return <NotFound />;

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const hasInfo = Boolean(project.role || project.tools || project.focus);

  return (
    <main ref={ref} id="main" className={`page project ${hasInfo ? '' : 'project--bare'}`}>
      <header className="project__head">
        <div className="project__titles">
          <p className="project__eyebrow eyebrow">
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
          <h1 className="display project__display" aria-label={project.category}>
            <SplitText
              text={project.category}
              tag="span"
              splitType="chars"
              textAlign="left"
              delay={30}
              duration={1.1}
              ease="power4.out"
              from={{ yPercent: 110 }}
              to={{ yPercent: 0 }}
              threshold={0}
              rootMargin="0px"
            />
          </h1>
          <p className="project__name">{project.title}</p>
          {project.hero && (
            <RevealImage
              image={project.hero}
              eager
              className="project__hero"
              sizes="(min-width: 900px) 50vw, 100vw"
              delay={0.3}
            />
          )}
        </div>
        <div className="project__info">
          <ProjectInfo project={project} />
          <ContentNote items={project.missing} />
        </div>
      </header>

      <Gallery sections={project.sections} />

      <nav className="next" aria-label="Next project">
        <Link to={`/work/${next.slug}`} className="next__link">
          <span className="eyebrow">Next project</span>
          <span className="next__title">{next.category}</span>
          <span className="next__name">{next.title} →</span>
        </Link>
      </nav>

      <ContactSection />
      <Footer section={project.category} />
    </main>
  );
}
