import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { gsap, useGSAP, FULL_MOTION } from '../lib/gsap';
import { useSmoothScroll } from '../lib/SmoothScroll';
import { useIntro } from '../lib/Intro';
import DecryptedText from './reactbits/DecryptedText';
import { site } from '../data/site';

const scramble = (text) => (
  <DecryptedText text={text} speed={35} maxIterations={8} animateOn="hover" characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ*#/" />
);

/**
 * Site chrome: a slim top line (name + disciplines) and the floating black
 * menu box bottom-right (AUGE-style). On phones the box collapses to a button.
 */
export default function Header() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useSmoothScroll();
  const { ready } = useIntro();

  useEffect(() => setOpen(false), [pathname]);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.from('.topbar > *', { yPercent: -120, opacity: 0, duration: 0.9, ease: 'power4.out', stagger: 0.06 });
        gsap.from('.navbox', { y: 40, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.2 });
      });
    },
    { scope: ref, dependencies: [ready] }
  );

  const goToContact = (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById('contact');
    if (el) scrollTo(el);
    else navigate('/#contact');
  };

  const workActive = pathname === '/' || pathname.startsWith('/work');

  return (
    <header ref={ref} className="chrome">
      <div className="topbar">
        <Link to="/" className="topbar__name" aria-label={`${site.name} — home`}>
          {site.name}
          <sup>©</sup>
        </Link>
        <span className="topbar__meta">Editorial · Branding · Album Design</span>
      </div>

      <nav className={`navbox ${open ? 'is-open' : ''}`} aria-label="Primary">
        <button
          type="button"
          className="navbox__toggle"
          aria-expanded={open}
          aria-controls="navbox-list"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="navbox__lines" aria-hidden="true" />
        </button>
        <ul id="navbox-list" className="navbox__list">
          <li>
            <NavLink to="/" end className={() => (workActive ? 'active' : undefined)} aria-current={workActive ? 'page' : undefined}>
              {scramble('Work')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">{scramble('About')}</NavLink>
          </li>
          <li>
            <a href="#contact" onClick={goToContact}>
              {scramble("Let's talk")}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
