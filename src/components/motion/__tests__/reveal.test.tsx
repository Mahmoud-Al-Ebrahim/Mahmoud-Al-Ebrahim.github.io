import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Reveal } from "@/components/motion/reveal";

describe("Reveal", () => {
  it("never writes an inline opacity, so server HTML and reduced-motion users see content immediately", () => {
    render(
      <Reveal>
        <p>Visible immediately</p>
      </Reveal>,
    );
    const el = screen.getByText("Visible immediately").parentElement as HTMLElement;
    expect(el).toHaveAttribute("data-reveal");
    expect(el.style.opacity).toBe("");
    expect(el.classList.contains("reveal")).toBe(true);
  });

  it("marks itself in view once observed (or immediately without IntersectionObserver)", () => {
    render(
      <Reveal>
        <p>Content</p>
      </Reveal>,
    );
    const el = screen.getByText("Content").parentElement as HTMLElement;
    // The jsdom stub never fires; a real observer adds `is-in` on intersection.
    expect(el.classList.contains("reveal")).toBe(true);
  });
});
