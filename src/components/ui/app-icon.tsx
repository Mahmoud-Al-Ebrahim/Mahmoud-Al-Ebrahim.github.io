import Image from "next/image";
import { ViewTransition } from "react";
import { cn } from "@/lib/cn";

/**
 * An app icon. Icons with the same slug morph into each other across route
 * changes (home shelf, collection rows, case-study header).
 */
export function AppIcon({
  slug,
  src,
  size = 56,
  className,
  priority = false,
  morph = true,
}: {
  slug: string;
  src: string;
  size?: number;
  className?: string;
  priority?: boolean;
  /** Only one icon per slug may morph on a page; pass false for repeats. */
  morph?: boolean;
}) {
  const img = (
    <Image
        src={src}
        alt=""
        width={size}
        height={size}
        priority={priority}
        className={cn("shrink-0 rounded-[22%] ring-1 ring-black/10", className)}
        style={{ width: size, height: size }}
      />
  );
  return morph ? (
    <ViewTransition name={`app-icon-${slug}`} share="morph" default="none">
      {img}
    </ViewTransition>
  ) : (
    img
  );
}
