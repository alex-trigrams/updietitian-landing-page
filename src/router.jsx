// Router — tiny History-API client-side router for the no-build app.
//
// Every route serves index.html (see vercel.json rewrite), and this switches
// which page renders. Keeps the single fast-loading React app while giving each
// page a real URL (/about, /services, …) so Vercel Analytics records real
// per-page pageviews. Links stay real <a> tags so right-click / SEO / new-tab
// all keep working; only plain left-clicks are intercepted.

const ROUTES = ['/', '/about', '/services', '/seminars', '/clinic', '/perth-dietitian', '/contact', '/privacy', '/cookies', '/terms'];

// Per-route <title> + meta description. api/render.js writes these into the
// server-rendered HTML (with canonical, social and structured-data tags, see
// api/_seo.js); applyRouteMeta keeps them current on in-app navigation.
// Titles lead with what people search ("sports dietitian Perth"), and each page
// targets its own search so pages don't compete with each other. Descriptions
// stay under ~160 characters so Google shows them whole.
const ROUTE_META = {
  '/':         { title: 'Sports Dietitian Perth · Lauren Nash APD · UP Dietitian', desc: 'Perth sports dietitian Lauren Nash (APD) helps everyday to elite athletes fuel for training, racing and recovery. In person in Osborne Park, or online.' },
  '/about':    { title: 'About Lauren Nash, Sports Dietitian (APD) · UP Dietitian', desc: 'Meet Lauren Nash, Accredited Practising Dietitian, Ironman finisher and founder of UP Dietitian, a Perth sports nutrition practice.' },
  '/services': { title: 'Sports Nutrition Plans & Consultations · UP Dietitian Perth', desc: 'Nutrition plans, race fuelling, consultations and ongoing coaching with a Perth sports dietitian. In person or online, with private health rebates.' },
  '/seminars': { title: 'Sports Nutrition Seminars & Workshops, Perth · UP Dietitian', desc: 'Practical nutrition seminars for workplaces, sporting clubs, schools and community groups in Perth and online, from an Accredited Practising Dietitian.' },
  '/clinic':   { title: 'Dietitian in Osborne Park, Perth · In-Person Consults · UP Dietitian', desc: 'Face-to-face dietitian consultations at Front Runner Physiotherapy, 2/16 Baden Street, Osborne Park WA. Health fund rebates available.' },
  '/perth-dietitian': { title: 'Dietitian Perth · Nutrition for Active People · UP Dietitian', desc: 'Looking for a dietitian in Perth? Lauren Nash (APD) helps active people with fuelling, gut issues, body composition, injury recovery and coeliac disease.' },
  '/contact':  { title: 'Contact · UP Dietitian, Sports Dietitian Perth', desc: 'Get in touch with UP Dietitian: in person in Osborne Park, Perth WA, or online Australia-wide and internationally.' },
  '/privacy':  { title: 'Privacy Policy · UP Dietitian', desc: 'How UP Dietitian collects, uses and protects your personal information.' },
  '/cookies':  { title: 'Cookie Policy · UP Dietitian', desc: 'How UP Dietitian uses cookies and analytics.' },
  '/terms':    { title: 'Payment & Cancellation Policy · UP Dietitian', desc: 'Consultation fees, payment terms and cancellation policy for UP Dietitian appointments.' },
};
const NOT_FOUND_META = { title: 'Page not found · UP Dietitian', desc: '' };

function applyRouteMeta(path) {
  const meta = ROUTE_META[path] || NOT_FOUND_META;
  document.title = meta.title;
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', 'description');
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', meta.desc);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', 'https://www.updietitian.com' + path);
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
