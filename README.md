# NEXORA GROUP — Corporate Website Design Concepts

Five complete, visually distinct corporate-group website concepts in **one** React application, served from **one** Vercel deployment.

| Route | Concept |
| --- | --- |
| `/` | Concept selection portal (client presentation page) |
| `/demo1/*` | **Refined Corporate Classic** — Cormorant Garamond + Source Sans 3, navy / ivory / muted gold, utility bar + mega-menu, photographic hero slider |
| `/demo2/*` | **Modern Industrial Powerhouse** — Barlow Condensed + IBM Plex Mono, graphite / steel / signal orange, indexed nav + full-screen overlay menu, spec-sheet layouts, Gantt-style roadmap |
| `/demo3/*` | **Contemporary Editorial Luxury** — Fraunces + Manrope, warm paper / ink / oxblood, centred masthead + side index, magazine cover hero, letter-style forms |
| `/demo4/*` | **Next-Generation Technology Group** — Space Grotesk + Inter + JetBrains Mono, void / indigo / teal, floating capsule nav, interactive network hero, multi-step partner wizard |
| `/demo5/*` | **Human-Centered Global Enterprise** — Plus Jakarta Sans + Lora, teal / coral / sun on sand, rounded modular layout, photo-mosaic hero, conversational forms, FAQ |

Every demo implements the same ten sections, each with its own layout and page design:

`about-us` · `group-companies` (+ `group-companies/:slug`) · `partner-with-us` (`?type=dealer|oem|technology|investment|vendor`) · `news` (+ `news/:slug`) · `future-roadmap` · `gallery` · `leadership` · `resource-centre` (+ `resource-centre/:slug`) · `contact` — plus the floating demo **chat assistant** on every page and a demo-specific 404.

A discreet **“All concepts”** pill (bottom-left) returns to the portal from any demo page.

---

## Run locally

Requirements: Node.js 18+ (tested on Node 24) and npm.

```bash
npm install
npm run dev          # http://localhost:5173
```

Other commands:

```bash
npm run build        # type-check + production build into dist/
npm run preview      # serve the production build (http://localhost:4173)
npm test             # Vitest: routing for all 5 demos × all pages, prefix-preserving links, forms, chat engine
```

Optional browser QA (uses an installed Chrome via `playwright-core`; no browser download):

```bash
npm run build && npx vite preview --port 4199
node scripts/qa.mjs http://localhost:4199          # every route at 1440/768/375px + interaction flows
node scripts/previews.mjs http://localhost:4199    # regenerate portal screenshots (then convert PNG → JPG)
```

Set `CHROME_PATH` if Chrome is not at `C:/Program Files/Google/Chrome/Application/chrome.exe`.

## Deploy to Vercel (one project, one URL)

1. Push this folder to a Git repository (GitHub, GitLab or Bitbucket).
2. In Vercel: **Add New → Project → Import** the repository.
3. Vercel detects **Vite** automatically. Settings (also pinned in `vercel.json`):
   - Build command: `npm run build`
   - Output directory: `dist`
   - No environment variables are required.
4. Click **Deploy**. Vercel returns one URL such as `https://your-project.vercel.app`, which serves:
   - `https://your-project.vercel.app/` — portal
   - `https://your-project.vercel.app/demo1` … `/demo5` and every nested page.

CLI alternative:

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

### How deep links work

`vercel.json` contains a single SPA rewrite: `/(.*) → /index.html`. Vercel serves real files first (`/assets/*`, `/images/*`, `/previews/*`), and every other path loads the app, so opening or refreshing a URL such as `/demo3/group-companies/nexora-energy-solutions` works. React Router then picks the concept from the URL prefix. Unknown paths show a styled not-found page: the global page for unknown prefixes such as `/demo6`, and each concept's own 404 for unknown pages inside a demo. Because this is an SPA, those not-found pages return HTTP 200, not 404. For true 404 status codes you would need pre-rendering or server-side rendering.

## Architecture

```
src/
  app/AppRoutes.tsx        Root routes: "/" portal, "/demoN/*" lazy-loaded concepts, global 404
  app/DemoRoutes.tsx       Shared route table every concept plugs its own page components into
  portal/                  Concept selection page + concept metadata
  demos/demoN/
    ui.tsx                 The concept's own primitives (buttons, headings, form fields, page header…)
    Layout.tsx             The concept's own header, mobile menu, footer and chat skin
    pages/*.tsx            Home, About, Companies (+detail), Partner, News (+detail), Roadmap,
                           Gallery, Leadership, Resources (+detail), Contact, NotFound
    index.tsx              Mounts the pages on the shared route table
  components/common/       Behaviour-only shared pieces: ChatAssistant (skinned per demo),
                           LightboxShell (focus trap/keys), ConceptsLink, ScrollToTop, SkipLink
  data/                    ALL sample content (typed): brand, companies, leadership, about,
                           news, gallery, roadmap, resources, partnership form configs
  hooks/                   useDemoForm (validation + demo submit), usePageMeta, useOverlay
  lib/                     validation, chat engine, paths (prefix-safe links), downloads, icons
```

Design isolation: each concept's visual tokens are namespaced in `tailwind.config.js` (`d1-*`, `d2-*`, … colours and font families). Pages are separate files per concept, so editing Demo 2 cannot change Demo 1. Business logic is shared: validation, the form state machine, the chat engine, the data and the lightbox behaviour. Every internal link is built from `makePaths('/demoN')`, which keeps the prefix. The tests check this on every page.

Each concept is a separate code-split chunk (about 80–90 kB, or about 20 kB gzipped), so visitors only download the concept they open.

## Replacing placeholder content

| What | Where |
| --- | --- |
| Brand name, wordmark, tagline, emails, phone, offices, social links | `src/data/brand.ts` |
| Group companies (add/remove freely — all pages adapt) | `src/data/groupCompanies.ts` |
| Leadership profiles and portraits | `src/data/leadership.ts` + `public/images/p-*.jpg` |
| Story, Chairman/MD messages, vision, mission, values, timeline, stats | `src/data/about.ts` |
| News, events, videos | `src/data/news.ts` |
| Gallery | `src/data/gallery.ts` |
| Roadmap | `src/data/roadmap.ts` |
| Resource Centre articles | `src/data/resources.ts` |
| Partnership form fields (5 forms) and contact form | `src/data/partnerships.ts` |
| Concept names/descriptions on the portal | `src/portal/concepts.ts` |

A few concept-specific display strings also contain the placeholder name, such as the “NEXORA” wordmark in some logos and “Est. 1998*”. Search the code for `NEX`, `Nexora` and `1998` when rebranding.

## Sample content and items that need real information

Everything below is **illustrative** and must be replaced or confirmed before launch:

- **Brand:** “NEXORA GROUP” is a fictional placeholder name. Logos are typographic placeholders.
- **Companies:** all six companies, their offerings, industries, metrics and domains are fictional. “Visit website” links open `https://example.com/`.
- **People:** all eight leadership profiles, names, biographies, quotes and messages are fictional. The portraits are stock photos of unrelated people.
- **Numbers and dates:** every statistic (colleagues, countries, MW, assets…), timeline year and news date is illustrative, and is labelled as such on the pages.
- **Roadmap:** sample content only, not official commitments (stated on every roadmap page).
- **News and resources:** original sample text. Videos are **placeholders**; no third-party video is embedded.
- **Contact details:** the `.example` email domain, the `+00` phone number and the office addresses are placeholders. Social links point to platform home pages.
- **Maps:** visual placeholders; embed Google Maps or Mapbox once addresses are confirmed.
- **Photography:** representative Unsplash images (Unsplash License), stored in `public/images`. Replace them with client photography where possible.
- **Fonts:** Google Fonts loaded in `index.html`.

## Features that need production integration

- **Forms (partnership × 5, contact):** these run in demo mode. They validate in the browser, then show a confirmation with a `DEMO-XXXXXX` reference. **Nothing is transmitted.** To go live, replace `simulateSubmit()` in `src/hooks/useDemoForm.ts` with a POST to a backend or form service, for example a Vercel Serverless Function, Formspree, HubSpot or a CRM. Add spam protection and an email-notification flow, and get a privacy-policy and consent review.
- **Chat assistant:** a deterministic, rule-based demo (`src/lib/chat/engine.ts`). It does **not** use an AI model. To add a real model, create a server-side endpoint such as `api/chat.ts` on Vercel that holds the API key in a server-only environment variable. Then switch the widget to `createBackendProvider('/api/chat')`. **Never** put API keys in frontend code or in `VITE_`-prefixed variables, because those are bundled into the browser.
- **Downloads:** Resource Centre downloads generate a sample `.txt` file in the browser. Replace them with real PDF files, for example in `public/downloads`.
- **SEO:** page titles and descriptions are set per page in the browser. `index.html` contains `noindex` because these are review concepts. Remove it for the final site, and consider pre-rendering for search engines.

## Accessibility and quality notes

- Semantic landmarks, skip links, one `h1` per page, labelled controls, visible focus styles, and focus-trapped dialogs that close with Escape (menus, lightboxes, bio modal).
- Form errors are linked to their fields through `aria-describedby`, and focus moves to the first invalid field.
- `prefers-reduced-motion` is respected: Framer Motion uses `reducedMotion="user"`, and a global CSS fallback stops the hero slider from auto-advancing.
- Images below the fold are lazy-loaded. Cards use `-sm` variants of about 720 px.
