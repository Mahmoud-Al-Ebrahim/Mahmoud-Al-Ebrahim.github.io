"use client";

import { useSyncExternalStore } from "react";
import { IconMoon, IconSun } from "@/components/icons";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getServerSnapshot(): Theme | null {
  return null;
}

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    mq.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

export function ThemeToggle({
  className,
  labels = { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
}: {
  className?: string;
  labels?: { toLight: string; toDark: string };
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: theme still applies for this page */
    }
  }

  const isDark = theme === "dark";
  const label = isDark ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-[3px] border border-rule text-ink transition-colors hover:border-ink",
        className,
      )}
    >
      {theme === null ? <span className="h-5 w-5" /> : isDark ? <IconSun /> : <IconMoon />}
    </button>
  );
}
