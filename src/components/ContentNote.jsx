import { SHOW_CONTENT_NOTES } from '../data/site';

/** Dashed "content needed" box listing information the source PDF does not include. */
export default function ContentNote({ items, title = 'Not in the source PDF — content needed' }) {
  if (!SHOW_CONTENT_NOTES || !items?.length) return null;
  return (
    <aside className="content-note" aria-label="Missing information">
      <p className="content-note__title">{title}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
