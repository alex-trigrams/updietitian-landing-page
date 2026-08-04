// Hero — kinetic type over a cross-fading photo slideshow.
//
// The slideshow stands in for the planned hero video until it's ready. Headline
// sized to fit the whole hero (type + sub-panel + cue) inside one screen — the
// client asked for the opening words to fit on a single screen.

const HERO_SLIDES = [
  { avif: 'assets/images/hero/slideshow/slide-1.avif', jpg: 'assets/images/hero/slideshow/slide-1.jpg' },
  { avif: 'assets/images/hero/slideshow/slide-2.avif', jpg: 'assets/images/hero/slideshow/slide-2.jpg' },
  { avif: 'assets/images/hero/slideshow/slide-3.avif', jpg: 'assets/images/hero/slideshow/slide-3.jpg' },
  { avif: 'assets/images/hero/slideshow/slide-4.avif', jpg: 'assets/images/hero/slideshow/slide-4.jpg' },
  { avif: 'assets/images/hero/slideshow/slide-5.avif', jpg: 'assets/images/hero/slideshow/slide-5.jpg' },
  { avif: 'assets/images/hero/slideshow/slide-6.avif', jpg: 'assets/images/hero/slideshow/slide-6.jpg' },
];

function HeroSlideshow() {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // hold the first frame for reduced-motion users
    const id = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none select-none" style={{ background: '#201C12' }}>
      {HERO_SLIDES.map((s, i) => (
        <picture key={i}>
          <source srcSet={s.avif} type="image/avif" />
          <img
            src={s.jpg}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 30%', display: 'block',
              opacity: i === idx ? 1 : 0, transition: 'opacity 1.4s ease-in-out',
            }}
          />
        </picture>
      ))}
      {/* darkening gradient for text legibility */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.55) 0%, rgba(0,0,0,.32) 35%, rgba(0,0,0,.55) 75%, rgba(0,0,0,.8) 100%)' }}></div>
    </div>
  );
}

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
      className="relative noise scan overflow-hidden flex flex-col"
      style={{ background: t.bg, color: t.fg, minHeight: '100svh', paddingTop: 96 }}
    >
      <HeroSlideshow />

      {/* status strip — the "interim reel" note and the big UP watermark were
          removed at the client's request; the slideshow now stands on its own. */}
      <div className="relative max-w-[1400px] mx-auto w-full px-5 md:px-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[.2em] opacity-80">
        <span className="flex items-center gap-2"><span className="inline-block w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: t.accent }}></span> Taking on athletes now</span>
      </div>

      {/* Kinetic headline */}
      <div className="relative max-w-[1700px] mx-auto w-full px-5 md:px-8 mt-8 md:mt-10">
        {rows.map((line, i) => (
          <div
            key={i}
            className="kinetic-row whitespace-nowrap"
            style={{ transform: `translate3d(${(i % 2 === 0 ? -1 : 1) * offset * 0.25}px, 0, 0)` }}
          >
            <h1
              className="font-display leading-[.86] tracking-tight"
              style={{
                fontSize: 'clamp(44px, 11vw, 132px)',
                color: i === 1 ? t.accent : t.fg,
              }}
            >
              <span className="skew-italic">{line}</span>
            </h1>
          </div>
        ))}
      </div>

      {/* sub copy + CTA cluster */}
      <div className="relative max-w-[1400px] mx-auto w-full px-5 md:px-8 mt-8 md:mt-10 grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-7 lg:col-span-6 p-5 md:p-6 rounded-2xl" style={{ background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(8px)' }}>
          <p className="text-[14px] md:text-[16px] leading-snug max-w-[44ch]" style={{ color: t.sub }}>
            {sub}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="btn-shine inline-flex items-center gap-3 px-6 py-4 rounded-full font-mono text-[12px] md:text-[13px] uppercase tracking-[.18em] font-bold"
              style={{ background: t.accent, color: '#EAE6D7' }}
              data-blob-hover
            >
              Explore services
              <span aria-hidden style={{ fontFamily: 'Anton' }}>→</span>
            </Link>
            <a
              href={CALENDLY_URL}
              className="inline-flex items-center gap-2 font-mono text-[12px] md:text-[13px] uppercase tracking-[.16em] font-bold underline underline-offset-4"
              style={{ color: t.fg }}
              data-blob-hover
            >
              Book a free call
            </a>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative max-w-[1400px] mx-auto w-full px-5 md:px-8 mt-auto pt-8 pb-8 flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[.2em]" style={{ color: t.sub }}>
        <span>scroll ↓  level up your performance</span>
        <span className="hidden sm:inline">In-clinic · Front Runner Physiotherapy, Osborne Park</span>
        <span>APD</span>
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
