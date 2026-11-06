import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/shell/header";
import { NAV } from "@/components/shell/nav-links";

describe("Header", () => {
  it("renders every primary navigation link", () => {
    render(<Header />);
    for (const item of NAV) {
      expect(screen.getAllByRole("link", { name: item.label }).length).toBeGreaterThan(0);
    }
    expect(NAV.map((n) => n.label)).toEqual(["Apps", "Projects", "About", "Writing", "Contact"]);
  });

  it("offers the CV as a download", () => {
    render(<Header />);
    const cv = screen.getAllByRole("link", { name: /download cv/i })[0];
    expect(cv).toHaveAttribute("href", "/Mahmoud-AlEbrahim.pdf");
    expect(cv).toHaveAttribute("download");
  });

  it("toggles the mobile menu with correct aria state", () => {
    render(<Header />);
    const button = screen.getByRole("button", { name: /open menu/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
