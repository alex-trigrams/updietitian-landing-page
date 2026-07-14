const { put } = require('@vercel/blob');
const { isAuthed } = require('./_auth');

// Stable pathname (no random suffix) so every deploy/save resolves to the
// same predictable blob — api/get-content.js relies on this exact path.
const BLOB_PATHNAME = 'content.json';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { SESSION_SECRET, BLOB_STORE_ID, BLOB_READ_WRITE_TOKEN } = process.env;
  if (!SESSION_SECRET || !(BLOB_STORE_ID || BLOB_READ_WRITE_TOKEN)) {
    res.status(500).json({
      error: 'Server is not configured (missing Blob env vars)',
      debug: {
        hasSessionSecret: !!SESSION_SECRET,
        hasBlobStoreId: !!BLOB_STORE_ID,
        hasBlobToken: !!BLOB_READ_WRITE_TOKEN,
      },
    });
    return;
  }

  if (!isAuthed(req, SESSION_SECRET)) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || typeof body !== 'object') {
    res.status(400).json({ error: 'Invalid content payload' });
    return;
  }

  try {
    const blob = await put(BLOB_PATHNAME, JSON.stringify(body, null, 2) + '\n', {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    res.status(200).json({ ok: true, url: blob.url });
  } catch (err) {
    res.status(500).json({ error: `Unexpected error: ${err.message}` });
  }
};
