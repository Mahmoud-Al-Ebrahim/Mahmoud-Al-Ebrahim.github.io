import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StoreBadges } from "@/components/ui/store-badges";

describe("StoreBadges", () => {
  it("renders only the Play badge when no App Store link exists", () => {
    render(<StoreBadges name="Atmtha" play={{ url: "https://play.google.com/store/apps/details?id=com.atmtha.app" }} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName(/Get it on\s*Google Play\s*for Atmtha/);
    expect(screen.queryByText(/app store/i)).not.toBeInTheDocument();
  });

  it("renders both badges with external-link safety attributes", () => {
    render(
      <StoreBadges
        name="Labeeny"
        play={{ url: "https://play.google.com/store/apps/details?id=com.kwanx.deliverex.user" }}
        appStore={{ url: "https://apps.apple.com/us/app/id6761486192" }}
      />,
    );
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    }
    expect(screen.getByRole("link", { name: /Download on the\s*App Store\s*for Labeeny/ })).toBeInTheDocument();
  });
});
