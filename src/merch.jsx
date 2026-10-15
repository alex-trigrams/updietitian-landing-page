const MERCH_ITEMS = [
  { label: 'Oversized Tee', type: 'Apparel', photos: ['tee-1', 'tee-2', 'tee-3', 'tee-4', 'tee-5'] },
  { label: "Women's Sports Top", type: 'Apparel', photos: ['top-1', 'top-2'] },
  { label: 'Crew Socks', type: 'Gear', photos: ['socks-1', 'socks-2', 'socks-3'] },
];

function MerchCard({ item }) {
  const [idx, setIdx] = React.useState(0);
  const count = item.photos.length;
  const go = (step) => setIdx((i) => (i + step + count) % count);

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{ position: 'relative', paddingBottom: '133.33%', background: 'rgba(234,230,215,.06)', border: '1px solid rgba(234,230,215,.10)' }}
    >
      {item.photos.map((name, i) => (
        <picture key={name}>
          <source srcSet={`assets/images/merch/${name}.avif`} type="image/avif" />
          <img
            src={`assets/images/merch/${name}.jpg`}
            alt={`${item.label} by UP Dietitian`}
            loading="lazy"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === idx ? 1 : 0, transition: 'opacity .5s ease' }}
          />
        </picture>
      ))}

      {count > 1 && (
        <>
          <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="absolute top-0 left-0 h-full w-1/2" style={{ cursor: 'w-resize' }} />
          <button type="button" aria-label="Next photo" onClick={() => go(1)} className="absolute top-0 right-0 h-full w-1/2" style={{ cursor: 'e-resize' }} />
        </>
      )}

      <span
        className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[.18em] px-2.5 py-1 rounded-full pointer-events-none"
        style={{ background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: '#FF6C00' }}
      >
        Pre-order
      </span>

      <div
        className="absolute bottom-0 left-0 right-0 p-4 pt-12 flex items-end justify-between gap-3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 100%)' }}
      >
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] uppercase tracking-[.18em] opacity-70">{item.type}</span>
          <span className="font-semibold text-[16px]">{item.label}</span>
        </div>
        {count > 1 && (
          <div className="flex gap-1.5 mb-1.5">
            {item.photos.map((name, i) => (
              <span key={name} className="block h-1.5 rounded-full" style={{ width: i === idx ? 16 : 6, background: i === idx ? '#FF6C00' : 'rgba(234,230,215,.5)', transition: 'width .3s ease' }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MERCH_ITEMS.map((item) => (
            <MerchCard key={item.label} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}

window.Merch = Merch;
