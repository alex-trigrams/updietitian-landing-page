# UP Dietitian

Landing site for **Lauren Nash, APD** — sports dietitian, Perth WA. Built by [trigrams.studio](https://trigrams.studio).

- **Live:** https://www.updietitian.com
- **Hosting:** Vercel (project `updietitian-landing-page`, `trigramsstudio` scope)

## Stack

React 18 + Babel-standalone + Tailwind, all via CDN; the public pages have no build step. Every component attaches to `window` and is loaded in order from `index.html`. Editable copy and photos live in Sanity and are read with the `C(path, fallback)` helper. The only thing built on deploy is the editor at `/admin` (`studio/`).

## Structure

- `index.html` — entry point; loads all JSX in order, fetches editable content, styles.
- `vercel.json` — SPA rewrite: all non-asset/non-api/non-admin paths → `index.html` so the client router owns routing.
- `src/`
  - `router.jsx` — tiny History-API router (`useRoute`, `navigate`, `<Link>`, per-route `<title>`/meta).
  - `app.jsx` — route switch + page composition (Nav + Footer on every page). Home teasers live here.
  - `hooks.jsx` — shared hooks, `THEMES`, `CALENDLY_URL`, `slugify`, cursor blob.
  - `nav.jsx` — sticky nav with grouped **Services** dropdown; "Contact" opens the enquiry modal.
  - `hero.jsx` — kinetic headline over a 6-photo cross-fading slideshow.
  - `card.jsx` — shared `ExpandableCard` (click-to-expand) + service name mapping.
  - `services.jsx`, `seminars.jsx` — expandable cards, progressive disclosure.
  - `enquiry.jsx` — `EnquiryForm` (Formspree) + `EnquiryModal` + `openEnquiry(topic)`.
  - `about.jsx`, `process.jsx`, `clinic.jsx`, `photos.jsx`, `marquee.jsx`, `footer.jsx`.
  - `sticky-cta.jsx` — mobile bottom CTA dock (Book a call / Enquire).
  - `legal.jsx` — Privacy, Cookies, Contact page, 404.
  - `analytics.jsx` — Vercel Web Analytics custom events, re-init per route.
- `studio/` — the Sanity editor the client uses at `/admin` (see below). Built into `admin/` on deploy; `admin/` is not committed.
- `api/_content.js` — loads published content from Sanity, filling gaps from `content.json`.
- `content.json` — **seed/fallback only.** Supplies any field the client hasn't filled in, and the whole site if Sanity can't be reached.

## Routes

`/` · `/about` · `/services` (+ Process) · `/seminars` · `/clinic` · `/contact` · `/privacy` · `/cookies` · `*` → branded 404.

## Content editing (`/admin`)

The client goes to `/admin`, logs in with their own Sanity account, edits a section and presses Publish. The site reads published content on every request, so changes show straight away. Drafts stay private, and every section keeps a history that can be restored.

The setup is the same for every trigrams.studio client. Two files are per-client:

- `studio/client.config.json` — name, logo, brand colours, Sanity project ID.
- `studio/schema/sections.js` — the editable sections. Each is one sidebar entry in the editor, built from the shared field helpers in `studio/schema/shared.js`.

Adding an editable field: add it to the section in `sections.js`, read it in the component with `C('<section>.<field>', fallback)`, and deploy. Photos arrive as `{ src, thumb, pos, alt }`.

Setting up a new client (one Sanity project each, free tier):

1. `cd studio && npm install`, then `npx sanity projects create "<Client>" --dataset production` and put the project ID in `client.config.json`.
2. `npx sanity cors add https://<their-domain> --credentials` (and any preview domain, and `http://localhost:3333` for `npm run dev`).
3. Write their `sections.js`, then `npx sanity exec scripts/seed.mjs --with-user-token` to copy existing copy and photos in (`scripts/seed-photos.json` maps photo fields to files in the repo).
4. Invite the client to the project as an Editor from sanity.io/manage.

## Deploy

Preview: `vercel` · Production: `vercel --prod` (from project root). Push to `main` also mirrors to GitHub.

## Analytics

Vercel Web Analytics + custom events (`section_view`, `scroll_depth`, `book_call_click`, `enquiry_open`, `enquiry_submit`, `nav_click`, …). Per-page pageviews are meaningful now that the site is multi-page.

---

## Recent work (2026-07)

- **Multi-page split** — was one long scroll; now a routed SPA (real URLs per page, per-page analytics) with a `vercel.json` rewrite.
- **Hero** — smaller headline that fits one screen; background is a 6-photo cross-fading slideshow standing in for the not-yet-ready hero video.
- **Enquiry form + modal** — Formspree-backed `EnquiryForm`; "Contact" and Seminars enquiries open it as a modal; `/contact` hosts it inline too.
- **Services / Seminars declutter** — shared click-to-expand cards (photo banner + title + tags collapsed; full detail + inclusions on expand); clearer plain-English service names with the brand name as a tag; grouped Services nav dropdown.
- **Mobile CTA dock** — Book a call + Enquire, permanently docked at the bottom on mobile.
- **Legal** — AU Privacy Act / APP-based Privacy + Cookie pages (cookieless, no consent banner), branded 404.
- Removed distracting marquees (rotating sports list, "BOOK A FREE 15 MIN").

## What's next / open items

- [ ] **Formspree** — confirm live submissions reach lauren@updietitian.com; endpoint `f/mpqvklkr` is wired.
- [ ] **Privacy policy** — Lauren to confirm registered business name / ABN (placeholder flagged in `src/legal.jsx`); recommend a legal review.
- [ ] **Service & seminar photos** — drop images into the `SERVICE_IMAGES` / `SEMINAR_IMAGES` maps (keyed by slug) in `services.jsx` / `seminars.jsx`; placeholders show until then.
- [ ] **Pricing** — packages show, rough pricing deferred to Lauren.
- [ ] **Hero video** — replace the slideshow when the film is ready.
- [ ] Decide whether to keep the remaining Home tagline marquee ("ULTRA PERFORMANCE NUTRITION…").
- [ ] Confirm Vercel custom-event entitlement on the Pro plan (Analytics → Events).
