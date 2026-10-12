import { site } from '../data/site';

/** The running footer from every slide of the PDF: name · email · section · Design Portfolio. */
export default function Footer({ section }) {
  return (
    <footer className="site-footer">
      <span>{site.name}</span>
      <a href={`mailto:${site.email}`}>{site.email}</a>
      <span className="site-footer__end">
        {section && <span className="site-footer__section">{section}</span>}
        <span>{site.tagline}</span>
      </span>
    </footer>
  );
}
