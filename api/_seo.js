// Head tags + schema.org structured data for the server-rendered pages
// (api/render.js). Titles and descriptions come from ROUTE_META in
// src/router.jsx so the browser and the server never disagree; everything here
// is the site-wide identity search engines and AI answers read.

const SITE_URL = 'https://www.updietitian.com';
const OG_IMAGE = { url: `${SITE_URL}/assets/images/og/og-default.jpg`, width: 1200, height: 630, alt: 'Athletes running in UP Dietitian kit' };

// Business facts. The street address is the Front Runner Physiotherapy clinic
// where Lauren consults in person; keep it character-for-character identical
// to her Google Business Profile and directory listings.
const BUSINESS = {
  name: 'UP Dietitian',
  email: 'hello@updietitian.com',
  instagram: 'https://www.instagram.com/up_dietitian/',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2/16 Baden Street',
    addressLocality: 'Osborne Park',
    addressRegion: 'WA',
    postalCode: '6017',
    addressCountry: 'AU',
  },
};

// Pages that carry the visible FAQ with FAQPage markup. Google asks for a
// repeated FAQ to be marked up once, so /services shows it without markup.
const FAQ_MARKUP_ROUTES = new Set(['/perth-dietitian']);

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// JSON inside <script> must not be able to close the tag.
const jsonForScript = (v) => JSON.stringify(v).replace(/</g, '\\u003c');

const canonicalFor = (pathname) => SITE_URL + (pathname === '/' ? '/' : pathname);

function structuredData(pathname, meta, content) {
  const get = (p, fb) => p.split('.').reduce((n, k) => (n == null ? n : n[k]), content) ?? fb;
  const specialties = get('about.specialtyTags', []);
  const cards = [...get('services.heroCards', []), ...get('services.tierCards', [])];

  const business = {
    '@type': 'MedicalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    alternateName: 'UP Dietitian — Lauren Nash APD',
    description: 'Sports dietitian in Perth, Western Australia. Accredited Practising Dietitian Lauren Nash helps everyday to elite athletes with performance nutrition, race fuelling, body composition, gut health and injury recovery — in person in Osborne Park or online.',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/assets/logo-orange-icon.png`,
    image: OG_IMAGE.url,
    email: BUSINESS.email,
    address: BUSINESS.address,
    medicalSpecialty: 'https://schema.org/DietNutrition',
    areaServed: [
      { '@type': 'City', name: 'Perth', containedInPlace: { '@type': 'State', name: 'Western Australia' } },
      { '@type': 'Country', name: 'Australia' },
    ],
    founder: { '@id': `${SITE_URL}/#lauren` },
    employee: { '@id': `${SITE_URL}/#lauren` },
    knowsAbout: specialties,
    sameAs: [BUSINESS.instagram],
  };
  if (cards.length) {
    business.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Nutrition services',
      itemListElement: cards.map((c) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: c.title,
          description: c.body,
          url: `${SITE_URL}/services#${c.id}`,
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: 'Perth, Western Australia and online',
        },
      })),
    };
  }

  const lauren = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#lauren`,
    name: 'Lauren Nash',
    jobTitle: 'Accredited Practising Dietitian',
    description: get('about.bioParagraphs', [])[0],
    image: `${SITE_URL}/assets/images/about/about-image.JPG`,
    url: `${SITE_URL}/about`,
    worksFor: { '@id': `${SITE_URL}/#business` },
    knowsAbout: ['Sports nutrition', ...specialties],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Accredited Practising Dietitian (APD)',
      credentialCategory: 'Professional accreditation',
      recognizedBy: { '@type': 'Organization', name: 'Dietitians Australia', url: 'https://dietitiansaustralia.org.au' },
    },
  };

  const pageType = { '/about': 'AboutPage', '/contact': 'ContactPage' }[pathname] || 'WebPage';
  const graph = [
    business,
    lauren,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: BUSINESS.name,
      inLanguage: 'en-AU',
      publisher: { '@id': `${SITE_URL}/#business` },
    },
    {
      '@type': pageType,
      '@id': `${canonicalFor(pathname)}#webpage`,
      url: canonicalFor(pathname),
      name: meta.title,
      description: meta.desc,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      inLanguage: 'en-AU',
    },
  ];

  const faq = get('faq.items', []);
  if (FAQ_MARKUP_ROUTES.has(pathname) && faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonicalFor(pathname)}#faq`,
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

// Everything that goes in <head> for one page, replacing the template <title>.
function headTags(pathname, meta, content, { notFound } = {}) {
  const url = canonicalFor(pathname);
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.desc)}" />`,
  ];
  if (notFound) {
    tags.push('<meta name="robots" content="noindex" />');
    return tags.join('\n');
  }
  tags.push(
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(BUSINESS.name)}" />`,
    `<meta property="og:locale" content="en_AU" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.desc)}" />`,
    `<meta property="og:image" content="${esc(OG_IMAGE.url)}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.desc)}" />`,
    `<meta name="twitter:image" content="${esc(OG_IMAGE.url)}" />`,
    `<script type="application/ld+json">${jsonForScript(structuredData(pathname, meta, content))}</script>`,
  );
  return tags.join('\n');
}

module.exports = { SITE_URL, headTags, jsonForScript };
