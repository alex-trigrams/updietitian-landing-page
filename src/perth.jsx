// Perth dietitian landing page (/perth-dietitian).
//
// Aimed at the broad "dietitian Perth" search, while the home page stays aimed
// at "sports dietitian Perth" so the two don't compete. Linked from the footer
// and listed in sitemap.xml. Copy is code-owned (not /admin-editable) and drawn
// only from facts already on the site; reuses the Services teaser,
// Testimonials and FAQ sections.

const PERTH_HELP = [
  { t: 'Sports performance & race fuelling', d: 'Everyday and race-day fuelling for triathlon, running, cycling, HYROX and team sports, including carbohydrate loading and race-week plans.' },
  { t: 'Gut issues when you train', d: 'Gut training and fuelling strategies to help you avoid cramping, GI upset and fading late in a session or race.' },
  { t: 'Body composition', d: 'Changing body composition while still fuelling your training properly, with no extreme restriction and no fear of food.' },
  { t: 'Combat & weight-category sport', d: 'Health-first weight management through fight camps and competition, so you make weight and still perform.' },
  { t: 'Injury recovery', d: 'Nutrition that supports healing and a confident return to training after injury.' },
  { t: 'Coeliac disease', d: 'Practical gluten-free eating that still meets the demands of your training and everyday life.' },
];

function PerthDietitianPage() {
  return (
    <React.Fragment>
      <section className="relative noise" style={{ background: '#201C12', color: '#EAE6D7', paddingTop: 'clamp(120px, 16vw, 200px)', paddingBottom: 'var(--pad-y, 96px)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-60">
            <span className="inline-block w-6 h-px bg-current"></span>
            <span>Dietitian · Perth WA</span>
          </div>
          <h1 className="mt-6 font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 10vw, 150px)' }}>
            <span className="skew-italic">Perth</span>{' '}
            <span className="skew-italic" style={{ color: '#FF6C00' }}>dietitian.</span>
            <span className="block mt-4 font-mono text-[12px] md:text-[14px] tracking-[.22em] uppercase opacity-70">Sports &amp; performance nutrition · Osborne Park &amp; online</span>
          </h1>

          <div className="mt-10 grid grid-cols-12 gap-8 md:gap-10">
            <div className="col-span-12 lg:col-span-7">
              <p className="max-w-[60ch] text-[16px] md:text-[18px] leading-relaxed opacity-85">
                UP Dietitian is a Perth dietitian practice led by Lauren Nash, an Accredited Practising Dietitian (APD) who specialises in sports nutrition. Lauren helps active people, from those training for their first event to professional athletes, eat and fuel in a way that supports their training, recovery and long-term health.
              </p>
              <p className="mt-5 max-w-[60ch] text-[16px] md:text-[18px] leading-relaxed opacity-85">
                See Lauren in person at Front Runner Physiotherapy in Osborne Park, or online from anywhere in Australia. Private health rebates are available with participating funds.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href={CALENDLY_URL} className="btn-shine inline-flex items-center gap-4 px-7 py-5 rounded-full font-mono text-[13px] md:text-[14px] uppercase tracking-[.18em] font-bold"
                   style={{ background: '#FF6C00', color: '#EAE6D7' }} data-blob-hover>
                  Book a free 15-min call
                  <span style={{ fontFamily: 'Anton' }}>→</span>
                </a>
                <Link href="/clinic" className="inline-flex items-center gap-2 font-mono text-[12px] md:text-[13px] uppercase tracking-[.16em] font-bold underline underline-offset-4 hover:text-orange" data-blob-hover>
                  Book in person
                </Link>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <div className="grid grid-cols-2 gap-6 font-mono text-[12px] uppercase tracking-[.16em]">
                <div className="flex flex-col gap-2.5">
                  <span className="opacity-50">In person</span>
                  <span className="normal-case tracking-normal text-[14px] leading-snug">Front Runner Physiotherapy<br/>2/16 Baden Street<br/>Osborne Park WA 6017</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="opacity-50">Online</span>
                  <span className="normal-case tracking-normal text-[14px] leading-snug">Australia-wide &amp;<br/>internationally via Zoom</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="opacity-50">Credential</span>
                  <span className="normal-case tracking-normal text-[14px] leading-snug">Accredited Practising Dietitian (APD)</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="opacity-50">Rebates</span>
                  <span className="normal-case tracking-normal text-[14px] leading-snug">Participating private health funds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative" style={{ background: '#EAE6D7', color: '#201C12', paddingBlock: 'var(--pad-y, 96px)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: '#FF6C00' }}>What Lauren helps with</div>
          <h2 className="mt-3 font-display leading-[.9]" style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
            <span className="skew-italic">Nutrition for</span>{' '}
            <span className="skew-italic" style={{ color: '#FF6C00' }}>active people</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERTH_HELP.map((h) => (
              <div key={h.t} className="rounded-2xl p-6" style={{ background: 'rgba(32,28,18,.04)', border: '1px solid rgba(32,28,18,.1)' }}>
                <h3 className="font-display leading-[.95]" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)' }}>
                  <span className="skew-italic">{h.t}</span>
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{h.d}</p>
              </div>
            ))}
          </div>
          <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[.18em] font-bold underline underline-offset-4 hover:text-orange" data-blob-hover>
            Meet Lauren →
          </Link>
        </div>
      </section>

      <ServicesTeaser />

      <section className="relative" style={{ background: '#EAE6D7', color: '#201C12', paddingBlock: 'var(--pad-y, 96px)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <Testimonials />
        </div>
      </section>

      <Faq scheme="dark" eyebrow="Perth dietitian FAQ" />
    </React.Fragment>
  );
}

window.PerthDietitianPage = PerthDietitianPage;
