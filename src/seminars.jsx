// Seminars — group education offering. Cream section, sits after Services.
// Audience is an organisation (workplace, club, community group), not the
// individual athlete, so the framing leads with outcomes for the group.
const SEM_INK    = '#201C12';
const SEM_ACCENT = '#FF6C00';
const SEM_CREAM  = '#EAE6D7';

const SEMINAR_ENQUIRY = 'mailto:lauren@updietitian.com?subject=' +
  encodeURIComponent('Seminar enquiry — UP Dietitian') +
  '&body=' + encodeURIComponent(
    "Hi Lauren,\n\nI'd like to enquire about a seminar.\n\n" +
    'Organisation:\nGroup type (workplace / club / community):\n' +
    'Approx. group size:\nPreferred format (in person or online):\n' +
    'Rough timing:\n\nThanks,\n'
  );

const SEMINAR_AUDIENCES_DEFAULT = [
  {
    eyebrow: '01 · WORKPLACE',
    title: 'CORPORATE & WORKPLACE',
    body: 'Practical nutrition education for teams who want more consistent energy through the working day. Cuts through diet noise with evidence-based guidance staff can actually use — no fads, no restriction.',
    bullets: [
      'Energy, focus and the 3pm slump',
      'Eating well around shift work and travel',
      'Fuelling for staff who train before or after work',
      'Cutting through nutrition misinformation',
    ],
    tags: ['LUNCH & LEARN', 'WELLBEING DAYS', 'ONLINE OR ON SITE'],
  },
  {
    eyebrow: '02 · CLUBS & TEAMS',
    title: 'SPORTING CLUBS & TEAMS',
    body: 'Squad-wide fuelling education that lifts the whole group at once. Built around your sport, your season and your competition demands — so athletes turn up to game day already knowing the plan.',
    bullets: [
      'Training-day and game-day fuelling',
      'Recovery nutrition between sessions',
      'Hydration and travel for away fixtures',
      'Supporting junior and developing athletes',
    ],
    tags: ['PRE-SEASON', 'SQUAD SESSIONS', 'PARENT NIGHTS'],
  },
  {
    eyebrow: '03 · COMMUNITY',
    title: 'COMMUNITY & EVENTS',
    body: 'Guest speaking for run clubs, tri clubs, gyms and event expos. An engaging, jargon-free session that leaves the room with something they can apply to their next session or start line.',
    bullets: [
      'Race-week and race-day fuelling',
      'Gut training and avoiding GI issues',
      'Everyday eating for recreational athletes',
      'Q&A tailored to the room',
    ],
    tags: ['RUN & TRI CLUBS', 'GYMS', 'EXPO TALKS'],
  },
];

const SEMINAR_INCLUSIONS_DEFAULT = [
  'A pre-session consult to tailor content to your group',
  'A 45–60 minute presentation, in person (Perth) or online',
  'Live Q&A so questions get answered in the room',
  'Take-home resource pack for every attendee',
  'Optional follow-up session or discounted 1-on-1 rate for attendees',
];

function SeminarCard({ card }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      role="article"
      tabIndex={0}
      className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-200 outline-none focus-visible:ring-2"
      style={{
        background: '#fff',
        border: `1px solid rgba(32,28,18,${hov ? '.22' : '.1'})`,
        boxShadow: hov ? '0 6px 28px rgba(32,28,18,.1)' : '0 2px 14px rgba(32,28,18,.05)',
        padding: '0 0 24px',
        minHeight: 320,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setHov(true)}
      onBlur={() => setHov(false)}
      data-blob-hover
    >
      <div className="flex flex-col flex-1 px-6 pt-5 gap-0">
        <div className="flex items-start justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[.2em]" style={{ color: SEM_ACCENT }}>
            {card.eyebrow}
          </span>
          <a
            href={SEMINAR_ENQUIRY}
            aria-label={`Enquire about ${card.title.toLowerCase()} seminars`}
            className="flex-shrink-0 text-[20px] leading-none transition-transform duration-150"
            style={{ color: SEM_INK, transform: hov ? 'translate(2px,-2px)' : 'translate(0,0)', fontFamily: 'Anton' }}
          >↗</a>
        </div>

        <h3 className="mt-3 font-display leading-[.9]" style={{ fontSize: 'clamp(20px, 2vw, 30px)', color: SEM_INK }}>
          <span className="skew-italic">{card.title}</span>
        </h3>

        <p className="mt-4 text-[14px] leading-relaxed" style={{ color: 'rgba(32,28,18,.72)' }}>
          {card.body}
        </p>

        {card.bullets && (
          <ul className="mt-4 space-y-2.5" aria-label="Topics covered">
            {card.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed" style={{ color: 'rgba(32,28,18,.78)' }}>
                <span className="mt-[5px] flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: SEM_ACCENT }} aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
          {card.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-[.16em]"
              style={{ border: '1px solid rgba(32,28,18,.18)', color: SEM_INK }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Seminars({ theme }) {
  const audiences = C('seminars.audiences', null) || SEMINAR_AUDIENCES_DEFAULT;
  const cards = SEMINAR_AUDIENCES_DEFAULT.map((d, i) => (audiences[i] ? { ...d, ...audiences[i] } : d));
  const inclusions = C('seminars.inclusions', SEMINAR_INCLUSIONS_DEFAULT);

  return (
    <section
      id="seminars"
      data-screen-label="04 Seminars"
      className="relative noise"
      style={{ background: SEM_CREAM, color: SEM_INK, paddingBlock: 'var(--pad-y, 96px)' }}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">

        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: SEM_ACCENT }}>
              {C('seminars.eyebrow', 'Group Education')}
            </div>
            <h2 className="mt-3 font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}>
              <span className="skew-italic">SEMINARS</span>
            </h2>
          </div>
          <a
            href={SEMINAR_ENQUIRY}
            className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] mb-2 opacity-80 hover:opacity-100 transition-opacity"
            style={{ color: SEM_INK }}
            data-blob-hover
          >
            Enquire about a seminar <span style={{ fontFamily: 'Anton' }}>↗</span>
          </a>
        </div>

        {/* Intro */}
        <p className="mt-6 text-[15px] md:text-[17px] leading-relaxed max-w-[62ch]" style={{ color: 'rgba(32,28,18,.72)' }}>
          {C('seminars.intro', 'One session, a whole room better fuelled. Lauren delivers practical, evidence-based nutrition education to workplaces, sporting clubs and community groups — translating sports nutrition science into advice people can act on the same week. Every seminar is built around your group rather than delivered off the shelf.')}
        </p>

        {/* Audience cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => <SeminarCard key={i} card={card} />)}
        </div>

        {/* What's included + deck request */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">

          <div
            className="md:col-span-7 rounded-2xl p-6 md:p-8"
            style={{ background: '#fff', border: '1px solid rgba(32,28,18,.1)' }}
          >
            <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: SEM_ACCENT }}>
              What's included
            </div>
            <ul className="mt-5 space-y-3" aria-label="Every seminar includes">
              {inclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: 'rgba(32,28,18,.8)' }}>
                  <span className="mt-[6px] flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: SEM_ACCENT }} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="md:col-span-5 rounded-2xl p-6 md:p-8 flex flex-col"
            style={{ background: SEM_INK, color: SEM_CREAM }}
          >
            <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: SEM_ACCENT }}>
              Seminar guide
            </div>
            <h3 className="mt-3 font-display leading-[.9]" style={{ fontSize: 'clamp(24px, 2.4vw, 34px)' }}>
              <span className="skew-italic">REQUEST THE FULL OVERVIEW</span>
            </h3>
            <p className="mt-4 text-[14px] leading-relaxed" style={{ color: 'rgba(234,230,215,.72)' }}>
              {C('seminars.deckCopy', 'A short guide covering session formats, topics, what your group walks away with, and pricing for your size and setting. Tell Lauren a little about your group and she\'ll send it through.')}
            </p>
            <a
              href={SEMINAR_ENQUIRY}
              className="btn-shine mt-auto self-start inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold"
              style={{ background: SEM_ACCENT, color: SEM_CREAM, marginTop: 24 }}
              data-blob-hover
            >
              Request the seminar guide →
            </a>
          </div>
        </div>

        {/* Footer strip */}
        <div
          className="mt-4 p-5 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5"
          style={{ background: 'rgba(32,28,18,.04)', border: '1px solid rgba(32,28,18,.1)' }}
        >
          <div className="flex items-stretch gap-4">
            <div className="w-0.5 flex-shrink-0 rounded-full" style={{ background: SEM_ACCENT }}></div>
            <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(32,28,18,.68)' }}>
              {C('seminars.footerNote', 'Pricing is quoted per group based on size, format and travel — get in touch for a tailored quote. Seminars are available in person across Perth, WA or online anywhere in Australia. Attendees receive a discounted rate on 1-on-1 consultations.')}
            </p>
          </div>
          <a
            href={SEMINAR_ENQUIRY}
            className="flex-shrink-0 font-mono text-[12px] uppercase tracking-[.18em] underline underline-offset-4 hover:opacity-80 transition-opacity"
            style={{ color: SEM_INK }}
            data-blob-hover
          >
            Enquire about a seminar ↗
          </a>
        </div>

      </div>
    </section>
  );
}

window.Seminars = Seminars;
