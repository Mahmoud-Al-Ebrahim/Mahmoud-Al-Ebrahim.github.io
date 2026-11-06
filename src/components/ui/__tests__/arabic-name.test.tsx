import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArabicName } from "@/components/ui/arabic-name";

describe("ArabicName", () => {
  it("marks the Arabic name with lang and dir so screen readers and shaping are correct", () => {
    render(<ArabicName latin="Labeeny" arabic="لبيني" />);
    const ar = screen.getByText("لبيني");
    expect(ar).toHaveAttribute("lang", "ar");
    expect(ar).toHaveAttribute("dir", "rtl");
  });

  it("renders no Arabic span when no Arabic name is given", () => {
    const { container } = render(<ArabicName latin="Birdy Consults" />);
    expect(container.querySelector("[lang='ar']")).toBeNull();
    expect(screen.getByText("Birdy Consults")).toBeInTheDocument();
  });

  it("renders as the requested heading level", () => {
    render(<ArabicName latin="Min Bayty" arabic="من بيتي" as="h2" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Min Bayty");
  });
});
