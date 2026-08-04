// Reconciles the seed content.json shipped in the repo with the live Blob that
// /admin writes. The rule is: Lauren's edits win field-by-field, but content
// added to the repo still appears without her having to re-enter it.
//
// Before this existed the Blob replaced the seed wholesale, so adding a
// testimonial in code was invisible on the live site the moment she had saved
// once — the only way in was to hand-edit the Blob.
//
//   objects            → merged key by key, recursively
//   arrays of objects  → matched on `id`; Blob fields win, seed-only items are
//                        appended in seed order, admin-only items are kept
//   arrays of anything → Blob wins wholesale (tag and bullet lists are edited
//                        as a single field, so a partial merge would be wrong)
//
// Items the Blob lists in a root-level `_deleted` array are dropped, so
// removing something in /admin doesn't come straight back from the seed.

// Paths the repo owns outright: the seed wins and any Blob copy is ignored.
// Testimonials live here because they arrive with a photo that only exists in
// the repo, so the two halves have to be added together in a deploy. Their
// editor is removed from /admin to match — see admin/index.html.
const CODE_OWNED = ['about.testimonials'];

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

// Every title a card has gone by in the Blob, oldest first, for the cards
// Lauren rewrote in /admin before ids existed. Her rewrite doesn't resemble
// the title it replaced, so nothing can match them automatically and the Blob
// ends up holding both — the old copy and the new one — with no way to tell
// which is current. Listing them in order says which: the last one wins, the
// rest are dropped. Safe to delete once the Blob has been saved with ids.
const TITLE_HISTORY = {
  'initial-consult-performance': ['initial consult + performance plan', "'set yourself up' performance plan"],
  'level-up-race': ['level up race fuelling pack', "'level up' performance plan"],
};

function titleKey(item) {
  if (!isPlainObject(item) || item.id || !item.title) return null;
  return String(item.title).trim().toLowerCase();
}

// The Blob items that are all versions of one seed card, newest last.
function titleHistoryMatches(seedItem, blob, claimed) {
  const history = seedItem.id && TITLE_HISTORY[seedItem.id];
  if (!history) return [];
  return blob
    .map((b, i) => ({ i, at: history.indexOf(titleKey(b)) }))
    .filter((m) => m.at !== -1 && !claimed.has(m.i))
    .sort((a, b) => a.at - b.at)
    .map((m) => m.i);
}

// Legacy Blob items predate ids. Fall back to the first word of whatever field
// identifies the item to a human, which is how these lists are keyed elsewhere
// (testimonial photos match on first name for the same reason).
function naturalKey(item) {
  if (!isPlainObject(item)) return null;
  const label = item.name || item.title || item.eyebrow;
  if (!label) return null;
  return String(label).trim().split(/\s+/)[0].toLowerCase();
}

function mergeArrays(seed, blob, deleted, path) {
  const objectList = seed.every(isPlainObject) && blob.every(isPlainObject);
  if (!objectList) return blob;

  const claimed = new Set();
  const findBlobItem = (seedItem, seedIndex) => {
    const byId = blob.findIndex((b, i) => !claimed.has(i) && b.id && b.id === seedItem.id);
    if (byId !== -1) return byId;
    const key = naturalKey(seedItem);
    if (key) {
      const byKey = blob.findIndex((b, i) => !claimed.has(i) && !b.id && naturalKey(b) === key);
      if (byKey !== -1) return byKey;
    }
    // Last resort for pre-id blob items with nothing human-readable to match
    // on: same slot, same item. Only ever matches an item the blob hasn't
    // labelled with an id, so it can't steal one that belongs elsewhere.
    const atIndex = blob[seedIndex];
    if (atIndex && !atIndex.id && !claimed.has(seedIndex) && !naturalKey(atIndex)) return seedIndex;
    return -1;
  };

  const out = [];
  seed.forEach((seedItem, seedIndex) => {
    // Older versions of the same card are claimed so they can't come through
    // as extras; the newest is the one that gets merged.
    const versions = titleHistoryMatches(seedItem, blob, claimed);
    versions.forEach((v) => claimed.add(v));
    const newest = versions.length ? versions[versions.length - 1] : -1;
    if (newest !== -1) {
      // Any copy still carrying the card's id holds the wording she replaced.
      const superseded = findBlobItem(seedItem, seedIndex);
      if (superseded !== -1) claimed.add(superseded);
    }

    const i = newest !== -1 ? newest : findBlobItem(seedItem, seedIndex);
    if (i !== -1) claimed.add(i);
    const merged = i === -1 ? seedItem : mergeValue(seedItem, blob[i], deleted, path + '[]');
    // Seed items carry the canonical id even when the Blob copy predates it.
    if (seedItem.id) merged.id = seedItem.id;
    if (!merged.id || !deleted.has(merged.id)) out.push(merged);
  });

  // Anything Lauren added in /admin that has no seed counterpart.
  blob.forEach((item, i) => {
    if (claimed.has(i)) return;
    if (item.id && deleted.has(item.id)) return;
    out.push(item);
  });

  return out;
}

function mergeValue(seed, blob, deleted, path) {
  if (blob === undefined) return seed;
  if (CODE_OWNED.includes(path)) return seed;
  if (Array.isArray(seed) && Array.isArray(blob)) return mergeArrays(seed, blob, deleted, path);
  if (!isPlainObject(seed) || !isPlainObject(blob)) return blob;

  const out = {};
  Object.keys(seed).forEach((k) => {
    out[k] = mergeValue(seed[k], blob[k], deleted, path ? path + '.' + k : k);
  });
  Object.keys(blob).forEach((k) => { if (!(k in out)) out[k] = blob[k]; });
  return out;
}

function mergeContent(seed, blob) {
  if (!isPlainObject(blob)) return seed;
  if (!isPlainObject(seed)) return blob;
  const deleted = new Set(Array.isArray(blob._deleted) ? blob._deleted : []);
  const out = mergeValue(seed, blob, deleted, '');
  // Carried through rather than stripped: /admin edits the merged content and
  // saves it straight back, so dropping the list here would resurrect every
  // deleted item on the save after next. Nothing renders it.
  if (deleted.size) out._deleted = Array.from(deleted);
  else delete out._deleted;
  return out;
}

module.exports = { mergeContent };
