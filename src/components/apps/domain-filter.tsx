"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Filters a server-rendered list by its rows' `data-domain`. The links are real
 * URLs (`/apps?domain=education`), so a shared link opens filtered; without
 * JavaScript every row stays visible.
 */
export function DomainFilter({
  domains,
  listId,
  labels = { aria: "Filter by domain", all: "All" },
}: {
  domains: { id: string; label: string }[];
  listId: string;
  labels?: { aria: string; all: string };
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const read = () => {
      const d = new URLSearchParams(window.location.search).get("domain");
      setActive(d && domains.some((x) => x.id === d) ? d : null);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [domains]);

  useEffect(() => {
    const list = document.getElementById(listId);
    if (!list) return;
    list.querySelectorAll<HTMLElement>("[data-domain]").forEach((row) => {
      row.hidden = active !== null && row.dataset.domain !== active;
    });
  }, [active, listId]);

  function choose(e: React.MouseEvent<HTMLAnchorElement>, id: string | null) {
    e.preventDefault();
    const url = id ? `?domain=${id}` : window.location.pathname;
    window.history.pushState(null, "", url);
    setActive(id);
  }

  const chip = (selected: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 text-step--1 transition-colors",
      selected ? "border-ink bg-ink text-paper" : "border-rule text-ink hover:border-ink",
    );

  return (
    <nav aria-label={labels.aria} className="flex flex-wrap gap-2">
      <a href="?" onClick={(e) => choose(e, null)} aria-current={active === null ? "true" : undefined} className={chip(active === null)}>
        {labels.all}
      </a>
      {domains.map((d) => (
        <a
          key={d.id}
          href={`?domain=${d.id}`}
          onClick={(e) => choose(e, d.id)}
          aria-current={active === d.id ? "true" : undefined}
          className={chip(active === d.id)}
        >
          {d.label}
        </a>
      ))}
    </nav>
  );
}
