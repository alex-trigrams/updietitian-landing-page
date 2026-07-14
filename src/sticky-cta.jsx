// Sticky CTA — bottom mobile bar + desktop floating pill.
function StickyCTA({ theme }) {
  const y = useScrollY();
  const visible = y > 600;
  return (
    <>
      {/* mobile bottom dock */}
      <div className="md:hidden fixed left-3 right-3 z-30 safe-b transition-transform duration-300"
           style={{ bottom: 0, transform: visible ? 'translateY(0)' : 'translateY(150%)' }}>
        <a href={CALENDLY_URL}
           className="btn-shine flex items-center justify-between gap-3 w-full mb-3 px-5 py-4 rounded-2xl font-mono text-[12px] uppercase tracking-[.16em] font-bold shadow-2xl"
           style={{ background: '#FF6C00', color: '#EAE6D7' }}>
          <span className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full pulse-dot" style={{ background: '#EAE6D7' }}></span>
            {C('stickyCta.mobileLabel', 'Book Discovery Call')}
          </span>
          <span style={{ fontFamily: 'Anton', fontSize: 22 }}>→</span>
        </a>
      </div>

      {/* desktop floating pill (only when scrolled) */}
      <a href={CALENDLY_URL}
         className="hidden md:flex btn-shine fixed bottom-6 right-6 z-30 items-center gap-3 px-5 py-3.5 rounded-full font-mono text-[12px] uppercase tracking-[.16em] font-bold shadow-2xl transition-all duration-300"
         style={{ background: '#FF6C00', color: '#EAE6D7', transform: visible ? 'translateY(0)' : 'translateY(180%)', opacity: visible ? 1 : 0 }}
         data-blob-hover>
        <span className="inline-block w-2 h-2 rounded-full pulse-dot" style={{ background: '#EAE6D7' }}></span>
        {C('stickyCta.desktopLabel', 'Book a discovery call')}
        <span style={{ fontFamily: 'Anton' }}>→</span>
      </a>
    </>
  );
}
window.StickyCTA = StickyCTA;
