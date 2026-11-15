// Runs after `sanity build`. The built page still carries Sanity's own tab
// title and icon; this swaps them for the client's so the browser tab and
// bookmarks read as their site.
import fs from 'node:fs';

const client = JSON.parse(fs.readFileSync(new URL('../client.config.json', import.meta.url), 'utf8'));
const file = new URL('../../admin/index.html', import.meta.url);

let html = fs.readFileSync(file, 'utf8');
html = html
  .replace(/<title>[^<]*<\/title>/, `<title>${client.name} | Site editor</title>`)
  .replace(/<link[^>]+rel="(?:icon|apple-touch-icon|manifest)"[^>]*>/g, '')
  .replace('</title>', `</title><link rel="icon" href="${client.logo}"/><link rel="apple-touch-icon" href="${client.logo}"/><meta name="robots" content="noindex"/>`);
fs.writeFileSync(file, html);
