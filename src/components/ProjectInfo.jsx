/**
 * Project facts as small labelled columns (AUGE services-column pattern).
 * Long-form role text is rendered separately by the page as the lede.
 */
export default function ProjectInfo({ project }) {
  const cols = [];
  project.info?.forEach((r) => cols.push({ label: r.label, value: r.list ? r.list : [r.text] }));
  if (project.kind) cols.push({ label: 'Type', value: [project.kind] });
  if (project.focus) cols.push({ label: 'Focus', value: [project.focus] });
  if (project.tools) cols.push({ label: 'Skills / Tools', value: project.tools });
  if (!cols.length && !project.palette) return null;

  return (
    <dl className="meta">
      {cols.map((c) => (
        <div className="meta__col" key={c.label}>
          <dt className="label">{c.label}</dt>
          {c.value.map((v) => (
            <dd key={v}>{v}</dd>
          ))}
        </div>
      ))}
      {project.palette && (
        <div className="meta__col">
          <dt className="label">Palette</dt>
          <dd>
            <ul className="meta__palette" aria-label="Brand palette as shown in the PDF">
              {project.palette.map((c) => (
                <li key={c}>
                  <span style={{ background: c }} />
                  {c.toUpperCase()}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      )}
    </dl>
  );
}
