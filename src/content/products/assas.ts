import type { ProductInput } from "../schema";

export const assas: ProductInput = {
  slug: "assas",
  name: "Assas",
  nameAr: "أساس",
  tagline: "Learn Arabic through interactive videos and tests.",
  domain: "education",
  publisher: "ProoTech",
  role: "developed",
  year: 2025,
  stores: { play: { packageId: "com.prootech.assas" } },
  brandColor: "#0070BA",
  icon: "/apps/assas/icon.webp",
  screenshots: ["/apps/assas/shot-1.webp", "/apps/assas/shot-2.webp", "/apps/assas/shot-3.webp", "/apps/assas/shot-4.webp"],
  summary:
    "Assas teaches the Arabic language through sections of video lessons, downloadable files and tests, including government-style practice exams. It reuses the Fahim platform's offline-first content delivery, QR-code unlocking and admin dashboard with a blue identity and a section-based content model.",
  problem: "Arabic learners needed structured lessons with tests that work offline and can be bought locally.",
  audience: "Arabic-language learners and students preparing for official tests.",
  features: [
    "Sections of video lessons and files",
    "Practice tests and full material tests",
    "Government test file library",
    "QR-code unlocking and sell centres",
    "Offline downloads",
    "Admin dashboard in the same binary",
  ],
  stack: ["Flutter", "flutter_bloc", "HydratedBloc", "injectable", "go_router", "Syncfusion PDF"],
  challenges: [],
  solutions: [],
  results: ["On Google Play; updated May 2026."],
  contribution: "Derived from the Fahim BAC codebase I authored; imported and adapted in December 2025.",
  highlights: [
    "Built on the Fahim platform: offline-first content, resumable downloads and QR-code unlocking",
    "Content model reshaped into sections, government test files and full-material tests",
  ],
  related: ["fahim-edtech"],
};
