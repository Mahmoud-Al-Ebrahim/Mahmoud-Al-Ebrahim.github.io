import type { ProductFamilyInput } from "./schema";

export const families: ProductFamilyInput[] = [
  {
    slug: "fahim-edtech",
    name: "Fahim, Atmtha and Coursaty",
    nameAr: "فهيم · اتمتها · كورساتي",
    tagline: "A four-app exam-prep and course platform for Syrian students, on both stores.",
    publisher: "ProoTech",
    role: "led",
    year: 2025,
    brandColor: "#FBB040",
    members: ["fahim-bac", "fahim-uni", "atmtha", "coursaty"],
    summary:
      "Fahim BAC and Fahim Uni prepare secondary and university students for exams with MCQ banks, PDFs and videos. Atmtha generates timed baccalaureate exam forms. Coursaty is a course marketplace where teachers publish lectures and students subscribe with activation codes. One template, one team, four store products.",
    problem:
      "Syrian students needed exam practice and course content that works on cheap Android phones, on unreliable connections, and that can be sold offline through sell centres because card payments are not available.",
    audience: "Baccalaureate and university students in Syria; teachers and content administrators.",
    features: [
      "MCQ exam banks with multi-select scoring, timers and per-exam resume",
      "Server-generated timed exam forms with wrong-answer review and statistics (Atmtha)",
      "Lectures as PDFs and streamed video with quality selection and offline downloads",
      "Prepaid QR and activation codes printed as sheets for sell centres",
      "Student, teacher and admin roles in a single binary",
      "Resumable Range downloads and resumable TUS uploads",
      "Screenshot blocking, clock-rollback and emulator detection, server-side account blocking",
      "Push notifications with background handling",
    ],
    stack: [
      "Flutter",
      "flutter_bloc",
      "HydratedBloc",
      "get_it + injectable",
      "go_router",
      "Dio",
      "dartz Either",
      "json_serializable",
      "Firebase Messaging",
      "Bunny Stream",
      "TUS",
    ],
    challenges: [
      {
        title: "Content had to survive bad connectivity",
        detail:
          "Students study on the bus and in areas with intermittent data. Every screen that mattered had to open from cache.",
      },
      {
        title: "Large files on small phones",
        detail: "Lecture PDFs and videos are tens of megabytes; downloads were interrupted constantly and had to resume, not restart.",
      },
      {
        title: "Paid content is shared by screenshots and emulators",
        detail: "Prepaid codes are the revenue model, so copied content and shared accounts directly cost the publisher.",
      },
      {
        title: "Four products, one small team",
        detail: "Each product needed its own branding and content model but could not afford four separate architectures.",
      },
    ],
    solutions: [
      {
        title: "HydratedBloc as the offline store",
        detail:
          "Whole feature states are serialized with json_serializable and restored on cold start; a version constant clears stale caches on upgrade. Atmtha prefetches subjects, units, lessons and questions with a throttled pool and a visible progress indicator.",
      },
      {
        title: "Range downloads and TUS uploads",
        detail:
          "A streaming download service with HTTP Range resume and cancel tokens writes into the app sandbox; teachers upload video with a resumable TUS client, and the app persists downloaded course models so lectures open fully offline.",
      },
      {
        title: "Layered anti-abuse",
        detail:
          "FLAG_SECURE blocks screenshots app-wide; a persisted clock high-water mark detects date rollback; emulator detection combines physical-device checks, a screen-lock requirement and a brand/hardware blacklist; the server can block an account and the app re-checks on every reconnect; Atmtha binds requests to a device id.",
      },
      {
        title: "One template, cloned deliberately",
        detail:
          "A feature-first Clean Architecture with typed generic HTTP clients, an Either failure channel, injectable DI and go_router was built once and cloned per product, keeping the core identical so fixes port by diff.",
      },
    ],
    results: [
      "Four apps shipped on Google Play, three of them also on the App Store, between early 2025 and October 2026; the same platform later carried Assas.",
      "Offline-first content, resumable media and code-based monetization delivered without a payment gateway.",
      "Owned requirements, planning and production releases as team lead and mobile architect.",
    ],
    contribution:
      "Team lead and mobile architect. Authored the Fahim BAC, Fahim Uni, Assas and Coursaty codebases almost entirely, and the caching, download and anti-abuse layer of Atmtha. Collaborators handled iOS build configuration and part of Atmtha's UI.",
    highlights: [
      "One feature-first Clean Architecture template, cloned per product so fixes port by diff",
      "Offline-first content with HydratedBloc, resumable Range downloads and resumable TUS uploads",
      "Prepaid QR and activation codes instead of card payments, printed in-app for sell centres",
      "Screenshot blocking, clock-rollback and emulator detection, and server-side account blocking",
    ],
    architecture:
      "Every app in the family is built on the same template: feature-first data, domain and presentation layers; typed generic HTTP clients (GetClient<T>, PostClient<T>) that route each request to the right server and attach the session; an exception mixin that maps every failure to an Either value; get_it and injectable for dependency injection; go_router; and Bloc, with HydratedBloc where content must survive restarts.\n\nMedia is the heavy path. Lectures and videos stream from Bunny with access headers and download through a Range-resumable, cancellable service into the app sandbox. Teachers in Coursaty upload video with a resumable TUS client. Paid content is unlocked with prepaid codes redeemed against the backend, and the server can block an account, which the app re-checks on every reconnect.",
    related: ["assas", "min-bayty"],
  },
];
