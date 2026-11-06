# Mahmoud AlEbrahim: portfolio

The personal site of a senior Flutter engineer and mobile architect: published apps with store links and case studies, engineering projects written up from problem to lessons learned, interactive architecture diagrams, articles, résumé and contact.

Built with Next.js (App Router, static export), TypeScript, Tailwind CSS v4 and MDX, with all motion in CSS. Content is typed TypeScript validated with Zod at build time. Live at https://mahmoud-al-ebrahim.github.io.

## Run it

Requires Node 20.19 or newer (Node 24 recommended) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Generates share images, validates all content and exports every route to `out/` |
| `npm run preview` | Serves `out/` locally on port 3100, like GitHub Pages will |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test -- --run` | Unit and component tests (Vitest + Testing Library) |
| `npm run test:e2e` | Playwright against the static export: journeys, axe accessibility, mobile overflow, reduced motion, SEO (needs `npx playwright install chromium` once) |
| `npm run lhci` | Lighthouse CI on `/`, `/apps/labeeny`, `/projects/gallery-ai` with ≥ 90 budgets |
| `npm run assets -- --from <dir>` | Converts store PNGs into optimized WebP under `public/apps/` |

## Where things live

```
src/
  app/                 routes (App Router). Thin async pages delegate to sync components so they stay testable.
    apps/[slug]        published-app case studies (products and families)
    projects/[slug]    engineering case studies (eight-step narrative, diagram inside Architecture)
    writing/<slug>/    articles as MDX routes
    sitemap.ts, robots.ts
  components/
    ui/                primitives: Container, Section, ArabicName, PhoneFrame, StoreBadges, Button, Tag…
    showcase/          the product panels: Labeeny, the EdTech scroll story, Min Bayty, the two-up
    sections/          home and about page sections
    case-study/        shared case-study layout pieces
    diagrams/          five interactive SVG diagrams + DiagramFrame
    shell/             header, mobile menu, footer
    motion/            Reveal (IntersectionObserver + CSS) and the scroll-progress line
    theme/             theme script and toggle
  content/             all site content, typed and validated (see docs/ADDING_CONTENT.md)
  lib/                 loaders, SEO helpers, fonts, store URL builders
  assets/fonts/        self-hosted Readex Pro (Latin and Arabic) and Geist Mono (OFL)
public/apps/<slug>/    icons and screenshots (WebP)
e2e/                   Playwright specs
public/og/              share images, generated at build
scripts/               asset import, share-image generator, GitHub publish script
docs/                  design and audit, content guide, deployment guide, QA report
```

## Updating content

See [docs/ADDING_CONTENT.md](docs/ADDING_CONTENT.md). Adding a product is one TypeScript file, an icon and a few screenshots; the build fails loudly if anything is missing.

## Deploying

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). GitHub Pages via GitHub Actions; any static host works.

## Design

The audit, strategy and design system are in [docs/DESIGN.md](docs/DESIGN.md). Tokens live in `src/app/globals.css`. Light and dark themes follow the system preference and can be overridden with the toggle in the header; the choice is stored in `localStorage` only.

No analytics, no cookies, no third-party requests at runtime.
