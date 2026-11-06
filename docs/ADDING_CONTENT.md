# Adding and updating content

All content is typed TypeScript under `src/content/` and validated with Zod at build time. A missing field or a bad store id fails `npm run build` with a message that names the entry.

## Add a published app

1. Create `src/content/products/<slug>.ts` exporting a `ProductInput` (copy `atmtha.ts` as a template). Required fields are documented in `src/content/schema.ts`. Rules:
   - at least one of `stores.play` or `stores.appStore`;
   - 1–6 screenshots; `summary` is two or three sentences; `features` 3–8 items;
   - `role` is `led`, `built`, `contributed` or `developed`; `roleLabel` overrides the wording (for example "Senior Flutter developer, KwanX");
   - `highlights` are two to four verified "what I engineered" lines shown on the showcase panel and case study;
   - `architecture` (optional) is the Architecture section of the case study; separate paragraphs with a blank line (`

`);
   - `brandColor` is the product's own color; panels use it full-bleed and adjust it automatically until text contrast passes 4.5:1;
   - `screenshotStyle: "flat"` shows store marketing composites without a second phone frame.
2. Add the export to `src/content/products/index.ts`.
3. Put assets in `public/apps/<slug>/`: `icon.webp` (512×512), `shot-1.webp` … (720px wide) and `shot-1@2x.webp` … (1080px wide). To convert from PNGs, run:

   ```bash
   npm run assets -- --from <folder-with-pngs>
   ```

   and add the package id to `SLUG_BY_PACKAGE` in `scripts/import-assets.ts`.
4. If the app belongs to a family (several apps sharing one case study), set `family: "<family-slug>"` and add the slug to that family's `members` in `src/content/families.ts`.
5. New apps appear automatically in the hero shelf, the "Also shipped" list and `/apps`. To give one its own showcase panel, add it to `src/components/sections/shipped.tsx` (for example to the two-up `DUO` list) and to `SHELF_ORDER` in `src/app/page.tsx`.
6. Run `npm run og` (share images), `npm test -- --run` (content integrity, contrast and asset checks) and `npm run build`.

## Add an engineering project

1. Create `src/content/projects/<slug>.ts` exporting a `ProjectInput` (copy `mudhhila.ts`). The `narrative` object has ten fields rendered as eight steps: Problem (problem + requirements), Constraints, Architecture, Decisions, Implementation, Challenges (challenges + solutions), Results, Lessons. Separate paragraphs with `

`.
2. Optional `diagram` picks one of the diagrams in `src/components/diagrams/`. Optional `repo` with `public: false` keeps the URL out of the site.
3. `honesty` lists what the project does not do; keep it.
4. Add the export to `src/content/projects/index.ts`.

## Add an article

1. Add an entry to `src/content/writing.ts` (title, slug, date, summary, source, reading minutes).
2. Create `src/app/writing/<slug>/page.mdx` with the same slug, exporting `metadata` and wrapping the body in `<ArticleLayout slug="<slug>">`. Copy an existing article.

## Update experience, education, teaching, philosophy

Edit `src/content/experience.ts`, `education.ts`, `teaching.ts` and `philosophy.ts`. Experience entries are sorted newest first automatically; only one non-teaching entry may have `end: "present"`.

## Site-wide details

`src/content/site.ts` holds name, email, links, the CV path and the availability line. Replace `public/Mahmoud-AlEbrahim.pdf` to update the CV.

## Arabic

The site is bilingual: English at `/`, Arabic (right to left) at `/ar`. English content in `src/content/` is the source of structure, links, images and store data; the Arabic files in `src/content/ar/` supply only words, in the same order and with the same array lengths.

- **New or changed product, family or project:** update the matching entry in `src/content/ar/products.ts`, `families.ts` or `projects.ts`. A missing translation fails the build, and `src/i18n/__tests__/i18n.test.tsx` checks shapes and that numbers, links and store data match the English.
- **Experience, education, teaching, philosophy, learning log, skills, About text:** `src/content/ar/general.ts`, same order as the English files.
- **New article:** add the English MDX under `src/app/(en)/writing/<slug>/`, the Arabic MDX under `src/app/(ar)/ar/writing/<slug>/` (with `locale="ar"` on `ArticleLayout` and `buildMetadata`), and a title and summary in `src/content/ar/articles.ts`. Code blocks stay identical.
- **Interface words** (navigation, headings, labels): `src/i18n/dictionary.ts`. The Arabic dictionary is typed against the English one, so a missing key does not compile.
- **Pages** are thin wrappers around `src/views/*`; both languages render the same view with a different `locale`.

Style: Modern Standard Arabic, first person, technology names and code identifiers in Latin script, Western digits. Diagram drawings stay in English; their captions and legends are translated in `src/content/ar/diagrams.ts`. The CV PDF and share images are English only.
