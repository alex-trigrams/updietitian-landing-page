// Marquee / ticker bar — bold horizontal scrolling text.
function Marquee({ items, theme, accent = false, reverse = false, slow = false }) {
  const t = THEMES[theme];
  const list = [...items, ...items, ...items];
  const bg = accent ? t.accent : t.bg;
  const fg = accent ? (theme === 'orange' ? '#EAE6D7' : '#EAE6D7') : t.fg;
  return (
    <div className="relative overflow-hidden py-5 md:py-7 mask-fade" style={{ background: bg, color: fg, borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}` }}>
      <div className={`flex whitespace-nowrap ${reverse ? 'ticker-rev' : (slow ? 'ticker-slow' : 'ticker')}`} style={{ width: 'max-content' }}>
        {list.map((item, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 font-display tracking-wide" style={{ fontSize: 'clamp(28px, 5.5vw, 72px)', lineHeight: 1 }}>
            <span className="skew-italic">{item}</span>
            <span aria-hidden style={{ width: 16, height: 16, borderRadius: 9999, background: accent ? '#EAE6D7' : t.accent, flex: 'none' }}></span>
          </span>
        ))}
      </div>
    </div>
  );
}
window.Marquee = Marquee;
