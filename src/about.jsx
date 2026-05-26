// About — Lauren bio + drag-reveal "before/after" framing + credentials.
function About({ theme }) {
  const t = THEMES[theme];
  return (
    <section id="about" data-screen-label="02 About" className="relative" style={{ background: '#EAE6D7', color: '#201C12', paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        {/* eyebrow */}
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-70">
          <span className="inline-block w-6 h-px bg-current"></span>
          <span>01 · Meet your dietitian</span>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-display leading-[.88] tracking-tight" style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}>
              <span className="skew-italic">Lauren</span>{' '}
              <span className="skew-italic" style={{ color: '#FF6C00' }}>Nash</span>
              <span className="block mt-2 font-mono text-[12px] md:text-[14px] tracking-[.22em] uppercase opacity-70">Accredited Practising Dietitian · APD</span>
            </h2>

            <div className="mt-8 max-w-[62ch] space-y-4 text-[15px] md:text-[17px] leading-relaxed text-ink/80">
              <p>I'm Lauren. I'm an Accredited Practising Dietitian and I work clinically in sports nutrition out of Perth.</p>
              <p>My athletes range from elite to weekend warrior. Runners (5K to ultra), triathletes, AFL players, CrossFitters, swimmers, jockeys, combat athletes. The plan changes. The approach doesn't.</p>
              <p>I came up through CrossFit and endurance sport. I know what it feels like when training adaptations stall, when your gut wrecks a long run, when you're staring at a race plan 2 days out wondering if it's right.</p>
              <p>So I translate the science into food you'll eat, on a schedule that fits a real training week.</p>
              <p>I race marathons and Ironmans myself. Balance, for me, is a good coffee and banana bread after every long run.</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Sports Performance','Endurance','Combat Sports','Game-day Fueling','Injury Recovery','Coeliac','Gut Health'].map(tag => (
                <span key={tag} data-blob-hover className="px-3.5 py-2 rounded-full font-mono text-[11px] uppercase tracking-[.14em] border border-ink/20 hover:border-orange hover:text-orange transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* sticker / portrait placeholder */}
          <div className="col-span-12 lg:col-span-5">
            <div className="relative h-full">
              <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden">
                <picture>
                  <source srcSet="assets/images/about/about-image.avif" type="image/avif" />
                  <img src="assets/images/about/about-image.JPG" alt="Lauren Nash APD" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                </picture>
              </div>

              {/* sticker badge */}
              <div
                className="absolute -bottom-6 -left-3 md:-left-8 px-4 py-3 rounded-2xl font-mono text-[11px] uppercase tracking-[.16em] -rotate-3"
                style={{ background: '#FF6C00', color: '#EAE6D7', boxShadow: '0 12px 24px rgba(32,28,18,.18)' }}
              >
                Bach. Nutrition & Dietetics<br/>Griffith University
              </div>
            </div>
          </div>
        </div>

        {/* athlete testimonials */}
        <Testimonials />
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    // photo: 'assets/images/testimonials/sarah.jpg',  // add photo when available
    name: 'Sarah',
    sport: 'Ironman 70.3',
    quote: 'Lauren completely changed how I think about race day nutrition. My last 70.3 I held power all the way through T2 and ran my best half marathon split ever. Nutrition was never a limiter again.',
  },
  {
    // photo: 'assets/images/testimonials/tom.jpg',
    name: 'Tom',
    sport: 'Ultra Marathon',
    quote: 'I used to bonk at 60km every single race. After working with Lauren I finished my first 100-miler with energy to spare. The gut training protocol alone was worth every cent.',
  },
  {
    // photo: 'assets/images/testimonials/mia.jpg',
    name: 'Mia',
    sport: 'CrossFit',
    quote: 'I finally stopped feeling like I was undereating for my training. Lauren built a plan that worked with my schedule, not against it. My recovery time dropped noticeably within the first few weeks.',
  },
];

function TestimonialCard({ card, idx }) {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${card.name} — ${card.sport}. Tap to read testimonial.`}
      className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-orange"
      style={{ perspective: '1000px', height: 420 }}
      onClick={() => setFlipped(f => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped(f => !f)}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.55s cubic-bezier(.4,0,.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>

        {/* FRONT — photo + name + sport */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          borderRadius: 20, overflow: 'hidden',
          background: '#1D4032', display: 'flex', flexDirection: 'column',
        }}>
          {/* photo area */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'rgba(32,28,18,.35)' }}>
            {card.photo
              ? <img src={card.photo} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Anton', fontSize: 'clamp(80px, 12vw, 120px)', color: '#FF6C00', opacity: .25, lineHeight: 1 }}>{card.name[0]}</span>
                </div>
              )
            }
            {/* flip hint */}
            <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,.45)', borderRadius: 999, padding: '4px 10px', backdropFilter: 'blur(6px)' }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, textTransform: 'uppercase', letterSpacing: '.18em', color: '#EAE6D7', opacity: .7 }}>flip ↻</span>
            </div>
          </div>
          {/* name + sport */}
          <div style={{ padding: '18px 22px', flexShrink: 0 }}>
            <div style={{ fontFamily: 'Anton', fontSize: 'clamp(26px, 3vw, 34px)', color: '#EAE6D7', lineHeight: .95 }}>
              <span style={{ display: 'inline-block', transform: 'skew(-8deg)' }}>{card.name}</span>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.2em', color: '#FF6C00', marginTop: 6 }}>{card.sport}</div>
          </div>
        </div>

        {/* BACK — testimonial quote */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: 20, overflow: 'hidden',
          background: '#FF6C00', color: '#EAE6D7',
          padding: '28px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: 'Anton', fontSize: 72, lineHeight: .8, opacity: .25 }}>"</div>
          <p style={{ fontFamily: 'Archivo', fontSize: 15, lineHeight: 1.65, flex: 1, display: 'flex', alignItems: 'center' }}>{card.quote}</p>
          <div style={{ borderTop: '1px solid rgba(234,230,215,.3)', paddingTop: 16 }}>
            <div style={{ fontFamily: 'Anton', fontSize: 22, lineHeight: .95 }}>
              <span style={{ display: 'inline-block', transform: 'skew(-8deg)' }}>{card.name}</span>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.18em', opacity: .75, marginTop: 5 }}>{card.sport}</div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="mt-20 md:mt-28">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[.22em] opacity-70">02 · Athlete stories</div>
          <h3 className="font-display mt-2 leading-[.95]" style={{ fontSize: 'clamp(34px, 5.5vw, 72px)' }}>
            <span className="skew-italic">What they </span><span className="skew-italic" style={{ color: '#FF6C00' }}>say.</span>
          </h3>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[.2em] opacity-50 hidden sm:block">hover or tap to flip ↻</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {TESTIMONIALS.map((card, i) => <TestimonialCard key={i} card={card} idx={i} />)}
      </div>
    </div>
  );
}

window.About = About;
