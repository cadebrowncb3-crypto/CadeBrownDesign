import RevealImage from './RevealImage';

/** Renders a project's image sections, following the slide layouts of the PDF. */
export default function Gallery({ sections }) {
  return sections.map((section, si) => {
    if (section.type === 'feature') {
      return (
        <section className="gallery gallery--feature" key={si}>
          {section.label && <h2 className="eyebrow">{section.label}</h2>}
          <RevealImage image={section.image} className="frame" parallax sizes="(min-width: 900px) 80vw, 100vw" />
        </section>
      );
    }
    if (section.type === 'grid') {
      return (
        <section className="gallery" key={si}>
          {section.label && <h2 className="eyebrow">{section.label}</h2>}
          <div className={`gallery__grid gallery__grid--${section.columns}`}>
            {section.images.map((image, i) => (
              <div className="gallery__cell" key={image.src}>
                <RevealImage image={image} delay={i * 0.12} sizes={`(min-width: 900px) ${Math.round(100 / section.columns)}vw, 100vw`} />
              </div>
            ))}
          </div>
        </section>
      );
    }
    if (section.type === 'spreads') {
      return (
        <section className="gallery gallery--spreads" key={si}>
          {section.label && <h2 className="eyebrow">{section.label}</h2>}
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
    return null;
  });
}
