import type { ProductInput } from "../schema";

export const fahimUni: ProductInput = {
  slug: "fahim-uni",
  name: "Fahim Uni",
  nameAr: "فهيم uni",
  tagline: "The university edition of Fahim: lessons and question banks by college and year.",
  domain: "education",
  publisher: "ProoTech",
  role: "led",
  year: 2025,
  family: "fahim-edtech",
  stores: {
    play: { packageId: "com.company.fhymUniversity" },
    appStore: { id: "6747110179", country: "us" },
  },
  brandColor: "#FBB040",
  icon: "/apps/fahim-uni/icon.webp",
  screenshots: ["/apps/fahim-uni/shot-2.webp", "/apps/fahim-uni/shot-1.webp", "/apps/fahim-uni/shot-3.webp"],
  summary:
    "Fahim Uni brings the Fahim exam-prep model to university students. Content is organized by university, college and year instead of units and lessons, with the same MCQ, PDF and video formats and QR-code unlocking.",
  problem: "University students wanted the same practice format as the baccalaureate app, organized the way their faculties are.",
  audience: "University students in Syria.",
  features: [
    "University and college pickers driving the content tree",
    "MCQ banks, PDF lectures and videos",
    "Offline downloads and QR-code unlocking",
    "Password recovery and account tools",
  ],
  stack: ["Flutter", "flutter_bloc", "HydratedBloc", "injectable", "go_router"],
  challenges: [],
  solutions: [],
  results: ["On Google Play and the App Store; iOS release December 2025."],
  contribution: "A deliberate fork of the Fahim BAC codebase, authored and released by me; see the family case study.",
  highlights: [
    "A deliberate fork of the Fahim BAC codebase, re-modeled around universities and colleges",
    "Same offline-first content, download and QR-unlock pipeline",
  ],
  related: ["fahim-edtech"],
};
