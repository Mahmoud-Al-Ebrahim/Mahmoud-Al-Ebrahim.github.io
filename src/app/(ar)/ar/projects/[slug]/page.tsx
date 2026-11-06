import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/content";
import { projectMetadata, projectStaticParams, ProjectView } from "@/views/projects";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = projectStaticParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return projectMetadata(slug, "ar");
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  return <ProjectView slug={slug} locale="ar" />;
}
