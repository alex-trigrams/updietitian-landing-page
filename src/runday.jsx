// Run Day — Typeform-style signup for the UP Dietitian Social Run Day (/run-day).
//
// One question per screen, Enter to advance, A/B/C to pick a choice. Built
// mobile-first and deliberately light, since most people will open it from an
// Instagram link on their phone: one background photo (a ~37KB portrait crop on
// phones, a landscape crop on desktop, loaded via <picture> media queries so a
// phone never downloads the big one), no blur filters, no noise overlay.
//
// Submits to the same Formspree form as the enquiry form (src/enquiry.jsx),
// tagged "Social Run Day" so Lauren can filter signups in her inbox / Formspree.
//
// Event details live in RUN_DAY below — fill them in when they're confirmed.
// Anything left null shows as "TBC".
//
// Render-safety: api/render.js server-renders this page, so nothing here may
// touch window/document outside effects and event handlers.

const RUN_DAY = {
  date: null,      // e.g. 'Sat 6 Dec · 6:30am'
  meet: null,      // e.g. 'Matilda Bay, Crawley'
  distance: null,  // e.g. '5–8 km, all paces'
};

const RUN_DAY_TRAINING = [
  { key: 'A', value: 'Full Ironman' },
  { key: 'B', value: '70.3' },
  { key: 'C', value: 'Just for the vibes' },
];

const RUN_DAY_STEPS = ['intro', 'name', 'phone', 'email', 'training', 'question', 'done'];

const RD_MUTED = 'rgba(234,230,215,.6)';

function RunDayField({ name, type, value, onChange, placeholder, inputRef, autoComplete, inputMode, enterKeyHint }) {
  const common = {
    ref: inputRef,
    name,
    value,
    placeholder,
    autoComplete,
    inputMode,
    enterKeyHint,
    onChange: (e) => onChange(e.target.value),
    // >=16px keeps iOS from zooming in on focus.
    className: 'w-full bg-transparent outline-none font-sans rounded-none placeholder:opacity-30',
    style: { color: '#EAE6D7', borderBottom: '2px solid rgba(234,230,215,.35)', fontSize: 'clamp(22px, 3vw, 32px)', paddingBlock: 10, caretColor: '#FF6C00' },
  };
  if (type === 'textarea') return <textarea rows={3} {...common} className={common.className + ' resize-none'} />;
  return <input type={type} {...common} />;
}

function RunDayPage() {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({ name: '', phone: '', email: '', training: '', question: '' });
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle | sending | error
  const inputRef = React.useRef(null);
  const honeypot = React.useRef(null);

  const id = RUN_DAY_STEPS[step];
  const isQuestion = id !== 'intro' && id !== 'done';
  const set = (k) => (v) => { setData((d) => ({ ...d, [k]: v })); setError(''); };
  const first = data.name.trim().split(/\s+/)[0];

  const validate = () => {
    if (id === 'name' && !data.name.trim()) return 'Please pop your name in.';
    if (id === 'phone' && !/^[+\d][\d\s()-]{7,}$/.test(data.phone.trim())) return 'That number doesn\'t look quite right.';
    if (id === 'email' && !/^\S+@\S+\.\S+$/.test(data.email.trim())) return 'Please enter a valid email.';
    if (id === 'training' && !data.training) return 'Pick one to continue.';
    if (id === 'question' && !data.question.trim()) return 'Ask Lauren anything about nutrition.';
    return '';
  };

  const submit = async () => {
    if (honeypot.current && honeypot.current.value) return;
    setStatus('sending');
    const body = new FormData();
    body.append('name', data.name.trim());
    body.append('phone', data.phone.trim());
    body.append('email', data.email.trim());
    body.append('training_for', data.training);
    body.append('nutrition_question', data.question.trim());
    body.append('topic', 'Social Run Day');
    body.append('_subject', `Social Run Day signup: ${data.name.trim()}`);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error();
      setStatus('idle');
      setStep(RUN_DAY_STEPS.indexOf('done'));
      if (window.va) window.va('event', { name: 'run_day_signup', data: { training: data.training } });
    } catch (_) {
      setStatus('error');
      setError('Something went wrong sending that. Please try again, or email hello@updietitian.com.');
    }
  };

  const next = () => {
    if (status === 'sending') return;
    const msg = validate();
    if (msg) { setError(msg); return; }
    setError('');
    if (id === 'question') { submit(); return; }
    setStep((s) => Math.min(s + 1, RUN_DAY_STEPS.length - 1));
  };
  const back = () => { setError(''); setStep((s) => Math.max(s - 1, 0)); };

  const pick = (value) => {
    setData((d) => ({ ...d, training: value }));
    setError('');
    // Typeform-style: a short beat to show the selection, then move on.
    setTimeout(() => setStep(RUN_DAY_STEPS.indexOf('question')), 320);
  };

  // Focus the input on each step and keep the top of the form in view (on a
  // phone the keyboard takes half the screen).
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus({ preventScroll: true });
    if (step > 0) window.scrollTo(0, 0);
  }, [step]);
  React.useEffect(() => {
    const onKey = (e) => {
      if (id === 'done' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Enter' && !(id === 'question' && e.shiftKey)) {
        if (e.target && (e.target.tagName === 'BUTTON' || e.target.tagName === 'A')) return;
        e.preventDefault();
        next();
        return;
      }
      if (id === 'training') {
        const opt = RUN_DAY_TRAINING.find((o) => o.key === e.key.toUpperCase());
        if (opt) pick(opt.value);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  // Questions only (not intro/done) count toward progress.
  const total = RUN_DAY_STEPS.length - 2;
  const progress = id === 'done' ? 1 : Math.max(0, step - 1) / total;

  const label = (n, text, sub) => (
    <React.Fragment>
      <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: '#FF6C00' }}>
        {n} <span style={{ color: RD_MUTED }}>/ {total}</span>
      </div>
      <h2 className="mt-3 font-display leading-[.95]" style={{ fontSize: 'clamp(30px, 4.4vw, 56px)', color: '#EAE6D7' }}>{text}</h2>
      {sub && <p className="mt-3 text-[15px] leading-relaxed" style={{ color: RD_MUTED }}>{sub}</p>}
    </React.Fragment>
  );

  const primaryBtn = 'btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 min-h-[54px] rounded-full font-mono text-[13px] uppercase tracking-[.18em] font-bold disabled:opacity-50';

  const okButton = (text) => (
    <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
      <button type="button" onClick={next} disabled={status === 'sending'} className={primaryBtn} style={{ background: '#FF6C00', color: '#EAE6D7' }} data-blob-hover>
        {text} <span style={{ fontFamily: 'Anton' }}>→</span>
      </button>
      <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[.16em]" style={{ color: 'rgba(234,230,215,.45)' }}>
        press <b style={{ color: '#EAE6D7' }}>Enter ↵</b>
      </span>
    </div>
  );

  let body;
  if (id === 'intro') {
    const detail = (k, v) => (
      <div className="flex flex-col gap-1 pr-6">
        <span className="font-mono text-[10px] uppercase tracking-[.2em]" style={{ color: RD_MUTED }}>{k}</span>
        <span className="font-mono text-[13px] uppercase tracking-[.08em]" style={{ color: '#EAE6D7' }}>{v || 'TBC'}</span>
      </div>
    );
    body = (
      <React.Fragment>
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: '#FF6C00' }}>
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#FF6C00' }}></span>
          <span>Free community event</span>
        </div>
        <h1 className="mt-4 font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 7.5vw, 104px)', color: '#EAE6D7' }}>
          <span className="skew-italic">UP Dietitian</span><br />
          <span className="skew-italic" style={{ color: '#FF6C00' }}>Social Run</span>{' '}
          <span className="skew-italic">Day.</span>
        </h1>
        <p className="mt-5 max-w-[52ch] text-[15px] md:text-[17px] leading-relaxed" style={{ color: 'rgba(234,230,215,.85)' }}>
          A relaxed group run for every pace, then a 10–15 minute nutrition Q&amp;A with Lauren Nash, APD. Grab your spot and send through the question you want answered.
        </p>
        <div className="mt-6 flex flex-wrap gap-y-4 pt-5" style={{ borderTop: '1px solid rgba(234,230,215,.18)' }}>
          {detail('When', RUN_DAY.date)}
          {detail('Meet', RUN_DAY.meet)}
          {detail('Run', RUN_DAY.distance)}
        </div>
        {okButton("I'm in")}
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[.16em] text-center sm:text-left" style={{ color: 'rgba(234,230,215,.45)' }}>5 quick questions · under a minute</p>
      </React.Fragment>
    );
  } else if (id === 'name') {
    body = (
      <React.Fragment>
        {label(1, "First up, what's your name?")}
        <div className="mt-7"><RunDayField inputRef={inputRef} name="name" type="text" autoComplete="name" enterKeyHint="next" value={data.name} onChange={set('name')} placeholder="Your name" /></div>
        {okButton('OK')}
      </React.Fragment>
    );
  } else if (id === 'phone') {
    body = (
      <React.Fragment>
        {label(2, <span>Nice to meet you{first ? <span style={{ color: '#FF6C00' }}>, {first}</span> : ''}. Best phone number?</span>, 'Only used for run-day updates, like a change of meeting point.')}
        <div className="mt-7"><RunDayField inputRef={inputRef} name="phone" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" value={data.phone} onChange={set('phone')} placeholder="04xx xxx xxx" /></div>
        {okButton('OK')}
      </React.Fragment>
    );
  } else if (id === 'email') {
    body = (
      <React.Fragment>
        {label(3, 'And your email?', "We'll send the details through here.")}
        <div className="mt-7"><RunDayField inputRef={inputRef} name="email" type="email" inputMode="email" autoComplete="email" enterKeyHint="next" value={data.email} onChange={set('email')} placeholder="you@email.com" /></div>
        {okButton('OK')}
      </React.Fragment>
    );
  } else if (id === 'training') {
    body = (
      <React.Fragment>
        {label(4, 'What are you training for?')}
        <div className="mt-7 flex flex-col gap-3 sm:max-w-[440px]" role="radiogroup" aria-label="Training for">
          {RUN_DAY_TRAINING.map((o) => {
            const on = data.training === o.value;
            return (
              <button
                key={o.key}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => pick(o.value)}
                className="flex items-center gap-4 px-4 min-h-[58px] rounded-xl text-left transition-colors"
                style={{ background: on ? 'rgba(255,108,0,.25)' : 'rgba(234,230,215,.08)', border: `1px solid ${on ? '#FF6C00' : 'rgba(234,230,215,.22)'}`, color: '#EAE6D7' }}
                data-blob-hover
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-md font-mono text-[12px] font-bold flex-shrink-0" style={{ background: on ? '#FF6C00' : 'transparent', border: `1px solid ${on ? '#FF6C00' : 'rgba(234,230,215,.4)'}`, color: on ? '#201C12' : '#EAE6D7' }}>{o.key}</span>
                <span className="text-[17px] font-semibold">{o.value}</span>
                {on && <span className="ml-auto" style={{ color: '#FF6C00' }}>✓</span>}
              </button>
            );
          })}
        </div>
      </React.Fragment>
    );
  } else if (id === 'question') {
    body = (
      <React.Fragment>
        {label(5, <span>Your <span style={{ color: '#FF6C00' }}>nutrition question</span> for Lauren?</span>, "She'll answer them in a 10–15 minute Q&A after the run. Race fuelling, gut issues, recovery: ask away.")}
        <div className="mt-7"><RunDayField inputRef={inputRef} name="question" type="textarea" enterKeyHint="send" value={data.question} onChange={set('question')} placeholder="Type your question" /></div>
        {okButton(status === 'sending' ? 'Sending…' : 'Submit')}
      </React.Fragment>
    );
  } else {
    body = (
      <React.Fragment>
        <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: '#FF6C00' }}>You're on the list</div>
        <h2 className="mt-4 font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: '#EAE6D7' }}>
          <span className="skew-italic">See you</span><br />
          <span className="skew-italic" style={{ color: '#FF6C00' }}>out there{first ? `, ${first}` : ''}.</span>
        </h2>
        <p className="mt-5 max-w-[48ch] text-[15px] md:text-[17px] leading-relaxed" style={{ color: 'rgba(234,230,215,.85)' }}>
          Thanks for signing up. Lauren has your question for the Q&amp;A, and we'll be in touch with run-day details.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href="https://www.instagram.com/up_dietitian/" target="_blank" rel="noopener" className={primaryBtn} style={{ background: '#FF6C00', color: '#EAE6D7' }} data-blob-hover>
            Follow @up_dietitian →
          </a>
          <Link href="/" className="w-full sm:w-auto inline-flex items-center justify-center px-7 min-h-[54px] rounded-full font-mono text-[13px] uppercase tracking-[.18em] font-bold" style={{ color: '#EAE6D7', border: '1px solid rgba(234,230,215,.35)' }} data-blob-hover>
            Explore the site
          </Link>
        </div>
      </React.Fragment>
    );
  }

  // Intro and thank-you sit at the bottom of the screen over the photo on
  // phones; question steps sit at the top so the keyboard never covers them.
  const mobileAlign = isQuestion ? 'justify-start' : 'justify-end';

  return (
    <section className="relative overflow-hidden" style={{ background: '#201C12', minHeight: '100svh' }}>
      {/* One background photo. Phones get a small portrait crop, desktop a
          landscape one; the browser only downloads the one that matches. */}
      <picture>
        <source media="(max-width: 767px)" srcSet="assets/images/run-day/run-mobile.avif" type="image/avif" />
        <source media="(max-width: 767px)" srcSet="assets/images/run-day/run-mobile.jpg" />
        <source srcSet="assets/images/run-day/run-desktop.avif" type="image/avif" />
        <img
          src="assets/images/run-day/run-desktop.jpg"
          alt=""
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center 20%', opacity: isQuestion ? 0.28 : 0.6, transition: 'opacity .6s' }}
        />
      </picture>
      <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(32,28,18,.35) 0%, rgba(32,28,18,.55) 45%, #201C12 88%)' }} />

      {/* progress bar, just under the nav */}
      <div aria-hidden className="absolute left-0 right-0 top-16 md:top-20 h-1 z-10" style={{ background: 'rgba(234,230,215,.1)' }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: '#FF6C00', transition: 'width .5s cubic-bezier(.2,.8,.2,1)' }} />
      </div>

      <div className={`relative flex flex-col ${mobileAlign} md:justify-center md:items-center px-5 md:px-8`} style={{ minHeight: '100svh', paddingTop: isQuestion ? 104 : 96, paddingBottom: 'max(32px, env(safe-area-inset-bottom))' }}>
        <form
          onSubmit={(e) => { e.preventDefault(); next(); }}
          noValidate
          className="w-full md:rounded-3xl md:p-12 md:bg-[rgba(20,17,10,.6)] md:border md:border-[rgba(234,230,215,.12)]"
          style={{ maxWidth: 640 }}
        >
          <input ref={honeypot} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
          {isQuestion && (
            <button type="button" onClick={back} className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] py-2" style={{ color: RD_MUTED }} data-blob-hover>
              ← Back
            </button>
          )}
          <div key={step} style={{ animation: 'runDayIn .45s cubic-bezier(.2,.8,.2,1) both' }}>
            {body}
          </div>
          {error && <p role="alert" className="mt-5 px-3 py-2 rounded-md text-[14px]" style={{ background: 'rgba(255,108,0,.18)', color: '#FFB27A' }}>{error}</p>}
        </form>
      </div>
    </section>
  );
}

Object.assign(window, { RunDayPage });
