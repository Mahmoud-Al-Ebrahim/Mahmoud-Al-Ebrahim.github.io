import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper border border-ink hover:bg-transparent hover:text-ink",
  secondary: "bg-transparent text-ink border border-ink/30 hover:border-ink",
  ghost: "bg-transparent text-ink border border-transparent hover:border-rule",
};

export function Button({
  href,
  variant = "primary",
  children,
  download,
  external,
  className,
  style,
  "aria-label": ariaLabel,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  download?: boolean;
  external?: boolean;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
}) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-step-0 font-medium transition-colors duration-200",
    variants[variant],
    className,
  );
  const isInternal = href.startsWith("/") && !download && !external;
  if (isInternal) {
    return (
      <Link href={href} className={classes} style={style} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={classes}
      style={style}
      aria-label={ariaLabel}
      download={download ? "" : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
