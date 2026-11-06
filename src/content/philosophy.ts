export type Principle = {
  title: string;
  body: string;
  evidence: { label: string; href: string };
};

export const principles: Principle[] = [
  {
    title: "Boundaries before features",
    body: "Every app starts with the same feature-first layout: data sources, repositories, use cases, Blocs, pages. The layout is boring on purpose, so a new feature is a known shape and a bug has a known address.",
    evidence: { label: "Safeer: 14 features, 49 use cases", href: "/projects/safeer" },
  },
  {
    title: "Failures are values",
    body: "Repositories return Either<Failure, T>. A screen folds the result instead of catching exceptions it cannot name, and the failure types tell the UI whether to retry, show cached data or send the user to sign in.",
    evidence: { label: "Trydos: 239 Either signatures", href: "/projects/trydos" },
  },
  {
    title: "Write the generic thing once",
    body: "When the third repository had the same connectivity check, remote call, cache fallback and failure mapping, that code became one generic call wrapper and the repositories became one-liners.",
    evidence: { label: "One repository method to replace fourteen", href: "/writing/generic-network-repository" },
  },
  {
    title: "Offline is the default state",
    body: "Users in Aleppo lose connectivity on every bus ride. Whole feature states are persisted with HydratedBloc and invalidated by a version constant, so a cold start shows the last known truth before any request.",
    evidence: { label: "Fahim, Atmtha and Coursaty", href: "/apps/fahim-edtech" },
  },
  {
    title: "Optimistic, then honest",
    body: "Taps should feel instant. Per-item status maps let one cart line, one follow or one reaction carry its own loading and failure state, and roll back cleanly if the server disagrees.",
    evidence: { label: "Min Bayty", href: "/apps/min-bayty" },
  },
  {
    title: "Tests should fail for the right reasons",
    body: "Unit tests guard logic. Architecture tests guard the rules nobody writes down: that every event has a screen, every Bloc clears on sign-out, every string has a translation key.",
    evidence: { label: "Tests that protect architecture", href: "/writing/tests-that-guard-architecture" },
  },
];

export type TradeOff = {
  title: string;
  situation: string;
  options: string[];
  choice: string;
  outcome: string;
  project: { label: string; href: string };
};

export const tradeOffs: TradeOff[] = [
  {
    title: "Generic repository wrapper or explicit repositories",
    situation:
      "Safeer had fourteen repositories, each repeating the same connectivity check, try-catch, cache write and failure mapping around a different remote call.",
    options: [
      "Keep explicit repositories: every method readable on its own, at the cost of fourteen copies of the same twenty lines.",
      "A base class with template methods: less duplication, but inheritance hides which repository does what.",
      "One generic function NetworkRepository.call<T> that takes the remote fetcher and optional cache hooks as parameters.",
    ],
    choice:
      "The generic function. Composition keeps each repository a one-line delegation, the behavior is in one tested place, and a feature that needs something unusual can still write its own method.",
    outcome:
      "Fourteen repositories shrank to delegations; the same wrapper was reused in Min Bayty. The cost is that readers must know the wrapper to understand a repository, which the name makes explicit.",
    project: { label: "Safeer", href: "/projects/safeer" },
  },
  {
    title: "HydratedBloc persistence or a local database",
    situation:
      "Exam-prep students needed materials, lessons and question banks available offline on cheap phones, and the content changed with every backend release.",
    options: [
      "A relational store with Drift or sqflite: precise queries and migrations, but a schema to maintain for every model change.",
      "Hive boxes per model: fast and simple, but still a second model layer with adapters.",
      "Persist whole Bloc states with HydratedBloc and json_serializable, and clear storage when an internal version constant changes.",
    ],
    choice:
      "HydratedBloc. The app already serialized its models for the API; persisting the state as-is cost nothing new, and a version constant handled the only migration the product needed: start fresh.",
    outcome:
      "Cold starts open on the last known content. Atmtha added a throttled prefetch so the whole subject tree is cached with a progress bar. The limit is query power: there are no partial loads, so very large catalogs would need a database.",
    project: { label: "Fahim, Atmtha and Coursaty", href: "/apps/fahim-edtech" },
  },
  {
    title: "Architecture-guard tests or more unit tests",
    situation:
      "fashion_store had seventeen Blocs, ninety-seven endpoints and two locale files, maintained alone. The bugs that hurt were not wrong calculations but forgotten wiring.",
    options: [
      "Raise unit-test coverage on Blocs: catches logic errors, says nothing about a screen that stopped dispatching an event.",
      "Rely on code review: a single developer reviews their own work.",
      "Write tests that read the source tree and assert structural rules.",
    ],
    choice:
      "Structural tests first, unit tests for the few pure rules (order cancellation, time parsing, text repair). Four scanning tests cost an afternoon and cover a class of defect no unit test sees.",
    outcome:
      "A missing Clear event or a hardcoded Arabic string fails the build. The trade-off is that the tests encode conventions; changing a convention means changing a test, which is the point.",
    project: { label: "fashion_store", href: "/projects/fashion-store" },
  },
];
