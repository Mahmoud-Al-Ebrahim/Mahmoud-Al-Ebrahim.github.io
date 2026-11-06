import Link from "next/link";
import { CleanArchitectureDiagram } from "@/components/diagrams/clean-architecture";
import { Section } from "@/components/ui/section";
import { getFeaturedProjects, getProject } from "@/lib/content";

const BACKENDS = [
  {
    title: "Foodly API",
    meta: "Node.js, Express, MongoDB",
    body: "The REST API behind four delivery apps: role-based JWT guards for clients, vendors, drivers and admins; an eight-state order model that refuses double driver assignment; FCM fan-out to every driver with stored notification history; Atlas Search for discovery.",
    href: "/projects/foodly",
  },
  {
    title: "Mudhhila API",
    meta: "Node.js, Express, MongoDB aggregation",
    body: "A hall-operations back office: events, instalment payments and expenses, with settlement status derived from the ledger and monthly, weekly and date-range financial reports computed in aggregation pipelines.",
    href: "/projects/mudhhila",
  },
  {
    title: "Labeeny data layer",
    meta: "GraphQL on Hasura",
    body: "Customer and captain apps share one live order state through GraphQL subscriptions, with caching, optimistic updates and structured error handling behind Clean Architecture boundaries.",
    href: "/apps/labeeny",
  },
];

/**
 * The engineering argument, on a dark surface: one playbook, the backends,
 * and the three deepest case studies.
 */
export function Systems() {
  const projects = getFeaturedProjects();
  const mud = getProject("mudhhila");
  return (
    <Section
      id="systems"
      tone="night"
      width="wide"
      title="The systems behind the apps"
      lede="The same architecture in every Flutter codebase since 2024, the APIs I write when a product needs one, and three projects that go deeper than a typical app."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-7">
          <CleanArchitectureDiagram compact />
        </div>
        <div className="min-w-0 lg:col-span-5">
          <h3 className="text-step-2">Backends I have written</h3>
          <ul className="mt-6 space-y-7">
            {BACKENDS.filter((b) => b.href !== "/projects/mudhhila" || mud).map((b) => (
              <li key={b.title} className="border-t border-rule pt-5">
                <p className="text-step--1 text-muted">{b.meta}</p>
                <h4 className="mt-1 text-step-1">
                  <Link href={b.href} className="hover:underline">
                    {b.title}
                  </Link>
                </h4>
                <p className="mt-2 text-muted">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ol className="mt-20 grid gap-px overflow-hidden rounded-[6px] border border-rule bg-rule md:grid-cols-3">
        {projects.map((p, i) => (
          <li key={p.slug} className="flex flex-col bg-night p-6 md:p-8">
            <p className="text-step--1 tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 text-step-3">
              <Link href={`/projects/${p.slug}`} className="hover:underline">
                {p.name}
              </Link>
            </h3>
            <p className="mt-3 text-step-1">{p.tagline}</p>
            <p className="mt-4 text-muted">{p.narrative.decisions.split(". ")[0]}.</p>
            <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 pt-8">
              {p.metrics.slice(0, 4).map((m) => (
                <div key={m.label}>
                  <dt className="text-step--1 text-muted">{m.label}</dt>
                  <dd className="text-step-1 font-medium">{m.value}</dd>
                </div>
              ))}
            </dl>
            <Link href={`/projects/${p.slug}`} className="link mt-8 self-start">
              Read the {p.name} case study
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-8">
        <Link href="/projects" className="link">
          All engineering case studies
        </Link>
      </p>
    </Section>
  );
}
