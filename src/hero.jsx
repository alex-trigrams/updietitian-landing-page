// Hero — kinetic type, scroll-parallax, no photo.
function Hero({ headline, sub, theme }) {
  const t = THEMES[theme];
  const y = useScrollY();
  const ref = React.useRef(null);

  // Parallax for kinetic rows (scroll-tied)
  const offset = Math.min(y, 800);

  // Split headline into rows; user can swap copy via tweaks
  const rows = headline.split('|').map(s => s.trim());

  return (
    <section
      ref={ref}
      id="top"
      data-screen-label="01 Hero"
      className="relative noise scan overflow-hidden"
      style={{ background: t.bg, color: t.fg, minHeight: '100svh', paddingTop: 96 }}
    >
      {/* full-bleed background image */}
      <div aria-hidden className="absolute inset-0 pointer-events-none select-none">
        <picture>
          <source srcSet="assets/images/hero/up-hero-banner.avif" type="image/avif" />
          <img src="assets/images/hero/up-hero-banner.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
        </picture>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.55) 0%, rgba(0,0,0,.3) 35%, rgba(0,0,0,.55) 75%, rgba(0,0,0,.75) 100%)' }}></div>
      </div>

      {/* big background UP mark */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ transform: `translate3d(0, ${offset * -0.15}px, 0)`, opacity: .06 }}
      >
        <img src="assets/logo-orange-icon.png" alt="" style={{ width: '92vw', maxWidth: 1400, height: 'auto', display: 'block' }} />
      </div>

      {/* status strip */}
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[.2em] opacity-80">
        <span className="flex items-center gap-2"><span className="inline-block w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: t.accent }}></span> Taking on athletes now</span>
        <span className="hidden sm:inline">Perth, WA 6000</span>
        <span>APD since 2024</span>
      </div>

      {/* Kinetic headline */}
      <div className="relative max-w-[1700px] mx-auto px-5 md:px-8 mt-10 md:mt-16">
        {rows.map((line, i) => (
          <div
            key={i}
            className="kinetic-row whitespace-nowrap"
            style={{ transform: `translate3d(${(i % 2 === 0 ? -1 : 1) * offset * 0.25}px, 0, 0)` }}
          >
            <h1
              className="font-display leading-[.86] tracking-tight"
              style={{
                fontSize: 'clamp(64px, 18.5vw, 280px)',
                color: i === 1 ? t.accent : t.fg,
                textShadow: i === 1 ? 'none' : 'none',
              }}
            >
              <span className="skew-italic">{line}</span>
            </h1>
          </div>
        ))}
      </div>

      {/* sub copy + CTA cluster */}
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 mt-10 md:mt-14 grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-7 lg:col-span-6">
          <p className="text-[15px] md:text-[18px] leading-snug max-w-[44ch]" style={{ color: t.sub }}>
            {sub}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={CALENDLY_URL}
              className="btn-shine inline-flex items-center gap-3 px-6 py-4 rounded-full font-mono text-[12px] md:text-[13px] uppercase tracking-[.18em] font-bold"
              style={{ background: t.accent, color: '#EAE6D7' }}
              data-blob-hover
            >
              Book a Discovery Call
              <span aria-hidden style={{ fontFamily: 'Anton' }}>→</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-5 py-4 rounded-full font-mono text-[12px] uppercase tracking-[.18em] border"
              style={{ borderColor: t.line, color: t.fg }}
              data-blob-hover
            >See services</a>
          </div>
        </div>

        {/* stats card */}
        <div className="col-span-12 md:col-span-5 lg:col-span-6 md:flex md:justify-end">
          <div
            className="grid grid-cols-3 gap-4 md:gap-6 p-5 md:p-6 rounded-2xl w-full md:w-auto"
            style={{ background: 'rgba(0,0,0,.35)', border: `1px solid ${t.line}`, backdropFilter: 'blur(8px)' }}
          >
            <Stat n={6} suffix="+" label="Sports I work in" theme={theme} />
            <Stat n={150} suffix="+" label="Athletes coached" theme={theme} />
            <Stat n={24} suffix="hr" label="I reply within" theme={theme} />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 mt-14 md:mt-24 pb-14 flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[.2em]" style={{ color: t.sub }}>
        <span>scroll ↓  eat like you train</span>
        <span className="hidden sm:inline">In-clinic · Front Runner Sports, Osborne Park</span>
        <span>APD #LN-2024</span>
      </div>
    </section>
  );
}

function Stat({ n, suffix, label, theme }) {
  const ref = React.useRef(null);
  const seen = useInView(ref);
  const v = useCounter(n, seen);
  const t = THEMES[theme];
  return (
    <div ref={ref} className="flex flex-col">
      <div className="font-display tabular leading-none" style={{ fontSize: 'clamp(34px, 5vw, 56px)', color: t.accent }}>
        {v}<span>{suffix}</span>
      </div>
      <div className="font-mono uppercase text-[10px] md:text-[11px] tracking-[.16em] mt-2" style={{ color: t.sub }}>{label}</div>
    </div>
  );
}

window.Hero = Hero;
