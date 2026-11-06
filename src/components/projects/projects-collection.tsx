import Link from "next/link";
import type { Project } from "@/content/schema";
import { localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export function ProjectsCollection({ projects, locale = "en" }: { projects: Project[]; locale?: Locale }) {
  const t = getDictionary(locale);
  return (
    <ol data-testid="projects-list" className="border-t border-rule">
      {projects.map((p, i) => (
        <li key={p.slug} className="group grid gap-4 border-b border-rule py-10 md:grid-cols-12 md:gap-8">
          <p className="text-step--1 tabular-nums text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</p>
          <div className="md:col-span-7">
            <p className="text-step--1 text-muted">
              {t.kinds[p.kind]}
              {locale === "ar" ? "، " : ", "}
              {p.year}
            </p>
            <h2 className="mt-1 text-step-3">
              <Link href={localeHref(locale, `/projects/${p.slug}`)} className="group-hover:text-laurel">
                {p.name}
              </Link>
            </h2>
            <p className="mt-2 max-w-[48ch] text-step-1">{p.tagline}</p>
            <p className="mt-3 max-w-[62ch] text-muted">{p.summary}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 self-start md:col-span-4">
            {p.metrics.slice(0, 4).map((m) => (
              <div key={m.label}>
                <dt className="text-step--1 text-muted">{m.label}</dt>
                <dd className="text-step-1 font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ol>
  );
}
