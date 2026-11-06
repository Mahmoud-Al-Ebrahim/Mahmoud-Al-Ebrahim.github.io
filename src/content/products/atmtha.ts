import type { ProductInput } from "../schema";

export const atmtha: ProductInput = {
  slug: "atmtha",
  name: "Atmtha",
  nameAr: "اتمتها",
  tagline: "Timed, server-generated baccalaureate exam forms with instant review.",
  domain: "education",
  publisher: "ProoTech",
  role: "contributed",
  year: 2025,
  family: "fahim-edtech",
  stores: { play: { packageId: "com.atmtha.app" } },
  brandColor: "#00B0DC",
  icon: "/apps/atmtha/icon.webp",
  screenshots: ["/apps/atmtha/shot-2.webp", "/apps/atmtha/shot-3.webp", "/apps/atmtha/shot-1.webp", "/apps/atmtha/shot-4.webp"],
  summary:
    "Atmtha simulates the Syrian baccalaureate's automated exam forms. The server generates an exam per subject, the app runs a per-question countdown with progress and sound feedback, scores each answer live, and ends with a result sheet and wrong-answer review.",
  problem: "Students had no way to rehearse the automated exam format under real time pressure, with an honest score at the end.",
  audience: "Baccalaureate students in Syria.",
  features: [
    "Server-generated exams per subject, unit and lesson",
    "Per-question countdown with progress ring and audio feedback",
    "Result sheet with wrong-answer review and statistics",
    "Code-activated exams and a sell-centre directory",
    "Offline caching of the whole subject tree with progress indicator",
    "In-app PDF files",
  ],
  stack: ["Flutter", "flutter_bloc", "HydratedBloc", "injectable", "Dio", "flutter_secure_storage"],
  challenges: [],
  solutions: [],
  results: ["On Google Play since 2025."],
  contribution:
    "Joined the team in April 2025 and built the caching and security layer: per-subject HydratedBloc cache with throttled prefetch, download progress, version-based cache clearing, in-app file display, and a device-id header to stop code sharing across accounts.",
  highlights: [
    "Per-subject HydratedBloc cache with a throttled prefetch pool and visible progress",
    "A device-id header on every request to stop prepaid codes being shared across accounts",
    "Version-based cache invalidation and in-app PDF display",
  ],
  related: ["fahim-edtech"],
};
