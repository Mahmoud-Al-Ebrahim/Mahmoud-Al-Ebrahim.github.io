import type { ProductInput } from "../schema";

export const minBayty: ProductInput = {
  slug: "min-bayty",
  name: "Min Bayty",
  nameAr: "من بيتي",
  tagline: "A marketplace for handmade goods, from home sellers to buyers' doors.",
  domain: "commerce",
  publisher: "ProoTech",
  role: "contributed",
  year: 2025,
  featured: true,
  stores: {
    play: { packageId: "com.prootech.min_bayty" },
    appStore: { id: "6756697103", country: "us" },
  },
  brandColor: "#E96A3A",
  icon: "/apps/min-bayty/icon.webp",
  screenshots: ["/apps/min-bayty/shot-2.webp", "/apps/min-bayty/shot-4.webp", "/apps/min-bayty/shot-3.webp", "/apps/min-bayty/shot-1.webp"],
  summary:
    "Min Bayty connects home-based artisans with buyers. Sellers onboard with identity documents, a map location and working hours, list products by category, and run their store from a dashboard. Buyers browse, follow stores, chat, order for delivery or pickup, and review. A community feed with posts, stories and reactions makes it social, not just a catalog.",
  problem:
    "Home-based makers in Syria sold through chat apps with no catalog, no order tracking and no reputation. Buyers could not discover them or trust them.",
  audience: "Home-based artisans and small sellers; buyers looking for handmade crochet, embroidery, decor, gifts and more.",
  features: [
    "Four-step seller onboarding with documents, map location and hours",
    "Catalog with search, per-tab category filters and infinite scroll",
    "Cart, delivery or pickup-point orders with scheduling and notes",
    "Seller accept, reject with reason, and buyer cancel flows",
    "Real-time buyer-seller chat over Socket.IO",
    "Community feed: posts, image and video stories, reactions, follows, reviews",
    "Seller dashboard with monthly sales and completed-order counts",
    "Store and buyer themes switched by role",
  ],
  stack: ["Flutter", "flutter_bloc", "get_it + injectable", "go_router", "Dio", "dartz Either", "Socket.IO", "Hive", "flutter_secure_storage", "OpenStreetMap"],
  challenges: [
    {
      title: "Many small state changes per screen",
      detail: "Changing one cart quantity, following one store or reacting to one post must not reload the whole list or block other taps.",
    },
    {
      title: "Chat had to feel instant on slow links",
      detail: "Messages should appear the moment they are sent and reconcile when the socket catches up.",
    },
    {
      title: "Pagination everywhere",
      detail: "Products, orders, posts, stories, chats and notifications are all paged, and each list needed refresh and de-duplication.",
    },
  ],
  solutions: [
    {
      title: "Per-item status maps on a generic state wrapper",
      detail:
        "A BlocStateData<T> wrapper (init, loading, success, failed, with data allowed during loading) is stored per item id, so each quantity change, follow or reaction has its own optimistic state.",
    },
    {
      title: "Socket.IO with optimistic inserts",
      detail: "The chat authenticates and joins a conversation room, inserts outgoing messages locally first, and drops echoes of its own messages when they return.",
    },
    {
      title: "A pagination mixin over infinite_scroll_pagination",
      detail: "A generic mixin bridges any Bloc to a paging controller with id-based de-duplication and refresh, so every list shares one implementation.",
    },
  ],
  results: [
    "Published on Google Play (December 2025) and the App Store (February 2026) by ProoTech.",
    "Orders, chat, community and the seller dashboard shipped in the final two weeks before release.",
  ],
  contribution:
    "Core contributor in a two-person team. Built the order lifecycle, the Socket.IO chat, the community feed, the seller dashboard and pickup-location management, the categories and countries pickers, the map location picker and the sign-up stepper, plus logging and pagination infrastructure. A colleague built the UI foundation, router, theme and DI.",
  highlights: [
    "Order lifecycle from cart to seller accept or reject, with delivery, pickup points and scheduling",
    "Socket.IO buyer-seller chat with optimistic inserts and echo suppression",
    "Per-item optimistic state for cart lines, follows and reactions on a generic BlocStateData wrapper",
  ],
  architecture:
    "Feature-first Clean Architecture with injectable dependency injection, go_router and Bloc. Repositories return Either<Failure, T> through one generic NetworkRepository call that checks connectivity, calls the remote source, and maps failures to typed values.\n\nState is wrapped in a generic BlocStateData<T> (init, loading, success, failed, with data allowed during loading), stored per item id so one cart line or one follow has its own optimistic state. A pagination mixin bridges any Bloc to infinite_scroll_pagination with id-based de-duplication. Chat runs over Socket.IO: authenticate, join a conversation room, emit, and listen for new messages.",
  related: ["fahim-edtech", "sayed"],
};
