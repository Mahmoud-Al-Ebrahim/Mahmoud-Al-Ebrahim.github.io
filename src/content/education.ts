import type { z } from "zod";
import type { EducationEntrySchema } from "./schema";

export const education: z.input<typeof EducationEntrySchema>[] = [
  {
    institution: "Aleppo University",
    degree: "M.Sc. Software Engineering",
    start: "2023",
    end: "present",
  },
  {
    institution: "Aleppo University",
    degree: "B.Sc. Software Engineering",
    start: "2017",
    end: "2022",
    note: "Ranked 12th in class.",
  },
];

export const awards = [
  "Top 10, College Programming Competition",
  "High rank, Syrian Collegiate Programming Contest (SCPC), two years",
];
