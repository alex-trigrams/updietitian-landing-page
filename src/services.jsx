// Services — two-row card layout with hero packages and consultation tiers.
const SVC_BG     = '#1D4032';
const SVC_ACCENT = '#FF6C00';
const SVC_CREAM  = '#EAE6D7';

const HERO_CARDS = [
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

const TIER_CARDS = [
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

function ServiceCard({ card, large }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      role="article"
      tabIndex={0}
      className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-200 outline-none focus-visible:ring-2"
      style={{
        background: 'rgba(255,255,255,.05)',
        border: `1px solid rgba(234,230,215,${hov ? '.28' : '.10'})`,
        padding: large ? '0 0 28px' : '0 0 24px',
        minHeight: large ? 420 : 300,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setHov(true)}
      onBlur={() => setHov(false)}
      data-blob-hover
    >
      {/* MOST POPULAR banner */}
      {card.popular && (
        <div
          className="flex items-center justify-center py-2.5 font-mono text-[10px] uppercase tracking-[.22em] font-bold flex-shrink-0"
          style={{ background: SVC_ACCENT, color: SVC_CREAM }}
        >
          Most Popular
        </div>
      )}

      <div className={`flex flex-col flex-1 ${large ? 'px-7 pt-6' : 'px-6 pt-5'} gap-0`}>
        {/* eyebrow + arrow row */}
        <div className="flex items-start justify-between gap-2">
          {card.eyebrow
            ? <span className="font-mono text-[11px] uppercase tracking-[.2em]" style={{ color: SVC_ACCENT }}>{card.eyebrow}</span>
            : <span aria-hidden />
          }
          <a
            href={CALENDLY_URL}
            aria-label="Book a discovery call"
            className="flex-shrink-0 text-[20px] leading-none transition-transform duration-150"
            style={{ color: SVC_CREAM, transform: hov ? 'translate(2px,-2px)' : 'translate(0,0)', fontFamily: 'Anton' }}
          >↗</a>
        </div>

        {/* title */}
        <h3
          className="mt-3 font-display leading-[.9]"
          style={{ fontSize: large ? 'clamp(24px, 2.6vw, 40px)' : 'clamp(20px, 2vw, 30px)', color: SVC_CREAM }}
        >
          <span className="skew-italic">{card.title}</span>
        </h3>

        {/* body */}
        <p className="mt-4 text-[14px] leading-relaxed" style={{ color: 'rgba(234,230,215,.72)' }}>
          {card.body}
        </p>

        {/* bullets */}
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

        {/* tags — pushed to bottom */}
        <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
          {card.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-[.16em]"
              style={{ border: '1px solid rgba(234,230,215,.2)', color: SVC_CREAM }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Services({ theme }) {
  return (
    <section id="services" data-screen-label="03 Services" className="relative noise" style={{ background: SVC_BG, color: SVC_CREAM, paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">

        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: SVC_ACCENT }}>What We Offer</div>
            <h2 className="mt-3 font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}>
              <span className="skew-italic">SERVICES</span>
            </h2>
          </div>
          <a
            href={CALENDLY_URL}
            className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] mb-2 opacity-80 hover:opacity-100 transition-opacity"
            style={{ color: SVC_CREAM }}
            data-blob-hover
          >
            Book a Discovery Call <span style={{ fontFamily: 'Anton' }}>↗</span>
          </a>
        </div>

        {/* Row 1 — hero cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {HERO_CARDS.map((card, i) => <ServiceCard key={i} card={card} large />)}
        </div>

        {/* Row 2 — tier cards */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIER_CARDS.map((card, i) => <ServiceCard key={i} card={card} large={false} />)}
        </div>

        {/* Footer strip */}
        <div
          className="mt-6 p-5 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5"
          style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(234,230,215,.1)' }}
        >
          <div className="flex items-stretch gap-4">
            <div className="w-0.5 flex-shrink-0 rounded-full" style={{ background: SVC_ACCENT }}></div>
            <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(234,230,215,.68)' }}>
              Private health rebates available for participating funds. Payment plan options available on request.<br className="hidden md:block" />
              All consults available in person (Perth, WA) or online.
            </p>
          </div>
          <a
            href={CALENDLY_URL}
            className="flex-shrink-0 font-mono text-[12px] uppercase tracking-[.18em] underline underline-offset-4 hover:opacity-80 transition-opacity"
            style={{ color: SVC_CREAM }}
            data-blob-hover
          >
            Book a free discovery call ↗
          </a>
        </div>

      </div>
    </section>
  );
}

window.Services = Services;
