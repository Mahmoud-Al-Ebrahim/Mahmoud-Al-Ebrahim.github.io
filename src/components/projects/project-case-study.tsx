import { IconGitHub } from "@/components/icons";
import { CaseStudyBody, Crumb } from "@/components/case-study/case-study-layout";
import { HonestyNote } from "@/components/case-study/honesty-note";
import { MetricsStrip } from "@/components/case-study/metrics-strip";
import { Narrative } from "@/components/case-study/narrative";
import { ScreenshotGallery } from "@/components/case-study/screenshot-gallery";
import { DIAGRAMS } from "@/components/diagrams";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/content/schema";
import { getProject, getProjects } from "@/lib/content";

export const KIND_LABELS: Record<Project["kind"], string> = {
  mobile: "Mobile application",
  fullstack: "Full-stack system",
  backend: "Backend API",
  ml: "On-device machine learning",
  hardware: "Hardware integration",
};

export function ProjectCaseStudy({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) throw new Error(`[projects] unknown slug ${slug}`);
  const all = getProjects();
  const i = all.findIndex((p) => p.slug === slug);
  const prev = i > 0 ? { href: `/projects/${all[i - 1].slug}`, label: all[i - 1].name } : undefined;
  const next = i < all.length - 1 ? { href: `/projects/${all[i + 1].slug}`, label: all[i + 1].name } : undefined;
  const Diagram = project.diagram ? DIAGRAMS[project.diagram] : undefined;

  return (
    <main id="main">
      <header className="night">
        <Container width="wide" className="pb-12 pt-10 md:pb-16 md:pt-14">
          <Crumb href="/projects" label="Engineering" current={KIND_LABELS[project.kind]} />
          <h1 className="mt-10 text-step-6 leading-[0.95]">{project.name}</h1>
          <p className="mt-5 max-w-[40ch] text-step-2 font-[400]">{project.tagline}</p>
          <p className="mt-4 text-step--1 text-muted">
            {project.role}. {project.context}, {project.year}.
          </p>
          <div className="mt-10">
            <MetricsStrip metrics={project.metrics} />
          </div>
        </Container>
      </header>
      <CaseStudyBody
        prev={prev}
        next={next}
        margin={[
          { label: "Role", value: project.role },
          { label: "Context", value: project.context },
          { label: "Year", value: String(project.year) },
          ...(project.repo
            ? [
                {
                  label: "Source",
                  value: (
                    <a href={project.repo.url} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
                      <IconGitHub className="h-4 w-4" /> GitHub repository
                    </a>
                  ),
                },
              ]
            : []),
          {
            label: "Stack",
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
            <ScreenshotGallery items={project.screenshots.map((s, n) => ({ src: s, alt: `${project.name} screen ${n + 1}` }))} />
          ) : null
        }
      >
        <p className="max-w-[62ch] text-step-2 font-[400] leading-snug">{project.summary}</p>
        <div className="mt-14">
          <Narrative narrative={project.narrative} diagram={Diagram ? <Diagram /> : undefined} />
        </div>
        <HonestyNote items={project.honesty} />
      </CaseStudyBody>
    </main>
  );
}
