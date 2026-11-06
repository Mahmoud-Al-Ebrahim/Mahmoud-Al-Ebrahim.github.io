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
import { education as educationInputs } from "@/content/education";
import { teaching as teachingInputs } from "@/content/teaching";
import { articles as articleInputs } from "@/content/writing";

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

export const FEATURED_APP_ORDER = ["labeeny", "fahim-edtech", "min-bayty"] as const;
export const FEATURED_PROJECT_ORDER = ["gallery-ai", "trydos", "foodly"] as const;

export type AppEntry = ({ kind: "product" } & Product) | ({ kind: "family" } & ProductFamily);

export function getProducts(): Product[] {
  return [...PRODUCTS].sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year);
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFamilies(): ProductFamily[] {
  return FAMILIES;
}

export function getFamily(slug: string): ProductFamily | undefined {
  return FAMILIES.find((f) => f.slug === slug);
}

export function getFamilyMembers(family: ProductFamily): Product[] {
  return family.members.map((m) => {
    const p = getProduct(m);
    if (!p) throw new Error(`[content] family "${family.slug}" references unknown product "${m}"`);
    return p;
  });
}

/** Products that are not part of a family, plus families, for collection pages. */
export function getAppEntries(): AppEntry[] {
  const standalone = getProducts()
    .filter((p) => !p.family)
    .map((p) => ({ kind: "product" as const, ...p }));
  const families = FAMILIES.map((f) => ({ kind: "family" as const, ...f }));
  return [...standalone, ...families].sort((a, b) => b.year - a.year);
}

export function getAppEntry(slug: string): AppEntry | undefined {
  const p = getProduct(slug);
  if (p) return { kind: "product", ...p };
  const f = getFamily(slug);
  if (f) return { kind: "family", ...f };
  return undefined;
}

export function getFeaturedApps(): AppEntry[] {
  return FEATURED_APP_ORDER.map((slug) => {
    const entry = getAppEntry(slug);
    if (!entry) throw new Error(`[content] featured app "${slug}" not found`);
    return entry;
  });
}

/** Every slug that gets an /apps/[slug] page. */
export function getAppSlugs(): string[] {
  return [...PRODUCTS.map((p) => p.slug), ...FAMILIES.map((f) => f.slug)];
}

/** Home-featured order first, then other featured projects, then the rest, newest first. */
export function getProjects(): Project[] {
  const rank = (p: Project) => {
    const i = (FEATURED_PROJECT_ORDER as readonly string[]).indexOf(p.slug);
    if (i >= 0) return i;
    return p.featured ? FEATURED_PROJECT_ORDER.length : FEATURED_PROJECT_ORDER.length + 1;
  };
  return [...PROJECTS].sort((a, b) => rank(a) - rank(b) || b.year - a.year);
}

export function getProject(slug: string): Project | undefined {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return undefined;
  // Never expose a private repository URL.
  if (p.repo && !p.repo.public) return { ...p, repo: undefined };
  return p;
}

export function getFeaturedProjects(): Project[] {
  return FEATURED_PROJECT_ORDER.map((slug) => {
    const p = getProject(slug);
    if (!p) throw new Error(`[content] featured project "${slug}" not found`);
    return p;
  });
}

export function getExperience(): ExperienceEntry[] {
  return [...EXPERIENCE].sort((a, b) => (a.start < b.start ? 1 : -1));
}

export function getEducation(): EducationEntry[] {
  return EDUCATION;
}

export function getTeaching(): TeachingFact[] {
  return TEACHING;
}

export function getArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
