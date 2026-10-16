// Mobile CTA dock — always stuck to the bottom of the screen on mobile so the
// primary actions stay in view. "Book a call" → Calendly; "Enquire" → the
// enquiry modal. Hidden on desktop, where the nav already carries these.
// The booking button's wording is Lauren's to edit in /admin
// (stickyCta.mobileLabel). It takes the larger share of the bar so her longer
// wording fits on one line on most phones, and wraps rather than overflowing.
function StickyCTA() {
  return (
    <div
      className="md:hidden fixed left-0 right-0 bottom-0 z-50 safe-b"
      style={{ background: '#201C12', borderTop: '1px solid rgba(234,230,215,.14)', paddingTop: 10, paddingLeft: 12, paddingRight: 12 }}
    >
      <div className="flex items-center gap-2.5">
        <a
          href={CALENDLY_URL}
          className="btn-shine flex-[1.5] min-w-0 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full font-mono text-[12px] uppercase tracking-[.1em] font-bold text-center leading-tight"
          style={{ background: '#FF6C00', color: '#EAE6D7' }}
        >
          <span className="flex-shrink-0 inline-block w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#EAE6D7' }}></span>
          {C('stickyCta.mobileLabel', 'Book a call')}
        </a>
        <button
          onClick={() => openEnquiry()}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full font-mono text-[12px] uppercase tracking-[.14em] font-bold"
          style={{ background: 'transparent', color: '#EAE6D7', border: '1px solid rgba(234,230,215,.35)' }}
        >
          Enquire
        </button>
      </div>
    </div>
  );
}
window.StickyCTA = StickyCTA;
