import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppsCollection } from "@/components/apps/apps-collection";
import { AppCaseStudy } from "@/components/apps/app-case-study";
import { DOMAIN_LABELS } from "@/content/schema";
import { getFamilies, getProducts } from "@/lib/content";

describe("/apps collection", () => {
  it("renders every product in the server HTML, so the list works without JavaScript", () => {
    render(<AppsCollection products={getProducts()} families={getFamilies()} />);
    const list = screen.getByTestId("apps-list");
    expect(within(list).getAllByRole("listitem").filter((li) => li.dataset.domain)).toHaveLength(getProducts().length);
    for (const p of getProducts()) {
      const heading = within(list).getByRole("heading", { level: 2, name: new RegExp(`^${p.name}`) });
      expect(within(heading).getByRole("link", { name: p.name })).toHaveAttribute("href", `/apps/${p.slug}`);
    }
  });

  it("offers a shareable filter link for every domain that has products", () => {
    render(<AppsCollection products={getProducts()} families={getFamilies()} />);
    const domains = new Set(getProducts().map((p) => p.domain));
    for (const d of domains) {
      expect(screen.getByRole("link", { name: DOMAIN_LABELS[d] })).toHaveAttribute("href", `?domain=${d}`);
    }
  });

  it("links the captain app back to Labeeny", () => {
    render(<AppsCollection products={getProducts()} families={getFamilies()} />);
    const row = screen.getByRole("link", { name: "Captain Labeeny" }).closest("li") as HTMLElement;
    expect(within(row).getByRole("link", { name: "Labeeny" })).toHaveAttribute("href", "/apps/labeeny");
  });
});

describe("/apps/[slug] case study", () => {
  it("renders exactly one store link for a Play-only product", () => {
    render(<AppCaseStudy slug="atmtha" />);
    expect(within(screen.getByTestId("store-links")).getAllByRole("link")).toHaveLength(1);
  });

  it("renders both store links for Labeeny", () => {
    render(<AppCaseStudy slug="labeeny" />);
    expect(within(screen.getByTestId("store-links")).getAllByRole("link")).toHaveLength(2);
  });

  it("lists the four member apps of the EdTech family", () => {
    render(<AppCaseStudy slug="fahim-edtech" />);
    const list = screen.getByTestId("family-members");
    expect(within(list).getAllByRole("link", { name: /^(Fahim BAC|Fahim Uni|Atmtha|Coursaty)$/ })).toHaveLength(4);
  });

  it("has one h1 and the case-study sections", () => {
    render(<AppCaseStudy slug="min-bayty" />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    for (const h of ["Overview", "My contribution", "What I engineered", "Architecture", "Features", "Challenges and solutions", "Results"]) {
      expect(screen.getByRole("heading", { level: 2, name: h })).toBeInTheDocument();
    }
  });

  it("never steps onto a page that is not in the collection order", () => {
    render(<AppCaseStudy slug="labeeny" />);
    const nav = screen.getByRole("navigation", { name: "More case studies" });
    expect(within(nav).getByRole("link", { name: /Captain Labeeny/ })).toHaveAttribute("href", "/apps/captain-labeeny");
  });
});
