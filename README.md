# Cade Brown — Design Portfolio

Portfolio website built from `Cade_Brown_Portfolio.pdf` with **React + Vite**,
**GSAP** (ScrollTrigger, SplitText via `@gsap/react`), **Lenis** smooth scroll and
selected **React Bits** components.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve dist/ at http://localhost:4173
```

## Deploy on Netlify

`netlify.toml` is included (build `npm run build`, publish `dist`, SPA fallback
so `/work/...` and `/about` load directly). Either connect this GitHub repo in
Netlify (**Add new site → Import an existing project**) or run
`npm run build` and drag the `dist/` folder onto https://app.netlify.com/drop.

## Structure

- `src/data/` — all text and image references (`site.js`, `projects.js`)
- `src/pages/` — Home, Project (one template for every project), About
- `src/components/` — reveals, index, gallery, contact, lightbox
- `src/components/reactbits/` — SplitText, ScrollReveal, Magnet copied from
  [React Bits](https://github.com/DavidHDev/react-bits) (MIT + Commons Clause);
  each file notes its small adaptations
- `src/lib/SmoothScroll.jsx` — Lenis ⇄ ScrollTrigger sync as documented in the Lenis README
- `public/images/` — artwork extracted from the PDF (`tools/export_assets.py`)

## Motion

- Image reveals, entrance animations and scroll-triggered motion use GSAP with
  `gsap.matchMedia()`; with `prefers-reduced-motion: reduce` nothing animates,
  Lenis is not started and content is shown immediately.
- Artwork is never filtered, recoloured or permanently cropped; reveals are
  clip-path masks on the frame.

See `CONTENT_NOTES.md` for missing information and `IMAGE_REPLACEMENTS.md` for
images that need higher-resolution exports.
