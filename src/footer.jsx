// Footer — contact, location, big CTA, marquee close.
function Footer({ theme }) {
  return (
    <footer id="contact" data-screen-label="07 Footer" className="relative noise" style={{ background: '#201C12', color: '#EAE6D7', paddingTop: 'var(--pad-y, 96px)', paddingBottom: 48 }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-60">
          <span className="inline-block w-6 h-px bg-current"></span>
          <span>The next step</span>
        </div>

        {/* "Level UP." only ever fills the left of its line, so the right of
            the footer sat empty. A branded shot squares it off; it drops below
            the type on narrow screens rather than shrinking to nothing.
            Decorative, hence alt="". */}
        <div className="mt-6 grid grid-cols-12 gap-6 md:gap-10 items-center">
          <h2 className="col-span-12 md:col-span-7 font-display leading-[.85]" style={{ fontSize: 'clamp(64px, 14vw, 240px)' }}>
            <span className="skew-italic">Level</span><br/>
            <span className="skew-italic" style={{ color: '#FF6C00' }}>UP.</span>
          </h2>
          <div className="col-span-12 md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-full rounded-3xl overflow-hidden" style={{ paddingBottom: 'min(125%, 460px)', maxWidth: 368 }}>
              <picture>
                <source srcSet="assets/images/misc/footer-ride.avif" type="image/avif" />
                <img
                  src="assets/images/misc/footer-ride.jpg"
                  alt=""
                  loading="lazy"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </picture>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-6 lg:col-span-7">
            <a href={CALENDLY_URL} className="btn-shine inline-flex items-center gap-4 px-7 md:px-9 py-5 md:py-6 rounded-full font-mono text-[13px] md:text-[15px] uppercase tracking-[.18em] font-bold"
               style={{ background: '#FF6C00', color: '#EAE6D7' }} data-blob-hover>
              {C('footer.ctaLabel', 'Start your journey with UP Dietitian here')}
              <span style={{ fontFamily: 'Anton' }}>→</span>
            </a>
            <p className="mt-6 max-w-[52ch] text-[15px] md:text-[16px] leading-relaxed opacity-80">
              {C('footer.subCopy', 'Ready to take your nutrition to the next level but not sure if UP Dietitian is right for you? Book a complimentary call today and get ready for better fuelling, simplified.')}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-5 flex flex-col gap-8">

            {/* Contact details grid */}
            <div className="grid grid-cols-2 gap-6 font-mono text-[12px] uppercase tracking-[.16em]">
              <div className="flex flex-col gap-2.5">
                <span className="opacity-50">Clinic</span>
                <span>Front Runner<br/>Physiotherapy</span>
                <span className="opacity-70 normal-case tracking-normal text-[13px]">Osborne Park, WA</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="opacity-50">Online</span>
                <span>Australia-wide<br/>&amp; internationally</span>
                <span className="opacity-70 normal-case tracking-normal text-[13px]">via Zoom</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="opacity-50">Email</span>
                <a href={`mailto:${C('footer.email', 'hello@updietitian.com')}`} className="hover:text-orange normal-case tracking-normal text-[14px]" data-blob-hover>{C('footer.email', 'hello@updietitian.com')}</a>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="opacity-50">Social</span>
                <a href="https://www.instagram.com/up_dietitian/" target="_blank" rel="noreferrer" className="hover:text-orange normal-case tracking-normal text-[14px] flex items-center gap-2" data-blob-hover>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  {C('footer.instagramHandle', '@up_dietitian')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* legal + bottom line */}
        <div className="mt-20 pt-6 border-t flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[.16em] opacity-55" style={{ borderColor: 'rgba(234,230,215,.16)' }}>
          <span>© {new Date().getFullYear()} Up Dietitian · Lauren Nash APD</span>
          <Link href="/privacy" className="hover:opacity-100 hover:text-orange transition-opacity" data-blob-hover>Privacy</Link>
          <Link href="/cookies" className="hover:opacity-100 hover:text-orange transition-opacity" data-blob-hover>Cookies</Link>
          <Link href="/terms" className="hover:opacity-100 hover:text-orange transition-opacity" data-blob-hover>Payment &amp; Cancellation</Link>
          <Link href="/contact" className="hover:opacity-100 hover:text-orange transition-opacity" data-blob-hover>Contact</Link>
          <span className="ml-auto">Built for athletes · Perth WA</span>
          <span>designed by trigrams.studio</span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
