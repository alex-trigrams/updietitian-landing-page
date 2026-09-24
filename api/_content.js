const fs = require('fs');
const path = require('path');
const { list } = require('@vercel/blob');
const { mergeContent } = require('./_merge');

const BLOB_PATHNAME = 'content.json';

function readSeed() {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content.json'), 'utf8'));
  } catch (err) {
    return null;
  }
}

// Reusable across client projects: merges the live content blob over the seed
// content.json shipped in the repo. The seed supplies structure and anything
// added since the last /admin save; the blob supplies Lauren's edits. Falls
// back to the bare seed if no blob has been saved or Blob isn't configured.
// Shared by /api/get-content and the server-rendered pages (api/render.js), so
// both always read the same copy.
async function loadContent() {
  try {
    const { BLOB_STORE_ID, BLOB_READ_WRITE_TOKEN } = process.env;
    if (BLOB_STORE_ID || BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
      const match = blobs.find((b) => b.pathname === BLOB_PATHNAME);
      if (match) {
        const blobRes = await fetch(match.url, { cache: 'no-store' });
        if (blobRes.ok) {
          const json = await blobRes.json();
          const seed = readSeed();
          return seed ? mergeContent(seed, json) : json;
        }
      }
    }
  } catch (err) {
    // Fall through to the seed file below — a Blob read error shouldn't take
    // the live site down, it should just serve last-known-good content.
  }
  return readSeed() || {};
}

module.exports = { loadContent };
