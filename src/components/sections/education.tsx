import { awards } from "@/content/education";
import { getEducation } from "@/lib/content";

export function Education() {
  const entries = getEducation();
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <dl className="divide-y divide-rule border-y border-rule">
        {entries.map((e) => (
          <div key={e.degree} className="py-5">
            <dt className="text-step-1">{e.degree}</dt>
            <dd className="text-muted">
              {e.institution}, {e.start}–{e.end}
              {e.note ? ` · ${e.note}` : ""}
            </dd>
          </div>
        ))}
      </dl>
      <div>
        <h3 className="text-step-1">Competitive programming</h3>
        <ul className="mt-3 space-y-2 text-muted">
          {awards.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
