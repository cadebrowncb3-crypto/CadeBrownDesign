import { site } from '../data/site';

/** Micro footer line (AUGE-style): © · contact · section. */
export default function Footer({ section }) {
  return (
    <footer className="microfoot">
      <span>© {new Date().getFullYear()} {site.name}</span>
      <a href={`mailto:${site.email}`}>{site.email}</a>
      <a href={site.phoneHref}>{site.phoneDisplay}</a>
      <span className="microfoot__end">{section ? `${section} — ${site.tagline}` : site.tagline}</span>
    </footer>
  );
}
