// Footer — contact, location, big CTA, marquee close.
function Footer({ theme }) {
  return (
    <footer id="contact" data-screen-label="06 Footer" className="relative noise" style={{ background: '#201C12', color: '#EAE6D7', paddingTop: 'var(--pad-y, 96px)', paddingBottom: 48 }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-60">
          <span className="inline-block w-6 h-px bg-current"></span>
          <span>06 · The next step</span>
        </div>

        <h2 className="mt-6 font-display leading-[.85]" style={{ fontSize: 'clamp(64px, 14vw, 240px)' }}>
          <span className="skew-italic">Go</span><br/>
          <span className="skew-italic" style={{ color: '#FF6C00' }}>up.</span>
        </h2>

        <div className="mt-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-6 lg:col-span-7">
            <a href={CALENDLY_URL} className="btn-shine inline-flex items-center gap-4 px-7 md:px-9 py-5 md:py-6 rounded-full font-mono text-[13px] md:text-[15px] uppercase tracking-[.18em] font-bold"
               style={{ background: '#FF6C00', color: '#EAE6D7' }} data-blob-hover>
              Book a 15-min Discovery Call
              <span style={{ fontFamily: 'Anton' }}>→</span>
            </a>
            <p className="mt-6 max-w-[52ch] text-[15px] md:text-[16px] leading-relaxed opacity-80">
              Free. 15 minutes. We'll talk through your sport, your training block, and what's getting in the way. If I'm not the right fit, I'll say so.
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-5 grid grid-cols-2 gap-6 md:gap-8 font-mono text-[12px] uppercase tracking-[.16em]">
            <div className="flex flex-col gap-2.5">
              <span className="opacity-50">Clinic</span>
              <span>Front Runner<br/>Sports</span>
              <span className="opacity-70 normal-case tracking-normal text-[13px]">Osborne Park, WA</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="opacity-50">Online</span>
              <span>Australia-wide<br/>via Zoom</span>
              <span className="opacity-70 normal-case tracking-normal text-[13px]">Mon · Wed · Fri</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="opacity-50">Email</span>
              <a href="mailto:lauren@updietitian.com" className="hover:text-orange normal-case tracking-normal text-[14px]" data-blob-hover>lauren@updietitian.com</a>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="opacity-50">Social</span>
              <a href="https://instagram.com/updietitian" target="_blank" rel="noreferrer" className="hover:text-orange normal-case tracking-normal text-[14px]" data-blob-hover>@updietitian</a>
            </div>
          </div>
        </div>

        {/* bottom line */}
        <div className="mt-20 pt-6 border-t flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[.16em] opacity-55" style={{ borderColor: 'rgba(234,230,215,.16)' }}>
          <span>© 2025 Up Dietitian · Lauren Nash APD</span>
          <span>Built for athletes · Perth WA</span>
          <span>v1.0 · designed by trigrams.studio</span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
