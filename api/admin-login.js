const bcrypt = require('bcryptjs');
const { makeSessionCookie } = require('./_auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { ADMIN_USER, ADMIN_PASS_HASH, SESSION_SECRET } = process.env;
  if (!ADMIN_USER || !ADMIN_PASS_HASH || !SESSION_SECRET) {
    res.status(500).json({ error: 'Server is not configured (missing env vars)' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const { username, password } = body || {};

  if (!username || !password) {
    res.status(400).json({ error: 'Missing username or password' });
    return;
  }

  const userOk = username === ADMIN_USER;
  const passOk = userOk && (await bcrypt.compare(password, ADMIN_PASS_HASH));

  if (!userOk || !passOk) {
    res.status(401).json({ error: 'Invalid username or password' });
    return;
  }

  res.setHeader('Set-Cookie', makeSessionCookie(SESSION_SECRET));
  res.status(200).json({ ok: true });
};
