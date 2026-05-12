// Services — interactive list with hover-expanding rows.
const SERVICES = [
  { n: '01', title: 'Sports Performance Nutrition', desc: 'Periodised fueling, mapped to your training block. Strength, hypertrophy, peak, taper. Macros that move with the work, supplements only when they earn their place.', tags: ['Periodisation','Macros','Supplements'] },
  { n: '02', title: 'Endurance Racing',             desc: 'Sub-3 marathon. First Ironman. 100 miler. We build carb-loading, sweat-rate testing and a pacing plan you can execute on race day.',          tags: ['Marathon','Triathlon','Ultra'] },
  { n: '03', title: 'Race & Game-Day Plans',        desc: 'An hour-by-hour fueling script from waking up through the finish line. What to eat, when, how much, and what to do when your gut says no.', tags: ['Carb-load','In-race','Hydration'] },
  { n: '04', title: 'Fight Camp Support',           desc: "Weight-make plans for combat athletes that don't gut your performance. Sustainable cuts, rapid rehydration, fight-week timing.",          tags: ['Boxing','MMA','BJJ'] },
  { n: '05', title: 'Body Comp & Performance Weight', desc: 'Body composition that works with your power output, not against it. We build the cut or the bulk around your sport.',                 tags: ['Lean mass','Cut/Bulk','Power'] },
  { n: '06', title: 'Injury Recovery Nutrition',    desc: 'Nutrition that protects lean mass through immobilisation, supports rehab, then ramps back up for return to play.',           tags: ['Rehab','Immobilisation','RTP'] },
  { n: '07', title: 'Coeliac Disease Management',   desc: 'Clinical, evidence-based coeliac care for athletes. Strictly gluten-free, fast, and properly fueled.',                                    tags: ['Coeliac','Gluten-free','Clinical'] },
];

function Services({ theme }) {
  const t = THEMES[theme];
  const [open, setOpen] = React.useState(0);
  return (
    <section id="services" data-screen-label="03 Services" className="relative noise" style={{ background: '#201C12', color: '#EAE6D7', paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-60">
          <span className="inline-block w-6 h-px bg-current"></span>
          <span>03 · Services & specialisations</span>
        </div>

        <h2 className="mt-6 font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}>
          <span className="skew-italic">What I</span><br/>
          <span className="skew-italic" style={{ color: '#FF6C00' }}>do.</span>
        </h2>

        <ul className="mt-12 border-t" style={{ borderColor: 'rgba(234,230,215,.15)' }}>
          {SERVICES.map((s, i) => {
            const active = open === i;
            return (
              <li
                key={s.n}
                className="border-b group cursor-pointer transition-colors"
                style={{ borderColor: 'rgba(234,230,215,.15)' }}
                onClick={() => setOpen(active ? -1 : i)}
                onMouseEnter={() => setOpen(i)}
                data-blob-hover
              >
                <div className="py-5 md:py-7 grid grid-cols-12 gap-3 items-baseline">
                  <div className="col-span-2 md:col-span-1 font-mono text-[12px] md:text-[14px] tracking-[.18em] opacity-50">{s.n}</div>
                  <div className="col-span-9 md:col-span-9 font-display leading-[.95] transition-colors" style={{ fontSize: 'clamp(28px, 5vw, 64px)', color: active ? '#FF6C00' : '#EAE6D7' }}>
                    <span className="skew-italic">{s.title}</span>
                  </div>
                  <div className="col-span-1 md:col-span-2 text-right font-display text-[28px] md:text-[40px] transition-transform" style={{ transform: active ? 'rotate(45deg)' : 'none', color: active ? '#FF6C00' : '#EAE6D7' }}>+</div>
                </div>
                <div className="grid grid-cols-12 gap-3 overflow-hidden transition-all" style={{ maxHeight: active ? 240 : 0 }}>
                  <div className="col-span-12 md:col-start-2 md:col-span-9 pb-7 md:pb-9">
                    <p className="text-[15px] md:text-[17px] leading-relaxed max-w-[62ch] opacity-85">{s.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[.16em] border" style={{ borderColor: 'rgba(234,230,215,.25)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href={CALENDLY_URL} className="btn-shine inline-flex items-center gap-3 px-6 py-4 rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold" style={{ background: '#FF6C00', color: '#EAE6D7' }} data-blob-hover>
            Book a Discovery Call
            <span style={{ fontFamily: 'Anton' }}>→</span>
          </a>
          <span className="font-mono text-[11px] uppercase tracking-[.18em] opacity-60">In-person in Perth. Online everywhere else.</span>
        </div>
      </div>
    </section>
  );
}

window.Services = Services;
