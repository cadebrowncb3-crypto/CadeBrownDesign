# CadeBrownDesign
Portfolio for Cade Brown Design

A React + Vite site using:

- [GSAP](https://github.com/greensock/GSAP) + ScrollTrigger for scroll-driven animation
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling, driven by GSAP's ticker so the two stay in sync
- Components from [React Bits](https://github.com/DavidHDev/react-bits), copied into `src/components/reactbits/`:
  - **Grainient**: animated grainy gradient behind the hero; reacts to the cursor
  - **SplitText**: per-letter reveal of the hero title
  - **BlurText**: blur-in section headings (edited to accept a `tag` prop and to use a plain CSS class instead of Tailwind)
  - **TiltedCard**: 3D tilt and caption on project cards
  - **Magnet**: the contact link pulls toward the cursor

Visitors with "reduce motion" turned on get a static page: no smooth scrolling, no text animations, no tilt.

## Develop

```sh
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the built site
```

The build uses relative asset paths, so `dist/` can be hosted from any folder (e.g. GitHub Pages, Netlify, Vercel).

## Editing

- **Projects:** `src/projects.js`. Put images in `public/projects/` and reference them as `projects/your-image.jpg`.
- **Contact email:** `CONTACT_EMAIL` at the top of `src/App.jsx`.
- **Hero gradient colors:** `HERO_COLORS` in `src/App.jsx`.
- **Copy, sections and animations:** `src/App.jsx`.
- **Colors and fonts:** CSS variables at the top of `src/styles.css`.

## Licenses

React Bits components are MIT + Commons Clause: free to use in this site, but the components themselves may not be sold.
