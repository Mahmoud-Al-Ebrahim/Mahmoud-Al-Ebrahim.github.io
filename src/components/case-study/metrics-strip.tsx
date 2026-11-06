export function MetricsStrip({ metrics }: { metrics: { label: string; value: string }[] }) {
  if (metrics.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-5">
      {metrics.map((m) => (
        <div key={m.label} className="bg-paper p-4 md:p-5">
          <dt className="text-step--1 text-muted">{m.label}</dt>
          <dd className="mt-1 text-step-2 font-semibold tracking-tight">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}
