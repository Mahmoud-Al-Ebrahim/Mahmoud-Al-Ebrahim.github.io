type Pair = { title: string; detail: string };

/** Challenge on the left, the matching solution on the right. */
export function Challenges({ challenges, solutions }: { challenges: Pair[]; solutions: Pair[] }) {
  if (challenges.length === 0) return null;
  return (
    <ol className="divide-y divide-rule border-y border-rule">
      {challenges.map((c, i) => {
        const s = solutions[i];
        return (
          <li key={c.title} className="grid gap-4 py-6 md:grid-cols-2 md:gap-8">
            <div>
              <p className="text-step--1 text-muted">Challenge</p>
              <h3 className="mt-1 text-step-1">{c.title}</h3>
              <p className="mt-2 text-muted">{c.detail}</p>
            </div>
            {s ? (
              <div className="border-l border-laurel/40 pl-5">
                <p className="text-step--1 text-laurel">Solution</p>
                <h3 className="mt-1 text-step-1">{s.title}</h3>
                <p className="mt-2 text-muted">{s.detail}</p>
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
