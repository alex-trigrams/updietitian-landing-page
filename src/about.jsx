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

        {/* drag-reveal testimonial card */}
        <DragReveal theme={theme} />
      </div>
    </section>
  );
}

function DragReveal({ theme }) {
  const [pct, setPct] = React.useState(50);
  const ref = React.useRef(null);
  const dragging = React.useRef(false);

  const setFromClient = (clientX) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    setPct(x * 100);
  };

  React.useEffect(() => {
    const up = () => dragging.current = false;
    const move = (e) => { if (!dragging.current) return; const cx = e.touches ? e.touches[0].clientX : e.clientX; setFromClient(cx); };
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: false });
    return () => { window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up); window.removeEventListener('mousemove', move); window.removeEventListener('touchmove', move); };
  }, []);

  return (
    <div className="mt-20 md:mt-28">
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[.22em] opacity-70">02 · Drag to compare</div>
          <h3 className="font-display mt-2 leading-[.95]" style={{ fontSize: 'clamp(34px, 5.5vw, 72px)' }}>
            <span className="skew-italic">Before</span> <span className="opacity-50">/</span> <span className="skew-italic" style={{ color: '#FF6C00' }}>After</span>
          </h3>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[.2em] opacity-60 hidden sm:block">drag the handle ↔</div>
      </div>

      <div
        ref={ref}
        className="relative h-[260px] md:h-[400px] rounded-3xl overflow-hidden select-none cursor-ew-resize touch-none"
        style={{ background: '#1D4032', color: '#EAE6D7' }}
        onMouseDown={(e) => { dragging.current = true; setFromClient(e.clientX); }}
        onTouchStart={(e) => { dragging.current = true; setFromClient(e.touches[0].clientX); }}
      >
        {/* BEFORE panel */}
        <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between grain-bg">
          <div className="font-mono text-[11px] uppercase tracking-[.2em] opacity-80">// before</div>
          <div className="space-y-2">
            <div className="font-display leading-[.95]" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
              <span className="skew-italic">Hit the wall</span><br/>
              <span className="skew-italic opacity-60">at km 28.</span>
            </div>
            <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-[.18em] opacity-70">blew up at km 28, gut shot, dead legs</div>
          </div>
        </div>

        {/* AFTER panel — clipped */}
        <div
          className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between grain-bg"
          style={{ background: '#FF6C00', color: '#EAE6D7', clipPath: `inset(0 0 0 ${pct}%)` }}
        >
          <div className="font-mono text-[11px] uppercase tracking-[.2em] opacity-90 text-right">after //</div>
          <div className="space-y-2 text-right">
            <div className="font-display leading-[.95]" style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
              <span className="skew-italic">3:42 marathon.</span><br/>
              <span className="skew-italic opacity-90">Negative split.</span>
            </div>
            <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-[.18em] opacity-90">fueled, gut sorted, 24min PB</div>
          </div>
        </div>

        {/* divider + handle */}
        <div className="absolute top-0 bottom-0" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>
          <div className="w-px h-full mx-auto" style={{ background: '#EAE6D7' }}></div>
          <div className="reveal-handle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center" style={{ color: '#EAE6D7' }}>
            <span className="font-display text-[20px]">↔</span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.About = About;
