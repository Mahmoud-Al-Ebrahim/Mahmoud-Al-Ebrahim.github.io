# QA report, version 2 (2026-11-06)

## Automated results

| Check | Command | Result |
|---|---|---|
| Lint | `npm run lint` | clean |
| Types | `npm run typecheck` | clean |
| Unit and component tests | `npm test -- --run` | 17 files, 73 tests, all pass |
| Static build | `npm run build` | every route prerendered to `out/`, share images as PNG |
| End-to-end | `npm run test:e2e` (against the static `out/` folder) | 73 passed, 14 skipped (device-specific), 0 failed |
| Accessibility | axe, WCAG 2.2 AA tags, 16 routes on desktop and phone | no serious or critical violations |
| Lighthouse, mobile, worst of two runs | `npm run lhci` | all budgets met (≥ 90, CLS ≤ 0.1) |

| URL | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 96 | 100 | 100 | 100 | 1.1 s | 0 |
| `/apps/labeeny` | 92 | 100 | 96 | 100 | 0.9 s | 0.001 |
| `/projects/gallery-ai` | 96 | 100 | 96 | 100 | 0.8 s | 0 |

Measured locally against the static export; live numbers depend on the host and network.

## Visual testing performed

In the in-app browser at 1440×900, 1280×800, 768×1024 and 375×812, light and dark themes:
home (every section), `/apps`, `/apps/labeeny`, `/apps/fahim-edtech`, `/apps/sayed`, `/projects/gallery-ai`, `/projects/foodly`, `/about`, `/resume`, the 404 page. Playwright additionally captures full-page phone screenshots of eleven routes and asserts no horizontal scroll.

Defects found and fixed during this pass: hero and panel phones collapsing to zero width; a 720 px diagram forcing a phone layout to zoom out; Arabic names touching Latin names because of a logical margin inside right-to-left text; a too-large family title; duplicate view-transition names; secondary text under 4.5:1 on two product colors; the "1000+" figure overlapping its label.

## Known limitations

1. **Labeeny has no source in this portfolio.** Its case study follows the store listing and the CV, and says so.
2. **Engineering projects have no screenshots.** Gallery AI, Trydos, Safeer, fashion_store, Tiktag, Revo and Mudhhila are diagram-first; the `screenshots` field is ready when captures exist.
3. **Testimonials, a photo and a custom domain** were not supplied; the design does not depend on them.
4. **Scroll-linked effects** (the progress line and the gentle screen drift) use CSS scroll timelines. Browsers without them show the same page without those two effects.
5. **Shared-element transitions** of app icons use the View Transitions API; browsers without it navigate normally.
