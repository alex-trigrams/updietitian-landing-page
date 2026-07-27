// Services — two labelled tiers (Performance Plans + Consultations & Coaching)
// with progressive disclosure: each card leads with a one-line summary and hides
// the full description + inclusions behind a toggle, so the page reads clearly
// instead of as a wall of text. Nav dropdown deep-links to a card via #slug.
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

// Content-editable fields (title/body/bullets/eyebrow) are merged from
// content.json by position; tags/popular stay hardcoded since they're
// structural, not copy Lauren would edit.
function mergeCards(defaults, overrides) {
  if (!overrides) return defaults;
  return defaults.map((d, i) => (overrides[i] ? { ...d, ...overrides[i] } : d));
}

const HERO_CARDS = mergeCards(HERO_CARDS_DEFAULT, C('services.heroCards', null));
const TIER_CARDS = mergeCards(TIER_CARDS_DEFAULT, C('services.tierCards', null));

// First sentence of the body → the always-visible one-liner. The remainder is
// revealed on expand, so no copy is lost, just tucked away.
function splitBody(body) {
  const text = String(body || '').trim();
  const m = text.match(/^([^.!?]*[.!?])\s*(.*)$/s);
  if (!m) return { summary: text, rest: '' };
  return { summary: m[1].trim(), rest: (m[2] || '').trim() };
}

function ServiceCard({ card, large, expanded, onToggle, cardRef }) {
  const [hov, setHov] = React.useState(false);
  const { summary, rest } = splitBody(card.body);
  const hasMore = !!(rest || (card.bullets && card.bullets.length));

  return (
    <div
      ref={cardRef}
      id={slugify(card.title)}
      role="article"
      className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-200 outline-none scroll-mt-28"
      style={{
        background: 'rgba(255,255,255,.05)',
        border: `1px solid rgba(234,230,215,${expanded || hov ? '.28' : '.10'})`,
        padding: large ? '0 0 24px' : '0 0 22px',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-blob-hover
    >
      {card.popular && (
        <div className="flex items-center justify-center py-2 font-mono text-[10px] uppercase tracking-[.22em] font-bold flex-shrink-0" style={{ background: SVC_ACCENT, color: SVC_CREAM }}>
          Most Popular
        </div>
      )}

      <div className={`flex flex-col flex-1 ${large ? 'px-7 pt-6' : 'px-6 pt-5'} gap-0`}>
        <div className="flex items-start justify-between gap-2">
          {card.eyebrow
            ? <span className="font-mono text-[11px] uppercase tracking-[.2em]" style={{ color: SVC_ACCENT }}>{card.eyebrow}</span>
            : <span aria-hidden />}
          <a href={CALENDLY_URL} aria-label="Book a discovery call" className="flex-shrink-0 text-[20px] leading-none transition-transform duration-150" style={{ color: SVC_CREAM, transform: hov ? 'translate(2px,-2px)' : 'translate(0,0)', fontFamily: 'Anton' }}>↗</a>
        </div>

        <h3 className="mt-3 font-display leading-[.9]" style={{ fontSize: large ? 'clamp(24px, 2.6vw, 38px)' : 'clamp(20px, 2vw, 28px)', color: SVC_CREAM }}>
          <span className="skew-italic">{card.title}</span>
        </h3>

        {/* Always-visible one-line summary */}
        <p className="mt-3 text-[14px] leading-relaxed" style={{ color: 'rgba(234,230,215,.72)' }}>{summary}</p>

        {/* Tags (kept visible — quick scan of what each is for) */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {card.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-[.16em]" style={{ border: '1px solid rgba(234,230,215,.2)', color: SVC_CREAM }}>{tag}</span>
          ))}
        </div>

        {/* Expandable detail */}
        {hasMore && (
          <div style={{ display: 'grid', gridTemplateRows: expanded ? '1fr' : '0fr', transition: 'grid-template-rows .35s ease' }}>
            <div style={{ overflow: 'hidden' }}>
              {rest && <p className="mt-4 text-[14px] leading-relaxed" style={{ color: 'rgba(234,230,215,.72)' }}>{rest}</p>}
              {card.bullets && (
                <ul className="mt-4 space-y-2.5" aria-label="Includes">
                  {card.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed" style={{ color: 'rgba(234,230,215,.78)' }}>
                      <span className="mt-[5px] flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: SVC_ACCENT }} aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Toggle + book */}
        <div className="mt-5 flex flex-wrap items-center gap-4">
          {hasMore && (
            <button onClick={onToggle} aria-expanded={expanded} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] hover:opacity-80" style={{ color: SVC_ACCENT }} data-blob-hover>
              {expanded ? 'Show less' : 'See what’s included'}
              <span style={{ display: 'inline-block', transition: 'transform .3s', transform: expanded ? 'rotate(180deg)' : 'none' }}>↓</span>
            </button>
          )}
          <a href={CALENDLY_URL} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] underline underline-offset-4 opacity-80 hover:opacity-100" style={{ color: SVC_CREAM }} data-blob-hover>
            Book →
          </a>
        </div>
      </div>
    </div>
  );
}

// Groups the two tiers, tracks which card is expanded, and opens/scrolls to a
// card when arrived at via /services#slug (from the nav dropdown or Home).
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
    return (
      <ServiceCard
        key={slug}
        card={card}
        large={large}
        expanded={!!expanded[slug]}
        onToggle={() => toggle(slug)}
        cardRef={(el) => { refs.current[slug] = el; }}
      />
    );
  };

  return (
    <section id="services" data-screen-label="03 Services" className="relative noise" style={{ background: SVC_BG, color: SVC_CREAM, paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">

        {/* Header */}
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
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {HERO_CARDS.map((card) => renderCard(card, true))}
        </div>

        {/* Tier 2 — Consultations & Coaching (secondary) */}
        <div className="mt-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: 'rgba(234,230,215,.55)' }}>
          <span className="inline-block w-6 h-px bg-current"></span><span>Consultations &amp; coaching</span>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
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
