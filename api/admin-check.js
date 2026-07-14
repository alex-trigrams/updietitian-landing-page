const { isAuthed } = require('./_auth');

module.exports = async (req, res) => {
  const { SESSION_SECRET } = process.env;
  if (!SESSION_SECRET) {
    res.status(500).json({ error: 'Server is not configured (missing SESSION_SECRET)' });
    return;
  }
  res.status(200).json({ authed: isAuthed(req, SESSION_SECRET) });
};
