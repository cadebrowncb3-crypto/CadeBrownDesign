/** The info table from the project slides: thick slate bars between label/value rows. */
export default function ProjectInfo({ project }) {
  const rows = [];
  // Projects may define their own rows: { label, text } or { label, list }.
  project.info?.forEach((r) =>
    rows.push({
      label: r.label,
      value: r.list ? (
        <ul className="info__tools">
          {r.list.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      ) : (
        <p className={r.large ? 'info__focus' : 'info__role'}>{r.text}</p>
      )
    })
  );
  if (project.kind && project.focus) rows.push({ label: project.kind, value: <p className="info__focus">{project.focus}</p> });
  if (project.role) rows.push({ label: 'Role', value: <p className="info__role">{project.role}</p> });
  if (project.tools)
    rows.push({
      label: 'Skills / Tools',
      value: (
        <ul className="info__tools">
          {project.tools.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )
    });
  if (project.palette)
    rows.push({
      label: 'Palette',
      value: (
        <ul className="info__palette" aria-label="Brand palette as shown in the PDF">
          {project.palette.map((c) => (
            <li key={c} style={{ background: c }}>
              <span>{c.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      )
    });

  if (!rows.length) return null;
  return (
    <dl className="info">
      {rows.map((r) => (
        <div className="info__row" key={r.label}>
          <dt>{r.label}</dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
