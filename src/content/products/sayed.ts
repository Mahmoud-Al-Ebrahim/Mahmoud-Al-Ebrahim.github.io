import type { ProductInput } from "../schema";

export const sayed: ProductInput = {
  slug: "sayed",
  name: "Sayed",
  nameAr: "سيِّد",
  tagline: "Game top-ups, mobile credit transfers and internet subscriptions, with agents and admins.",
  domain: "fintech",
  publisher: "ProoTech",
  role: "developed",
  roleLabel: "Flutter developer",
  year: 2026,
  stores: { play: { packageId: "com.sayed.digital_store.sayed_app" } },
  brandColor: "#62108F",
  icon: "/apps/sayed/icon.webp",
  screenshots: ["/apps/sayed/shot-2.webp", "/apps/sayed/shot-1.webp", "/apps/sayed/shot-3.webp", "/apps/sayed/shot-4.webp"],
  summary:
    "Sayed is a digital store for Syria: users top up games and apps, transfer Syriatel and MTN credit, and buy internet subscriptions from a wallet. Agents credit customers by code; admins manage products, margin pricing, badges, exchange rates, top-up requests and broadcast notifications from sixteen admin screens inside the same app.",
  problem:
    "Digital goods in Syria are sold through chat and cash. The store needed a catalog that changes without releases, orders that never double-charge, and a wallet that agents and admins can credit safely.",
  audience: "Gamers and mobile users in Syria; resale agents; store administrators.",
  features: [
    "Server-described order forms: quantity rules, parameters, inferred keyboards",
    "Smart credit transfer with Syrian operator auto-detection",
    "Wallet top-ups via agents, admins or Sham Cash requests with proof upload",
    "Order history with provider replies and refunds",
    "Agent tools: credit by code, customers, logs",
    "Sixteen admin screens including margin pricing and update policy",
    "Light and dark themes",
    "Server-driven flexible or forced in-app updates",
  ],
  stack: ["Flutter", "flutter_bloc (Cubits)", "get_it + injectable", "Dio", "dartz Either", "Firebase Messaging", "Google Sign-In", "Cloudinary"],
  challenges: [
    {
      title: "Double submissions cost real money",
      detail: "A retried order request on a flaky network must not create two top-ups.",
    },
    {
      title: "Token refresh races",
      detail: "Several requests failing with 401 at once must trigger one refresh, not many, and the app must tell a rejected session from an unreachable server.",
    },
    {
      title: "A catalog that changes weekly",
      detail: "New games, packages and operators appear constantly; each used to need an app release.",
    },
  ],
  solutions: [
    {
      title: "Client-generated idempotency keys",
      detail: "Every order carries a UUIDv4 key that is regenerated only after success or reset, so a retry is a no-op on the server.",
    },
    {
      title: "Single-flight refresh interceptor",
      detail: "A Dio interceptor coalesces concurrent refreshes, retries each request once, detects an already-renewed token and distinguishes rejected from unreachable to decide between sign-out and a connectivity message.",
    },
    {
      title: "Products describe their own forms",
      detail: "Quantity rules (single, priced list, min-max stepper) and parameter definitions come from the server; the order page renders them and checks the live total against the balance before submitting.",
    },
  ],
  results: [
    "On Google Play; updated October 2026.",
    "43 unit tests with hand-written fakes cover operator detection, pricing, quantity rules, money precision and admin visibility.",
  ],
  contribution: "Flutter development of the app for ProoTech, including the session, ordering and catalog layers described here.",
  highlights: [
    "Single-flight refresh-token interceptor that detects races and tells a rejected session from an unreachable server",
    "Client-generated idempotency keys so a retried order never charges twice",
    "Server-described order forms: quantity rules and parameters come from the catalog, not app releases",
    "43 unit tests with hand-written fakes covering pricing, operator detection and money precision",
  ],
  architecture:
    "Feature-first layers over a shared core, with get_it and injectable, and nineteen Cubits for screen state. Every repository returns Either<Failure, T>; a response parser unwraps the API envelope and surfaces validation messages.\n\nTwo Dio interceptors carry the session: one refreshes the token once for any number of concurrent 401s and retries each request a single time; the other expires the session on 401 or a banned account. A session manager centralizes sign-out: unregister the push token, revoke the refresh token, clear storage and reset every Cubit.",
  related: ["min-bayty"],
};
