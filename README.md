# CadeBrownDesign
Portfolio for Cade Brown Design

A static site (plain HTML/CSS/JS) animated with [GSAP](https://github.com/greensock/GSAP) and its ScrollTrigger plugin, both loaded from the cdnjs CDN.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Editing

- **Projects:** edit the `.card` blocks in `index.html`. Replace each `<div class="thumb">` with `<div class="thumb"><img src="images/your-project.jpg" alt="..."></div>`.
- **Contact:** replace `hello@example.com` in `index.html`.
- **Animations:** `js/main.js`. Everything is wrapped in `gsap.matchMedia()` so visitors with reduced motion enabled see a static page.
- **Colors/fonts:** CSS variables at the top of `css/style.css`.
