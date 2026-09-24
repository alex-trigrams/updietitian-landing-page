const fs = require('fs');
const path = require('path');
const vm = require('vm');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { transformSync } = require('esbuild');
const { loadContent } = require('./_content');
const { headTags, jsonForScript } = require('./_seo');

// Server-renders every page (vercel.json rewrites page routes here).
//
// The site is React compiled in the browser, so the HTML it shipped was an
// empty <div id="root">: Google had to run the JavaScript to see any copy, and
// AI crawlers (ChatGPT, Claude, Perplexity), which don't run JavaScript, saw a
// blank page. This runs the same component files the browser loads, in the
// same order, against the same live content, and sends the finished markup plus
// per-page titles, canonical/social tags and structured data. The browser then
// renders over it exactly as before, so nothing about the site's behaviour
// changes. Any server-side failure falls back to the old client-only page.

const ROOT = process.cwd();

// Scripts that only attach browser behaviour and render nothing.
const SKIP = new Set(['src/analytics.jsx']);

let compiled;
function compile() {
  if (compiled) return compiled;
  const template = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  // The script list in index.html is the single source of truth for load order.
  const sources = [...template.matchAll(/<script type="text\/babel" src="([^"]+)"><\/script>/g)]
    .map((m) => m[1])
    .filter((src) => !SKIP.has(src));
  const scripts = sources.map((src) => {
    const { code } = transformSync(fs.readFileSync(path.join(ROOT, src), 'utf8'), { loader: 'jsx' });
    return new vm.Script(code, { filename: src });
  });
  compiled = { template, scripts };
  return compiled;
}

// Just enough of a browser for the components to load and render once.
// Effects never run on the server, so most of this is inert.
function browserGlobals(pathname, content) {
  const noop = () => {};
  const node = () => ({ style: {}, dataset: {}, setAttribute: noop, appendChild: noop, addEventListener: noop, removeEventListener: noop });
  const Observer = class { observe() {} unobserve() {} disconnect() {} };
  const g = {
    React,
    // app.jsx mounts itself with createRoot; here App is rendered directly.
    ReactDOM: { createRoot: () => ({ render: noop }) },
    document: {
      getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
      createElement: node, body: node(), head: node(), documentElement: node(),
      readyState: 'complete', addEventListener: noop, removeEventListener: noop,
    },
    location: { pathname, hash: '', search: '' },
    history: { pushState: noop },
    navigator: { userAgent: '' },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop }),
    addEventListener: noop, removeEventListener: noop, dispatchEvent: noop, postMessage: noop, scrollTo: noop,
    requestAnimationFrame: () => 0, cancelAnimationFrame: noop,
    setTimeout, clearTimeout, setInterval, clearInterval,
    IntersectionObserver: Observer, ResizeObserver: Observer, MutationObserver: Observer,
    Event: class { constructor(type) { this.type = type; } },
    CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init && init.detail; } },
    innerWidth: 1280, innerHeight: 800, scrollY: 0,
    console,
    SITE_CONTENT: content,
  };
  g.window = g.self = g.parent = g;
  // Same dot-path lookup index.html defines for the browser.
  g.C = (p, fallback) => {
    let n = content;
    for (const k of p.split('.')) { if (n == null) return fallback; n = n[k]; }
    return n == null ? fallback : n;
  };
  return g;
}

module.exports = async (req, res) => {
  const pathname = '/' + String(req.query.path || '').replace(/^\/+/, '');

  // One URL per page: /about/ → /about.
  if (pathname.length > 1 && pathname.endsWith('/')) {
    res.setHeader('Location', pathname.replace(/\/+$/, ''));
    res.status(308).end();
    return;
  }

  const { template, scripts } = compile();
  const content = await loadContent();

  let markup = '';
  let meta = null;
  let notFound = false;
  try {
    const ctx = vm.createContext(browserGlobals(pathname, content));
    for (const s of scripts) s.runInContext(ctx);
    const routes = vm.runInContext('ROUTES', ctx);
    notFound = !routes.includes(pathname);
    meta = vm.runInContext('ROUTE_META', ctx)[pathname] || vm.runInContext('NOT_FOUND_META', ctx);
    markup = renderToString(React.createElement(ctx.App));
  } catch (err) {
    console.error(`[render] ${pathname}:`, err);
  }

  let html = template
    .replace('<!--SITE_CONTENT-->', `<script>window.SITE_CONTENT = ${jsonForScript(content)};</script>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  if (meta) html = html.replace(/<title>[\s\S]*?<\/title>/, headTags(pathname, meta, content, { notFound }));

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  // Content is read live from Lauren's Blob on every request, so /admin edits
  // show immediately, as they did before this was server-rendered.
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.status(notFound ? 404 : 200).send(html);
};
