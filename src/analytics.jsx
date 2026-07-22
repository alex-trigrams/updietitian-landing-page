// Analytics — custom events for Vercel Web Analytics.
//
// The site is a single path ("/"), so plain pageviews only ever produce one row.
// These events are what make the dashboard useful: how far down the page people
// get, which sections they actually reach, and which CTAs they click.
//
// Everything here is delegated or observer-based — no component needs to know
// about tracking, so adding a section or a button picks it up automatically.

(function () {
  // Queue stub: if the Vercel script hasn't finished loading yet, calls land in
  // window.vaq and get drained once it does. Matches @vercel/analytics' own stub.
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

  const track = (name, data) => window.va('event', data ? { name, data } : { name });

  // ---- section views -------------------------------------------------------
  // Fires once per section per page load, when a third of it is on screen.

  const SECTION_LABELS = {
    top: 'hero',
    about: 'about',
    services: 'services',
    seminars: 'seminars',
    process: 'process',
    clinic: 'clinic',
    resources: 'resources',
    merch: 'merch',
    contact: 'contact',
    enquire: 'enquire'
  };

  function watchSections() {
    // The footer carries id="contact" and is a <footer>, not a <section>.
    const sections = document.querySelectorAll('#root section[id], #root footer[id]');
    if (!sections.length) return false;

    const seen = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || seen.has(e.target.id)) return;
        seen.add(e.target.id);
        track('section_view', { section: SECTION_LABELS[e.target.id] || e.target.id });
      });
    }, { threshold: 0.33 });

    sections.forEach((s) => io.observe(s));
    return true;
  }

  // ---- scroll depth --------------------------------------------------------

  function watchScrollDepth() {
    const milestones = [25, 50, 75, 90];
    let hit = 0;
    let raf = 0;

    const check = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = ((window.scrollY || 0) / scrollable) * 100;

      while (hit < milestones.length && pct >= milestones[hit]) {
        track('scroll_depth', { depth: milestones[hit] });
        hit++;
      }
      if (hit >= milestones.length) window.removeEventListener('scroll', onScroll);
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener('scroll', onScroll, { passive: true });
    check();
  }

  // ---- clicks --------------------------------------------------------------
  // One delegated listener classifies every link on the page by destination.

  function classify(href, el) {
    if (!href) return null;
    if (href.startsWith('#')) return { name: 'nav_click', data: { target: href.slice(1) || 'top' } };
    if (href.startsWith('mailto:')) {
      // Seminars uses a prefilled mailto, so separate it from the plain footer address.
      const seminar = href.includes('subject=') && /seminar/i.test(decodeURIComponent(href));
      return { name: 'email_click', data: { source: seminar ? 'seminars' : 'footer' } };
    }
    if (href.startsWith('tel:')) return { name: 'phone_click' };
    if (href.includes('calendly.com')) {
      return { name: 'book_call_click', data: { source: section(el) } };
    }
    if (href.includes('cliniko.com')) return { name: 'book_clinic_click', data: { source: section(el) } };
    if (href.includes('instagram.com')) return { name: 'instagram_click' };

    try {
      if (new URL(href, location.href).host !== location.host) {
        return { name: 'outbound_click', data: { host: new URL(href, location.href).host } };
      }
    } catch (_) { /* malformed href — ignore */ }
    return null;
  }

  // Which section a clicked element sits in, so the same CTA in the nav, the
  // services grid and the footer can be told apart.
  function section(el) {
    const host = el.closest('section[id]');
    if (host) return SECTION_LABELS[host.id] || host.id;
    if (el.closest('header, nav')) return 'nav';
    if (el.closest('footer')) return 'footer';
    return 'sticky-cta';
  }

  function watchClicks() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const event = classify(a.getAttribute('href'), a);
      if (event) track(event.name, event.data);
    }, { capture: true });
  }

  // ---- boot ----------------------------------------------------------------
  // React renders into #root after this script parses, so wait for the sections
  // to actually exist before wiring the observers up.

  function boot() {
    watchClicks();
    watchScrollDepth();

    if (watchSections()) return;
    const mo = new MutationObserver(() => { if (watchSections()) mo.disconnect(); });
    mo.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
