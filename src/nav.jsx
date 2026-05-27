// Top navigation bar — minimal, sticky.
function Nav({ theme }) {
  const t = THEMES[theme];
  const [open, setOpen] = React.useState(false);
  const [shopOpen, setShopOpen] = React.useState(false);
  const [shopMobileOpen, setShopMobileOpen] = React.useState(false);
  const y = useScrollY();
  const solid = y > 40;
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
        <a href="#top" className="flex items-center gap-2.5" data-blob-hover>
          <img src="assets/logo-orange-icon.png" alt="Up Dietitian" style={{ height: 30, width: 'auto', display: 'block' }} />
          <span className="font-display text-[20px] md:text-[22px] leading-none tracking-wide">UP DIETITIAN</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 font-mono text-[12px] uppercase tracking-[.18em]">
          <a href="#about"    className="hover:opacity-70" data-blob-hover>About</a>
          <a href="#services" className="hover:opacity-70" data-blob-hover>Services</a>
          <a href="#process"  className="hover:opacity-70" data-blob-hover>Process</a>

          {/* Shop dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 hover:opacity-70 cursor-default"
              data-blob-hover
              aria-haspopup="true"
              aria-expanded={shopOpen}
            >
              Shop
              <svg width="9" height="6" viewBox="0 0 9 6" fill="none" style={{ opacity: .5, transition: 'transform .2s', transform: shopOpen ? 'rotate(180deg)' : 'none' }}>
                <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {shopOpen && (
              <div
                className="absolute top-full left-1/2 pt-3"
                style={{ transform: 'translateX(-50%)' }}
              >
                <div
                  className="flex flex-col py-1.5 rounded-xl overflow-hidden min-w-[140px]"
                  style={{ background: t.bg, border: `1px solid ${t.line}`, boxShadow: '0 8px 24px rgba(0,0,0,.18)' }}
                >
                  <a
                    href="#resources"
                    onClick={() => setShopOpen(false)}
                    className="px-5 py-2.5 hover:opacity-70 whitespace-nowrap"
                    data-blob-hover
                  >
                    Resources
                  </a>
                  <a
                    href="#merch"
                    onClick={() => setShopOpen(false)}
                    className="px-5 py-2.5 hover:opacity-70 whitespace-nowrap"
                    data-blob-hover
                  >
                    Merch
                  </a>
                </div>
              </div>
            )}
          </div>

          <a href="#contact" className="hover:opacity-70" data-blob-hover>Contact</a>
          <a
            href="#clinic"
            className="btn-shine inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold border"
            style={{ borderColor: t.accent, color: t.accent }}
            data-blob-hover
          >Book In-Person</a>
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
          {['about','services','process'].map(s => (
            <a key={s} href={`#${s}`} onClick={() => setOpen(false)} className="py-2 border-b" style={{ borderColor: t.line }}>{s}</a>
          ))}

          {/* Shop group */}
          <button
            className="py-2 border-b flex items-center justify-between w-full text-left"
            style={{ borderColor: t.line }}
            onClick={() => setShopMobileOpen(v => !v)}
          >
            Shop
            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" style={{ opacity: .5, transition: 'transform .2s', transform: shopMobileOpen ? 'rotate(180deg)' : 'none' }}>
              <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {shopMobileOpen && (
            <div className="flex flex-col gap-2 pl-4 -mt-1">
              <a href="#resources" onClick={() => setOpen(false)} className="py-2 border-b text-[13px] opacity-70" style={{ borderColor: t.line }}>Resources</a>
              <a href="#merch"     onClick={() => setOpen(false)} className="py-2 border-b text-[13px] opacity-70" style={{ borderColor: t.line }}>Merch</a>
            </div>
          )}

          <a href="#contact" onClick={() => setOpen(false)} className="py-2 border-b" style={{ borderColor: t.line }}>Contact</a>
          <a href="#clinic" onClick={() => setOpen(false)} className="py-2 border-b font-bold" style={{ borderColor: t.line, color: t.accent }}>Book In-Person ↗</a>
          <a href={CALENDLY_URL} onClick={() => setOpen(false)} className="mt-3 px-5 py-3 rounded-full font-bold text-center" style={{ background: t.accent, color: '#EAE6D7' }}>Book a call →</a>
        </div>
      )}
    </header>
  );
}
window.Nav = Nav;
