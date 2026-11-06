import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

/**
 * A top-level page section. `night` renders the dark systems surface whatever
 * the page theme. The header can sit beside the content (`split`) or above it.
 */
export function Section({
  id,
  title,
  lede,
  children,
  className,
  width = "content",
  aside,
  tone = "default",
  layout = "stacked",
}: {
  id: string;
  title: string;
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
  width?: "content" | "wide";
  aside?: ReactNode;
  tone?: "default" | "night";
  layout?: "stacked" | "split";
}) {
  const header = (
    <div className={cn(layout === "split" ? "md:col-span-4" : "md:col-span-8")}>
      <h2 id={`${id}-title`} className="text-step-4">
        {title}
      </h2>
      {lede ? <p className="mt-4 max-w-[52ch] text-step-1 text-muted">{lede}</p> : null}
      {aside && layout === "split" ? <div className="mt-6">{aside}</div> : null}
    </div>
  );
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("py-20 md:py-28", tone === "night" && "night", className)}>
      <Container width={width}>
        {layout === "split" ? (
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            {header}
            <div className="min-w-0 md:col-span-8">{children}</div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-12 md:gap-8">
              {header}
              {aside ? <div className="self-end md:col-span-4 md:text-end">{aside}</div> : null}
            </div>
            <div className="mt-12 md:mt-16">{children}</div>
          </>
        )}
      </Container>
    </section>
  );
}
