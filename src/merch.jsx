const MERCH_ITEMS = [
  { label: 'Training Tee', type: 'Apparel' },
  { label: 'Race Vest', type: 'Kit' },
  { label: 'Water Bottle', type: 'Gear' },
  { label: 'Kit Bundle', type: 'Bundle' },
];

function Merch({ theme }) {
  return (
    <section id="merch" data-screen-label="07 Merch" className="relative noise" style={{ background: '#1D4032', color: '#EAE6D7', paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">

        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-60">
          <span className="inline-block w-6 h-px bg-current"></span>
          <span>07 · Merch</span>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}>
            <span className="skew-italic">The</span><br />
            <span className="skew-italic" style={{ color: '#FF6C00' }}>kit.</span>
          </h2>
          <div className="flex flex-col items-start gap-3 mb-2">
            <p className="font-mono text-[11px] uppercase tracking-[.16em] opacity-50 max-w-xs leading-relaxed">
              Training gear &amp; apparel — register your interest
            </p>
            <button
              className="btn-shine inline-flex items-center gap-2 px-5 py-3 rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold"
              style={{ background: '#FF6C00', color: '#EAE6D7' }}
              data-blob-hover
            >
              Pre-register interest
              <span style={{ fontFamily: 'Anton' }}>→</span>
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {MERCH_ITEMS.map((item, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: '3/4', background: 'rgba(234,230,215,.06)', border: '1px solid rgba(234,230,215,.10)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-display opacity-[.07]"
                  style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: '#EAE6D7', letterSpacing: '.04em' }}
                >
                  UP
                </span>
              </div>

              <span
                className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[.18em] px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(255,108,0,.18)', color: '#FF6C00' }}
              >
                Pre-order
              </span>

              <div
                className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-0.5"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 100%)' }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[.18em] opacity-45">{item.type}</span>
                <span className="font-semibold text-[15px] opacity-60">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

window.Merch = Merch;
