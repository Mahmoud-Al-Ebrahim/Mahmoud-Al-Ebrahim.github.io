import Link from "next/link";
import { Section } from "@/components/ui/section";
import { getExperience } from "@/lib/content";

function fmt(ym: string): string {
  if (ym === "present") return "now";
  const [y, m] = ym.split("-");
  return new Date(Date.UTC(Number(y), Number(m) - 1, 1)).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

export function ExperienceTimeline({ compact = true }: { compact?: boolean }) {
  const entries = getExperience();
  return (
    <Section
      id="experience"
      title="Experience"
      layout="split"
      lede="Five years shipping Flutter for delivery, commerce, education and health products, three of them leading teams, and eight years of teaching alongside."
      aside={
        compact ? (
          <Link href="/resume" className="link">
            Full résumé
          </Link>
        ) : null
      }
    >
      <ol className="divide-y divide-rule border-y border-rule">
        {entries.map((e) => (
          <li key={`${e.company}-${e.start}`} className="grid gap-2 py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
            <p className="text-step--1 tabular-nums text-muted sm:pt-1">
              <time dateTime={e.start}>{fmt(e.start)}</time> to {e.end === "present" ? "now" : <time dateTime={e.end}>{fmt(e.end)}</time>}
            </p>
            <div>
              <h3 className="text-step-1">
                {e.role}, <span className="font-[400]">{e.company}</span>
              </h3>
              <p className="text-step--1 text-muted">{e.location}</p>
              <ul className="mt-3 max-w-[64ch] space-y-1.5 text-muted">
                {(compact ? e.bullets.slice(0, 1) : e.bullets).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
