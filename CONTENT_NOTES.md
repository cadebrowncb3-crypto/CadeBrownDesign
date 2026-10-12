# Content notes — what came from the PDF and what is missing

Everything written on the site is quoted from `Cade_Brown_Portfolio.pdf`.
No project details, achievements or contact details were invented.
While `SHOW_CONTENT_NOTES` in `src/data/site.js` is `true`, the site shows a
dashed red "content needed" box wherever information is missing. Fill in the
gaps in `src/data/site.js` / `src/data/projects.js`, then set it to `false`.

## Missing information

**Contact**
- “@Badecrown” — the PDF does not say which platform it is on, so it is shown as plain text (not a link).

**About**
- Location, education, résumé/CV, LinkedIn/Behance/other links.

**Editorial Design — Cold Blooded**
- Year, course/institution. (Title “Cold Blooded” is taken from the booklet cover itself; the PDF text calls it “the Winter Olympics booklet”.)

**Branding — Momentum3**
- Year, course/institution, and what Momentum3 actually is — the PDF describes the identity work but not the brand.

**Posters**
- The PDF shows five posters with no text at all: no titles, descriptions, dates, role, tools, or whether they were academic, personal or client work. Image alt text describes only what is visible.

**Experience — Media Production Group, Auburn University**
- Internship dates and job title.
- No images of the We Spoke Podcast identity or the event-promotion assets mentioned in the text.

## Derived (not stated as text in the PDF)
- Momentum3 palette hex values (#111313, #E0E31B, #F3F2EE) were sampled from the swatches on slide 8 — confirm against your brand file.
- Fonts: the PDF embeds its typefaces as unnamed outlines, so the site uses the closest open-licence matches — JetBrains Mono (display caps), Atkinson Hyperlegible Next (body) and Archivo Narrow (labels). Swap in the originals in `src/main.jsx` / `src/styles/global.css` if you have licences.
