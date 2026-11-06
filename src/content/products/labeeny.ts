import type { ProductInput } from "../schema";

export const labeeny: ProductInput = {
  slug: "labeeny",
  name: "Labeeny",
  nameAr: "لبيني",
  tagline: "On-demand delivery for Aleppo: parcels, food and shopping, tracked live.",
  domain: "delivery",
  publisher: "KwanX",
  role: "developed",
  roleLabel: "Senior Flutter developer, KwanX",
  year: 2026,
  featured: true,
  stores: {
    play: { packageId: "com.kwanx.deliverex.user" },
    appStore: { id: "6761486192", country: "us" },
  },
  brandColor: "#8AC43F",
  icon: "/apps/labeeny/icon.webp",
  screenshots: ["/apps/labeeny/shot-1.webp", "/apps/labeeny/shot-2.webp", "/apps/labeeny/shot-3.webp", "/apps/labeeny/shot-4.webp"],
  screenshotStyle: "flat",
  summary:
    "Labeeny is a city delivery platform for Aleppo. Customers send parcels and documents, order from restaurants and shops, and pick a motorcycle, car or van for the job. A captain app on the other side accepts and fulfils orders with live tracking on a map.",
  problem:
    "Aleppo had no reliable on-demand courier service that handled both errands and food. Customers needed an upfront price, a vehicle that fits the parcel, and a live map; captains needed a dispatch flow that works on mid-range Android phones with patchy data.",
  audience: "Residents and small businesses in Aleppo; delivery captains with motorcycles, cars and vans.",
  features: [
    "Parcel, document, restaurant and shopping orders in one flow",
    "Three vehicle classes sized to the order",
    "Upfront fare estimate before confirming",
    "Live captain tracking on the map",
    "Pickup and drop-off selection with a simple location picker",
    "Customer support inside the app",
    "Separate captain app for accepting and completing orders",
  ],
  stack: ["Flutter", "Dart", "GraphQL", "Hasura", "Clean Architecture", "GitLab CI/CD"],
  challenges: [
    {
      title: "Two roles, one real-time truth",
      detail: "Customer and captain apps must see the same order state the moment it changes, without polling that drains batteries and data plans.",
    },
    {
      title: "Keeping the UI honest under bad networks",
      detail: "Accepting an order or updating a location must feel instant yet reconcile correctly when the connection drops mid-request.",
    },
  ],
  solutions: [
    {
      title: "GraphQL subscriptions on Hasura",
      detail: "Order and location state flow to both apps through subscriptions, so a change on one side is pushed, not fetched, to the other.",
    },
    {
      title: "A resilient data layer",
      detail: "Caching, optimistic updates and structured error handling sit behind a Clean Architecture boundary so the UI can commit to a change and roll back cleanly if the server disagrees.",
    },
  ],
  results: [
    "Customer app live on Google Play and the App Store; captain app on Google Play, both updated through October and November 2026.",
    "Shipped under GitLab CI/CD with enforced review and branching standards.",
  ],
  contribution:
    "Senior Flutter developer at KwanX since January 2026. The CV records architecting and delivering the real-time, multi-role system, designing the Clean Architecture and the subscription, caching and optimistic-update data layer, and enforcing CI/CD and review standards. Source code is not included in this portfolio.",
  highlights: [
    "GraphQL subscriptions on Hasura keep the customer and captain apps on one live order state",
    "A data layer with caching, optimistic updates and structured error handling behind Clean Architecture boundaries",
    "Delivery through GitLab CI/CD with enforced review and branching standards",
  ],
  architecture:
    "Two Flutter apps, customer and captain, share one GraphQL schema served by Hasura. Order and location state reach both apps through GraphQL subscriptions, so a change on one side is pushed to the other instead of polled.\n\nThe client follows a feature-first Clean Architecture with SOLID boundaries. The data layer owns caching, optimistic updates and failure mapping, so the UI can commit to a change immediately and roll back cleanly if the server disagrees. Source code is not part of this portfolio; this description follows the CV.",
  related: ["captain-labeeny"],
};
