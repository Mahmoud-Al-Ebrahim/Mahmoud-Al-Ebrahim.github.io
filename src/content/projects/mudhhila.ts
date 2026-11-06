import type { ProjectInput } from "../schema";

export const mudhhila: ProjectInput = {
  slug: "mudhhila",
  name: "Mudhhila",
  tagline: "A Node.js and MongoDB back office for wedding-hall operations: events, instalments, expenses and reports.",
  year: 2026,
  kind: "backend",
  role: "Sole developer of the API",
  context: "Client project, Arabic-language REST API for a Flutter app",
  summary:
    "The API behind a hall-operations app. Managers record events, collect payments in instalments and log expenses; the backend keeps each event's settlement status current and turns the ledger into monthly, weekly and date-range financial reports with MongoDB aggregation pipelines.",
  stack: ["Node.js", "Express", "MongoDB", "Mongoose", "Aggregation pipelines", "JWT", "Moment"],
  metrics: [
    { label: "Route modules", value: "6" },
    { label: "Models", value: "5" },
    { label: "Commits", value: "12" },
  ],
  honesty: [
    "There are no automated tests, schema-validation library or CI yet; a production-hardening pass is planned before wider use.",
  ],
  narrative: {
    problem:
      "Hall managers tracked bookings, deposits and running costs in notebooks and spreadsheets. They could not see at a glance what was owed, what had been received this month, or which events were fully paid.",
    requirements:
      "Halls with supervisors and auditors; events with a date, client and total cost; payments with due dates, methods and statuses; hall expenses; a dashboard for the current week and month; date-range reports for halls and payments. Everything in Arabic, for a Flutter client.",
    constraints:
      "One developer, three weeks. MongoDB as the store. Reports must stay fast as payments accumulate, and every number in a report must agree with the ledger it comes from.",
    architecture:
      "Express routes, controllers and Mongoose models, with shared helpers and a pagination utility. Five collections: halls, events, payments, hall expenses and users. Events reference halls, payments reference events, and expenses carry a compound index on hall and date for range queries. Events have a text index on name and client for search.",
    decisions:
      "Derive state instead of storing it twice: after any payment is added, edited or deleted, a helper recomputes the event's settlement status from its completed payments, so the status can never drift from the money. Put reporting in the database: monthly totals use a $lookup from payments to events followed by a $group by year and month with conditional sums for received, pending and failed amounts, rather than looping in JavaScript. Cap page size at 100 in one pagination utility used by every list endpoint.",
    implementation:
      "The hall dashboard computes the current month and week with Moment and runs one aggregation each. Date-range reports for halls and payments return a per-day breakdown that includes the end day. Deleting an event cascades to its payments. Phone numbers are validated at registration and login issues a JWT. All messages and enums are Arabic, matching the app's users.",
    challenges:
      "Keeping reports consistent with edits made after the fact, and keeping list endpoints fast as data grows.",
    solutions:
      "Recomputing status on every payment write, aggregating in MongoDB, and indexing exactly the fields the reports filter on.",
    results:
      "A complete operations API delivered in March 2026: events, instalment payments, expenses, search, a dashboard and three kinds of financial report.",
    lessons:
      "Derived state is cheaper to keep correct than synchronized state. The next step is a production-hardening pass: request validation, stronger credential handling and integration tests.",
  },
};
