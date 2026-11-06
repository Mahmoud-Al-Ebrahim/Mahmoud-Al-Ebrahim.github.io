import type { z } from "zod";
import type { TeachingFactSchema } from "./schema";

export const teaching: z.input<typeof TeachingFactSchema>[] = [
  {
    value: "1000+",
    label: "students taught",
    detail: "Flutter, web development, algorithms and data structures, since 2018.",
  },
  {
    value: "20+",
    label: "junior developers mentored",
    detail: "Code reviews, pairing and architecture walkthroughs on real product work.",
  },
  {
    value: "5+",
    label: "graduation projects supervised",
    detail: "Senior projects at Aleppo University, from scoping through defense.",
  },
];
