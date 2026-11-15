// Fills a new Sanity project with a site's existing copy and photos, so the
// client opens /admin to their real content rather than empty forms.
//
//   npx sanity exec scripts/seed.mjs --with-user-token
//   npx sanity exec scripts/seed.mjs --with-user-token -- --from ../content.json
//   npx sanity exec scripts/seed.mjs --with-user-token -- --replace
//
// Copy comes from the live site by default (--from takes another URL or a JSON
// file). Photos come from scripts/seed-photos.json. A section that already
// exists in Sanity is left alone unless --replace is passed, so re-running
// this can't overwrite a client's edits by accident.
import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { getCliClient } from 'sanity/cli';
import { sections } from '../schema/sections.js';
import { sharedTypes } from '../schema/shared.js';

const here = path.dirname(new URL(import.meta.url).pathname);
const siteRoot = path.resolve(here, '../..');
const config = JSON.parse(fs.readFileSync(path.join(here, '../client.config.json'), 'utf8'));
const photosFile = path.join(here, 'seed-photos.json');
const photoMap = fs.existsSync(photosFile) ? JSON.parse(fs.readFileSync(photosFile, 'utf8')) : {};

const args = process.argv.slice(2);
const replace = args.includes('--replace');
const from = args.includes('--from') ? args[args.indexOf('--from') + 1] : `${config.siteUrl}/api/get-content`;

const client = getCliClient({ apiVersion: '2025-02-19' });
const objectTypes = Object.fromEntries(sharedTypes.filter((t) => t.type === 'object').map((t) => [t.name, t]));
const key = () => randomUUID().replace(/-/g, '').slice(0, 12);
const skipped = [];

const uploaded = new Map();
async function upload(spec) {
  if (!spec) return undefined;
  const { file, alt, hotspot } = typeof spec === 'string' ? { file: spec } : spec;
  if (!uploaded.has(file)) {
    let source = path.join(siteRoot, file);
    // Sanity's image pipeline is fed a JPEG rather than an AVIF original.
    if (/\.avif$/i.test(source)) {
      const jpg = path.join(os.tmpdir(), `${path.basename(source, path.extname(source))}-${key()}.jpg`);
      execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '90', source, '--out', jpg], { stdio: 'ignore' });
      source = jpg;
    }
    const asset = await client.assets.upload('image', fs.createReadStream(source), { filename: path.basename(source) });
    uploaded.set(file, asset._id);
    console.log(`  uploaded ${file}`);
  }
  const image = { _type: 'photo', asset: { _type: 'reference', _ref: uploaded.get(file) } };
  if (alt) image.alt = alt;
  if (hotspot) image.hotspot = { _type: 'sanity.imageHotspot', x: hotspot[0], y: hotspot[1], width: 0.3, height: 0.3 };
  return image;
}

// Shapes a plain value from content.json into what the schema field stores.
// `at` is the dotted path used to look photos up in seed-photos.json.
async function shape(field, value, at) {
  if (field.type === 'photo') return upload(photoMap[at]);
  if (field.type === 'array') {
    const member = field.of[0].type;
    if (member === 'photo') {
      const out = [];
      for (const spec of photoMap[at] || []) out.push({ _key: key(), ...(await upload(spec)) });
      return out.length ? out : undefined;
    }
    if (!Array.isArray(value)) return undefined;
    if (!objectTypes[member]) return value;
    const out = [];
    for (const item of value) {
      const itemAt = `${at}.${item.id || out.length}`;
      out.push({ _key: key(), _type: member, ...(await shapeFields(objectTypes[member].fields, item, itemAt)) });
    }
    return out;
  }
  return value;
}

async function shapeFields(fields, source, at) {
  const out = {};
  for (const field of fields) {
    const value = await shape(field, source ? source[field.name] : undefined, `${at}.${field.name}`);
    if (value !== undefined && value !== null && value !== '') out[field.name] = value;
  }
  const known = new Set(fields.map((f) => f.name));
  Object.keys(source || {}).forEach((k) => { if (!known.has(k)) skipped.push(`${at}.${k}`); });
  return out;
}

const content = /^https?:/.test(from)
  ? await (await fetch(from)).json()
  : JSON.parse(fs.readFileSync(path.resolve(from), 'utf8'));
console.log(`Seeding "${config.name}" (${config.projectId}/${config.dataset}) from ${from}`);

for (const section of sections) {
  const exists = await client.fetch('defined(*[_id == $id][0]._id)', { id: section.name });
  if (exists && !replace) {
    console.log(`- ${section.title}: already in Sanity, left alone`);
    continue;
  }
  const doc = { _id: section.name, _type: section.name, ...(await shapeFields(section.fields, content[section.name], section.name)) };
  await client.createOrReplace(doc);
  console.log(`- ${section.title}: ${exists ? 'replaced' : 'created'}`);
}

if (skipped.length) console.log(`\nNot in the schema, so not copied:\n  ${[...new Set(skipped)].join('\n  ')}`);
