import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/(en)/page";
import { getFamilies, getProducts } from "@/lib/content";

describe("Home page", () => {
  it("has exactly one h1 with the name", () => {
    render(<Home />);
    const h1 = screen.getAllByRole("heading", { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent("Mahmoud AlEbrahim");
  });

  it("shows every shipped app in the hero shelf, linked to its case study", () => {
    render(<Home />);
    const shelf = screen.getByRole("list", { name: "Published apps" });
    for (const p of getProducts()) {
      expect(within(shelf).getByRole("link", { name: p.name })).toHaveAttribute("href", `/apps/${p.slug}`);
    }
  });

  it("renders the sections in the designed order", () => {
    render(<Home />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent?.trim());
    const expected = ["On the stores now", "Shipped to the stores", "The systems behind the apps", "Experience", "Learning and teaching", "Contact"];
    const indices = expected.map((label) => headings.findIndex((h) => h?.startsWith(label)));
    expect(indices.every((i) => i >= 0), `missing: ${expected.filter((_, i) => indices[i] < 0).join(", ")}`).toBe(true);
    expect([...indices].sort((a, b) => a - b)).toEqual(indices);
  });

  it("gives the featured apps their own compositions, with two phones for Labeeny", () => {
    render(<Home />);
    const featured = screen.getByTestId("featured-apps");
    for (const id of ["labeeny", "fahim-edtech", "min-bayty", "birdy-consults", "sayed"]) {
      expect(within(featured).getByTestId(`composition-${id}`)).toBeInTheDocument();
    }
    const labeeny = within(featured).getByTestId("composition-labeeny");
    expect(within(labeeny).getAllByRole("img").filter((i) => i.getAttribute("alt")?.length).length).toBeGreaterThanOrEqual(2);
  });

  it("lists every product without a composition in the also-shipped list", () => {
    render(<Home />);
    const ledger = screen.getByTestId("app-ledger");
    const composed = new Set(["labeeny", "captain-labeeny", "min-bayty", "birdy-consults", "sayed", ...getFamilies().flatMap((f) => f.members)]);
    const rest = getProducts().filter((p) => !composed.has(p.slug));
    expect(rest.length).toBeGreaterThan(0);
    for (const p of rest) expect(within(ledger).getByRole("link", { name: p.name })).toBeInTheDocument();
  });

  it("shows engineering highlights on every featured panel", () => {
    render(<Home />);
    const lists = within(screen.getByTestId("featured-apps")).getAllByRole("list", { name: "What I engineered" });
    expect(lists.length).toBeGreaterThanOrEqual(5);
  });
});
