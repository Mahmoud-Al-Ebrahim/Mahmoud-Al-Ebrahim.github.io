import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ProjectsCollection } from "@/components/projects/projects-collection";
import { Container } from "@/components/ui/container";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Engineering projects",
  description:
    "Case studies in on-device machine learning, multi-service mobile architecture, full-stack delivery systems and testing discipline.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Container as="main" id="main" className="py-12 md:py-20">
      <h1 className="text-step-5">Engineering projects</h1>
      <p className="mt-4 max-w-[60ch] text-step-1 text-muted">
        Seven systems, each written up from problem to lessons learned, with what they do not do stated plainly.
      </p>
      <div className="mt-10">
        <ProjectsCollection projects={getProjects()} />
      </div>
    </Container>
  );
}
