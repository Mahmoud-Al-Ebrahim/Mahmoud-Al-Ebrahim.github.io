import { projectsMetadata, ProjectsView } from "@/views/projects";

export const metadata = projectsMetadata("ar");

export default function ProjectsPage() {
  return <ProjectsView locale="ar" />;
}
