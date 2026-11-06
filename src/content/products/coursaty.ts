import type { ProductInput } from "../schema";

export const coursaty: ProductInput = {
  slug: "coursaty",
  name: "Coursaty",
  nameAr: "كورساتي",
  tagline: "A course marketplace where teachers publish and students subscribe by code.",
  domain: "education",
  publisher: "ProoTech",
  role: "led",
  year: 2026,
  family: "fahim-edtech",
  stores: {
    play: { packageId: "com.YamanKartal.coursaty_app" },
    appStore: { id: "6780883400", country: "ae" },
  },
  brandColor: "#1F6366",
  icon: "/apps/coursaty/icon.webp",
  screenshots: ["/apps/coursaty/shot-1.webp", "/apps/coursaty/shot-2.webp", "/apps/coursaty/shot-3.webp", "/apps/coursaty/shot-4.webp"],
  summary:
    "Coursaty is a university course marketplace in one binary with two roles. Students browse programs, years and subjects, watch lectures with quality selection, download for offline study and subscribe with activation codes. Teachers create courses, upload video with resumable uploads, attach files and questions, and track revenue and withdrawals.",
  problem: "Teachers needed a way to sell structured courses to students without a payment gateway, and students needed lectures that keep playing offline.",
  audience: "University students and independent teachers in Syria.",
  features: [
    "Student and teacher roles in one app",
    "Lectures with video quality selection, files and MCQ checks",
    "Offline downloads that keep the whole course model available",
    "Activation-code subscriptions and points of sale",
    "Teacher course builder with resumable TUS video uploads",
    "Revenue, withdrawals and affiliations for teachers",
    "Emulator and screen-lock checks, clock-rollback detection, account blocking",
  ],
  stack: ["Flutter", "flutter_bloc", "HydratedBloc", "injectable", "go_router", "Dio", "TUS", "Bunny CDN", "NestJS backend"],
  challenges: [],
  solutions: [],
  results: ["On Google Play and the App Store since June 2026; version 2.2 in October 2026."],
  contribution: "Sole developer of the app, June to August 2026, including the July security improvements.",
  highlights: [
    "Teacher video uploads over resumable TUS to Bunny, with signed init and completion calls",
    "Downloaded courses keep their full data model, so lectures open with no connection",
    "Emulator blacklist, screen-lock requirement and clock-rollback detection protect paid content",
  ],
  related: ["fahim-edtech"],
};
