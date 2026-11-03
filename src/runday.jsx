// Run Day — signup form for the UP Dietitian Social Run Day (/run-day).
//
// Laid out like a Jotform / Typeform "classic" form: one light card with a
// cover photo, the event intro, then every question on the same page,
// numbered, filled in one go and sent with a single Submit. Kept deliberately
// plain and light for phones: one small banner photo (~14KB on mobile, picked
// by a <picture> media query), no animations, no cursor blob (switched off for
// this route in app.jsx), no blur or noise overlays.
//
// Submits to the same Formspree form as the enquiry form (src/enquiry.jsx),
// tagged "Social Run Day" so Lauren can filter signups in her inbox / Formspree.
//
// Event details live in RUN_DAY below. Anything left null shows as "TBC".
//
// Render-safety: api/render.js server-renders this page, so nothing here may
// touch window/document outside effects and event handlers.

const RUN_DAY = {
  date: 'Sun 15 Nov · 7am',
  meet: 'Mullaloo',
  after: 'Coffee at Swell',
  capacity: 40, // shown as information only; signups aren't counted or closed
};

const RUN_DAY_TRAINING = [
  { key: 'A', value: 'Full Ironman' },
  { key: 'B', value: '70.3' },
  { key: 'C', value: 'Just for the vibes' },
];

const RD = {
  ink: '#201C12',
  muted: 'rgba(32,28,18,.62)',
  line: 'rgba(32,28,18,.18)',
  orange: '#FF6C00',
  error: '#B83A00',
  page: '#F4F1E8',
  card: '#FFFFFF',
};

function RunDayQuestion({ n, label, help, error, htmlFor, children }) {
  return (
    <div className="py-7" style={{ borderTop: `1px solid ${RD.line}` }}>
      <label htmlFor={htmlFor} className="flex gap-3 text-[17px] md:text-[18px] font-semibold leading-snug" style={{ color: RD.ink }}>
        <span className="font-mono text-[13px] pt-[3px] font-bold" style={{ color: RD.orange }}>{n}.</span>
        <span>{label} <span aria-hidden style={{ color: RD.orange }}>*</span></span>
      </label>
      {help && <p className="mt-1.5 sm:pl-7 text-[14px] leading-relaxed" style={{ color: RD.muted }}>{help}</p>}
      <div className="mt-4 sm:pl-7">{children}</div>
      {error && <p className="mt-2 sm:pl-7 text-[14px] font-medium" style={{ color: RD.error }}>{error}</p>}
    </div>
  );
}

function RunDayPage() {
  const [values, setValues] = React.useState({ name: '', phone: '', email: '', training: '', question: '' });
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState('idle'); // idle | sending | done | error

  const set = (k) => (e) => {
    const v = e.target.value;
    setValues((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = 'Please enter your name.';
    if (!/^[+\d][\d\s()-]{7,}$/.test(values.phone.trim())) e.phone = 'Please enter a valid phone number.';
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) e.email = 'Please enter a valid email address.';
    if (!values.training) e.training = 'Please choose one option.';
    if (!values.question.trim()) e.question = 'Please add a question for Lauren.';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const form = ev.target;
    if (form._gotcha && form._gotcha.value) return; // honeypot tripped
    const e = validate();
    setErrors(e);
    const firstBad = ['name', 'phone', 'email', 'training', 'question'].find((k) => e[k]);
    if (firstBad) {
      const el = form.querySelector(`[name="${firstBad === 'training' ? 'training_for' : firstBad}"]`);
      if (el) { el.focus({ preventScroll: true }); el.scrollIntoView({ block: 'center' }); }
      return;
    }
    setStatus('sending');
    const body = new FormData();
    body.append('name', values.name.trim());
    body.append('phone', values.phone.trim());
    body.append('email', values.email.trim());
    body.append('training_for', values.training);
    body.append('nutrition_question', values.question.trim());
    body.append('topic', 'Social Run Day');
    body.append('_subject', `Social Run Day signup: ${values.name.trim()}`);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error();
      setStatus('done');
      window.scrollTo(0, 0);
      if (window.va) window.va('event', { name: 'run_day_signup', data: { training: values.training } });
    } catch (_) {
      setStatus('error');
    }
  };

  const inputClass = 'w-full rounded-lg px-4 h-12 text-[16px] outline-none focus:ring-2 focus:ring-[#FF6C00]/30 focus:border-[#FF6C00]';
  const inputStyle = (k) => ({ background: '#fff', color: RD.ink, border: `1.5px solid ${errors[k] ? RD.error : RD.line}` });
  const first = values.name.trim().split(/\s+/)[0];

  const detail = (k, v) => (
    <div className="flex-1 min-w-[90px] px-4 py-3 rounded-lg" style={{ background: RD.page }}>
      <div className="font-mono text-[10px] uppercase tracking-[.18em]" style={{ color: RD.muted }}>{k}</div>
      <div className="mt-1 text-[15px] font-semibold" style={{ color: RD.ink }}>{v || 'TBC'}</div>
    </div>
  );

  return (
    <section style={{ background: RD.page, color: RD.ink, minHeight: '100svh' }} className="px-3 sm:px-5 pt-20 md:pt-28 pb-12">
      <div className="mx-auto w-full rounded-2xl overflow-hidden" style={{ maxWidth: 680, background: RD.card, border: `1px solid ${RD.line}`, boxShadow: '0 1px 3px rgba(32,28,18,.06)' }}>
        {/* cover photo */}
        <div style={{ position: 'relative', paddingBottom: '42%', background: '#d9d5c7' }}>
          <picture>
            <source media="(max-width: 640px)" srcSet="assets/images/run-day/run-banner-sm.avif" type="image/avif" />
            <source media="(max-width: 640px)" srcSet="assets/images/run-day/run-banner-sm.jpg" />
            <source srcSet="assets/images/run-day/run-banner.avif" type="image/avif" />
            <img src="assets/images/run-day/run-banner.jpg" alt="Runners in UP Dietitian kit on a coastal road" fetchpriority="high" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
          </picture>
        </div>
        <div style={{ height: 5, background: RD.orange }} />

        <div className="px-5 sm:px-9 pt-7 pb-9">
          {status === 'done' ? (
            <div className="py-6 text-center">
              <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center text-[26px] font-bold" style={{ background: RD.orange, color: '#fff' }}>✓</div>
              <h1 className="mt-5 font-display leading-[1]" style={{ fontSize: 'clamp(32px, 6vw, 44px)' }}>
                You're in{first ? `, ${first}` : ''}!
              </h1>
              <p className="mt-3 mx-auto max-w-[44ch] text-[16px] leading-relaxed" style={{ color: RD.muted }}>
                Thanks for signing up for the UP Dietitian Social Run Day. Lauren has your question for the Q&amp;A, and we'll be in touch with the details.
              </p>
              <a href="https://www.instagram.com/up_dietitian/" target="_blank" rel="noopener" className="mt-7 inline-flex items-center justify-center px-6 h-12 rounded-lg text-[15px] font-semibold" style={{ background: RD.orange, color: '#fff' }}>
                Follow @up_dietitian
              </a>
            </div>
          ) : (
            <React.Fragment>
              <div className="font-mono text-[11px] uppercase tracking-[.2em] font-bold" style={{ color: RD.orange }}>Free community event · {RUN_DAY.capacity} spots</div>
              <h1 className="mt-2 font-display leading-[1]" style={{ fontSize: 'clamp(34px, 6.5vw, 52px)' }}>UP Dietitian Social Run Day</h1>
              <p className="mt-3 text-[16px] leading-relaxed" style={{ color: RD.muted }}>
                A relaxed group run for every pace along the coast at Mullaloo, then coffee at Swell with a 10–15 minute nutrition Q&amp;A from Lauren Nash, Accredited Practising Dietitian. Spots are capped at {RUN_DAY.capacity}, so fill in your details below to save yours.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {detail('When', RUN_DAY.date)}
                {detail('Meet', RUN_DAY.meet)}
                {detail('After', RUN_DAY.after)}
              </div>

              <form onSubmit={submit} noValidate className="mt-8">
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

                <RunDayQuestion n={1} label="Full name" htmlFor="rd-name" error={errors.name}>
                  <input id="rd-name" name="name" type="text" autoComplete="name" value={values.name} onChange={set('name')} placeholder="First and last name" className={inputClass} style={inputStyle('name')} />
                </RunDayQuestion>

                <RunDayQuestion n={2} label="Phone number" help="Only used for run-day updates, like a change of meeting point." htmlFor="rd-phone" error={errors.phone}>
                  <input id="rd-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} placeholder="04xx xxx xxx" className={inputClass} style={inputStyle('phone')} />
                </RunDayQuestion>

                <RunDayQuestion n={3} label="Email" htmlFor="rd-email" error={errors.email}>
                  <input id="rd-email" name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={set('email')} placeholder="you@email.com" className={inputClass} style={inputStyle('email')} />
                </RunDayQuestion>

                <RunDayQuestion n={4} label="What are you training for?" error={errors.training}>
                  <div role="radiogroup" aria-label="What are you training for?" className="flex flex-col gap-2.5 sm:max-w-[420px]">
                    {RUN_DAY_TRAINING.map((o) => {
                      const on = values.training === o.value;
                      return (
                        <label key={o.key} className="flex items-center gap-3 px-3.5 min-h-[52px] rounded-lg cursor-pointer" style={{ background: on ? 'rgba(255,108,0,.08)' : '#fff', border: `1.5px solid ${on ? RD.orange : errors.training ? RD.error : RD.line}` }}>
                          <input type="radio" name="training_for" value={o.value} checked={on} onChange={set('training')} className="sr-only" />
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-md font-mono text-[12px] font-bold flex-shrink-0" style={{ background: on ? RD.orange : '#fff', color: on ? '#fff' : RD.ink, border: `1.5px solid ${on ? RD.orange : RD.line}` }}>{o.key}</span>
                          <span className="text-[16px] font-medium">{o.value}</span>
                          {on && <span className="ml-auto font-bold" style={{ color: RD.orange }}>✓</span>}
                        </label>
                      );
                    })}
                  </div>
                </RunDayQuestion>

                <RunDayQuestion n={5} label="Your nutrition question for Lauren" help="She'll answer questions in the Q&A after the run. Race fuelling, gut issues, recovery, carb loading: ask away." htmlFor="rd-question" error={errors.question}>
                  <textarea id="rd-question" name="question" rows={4} value={values.question} onChange={set('question')} placeholder="Type your question here" className="w-full rounded-lg px-4 py-3 text-[16px] outline-none resize-y focus:ring-2 focus:ring-[#FF6C00]/30 focus:border-[#FF6C00]" style={inputStyle('question')} />
                </RunDayQuestion>

                <div className="pt-7" style={{ borderTop: `1px solid ${RD.line}` }}>
                  {status === 'error' && (
                    <p role="alert" className="mb-4 px-4 py-3 rounded-lg text-[14px]" style={{ background: 'rgba(184,58,0,.08)', color: RD.error }}>
                      Something went wrong sending your signup. Please try again, or email hello@updietitian.com.
                    </p>
                  )}
                  <button type="submit" disabled={status === 'sending'} className="w-full sm:w-auto inline-flex items-center justify-center px-10 h-[52px] rounded-lg text-[16px] font-bold disabled:opacity-60" style={{ background: RD.orange, color: '#fff' }}>
                    {status === 'sending' ? 'Submitting…' : 'Submit'}
                  </button>
                  <p className="mt-4 text-[13px] leading-relaxed" style={{ color: RD.muted }}>
                    Your details are only used for this event. See our <Link href="/privacy" className="underline">privacy policy</Link>.
                  </p>
                </div>
              </form>
            </React.Fragment>
          )}
        </div>
      </div>
      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[.2em]" style={{ color: RD.muted }}>UP Dietitian · Perth WA</p>
    </section>
  );
}

Object.assign(window, { RunDayPage });
