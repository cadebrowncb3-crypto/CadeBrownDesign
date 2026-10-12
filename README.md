# Cade Brown — Design Portfolio

Portfolio website built from `Cade_Brown_Portfolio.pdf` with **React + Vite**,
**GSAP** (ScrollTrigger, SplitText via `@gsap/react`), **Lenis** smooth scroll and
selected **React Bits** components.

## Design — "Index & Object" (branch `claude/redesign`)

Informed by auge-xp.com (type-led layout, floating menu box, numbered work
index, scrambling tags, loading counter) and codybrowndesign.com (clear
case-study storytelling, faint grid).

- **Colour:** paper `#EDEEE5`, ink `#0D0D0D`, one accent — highlighter yellow `#FDF48B`.
- **Type:** Archivo (variable, 800) for display; Instrument Sans for text and
  labels; Instrument Serif italic for accent words. All self-hosted (Fontsource).
- **Navigation:** fixed black menu box bottom-right (Work / About / Let's talk),
  collapsing to a button on phones. URLs unchanged.
- **Motion:** first-visit 000→100 counter, page wipe on route change, masked
  line/character reveals (React Bits SplitText), scrambling tags and menu items
  (React Bits DecryptedText), scroll-velocity disciplines strip (React Bits
  ScrollVelocity), magnetic contact button (React Bits Magnet), image reveals and
  a pinned cover frame on the work index (GSAP ScrollTrigger), Lenis smooth
  scroll. With `prefers-reduced-motion: reduce` there is no counter, wipe,
  scramble, strip movement, parallax or smooth scroll; content shows immediately.

The previous design is preserved on branch `backup/before-redesign`.

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
- `src/lib/` — Lenis/GSAP setup, reduced-motion hook, first-visit intro state
- `src/components/` — reveals, index, gallery, contact, lightbox
- `src/components/reactbits/` — SplitText, DecryptedText, ScrollVelocity, Magnet copied from
  [React Bits](https://github.com/DavidHDev/react-bits) (MIT + Commons Clause);
  each file notes its small adaptations
- `src/lib/SmoothScroll.jsx` — Lenis ⇄ ScrollTrigger sync as documented in the Lenis README
- `public/images/` — artwork extracted from the PDF (`tools/export_assets.py`), the
  album deck (`tools/album_images.py`) and
  web-sized copies of supplied originals (`tools/web_images.py`)
- `source-images/` — full-size originals you uploaded (kept in git, not deployed)

## Motion

- Image reveals, entrance animations and scroll-triggered motion use GSAP with
  `gsap.matchMedia()`; with `prefers-reduced-motion: reduce` nothing animates,
  Lenis is not started and content is shown immediately.
- Artwork is never filtered, recoloured or permanently cropped; reveals are
  clip-path masks on the frame.

See `CONTENT_NOTES.md` for missing information (the on-site boxes are hidden) and `IMAGE_REPLACEMENTS.md` for
images that need higher-resolution exports.
