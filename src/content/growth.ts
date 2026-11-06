/**
 * Evidence for learning, teaching and explaining. Every entry points at
 * something that exists: a shipped app, a case study, a repository or an article.
 */

export type LearningStep = {
  year: string;
  skill: string;
  how: string;
  evidence: { label: string; href: string };
};

/** Technologies picked up on live projects, in order. */
export const learningLog: LearningStep[] = [
  {
    year: "2021",
    skill: "Clean Architecture and test-driven development",
    how: "Trainee work at 404 Developers, then rebuilt as a reference app with tests written first.",
    evidence: { label: "number_trivia_TDD on GitHub", href: "https://github.com/Mahmoud-Al-Ebrahim/number_trivia_TDD" },
  },
  {
    year: "2024",
    skill: "Bloc at scale: HydratedBloc, injectable, go_router, Either",
    how: "Introduced across a 90,000-line super-app with four backend services and end-to-end tests.",
    evidence: { label: "Trydos case study", href: "/projects/trydos" },
  },
  {
    year: "2024",
    skill: "Riverpod and functional error handling with fpdart",
    how: "A deliberate second paradigm, applied to a full community app rather than a demo.",
    evidence: { label: "Revo case study", href: "/projects/revo" },
  },
  {
    year: "2024",
    skill: "Hardware: NFC tag provisioning",
    how: "ISO 7816 tag sessions and vendor commands in an NFC business-card companion app.",
    evidence: { label: "Tiktag case study", href: "/projects/tiktag" },
  },
  {
    year: "2025",
    skill: "Node.js, Express and MongoDB aggregation",
    how: "Wrote the API behind four delivery apps: role-based JWT, order lifecycle, push fan-out, Atlas Search.",
    evidence: { label: "Foodly case study", href: "/projects/foodly" },
  },
  {
    year: "2025",
    skill: "On-device machine learning",
    how: "Ported CLIP's tokenizer to Dart and ran two TFLite encoders in a worker isolate.",
    evidence: { label: "Running CLIP on a phone, in Dart", href: "/writing/clip-on-device-dart" },
  },
  {
    year: "2025",
    skill: "Resumable media: HTTP Range downloads and TUS uploads",
    how: "Built for students on unreliable connections and teachers uploading long lectures.",
    evidence: { label: "EdTech family case study", href: "/apps/fahim-edtech" },
  },
  {
    year: "2026",
    skill: "SignalR, token rotation and architecture-guard tests",
    how: "A five-role marketplace client over an ASP.NET backend, with tests that read the source tree.",
    evidence: { label: "Tests that protect architecture", href: "/writing/tests-that-guard-architecture" },
  },
  {
    year: "2026",
    skill: "GraphQL subscriptions on Hasura",
    how: "The real-time data layer of a two-app delivery platform at KwanX.",
    evidence: { label: "Labeeny case study", href: "/apps/labeeny" },
  },
];

export type Artefact = { title: string; detail: string; source: string; href?: string };

/** Documentation written for other engineers. */
export const artefacts: Artefact[] = [
  {
    title: "A Bloc and API guide for a five-role client",
    detail: "Maps 97 endpoints to the Blocs that call them and documents the one Bloc template every feature follows.",
    source: "fashion_store",
  },
  {
    title: "An API reference for a case-management backend",
    detail: "Forty REST endpoints, the Socket.IO events and the standard error shapes, written in Arabic for the team that consumes it.",
    source: "Backend documentation work, 2026",
  },
  {
    title: "Use-case diagrams and a UML model",
    detail: "Authentication, chat and stories flows drawn before they were built, for a team of several developers.",
    source: "Trydos",
    href: "/projects/trydos",
  },
  {
    title: "Live-verified API contract notes",
    detail: "Every endpoint the Coursaty apps call, checked against the running NestJS backend and kept beside the code.",
    source: "Coursaty",
    href: "/apps/coursaty",
  },
];
