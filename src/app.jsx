// App — root composition + client-side routing + tweaks wiring.
//
// The site was a single long-scroll page; it's now split into real routed pages
// (see src/router.jsx + vercel.json) so it's not one giant scroll and each page
// gets its own URL and analytics pageview. Nav + Footer render on every page;
// the route decides what sits between them.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "green",
  "headline": "LEVEL UP | YOUR | PERFORMANCE",
  "sub": "Performance nutrition made practical. UP Dietitian supports active individuals with personalised nutrition strategies to optimise energy, recovery, race-day confidence and long-term health and performance.",
  "density": "regular"
}/*EDITMODE-END*/;
// content.json (edited via /admin) overrides the hero copy defaults above,
// so Lauren's edits show up without touching this tweak-mode block.
TWEAK_DEFAULTS.headline = C('hero.headline', TWEAK_DEFAULTS.headline);
TWEAK_DEFAULTS.sub = C('hero.sub', TWEAK_DEFAULTS.sub);

const HEADLINE_PRESETS = [
  "LEVEL UP | YOUR | PERFORMANCE",
  "FUELING | IS A | PERFORMANCE TOOL",
  "RACE DAY | STARTS AT | BREAKFAST",
  "TRAIN HARD. | EAT SMART. | GO UP."
];

// Scroll-progress bar — a thin orange fill at the very top that tracks how far
// down the page you are, so progress toward the bottom is always visible.
// On-brand orange; remounted per route (key) so it resets on navigation.
function ScrollProgress() {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const d = document.documentElement;
      const scrollable = d.scrollHeight - window.innerHeight;
      setPct(scrollable > 0 ? Math.min(1, (window.scrollY || 0) / scrollable) : 0);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    calc();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return (
    <div aria-hidden style={{ position: 'fixed', top: 0, left: 0, height: 3, width: `${pct * 100}%`, background: '#FF6C00', zIndex: 50, transition: 'width .08s linear', boxShadow: '0 0 8px rgba(255,108,0,.5)' }} />
  );
}

// ---- Home-only teasers ----------------------------------------------------
// Short intros that point to the full pages, so the home page stays a tight
// overview instead of carrying every section in full.

function AboutTeaser() {
  const bio = C('about.bioParagraphs', ['']);
  const intro = Array.isArray(bio) ? bio[0] : bio;
  return (
    <section className="relative" style={{ background: '#EAE6D7', color: '#201C12', paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid grid-cols-12 gap-8 md:gap-10 items-center">
        <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
          <div className="relative w-full rounded-3xl overflow-hidden" style={{ aspectRatio: '4/5', maxWidth: 460 }}>
            <picture>
              <source srcSet="assets/images/about/about-image.avif" type="image/avif" />
              <img src="assets/images/about/about-image.JPG" alt="Lauren Nash APD" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </picture>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7 order-1 lg:order-2">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-70">
            <span className="inline-block w-6 h-px bg-current"></span>
            <span>Meet your dietitian</span>
          </div>
          <h2 className="mt-5 font-display leading-[.9]" style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
            <span className="skew-italic">Lauren</span> <span className="skew-italic" style={{ color: '#FF6C00' }}>Nash</span>
          </h2>
          <p className="mt-6 max-w-[58ch] text-[15px] md:text-[17px] leading-relaxed text-ink/80">{intro}</p>
          <Link href="/about" className="mt-7 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[.18em] font-bold underline underline-offset-4 hover:text-orange" data-blob-hover>
            Read Lauren's story →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServicesTeaser() {
  // Read live package names/summaries from Blob (via C) so Home always matches
  // what Lauren has published on the Services page. First sentence = summary.
  const summarise = (body) => {
    const s = String(body || '').match(/^[^.!?]*[.!?]/);
    return s ? s[0].trim() : String(body || '');
  };
  const hero = C('services.heroCards', null) || [];
  // Name and tag exactly as they read on the Services page, and deep-link on
  // the card's id so a retitle in /admin doesn't break the link.
  const teaser = (c) => ({
    t: serviceName(c.title).name,
    brand: c.eyebrow || serviceName(c.title).brand,
    slug: c.id || slugify(c.title),
    d: summarise(c.body),
  });
  const items = [
    hero[0] && teaser(hero[0]),
    hero[1] && teaser(hero[1]),
    // The third card links to the Services page as a whole rather than one
    // service, so it has no card of its own to borrow an eyebrow from. Its
    // accent tag and summary are their own content keys, editable in /admin —
    // it used to be the only card on the row without the orange line.
    {
      t: 'Consultations & Coaching',
      brand: C('services.teaserTag', 'ONE-OFF & ONGOING SUPPORT'),
      slug: null,
      d: C('services.teaserCopy', 'Initial and follow-up consultations, plus ongoing performance nutrition coaching through your training block.'),
    },
  ].filter(Boolean);
  return (
    <section className="relative noise" style={{ background: '#1D4032', color: '#EAE6D7', paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: '#FF6C00' }}>What we offer</div>
            <h2 className="mt-3 font-display leading-[.9]" style={{ fontSize: 'clamp(44px, 8vw, 120px)' }}>
              <span className="skew-italic">Services</span>
            </h2>
          </div>
          <Link href="/services" className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] mb-2 opacity-80 hover:opacity-100" data-blob-hover>
            View all services <span style={{ fontFamily: 'Anton' }}>→</span>
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Link key={i} href={it.slug ? `/services#${it.slug}` : '/services'} className="flex flex-col rounded-2xl p-6 transition-colors" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(234,230,215,.1)' }} data-blob-hover>
              {it.brand && <span className="font-mono text-[10px] uppercase tracking-[.2em] mb-2" style={{ color: '#FF6C00' }}>{it.brand}</span>}
              <h3 className="font-display leading-[.95]" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', color: '#EAE6D7' }}>
                <span className="skew-italic">{it.t}</span>
              </h3>
              <p className="mt-4 text-[14px] leading-relaxed" style={{ color: 'rgba(234,230,215,.72)' }}>{it.d}</p>
              <span className="mt-5 font-mono text-[11px] uppercase tracking-[.18em]" style={{ color: '#FF6C00' }}>Learn more →</span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex md:hidden">
          <Link href="/services" className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[.18em] font-bold underline underline-offset-4" data-blob-hover>
            View all services →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---- Pages ----------------------------------------------------------------

function HomePage({ t, theme }) {
  return (
    <React.Fragment>
      {/* The "everyday to elite" marquee and the auto-scrolling photo strip
          were removed at the client's request — the home page reads calmer
          without two moving bands competing with the hero slideshow. */}
      <Hero headline={t.headline} sub={t.sub} theme={theme} />
      <AboutTeaser />
      <ServicesTeaser />
      <section className="relative" style={{ background: '#EAE6D7', color: '#201C12', paddingBlock: 'var(--pad-y, 96px)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <Testimonials />
          {/* Closing image — the bottom of the home page ran out of content on
              the right before the footer, so a branded shot fills the gap and
              hands off into the dark footer. Decorative, hence alt="". */}
          <div className="mt-10 md:mt-12 flex justify-center md:justify-end">
            <div className="relative w-full rounded-3xl overflow-hidden" style={{ paddingBottom: 'min(125%, 475px)', maxWidth: 380 }}>
              <picture>
                <source srcSet="assets/images/misc/Socials_5.avif" type="image/avif" />
                <img
                  src="assets/images/misc/Socials_5.jpg"
                  alt=""
                  loading="lazy"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </picture>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

// Sub-page sections fill their own background behind the fixed nav and carry
// ~96px internal top padding, so they clear the bar without a colour gap.
function AboutPage({ theme }) {
  return <About theme={theme} />;
}

function ServicesPage({ theme }) {
  return (
    <React.Fragment>
      <Services theme={theme} />
      <Process theme={theme} />
    </React.Fragment>
  );
}

function SeminarsPage({ theme }) {
  return <Seminars theme={theme} />;
}

function ClinicPage({ theme }) {
  return <Clinic theme={theme} />;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const route = useRoute();
  // Passing `route` re-binds the cursor blob to elements a new page renders.
  useCursorBlob(route);

  // Update css density attr on body
  React.useEffect(() => {
    document.body.dataset.density = t.density;
  }, [t.density]);

  const theme = t.theme;

  let page;
  switch (route) {
    case '/':         page = <HomePage t={t} theme={theme} />; break;
    case '/about':    page = <AboutPage theme={theme} />; break;
    case '/services': page = <ServicesPage theme={theme} />; break;
    case '/seminars': page = <SeminarsPage theme={theme} />; break;
    case '/clinic':   page = <ClinicPage theme={theme} />; break;
    case '/contact':  page = <ContactPage />; break;
    case '/privacy':  page = <Privacy />; break;
    case '/cookies':  page = <Cookies />; break;
    case '/terms':    page = <Terms />; break;
    default:          page = <NotFound />; break;
  }

  const isNotFound = !ROUTES.includes(route);

  return (
    <div data-density={t.density} className="pb-[68px] md:pb-0" style={{ background: '#EAE6D7' }}>
      <ScrollProgress key={route} />
      <Nav theme={theme} route={route} />
      {page}
      {!isNotFound && <Footer theme={theme} />}
      <EnquiryModal />
      {!isNotFound && <StickyCTA />}

      {route === '/' && (
        <TweaksPanel>
          <TweakSection label="Theme" />
          <TweakRadio label="Hero color" value={t.theme} options={['green', 'orange', 'sand']} onChange={(v) => setTweak('theme', v)} />

          <TweakSection label="Hero copy" />
          <TweakSelect label="Headline preset" value={t.headline} options={HEADLINE_PRESETS} onChange={(v) => setTweak('headline', v)} />
          <TweakText label="Headline (| = new line)" value={t.headline} onChange={(v) => setTweak('headline', v)} />
          <TweakText label="Sub copy" value={t.sub} onChange={(v) => setTweak('sub', v)} />

          <TweakSection label="Layout" />
          <TweakRadio label="Density" value={t.density} options={['compact', 'regular', 'airy']} onChange={(v) => setTweak('density', v)} />
        </TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
