# UP Dietitian

Landing site for **Lauren Nash, APD** — sports dietitian, Perth WA. Built by [trigrams.studio](https://trigrams.studio).

- **Live:** https://www.updietitian.com
- **Hosting:** Vercel (project `updietitian-landing-page`, `trigramsstudio` scope)

## Stack

Static, **no build step**. React 18 + Babel-standalone + Tailwind, all via CDN. Every component attaches to `window` and is loaded in order from `index.html`. Editable marketing copy lives in Vercel Blob and is read at runtime via `/api/get-content` with the `C(path, fallback)` helper.

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
- `admin/` + `api/` — hidden `/admin` panel letting Lauren edit copy; content stored in Vercel Blob (see below).
- `content.json` — **seed/fallback only.** Once Lauren saves via `/admin`, the live Blob is the source of truth and this file goes stale.

## Routes

`/` · `/about` · `/services` (+ Process) · `/seminars` · `/clinic` · `/contact` · `/privacy` · `/cookies` · `*` → branded 404.

## Content editing (`/admin`)

Login-protected panel backed by Vercel Blob (not GitHub). Env vars in Vercel: `ADMIN_USER`, `ADMIN_PASS_HASH` (bcrypt), `SESSION_SECRET`, `BLOB_READ_WRITE_TOKEN`. Adding a new editable section needs: (1) keys in `content.json`, (2) a group in the `SECTIONS` schema in `admin/index.html`, (3) hardcoded fallbacks in the component.

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
