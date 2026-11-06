import type { ProductInput } from "../schema";

export const captainLabeeny: ProductInput = {
  slug: "captain-labeeny",
  name: "Captain Labeeny",
  nameAr: "كابتن لبيني",
  tagline: "The captain side of Labeeny: accept, pick up and deliver with live navigation.",
  domain: "delivery",
  publisher: "KwanX",
  role: "developed",
  roleLabel: "Senior Flutter developer, KwanX",
  year: 2026,
  stores: { play: { packageId: "com.kwanx.deliverex.driver" } },
  brandColor: "#8AC43F",
  icon: "/apps/captain-labeeny/icon.webp",
  screenshots: ["/apps/captain-labeeny/shot-1.webp", "/apps/captain-labeeny/shot-2.webp", "/apps/captain-labeeny/shot-3.webp"],
  screenshotStyle: "flat",
  summary:
    "Captain Labeeny is the driver app of the Labeeny platform. Captains choose their hours, receive orders matched to their vehicle, and move each order through pickup and delivery while the customer watches on the map.",
  problem: "Captains needed a lightweight, reliable dispatch app that keeps working through dropped connections and long shifts.",
  audience: "Delivery captains in Aleppo riding motorcycles, driving cars or vans.",
  features: [
    "Order queue matched to vehicle class",
    "Accept, pick up and deliver flow with status updates",
    "Live location sharing with the customer",
    "Earnings overview",
  ],
  stack: ["Flutter", "GraphQL", "Hasura"],
  challenges: [],
  solutions: [],
  results: ["Published on Google Play; last updated November 2026."],
  contribution: "Part of the same KwanX engagement as the customer app; see the Labeeny case study.",
  highlights: [
    "The captain side of the same real-time GraphQL platform as Labeeny",
    "Order states pushed by subscription rather than polled, to save battery and data on long shifts",
  ],
  related: ["labeeny"],
};
