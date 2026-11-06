import type { z } from "zod";
import type { ExperienceEntrySchema } from "./schema";

type Input = z.input<typeof ExperienceEntrySchema>;

export const experience: Input[] = [
  {
    company: "KwanX",
    role: "Senior Flutter Developer",
    start: "2026-01",
    end: "present",
    location: "Aleppo, Syria",
    bullets: [
      "Architected and delivered a production real-time, multi-role delivery platform (Labeeny customer and captain apps) with Flutter and GraphQL on Hasura.",
      "Designed a feature-first Clean Architecture with SOLID boundaries and a data layer built on GraphQL subscriptions, caching, optimistic updates and resilient error handling.",
      "Enforced code quality and delivery standards through Git workflows, GitLab CI/CD and structured task planning.",
    ],
    stack: ["Flutter", "Dart", "GraphQL", "Hasura", "GitLab CI/CD"],
  },
  {
    company: "Prootech",
    role: "Senior Flutter Developer",
    start: "2025-03",
    end: "2026-01",
    location: "Aleppo, Syria",
    bullets: [
      "Led the EdTech family (Fahim BAC, Fahim Uni, Atmtha, Coursaty, Assas): requirements, architecture, and production releases on both stores.",
      "Built the order lifecycle, Socket.IO chat, community feed and seller dashboard of the Min Bayty marketplace, and the subscription-driven Birdy Consults platform.",
      "Designed state management and data flows for carts, orders, analytics, offline access and real-time interactions across multi-feature applications.",
    ],
    stack: ["Flutter", "Bloc", "HydratedBloc", "injectable", "go_router", "Socket.IO", "Firebase"],
  },
  {
    company: "Ramaaz",
    role: "Flutter Team Leader",
    start: "2023-10",
    end: "2024-12",
    location: "Turkey (remote)",
    bullets: [
      "Led architecture and delivery of production eCommerce and delivery apps published on the App Store and Google Play.",
      "Implemented offline-first systems, multi-backend integration and API optimizations; extended third-party packages where the ecosystem fell short.",
      "Drove cross-team collaboration and release quality.",
    ],
    stack: ["Flutter", "Bloc", "Dio", "Firebase", "Sentry", "Smartlook"],
  },
  {
    company: "Ulu",
    role: "Flutter Developer",
    start: "2023-03",
    end: "2023-10",
    location: "Syria",
    bullets: [
      "Delivered features for production food-delivery platforms, including real-time order updates and backend integrations.",
      "Improved performance and stability across critical user flows and assisted with store deployments.",
    ],
    stack: ["Flutter", "GetX", "Firebase", "Google Maps"],
  },
  {
    company: "404 Developers",
    role: "Flutter Trainee",
    start: "2021-11",
    end: "2023-03",
    location: "Syria",
    bullets: [
      "Specialized in responsive and adaptive UI; applied Clean Architecture and TDD on a series of production-level mini applications.",
    ],
    stack: ["Flutter", "Clean Architecture", "TDD"],
  },
  {
    company: "Independent",
    role: "IT Instructor and Mentor",
    start: "2018-10",
    end: "present",
    location: "Aleppo, Syria",
    bullets: [
      "Trained more than 1000 students in Flutter, web development and general IT; taught algorithms and data structures.",
      "Created hands-on tutorials and workshops that carried learners from first app to finished project.",
      "Mentored 20+ junior Flutter developers and supervised 5+ senior graduation projects.",
    ],
    stack: ["Flutter", "Dart", "Algorithms", "Data structures"],
    teaching: true,
  },
];
