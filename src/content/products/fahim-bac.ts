import type { ProductInput } from "../schema";

export const fahimBac: ProductInput = {
  slug: "fahim-bac",
  name: "Fahim BAC",
  nameAr: "فهيم bac",
  tagline: "Baccalaureate science prep: MCQ banks, PDFs and video, unlocked by QR codes.",
  domain: "education",
  publisher: "ProoTech",
  role: "led",
  year: 2025,
  family: "fahim-edtech",
  stores: {
    play: { packageId: "com.company.fhymBacaloria" },
    appStore: { id: "6747139346", country: "us" },
  },
  brandColor: "#FBB040",
  icon: "/apps/fahim-bac/icon.webp",
  screenshots: ["/apps/fahim-bac/shot-3.webp", "/apps/fahim-bac/shot-4.webp", "/apps/fahim-bac/shot-2.webp", "/apps/fahim-bac/shot-1.webp"],
  summary:
    "Fahim BAC gives Syrian secondary-school students practice material in the core sciences as MCQ exams, PDF lectures and videos. A free tier is available on sign-up; paid content is unlocked by scanning QR codes bought at sell centres.",
  problem: "Students needed exam practice that works offline on low-end phones and can be bought without a bank card.",
  audience: "Baccalaureate students in Syria.",
  features: [
    "Materials, units, lessons and question groups with multi-select scoring",
    "Countdown or count-up exam timers and per-exam resume",
    "PDF lectures and streamed video with offline downloads",
    "QR-code redemption of prepaid content and a sell-centre directory",
    "Favorites and shareable question deep links",
    "Admin dashboard in the same binary for content and code management",
  ],
  stack: ["Flutter", "flutter_bloc", "HydratedBloc", "injectable", "go_router", "Syncfusion PDF", "Bunny Stream"],
  challenges: [],
  solutions: [],
  results: ["On Google Play and the App Store since June 2025; version 2.x."],
  contribution: "Authored the codebase and led releases; see the family case study.",
  highlights: [
    "Offline-first content: whole Bloc states persisted with HydratedBloc and cleared by a version constant",
    "Resumable PDF and video downloads over HTTP Range with cancel tokens",
    "Admin dashboard in the same binary generates printable QR code sheets for sell centres",
  ],
  related: ["fahim-edtech"],
};
