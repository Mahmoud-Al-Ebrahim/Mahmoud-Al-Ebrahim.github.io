import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhoneFrame } from "@/components/ui/phone-frame";

describe("PhoneFrame", () => {
  it("keeps a fixed 9:19.5 aspect ratio so screenshots of any size never shift layout", () => {
    const { container } = render(<PhoneFrame src="/apps/labeeny/shot-1.webp" alt="Labeeny home" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.aspectRatio).toBe("9 / 19.5");
  });

  it("passes the alt text through to the image", () => {
    render(<PhoneFrame src="/apps/labeeny/shot-1.webp" alt="Labeeny home" />);
    expect(screen.getByRole("img", { name: "Labeeny home" })).toBeInTheDocument();
  });
});
