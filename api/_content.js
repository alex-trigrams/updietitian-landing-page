const fs = require('fs');
const path = require('path');
// The client's Sanity project. Shared with the editor (studio/), so the site
// and /admin can never point at different projects.
const cms = require('../studio/client.config.json');

// Reusable across client projects: the site's copy and photos as one object,
// keyed by section (content.hero.headline, content.about.photo, ...).
//
// Each section is a document the client edits and publishes at /admin. The
// seed content.json in the repo supplies anything they haven't filled in, and
// the whole site if Sanity can't be reached, so a CMS outage shows last
// shipped copy rather than a broken page.
// Shared by /api/get-content and the server-rendered pages (api/render.js), so
// both always read the same copy.

function readSeed() {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content.json'), 'utf8'));
  } catch (err) {
    return {};
  }
}

// A Sanity image becomes { src, thumb, pos, alt }. The asset reference carries
// the file name and pixel size, so no second lookup is needed. `pos` is the
// focal point the client picked, as a CSS object-position, and is only set
// when they picked one, so each component keeps its own default framing.
function imageFrom(value) {
  const m = /^image-([a-zA-Z0-9]+)-(\d+)x(\d+)-([a-z0-9]+)$/.exec((value.asset && value.asset._ref) || '');
  if (!m) return null;
  const [, id, w, h, ext] = m;
  const crop = value.crop || { top: 0, bottom: 0, left: 0, right: 0 };
  const keptW = Math.max(0.01, 1 - crop.left - crop.right);
  const keptH = Math.max(0.01, 1 - crop.top - crop.bottom);
  const params = [];
  if (keptW < 1 || keptH < 1) {
    params.push(`rect=${[crop.left * w, crop.top * h, keptW * w, keptH * h].map(Math.round).join(',')}`);
  }
  const base = `https://cdn.sanity.io/images/${cms.projectId}/${cms.dataset}/${id}-${w}x${h}.${ext}`;
  // auto=format serves AVIF/WebP where the browser takes it; fit=max never upscales.
  const url = (width) => `${base}?${[...params, `w=${width}`, 'fit=max', 'auto=format'].join('&')}`;
  const out = { src: url(1600), thumb: url(800), alt: value.alt || '' };
  if (value.hotspot) {
    const pct = (v, start, kept) => Math.round(Math.min(1, Math.max(0, (v - start) / kept)) * 100);
    out.pos = `${pct(value.hotspot.x, crop.left, keptW)}% ${pct(value.hotspot.y, crop.top, keptH)}%`;
  }
  return out;
}

// Sanity's bookkeeping (_key, _type, _rev...) is dropped so components see the
// same plain shape content.json has.
function plain(value) {
  if (Array.isArray(value)) return value.map(plain).filter((v) => v != null);
  if (!value || typeof value !== 'object') return value;
  if (value.asset && value.asset._ref) return imageFrom(value);
  // A photo field that was opened but never given a file.
  if (value._type === 'photo' || value._type === 'image') return null;
  const out = {};
  Object.keys(value).forEach((k) => {
    if (k[0] === '_') return;
    const v = plain(value[k]);
    if (v != null) out[k] = v;
  });
  return out;
}

async function fetchSections() {
  if (!cms.projectId) return null;
  // Published documents only: without a token Sanity never returns drafts, so
  // work in progress stays private until the client presses Publish.
  const query = '*[!(_type match "sanity.*") && !(_type match "system.*")]';
  const url = `https://${cms.projectId}.apicdn.sanity.io/v2025-02-19/data/query/${cms.dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
  if (!res.ok) throw new Error(`Sanity responded ${res.status}`);
  const { result } = await res.json();
  const sections = {};
  (result || []).forEach((doc) => { sections[doc._id] = plain(doc); });
  return sections;
}

async function loadContent() {
  const seed = readSeed();
  let sections = null;
  try {
    sections = await fetchSections();
  } catch (err) {
    console.error('[content] Sanity read failed, serving seed content:', err.message);
  }
  if (!sections) return seed;

  const out = {};
  new Set([...Object.keys(seed), ...Object.keys(sections)]).forEach((name) => {
    out[name] = sections[name] ? { ...seed[name], ...sections[name] } : seed[name];
  });
  return out;
}

module.exports = { loadContent, plain };
