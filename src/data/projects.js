// Project content. Text is quoted from the source PDF; nothing has been added.
// Image paths point to files extracted from the PDF into /public/images.
// `lowRes: true` marks images whose embedded resolution in the PDF is too small
// for large display — they are shown no larger than their native size and are
// listed in IMAGE_REPLACEMENTS.md.

const img = (src, w, h, alt, extra = {}) => ({ src, w, h, alt, ...extra });

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
      '/images/momentum3/event-arch.jpg',
      2116,
      1322,
      'Momentum3 branded start arch on a snowy mountain course, with the pixel-arrow mark and MOMENTUM³ wordmark in yellow on black.'
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
          '/images/momentum3/event-arch.jpg',
          2116,
          1322,
          'Momentum3 branded start arch on a snowy mountain course, with the pixel-arrow mark and MOMENTUM³ wordmark in yellow on black.'
        )
      },
      {
        type: 'grid',
        label: 'Merchandise',
        columns: 3,
        images: [
          img('/images/momentum3/beanie.webp', 336, 448, 'Black Momentum3 beanie with a vertical yellow wordmark tag.', {
            lowRes: true,
            bg: '#ffffff'
          }),
          img(
            '/images/momentum3/beanie-and-cap.jpg',
            1373,
            863,
            'Black Momentum3 beanie and five-panel cap with yellow contrast stitching and the embroidered logo.'
          ),
          img(
            '/images/momentum3/hoodie.jpg',
            384,
            416,
            'White hoodie with a grey sleeve stripe and a yellow Momentum3 graphic band across the chest.',
            { lowRes: true }
          )
        ]
      }
    ],
    missing: [
      'Year / date of the project',
      'Course or institution the academic project was for',
      'What Momentum3 is (the PDF does not describe the brand itself)',
      'Higher-resolution beanie and hoodie mockups (see IMAGE_REPLACEMENTS.md)'
    ]
  },
  {
    slug: 'posters',
    category: 'Posters',
    title: 'Posters',
    kind: null,
    focus: null,
    role: null,
    tools: null,
    cover: img(
      '/images/posters/poster-warrior-aesthetic.jpg',
      1232,
      1712,
      'Poster titled “Warrior Aesthetic” for the Tokyo Fuji Art Museum: samurai armour over crumpled paper with blue and pink graphic bands.'
    ),
    hero: null,
    sections: [
      {
        type: 'grid',
        columns: 3,
        images: [
          img(
            '/images/posters/poster-geometric-collage.jpg',
            368,
            424,
            'Collage of triangular paper cut-outs in pink, black, white and yellow arranged in a geometric grid.',
            { lowRes: true }
          ),
          img(
            '/images/posters/poster-orange-collage.jpg',
            344,
            436,
            'Torn-paper collage on orange: a red abstract face with a cut-out eye, halftone shapes and lined paper.',
            { lowRes: true }
          ),
          img(
            '/images/posters/poster-vivo-rio.jpg',
            344,
            456,
            'Poster for VIVO Rio Pro, Saquarema, Rio de Janeiro: black-and-white surf photos behind a translucent Brazilian flag and surfboard.',
            { lowRes: true }
          )
        ]
      },
      {
        type: 'grid',
        columns: 2,
        images: [
          img(
            '/images/posters/poster-warrior-aesthetic.jpg',
            1232,
            1712,
            'Poster titled “Warrior Aesthetic” for the Tokyo Fuji Art Museum: samurai armour over crumpled paper with blue and pink graphic bands.'
          ),
          img(
            '/images/posters/poster-every-moment-counts.jpg',
            2731,
            4096,
            'NBA Playoffs poster “Every Moment Counts”: black-and-white collage of players, one lifting a trophy, with broadcaster logos.'
          )
        ]
      }
    ],
    missing: [
      'Any description of the poster series — the PDF shows the posters without text',
      'Titles, year, and whether each poster was academic, personal, or client work',
      'Role and tools used',
      'Higher-resolution images of the three collage/VIVO Rio posters (see IMAGE_REPLACEMENTS.md)'
    ]
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
