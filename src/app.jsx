// App — root composition + tweaks wiring.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "green",
  "headline": "EAT | LIKE YOU | TRAIN",
  "sub": "I'm Lauren — a sports dietitian in Perth. I race marathons and Ironmans. I help athletes eat the right things at the right times so they can train harder, recover faster, and race better.",
  "density": "regular"
}/*EDITMODE-END*/;

const HEADLINE_PRESETS = [
  "EAT | LIKE YOU | TRAIN",
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
        items={['PB SEASON', 'EAT TO TRAIN', 'GO ULTRA', 'RACE READY', 'PERTH WA', 'APD 2024']}
        theme={theme}
        accent
      />

      <About theme={theme} />
      <Photos />

      <Marquee
        items={['RUNNING', 'TRIATHLON', 'AFL', 'CROSSFIT', 'COMBAT SPORTS', 'SWIMMING', 'HORSE RACING', 'ULTRA']}
        theme={theme}
        reverse
      />

      <Services theme={theme} />
      <Process theme={theme} />
      <Clinic theme={theme} />

      <Marquee
        items={['BOOK A CALL', 'FREE 15 MIN', 'NO PRESSURE', 'GO UP']}
        theme={theme}
        accent
        slow
      />

      <Footer theme={theme} />

      <StickyCTA theme={theme} />

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
