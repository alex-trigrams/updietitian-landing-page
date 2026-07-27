// Top navigation bar — minimal, sticky. Routed links (no more #anchors).
// "Services" is a dropdown of the individual offerings; "Contact" opens the
// enquiry modal rather than navigating.

// Service items for the dropdown, derived from live content so the menu never
// drifts from what's published on the Services page. Falls back to the seed
// titles if the blob hasn't loaded them.
function serviceMenuItems() {
  const hero = C('services.heroCards', null) || [{ title: 'Initial Consult + Performance Plan' }, { title: 'Level UP Race Fuelling Pack' }];
  const tier = C('services.tierCards', null) || [{ title: 'Initial Nutrition Consultation' }, { title: 'Review Consultation' }, { title: 'Performance Nutrition Coaching' }];
  return [...hero, ...tier]
    .filter(c => c && c.title)
    .map(c => ({ label: c.title, href: `/services#${slugify(c.title)}` }));
}

function Nav({ theme, route }) {
  const t = THEMES[theme];
  const [open, setOpen] = React.useState(false);
  const [svcOpen, setSvcOpen] = React.useState(false);       // desktop dropdown
  const [svcMobile, setSvcMobile] = React.useState(false);   // mobile sub-list
  const y = useScrollY();
  // On sub-pages the hero sits below the bar, so keep it solid there always.
  const solid = y > 40 || route !== '/';
  const items = serviceMenuItems();

  const goService = (href) => { setSvcOpen(false); setOpen(false); navigate(href.split('#')[0]);
    // set hash after route so the Services page picks it up
    if (href.includes('#')) { window.location.hash = href.split('#')[1]; } };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300"
      style={{ backgroundColor: solid ? t.bg : 'transparent', color: t.fg, borderBottom: solid ? `1px solid ${t.line}` : '1px solid transparent' }}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" data-blob-hover>
          <img src="assets/logo-orange-icon.png" alt="Up Dietitian" style={{ height: 30, width: 'auto', display: 'block' }} />
          <img src="assets/logo-wordmark-sand.png" alt="UP Dietitian" style={{ height: 22, width: 'auto', display: 'block' }} />
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-[12px] uppercase tracking-[.18em]">
          <Link href="/about" className="hover:opacity-70" style={{ color: route === '/about' ? t.accent : undefined }} data-blob-hover>About</Link>

          {/* Services dropdown */}
          <div className="relative" onMouseEnter={() => setSvcOpen(true)} onMouseLeave={() => setSvcOpen(false)}>
            <Link href="/services" className="inline-flex items-center gap-1.5 hover:opacity-70" style={{ color: route === '/services' ? t.accent : undefined }} data-blob-hover>
              Services <span style={{ fontSize: 9, transform: svcOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▼</span>
            </Link>
            {svcOpen && (
              <div className="absolute left-0 top-full pt-3" style={{ minWidth: 300 }}>
                <div className="rounded-2xl overflow-hidden py-2" style={{ background: t.bg, border: `1px solid ${t.line}`, boxShadow: '0 20px 50px rgba(0,0,0,.35)' }}>
                  {items.map((it) => (
                    <button key={it.href} onClick={() => goService(it.href)} className="w-full text-left px-5 py-2.5 normal-case tracking-normal text-[13px] font-sans hover:bg-white/5 transition-colors" style={{ color: t.fg }} data-blob-hover>
                      {it.label}
                    </button>
                  ))}
                  <Link href="/services" onClick={() => setSvcOpen(false)} className="block px-5 py-2.5 mt-1 border-t text-[11px]" style={{ borderColor: t.line, color: t.accent }} data-blob-hover>All services →</Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/seminars" className="hover:opacity-70" style={{ color: route === '/seminars' ? t.accent : undefined }} data-blob-hover>Seminars</Link>
          <button onClick={() => openEnquiry()} className="uppercase tracking-[.18em] hover:opacity-70" style={{ color: t.fg }} data-blob-hover>Contact</button>

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

        <button className="md:hidden inline-flex flex-col gap-1.5 p-2" aria-label="Menu" onClick={() => setOpen(v => !v)}>
          <span style={{ width: 22, height: 2, background: t.fg, transition: 'transform .25s', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }}></span>
          <span style={{ width: 22, height: 2, background: t.fg, opacity: open ? 0 : 1, transition: 'opacity .15s' }}></span>
          <span style={{ width: 22, height: 2, background: t.fg, transition: 'transform .25s', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }}></span>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-5 pb-5 pt-1 flex flex-col gap-3 font-mono text-[14px] uppercase tracking-[.16em]" style={{ background: t.bg }}>
          <Link href="/about" onClick={() => setOpen(false)} className="py-2 border-b" style={{ borderColor: t.line, color: route === '/about' ? t.accent : undefined }}>About</Link>

          {/* Services expandable sub-list */}
          <div className="border-b" style={{ borderColor: t.line }}>
            <button onClick={() => setSvcMobile(v => !v)} className="w-full py-2 flex items-center justify-between uppercase tracking-[.16em]" style={{ color: route === '/services' ? t.accent : t.fg }}>
              Services <span style={{ fontSize: 10, transform: svcMobile ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▼</span>
            </button>
            {svcMobile && (
              <div className="pb-2 flex flex-col">
                {items.map((it) => (
                  <button key={it.href} onClick={() => goService(it.href)} className="text-left py-2 pl-3 normal-case tracking-normal text-[13px] font-sans opacity-80">{it.label}</button>
                ))}
                <Link href="/services" onClick={() => setOpen(false)} className="py-2 pl-3 text-[11px]" style={{ color: t.accent }}>All services →</Link>
              </div>
            )}
          </div>

          <Link href="/seminars" onClick={() => setOpen(false)} className="py-2 border-b" style={{ borderColor: t.line, color: route === '/seminars' ? t.accent : undefined }}>Seminars</Link>
          <button onClick={() => { setOpen(false); openEnquiry(); }} className="py-2 border-b text-left uppercase tracking-[.16em]" style={{ borderColor: t.line, color: t.fg }}>Contact</button>
          <Link href="/clinic" onClick={() => setOpen(false)} className="py-2 border-b font-bold" style={{ borderColor: t.line, color: t.accent }}>Book In-Person ↗</Link>
          <a href={CALENDLY_URL} onClick={() => setOpen(false)} className="mt-3 px-5 py-3 rounded-full font-bold text-center" style={{ background: t.accent, color: '#EAE6D7' }}>Book a call →</a>
        </div>
      )}
    </header>
  );
}
window.Nav = Nav;
