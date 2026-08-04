# Vantiq — care home marketing site

A marketing site for Vantiq's 30-day, zero-agency-fee Meta advertising trial for UK care homes.
All copy, colour and typographic devices are taken from the source proposal,
`Vantiq-Care-Home-Trial-Proposal.pdf`.

That PDF is **not** in this repository — `/docs/` is gitignored, because the proposal carries
pricing and founder credentials and this repo is public. Keep your copy at `docs/` locally; every
value the code needs from it is documented below.

## Running it

```bash
npm install
npm run dev             # http://localhost:3000
npm run build           # production build (type-checks as part of the build)
npm run start           # serve the production build
npm run build:static    # static export to out/ (what GitHub Pages gets)
npm run preview:static  # serve out/
npm run lint
```

Copy `.env.example` to `.env.local` to override the site URL, base path, enquiry endpoint or
contact email. Everything works with none of them set.

Node 24 or newer.

## Stack

| Package | Version | Note |
| --- | --- | --- |
| next | 16.3.0 | App Router, Turbopack |
| react / react-dom | 19.2.8 | |
| tailwindcss | 4.3.3 | v4 — configured in CSS, no `tailwind.config.ts` |
| typescript | 6.0.3 | see below |
| eslint | 9.39.5 | see below |
| motion | 12.43.0 | Framer Motion — the library's current package name |
| zod | 4.4.3 | shared client/server validation |

Two versions are deliberately **not** the newest published release:

- **TypeScript 6.0.3, not 7.0.2.** `typescript-eslint` — pulled in by `eslint-config-next` — refuses
  to load against the TypeScript 7 API
  ([typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)).
  With TS 7 installed, `npm run lint` cannot run at all. TS 6.0.3 is the newest release the whole
  toolchain supports. Bump to 7.x once typescript-eslint ships support.
- **ESLint 9.39.5, not 10.8.0.** The `eslint-plugin-react` bundled inside `eslint-config-next@16.3.0`
  calls the pre-ESLint-10 rule context API and throws on ESLint 10. Bump when `eslint-config-next`
  updates its transitive plugins.

Everything else is the current latest. There is no component library, no CSS-in-JS runtime, no
analytics and no third-party scripts.

`motion` is Framer Motion: the team renamed the package, and `framer-motion` is now the legacy
alias of the same 12.x release.

## Where things live

```
src/
  app/
    layout.tsx              root shell, metadata, fonts, theme bootstrap
    page.tsx                section composition
    globals.css             the entire design system (Tailwind v4 @theme)
    icon.svg                favicon, drawn from the Vantiq mark
    opengraph-image.tsx     generated OG/Twitter card
    robots.ts / sitemap.ts
    api/enquiries/route.ts  enquiry endpoint
  components/
    sections/               one file per page section
    enquiry/                the multi-step qualifying funnel
    primitives.tsx          Shell, Section, SectionLayout, Prose, MarkedHeading, LinkButton
    motion/                 the entire animation layer
    site-header.tsx / site-footer.tsx / logo.tsx / structured-data.tsx
    theme-toggle.tsx        light/dark toggle + no-flash init script
    mobile-nav.tsx
  lib/
    content.ts              ALL page copy
    site.ts                 site config and contact details
    enquiry.ts              zod schema + step definitions
```

Everything is a Server Component except the files under `components/motion/`, `theme-toggle.tsx`,
`mobile-nav.tsx` and the two files under `components/enquiry/` — those hold state or bind event
handlers. Sections pass their server-rendered markup through the motion wrappers as children, so
animating a section does not turn it into a client component.

## Layout

The page runs on a wide shell (`max-w-[110rem]`, fluid gutters up to `2xl:px-24`) rather than a
narrow centred column, so large displays are used instead of framed with dead margin. Readability is
protected inside that shell by a 12-column grid: each section is a narrow sticky rail (index, title,
kicker) beside a wider content track, and prose blocks are capped at 46–68 characters. Widening the
shell and widening the paragraphs are different things — only the first one happened.

## Motion

Rules the animation layer sticks to:

- **Transform and opacity only.** Nothing animates width, height, top or left, so nothing reflows.
- **The hero entrance is CSS, not JavaScript.** An animation library server-renders its initial
  state, which would leave the hero blank until hydration. A keyframe starts on first paint instead.
  Everything below the fold uses scroll-triggered motion, where pre-hydration state is not visible.
- **Reduced motion is handled in one place**, by `MotionConfig reducedMotion="user"` in
  `motion/motion-provider.tsx`. Branching on `useReducedMotion()` to render a plain element instead
  of a motion element does *not* work: the server renders the motion element's initial styles either
  way, and swapping element types after hydration leaves `opacity: 0` stuck on the node — hiding
  content from exactly the users the branch was meant to help.
- **Reveals fail open.** Every animated element carries `data-reveal`, and both a
  `@media (scripting: none)` rule and a `<noscript>` block force the finished state, so no content
  is ever invisible without JavaScript.
- **No rightward entrances on full-width elements** — a positive x-offset pushes past the viewport
  edge and creates horizontal scroll on small screens.

### Changing the copy

Edit [`src/lib/content.ts`](src/lib/content.ts). Nothing in that file may assert a statistic,
outcome, client name or credential that is not in the source PDF.

### Changing the palette

Edit the custom properties at the top of [`src/app/globals.css`](src/app/globals.css). There are
three blocks: light (`:root`), dark by toggle (`.theme-dark`) and dark by system preference
(the `prefers-color-scheme` media query). Keep all three in step.

Colours are extracted from the PDF: ink `#141110`, accent `#a96e48`, soft accent `#c99a7c`, faint
accent `#e8d3c6`, warm surfaces `#faf3ed` / `#fcf8f5`.

One deliberate departure: `--accent` at `#a96e48` measures 4.19:1 on white, which clears WCAG AA for
large text but not for body text. Small text therefore uses `--accent-text` (`#98613e`, 5.10:1),
while `--accent` stays exact for display type, rules, bars and bullets. Dark mode lifts the accent to
`#d79a6e` and the two tokens converge.

## The enquiry funnel

The site sells a qualifying funnel, so its own enquiry form is one: four steps, validated
step-by-step, in [`src/components/enquiry/`](src/components/enquiry/). The schema in
[`src/lib/enquiry.ts`](src/lib/enquiry.ts) is used by both the client wizard and the route handler —
the client copy is a convenience, and the server never trusts it.

Submissions `POST` to `/api/enquiries`. **That handler currently logs the enquiry and returns 201.**
Replace the `deliver()` function in
[`src/app/api/enquiries/route.ts`](src/app/api/enquiries/route.ts) with the real destination
(transactional email, CRM, Google Sheet). Keep the call inside the existing `try`/`catch` so a
downstream outage returns 502 rather than dropping a lead silently.

A honeypot field is accepted silently and never delivered. There is no rate limiting — add it at the
edge (Vercel WAF or similar) before going live.

## Fixing the live domain

Two scripts, both dry-run by default, both reading the token from the environment
so it never lands in a file:

| Script | Fixes the loop by | Token scope needed |
| --- | --- | --- |
| `scripts/cloudflare-unproxy.sh` | Taking Cloudflare out of the path (grey cloud) | `Zone:DNS:Edit` |
| `scripts/fix-cloudflare-ssl.sh` | Moving the zone off Flexible SSL to Full | `Zone Settings:Edit` |

Either one alone fixes it. Grey-clouding needs the smaller scope and is also a
prerequisite for the WSL Proxy path; keeping Cloudflare in front and switching to
Full retains its CDN and DDoS shield.

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): lint, static
export, publish to GitHub Pages. Enable it once under **Settings → Pages → Source → GitHub Actions**.

### The one thing that does not survive the move

GitHub Pages serves files; it does not run a Node server. **The `/api/enquiries` Route Handler
cannot exist there.** `next.config.ts` handles that declaratively rather than by deleting files in
CI: the handler lives at `route.node.ts`, and the static build narrows `pageExtensions` to
`["ts", "tsx"]`, which drops it out of the route graph. A normal `npm run build` keeps it.

So the form needs somewhere else to post. Set the `ENQUIRY_ENDPOINT` repository variable to any form
service that accepts a JSON POST (Formspree, Basin, Web3Forms). **Until you do, the form falls back
to opening a pre-filled email** — clunky, but a completed funnel is never silently dropped, which is
what would happen if it kept POSTing to a URL that no longer exists.

If you would rather keep the real endpoint, deploy to a host that runs Node (Vercel, Netlify,
Cloudflare, a container) instead — the default build already works there, unchanged.

### Fronting the domain with WSL Proxy

`vantiq.fictionally.org` can be served through the WSL Proxy edge instead of
Cloudflare's, matching how the other sites in this estate are wired. The vhost
definition, the DNS workflow and the full cutover order live in
[`.github/wslproxy/README.md`](.github/wslproxy/README.md).

One thing to know before starting: every WSL Proxy backend is plaintext HTTP on
port 80, and GitHub Pages answers port 80 with a `301` while **Enforce HTTPS** is
on — the same redirect loop the site hit behind Cloudflare's Flexible SSL. Turning
that toggle off (repo Settings → Pages, admin only) fixes the current loop *and* is
the prerequisite for the proxy path. It is the one action that unblocks both.

### Repository variables

All optional; set under **Settings → Secrets and variables → Actions → Variables**.

| Variable | Effect |
| --- | --- |
| `ENQUIRY_ENDPOINT` | Form service URL. Unset → the email fallback above. |
| `CONTACT_EMAIL` | Enquiries inbox, shown in the footer and used by the fallback. |
| `PAGES_CUSTOM_DOMAIN` | Override the custom domain. Normally unnecessary — see below. |

### Base path

A custom domain serves from the root; a project page serves from `/<repo>`. Getting this wrong
breaks every asset URL, so the workflow **works the domain out for itself** rather than assuming
it, in this order:

1. the `PAGES_CUSTOM_DOMAIN` repository variable, if set
2. the repo's own `CNAME` file
3. the Pages API (`repos/<owner>/<repo>/pages`, field `cname`)

Nothing has to be kept in sync by hand. Note that `output: export` only copies `public/`, so a
root `CNAME` never reaches the build on its own — the workflow writes it into `out/`.

The value is resolved in bash, not with a `${{ a && b || c }}` expression — GitHub treats `''` as
falsy, so that idiom silently falls through to the default in exactly the custom-domain case where
the intended value *is* empty.

The `CNAME` is written into the artifact, because an Actions deploy replaces the whole site and
would otherwise drop the custom-domain setting on publish.

## Before you deploy — placeholders that need real values

These are left as visible `TODO` strings on purpose, so nothing invented can ship by accident.

| Where | What |
| --- | --- |
| `src/lib/site.ts` → `url` | production domain (canonical URL, OG tags, sitemap, robots). Overridable with `NEXT_PUBLIC_SITE_URL`; the Pages workflow sets it for you |
| `src/lib/site.ts` → `contact.email` | enquiries inbox — footer, enquiry section, JSON-LD and the email fallback. Overridable with `NEXT_PUBLIC_CONTACT_EMAIL` |
| `src/lib/site.ts` → `contact.phone` | contact number, or remove the footer line |
| `src/lib/site.ts` → `contact.companyNumber` | company registration line in the footer |
| `src/lib/content.ts` → `founders.together.figure` | the source proposal leaves this as `[00]`. Supply the real number or delete the `together` block — do not estimate it |
| `src/app/api/enquiries/route.ts` → `deliver()` | where enquiries actually go |

The proposal's other bracketed placeholders (`[Care Home Name]`, `[your area]`, `[DATE]`) were
per-recipient variables and have been rewritten as generic site copy rather than carried over.

## Verified

- `npm run build` and `npm run lint` both clean.
- No horizontal overflow at 320 / 360 / 390 / 414 / 768 / 1024 / 1280 / 1440 / 1920 / 2560px.
- One `h1`; `header` / `main` / `footer` / `nav` landmarks present; no unlabelled form controls.
- Every text/background pair in both themes meets WCAG AA (4.5:1 body, 3:1 large).
- Funnel driven end to end by keyboard, including the validation-error state and submission.
- The static export was served from a simulated `/<repo>` sub-path and walked end to end: no broken
  requests, hydration intact, wizard advancing, and the email fallback engaging in place of a POST
  to an endpoint that is not there.
- With `prefers-reduced-motion: reduce`, every element settles at full opacity and no transform.
- With JavaScript disabled entirely, no content renders below `opacity: 0.9` (bar the disabled
  Back button, which is meant to look disabled).
- Scroll-driven reveals all fire under a human-paced scroll; nothing is left hidden.
