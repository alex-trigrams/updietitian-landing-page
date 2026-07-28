// Router — tiny History-API client-side router for the no-build app.
//
// Every route serves index.html (see vercel.json rewrite), and this switches
// which page renders. Keeps the single fast-loading React app while giving each
// page a real URL (/about, /services, …) so Vercel Analytics records real
// per-page pageviews. Links stay real <a> tags so right-click / SEO / new-tab
// all keep working; only plain left-clicks are intercepted.

const ROUTES = ['/', '/about', '/services', '/seminars', '/clinic', '/contact', '/privacy', '/cookies', '/terms'];

// Per-route <title> + meta description, applied on navigation. Client-rendered,
// so this is best-effort SEO — enough for browser tabs, history and sharing.
const ROUTE_META = {
  '/':         { title: 'UP Dietitian · Lauren Nash, APD · Sports Dietitian, Perth', desc: 'Performance nutrition made practical. Sports dietitian Lauren Nash (APD) supports everyday to elite athletes, in Perth and online.' },
  '/about':    { title: 'About Lauren Nash · UP Dietitian', desc: 'Meet Lauren Nash — Accredited Practising Dietitian, endurance athlete and founder of UP Dietitian.' },
  '/services': { title: 'Services · UP Dietitian', desc: 'Performance nutrition plans, race fuelling packages, consultations and ongoing coaching for athletes.' },
  '/seminars': { title: 'Seminars & Talks · UP Dietitian', desc: 'Sports nutrition seminars for corporate teams, clubs and community groups.' },
  '/clinic':   { title: 'In-Person Clinic · UP Dietitian', desc: 'Face-to-face nutrition consultations at Front Runner Sports, Osborne Park WA.' },
  '/contact':  { title: 'Contact · UP Dietitian', desc: 'Get in touch with UP Dietitian — Perth WA and online, Australia-wide and internationally.' },
  '/privacy':  { title: 'Privacy Policy · UP Dietitian', desc: 'How UP Dietitian collects, uses and protects your personal information.' },
  '/cookies':  { title: 'Cookie Policy · UP Dietitian', desc: 'How UP Dietitian uses cookies and analytics.' },
  '/terms':    { title: 'Payment & Cancellation Policy · UP Dietitian', desc: 'Consultation fees, payment terms and cancellation policy for UP Dietitian appointments.' },
};

function applyRouteMeta(path) {
  const meta = ROUTE_META[path] || { title: 'Page not found · UP Dietitian', desc: '' };
  document.title = meta.title;
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', 'description');
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', meta.desc);
}

// Navigate without a full page reload. Fires a `pushstate` event so hooks and
// the analytics module can react (popstate only fires on back/forward).
function navigate(path) {
  if (path === window.location.pathname) return;
  window.history.pushState({}, '', path);
  window.scrollTo(0, 0);
  window.dispatchEvent(new Event('pushstate'));
}

// Current pathname, kept in sync with back/forward and navigate().
function useRoute() {
  const [path, setPath] = React.useState(window.location.pathname);
  React.useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener('popstate', sync);
    window.addEventListener('pushstate', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('pushstate', sync);
    };
  }, []);
  React.useEffect(() => { applyRouteMeta(path); }, [path]);
  return path;
}

// Drop-in <a> that routes internally. External/hash/download links pass through.
function Link({ href, children, onClick, ...rest }) {
  const handle = (e) => {
    if (onClick) onClick(e);
    const internal = href && href.startsWith('/') && !href.startsWith('//');
    // Let the browser handle modified clicks (new tab), non-left clicks, etc.
    if (!internal || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href);
  };
  return <a href={href} onClick={handle} {...rest}>{children}</a>;
}

Object.assign(window, { ROUTES, navigate, useRoute, Link, applyRouteMeta });
