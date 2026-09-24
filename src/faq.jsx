// FAQ — common questions, editable in /admin (content.json → faq.items).
//
// Plain question-and-answer copy is what search snippets and AI answers quote,
// so this is written for people searching ("do I need a referral…"), not for
// the brand voice. Native <details> keeps every answer in the page markup even
// while collapsed, so crawlers read them all. FAQPage structured data for it is
// added server-side on /perth-dietitian only (see api/_seo.js).

function Faq({ scheme = 'light', eyebrow = 'Questions', title = ['Common', 'questions'] }) {
  const items = C('faq.items', []);
  if (!items.length) return null;
  const dark = scheme === 'dark';
  const fg = dark ? '#EAE6D7' : '#201C12';
  const line = dark ? 'rgba(234,230,215,.16)' : 'rgba(32,28,18,.14)';

  return (
    <section id="faq" className="relative" style={{ background: dark ? '#201C12' : '#EAE6D7', color: fg, paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid grid-cols-12 gap-8 md:gap-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: '#FF6C00' }}>{eyebrow}</div>
          <h2 className="mt-3 font-display leading-[.9]" style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
            <span className="skew-italic">{title[0]}</span><br/>
            <span className="skew-italic" style={{ color: '#FF6C00' }}>{title[1]}</span>
          </h2>
        </div>

        <div className="col-span-12 lg:col-span-8 border-t" style={{ borderColor: line }}>
          {items.map((f) => (
            <details key={f.id || f.question} className="group border-b" style={{ borderColor: line }}>
              <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-start justify-between gap-6 py-5 md:py-6" data-blob-hover>
                <h3 className="text-[17px] md:text-[20px] font-semibold leading-snug">{f.question}</h3>
                <span aria-hidden className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-45"
                  style={{ background: 'rgba(255,108,0,.12)', color: '#FF6C00', fontSize: 16, lineHeight: 1 }}>＋</span>
              </summary>
              <p className="pb-6 pr-14 max-w-[68ch] text-[15px] md:text-[16px] leading-relaxed" style={{ opacity: .8 }}>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Faq = Faq;
