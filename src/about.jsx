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
              {C('about.bioParagraphs', [
                "Lauren Nash is an Accredited Practising Dietitian (APD) and Founder of UP Dietitian, based in Perth and specialising in sports nutrition for everyday to elite athletes. Working in-person & online across a wide range of sporting environments, Lauren has supported athletes locally and internationally in endurance, team, weight-category and strength-based sports. Her experience spans multiple sports, with a strong focus on helping athletes optimise performance while supporting long-term health.",
                "Lauren is passionate about helping individuals fuel smarter to maximise training adaptations, improve recovery, manage gut issues and build confidence around race-day nutrition. Her approach is evidence-based, practical and realistic — translating complex sports nutrition science into sustainable strategies that fit real life. She strongly believes food should be viewed as fuel, not something to fear, overthink or unnecessarily restrict.",
                "Whether working with elite competitors or recreational athletes chasing personal goals, Lauren aims to help clients build a healthy and sustainable relationship with food alongside performance outcomes.",
                "Outside of clinic, Lauren is an endurance athlete herself and understands firsthand the demands of balancing training, recovery and everyday life. She has completed 2 Ironmans, 1 Ironman 70.3 and 2 marathons — experiences that continue to shape both her perspective and practice as a sports dietitian. UP Dietitian was created to help athletes fuel with more confidence, clarity and purpose — without overcomplicating nutrition.",
              ]).map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="mt-8">
            <div className="font-mono text-[11px] uppercase tracking-[.22em] opacity-60 mb-3">Lauren's specialty areas</div>
            <div className="flex flex-wrap gap-2">
              {C('about.specialtyTags', ['Sports Performance','Endurance','Body Composition','CrossFit & S&C','Combat Sports','Game-day Fueling','Injury Recovery','Coeliac','Gut Health']).map(tag => (
                <span key={tag} data-blob-hover className="px-3.5 py-2 rounded-full font-mono text-[11px] uppercase tracking-[.14em] border border-ink/20 hover:border-orange hover:text-orange transition-colors">
                  {tag}
                </span>
              ))}
            </div>
            </div>
          </div>

          {/* sticker / portrait placeholder */}
          <div className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[4/5] w-[86%] rounded-3xl overflow-visible">
              <div className="w-full h-full rounded-3xl overflow-hidden">
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
                {C('about.stickerBadge', 'Lauren Nash — APD & Founder of UP Dietitian')}
              </div>
            </div>

            {/* racing photo — inset and tilted so it reads as a second beat,
                not a second column. Right-aligned to clear the sticker badge. */}
            <div className="mt-10 ml-auto w-[72%] rotate-2">
              <div className="rounded-3xl overflow-hidden" style={{ position: 'relative', paddingBottom: '115%', boxShadow: '0 16px 32px rgba(32,28,18,.14)' }}>
                <picture>
                  <source srcSet="assets/images/about/racing-image.avif" type="image/avif" />
                  <img
                    src="assets/images/about/racing-image.JPG"
                    alt="Lauren Nash racing the run leg of an Ironman in UP Dietitian kit"
                    loading="lazy"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%', display: 'block' }}
                  />
                </picture>
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

const TESTIMONIALS = C('about.testimonials', [
  {
    name: 'Jemma',
    sport: 'Endurance Athlete',
    quote: "Lauren has supported me through 2x Ironman 70.3s, 2x standard triathlons, 1x marathon and my first Ironman. The confidence I gained was knowing my body was being looked after — correct fuelling meant I could breeze through changing training loads with no injuries and minimal fatigue. She creates a race day fuel plan specific to how your body responds, and carries herself with so much kindness. Couldn't recommend UP Dietitian enough.",
  },
  {
    name: 'Nick',
    sport: 'Endurance Athlete',
    quote: "I approached Lauren after chronic cramping and poor nutrition after my first 70.3. Since then she's done my fuelling plan for 3x Ironman 70.3s, 3x Ironman (NZ, Austria, Challenge Roth), Ultraman Australia and the Rottnest Channel Swim Solo. Lauren is the best in the business — professional, personable and knows exactly how to tailor a strategy for you. I'd never go into a race without her guidance.",
  },
  {
    name: 'Eimear',
    sport: 'Professional MMA Athlete',
    quote: "Lauren has helped me through back-to-back professional fight camps and made keeping on top of nutrition in and out of camp so easy. Weight cutting in combat sports can be dangerous and Lauren always keeps my health at the centre of our work. She's educated me on fuelling correctly to perform at my best while maintaining a positive body image — something I felt strongly about. If you have Lauren in your corner, you'll achieve your goals.",
  },
]);

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
window.Testimonials = Testimonials;
