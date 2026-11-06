import { z } from "zod";

export const RoleSchema = z.enum(["led", "built", "contributed", "developed"]);
export type Role = z.infer<typeof RoleSchema>;

export const DomainSchema = z.enum(["delivery", "education", "commerce", "health", "humanitarian", "fintech"]);
export type Domain = z.infer<typeof DomainSchema>;

export const DOMAIN_LABELS: Record<Domain, string> = {
  delivery: "Delivery",
  education: "Education",
  commerce: "Commerce",
  health: "Health",
  humanitarian: "Humanitarian",
  fintech: "Payments",
};

export const ROLE_LABELS: Record<Role, string> = {
  led: "Led and architected",
  built: "Built end to end",
  contributed: "Core contributor",
  developed: "Flutter developer",
};

const hex = z.string().regex(/^#[0-9A-Fa-f]{6}$/, "brandColor must be a 6-digit hex color");
const slug = z.string().regex(/^[a-z0-9-]+$/, "slug must be lowercase kebab-case");
const publicPath = z.string().startsWith("/", "asset paths are served from /public");

export const StoreLinksSchema = z
  .object({
    play: z.object({ packageId: z.string().min(3) }).optional(),
    appStore: z.object({ id: z.string().regex(/^\d+$/), country: z.enum(["us", "ae"]) }).optional(),
  })
  .refine((s) => Boolean(s.play || s.appStore), { message: "a product needs at least one store link" });
export type StoreLinks = z.infer<typeof StoreLinksSchema>;

const Pair = z.object({ title: z.string().min(3), detail: z.string().min(10) });

export const ProductSchema = z.object({
  slug,
  name: z.string().min(2),
  nameAr: z.string().optional(),
  tagline: z.string().min(10).max(90),
  domain: DomainSchema,
  publisher: z.string().min(2),
  role: RoleSchema,
  /** Precise role wording shown instead of the generic label, e.g. "Senior Flutter developer, KwanX". */
  roleLabel: z.string().min(3).optional(),
  year: z.number().int().min(2020).max(2030),
  stores: StoreLinksSchema,
  brandColor: hex,
  icon: publicPath,
  screenshots: z.array(publicPath).min(1).max(6),
  /** "framed" draws a phone around raw screen captures; "flat" shows store composites as-is. */
  screenshotStyle: z.enum(["framed", "flat"]).default("framed"),
  family: slug.optional(),
  featured: z.boolean().default(false),
  summary: z.string().min(40),
  problem: z.string().min(1),
  audience: z.string().min(1),
  features: z.array(z.string().min(3)).min(3).max(8),
  stack: z.array(z.string().min(2)).min(1),
  challenges: z.array(Pair),
  solutions: z.array(Pair),
  results: z.array(z.string().min(5)),
  contribution: z.string().min(1),
  /** Two to four verified "what I engineered" lines for showcase panels. */
  highlights: z.array(z.string().min(10)).min(2).max(4),
  /** How the app is built: layers, state, backend integration. Paragraphs split on blank lines. */
  architecture: z.string().min(40).optional(),
  related: z.array(slug).optional(),
});
export type Product = z.infer<typeof ProductSchema>;
export type ProductInput = z.input<typeof ProductSchema>;

export const ProductFamilySchema = z.object({
  slug,
  name: z.string().min(2),
  nameAr: z.string().optional(),
  tagline: z.string().min(10).max(90),
  publisher: z.string().min(2),
  role: RoleSchema,
  year: z.number().int(),
  brandColor: hex,
  members: z.array(slug).min(2),
  summary: z.string().min(40),
  problem: z.string().min(1),
  audience: z.string().min(1),
  features: z.array(z.string().min(3)).min(3).max(10),
  stack: z.array(z.string().min(2)).min(1),
  challenges: z.array(Pair),
  solutions: z.array(Pair),
  results: z.array(z.string().min(5)),
  contribution: z.string().min(1),
  highlights: z.array(z.string().min(10)).min(2).max(4),
  architecture: z.string().min(40).optional(),
  related: z.array(slug).optional(),
});
export type ProductFamily = z.infer<typeof ProductFamilySchema>;
export type ProductFamilyInput = z.input<typeof ProductFamilySchema>;

export const DiagramIdSchema = z.enum([
  "clean-architecture",
  "multi-backend",
  "clip-pipeline",
  "order-lifecycle",
  "test-guards",
]);
export type DiagramId = z.infer<typeof DiagramIdSchema>;

export const NarrativeSchema = z.object({
  problem: z.string().min(1),
  requirements: z.string().min(1),
  constraints: z.string().min(1),
  architecture: z.string().min(1),
  decisions: z.string().min(1),
  implementation: z.string().min(1),
  challenges: z.string().min(1),
  solutions: z.string().min(1),
  results: z.string().min(1),
  lessons: z.string().min(1),
});
export type Narrative = z.infer<typeof NarrativeSchema>;

/** The eight steps a case study is rendered in. Requirements fold into Problem, solutions into Challenges. */
export const NARRATIVE_ORDER: { label: string; keys: (keyof Narrative)[] }[] = [
  { label: "Problem", keys: ["problem", "requirements"] },
  { label: "Constraints", keys: ["constraints"] },
  { label: "Architecture", keys: ["architecture"] },
  { label: "Decisions", keys: ["decisions"] },
  { label: "Implementation", keys: ["implementation"] },
  { label: "Challenges", keys: ["challenges", "solutions"] },
  { label: "Results", keys: ["results"] },
  { label: "Lessons learned", keys: ["lessons"] },
];

export const ProjectSchema = z.object({
  slug,
  name: z.string().min(2),
  tagline: z.string().min(10).max(110),
  year: z.number().int(),
  kind: z.enum(["mobile", "fullstack", "backend", "ml", "hardware"]),
  featured: z.boolean().default(false),
  summary: z.string().min(40),
  stack: z.array(z.string().min(2)).min(1),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).max(6),
  narrative: NarrativeSchema,
  diagram: DiagramIdSchema.optional(),
  repo: z.object({ url: z.string().url(), public: z.boolean() }).optional(),
  screenshots: z.array(publicPath).max(6).default([]),
  honesty: z.array(z.string().min(10)).optional(),
  role: z.string().min(3),
  context: z.string().min(3),
});
export type Project = z.infer<typeof ProjectSchema>;
export type ProjectInput = z.input<typeof ProjectSchema>;

const ym = z.string().regex(/^\d{4}-\d{2}$/);

export const ExperienceEntrySchema = z.object({
  company: z.string(),
  role: z.string(),
  start: ym,
  end: ym.or(z.literal("present")),
  location: z.string(),
  bullets: z.array(z.string().min(10)).min(1),
  stack: z.array(z.string()),
  teaching: z.boolean().default(false),
});
export type ExperienceEntry = z.infer<typeof ExperienceEntrySchema>;

export const EducationEntrySchema = z.object({
  institution: z.string(),
  degree: z.string(),
  start: z.string(),
  end: z.string(),
  note: z.string().optional(),
});
export type EducationEntry = z.infer<typeof EducationEntrySchema>;

export const TeachingFactSchema = z.object({
  value: z.string(),
  label: z.string(),
  detail: z.string(),
});
export type TeachingFact = z.infer<typeof TeachingFactSchema>;

export const ArticleSchema = z.object({
  slug,
  title: z.string().min(5),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  summary: z.string().min(40),
  source: z.string().min(2),
  readingMinutes: z.number().int().positive(),
});
export type Article = z.infer<typeof ArticleSchema>;
