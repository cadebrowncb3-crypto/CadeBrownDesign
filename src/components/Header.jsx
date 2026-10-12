import { useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { gsap, useGSAP, FULL_MOTION } from '../lib/gsap';
import { useSmoothScroll } from '../lib/SmoothScroll';
import { site } from '../data/site';

export default function Header() {
  const ref = useRef(null);
  const { scrollTo } = useSmoothScroll();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.from('.site-header__inner > *', {
          yPercent: -120,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.08,
          delay: 0.15
        });
      });
    },
    { scope: ref }
  );

  const goToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) scrollTo(el, { offset: -10 });
    else navigate('/#contact');
  };

  return (
    <header ref={ref} className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__name" aria-label={`${site.name} — home`}>
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="site-nav">
            <li>
              <NavLink to="/" end className={() => (pathname.startsWith('/work') ? 'active' : undefined)}>
                Work
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <a href="#contact" onClick={goToContact}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
