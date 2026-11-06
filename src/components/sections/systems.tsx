import Link from "next/link";
import { CleanArchitectureDiagram } from "@/components/diagrams/clean-architecture";
import { Section } from "@/components/ui/section";
import { localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getFeaturedProjects, getProject } from "@/lib/content";

/**
 * The engineering argument, on a dark surface: one playbook, the backends,
 * and the three deepest case studies.
 */
export function Systems({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const projects = getFeaturedProjects(locale);
  const mud = getProject("mudhhila");
  return (
    <Section id="systems" tone="night" width="wide" title={t.systems.title} lede={t.systems.lede}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-7">
          <CleanArchitectureDiagram compact locale={locale} />
        </div>
        <div className="min-w-0 lg:col-span-5">
          <h3 className="text-step-2">{t.systems.backendsTitle}</h3>
          <ul className="mt-6 space-y-7">
            {t.systems.backends
              .filter((b) => b.href !== "/projects/mudhhila" || mud)
              .map((b) => (
                <li key={b.href} className="border-t border-rule pt-5">
                  <p className="text-step--1 text-muted">{b.meta}</p>
                  <h4 className="mt-1 text-step-1">
                    <Link href={localeHref(locale, b.href)} className="hover:underline">
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
              <Link href={localeHref(locale, `/projects/${p.slug}`)} className="hover:underline">
                {p.name}
              </Link>
            </h3>
            <p className="mt-3 text-step-1">{p.tagline}</p>
            <p className="mt-4 text-muted">{firstSentence(p.narrative.decisions)}</p>
            <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 pt-8">
              {p.metrics.slice(0, 4).map((m) => (
                <div key={m.label}>
                  <dt className="text-step--1 text-muted">{m.label}</dt>
                  <dd className="text-step-1 font-medium">{m.value}</dd>
                </div>
              ))}
            </dl>
            <Link href={localeHref(locale, `/projects/${p.slug}`)} className="link mt-8 self-start">
              {t.readCaseStudy(p.name)}
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-8">
        <Link href={localeHref(locale, "/projects")} className="link">
          {t.systems.allCaseStudies}
        </Link>
      </p>
    </Section>
  );
}

/** The first sentence of a paragraph, in either script. */
function firstSentence(text: string): string {
  const m = text.match(/^[\s\S]*?[.؟!](?=\s|$)/);
  return (m ? m[0] : text.split("\n\n")[0]).trim();
}
