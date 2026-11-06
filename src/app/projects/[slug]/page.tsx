import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/projects/project-case-study";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/content/site";
import { getProject, getProjects } from "@/lib/content";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({ title: project.name, description: project.tagline, path: `/projects/${slug}` });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.tagline,
    programmingLanguage: "Dart",
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    url: absoluteUrl(`/projects/${slug}`),
    ...(project.repo ? { codeRepository: project.repo.url } : {}),
  };
  return (
    <>
      <JsonLd data={ld} />
      <ProjectCaseStudy slug={slug} />
    </>
  );
}
