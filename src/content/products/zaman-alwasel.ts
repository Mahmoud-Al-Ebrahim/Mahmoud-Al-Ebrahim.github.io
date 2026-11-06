import type { ProductInput } from "../schema";

export const zamanAlwasel: ProductInput = {
  slug: "zaman-alwasel",
  name: "Ana Al-Mu'taqal",
  nameAr: "أنا المعتقل",
  tagline: "A humanitarian search tool for families of missing and detained Syrians.",
  domain: "humanitarian",
  publisher: "ProoTech",
  role: "contributed",
  year: 2025,
  stores: {
    play: { packageId: "com.zaman.zaman_alwasel" },
    appStore: { id: "6756930063", country: "us" },
  },
  brandColor: "#EE1C24",
  icon: "/apps/zaman-alwasel/icon.webp",
  screenshots: ["/apps/zaman-alwasel/shot-1.webp", "/apps/zaman-alwasel/shot-2.webp"],
  summary:
    "A reference app that lets Syrian families search published datasets of detainees, martyrs and wanted persons by name, region and date, browse related documents and photos, and share a record. Built Arabic-first for people who are not confident with technology.",
  problem: "After 2024, families searching for relatives had to comb through scattered documents and lists. They needed one place to search by the details they knew.",
  audience: "Syrian families searching for missing or detained relatives.",
  features: [
    "Search across several datasets by name, father's name, region and birthplace",
    "Record profiles with share-as-image",
    "Documents and photos library",
    "Arabic-only, right-to-left interface",
  ],
  stack: ["Flutter", "flutter_bloc", "injectable", "go_router", "Dio", "dartz Either"],
  challenges: [],
  solutions: [],
  results: ["On Google Play and the App Store (iOS January 2026)."],
  contribution: "Built the application structure, UI, Bloc layer and search integration; a colleague produced the documents section and store assets.",
  highlights: [
    "A data-driven dataset registry: adding a dataset is one row of endpoint, query keys and labels",
    "Typed generic HTTP clients and an Either failure channel from data source to Bloc",
  ],
};
