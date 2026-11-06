import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import WritingPage from "@/app/writing/page";
import ResumePage from "@/app/resume/page";
import ContactPage from "@/app/contact/page";
import NotFound from "@/app/not-found";
import { getArticles } from "@/lib/content";

describe("/about", () => {
  it("renders the five sections in order", () => {
    render(<AboutPage />);
    const h2s = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent?.trim());
    const expected = ["Background", "Engineering philosophy", "How I solve problems", "Learning and teaching", "Education and awards"];
    const idx = expected.map((e) => h2s.findIndex((h) => h?.startsWith(e)));
    expect(idx.every((i) => i >= 0), `missing: ${expected.filter((_, i) => idx[i] < 0).join(", ")}`).toBe(true);
    expect([...idx].sort((a, b) => a - b)).toEqual(idx);
  });
});

describe("/writing", () => {
  it("lists the articles newest first", () => {
    render(<WritingPage />);
    const titles = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent?.trim());
    expect(titles).toEqual(getArticles().map((a) => a.title));
  });
});

describe("/resume", () => {
  it("offers the PDF download and lists experience", () => {
    render(<ResumePage />);
    expect(screen.getAllByRole("link", { name: /download/i })[0]).toHaveAttribute("href", "/Mahmoud-AlEbrahim.pdf");
    expect(screen.getByText(/KwanX/)).toBeInTheDocument();
  });
});

describe("/contact", () => {
  it("has a mailto link and the availability line", () => {
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: /ma453935@gmail.com/ })).toHaveAttribute("href", "mailto:ma453935@gmail.com");
    expect(screen.getByText(/Open to senior Flutter/)).toBeInTheDocument();
  });
});

describe("not-found", () => {
  it("links to the apps and projects collections", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: /published applications/i })).toHaveAttribute("href", "/apps");
    expect(screen.getByRole("link", { name: /engineering projects/i })).toHaveAttribute("href", "/projects");
  });
});
