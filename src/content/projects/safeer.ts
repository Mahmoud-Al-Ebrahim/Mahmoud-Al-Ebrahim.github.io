import type { ProjectInput } from "../schema";

export const safeer: ProjectInput = {
  slug: "safeer",
  name: "Safeer",
  tagline: "Customer and captain in one delivery app, built as a Clean Architecture reference.",
  year: 2025,
  kind: "mobile",
  role: "Flutter developer",
  context: "ProoTech",
  summary:
    "A two-sided delivery app where the role is chosen at login: customers browse nearby stores, keep a Hive cart, order, pay from a wallet and chat with their driver; captains accept orders on a live map and watch earnings. Fourteen features, eighteen Blocs and forty-nine use cases sit on a generic repository wrapper that removed almost all data-layer boilerplate.",
  stack: ["Flutter", "flutter_bloc", "get_it + injectable", "go_router", "Dio", "dartz Either", "Hive", "Socket.IO", "Google Maps", "Firebase Messaging", "fl_chart"],
  metrics: [
    { label: "Dart files", value: "348" },
    { label: "Lines", value: "26,400" },
    { label: "Blocs", value: "18" },
    { label: "Use cases", value: "49" },
    { label: "DI registrations", value: "98" },
  ],
  diagram: "clean-architecture",
  honesty: [
    "English is declared but strings are Arabic-only; localization is nominal.",
    "The Socket.IO chat lives in the page widget rather than the data layer.",
    "Tests are limited to a generated asset-existence check.",
  ],
  narrative: {
    problem: "Two personas with different navigation, data and permissions had to ship as one binary without the data layer doubling in size.",
    requirements:
      "Customer: catalog, nearby stores, cart that survives restarts, orders, reviews, addresses on Google Maps, wallet, favorites, driver chat. Captain: order acceptance, live map, emergency screen, earnings charts, payment history. Push notifications routed by role.",
    constraints: "A REST API plus Socket.IO. Arabic-first UI on a 375-point design grid. Offline reads expected for the cart and recently viewed data.",
    architecture:
      "Feature-first Clean Architecture: data sources, repositories, use cases, Blocs and pages per feature; a core with API consumer, failures, injection, theme and shared widgets; two navigation bars chosen by the persisted role.",
    decisions:
      "A single generic NetworkRepository.call<T> performs the connectivity check, remote call, optional cache write and local fallback and maps exceptions to typed failures, so each feature repository is a one-line delegation. A BlocStateData<T> wrapper with a builder widget standardizes init, loading, success and failed states and their default UI across all eighteen Blocs. Hive stores the cart with generated adapters; tokens live in secure storage.",
    implementation:
      "injectable generates a 515-line DI graph from 98 annotations. go_router hosts a nested route tree with static path constants per screen. FCM subscribes to user, captain or all-users topics with an APNs retry loop. Spider generates asset constants with an existence test.",
    challenges: "Avoiding fourteen copies of the same try-catch-map code. Keeping two personas from leaking into each other's screens.",
    solutions: "The generic repository call and the state wrapper; role stored once and read by the splash router and the navigation shells.",
    results: "A production-structured two-sided app in 26,000 lines with repositories that read as a list of one-liners.",
    lessons: "The generic call wrapper is the pattern reused in later apps; the chat socket should have been a data source from day one so it could be tested and reconnected centrally.",
  },
};
