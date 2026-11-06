import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

type Pair = { title: string; detail: string };

/** Challenge on the left, the matching solution on the right. */
export function Challenges({ challenges, solutions, locale = "en" }: { challenges: Pair[]; solutions: Pair[]; locale?: Locale }) {
  if (challenges.length === 0) return null;
  const t = getDictionary(locale).caseStudy;
  return (
    <ol className="divide-y divide-rule border-y border-rule">
      {challenges.map((c, i) => {
        const s = solutions[i];
        return (
          <li key={c.title} className="grid gap-4 py-6 md:grid-cols-2 md:gap-8">
            <div>
              <p className="text-step--1 text-muted">{t.challenge}</p>
              <h3 className="mt-1 text-step-1">{c.title}</h3>
              <p className="mt-2 text-muted">{c.detail}</p>
            </div>
            {s ? (
              <div className="border-s border-laurel/40 ps-5">
                <p className="text-step--1 text-laurel">{t.solution}</p>
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
