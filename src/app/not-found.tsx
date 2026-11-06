import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getFeaturedApps, getFeaturedProjects } from "@/lib/content";

export default function NotFound() {
  const apps = getFeaturedApps();
  const projects = getFeaturedProjects();
  return (
    <Container as="main" id="main" className="py-16 md:py-24">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 text-step-5">There is nothing at this address.</h1>
      <p className="mt-4 max-w-[56ch] text-step-1 text-muted">
        The link may be old or mistyped. The most visited pages are below.
      </p>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-step-2">
            <Link href="/apps" className="hover:text-laurel">
              Published applications
            </Link>
          </h2>
          <ul className="mt-3 space-y-1">
            {apps.map((a) => (
              <li key={a.slug}>
                <Link href={`/apps/${a.slug}`} className="text-laurel underline">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-step-2">
            <Link href="/projects" className="hover:text-laurel">
              Engineering projects
            </Link>
          </h2>
          <ul className="mt-3 space-y-1">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="text-laurel underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-10">
        <Link href="/" className="text-laurel underline">
          Back to the home page
        </Link>
      </p>
    </Container>
  );
}
