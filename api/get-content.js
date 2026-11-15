const { loadContent } = require('./_content');

// Live site copy as JSON (Sanity over the seed — see api/_content.js).
// Pages get the same content inlined by api/render.js.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(await loadContent());
};
