// ExpandableCard — shared, obviously-clickable card used by Services and
// Seminars. Collapsed: photo banner + title + tags + a clear ＋ toggle. Click
// anywhere (or the toggle) to expand in place into the full detail (description
// + inclusions + CTA); ✕ minimises it again. Works on dark (Services) and light
// (Seminars) backgrounds via the `scheme` prop.

// Card titles come straight from the content — every one of them is Lauren's
// to write in /admin. There used to be a slug-keyed map here that rewrote the
// three consultation titles on the way to the page ("Follow-up Consultation"
// and friends); it silently overrode anything she typed, so retitling a
// consultation in /admin did nothing. The tidied wording now lives in the
// content itself instead, where she can change it.
function serviceName(title) {
  return { name: title, brand: null };
}

// Card eyebrows used to carry a running number ("01 · CONSULTATION"). Those
// numbers went out of order once the sections were split across pages, so the
// client asked for them to go. Stripped at render rather than edited out of the
// content, because the card copy is served from Blob (Lauren's /admin edits) —
// this way it's fixed without touching, or waiting on, her saved content.
function stripLeadNumber(label) {
  return String(label || '').replace(/^\s*\d+\s*[·.\-–—:)]\s*/, '');
}

// Banner image area. Renders only when a real photo is supplied — the branded
// placeholder was removed at the client's request ("these probably don't need
// images"), so image-less cards are now purely typographic.
function CardBanner({ image }) {
  if (!image) return null;
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
      <picture>
        <source srcSet={image.avif} type="image/avif" />
        <img src={image.jpg} alt={image.alt || ''} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </picture>
    </div>
  );
}

function ExpandableCard({ card, scheme, displayName, brandTag, cta, expanded, onToggle, cardRef, large }) {
  const [hov, setHov] = React.useState(false);
  const dark = scheme === 'dark';
  const CREAM = '#EAE6D7', INK = '#201C12', ACCENT = '#FF6C00';
  const fg = dark ? CREAM : INK;
  const sub = dark ? 'rgba(234,230,215,.72)' : 'rgba(32,28,18,.72)';
  const line = (a) => (dark ? `rgba(234,230,215,${a})` : `rgba(32,28,18,${a})`);
  const bg = dark ? 'rgba(255,255,255,.05)' : '#fff';
  const name = displayName || card.title;
  const hasDetail = !!(card.body || (card.bullets && card.bullets.length));

  const stop = (e) => e.stopPropagation();

  return (
    <div
      ref={cardRef}
      id={card.anchor || slugify(card.title)}
      className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-200 scroll-mt-28 cursor-pointer"
      style={{
        background: bg,
        border: `1px solid ${line(expanded || hov ? '.28' : '.1')}`,
        boxShadow: dark ? 'none' : (hov || expanded ? '0 6px 28px rgba(32,28,18,.1)' : '0 2px 14px rgba(32,28,18,.05)'),
        transform: expanded ? 'none' : (hov ? 'translateY(-2px)' : 'none'),
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onToggle}
      data-blob-hover
    >
      {card.popular && (
        <div className="flex items-center justify-center py-2 font-mono text-[10px] uppercase tracking-[.22em] font-bold flex-shrink-0" style={{ background: ACCENT, color: CREAM }}>
          Most Popular
        </div>
      )}

      <CardBanner image={card.image} />

      <div className={`flex flex-col flex-1 ${large ? 'px-7 pt-5' : 'px-6 pt-5'} pb-6`}>
        {/* eyebrow / brand tag + toggle. The tag Lauren saves in /admin wins;
            the branded name is only a fallback for cards that have never had
            one set, so editing it in /admin now actually shows on the site. */}
        <div className="flex items-start justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[.2em]" style={{ color: ACCENT }}>
            {stripLeadNumber(card.eyebrow || brandTag) || ' '}
          </span>
          <button
            onClick={(e) => { stop(e); onToggle(); }}
            aria-expanded={expanded}
            aria-label={expanded ? 'Show less' : 'Show details'}
            className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full transition-all"
            style={{ background: expanded ? ACCENT : line('.1'), color: expanded ? CREAM : fg, fontSize: 16, lineHeight: 1 }}
          >
            {expanded ? '✕' : '＋'}
          </button>
        </div>

        <h3 className="mt-3 font-display leading-[.9]" style={{ fontSize: large ? 'clamp(24px, 2.6vw, 38px)' : 'clamp(20px, 2vw, 28px)', color: fg }}>
          <span className="skew-italic">{name}</span>
        </h3>

        {/* tags — always visible for quick scanning */}
        {card.tags && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {card.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-[.16em]" style={{ border: `1px solid ${line('.2')}`, color: fg }}>{tag}</span>
            ))}
          </div>
        )}

        {/* expandable detail */}
        {hasDetail && (
          <div style={{ display: 'grid', gridTemplateRows: expanded ? '1fr' : '0fr', transition: 'grid-template-rows .35s ease' }}>
            <div style={{ overflow: 'hidden' }}>
              {card.body && <p className="mt-4 text-[14px] leading-relaxed" style={{ color: sub }}>{card.body}</p>}
              {card.bullets && (
                <ul className="mt-4 space-y-2.5" aria-label="Includes">
                  {card.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed" style={{ color: dark ? 'rgba(234,230,215,.78)' : 'rgba(32,28,18,.78)' }}>
                      <span className="mt-[5px] flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {cta && (
                <div className="mt-6" onClick={stop}>
                  {cta.type === 'enquiry' ? (
                    <button onClick={() => openEnquiry(cta.topic || 'General')} className="btn-shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold" style={{ background: ACCENT, color: CREAM }} data-blob-hover>
                      {cta.label || 'Enquire'} <span style={{ fontFamily: 'Anton' }}>→</span>
                    </button>
                  ) : (
                    <a href={cta.url || CALENDLY_URL} className="btn-shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold" style={{ background: ACCENT, color: CREAM }} data-blob-hover>
                      {cta.label || 'Book a call'} <span style={{ fontFamily: 'Anton' }}>→</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* collapsed hint */}
        {hasDetail && !expanded && (
          <span className="mt-4 font-mono text-[10px] uppercase tracking-[.18em]" style={{ color: dark ? 'rgba(234,230,215,.5)' : 'rgba(32,28,18,.45)' }}>
            Tap for details
          </span>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ExpandableCard, serviceName });
