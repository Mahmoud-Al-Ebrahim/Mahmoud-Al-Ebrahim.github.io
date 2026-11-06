import type { ReactNode } from "react";

export type MarginItem = { label: string; value: ReactNode };

/** Sticky facts column on desktop; a two-column strip on phones. */
export function MarginColumn({ items, label = "Facts" }: { items: MarginItem[]; label?: string }) {
  return (
    <aside aria-label={label} className="md:col-span-3">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-rule py-5 md:sticky md:top-24 md:grid-cols-1 md:border-y-0 md:py-0">
        {items.map((item) => (
          <div key={item.label} className="min-w-0">
            <dt className="text-step--1 text-muted">{item.label}</dt>
            <dd className="mt-1 break-words">{item.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
