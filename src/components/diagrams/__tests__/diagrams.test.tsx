import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DIAGRAMS } from "@/components/diagrams";
import { DiagramIdSchema } from "@/content/schema";

describe("interactive diagrams", () => {
  it("registers a component for every diagram id", () => {
    for (const id of DiagramIdSchema.options) {
      expect(DIAGRAMS[id], `missing diagram ${id}`).toBeDefined();
    }
  });

  for (const id of DiagramIdSchema.options) {
    it(`${id}: renders a figure with a text alternative and an interactive legend`, () => {
      const Diagram = DIAGRAMS[id]!;
      render(<Diagram />);
      const figure = screen.getByRole("figure");
      expect(within(figure).getByText(/./, { selector: "figcaption" })).toBeInTheDocument();
      const buttons = within(figure).getAllByRole("button");
      expect(buttons.length).toBeGreaterThanOrEqual(3);
      expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
      fireEvent.click(buttons[0]);
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      const live = within(figure).getByRole("status");
      expect(live.textContent?.length ?? 0).toBeGreaterThan(10);
    });
  }
});
