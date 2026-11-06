import type { z } from "zod";
import type { ArticleSchema } from "./schema";

/**
 * Index of articles. The body of each lives at src/app/writing/<slug>/page.mdx.
 */
export const articles: z.input<typeof ArticleSchema>[] = [
  {
    slug: "clip-on-device-dart",
    title: "Running CLIP on a phone, in Dart",
    date: "2026-11-06",
    summary:
      "How a Flutter gallery app searches photos by description without a server: a hand-ported BPE tokenizer, two TFLite encoders behind a worker isolate, and an embedding cache keyed by file hash.",
    source: "Gallery AI",
    readingMinutes: 9,
  },
  {
    slug: "generic-network-repository",
    title: "One repository method to replace fourteen",
    date: "2026-11-06",
    summary:
      "A generic Either-returning call wrapper that checks connectivity, hits the remote source, falls back to cache and maps failures, so feature repositories shrink to one line each.",
    source: "Safeer and Min Bayty",
    readingMinutes: 7,
  },
  {
    slug: "tests-that-guard-architecture",
    title: "Tests that protect architecture, not just logic",
    date: "2026-11-06",
    summary:
      "Four source-scanning tests that fail when a Bloc event has no screen, a string is hardcoded Arabic, a sign-out forgets a Bloc, or a shell re-provides a root Bloc.",
    source: "fashion_store",
    readingMinutes: 6,
  },
  {
    slug: "prefetching-in-flutter",
    title: "Hiding latency with prefetching in Flutter",
    date: "2026-11-06",
    summary:
      "Fetching the next screen's data while the user is still on this one: where it helps, where it wastes bandwidth, and how to keep it cancellable.",
    source: "prefetch_technique_example",
    readingMinutes: 5,
  },
];
