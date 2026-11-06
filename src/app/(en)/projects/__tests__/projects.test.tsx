import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectsCollection } from "@/components/projects/projects-collection";
import { ProjectCaseStudy } from "@/components/projects/project-case-study";
import { NARRATIVE_ORDER } from "@/content/schema";
import { getProjects } from "@/lib/content";
import { projects as rawProjects } from "@/content/projects";

describe("/projects collection", () => {
  it("lists every project with the home-featured three first", () => {
    render(<ProjectsCollection projects={getProjects()} />);
    const list = screen.getByTestId("projects-list");
    const names = within(list).getAllByRole("heading", { level: 2 }).map((h) => h.textContent?.trim());
    expect(names).toHaveLength(rawProjects.length);
    expect(names.slice(0, 3)).toEqual(["Gallery AI", "Trydos", "Foodly"]);
  });
});

describe("/projects/[slug] case study", () => {
  it("renders the eight narrative steps in order and the honesty note", () => {
    render(<ProjectCaseStudy slug="gallery-ai" />);
    const h2s = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent?.trim());
    const idx = NARRATIVE_ORDER.map((n) => h2s.indexOf(n.label));
    expect(NARRATIVE_ORDER).toHaveLength(8);
    expect(idx.every((i) => i >= 0)).toBe(true);
    expect([...idx].sort((a, b) => a - b)).toEqual(idx);
    expect(screen.getByRole("heading", { level: 2, name: /does not do/i })).toBeInTheDocument();
  });

  it("places the diagram inside the Architecture step", () => {
    render(<ProjectCaseStudy slug="gallery-ai" />);
    const step = document.getElementById("architecture") as HTMLElement;
    expect(within(step).getByRole("figure")).toBeInTheDocument();
  });

  it("never renders the URL of a private repository", () => {
    const priv = rawProjects.find((p) => p.repo && !p.repo.public);
    expect(priv, "fixture: one project has a private repo").toBeDefined();
    const { container } = render(<ProjectCaseStudy slug={priv!.slug} />);
    expect(container.innerHTML).not.toContain(priv!.repo!.url);
    expect(screen.queryByRole("link", { name: /github repository/i })).toBeNull();
  });

  it("shows the repository link for a public repo", () => {
    render(<ProjectCaseStudy slug="fashion-store" />);
    expect(screen.getByRole("link", { name: /github repository/i })).toHaveAttribute("href", "https://github.com/Mahmoud-Al-Ebrahim/fashion_store");
  });
});
