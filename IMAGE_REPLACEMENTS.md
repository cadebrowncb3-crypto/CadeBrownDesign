# Images that need higher-resolution replacements

All images on the site were extracted directly from `Cade_Brown_Portfolio.pdf`
(JPEGs copied byte-for-byte; images with transparency saved as lossless WebP).
The PDF embeds the files below at low resolution, so the site shows them no
larger than ~1.25× their native size. To replace one, export a larger version
from the original design file and drop it in at the **same path** (keep the
same aspect ratio, or update `w`/`h` in `src/data/projects.js` and remove
`lowRes: true`).

| PDF slide | What it is | File in this project | Size in PDF |
|---|---|---|---|
| 4 | Cold Blooded booklet cover mockup | `public/images/cold-blooded/cover-mockup.jpg` | 512 × 342 |
| 6–7 | Cold Blooded front cover | `public/images/cold-blooded/front-cover.webp` | 165 × 292 (cropped from a 512 × 342 mockup) |
| 6–7 | Cold Blooded spreads 1–16 | `public/images/cold-blooded/spread-01.webp` … `spread-16.webp` | 303 × 292 each (cropped from 512 × 342 mockups) |
| 7 | Cold Blooded back cover | `public/images/cold-blooded/back-cover.webp` | 165 × 292 |
| 11 | Geometric collage poster | `public/images/posters/poster-geometric-collage.jpg` | 368 × 424 |
| 11 | Orange collage poster | `public/images/posters/poster-orange-collage.jpg` | 344 × 436 |
| 11 | VIVO Rio Pro poster | `public/images/posters/poster-vivo-rio.jpg` | 344 × 456 |

Spread order on the site follows the PDF: Cold:, Contents, Into the Cold,
bobsled spread, The Underdogs, Ester Ledecká quote, Small Names Big Moments,
The Return, Mark McMorris, Vonn / Bjørndalen, Petra Majdič / Kevin Pearce,
Kaillie Humphries, The Legends, snowboard / no. 45, podium faces, Credits.

These extracted at good quality and need no action: cover graphic (4096 px),
About photo (1440 px), Cold Blooded angled spreads (3000 px), Momentum3 athlete
(2112 px), Warrior Aesthetic
(1232 × 1712), Every Moment Counts (2731 × 4096), Gala program, Harbert tees and
Harbert Magazine (1280–1376 px wide).

The Momentum3 event arch, beanie, cap, lanyard/credential and hoodie images were
supplied separately (not from the PDF) at ~1500–2000 px and are used unchanged.
