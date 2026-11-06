import { z } from "zod";

/**
 * Arabic translations of the site content. English in src/content/* is the
 * source of truth for structure, links, images and store data; a translation
 * supplies only the words, in the same order and with the same array lengths.
 * Tests in src/content/__tests__/translations.test.ts enforce completeness.
 */

const Pair = z.object({ title: z.string().min(2), detail: z.string().min(5) });

export const ProductTranslationSchema = z.object({
  /** Only when the English product has a roleLabel. */
  roleLabel: z.string().min(2).optional(),
  tagline: z.string().min(8).max(120),
  summary: z.string().min(30),
  problem: z.string().min(1),
  audience: z.string().min(1),
  features: z.array(z.string().min(2)),
  challenges: z.array(Pair),
  solutions: z.array(Pair),
  results: z.array(z.string().min(3)),
  contribution: z.string().min(1),
  highlights: z.array(z.string().min(5)),
  /** Only when the English product has an architecture text. Paragraphs split on \n\n. */
  architecture: z.string().min(30).optional(),
});
export type ProductTranslation = z.infer<typeof ProductTranslationSchema>;

export const FamilyTranslationSchema = ProductTranslationSchema.omit({ roleLabel: true }).extend({
  /** Arabic display name of the family. */
  name: z.string().min(2),
});
export type FamilyTranslation = z.infer<typeof FamilyTranslationSchema>;

export const ProjectTranslationSchema = z.object({
  tagline: z.string().min(8).max(140),
  summary: z.string().min(30),
  role: z.string().min(3),
  context: z.string().min(3),
  /** Translated metric labels, same order as the English metrics. Values are reused. */
  metricLabels: z.array(z.string().min(1)),
  /** Only for metric values that contain words; numbers are reused as they are. */
  metricValues: z.array(z.string().min(1).optional()).optional(),
  honesty: z.array(z.string().min(5)).optional(),
  narrative: z.object({
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
  }),
});
export type ProjectTranslation = z.infer<typeof ProjectTranslationSchema>;

export const ExperienceTranslationSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(2),
  location: z.string().min(2),
  bullets: z.array(z.string().min(5)),
});
export type ExperienceTranslation = z.infer<typeof ExperienceTranslationSchema>;

export const ArticleTranslationSchema = z.object({
  title: z.string().min(5),
  summary: z.string().min(20),
  source: z.string().min(2),
});

/** Everything that is not a product, family or project, in one object. */
export const GeneralTranslationSchema = z.object({
  site: z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    currentRole: z.string(),
    availability: z.string(),
  }),
  experience: z.array(ExperienceTranslationSchema),
  education: z.array(z.object({ institution: z.string(), degree: z.string(), start: z.string(), end: z.string(), note: z.string().optional() })),
  awards: z.array(z.string()),
  teaching: z.array(z.object({ label: z.string(), detail: z.string() })),
  principles: z.array(z.object({ title: z.string(), body: z.string(), evidenceLabel: z.string() })),
  tradeOffs: z.array(
    z.object({
      title: z.string(),
      situation: z.string(),
      options: z.array(z.string()),
      choice: z.string(),
      outcome: z.string(),
      projectLabel: z.string(),
    }),
  ),
  learningLog: z.array(z.object({ skill: z.string(), how: z.string(), evidenceLabel: z.string() })),
  artefacts: z.array(z.object({ title: z.string(), detail: z.string(), source: z.string() })),
  skills: z.array(z.object({ group: z.string(), items: z.array(z.string()) })),
  languages: z.array(z.object({ name: z.string(), level: z.string() })),
  about: z.object({
    background: z.array(z.string()),
    teaching: z.array(z.string()),
  }),
  articles: z.record(z.string(), ArticleTranslationSchema),
});
export type GeneralTranslation = z.infer<typeof GeneralTranslationSchema>;
