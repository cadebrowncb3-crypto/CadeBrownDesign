// Project content. Text is quoted from the source PDF; nothing has been added.
// Image paths point to files extracted from the PDF into /public/images.
// `lowRes: true` marks images whose embedded resolution in the PDF is too small
// for large display — they are shown no larger than their native size and are
// listed in IMAGE_REPLACEMENTS.md.

// Images under 900 px wide are capped near their native size (never blown up).
const img = (src, w, h, alt, extra = {}) => ({ src, w, h, alt, lowRes: w < 900, ...extra });

const spreads = Array.from({ length: 16 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return img(`/images/cold-blooded/spread-${n}.webp`, 303, 292, `Cold Blooded booklet, spread ${i + 1} of 16.`, {
    lowRes: true
  });
});

export const projects = [
  {
    slug: 'cold-blooded',
    category: 'Editorial Design',
    title: 'Cold Blooded',
    kind: 'Academic Project',
    focus: 'Magazine Layout & Art Direction',
    role: 'I led the Winter Olympics booklet from concept to print. I designed the flatplan, established the typographic hierarchy, created the visual language, and refined layouts for clarity and cinematic impact. I also curated imagery, guided pacing and tone, and handled all production details from color workflow to print‑ready files.',
    tools: ['InDesign', 'Photoshop', 'Concept Development', 'Lightroom'],
    cover: img(
      '/images/cold-blooded/spreads-overview.jpg',
      3000,
      2250,
      'Cold Blooded booklet spreads laid out at an angle, including the Kaillie Humphries feature and “04 The Legends” opener.'
    ),
    hero: img(
      '/images/cold-blooded/cover-mockup.jpg',
      512,
      342,
      'Cold Blooded booklet cover on a grey surface: title over a grid of black-and-white athlete photos and blue squares.',
      { lowRes: true }
    ),
    sections: [
      {
        type: 'feature',
        image: img(
          '/images/cold-blooded/spreads-overview.jpg',
          3000,
          2250,
          'Cold Blooded booklet spreads laid out at an angle, including the Kaillie Humphries feature and “04 The Legends” opener.'
        )
      },
      {
        type: 'spreads',
        label: 'The full booklet',
        images: [
          img('/images/cold-blooded/front-cover.webp', 165, 292, 'Cold Blooded booklet front cover.', { lowRes: true }),
          ...spreads,
          img('/images/cold-blooded/back-cover.webp', 165, 292, 'Cold Blooded booklet back cover.', { lowRes: true })
        ]
      }
    ],
    missing: [
      'Year / date of the project',
      'Course or institution the academic project was for',
      'Higher-resolution exports of the cover mockup and the 16 spreads + covers (see IMAGE_REPLACEMENTS.md)'
    ]
  },
  {
    slug: 'momentum3',
    category: 'Branding',
    title: 'Momentum3',
    kind: 'Academic Project',
    focus: 'Brand Identity System',
    role: 'I created the Momentum3 brand system, building a bold identity centered on movement and clarity. I designed the mark to capture forward motion with clean geometry and a tight, modern palette. I kept the overall direction minimal and purposeful, giving the brand a clear sense of drive and progression.',
    tools: ['InDesign', 'Photoshop', 'Concept Development', 'Lightroom'],
    // Swatches as shown on slide 8 (colour values sampled from the PDF render;
    // not official brand specs).
    palette: ['#111313', '#e0e31b', '#f3f2ee'],
    cover: img(
      '/images/momentum3/event-arch.webp',
      1584,
      993,
      'Momentum3 start arch on a snowy mountain course: black and yellow graphics with the pixel-arrow mark, MOMENTUM³ wordmark, “Stop 03” and “Never idle”.'
    ),
    hero: img(
      '/images/momentum3/athlete-wetsuit.jpg',
      2112,
      1104,
      'Surfer celebrating on the beach in a black and yellow Momentum3 rash guard, carried by a crowd.'
    ),
    sections: [
      {
        type: 'feature',
        image: img(
      '/images/momentum3/event-arch.webp',
      1584,
      993,
      'Momentum3 start arch on a snowy mountain course: black and yellow graphics with the pixel-arrow mark, MOMENTUM³ wordmark, “Stop 03” and “Never idle”.'
    )
      },
      {
        type: 'feature',
        label: 'Event',
        image: img(
          '/images/momentum3/watersports-tower.webp',
          1536,
          1024,
          'Wooden judging tower in the surf wrapped in black and yellow Momentum3 banners, with jet skis below and green mountains behind.'
        )
      },
      {
        type: 'grid',
        label: 'Apparel & merchandise',
        columns: 2,
        images: [
          img('/images/momentum3/beanie.webp', 1509, 2000, 'Black ribbed Momentum3 beanie with glitch-style yellow knit marks and a vertical yellow wordmark tag on the cuff.'),
          img('/images/momentum3/beanie-model.webp', 1359, 1800, 'Model wearing the black and yellow Momentum3 beanie with a black hooded jacket.'),
          img('/images/momentum3/cap.webp', 1507, 2000, 'Black five-panel Momentum3 cap with yellow contrast stitching, embroidered pixel-arrow mark and MOMENTUM³ wordmark, brown leather strap.'),
          img('/images/momentum3/cap-model.webp', 1362, 1800, 'Model wearing the black Momentum3 five-panel cap with the yellow embroidered logo and a black hooded jacket.'),
          img('/images/momentum3/hoodie.webp', 1494, 2000, 'White hoodie with black sleeve panels and a black-and-yellow Momentum3 graphic band across the chest reading “EST 2026”.'),
          img('/images/momentum3/lanyard-badge.webp', 2000, 1760, 'Yellow Momentum3 lanyard with distressed black wordmark print, holding a collage-style athlete credential listing name, country and stance.')
        ]
      },
      {
        type: 'grid',
        label: 'Social & stickers',
        columns: 3,
        images: [
          img('/images/momentum3/instagram-feed.webp', 1122, 1402, 'Phone showing the momentum³ Instagram feed with skateboarding and surfing posts captioned “Never idle”.'),
          img('/images/momentum3/instagram-countdown.webp', 1440, 1800, 'Phone showing a momentum³ Instagram post: a black-and-white collage countdown reading “21 days until drop-in”.'),
          img('/images/momentum3/sticker-collection.webp', 1254, 1254, 'Sticker sheet of black-and-white Momentum3 die-cut stickers: wordmarks, pixel-arrow marks and mountain shapes.')
        ]
      }
    ],
    missing: [
      'Year / date of the project',
      'Course or institution the academic project was for',
      'What Momentum3 is (the PDF does not describe the brand itself)'
    ]
  },
  {
    // Source: EP-Presentation-CadeBrown.pptx (slide text; speaker notes not used).
    slug: 'nothing-but-time',
    category: 'Album Package Design',
    title: 'Nothing But Time',
    info: [
      { label: 'Project', text: 'Album package design', large: true },
      { label: 'Year', text: '2026', large: true },
      {
        label: 'Deliverables',
        list: ['Front cover', 'Back cover', 'Booklet insert', 'Side A / Side B record labels']
      },
      { label: 'Typeface', text: 'IBM Plex Mono', large: true }
    ],
    cover: img(
      '/images/nothing-but-time/package-front-back.jpg',
      2000,
      1790,
      'Nothing But Time album package: orange collage front sleeve and blue collage back sleeve, each with a green vinyl record sliding out.'
    ),
    hero: img(
      '/images/nothing-but-time/package-front-back.jpg',
      2000,
      1790,
      'Nothing But Time album package: orange collage front sleeve and blue collage back sleeve, each with a green vinyl record sliding out.'
    ),
    sections: [
      {
        type: 'story',
        label: '01 / Overview',
        title: 'One release, four surfaces',
        cards: [
          { title: 'The package', text: 'Front cover, back cover, booklet insert and Side A / Side B record labels.' },
          {
            title: 'The method',
            text: 'Hand-built collage from found imagery plus images and type I made, scanned and finished in Photoshop.'
          },
          {
            title: 'The voice',
            text: 'One collage language carried across every format, so the package reads as a single object.'
          }
        ],
        tags: ['handmade', 'torn paper', 'layered', 'archival', 'rhythmic', 'monospaced']
      },
      {
        type: 'story',
        label: '02 / Research',
        title: 'Inspiration and references',
        cards: [
          { title: 'David Carson — Collage', text: 'Torn edges and scraps layered into one irregular shape.' },
          { title: 'Rad Future — Analog collage', text: 'Found paper, pattern tape and book text stacked in layers.' },
          { title: 'David Carson — Nucollage', text: 'A torn color shape cut through by bold, overlapping type.' }
        ]
      },
      {
        type: 'story',
        label: '03 / Early experiments',
        title: 'Music into marks',
        body: [
          'We began by listening to music and making marks in response to what we heard.',
          'I kept those studies and reused them as elements across the collages, so the music is physically present in the final pieces.'
        ],
        images: [
          img('/images/nothing-but-time/mark-making.jpg', 666, 882, 'Collage study on blue: torn black, white and patterned paper over printed text.', {
            caption: 'Mark making exercise'
          })
        ]
      },
      {
        type: 'story',
        label: '04 / Making',
        title: 'From paper to print',
        steps: [
          { title: 'Gather', text: 'Found imagery plus images and type I made.' },
          { title: 'Collage', text: 'Layered by hand into covers, insert and labels.' },
          { title: 'Scan', text: 'Every piece scanned in.' },
          { title: 'Photoshop', text: 'Color corrected, shadows added to separate layers.' },
          { title: 'Print', text: 'Output as sleeve, insert and record labels.' }
        ]
      },
      {
        type: 'grid',
        label: '05 / Making',
        title: 'The physical pieces, documented',
        columns: 3,
        images: [
          img('/images/nothing-but-time/documented-front.webp', 2000, 2000, 'The printed front sleeve with its green record, photographed from above.', {
            caption: 'Front'
          }),
          img('/images/nothing-but-time/documented-back.webp', 2000, 2000, 'The printed blue back sleeve with its green record, photographed from above.', {
            caption: 'Back'
          }),
          img('/images/nothing-but-time/insert-spread.webp', 2000, 1429, 'The open booklet insert: lyrics and credits in monospaced type beside torn collage strips.', {
            caption: 'Insert spread'
          })
        ]
      },
      {
        type: 'story',
        label: '06 / Collage language',
        title: 'Rough edges, layers, texture',
        layout: 'cover',
        cards: [
          { title: 'Halftone', text: 'Dots give torn shapes a printed texture.' },
          { title: 'Layered paper', text: 'Notebook sheets and scraps stack under the type.' },
          { title: 'Hand marks', text: 'Gestural scribbles add rhythm.' }
        ],
        images: [
          img('/images/nothing-but-time/front-cover.jpg', 1500, 1500, 'Nothing But Time front cover: orange collage with a cut-out eye, halftone shapes, notebook paper and torn red letters.', {
            caption: 'Front cover'
          }),
          img('/images/nothing-but-time/detail-halftone.jpg', 650, 750, 'Detail of a torn halftone dot shape on orange.', { caption: 'Halftone' }),
          img('/images/nothing-but-time/detail-layered-paper.jpg', 800, 550, 'Detail of layered notebook paper and scraps under typed text.', {
            caption: 'Layered paper'
          }),
          img('/images/nothing-but-time/detail-hand-marks.jpg', 400, 250, 'Detail of hand-drawn scribbled X marks.', {
            caption: 'Hand marks'
          })
        ]
      },
      {
        type: 'grid',
        label: '07 / Motifs',
        title: 'The eye crosses both sides',
        columns: 2,
        images: [
          img('/images/nothing-but-time/motif-eye-front.jpg', 700, 330, 'Cut-out eye on the orange front cover.', { caption: 'Front: orange' }),
          img('/images/nothing-but-time/motif-eye-back.jpg', 540, 330, 'Cut-out eye on the blue back cover.', { caption: 'Back: blue' })
        ],
        body: [
          'A recurring cut-out eye ties the two sides together, alongside furniture-like forms that appear on both covers.'
        ]
      },
      {
        type: 'story',
        label: '08 / Typography',
        title: 'IBM Plex Mono',
        body: [
          'A monospaced face reads like a typewriter or a receipt.',
          'Used for tracklist, credits, lyrics and titles across every piece.'
        ],
        images: [
          img('/images/nothing-but-time/type-detail-back.webp', 441, 553, 'Crumpled receipt-style tracklist on the back cover: Side A and Side B songs, record label, barcode, catalog number and credits.', {
            caption: 'Back cover tracklist'
          }),
          img('/images/nothing-but-time/type-detail-insert.webp', 717, 236, 'Insert detail: song title, release year, original project, producers and the start of the lyrics.', {
            caption: 'Insert'
          })
        ]
      },
      {
        type: 'story',
        label: '09 / Extending the system',
        title: 'Labels cropped from the covers',
        cards: [
          { title: 'Crop as design', text: 'Each label is a close crop of its cover, so the record plays as a fragment of the sleeve.' }
        ],
        body: ['Side B repeats the move with the back cover.'],
        images: [
          img('/images/nothing-but-time/front-cover.jpg', 1500, 1500, 'Nothing But Time front cover.', { caption: 'Front cover' }),
          img('/images/nothing-but-time/label-side-a.jpg', 760, 760, 'Side A record label: a close crop of the orange front cover with catalog number NBT-2026-001 and “Side A 45RPM Stereo”.', {
            caption: 'Side A label'
          })
        ]
      },
      {
        type: 'story',
        label: '10 / Extending the system',
        title: 'Two sides, one record',
        cards: [
          { title: 'Label details', text: 'Catalog number, side and speed are set in the same mono type as the booklet.' }
        ],
        meta: 'Side A / 45RPM Stereo / NBT-2026-001',
        images: [
          img('/images/nothing-but-time/record-side-a.webp', 2000, 1997, 'Green translucent 7-inch record with the orange Side A label.', {
            caption: 'Side A record'
          })
        ]
      },
      {
        type: 'story',
        label: '11 / Booklet insert',
        title: 'The insert keeps the same voice',
        body: [
          'Printed type and images, collaged in the same torn, layered style.',
          'Lyrics, credits and titles in Plex Mono.'
        ],
        images: [
          img('/images/nothing-but-time/insert-spread.webp', 2000, 1429, 'The open booklet insert: lyrics and credits in monospaced type beside torn collage strips.', {
            caption: 'Insert spread'
          })
        ]
      },
      {
        type: 'grid',
        label: '12 / Outcome',
        title: 'Front and back, with records',
        columns: 2,
        images: [
          img('/images/nothing-but-time/outcome-front-side-a.jpg', 2000, 1480, 'Orange front sleeve with the green Side A record sliding out to the right.', {
            caption: 'Front sleeve + Side A'
          }),
          img('/images/nothing-but-time/outcome-back-side-b.jpg', 2000, 1489, 'Blue back sleeve with the green Side B record sliding out to the left.', {
            caption: 'Back sleeve + Side B'
          })
        ]
      },
      {
        type: 'story',
        label: '13 / Reflection',
        title: 'What the process taught me',
        points: [
          {
            title: 'Make by hand first',
            text: 'Photoshop only refined color and shadow, so the final pieces stay tactile.'
          },
          {
            title: 'Constraints build consistency',
            text: 'One typeface, one collage method and one color logic held four formats together.'
          },
          {
            title: 'Let the music leave marks',
            text: 'Reusing the listening studies gave the images a rhythm the cleaner pieces lack.'
          }
        ]
      }
    ],
    missing: []
  },
  {
    slug: 'media-production-group',
    category: 'Experience',
    title: 'Media Production Group, Auburn University',
    kind: 'Internship',
    focus: 'Branding, editorial & promotional design',
    role: 'During my internship at Media Production Group at Auburn University, I contributed to a variety of branding, editorial, and promotional design projects for Auburn University and its partners. I contributed on the Harbert Magazine, the Winchester Gala Program, Harbert College of Business merchandise, and the visual identity for the We Spoke Podcast, while also creating digital and print assets for event promotions. I helped develop cohesive visual systems across multiple platforms, focused on strong storytelling, consistency, and professional communication.',
    tools: null,
    cover: img(
      '/images/experience/harbert-magazine.jpg',
      1328,
      1648,
      'Harbert Magazine, Fall 2025 cover: “A Prepared Mind” spelled in Scrabble tiles on a wooden table.'
    ),
    hero: img(
      '/images/experience/gala-program.jpg',
      1376,
      1824,
      'Gala program cover, “Celebrating Auburn Real Estate”, May 8, 2025, The Winchester Institute — illustrated blue city skyline.'
    ),
    sections: [
      {
        type: 'grid',
        columns: 3,
        images: [
          img(
            '/images/experience/harbert-tee.jpg',
            1280,
            1920,
            'Back of a navy T-shirt with an orange Harbert Graduate Business Programs crest featuring an eagle and campus buildings.'
          ),
          img(
            '/images/experience/harbert-magazine.jpg',
            1328,
            1648,
            'Harbert Magazine, Fall 2025 cover: “A Prepared Mind” spelled in Scrabble tiles on a wooden table.'
          ),
          img(
            '/images/experience/harbert-tee-cap.jpg',
            1376,
            1824,
            'Navy T-shirt with an expressive orange Harbert Graduate Business Programs eagle illustration, worn with a backwards cap.'
          )
        ]
      }
    ],
    missing: [
      'Internship dates and job title',
      'Images of the We Spoke Podcast identity and the event-promotion assets mentioned in the text'
    ]
  }
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
