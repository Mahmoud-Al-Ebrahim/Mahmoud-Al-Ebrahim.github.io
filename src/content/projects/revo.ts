import type { ProjectInput } from "../schema";

export const revo: ProjectInput = {
  slug: "revo",
  name: "Revo",
  tagline: "A Reddit-style community app on Riverpod, fpdart and Firebase.",
  year: 2024,
  kind: "mobile",
  role: "Sole developer",
  context: "Personal project",
  summary:
    "Communities with moderators and invites, text, link, image and video posts, up and down votes plus six emoji reactions, threaded comments, a moderation queue, awards bought from a mock wallet, karma and friends. Built with Riverpod providers injecting Firebase SDKs into repositories and fpdart Either for failures, as a deliberate contrast to the Bloc-based production work.",
  stack: ["Flutter", "flutter_riverpod", "fpdart", "routemaster", "Firebase Auth", "Cloud Firestore", "Firebase Storage", "Firebase Messaging"],
  metrics: [
    { label: "Dart files", value: "81" },
    { label: "Lines", value: "9,400" },
    { label: "Providers", value: "24" },
  ],
  repo: { url: "https://github.com/Mahmoud-Al-Ebrahim/revo", public: true },
  honesty: ["No automated tests; payments are a UI mock with no gateway."],
  narrative: {
    problem: "Learn and demonstrate a second state-management paradigm on a feature-rich app rather than a counter.",
    requirements: "Google and guest sign-in, communities, posts of four types, votes and reactions, comments and replies, moderation, awards, notifications, light and dark themes, web support.",
    constraints: "Firebase as the only backend; everything in Firestore security rules and client logic.",
    architecture: "Feature-first folders with controller, repository, screens and widgets. Firebase instances are exposed as providers and injected into repositories, which return Either through FutureEither typedefs; controllers are StateNotifiers for loading state and expose data via family StreamProviders.",
    decisions: "Make SDKs swappable at the provider level for testability. Switch the whole route map on auth state with routemaster. Model reactions as per-reaction uid lists on the post document to keep reads cheap.",
    implementation: "Posts, communities, comments and notifications are Firestore collections with streaming queries; uploads go through a storage repository; FCM delivers push with local notifications in the foreground.",
    challenges: "Keeping the data layer honest about failures when SDK calls throw in different ways.",
    solutions: "A single Failure type and typedefs used at every repository boundary so controllers fold uniformly.",
    results: "A complete community app and a reference for Riverpod-based injection alongside the Bloc projects.",
    lessons: "Riverpod's provider graph makes repository injection trivial; the project would benefit most from tests that use that injection.",
  },
};
