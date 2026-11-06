import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Width = "content" | "wide" | "full";

const widths: Record<Width, string> = {
  content: "max-w-(--content)",
  wide: "max-w-(--wide)",
  full: "max-w-none",
};

export function Container({
  width = "content",
  as: Tag = "div",
  className,
  children,
  id,
}: {
  width?: Width;
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("mx-auto w-full px-gutter", widths[width], className)}>
      {children}
    </Tag>
  );
}
