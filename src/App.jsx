import { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { SmoothScrollProvider, useSmoothScroll } from './lib/SmoothScroll';
import { ScrollTrigger } from './lib/gsap';
import { LightboxProvider } from './components/Lightbox';
import Header from './components/Header';
import Home from './pages/Home';
import Project from './pages/Project';
import About from './pages/About';
import NotFound from './pages/NotFound';

/** Reset scroll on navigation, honour #contact links, and re-measure triggers. */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  const { scrollTo } = useSmoothScroll();

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    scrollTo(0, { immediate: true });
  }, [pathname, scrollTo]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    let timer;
    if (hash) {
      timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) scrollTo(el, { offset: -10 });
      }, 150);
    }
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [pathname, hash, scrollTo]);

  useEffect(() => {
    // Late-loading images/fonts can shift layout; re-measure once everything is in.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return null;
}

function ProjectRoute() {
  const { slug } = useParams();
  return <Project key={slug} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <LightboxProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <RouteEffects />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<ProjectRoute />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LightboxProvider>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}
