// Top navigation bar — minimal, sticky. Routed links (no more #anchors).
function Nav({ theme, route }) {
  const t = THEMES[theme];
  const [open, setOpen] = React.useState(false);
  const y = useScrollY();
  // On sub-pages the hero sits below the bar, so keep it solid there always.
  const solid = y > 40 || route !== '/';

  const LINKS = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/seminars', label: 'Seminars' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300"
      style={{
        backgroundColor: solid ? t.bg : 'transparent',
        color: t.fg,
        borderBottom: solid ? `1px solid ${t.line}` : '1px solid transparent'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" data-blob-hover>
          <img src="assets/logo-orange-icon.png" alt="Up Dietitian" style={{ height: 30, width: 'auto', display: 'block' }} />
          <img src="assets/logo-wordmark-sand.png" alt="UP Dietitian" style={{ height: 22, width: 'auto', display: 'block' }} />
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-[12px] uppercase tracking-[.18em]">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className="hover:opacity-70" style={{ color: route === l.href ? t.accent : undefined }} data-blob-hover>{l.label}</Link>
          ))}
          <Link
            href="/clinic"
            className="btn-shine inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold border"
            style={{ borderColor: t.accent, color: t.accent }}
            data-blob-hover
          >Book In-Person</Link>
        </nav>

        <a
          href={CALENDLY_URL}
          className="hidden md:inline-flex btn-shine items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[12px] uppercase tracking-[.16em] font-bold"
          style={{ background: t.accent, color: '#EAE6D7' }}
          data-blob-hover
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current pulse-dot"></span>
          Book a call
        </a>

        <button
          className="md:hidden inline-flex flex-col gap-1.5 p-2"
          aria-label="Menu"
          onClick={() => setOpen(v => !v)}
        >
          <span style={{ width: 22, height: 2, background: t.fg, transition: 'transform .25s', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }}></span>
          <span style={{ width: 22, height: 2, background: t.fg, opacity: open ? 0 : 1, transition: 'opacity .15s' }}></span>
          <span style={{ width: 22, height: 2, background: t.fg, transition: 'transform .25s', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }}></span>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-5 pb-5 pt-1 flex flex-col gap-3 font-mono text-[14px] uppercase tracking-[.16em]" style={{ background: t.bg }}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 border-b" style={{ borderColor: t.line, color: route === l.href ? t.accent : undefined }}>{l.label}</Link>
          ))}
          <Link href="/clinic" onClick={() => setOpen(false)} className="py-2 border-b font-bold" style={{ borderColor: t.line, color: t.accent }}>Book In-Person ↗</Link>
          <a href={CALENDLY_URL} onClick={() => setOpen(false)} className="mt-3 px-5 py-3 rounded-full font-bold text-center" style={{ background: t.accent, color: '#EAE6D7' }}>Book a call →</a>
        </div>
      )}
    </header>
  );
}
window.Nav = Nav;
