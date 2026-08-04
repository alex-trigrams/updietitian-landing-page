// Legal + utility pages — Privacy, Cookies, Contact, 404.
//
// Copy here is hardcoded (not Blob/admin-editable) on purpose: legal text
// changes rarely and shouldn't be casually edited through the marketing panel.
// The privacy/cookie content is tailored to the Australian Privacy Act 1988
// (APPs) but is a template — Lauren should confirm the business/ABN details and
// have it reviewed. It is not legal advice.

const LEGAL_UPDATED = 'July 2026';

// Shared prose wrapper — sand page, mono eyebrow, Anton heading, readable column.
function LegalPage({ eyebrow, title, accent, children }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <section className="relative" style={{ background: '#EAE6D7', color: '#201C12', paddingTop: 'clamp(120px, 16vw, 200px)', paddingBottom: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[820px] mx-auto px-5 md:px-8">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-70">
          <span className="inline-block w-6 h-px bg-current"></span>
          <span>{eyebrow}</span>
        </div>
        <h1 className="mt-5 font-display leading-[.9]" style={{ fontSize: 'clamp(44px, 8vw, 96px)' }}>
          <span className="skew-italic">{title}</span>
          {accent && <span className="skew-italic" style={{ color: '#FF6C00' }}> {accent}</span>}
        </h1>
        <div className="legal-prose mt-10">{children}</div>
        <style>{`
          .legal-prose { font-size: 15px; line-height: 1.75; color: rgba(32,28,18,.82); }
          .legal-prose h2 { font-family: 'Anton', Impact, sans-serif; letter-spacing: .01em; font-size: clamp(22px, 3vw, 30px); margin: 40px 0 12px; color: #201C12; }
          .legal-prose p { margin: 0 0 16px; }
          .legal-prose a { color: #FF6C00; text-decoration: underline; text-underline-offset: 3px; }
          .legal-prose ul { margin: 0 0 16px; padding-left: 0; list-style: none; }
          .legal-prose li { position: relative; padding-left: 20px; margin-bottom: 8px; }
          .legal-prose li::before { content: ''; position: absolute; left: 0; top: 10px; width: 6px; height: 6px; border-radius: 999px; background: #FF6C00; }
          .legal-prose .meta { font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: .18em; opacity: .6; margin-bottom: 32px; }
          .legal-prose .note { background: rgba(255,108,0,.08); border: 1px solid rgba(255,108,0,.25); border-radius: 14px; padding: 16px 18px; font-size: 13.5px; }
        `}</style>
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <LegalPage eyebrow="Legal · Your privacy" title="Privacy" accent="Policy">
      <p className="meta">Last updated: {LEGAL_UPDATED}</p>

      <p>UP Dietitian ("we", "us", "our"), operated by Lauren Nash (APD), is committed to protecting your privacy and handling your personal information in accordance with the <em>Privacy Act 1988 (Cth)</em> and the Australian Privacy Principles (APPs). This policy explains what we collect, why, and your rights.</p>

      <h2>Information we collect</h2>
      <p>We only collect information you provide or that is necessary to deliver our services:</p>
      <ul>
        <li><strong>Contact details</strong> — name, email address and phone number when you enquire or book.</li>
        <li><strong>Health &amp; nutrition information</strong> — where you become a client, we collect relevant health, dietary, training and medical history to provide safe, individualised dietetic care. This is "sensitive information" under the APPs and is only collected with your consent.</li>
        <li><strong>Booking &amp; payment details</strong> — handled by our booking and payment providers (see below); we do not store your full card details.</li>
        <li><strong>Website usage</strong> — anonymous, aggregated analytics (see our <Link href="/cookies">Cookie Policy</Link>). We do not use tracking cookies.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to enquiries and provide dietetic consultations and plans.</li>
        <li>To manage bookings, appointments and payments.</li>
        <li>To meet our professional, insurance and legal record-keeping obligations.</li>
        <li>To improve our website and services (using anonymous analytics only).</li>
      </ul>
      <p>We do not sell your personal information, and we do not use it for marketing without your consent.</p>

      <h2>Third-party services</h2>
      <p>We use trusted providers to run our practice and website. Each has its own privacy policy:</p>
      <ul>
        <li><strong>Calendly</strong> — discovery-call scheduling.</li>
        <li><strong>Front Runner Physiotherapy / Cliniko</strong> — in-person clinic bookings and clinical records.</li>
        <li><strong>Vercel</strong> — website hosting and privacy-friendly, cookieless analytics.</li>
        <li><strong>Instagram (Meta)</strong> — if you choose to visit or contact us via social media.</li>
      </ul>

      <h2>Storage &amp; security</h2>
      <p>We take reasonable steps to protect your information from misuse, loss and unauthorised access. Clinical records are retained for the period required by law and professional standards, then securely destroyed or de-identified.</p>

      <h2>Accessing &amp; correcting your information</h2>
      <p>You can request access to the personal information we hold about you, ask us to correct it, or withdraw consent, by emailing <a href="mailto:hello@updietitian.com">hello@updietitian.com</a>. We will respond within a reasonable time.</p>

      <h2>Complaints</h2>
      <p>If you have a privacy concern, please contact us first so we can resolve it. If you are not satisfied, you can contact the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" target="_blank" rel="noreferrer">oaic.gov.au</a>.</p>

      <h2>Contact</h2>
      <p>UP Dietitian — Lauren Nash, APD<br/>Email: <a href="mailto:hello@updietitian.com">hello@updietitian.com</a><br/>Perth, Western Australia</p>

      <p className="note"><strong>Note for the business owner:</strong> confirm your registered legal/business name and ABN before publishing, and consider having this policy reviewed by a professional. This template is a starting point, not legal advice.</p>
    </LegalPage>
  );
}

function Cookies() {
  return (
    <LegalPage eyebrow="Legal · Cookies" title="Cookie" accent="Policy">
      <p className="meta">Last updated: {LEGAL_UPDATED}</p>

      <p>This website is designed to respect your privacy. We do <strong>not</strong> use advertising or tracking cookies, and we do not build profiles of visitors.</p>

      <h2>Analytics</h2>
      <p>We use Vercel Web Analytics to understand, in aggregate, how the site is used (for example, which pages are visited). This service is <strong>cookieless</strong> — it does not store cookies on your device and does not collect personally identifiable information. Data is anonymised and used only to improve the site.</p>

      <h2>Essential cookies</h2>
      <p>The only cookie this site can set is a session cookie used by the private administration area, which is used exclusively by the site owner to edit website content. It is never set for ordinary visitors browsing the public site.</p>

      <h2>Third-party links</h2>
      <p>When you book through Calendly or Front Runner Physiotherapy, or visit our Instagram, those services may set their own cookies under their own policies. Please refer to their respective privacy and cookie policies.</p>

      <h2>Managing cookies</h2>
      <p>Because we set no tracking cookies, there is nothing to consent to or opt out of here. You can still control or clear cookies at any time through your browser settings.</p>

      <p>See also our <Link href="/privacy">Privacy Policy</Link>.</p>
    </LegalPage>
  );
}

// Payment & cancellation policy — Lauren's own wording, supplied 2026-07-28.
// Replaces the earlier generic placeholder template. Any change to fees or
// notice periods here must match what she sends in booking confirmations.
function Terms() {
  return (
    <LegalPage eyebrow="Legal · Payment & cancellation" title="Payment &" accent="Cancellation Policy">
      <p className="meta">Last updated: {LEGAL_UPDATED}</p>

      <h2>Consultation fees</h2>
      <p>All consultations with UP Dietitian are paid services, unless a prior agreement has been made. An invoice will be issued following your appointment and sent to the email address provided at the time of booking.</p>

      <h2>Payment terms</h2>
      <p>Payment is due within 7 days of the invoice date unless otherwise agreed.</p>

      <h2>Nutrition plans</h2>
      <p>Nutrition plans and other personalised resources prepared by UP Dietitian will be provided once payment has been received, and within 5 business days from your consultation.</p>

      <h2>Cancellations &amp; rescheduling</h2>
      <ul>
        <li>Appointments may be cancelled or rescheduled free of charge with at least 24 hours' notice.</li>
        <li>Cancellations made within 24 hours of the scheduled appointment time may incur a cancellation fee of 50% of the consultation fee.</li>
      </ul>

      <h2>Missed appointments (no-shows)</h2>
      <p>Clients who do not attend their scheduled appointment without prior notice may be charged 100% of the consultation fee.</p>

      <h2>Late arrivals</h2>
      <p>If you arrive late, your consultation may need to be shortened to avoid delaying other appointments. The full consultation fee will still apply.</p>

      <h2>Special circumstances</h2>
      <p>UP Dietitian understands that unexpected situations can arise. Cancellation fees may be waived at the discretion of the practitioner in cases of genuine emergencies or unforeseen circumstances.</p>

      <h2>Questions</h2>
      <p>For more information, please do not hesitate to contact <a href="mailto:hello@updietitian.com">hello@updietitian.com</a>.</p>
    </LegalPage>
  );
}

function ContactPage() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <section className="relative noise" style={{ background: '#201C12', color: '#EAE6D7', paddingTop: 'clamp(120px, 16vw, 200px)', paddingBottom: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-60">
          <span className="inline-block w-6 h-px bg-current"></span>
          <span>Get in touch</span>
        </div>
        <h1 className="mt-6 font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 10vw, 150px)' }}>
          <span className="skew-italic">Let's</span>{' '}
          <span className="skew-italic" style={{ color: '#FF6C00' }}>talk.</span>
        </h1>

        <div className="mt-10 grid grid-cols-12 gap-8 md:gap-10">
          <div className="col-span-12 md:col-span-6 lg:col-span-7">
            <p className="max-w-[52ch] text-[16px] md:text-[18px] leading-relaxed opacity-85">
              Whether you're chasing a race goal, managing a health condition, or just want to fuel smarter — the best place to start is a free 15-minute call. No pressure, just a chat about where you're at and how UP Dietitian can help.
            </p>
            <a href={CALENDLY_URL} className="btn-shine mt-8 inline-flex items-center gap-4 px-7 md:px-9 py-5 md:py-6 rounded-full font-mono text-[13px] md:text-[15px] uppercase tracking-[.18em] font-bold"
               style={{ background: '#FF6C00', color: '#EAE6D7' }} data-blob-hover>
              Book a free 15-min call
              <span style={{ fontFamily: 'Anton' }}>→</span>
            </a>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div className="grid grid-cols-2 gap-6 font-mono text-[12px] uppercase tracking-[.16em]">
              <div className="flex flex-col gap-2.5">
                <span className="opacity-50">Email</span>
                <a href="mailto:hello@updietitian.com" className="hover:text-orange normal-case tracking-normal text-[14px]" data-blob-hover>hello@updietitian.com</a>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="opacity-50">Social</span>
                <a href="https://www.instagram.com/up_dietitian/" target="_blank" rel="noreferrer" className="hover:text-orange normal-case tracking-normal text-[14px]" data-blob-hover>@up_dietitian</a>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="opacity-50">In person</span>
                <span className="normal-case tracking-normal text-[14px] leading-snug">Front Runner Physiotherapy<br/>Osborne Park, WA</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <span className="opacity-50">Online</span>
                <span className="normal-case tracking-normal text-[14px] leading-snug">Australia-wide &amp;<br/>internationally via Zoom</span>
              </div>
            </div>
            <Link href="/clinic" className="mt-8 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[.18em] underline underline-offset-4 hover:text-orange" data-blob-hover>
              Prefer in-person? See the clinic →
            </Link>
          </div>
        </div>

        {/* Inline enquiry form (same component the modal uses) */}
        <div className="mt-14 rounded-3xl p-6 md:p-10" style={{ background: '#EAE6D7', color: '#201C12' }}>
          <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: '#FF6C00' }}>Send a message</div>
          <h2 className="mt-3 mb-6 font-display leading-[.9]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
            <span className="skew-italic">Ready to</span>{' '}<span className="skew-italic" style={{ color: '#FF6C00' }}>Level UP?</span>
          </h2>
          <EnquiryForm topic="General" />
        </div>
      </div>
    </section>
  );
}

function NotFound() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <section className="relative noise scan flex flex-col items-center justify-center text-center" style={{ background: '#201C12', color: '#EAE6D7', minHeight: '100svh', padding: '120px 20px 80px' }}>
      <div className="font-mono text-[11px] uppercase tracking-[.24em]" style={{ color: '#FF6C00' }}>Error 404</div>
      <h1 className="mt-6 font-display leading-[.85]" style={{ fontSize: 'clamp(80px, 22vw, 300px)' }}>
        <span className="skew-italic">Off</span> <span className="skew-italic" style={{ color: '#FF6C00' }}>course.</span>
      </h1>
      <p className="mt-6 max-w-[42ch] text-[15px] md:text-[17px] leading-relaxed opacity-75">
        This page doesn't exist — it may have moved, or the link was mistyped. Let's get you back on track.
      </p>
      <Link href="/" className="btn-shine mt-9 inline-flex items-center gap-3 px-7 py-4 rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold"
            style={{ background: '#FF6C00', color: '#EAE6D7' }} data-blob-hover>
        Back to home <span style={{ fontFamily: 'Anton' }}>→</span>
      </Link>
    </section>
  );
}

Object.assign(window, { Privacy, Cookies, Terms, ContactPage, NotFound });
