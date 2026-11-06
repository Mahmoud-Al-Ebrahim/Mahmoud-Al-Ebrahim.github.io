import { IconGitHub } from "@/components/icons";
import { CaseStudyBody, Crumb } from "@/components/case-study/case-study-layout";
import { HonestyNote } from "@/components/case-study/honesty-note";
import { MetricsStrip } from "@/components/case-study/metrics-strip";
import { Narrative } from "@/components/case-study/narrative";
import { ScreenshotGallery } from "@/components/case-study/screenshot-gallery";
import { DIAGRAMS } from "@/components/diagrams";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getProject, getProjects } from "@/lib/content";


export function ProjectCaseStudy({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const project = getProject(slug, locale);
  if (!project) throw new Error(`[projects] unknown slug ${slug}`);
  const t = getDictionary(locale);
  const all = getProjects(locale);
  const i = all.findIndex((p) => p.slug === slug);
  const prev = i > 0 ? { href: localeHref(locale, `/projects/${all[i - 1].slug}`), label: all[i - 1].name } : undefined;
  const next = i < all.length - 1 ? { href: localeHref(locale, `/projects/${all[i + 1].slug}`), label: all[i + 1].name } : undefined;
  const Diagram = project.diagram ? DIAGRAMS[project.diagram] : undefined;

  return (
    <main id="main">
      <header className="night">
        <Container width="wide" className="pb-12 pt-10 md:pb-16 md:pt-14">
          <Crumb href={localeHref(locale, "/projects")} label={t.project.crumb} current={t.kinds[project.kind]} locale={locale} />
          <h1 className="mt-10 text-step-6 leading-[0.95]">{project.name}</h1>
          <p className="mt-5 max-w-[40ch] text-step-2 font-[400]">{project.tagline}</p>
          <p className="mt-4 text-step--1 text-muted">
            {project.role}. {project.context}
            {locale === "ar" ? "، " : ", "}
            {project.year}.
          </p>
          <div className="mt-10">
            <MetricsStrip metrics={project.metrics} />
          </div>
        </Container>
      </header>
      <CaseStudyBody
        locale={locale}
        prev={prev}
        next={next}
        margin={[
          { label: t.project.role, value: project.role },
          { label: t.project.context, value: project.context },
          { label: t.project.year, value: String(project.year) },
          ...(project.repo
            ? [
                {
                  label: t.project.source,
                  value: (
                    <a href={project.repo.url} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
                      <IconGitHub className="h-4 w-4" /> {t.project.repo}
                    </a>
                  ),
                },
              ]
            : []),
          {
            label: t.project.stack,
            value: (
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
        after={
          project.screenshots.length > 0 ? (
            <ScreenshotGallery label={t.caseStudy.screens} items={project.screenshots.map((s, n) => ({ src: s, alt: t.screenN(project.name, n + 1) }))} />
          ) : null
        }
      >
        <p className="max-w-[62ch] text-step-2 font-[400] leading-snug">{project.summary}</p>
        <div className="mt-14">
          <Narrative narrative={project.narrative} diagram={Diagram ? <Diagram locale={locale} /> : undefined} locale={locale} />
        </div>
        <HonestyNote items={project.honesty} locale={locale} />
      </CaseStudyBody>
    </main>
  );
}
