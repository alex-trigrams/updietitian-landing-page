const { loadContent } = require('./_content');

// Live site copy as JSON (Blob merged over the seed — see api/_content.js).
// Pages get the same content inlined by api/render.js; /admin reads it here.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(await loadContent());
};
