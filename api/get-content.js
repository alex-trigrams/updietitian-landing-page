const fs = require('fs');
const path = require('path');
const { list } = require('@vercel/blob');

const BLOB_PATHNAME = 'content.json';

// Reusable across client projects: reads the live content blob if one has
// been saved, otherwise falls back to the seed content.json shipped in the
// repo (used until the first save from /admin, or if Blob isn't configured).
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  try {
    const { BLOB_READ_WRITE_TOKEN } = process.env;
    if (BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list({ prefix: BLOB_PATHNAME, token: BLOB_READ_WRITE_TOKEN, limit: 1 });
      const match = blobs.find((b) => b.pathname === BLOB_PATHNAME);
      if (match) {
        const blobRes = await fetch(match.url, { cache: 'no-store' });
        if (blobRes.ok) {
          const json = await blobRes.json();
          res.status(200).json(json);
          return;
        }
      }
    }
  } catch (err) {
    // Fall through to the seed file below — a Blob read error shouldn't take
    // the live site down, it should just serve last-known-good content.
  }

  try {
    const seedPath = path.join(process.cwd(), 'content.json');
    const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    res.status(200).json(seed);
  } catch (err) {
    res.status(200).json({});
  }
};
