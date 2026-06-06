// App — root composition + tweaks wiring.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "green",
  "headline": "LEVEL UP | YOUR | PERFORMANCE",
  "sub": "Performance nutrition made practical. UP Dietitian supports active individuals with personalised nutrition strategies to optimise energy, recovery, race-day confidence and long-term health and performance.",
  "density": "regular"
}/*EDITMODE-END*/;

const HEADLINE_PRESETS = [
  "LEVEL UP | YOUR | PERFORMANCE",
  "FUELING | IS A | PERFORMANCE TOOL",
  "RACE DAY | STARTS AT | BREAKFAST",
  "TRAIN HARD. | EAT SMART. | GO UP."
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useCursorBlob();

  // Update css density attr on body
  React.useEffect(() => {
    document.body.dataset.density = t.density;
  }, [t.density]);

  const theme = t.theme;

  return (
    <div data-density={t.density} style={{ background: '#EAE6D7' }}>
      <Nav theme={theme} />
      <Hero headline={t.headline} sub={t.sub} theme={theme} />

      <Marquee
        items={['ULTRA PERFORMANCE NUTRITION FOR THE EVERYDAY TO ELITE']}
        theme={theme}
        accent
      />

      <About theme={theme} />
      <Photos />

      <Services theme={theme} />

      <Marquee
        items={['RUNNING', 'TRIATHLON', 'AFL', 'CROSSFIT', 'COMBAT SPORTS', 'SWIMMING', 'HORSE RACING', 'ULTRA']}
        theme={theme}
        reverse
      />

      <Process theme={theme} />
      <Clinic theme={theme} />
      {/* <Resources theme={theme} /> */}
      {/* <Merch theme={theme} /> */}

      <Marquee
        items={['BOOK A CALL', 'FREE 15 MIN', 'NO PRESSURE', 'GO UP']}
        theme={theme}
        accent
        slow
      />

      {/* HIDDEN — enquiry form section. Needs a form backend (e.g. Formspree) before going live so submissions reach Lauren's inbox without requiring a mail client. Uncomment when ready. */}
      {false && <section id="enquire" data-screen-label="07 Enquire" style={{ background: '#EAE6D7', color: '#201C12', paddingBlock: 'var(--pad-y, 96px)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-60">
            <span className="inline-block w-6 h-px bg-current"></span>
            <span>07 · Enquire</span>
          </div>
          <div className="mt-6 grid grid-cols-12 gap-10 items-start">
            <div className="col-span-12 md:col-span-5">
              <h2 className="font-display leading-[.88]" style={{ fontSize: 'clamp(40px, 7vw, 100px)' }}>
                <span className="skew-italic">Get in</span><br/>
                <span className="skew-italic" style={{ color: '#FF6C00' }}>touch.</span>
              </h2>
              <p className="mt-6 text-[15px] md:text-[17px] leading-relaxed opacity-70 max-w-[38ch]">
                Not sure where to start? Send Lauren a message and she'll get back to you within 24 hours.
              </p>
            </div>
            <div className="col-span-12 md:col-span-7 lg:col-span-6 lg:col-start-7">
              <div className="rounded-2xl p-6 md:p-8" style={{ background: '#fff', border: '1px solid rgba(32,28,18,.1)', boxShadow: '0 4px 24px rgba(32,28,18,.07)' }}>
                <form
                  onSubmit={(e) => { e.preventDefault(); const d = new FormData(e.target); window.location.href = `mailto:lauren@updietitian.com?subject=Enquiry from ${encodeURIComponent(d.get('name'))}&body=${encodeURIComponent(d.get('message'))}`; }}
                  className="flex flex-col gap-4"
                >
                  <input name="name" type="text" required placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl font-mono text-[13px] outline-none"
                    style={{ background: '#F5F2E8', border: '1px solid rgba(32,28,18,.12)', color: '#201C12' }} />
                  <input name="email" type="email" required placeholder="Email address"
                    className="w-full px-4 py-3 rounded-xl font-mono text-[13px] outline-none"
                    style={{ background: '#F5F2E8', border: '1px solid rgba(32,28,18,.12)', color: '#201C12' }} />
                  <textarea name="message" required rows={4} placeholder="Tell Lauren about your goals…"
                    className="w-full px-4 py-3 rounded-xl font-mono text-[13px] outline-none resize-none"
                    style={{ background: '#F5F2E8', border: '1px solid rgba(32,28,18,.12)', color: '#201C12' }} />
                  <button type="submit"
                    className="btn-shine self-start inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold"
                    style={{ background: '#FF6C00', color: '#EAE6D7' }} data-blob-hover>
                    Send enquiry →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>}

      <Footer theme={theme} />


      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio
          label="Hero color"
          value={t.theme}
          options={['green', 'orange', 'sand']}
          onChange={(v) => setTweak('theme', v)}
        />

        <TweakSection label="Hero copy" />
        <TweakSelect
          label="Headline preset"
          value={t.headline}
          options={HEADLINE_PRESETS}
          onChange={(v) => setTweak('headline', v)}
        />
        <TweakText
          label="Headline (| = new line)"
          value={t.headline}
          onChange={(v) => setTweak('headline', v)}
        />
        <TweakText
          label="Sub copy"
          value={t.sub}
          onChange={(v) => setTweak('sub', v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact', 'regular', 'airy']}
          onChange={(v) => setTweak('density', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
