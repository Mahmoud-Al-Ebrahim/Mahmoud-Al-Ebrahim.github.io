import type { ProjectInput } from "../schema";

export const foodly: ProjectInput = {
  slug: "foodly",
  name: "Foodly",
  tagline: "Four Flutter apps and a Node.js backend covering the whole food-delivery order lifecycle.",
  year: 2025,
  kind: "fullstack",
  featured: true,
  role: "Full-stack developer: four Flutter clients and the Node.js API",
  context: "Independent project",
  summary:
    "A complete food-delivery ecosystem: a customer app, a restaurant app, a driver app and an admin app, all talking to one Node.js REST backend. Orders move from Placed to Delivered through restaurant, driver and admin hands, with push notifications tying the roles together.",
  stack: ["Flutter", "GetX", "flutter_hooks", "Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Firebase Admin (FCM)", "Atlas Search", "Nodemailer", "Google Maps", "Firebase Storage"],
  metrics: [
    { label: "Apps", value: "4" },
    { label: "Dart files", value: "383" },
    { label: "Lines", value: "31,000" },
    { label: "API route modules", value: "12" },
    { label: "Mongo models", value: "10" },
  ],
  diagram: "order-lifecycle",
  repo: { url: "https://github.com/Mahmoud-Al-Ebrahim/foody", public: false },
  honesty: [
    "Customer-side live tracking is simulated: the map interpolates a path between restaurant and customer on a timer, and the driver app does not upload its location.",
    "Order states are string literals that drifted between apps; a shared enum package would have prevented that.",
    "Code is shared between the four apps by copying files, not by a package, and neither the apps nor the API have automated tests yet.",
  ],
  narrative: {
    problem:
      "A food-delivery business is four products that must agree on one order at every moment: the customer who placed it, the restaurant cooking it, the driver carrying it and the admin watching the money.",
    requirements:
      "Customer: browse restaurants and foods, cart, addresses on a map, wallet payment, order tracking, phone OTP, Arabic and English. Restaurant: menu and food-type management with photos, an order board by status, notify drivers when food is ready. Driver: see ready orders, accept, deliver. Admin: verify restaurants and drivers, see all orders, per-restaurant statistics and commission, manage categories.",
    constraints:
      "One developer across four clients and the backend. No card payments available, so a wallet model. Real-time had to come from push notifications rather than a socket server.",
    architecture:
      "Two halves. The backend is a Node.js and Express API on MongoDB through Mongoose, layered as routes, controllers and models: twelve route modules and ten models (users, restaurants, foods, orders, carts, addresses, ratings, notifications, categories, food types). The User model carries a role (Client, Vendor, Driver, Admin) and four JWT middleware guards enforce it per route.\n\nThe four Flutter clients share one skeleton: GetX controllers for writes, flutter_hooks fetch hooks returning data, loading, error and refetch for reads, hand-written models, and one constants file for the API surface.",
    decisions:
      "Model the order as one document with embedded items and an eight-value status enum (Placed, Preparing, Manual, Ready, Approved, Out_for_Delivery, Delivered, Cancelled), so every app reads the same truth. Let a driver claim an order only if no other driver holds it, which prevents double assignment at the API instead of in four clients. Use Firebase Cloud Messaging from the server for every cross-role event rather than run a socket server. On the client, split read and write paths: hooks make screens declarative while controllers hold mutation state.",
    implementation:
      "Placing an order responds to the customer first and sends the restaurant's push notification afterwards, so a slow FCM call never delays checkout. Marking an order Ready calls a notify-drivers endpoint that stores a notification record per driver and sends one multicast push, reporting success and failure counts. Status changes and admin approval of restaurants and drivers each push to the affected user. Registration sends a six-digit email OTP through Nodemailer. Food and restaurant discovery uses MongoDB aggregation ($lookup, $sample) and Atlas Search indexes. On the clients, the admin app buckets every order into eight status tabs and the restaurant board moves orders through its states.",
    challenges:
      "Keeping four codebases consistent while shipping fast. Making the restaurant-to-driver handoff feel immediate without sockets. Expressing the order state machine across apps that each only see part of it.",
    solutions:
      "A fixed folder skeleton and copied utility files kept the apps aligned. The ready-to-notify chain on the backend fans out FCM to drivers the moment a restaurant marks an order ready. Each app models the subset of states it needs and defers transitions it does not own to the server.",
    results:
      "Four working Flutter clients and a Node.js API with a complete order lifecycle, role-based access, push fan-out and search, built by one developer. The API repository holds 70 commits between July and September 2025.",
    lessons:
      "Shared state across apps needs a shared package, not shared files; the order enum drifted within weeks. Simulated tracking is acceptable for a demo but must be labeled as such. The hook-plus-controller split was the best decision in the project and carried over into later work.",
  },
};
