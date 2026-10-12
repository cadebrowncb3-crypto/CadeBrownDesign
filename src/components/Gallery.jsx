import RevealImage from './RevealImage';

const Figure = ({ image, delay, sizes, className = '' }) => (
  <figure className={`figure ${className}`}>
    <RevealImage image={image} delay={delay} sizes={sizes} />
    {image.caption && (
      <figcaption className="figure__caption">
        {image.caption}
        {image.note && <span className="figure__note">{image.note}</span>}
      </figcaption>
    )}
  </figure>
);

const SectionHead = ({ section }) =>
  section.title ? (
    <header className="story__head">
      {section.label && <p className="label">{section.label}</p>}
      <h2 className="story__title">{section.title}</h2>
    </header>
  ) : (
    section.label && <h2 className="label">{section.label}</h2>
  );

/** Text parts of a "story" section: paragraphs, cards, steps, numbered points, tags. */
function StoryText({ section }) {
  return (
    <div className="story__text">
      {section.body?.map((p) => (
        <p key={p} className="story__body">
          {p}
        </p>
      ))}
      {section.cards && (
        <div className="story__cards">
          {section.cards.map((c) => (
            <div className="story__card" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      )}
      {section.steps && (
        <ol className="story__steps">
          {section.steps.map((s, i) => (
            <li key={s.title}>
              <span className="story__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      )}
      {section.points && (
        <ol className="story__points">
          {section.points.map((s, i) => (
            <li key={s.title}>
              <span className="story__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
      {section.tags && (
        <ul className="story__tags">
          {section.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
      {section.meta && <p className="story__meta">{section.meta}</p>}
    </div>
  );
}

/** Renders a project's sections, following the layouts of the source documents. */
export default function Gallery({ sections }) {
  return sections.map((section, si) => {
    if (section.type === 'feature') {
      return (
        <section className="gallery gallery--feature" key={si}>
          <SectionHead section={section} />
          <RevealImage image={section.image} className="frame" parallax sizes="(min-width: 900px) 80vw, 100vw" />
          {section.image.caption && <p className="figure__caption">{section.image.caption}</p>}
        </section>
      );
    }
    if (section.type === 'grid') {
      return (
        <section className="gallery" key={si}>
          <SectionHead section={section} />
          <div className={`gallery__grid gallery__grid--${section.columns} ${section.bleed ? 'gallery__grid--bleed' : ''}`}>
            {section.images.map((image, i) => (
              <div className={`gallery__cell ${image.flushBottom ? 'gallery__cell--flush' : ''}`} key={image.src}>
                <Figure image={image} delay={i * 0.12} sizes={`(min-width: 900px) ${Math.round(100 / section.columns)}vw, 100vw`} />
              </div>
            ))}
          </div>
          {section.body && <StoryText section={{ body: section.body }} />}
        </section>
      );
    }
    if (section.type === 'spreads') {
      return (
        <section className="gallery gallery--spreads" key={si}>
          <SectionHead section={section} />
          <div className="spreads">
            {section.images.map((image, i) => (
              <div className={`spreads__item ${image.w < 200 ? 'spreads__item--single' : ''}`} key={image.src}>
                <RevealImage image={image} delay={(i % 4) * 0.08} />
              </div>
            ))}
          </div>
        </section>
      );
    }
    if (section.type === 'story') {
      const hasMedia = section.images?.length > 0;
      const layout = hasMedia ? section.layout || 'side' : 'text';
      return (
        <section className={`gallery story story--${layout}`} key={si}>
          <SectionHead section={section} />
          <div className="story__layout">
            <StoryText section={section} />
            {hasMedia && (
              <div className={`story__media story__media--${section.images.length}`}>
                {section.images.map((image, i) => (
                  <Figure key={image.src} image={image} delay={i * 0.1} sizes="(min-width: 900px) 50vw, 100vw" />
                ))}
              </div>
            )}
          </div>
        </section>
      );
    }
    return null;
  });
}
