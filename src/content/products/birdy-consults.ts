import type { ProductInput } from "../schema";

export const birdyConsults: ProductInput = {
  slug: "birdy-consults",
  name: "Birdy Consults",
  tagline: "Subscription veterinary consultations for birds, poultry, livestock and pets.",
  domain: "health",
  publisher: "skdbirdy",
  role: "built",
  year: 2025,
  stores: { play: { packageId: "com.zakarianaser.skdbirdy" } },
  brandColor: "#F48422",
  icon: "/apps/birdy-consults/icon.webp",
  screenshots: ["/apps/birdy-consults/shot-2.webp", "/apps/birdy-consults/shot-1.webp", "/apps/birdy-consults/shot-3.webp"],
  summary:
    "Birdy Consults lets animal owners buy a Silver, Gold or Diamond package for an animal category and open consultations with veterinarians. Each consultation starts with a server-defined intake form and continues as a chat with text, images, video and audio. Doctors accept, answer, close cases and track commissions in the same app.",
  problem:
    "Farmers and pet owners in Syria rarely have a vet nearby. The client wanted paid, tiered access to doctors with a quota per package, and the package rules had to change without app releases.",
  audience: "Bird, poultry, livestock and pet owners; veterinarians.",
  features: [
    "Packages per animal category with tier capabilities and consultation quotas",
    "Subscription state driven entirely by the backend",
    "Server-defined dynamic intake forms per sub-category",
    "Consultation chat with text, image, video and audio messages",
    "Doctor role: accept, reply, close, commissions",
    "Hosted checkout for payments",
    "Email activation by deep link, OTP, Google Sign-In and guest mode",
    "Arabic and Turkish",
  ],
  stack: ["Flutter", "flutter_bloc", "get_it + injectable", "go_router", "Dio", "dartz Either", "Firebase Messaging", "app_links", "WebView"],
  challenges: [
    {
      title: "Real-time without a socket server",
      detail: "The backend offered REST and push only, yet replies, acceptances and closures had to show up in an open consultation immediately.",
    },
    {
      title: "Package rules kept changing",
      detail: "Tier capabilities, quotas and intake questions were still being negotiated while the app was being built.",
    },
  ],
  solutions: [
    {
      title: "FCM as the event bus",
      detail:
        "Data messages carry the consultation id and event type; the foreground handler dispatches them straight into the consultations Bloc, suppresses the notification when that case is open, and a background isolate re-initializes dependency injection to show it otherwise. Outgoing messages are optimistic with a local id and per-message status.",
    },
    {
      title: "Everything configurable lives on the server",
      detail:
        "Packages are data with capability flags; subscriptions carry start, end, approval and used-consultation counts; intake forms are fetched per sub-category and rendered from field definitions. The app gates features on that state instead of hardcoding tiers.",
    },
  ],
  results: ["Published on Google Play; version 2.0 updated April 2026."],
  contribution: "Designed and built the application end to end as the sole developer; a collaborator handled the iOS build configuration.",
  highlights: [
    "FCM data messages used as a real-time event bus into the consultations Bloc, with optimistic outgoing messages",
    "Subscription tiers, quotas and access gating driven entirely by backend state",
    "Server-defined dynamic intake forms rendered from field definitions per sub-category",
  ],
  architecture:
    "Feature-first Clean Architecture with use cases, get_it and injectable, go_router, and Bloc. HTTP goes through typed request objects (BaseApi<T>, RequestConfig<T>, Get/Post/Put/Delete clients) that inject the bearer token and language per request, and an exception mixin maps failures to Either values.\n\nThere is no socket server, so Firebase Cloud Messaging carries real-time events: the foreground handler dispatches message, acceptance and closure events into the consultations Bloc and suppresses the notification when that case is open; a background isolate re-initializes dependency injection to show it otherwise.",
  related: ["min-bayty"],
};
