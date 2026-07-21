// Process — 4 steps with scroll-progress line and orange tick marks.
const STEPS_DEFAULT = [
  { title: 'BOOK A FREE DISCOVERY CALL',         desc: "A complimentary 15-minute call to chat through your goals, your sport and whether working with UP Dietitian is the right fit for where you're at." },
  { title: 'INITIAL CONSULTATION & ASSESSMENT',  desc: "A deep dive into your nutrition, training, health and performance goals. We'll review your current habits, relevant blood test results and any health concerns before developing personalised nutrition strategies and clear next steps to help you perform, recover and feel your best." },
  { title: 'PERSONALISED NUTRITION PLAN',        desc: 'A tailored nutrition strategy designed around your training demands, performance goals and lifestyle, covering everything from daily nutrition and recovery to race-day fuelling and competition preparation.' },
  { title: 'ONGOING SUPPORT',                    desc: 'Ongoing support through every phase of your training, with regular check-ins, personalised nutrition adjustments and accountability to keep your fuelling aligned with your goals.' },
];
const STEPS = (C('process.steps', STEPS_DEFAULT)).map((s, i) => ({ n: String(i + 1).padStart(2, '0'), ...s }));

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
    <section id="process" ref={ref} data-screen-label="05 Process" className="relative" style={{ background: '#EAE6D7', color: '#201C12', paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">

        {/* Section header */}
        <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: '#FF6C00' }}>How It Works</div>
        <h2 className="mt-3 font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}>
          <span className="skew-italic">THE PROCESS</span>
        </h2>

        {/* Progress line + cards grid */}
        <div className="relative mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: 'rgba(32,28,18,.12)' }}>
          {/* scroll-driven progress bar */}
          <div aria-hidden className="absolute left-0 right-0 -top-6 h-0.5 hidden md:block rounded-full overflow-hidden" style={{ background: 'rgba(32,28,18,.12)' }}>
            <div className="h-full rounded-full transition-none" style={{ background: '#FF6C00', width: `${progress * 100}%` }}></div>
          </div>

          {STEPS.map((s) => (
            <div
              key={s.n}
              className="relative bg-sand p-6 md:p-7 lg:p-8 flex flex-col overflow-hidden hover:bg-orange/5 transition-colors"
              style={{ minHeight: 280 }}
              data-blob-hover
            >
              {/* large faded number — watermark */}
              <div
                aria-hidden
                className="absolute bottom-3 right-4 font-display leading-none select-none pointer-events-none"
                style={{ fontSize: 'clamp(96px, 13vw, 160px)', color: '#201C12', opacity: .06 }}
              >
                {s.n}
              </div>

              {/* orange tick */}
              <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: '#FF6C00' }}></div>

              {/* step label */}
              <div className="mt-5 font-mono text-[10px] uppercase tracking-[.22em] opacity-50">Step {s.n}</div>

              {/* title */}
              <h3 className="mt-2 font-display leading-[.92]" style={{ fontSize: 'clamp(20px, 2.2vw, 30px)' }}>
                <span className="skew-italic">{s.title}</span>
              </h3>

              {/* body */}
              <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed opacity-70 mt-auto">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

window.Process = Process;
