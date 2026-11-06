# Phase 2: audit, strategy and design system

Date: 2026-11-06. This document records the critical audit of version 1, the strategy for version 2, and the design system that replaced the first direction.

## 1. Audit of version 1

Severity: **S1** blocks the brief, **S2** clearly weakens it, **S3** polish.

### Visual design
- **S1 — The direction is the generic "AI editorial" look.** Warm cream paper (#F5F2EB), a high-contrast serif display (Fraunces), a terracotta/copper accent, hairline rules and monospace labels. Every one of those is a default, not a choice made for this subject. Nothing in it says "mobile products" or "Aleppo".
- **S1 — No product imagery above the fold.** At 1440×900 the first screen is a name, two paragraphs and four statistics. A recruiter sees no app, no icon, no screen. The brief's first test fails.
- **S2 — Template rhythm.** Every home section is the same `Section`: hairline, h2, grey lede, content. Ten repetitions of one shape make a 10,700 px page feel like a document, not a product showcase.
- **S2 — "Big number, small label" statistics** in the hero are the most common portfolio cliché, and they say less than an app icon would.
- **S3 — Muted grey everywhere.** Body copy, ledes, captions and metadata share one grey, so hierarchy comes only from size.

### Published applications
- **S1 — Screens are small and tinted.** Featured compositions put 200–240 px phones on a 12 % tint of the brand colour. The apps look like thumbnails beside a paragraph.
- **S2 — Engineering is missing from the showcase.** Panels describe what each app does, not what was engineered. The interesting facts (single-flight token refresh, FCM as an event bus, resumable TUS uploads) live three clicks deep.
- **S2 — Five apps are reduced to ledger rows**, including Birdy Consults and Sayed, which have the strongest engineering stories.

### Content and storytelling
- **S1 — Backend expertise is asserted, not shown.** The site says "Node.js and GraphQL backends" but no page presents a backend.
- **S2 — Roles are uneven.** Labeeny and Sayed render a role stronger than the evidence ("Led and architected", "Built end to end"); Sayed's public copy says "Authorship to be confirmed".
- **S2 — Counts are inconsistent:** "nine", "ten" and "17" appear in different places.
- **S3 — British spelling** in a site specified for American English.

### Technical storytelling
- **S2 — Case studies use ten sections**; Requirements and Solutions repeat Problem and Challenges. Diagrams sit above the story instead of inside the Architecture section they explain.
- **S2 — App case studies have no architecture section.**

### User experience
- **S1 — Mobile menu cannot be closed by touch:** the open panel covers its own close button.
- **S2 — `/apps` renders nothing without JavaScript:** the list is client-only.
- **S3 — The CV button competes with navigation**; three button styles in the header.

### Animation
- **S2 — Motion is uniform:** every block fades up the same way; there is no orchestrated moment and no scroll-driven product story.
- **S3 — A 30 kB motion runtime** ships for a 2 px progress bar.

### Responsive
- **S2 — Tablet header overflowed** (fixed late in v1), product compositions shrink rather than recompose on phones.

### Architecture and quality
- **S2 — Not deployable as static files:** OG images, sitemap and image optimisation need a Node server; GitHub Pages cannot host it.
- **S3 — Unused dependencies** (six font packages, `motion` for one component), unused `roleUnconfirmed` field, Open Graph cards draw Arabic without an Arabic font.

### What works and is kept
Typed, build-validated content; private repository URLs stripped at the loader; the five interactive diagrams; honesty notes on projects; per-product store links; the four articles; accessible markup and the test suites.

## 2. Strategy for version 2

1. **Lead with the products.** The hero shows real screens and an icon shelf of all eleven apps before any paragraph ends. The statistics column goes.
2. **Let the apps supply the colour.** The site chrome is neutral; each featured app gets a full-bleed panel in its own brand colour with large screens. The portfolio looks like the work.
3. **Vary the compositions.** Labeeny: two apps side by side. EdTech family: a scroll-driven story where one sticky phone changes app and colour as you read. Min Bayty: a fan of three screens. Birdy Consults and Sayed: a two-up. The rest: a compact list.
4. **Put engineering into every showcase.** Each panel carries three verified "what I engineered" lines.
5. **Show the backend.** A dark "systems" section presents the Node.js backends from the public repositories, the GraphQL work and the architecture playbook, with the diagrams.
6. **Make learning and teaching evidential.** A learning log ties each technology adopted to the project where it shipped; documentation artefacts and articles show the explaining.
7. **Eight-step case studies** (Problem, Constraints, Architecture, Decisions, Implementation, Challenges, Results, Lessons) with the diagram inside Architecture; app case studies gain an Architecture section.
8. **Ship as static files** to GitHub Pages: static export, static OG images and sitemap, no server.

## 3. Design system

**Concept: the work is the colour.** A quiet, precise, neutral frame, and inside it the saturated identities of the products themselves.

| Token | Light | Dark | Use |
|---|---|---|---|
| `paper` | `#FAFAF8` | `#0E0F10` | page |
| `surface` | `#EFEFEB` | `#17191B` | panels, galleries |
| `ink` | `#121314` | `#EDEDEA` | text, primary buttons |
| `muted` | `#4A4D52` | `#A6A8A3` | secondary text |
| `rule` | `#DCDCD6` | `#2A2D30` | lines |
| `laurel` | `#0A6E4F` | `#8FC9AE` | links, focus, the one accent |
| product colours | from each app | same | full-bleed showcase panels only |

Text on a product colour is black or white, chosen by luminance at build time.

**Type.** Readex Pro, one variable family for Latin and Arabic, so bilingual product names share one voice. Display at weight 600 with tight tracking; body at 400. Geist Mono only for code.

**Layout.** 12-column grid, 1280 px content width, full-bleed product panels. Left-aligned text; asymmetric splits that change per product.

**Motion.** One orchestrated hero entrance; product screens drift slightly against the scroll using CSS scroll-driven animation; the EdTech story crossfades screens and colours; app icons morph into case-study headers with React view transitions. No motion library. Everything collapses to instant under `prefers-reduced-motion`.
