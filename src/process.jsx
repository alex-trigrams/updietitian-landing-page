// Process — 4 steps with scroll-progress line.
const STEPS = [
  { n: '01', title: 'Free discovery call',  desc: "A 15-minute chat. We talk about your sport, your training, and where your nutrition is letting you down. No commitment." },
  { n: '02', title: 'Full assessment', desc: "A proper sit-down. Training load, goals, gut history, supplements, recent bloods. I want the full picture before I build a plan." },
  { n: '03', title: 'Your plan', desc: "A fueling plan, a race-day protocol, and a supplement stack. Built specifically for you and your block." },
  { n: '04', title: 'Ongoing support',    desc: "Regular check-ins. We adjust as your training shifts, around peaks, taper, and race week. We keep going until the numbers move." },
];

function Process({ theme }) {
  const ref = React.useRef(null);
  const y = useScrollY();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const start = window.scrollY + r.top - window.innerHeight * 0.6;
    const end   = window.scrollY + r.bottom - window.innerHeight * 0.4;
    const p = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
    setProgress(p);
  }, [y]);

  return (
    <section id="process" ref={ref} data-screen-label="04 Process" className="relative" style={{ background: '#EAE6D7', color: '#201C12', paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-70">
          <span className="inline-block w-6 h-px bg-current"></span>
          <span>04 · The process</span>
        </div>
        <h2 className="mt-6 font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}>
          <span className="skew-italic">How it</span><br/>
          <span className="skew-italic" style={{ color: '#FF6C00' }}>works.</span>
        </h2>

        <div className="relative mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: 'rgba(32,28,18,.18)' }}>
          {/* progress line */}
          <div aria-hidden className="absolute left-0 right-0 -top-6 h-1 hidden md:block" style={{ background: 'rgba(32,28,18,.18)' }}>
            <div className="h-full" style={{ background: '#FF6C00', width: `${progress * 100}%` }}></div>
          </div>
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative p-6 md:p-7 lg:p-8 flex flex-col gap-5 bg-sand min-h-[220px] hover:bg-orange/10 transition-colors" data-blob-hover>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[.22em] opacity-60">Step {s.n}</span>
                <span className="font-display text-[28px] leading-none" style={{ color: '#FF6C00' }}>→</span>
              </div>
              <h3 className="font-display leading-[.95]" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                <span className="skew-italic">{s.title}</span>
              </h3>
              <p className="text-[14px] md:text-[15px] leading-relaxed opacity-80 mt-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Process = Process;
