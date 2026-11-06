import type { Metadata } from "next";
import { ProjectCaseStudy } from "@/components/projects/project-case-study";
import { ProjectsCollection } from "@/components/projects/projects-collection";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getProject, getProjects } from "@/lib/content";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export function projectsMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).projectsPage;
  return buildMetadata({ title: t.title, description: t.description, path: localeHref(locale, "/projects"), locale });
}

export function ProjectsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).projectsPage;
  const projects = getProjects(locale);
  return (
    <Container as="main" id="main" className="py-12 md:py-20">
      <h1 className="text-step-5">{t.title}</h1>
      <p className="mt-4 max-w-[60ch] text-step-1 text-muted">{t.lede(projects.length)}</p>
      <div className="mt-10">
        <ProjectsCollection projects={projects} locale={locale} />
      </div>
    </Container>
  );
}

/* One project ------------------------------------------------------------ */

export function projectStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export function projectMetadata(slug: string, locale: Locale): Metadata {
  const project = getProject(slug, locale);
  if (!project) return {};
  return buildMetadata({ title: project.name, description: project.tagline, path: localeHref(locale, `/projects/${slug}`), locale });
}

export function ProjectView({ slug, locale }: { slug: string; locale: Locale }) {
  const project = getProject(slug, locale);
  if (!project) return null;
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.tagline,
    inLanguage: locale,
    programmingLanguage: "Dart",
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    url: absoluteUrl(localeHref(locale, `/projects/${slug}`)),
    ...(project.repo ? { codeRepository: project.repo.url } : {}),
  };
  return (
    <>
      <JsonLd data={ld} />
      <ProjectCaseStudy slug={slug} locale={locale} />
    </>
  );
}
