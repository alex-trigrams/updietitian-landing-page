// Services — two labelled tiers (Performance Plans + Consultations & Coaching)
// rendered with the shared ExpandableCard: clear plain-English names up front,
// Lauren's brand name as a small tag, full detail behind a click-to-expand.
// Nav dropdown / Home deep-link to a card via /services#slug.
const SVC_BG     = '#1D4032';
const SVC_ACCENT = '#FF6C00';
const SVC_CREAM  = '#EAE6D7';

const HERO_CARDS_DEFAULT = [
  {
    popular: true,
    eyebrow: null,
    title: 'INITIAL CONSULT + PERFORMANCE PLAN',
    body: 'The full picture. A deep-dive initial consultation followed by a completely individualised performance nutrition plan — built around your goals, training demands, race calendar, and lifestyle.',
    bullets: [
      '30–45 min initial nutrition consultation',
      'Tailored nutrition plan for your primary goal',
      'Sports performance, body composition, race fuelling, injury recovery or health outcomes',
      'Meal timing, training-day fuelling, and recovery protocols',
      'Private health rebates available',
    ],
    tags: ['ALL SPORTS', 'RACE PREP', 'BODY COMPOSITION', 'HEALTH OUTCOMES'],
  },
  {
    popular: false,
    eyebrow: 'RACE PACKAGE',
    title: 'LEVEL UP RACE FUELLING PACK',
    body: 'The complete race preparation package. Everything you need to arrive at the start line with a tested nutrition and fuelling strategy — from initial consult through to race morning.',
    bullets: [
      '1 × 30-min initial nutrition consultation',
      'Individualised performance nutrition plan',
      '8 weeks of nutrition coaching (fortnightly on request)',
      'Full race day fuelling plan — hour by hour',
      'Carb loading protocol for race week',
    ],
    tags: ['IRONMAN', 'UTMB / ULTRA', 'MARATHON', '70.3'],
  },
];

const TIER_CARDS_DEFAULT = [
  {
    eyebrow: '01 · CONSULTATION',
    title: 'INITIAL NUTRITION CONSULTATION',
    body: 'A focused 1-on-1 session to understand your goals, training load, lifestyle and nutrition history. Walk away with personalised advice and clear targets to act on straight away.',
    bullets: null,
    tags: ['30–45 MIN', 'IN PERSON OR ONLINE', 'HEALTH REBATES'],
  },
  {
    eyebrow: '02 · FOLLOW-UP',
    title: 'REVIEW CONSULTATION',
    body: 'A 30-minute follow-up to assess progress, address new challenges, and refine your nutrition plan. Keeps you accountable and moving forward with confidence between full consults.',
    bullets: null,
    tags: ['30 MIN', 'PLAN UPDATE', 'ACCOUNTABILITY'],
  },
  {
    eyebrow: '03 · COACHING',
    title: 'PERFORMANCE NUTRITION COACHING',
    body: 'Ongoing weekly support, accountability, and plan adjustments across your training block. Ideal for athletes with a busy race calendar who need nutrition that adapts as training does.',
    bullets: [
      '1 × weekly 15-min check-in call (Zoom or phone)',
      'Weekly meal plan reviews and adjustments',
      'Unlimited email support during business hours',
      'Minimum 4-week commitment',
    ],
    tags: ['WEEKLY COACHING', '4 WEEK MIN', 'RACE SEASON'],
  },
];

// Optional photos per card — drop { avif, jpg, alt } here later, keyed by slug.
const SERVICE_IMAGES = {};

// The content list is the source of truth for how many cards there are — cards
// Lauren adds in /admin used to be dropped here, because this mapped over the
// hardcoded defaults. Defaults still supply what /admin doesn't edit (the
// "Most Popular" flag) for the cards that shipped with the site.
function mergeCards(defaults, overrides) {
  if (!overrides) return defaults;
  return overrides.map((o, i) => ({ ...(defaults[i] || {}), ...o }));
}

const HERO_CARDS = mergeCards(HERO_CARDS_DEFAULT, C('services.heroCards', null));
const TIER_CARDS = mergeCards(TIER_CARDS_DEFAULT, C('services.tierCards', null));

function Services({ theme }) {
  const [expanded, setExpanded] = React.useState({});
  const refs = React.useRef({});

  const openSlug = React.useCallback((slug) => {
    if (!slug) return;
    setExpanded(e => ({ ...e, [slug]: true }));
    const el = refs.current[slug];
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }, []);

  React.useEffect(() => {
    openSlug(decodeURIComponent((window.location.hash || '').slice(1)));
    const onHash = () => openSlug(decodeURIComponent((window.location.hash || '').slice(1)));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [openSlug]);

  const toggle = (slug) => setExpanded(e => ({ ...e, [slug]: !e[slug] }));

  const renderCard = (card, large) => {
    const slug = slugify(card.title);
    const nm = serviceName(card.title);
    // Consultations that can be booked outright link straight to their own
    // Calendly event; everything else still routes via the free discovery call.
    const direct = CALENDLY_LINKS[slug];
    return (
      <ExpandableCard
        key={slug}
        card={{ ...card, image: SERVICE_IMAGES[slug] }}
        scheme="dark"
        large={large}
        displayName={nm.name}
        brandTag={nm.brand}
        cta={direct
          ? { type: 'calendly', url: direct.url, label: direct.label }
          : { type: 'calendly', label: 'Book a discovery call' }}
        expanded={!!expanded[slug]}
        onToggle={() => toggle(slug)}
        cardRef={(el) => { refs.current[slug] = el; }}
      />
    );
  };

  return (
    <section id="services" data-screen-label="03 Services" className="relative noise" style={{ background: SVC_BG, color: SVC_CREAM, paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: SVC_ACCENT }}>What we offer</div>
            <h2 className="mt-3 font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}>
              <span className="skew-italic">SERVICES</span>
            </h2>
          </div>
          <a href={CALENDLY_URL} className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] mb-2 opacity-80 hover:opacity-100" style={{ color: SVC_CREAM }} data-blob-hover>
            Book a discovery call <span style={{ fontFamily: 'Anton' }}>↗</span>
          </a>
        </div>
        <p className="mt-6 max-w-[54ch] text-[15px] md:text-[16px] leading-relaxed" style={{ color: 'rgba(234,230,215,.7)' }}>
          Start with a package, or build from individual consultations. Tap any card to see exactly what’s included.
        </p>

        {/* Tier 1 — Performance Plans (primary) */}
        <div className="mt-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: 'rgba(234,230,215,.55)' }}>
          <span className="inline-block w-6 h-px bg-current"></span><span>Performance plans</span>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {HERO_CARDS.map((card) => renderCard(card, true))}
        </div>

        {/* Tier 2 — Consultations & Coaching (secondary) */}
        <div className="mt-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: 'rgba(234,230,215,.55)' }}>
          <span className="inline-block w-6 h-px bg-current"></span><span>Consultations &amp; coaching</span>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {TIER_CARDS.map((card) => renderCard(card, false))}
        </div>

        {/* Footer note — secondary */}
        <div className="mt-8 flex items-start gap-4">
          <div className="w-0.5 flex-shrink-0 rounded-full self-stretch" style={{ background: SVC_ACCENT }}></div>
          <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(234,230,215,.6)' }}>
            {C('services.footerNote', 'Private health rebates available for participating funds. Payment plan options available on request. All consults available in person (Perth, WA) or online.')}
          </p>
        </div>

      </div>
    </section>
  );
}

window.Services = Services;
