/** What the project does not do. Kept deliberately; credibility comes from it. */
export function HonestyNote({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <aside aria-labelledby="honesty-title" className="mt-16 rounded-[6px] bg-surface p-6 md:p-8">
      <h2 id="honesty-title" className="text-step-1">
        What this project does not do yet
      </h2>
      <ul className="mt-3 space-y-2 text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
