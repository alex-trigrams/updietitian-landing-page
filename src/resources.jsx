const RESOURCE_CARDS = [
  { label: 'Race Day Nutrition Guide', type: 'PDF Guide' },
  { label: 'Pre-Race Meal Planner', type: 'Template' },
  { label: 'Fueling for Ultra', type: 'Deep Dive' },
  { label: 'Training Nutrition Calculator', type: 'Spreadsheet' },
];

function Resources({ theme }) {
  return (
    <section id="resources" data-screen-label="06 Resources" className="relative noise" style={{ background: '#201C12', color: '#EAE6D7', paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">

        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-60">
          <span className="inline-block w-6 h-px bg-current"></span>
          <span>06 · Resources</span>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}>
            <span className="skew-italic">Free</span><br />
            <span className="skew-italic" style={{ color: '#FF6C00' }}>guides.</span>
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[.16em] opacity-50 mb-2 max-w-xs leading-relaxed">
            PDFs, planners &amp; downloads — dropping soon
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESOURCE_CARDS.map((card, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-6 flex flex-col gap-4 overflow-hidden"
              style={{ background: 'rgba(234,230,215,.055)', border: '1px solid rgba(234,230,215,.10)' }}
            >
              <span
                className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[.18em] px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(255,108,0,.15)', color: '#FF6C00' }}
              >
                Soon
              </span>

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(234,230,215,.08)' }}
              >
                <span className="font-display text-[18px] leading-none" style={{ color: '#FF6C00' }}>↓</span>
              </div>

              <div className="flex flex-col gap-1 mt-auto">
                <span className="font-mono text-[10px] uppercase tracking-[.18em] opacity-35">{card.type}</span>
                <span className="text-[15px] font-semibold leading-snug opacity-50">{card.label}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[.2em] opacity-30 text-center">
          Check back soon — or follow along for updates
        </p>

      </div>
    </section>
  );
}

window.Resources = Resources;
