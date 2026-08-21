# Vowcraft — marketing site

The public site for [Vowcraft](../vowcraft): landing page, features, pricing, docs,
security, and contact. Independent of the application — separate repo, separate
deploy, no shared database and no shared build.

```bash
cp .env.example .env.local     # set NEXT_PUBLIC_APP_URL
npm install
npm run dev                    # → http://localhost:3001
```

Next.js 15 (App Router), Tailwind CSS, Bootstrap Icons, TypeScript. No CMS and no
component library. Runs directly on Node — there is no container for this repo,
because a static marketing site does not need one and the app's compose stack is
not a dependency.

```bash
npm run build && npm start    # production
npx tsc --noEmit              # typecheck
```

---

## Design notes

**The palette is shared, not approximated.** `src/app/globals.css` carries the same
token definitions as the application's — `#224248 · #325E6A · #44A1A4 · #FF9A00`,
light and dark, with the same variable names and byte-identical values (the app's
`tests/contrast.test.ts` fails if the two files drift). A landing page whose colours
differ from the product it sells makes the product look like a different product.
The theme toggle also shares the application's `localStorage` key, so a preference
set here survives the jump into the app, and a first-time visitor gets their
operating system's setting.

**Every pairing was measured.** Two numbers shaped the system: `#44A1A4` is 2.8:1 on
a pale ground and `#FF9A00` is 1.9:1, so **neither accent carries body text**.
Accent text uses a tint of the same hue (`#57B6B9` dark, `#327779` light); both
fills carry a `#0E2126` label in either theme, at 5.4:1 on teal and 7.8:1 on orange.
Those fills also fall under WCAG 1.4.11's 3:1 boundary bar on light, so each draws a
darker ring instead of relying on the fill. Dark mode's page is `#0E2126` with
`#224248` panels and `#325E6A` cards; light mode inverts, using the two given darks
as its text tiers at 9.7:1 and 6.4:1.

**Product shots are markup, not screenshots.** `src/components/mockups/` rebuilds
the real dashboard, action-item cards, confirmation modal, and audit log from the
application's own component structure and class names. Two consequences worth the
effort: they render correctly in both themes without a second set of assets, and
they cannot silently go stale the way an exported PNG does. All of it is
`aria-hidden` — it illustrates prose that already says the same thing.

**Motion degrades to nothing.** Scroll reveals put their hidden state in CSS and
only ever *add* a revealed class, so content is readable if JavaScript never runs.
`prefers-reduced-motion` disables the reveals, the marquee, and the ambient blooms.

---

## Structure

```
src/app/
  page.tsx            hero, integrations ticker, how-it-works, bento, audit, overview
  features/           the six pillars, risk tiers, the guardrail catalogue, roadmap
  pricing/            three plans with a billing toggle, comparison table, FAQ
  docs/               index + six articles rendered from src/lib/content.ts
  security/           trust model, data-flow table, and what is not done yet
  contact/            validated form with per-field errors
  api/contact/        server-side re-validation, optional forwarding
src/components/
  site/               Header, Footer, Reveal, Section, CTA, PricingTable, Faq, ContactForm
  mockups/            product UI rebuilt from the app
  ui/                 primitives and ThemeToggle, shared with the app
src/lib/content.ts    all copy, as data
src/lib/env.ts        NEXT_PUBLIC_APP_URL is the only value that moves deployments
```

Copy lives in `content.ts` rather than inline in JSX, so a page file is a layout and
nothing else and the messaging can change without reading a component.

---

## Authentication

There is none here. **Log in** and **Sign up** are plain cross-origin links to
`${NEXT_PUBLIC_APP_URL}/login` and `/signup`, which the application serves — so this
site never receives, forwards, or stores a credential, and there is nothing to
configure for auth.

---

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | yes | Every "open the app", log-in, and sign-up destination |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical origin for metadata, Open Graph, and the sitemap |
| `CONTACT_FORWARD_URL` | no | Where contact submissions POST. Unset ⇒ validated and logged only, and the UI **says so** rather than implying an email was sent |
| `CONTACT_TO_EMAIL` | no | Passed through to the forwarding endpoint |

---

## Content that stays honest

Two rules the copy follows, because they are cheap and the alternative erodes
trust:

1. **Nothing claims a capability the application has not shipped.** Roadmap items
   are on the features page under a heading that says they are not built.
2. **The security page lists its own gaps.** A security page containing only
   strengths is a marketing page, and readers who matter can tell.

## Adding a page

Add the route under `src/app/`, its copy to `src/lib/content.ts`, and a link to
`Header.tsx` and/or `Footer.tsx`. `sitemap.ts` derives docs automatically; static
pages are one array entry.
