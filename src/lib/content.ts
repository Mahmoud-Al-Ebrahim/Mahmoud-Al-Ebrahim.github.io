import {
  ArticleSchema,
  EducationEntrySchema,
  ExperienceEntrySchema,
  ProductFamilySchema,
  ProductSchema,
  ProjectSchema,
  TeachingFactSchema,
  type Article,
  type EducationEntry,
  type ExperienceEntry,
  type Product,
  type ProductFamily,
  type Project,
  type TeachingFact,
} from "@/content/schema";
import { products as productInputs } from "@/content/products";
import { families as familyInputs } from "@/content/families";
import { projects as projectInputs } from "@/content/projects";
import { experience as experienceInputs } from "@/content/experience";
import { awards as awardInputs, education as educationInputs } from "@/content/education";
import { teaching as teachingInputs } from "@/content/teaching";
import { articles as articleInputs } from "@/content/writing";
import { artefacts as artefactInputs, learningLog as learningInputs, type Artefact, type LearningStep } from "@/content/growth";
import { principles as principleInputs, tradeOffs as tradeOffInputs, type Principle, type TradeOff } from "@/content/philosophy";
import { languages as languageInputs, skills as skillInputs } from "@/content/skills";
import { about as aboutInput } from "@/content/about";
import { siteConfig } from "@/content/site";
import { productsAr } from "@/content/ar/products";
import { familiesAr } from "@/content/ar/families";
import { projectsAr } from "@/content/ar/projects";
import { generalAr } from "@/content/ar/general";
import { articlesAr } from "@/content/ar/articles";
import { DEFAULT_LOCALE, localeHref, type Locale } from "@/i18n/config";

/**
 * All content is validated once at module load. A schema failure throws
 * during `next build`, so a missing store link or screenshot never renders
 * as an empty element.
 */
function parseAll<T>(label: string, schema: { parse: (v: unknown) => T }, inputs: unknown[]): T[] {
  return inputs.map((input, i) => {
    try {
      return schema.parse(input);
    } catch (err) {
      const id = (input as { slug?: string })?.slug ?? `#${i}`;
      throw new Error(`[content] ${label} "${id}" is invalid: ${(err as Error).message}`);
    }
  });
}

const PRODUCTS: Product[] = parseAll("product", ProductSchema, productInputs);
const FAMILIES: ProductFamily[] = parseAll("family", ProductFamilySchema, familyInputs);
const PROJECTS: Project[] = parseAll("project", ProjectSchema, projectInputs);
const EXPERIENCE: ExperienceEntry[] = parseAll("experience", ExperienceEntrySchema, experienceInputs);
const EDUCATION: EducationEntry[] = parseAll("education", EducationEntrySchema, educationInputs);
const TEACHING: TeachingFact[] = parseAll("teaching", TeachingFactSchema, teachingInputs);
const ARTICLES: Article[] = parseAll("article", ArticleSchema, articleInputs);

/* ------------------------------------------------------------------
   Arabic. English is the source of structure, links, images and store
   data; a translation replaces only words. A missing translation fails
   the build rather than rendering English inside an Arabic page.
------------------------------------------------------------------- */

function must<T>(value: T | undefined, what: string): T {
  if (value === undefined) throw new Error(`[content] missing Arabic translation for ${what}`);
  return value;
}

const PRODUCTS_AR: Product[] = PRODUCTS.map((p) => ({ ...p, ...must(productsAr[p.slug], `product "${p.slug}"`) }));
const FAMILIES_AR: ProductFamily[] = FAMILIES.map((f) => {
  const { name, ...t } = must(familiesAr[f.slug], `family "${f.slug}"`);
  return { ...f, ...t, nameAr: name };
});
const PROJECTS_AR: Project[] = PROJECTS.map((p) => {
  const t = must(projectsAr[p.slug], `project "${p.slug}"`);
  return {
    ...p,
    tagline: t.tagline,
    summary: t.summary,
    role: t.role,
    context: t.context,
    metrics: p.metrics.map((m, i) => ({
      label: must(t.metricLabels[i], `metric ${i} of "${p.slug}"`),
      value: t.metricValues?.[i] ?? m.value,
    })),
    honesty: t.honesty ?? p.honesty,
    narrative: t.narrative,
  };
});
const EXPERIENCE_AR: ExperienceEntry[] = EXPERIENCE.map((e, i) => ({ ...e, ...must(generalAr.experience[i], `experience ${i}`) }));
const EDUCATION_AR: EducationEntry[] = EDUCATION.map((e, i) => ({ ...e, ...must(generalAr.education[i], `education ${i}`) }));
const TEACHING_AR: TeachingFact[] = TEACHING.map((t, i) => ({ ...t, ...must(generalAr.teaching[i], `teaching ${i}`) }));
const ARTICLES_AR: Article[] = ARTICLES.map((a) => ({ ...a, ...must(articlesAr[a.slug], `article "${a.slug}"`) }));

function pick<T>(locale: Locale, en: T, ar: T): T {
  return locale === "ar" ? ar : en;
}

export const FEATURED_APP_ORDER = ["labeeny", "fahim-edtech", "min-bayty"] as const;
export const FEATURED_PROJECT_ORDER = ["gallery-ai", "trydos", "foodly"] as const;

export type AppEntry = ({ kind: "product" } & Product) | ({ kind: "family" } & ProductFamily);

export function getProducts(locale: Locale = DEFAULT_LOCALE): Product[] {
  return [...pick(locale, PRODUCTS, PRODUCTS_AR)].sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year);
}

export function getProduct(slug: string, locale: Locale = DEFAULT_LOCALE): Product | undefined {
  return pick(locale, PRODUCTS, PRODUCTS_AR).find((p) => p.slug === slug);
}

export function getFamilies(locale: Locale = DEFAULT_LOCALE): ProductFamily[] {
  return pick(locale, FAMILIES, FAMILIES_AR);
}

export function getFamily(slug: string, locale: Locale = DEFAULT_LOCALE): ProductFamily | undefined {
  return getFamilies(locale).find((f) => f.slug === slug);
}

export function getFamilyMembers(family: ProductFamily, locale: Locale = DEFAULT_LOCALE): Product[] {
  return family.members.map((m) => {
    const p = getProduct(m, locale);
    if (!p) throw new Error(`[content] family "${family.slug}" references unknown product "${m}"`);
    return p;
  });
}

/** Products that are not part of a family, plus families, for collection pages. */
export function getAppEntries(locale: Locale = DEFAULT_LOCALE): AppEntry[] {
  const standalone = getProducts(locale)
    .filter((p) => !p.family)
    .map((p) => ({ kind: "product" as const, ...p }));
  const families = getFamilies(locale).map((f) => ({ kind: "family" as const, ...f }));
  return [...standalone, ...families].sort((a, b) => b.year - a.year);
}

export function getAppEntry(slug: string, locale: Locale = DEFAULT_LOCALE): AppEntry | undefined {
  const p = getProduct(slug, locale);
  if (p) return { kind: "product", ...p };
  const f = getFamily(slug, locale);
  if (f) return { kind: "family", ...f };
  return undefined;
}

export function getFeaturedApps(locale: Locale = DEFAULT_LOCALE): AppEntry[] {
  return FEATURED_APP_ORDER.map((slug) => {
    const entry = getAppEntry(slug, locale);
    if (!entry) throw new Error(`[content] featured app "${slug}" not found`);
    return entry;
  });
}

/** Every slug that gets an /apps/[slug] page. */
export function getAppSlugs(): string[] {
  return [...PRODUCTS.map((p) => p.slug), ...FAMILIES.map((f) => f.slug)];
}

/** Never expose a private repository URL. */
function publicRepoOnly(p: Project): Project {
  return p.repo && !p.repo.public ? { ...p, repo: undefined } : p;
}

/** Home-featured order first, then other featured projects, then the rest, newest first. */
export function getProjects(locale: Locale = DEFAULT_LOCALE): Project[] {
  const rank = (p: Project) => {
    const i = (FEATURED_PROJECT_ORDER as readonly string[]).indexOf(p.slug);
    if (i >= 0) return i;
    return p.featured ? FEATURED_PROJECT_ORDER.length : FEATURED_PROJECT_ORDER.length + 1;
  };
  return pick(locale, PROJECTS, PROJECTS_AR)
    .map(publicRepoOnly)
    .sort((a, b) => rank(a) - rank(b) || b.year - a.year);
}

export function getProject(slug: string, locale: Locale = DEFAULT_LOCALE): Project | undefined {
  const p = pick(locale, PROJECTS, PROJECTS_AR).find((x) => x.slug === slug);
  return p ? publicRepoOnly(p) : undefined;
}

export function getFeaturedProjects(locale: Locale = DEFAULT_LOCALE): Project[] {
  return FEATURED_PROJECT_ORDER.map((slug) => {
    const p = getProject(slug, locale);
    if (!p) throw new Error(`[content] featured project "${slug}" not found`);
    return p;
  });
}

export function getExperience(locale: Locale = DEFAULT_LOCALE): ExperienceEntry[] {
  return [...pick(locale, EXPERIENCE, EXPERIENCE_AR)].sort((a, b) => (a.start < b.start ? 1 : -1));
}

export function getEducation(locale: Locale = DEFAULT_LOCALE): EducationEntry[] {
  return pick(locale, EDUCATION, EDUCATION_AR);
}

export function getTeaching(locale: Locale = DEFAULT_LOCALE): TeachingFact[] {
  return pick(locale, TEACHING, TEACHING_AR);
}

export function getArticles(locale: Locale = DEFAULT_LOCALE): Article[] {
  return [...pick(locale, ARTICLES, ARTICLES_AR)].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string, locale: Locale = DEFAULT_LOCALE): Article | undefined {
  return pick(locale, ARTICLES, ARTICLES_AR).find((a) => a.slug === slug);
}

/* General content: words from generalAr, internal links re-pointed into the locale. */

export function getSite(locale: Locale = DEFAULT_LOCALE) {
  return locale === "ar" ? { ...siteConfig, ...generalAr.site } : siteConfig;
}

export function getAwards(locale: Locale = DEFAULT_LOCALE): string[] {
  return pick(locale, awardInputs, generalAr.awards);
}

export function getPrinciples(locale: Locale = DEFAULT_LOCALE): Principle[] {
  return principleInputs.map((p, i) => {
    const t = locale === "ar" ? must(generalAr.principles[i], `principle ${i}`) : undefined;
    return {
      title: t?.title ?? p.title,
      body: t?.body ?? p.body,
      evidence: { label: t?.evidenceLabel ?? p.evidence.label, href: localeHref(locale, p.evidence.href) },
    };
  });
}

export function getTradeOffs(locale: Locale = DEFAULT_LOCALE): TradeOff[] {
  return tradeOffInputs.map((x, i) => {
    const t = locale === "ar" ? must(generalAr.tradeOffs[i], `trade-off ${i}`) : undefined;
    return {
      title: t?.title ?? x.title,
      situation: t?.situation ?? x.situation,
      options: t?.options ?? x.options,
      choice: t?.choice ?? x.choice,
      outcome: t?.outcome ?? x.outcome,
      project: { label: t?.projectLabel ?? x.project.label, href: localeHref(locale, x.project.href) },
    };
  });
}

export function getLearningLog(locale: Locale = DEFAULT_LOCALE): LearningStep[] {
  return learningInputs.map((s, i) => {
    const t = locale === "ar" ? must(generalAr.learningLog[i], `learning step ${i}`) : undefined;
    return {
      year: s.year,
      skill: t?.skill ?? s.skill,
      how: t?.how ?? s.how,
      evidence: { label: t?.evidenceLabel ?? s.evidence.label, href: localeHref(locale, s.evidence.href) },
    };
  });
}

export function getArtefacts(locale: Locale = DEFAULT_LOCALE): Artefact[] {
  return artefactInputs.map((a, i) => {
    const t = locale === "ar" ? must(generalAr.artefacts[i], `artefact ${i}`) : undefined;
    return { ...a, ...(t ?? {}), href: a.href ? localeHref(locale, a.href) : undefined };
  });
}

export function getSkills(locale: Locale = DEFAULT_LOCALE): { group: string; items: string[] }[] {
  return pick(locale, skillInputs, generalAr.skills);
}

export function getLanguages(locale: Locale = DEFAULT_LOCALE): { name: string; level: string }[] {
  return pick(locale, languageInputs, generalAr.languages);
}

export function getAbout(locale: Locale = DEFAULT_LOCALE): { background: string[]; teaching: string[] } {
  return pick(locale, aboutInput, generalAr.about);
}
