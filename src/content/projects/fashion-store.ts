import type { ProjectInput } from "../schema";

export const fashionStore: ProjectInput = {
  slug: "fashion-store",
  name: "fashion_store",
  tagline: "A five-role fashion marketplace client with tests that guard the architecture itself.",
  year: 2026,
  kind: "mobile",
  featured: true,
  role: "Sole developer",
  context: "Personal project over an ASP.NET backend",
  summary:
    "A 33,000-line Flutter client for a fashion marketplace with customers, store owners, payment employees and super admins. Beyond the product, it is a study in testing discipline: four source-scanning tests fail the build when an endpoint has no screen, a string is hardcoded Arabic, a sign-out forgets a Bloc, or a shell re-provides a root Bloc.",
  stack: ["Flutter", "flutter_bloc", "Dio", "SignalR", "easy_localization", "flutter_test"],
  metrics: [
    { label: "Dart files", value: "269" },
    { label: "Lines", value: "33,600" },
    { label: "Blocs", value: "17" },
    { label: "Endpoints", value: "97" },
    { label: "Test files", value: "13" },
  ],
  diagram: "test-guards",
  repo: { url: "https://github.com/Mahmoud-Al-Ebrahim/fashion_store", public: true },
  honesty: [
    "Blocs call the API service directly; there is no repository layer, and a few Blocs are over 500 lines.",
  ],
  narrative: {
    problem:
      "A marketplace client with five roles, ninety-seven endpoints and two languages is easy to break silently: a screen stops dispatching an event, an Arabic string sneaks into code, a Bloc keeps the previous user's data after sign-out.",
    requirements:
      "Customer catalog with color and size variants, cart, orders with cancellation rules, wallet top-ups via a WhatsApp desk, community posts, complaints with real-time chat. Store-owner dashboard with analytics and inventory alerts. Payment-employee desk. Super-admin KYC and user management. Arabic and English with 600 keys each.",
    constraints:
      "The backend's SignalR hub rejected WebSocket upgrades on its host and returned charset-less long-polling frames. Server timestamps arrived without an offset. Refresh tokens rotated on every refresh.",
    architecture:
      "Layer-first Blocs and models with feature folders for UI. One documented Bloc template: per-action status enums, copyWith state, a Clear event per Bloc. All Blocs are provided at the root on purpose so pushed routes can reach them. A generic API response envelope, null-tolerant JSON readers and a shared async view for loading, error and empty states.",
    decisions:
      "Treat architecture rules as tests. Four tests read the source tree: every endpoint-calling event is dispatched by some screen, locale files have identical keys and no hardcoded Arabic exists, every Bloc has a Clear event wired into sign-out, and no shell re-provides a root Bloc. A queued 401 interceptor refreshes once with the rotating token and retries the original request. Offset-less server times are parsed as UTC.",
    implementation:
      "The SignalR service forces long polling, wraps the HTTP client with a reversible latin1-to-UTF-8 repair, and exposes streams for messages, edits, deletions and receipts. The interceptor queues concurrent requests during refresh. Role routing picks a shell per role from a single session model. Order rules, color filtering with Arabic hamza normalisation and session persistence have their own unit tests.",
    challenges:
      "Arabic chat messages arriving as mojibake through long polling. A three-hour skew on every order time in Damascus. Stale data leaking between accounts in root-scoped Blocs.",
    solutions:
      "A decoding client that detects and reverses the double-encoding, tested with real samples. A single server-time parser used everywhere, tested against the skew. A session-clear helper plus a test that fails if any new Bloc is missing from it.",
    results:
      "A working five-role client with thirteen test files, including architecture guards unusual for a Flutter app of this size, delivered solo in three weeks of August and September 2026.",
    lessons:
      "Source-scanning tests are cheap and catch the class of bug that unit tests never see. The next step is a repository layer so the Blocs stop building multipart requests themselves.",
  },
};
