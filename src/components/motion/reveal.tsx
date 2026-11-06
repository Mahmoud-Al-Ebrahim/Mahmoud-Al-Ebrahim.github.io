"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tag = "div" | "section" | "li" | "span" | "article" | "figure";

declare global {
  interface Window {
    __hy?: boolean;
  }
}

/**
 * Lifts content into place the first time it scrolls into view.
 *
 * The hidden state is CSS-only and applies when JavaScript is running
 * (`html.js`) and motion is allowed, so server HTML, no-JS visitors and
 * reduced-motion users always see everything.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: Tag;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.__hy = true;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error -- the ref type varies with the tag
      ref={ref}
      data-reveal=""
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
