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

Spread order on the site follows the PDF: Cold:, Contents, Into the Cold,
bobsled spread, The Underdogs, Ester Ledecká quote, Small Names Big Moments,
The Return, Mark McMorris, Vonn / Bjørndalen, Petra Majdič / Kevin Pearce,
Kaillie Humphries, The Legends, snowboard / no. 45, podium faces, Credits.

These extracted at good quality and need no action: cover graphic (4096 px),
About photo (1440 px), Cold Blooded angled spreads (3000 px), Momentum3 athlete
(2112 px), Gala program, Harbert tees and
Harbert Magazine (1280–1376 px wide).

The Momentum3 event arch, beanie, cap, lanyard/credential and hoodie images were
supplied separately (not from the PDF) at ~1500–2000 px and are used unchanged.

The Momentum3 watersports tower, beanie/cap on-model, Instagram feed,
Instagram countdown and sticker collection originals (full-size PNGs, ~25 MB
total) live in `source-images/momentum3/` and are not deployed. The site uses
WebP copies in `public/images/momentum3/` made by `tools/web_images.py`:
uniform scale-down only (long edge ≤ 1800 px, tower kept at 1536 px), never
cropped, so proportions match the originals. Re-run it if you replace an original.

## Nothing But Time (from EP-Presentation-CadeBrown.pptx)

Exported with `tools/album_images.py`: the deck's JPEGs are copied unchanged;
its PNGs are saved as WebP scaled down uniformly to ≤ 2000 px (never cropped,
except the two typography details, which use the deck's own slide-9 crops).
Images under 900 px wide are shown no larger than ~1.25× native size. The
smallest are the collage detail crops (hand marks 400 × 250, halftone 650 × 750,
layered paper 800 × 550), the eye motif crops (700 × 330, 540 × 330), the
mark-making study (666 × 882) and the Side A label (760 × 760) — larger exports
of these would let them display bigger.
