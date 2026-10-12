// Site-wide content. Every value here is taken from the source PDF
// (Cade_Brown_Portfolio.pdf). Anything the PDF does not provide is listed in
// `missing` and surfaced on the site through <ContentNote />.

// Set to false once the missing information below has been supplied (or you
// decide to publish without it). While true, dashed "content needed" notes are
// shown on the pages where information is missing.
export const SHOW_CONTENT_NOTES = true;

export const site = {
  name: 'Cade Brown',
  tagline: 'Design Portfolio',
  email: 'Cadebrowncb3@gmail.com',
  phoneDisplay: '(251) 382-8150',
  phoneHref: 'tel:+12513828150',
  // The PDF lists "@Badecrown" without naming the platform, so it is shown as
  // plain text rather than a link.
  handle: '@Badecrown'
};

export const about = {
  photo: {
    src: '/images/about/cade-brown.jpg',
    w: 1440,
    h: 1080,
    alt: 'Cade Brown smiling outdoors in a yellow Grateful Dead T-shirt and a black cap.'
  },
  // Verbatim from slide 3 of the PDF.
  intro:
    'I’m a designer who builds stories you can feel, cinematic, structured, and a little unruly in all the right ways.',
  bio: 'I’m a designer who builds stories you can feel, cinematic, structured, and a little unruly in all the right ways. I move between editorial systems, branding, and layout with a hands on, research‑driven process that treats every project like a world to be shaped. I’m obsessed with clarity, tension, and personality: type that misbehaves on purpose, visuals that carry weight, and narratives that actually say something. My work is intentional, expressive, and built to make people stop, look, and feel.',
  // Named in the bio above.
  disciplines: ['Editorial systems', 'Branding', 'Layout'],
  // Listed under "Skills / Tools" on the project slides.
  tools: ['InDesign', 'Photoshop', 'Lightroom', 'Concept Development'],
  experience: [
    {
      org: 'Media Production Group at Auburn University',
      role: 'Internship',
      slug: 'media-production-group'
    }
  ],
  missing: [
    'Location / where you are based',
    'Education (school, program, graduation year)',
    'Résumé / CV file',
    'Portfolio or social links (LinkedIn, Behance, Instagram, etc.)',
    'Dates for the Media Production Group internship'
  ]
};

export const contactMissing = [
  'Which platform “@Badecrown” is on (Instagram, X, TikTok…?) so it can be linked'
];
