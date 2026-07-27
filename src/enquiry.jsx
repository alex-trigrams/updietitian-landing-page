// Enquiry — shared form + modal. Triggered from the nav "Contact" button,
// Seminars "enquire" buttons, and rendered inline on the /contact page.
//
// Submits to Formspree via fetch so the user stays on the page (inline success
// / error), rather than a full-page redirect. A hidden honeypot field catches
// most spam bots. openEnquiry(topic) pops the modal from anywhere.

// Formspree form sending to lauren@updietitian.com. If this is ever reset to a
// REPLACE_ME placeholder, the form disables submission with a friendly note.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqvklkr';
const FORMSPREE_READY = !/REPLACE_ME/.test(FORMSPREE_ENDPOINT);

function EnquiryForm({ topic, onDone, dark }) {
  const [status, setStatus] = React.useState('idle'); // idle | sending | ok | error
  const [error, setError] = React.useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!FORMSPREE_READY) return;
    const form = e.target;
    const data = new FormData(form);
    if (data.get('_gotcha')) return; // honeypot tripped — silently drop
    setStatus('sending');
    setError('');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('ok');
        form.reset();
        if (window.va) window.va('event', { name: 'enquiry_submit', data: { topic: topic || 'General' } });
      } else {
        const body = await res.json().catch(() => ({}));
        setError((body.errors && body.errors.map(x => x.message).join(', ')) || 'Something went wrong. Please email lauren@updietitian.com.');
        setStatus('error');
      }
    } catch (_) {
      setError('Network error. Please try again, or email lauren@updietitian.com.');
      setStatus('error');
    }
  };

  const labelCol = dark ? 'rgba(234,230,215,.55)' : 'rgba(32,28,18,.55)';
  const fieldStyle = {
    background: dark ? 'rgba(234,230,215,.06)' : '#F5F2E8',
    border: `1px solid ${dark ? 'rgba(234,230,215,.15)' : 'rgba(32,28,18,.14)'}`,
    color: dark ? '#EAE6D7' : '#201C12',
  };

  if (status === 'ok') {
    return (
      <div className="flex flex-col items-start gap-4 py-4">
        <div className="font-display leading-[.9]" style={{ fontSize: 'clamp(30px, 4vw, 48px)', color: '#FF6C00' }}>
          <span className="skew-italic">Thanks — sent.</span>
        </div>
        <p className="text-[15px] leading-relaxed" style={{ color: dark ? 'rgba(234,230,215,.8)' : 'rgba(32,28,18,.8)' }}>
          Lauren will be in touch soon. Prefer to book straight in? Grab a free 15-minute call.
        </p>
        <a href={CALENDLY_URL} className="btn-shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold" style={{ background: '#FF6C00', color: '#EAE6D7' }} data-blob-hover>
          Book a call →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      {/* honeypot — hidden from humans, tempting to bots */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
      <input type="hidden" name="topic" value={topic || 'General'} />
      <input type="hidden" name="_subject" value={`Website enquiry — ${topic || 'General'}`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[.2em]" style={{ color: labelCol }}>Name</span>
          <input name="name" type="text" required placeholder="Your name" className="w-full px-4 py-3 rounded-xl text-[14px] outline-none focus:border-orange" style={fieldStyle} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[.2em]" style={{ color: labelCol }}>Email</span>
          <input name="email" type="email" required placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl text-[14px] outline-none focus:border-orange" style={fieldStyle} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[.2em]" style={{ color: labelCol }}>Message</span>
        <textarea name="message" required rows={4} placeholder={topic === 'Seminar' ? 'Tell Lauren about your group — organisation, type, rough size, format and timing…' : 'Tell Lauren a little about your goals, your sport, and how she can help…'} className="w-full px-4 py-3 rounded-xl text-[14px] outline-none resize-none focus:border-orange" style={fieldStyle} />
      </label>

      {status === 'error' && (
        <p className="text-[13px] leading-relaxed" style={{ color: '#FF6C00' }}>{error}</p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={!FORMSPREE_READY || status === 'sending'}
          className="btn-shine inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold disabled:opacity-50"
          style={{ background: '#FF6C00', color: '#EAE6D7' }}
          data-blob-hover
        >
          {status === 'sending' ? 'Sending…' : 'Send enquiry'} <span style={{ fontFamily: 'Anton' }}>→</span>
        </button>
        {!FORMSPREE_READY && (
          <span className="font-mono text-[10px] uppercase tracking-[.14em]" style={{ color: labelCol }}>Form setup pending</span>
        )}
      </div>
    </form>
  );
}

function EnquiryModal() {
  const [open, setOpen] = React.useState(false);
  const [topic, setTopic] = React.useState('General');
  const triggerRef = React.useRef(null);

  React.useEffect(() => {
    const onOpen = (e) => {
      triggerRef.current = document.activeElement;
      setTopic((e.detail && e.detail.topic) || 'General');
      setOpen(true);
    };
    window.addEventListener('open-enquiry', onOpen);
    return () => window.removeEventListener('open-enquiry', onOpen);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
    if (triggerRef.current && triggerRef.current.focus) triggerRef.current.focus();
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enquiry form"
      onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 80, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '5vh 16px', background: 'rgba(20,17,10,.6)', backdropFilter: 'blur(6px)', overflowY: 'auto' }}
    >
      <div
        className="relative w-full rounded-3xl noise"
        style={{ maxWidth: 640, background: '#EAE6D7', color: '#201C12', boxShadow: '0 30px 80px rgba(0,0,0,.4)', padding: 'clamp(24px, 4vw, 40px)' }}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors"
          style={{ background: 'rgba(32,28,18,.08)', color: '#201C12' }}
          data-blob-hover
        >✕</button>

        <div className="font-mono text-[11px] uppercase tracking-[.22em]" style={{ color: '#FF6C00' }}>
          {topic === 'Seminar' ? 'Seminar enquiry' : "Let's talk"}
        </div>
        <h2 className="mt-3 mb-6 font-display leading-[.9]" style={{ fontSize: 'clamp(34px, 5vw, 56px)' }}>
          <span className="skew-italic">{topic === 'Seminar' ? 'Book a ' : 'Get in '}</span>
          <span className="skew-italic" style={{ color: '#FF6C00' }}>{topic === 'Seminar' ? 'seminar.' : 'touch.'}</span>
        </h2>

        <EnquiryForm topic={topic} onDone={close} />
      </div>
    </div>
  );
}

function openEnquiry(topic) {
  window.dispatchEvent(new CustomEvent('open-enquiry', { detail: { topic: topic || 'General' } }));
  if (window.va) window.va('event', { name: 'enquiry_open', data: { topic: topic || 'General' } });
}

Object.assign(window, { EnquiryForm, EnquiryModal, openEnquiry });
