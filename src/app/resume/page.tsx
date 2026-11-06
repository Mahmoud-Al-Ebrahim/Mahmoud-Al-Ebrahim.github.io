import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { IconDownload } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { awards } from "@/content/education";
import { siteConfig } from "@/content/site";
import { languages, skills } from "@/content/skills";
import { getEducation, getExperience } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Résumé",
  description:
    "Résumé of Mahmoud AlEbrahim, senior Flutter engineer and mobile architect, with a downloadable PDF.",
  path: "/resume",
});

function fmt(ym: string): string {
  if (ym === "present") return "Present";
  const [y, m] = ym.split("-");
  return new Date(Date.UTC(Number(y), Number(m) - 1, 1)).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

export default function ResumePage() {
  const experience = getExperience();
  const education = getEducation();
  return (
    <Container as="main" id="main" className="py-12 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-step-5">Résumé</h1>
          <p className="mt-3 max-w-[60ch] text-step-1 text-muted">
            {siteConfig.name}, senior Flutter engineer and mobile architect, {siteConfig.location}.
          </p>
        </div>
        <Button href={siteConfig.resumePath} download>
          <IconDownload /> Download the PDF
        </Button>
      </div>

      <section aria-labelledby="r-exp" className="mt-14">
        <h2 id="r-exp" className="text-step-3">
          Experience
        </h2>
        <ol className="mt-6 divide-y divide-rule border-y border-rule">
          {experience.map((e) => (
            <li key={`${e.company}-${e.start}`} className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
              <p className="font-mono text-step--1 text-muted md:col-span-3">
                {fmt(e.start)} – {fmt(e.end)}
              </p>
              <div className="md:col-span-9">
                <h3 className="text-step-1">
                  {e.role} <span className="text-muted">· {e.company}</span>
                </h3>
                <p className="text-step--1 text-muted">{e.location}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="r-skills" className="mt-14">
        <h2 id="r-skills" className="text-step-3">
          Skills
        </h2>
        <dl className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {skills.map((s) => (
            <div key={s.group} className="border-t border-rule pt-3">
              <dt className="text-step--1 text-muted">{s.group}</dt>
              <dd className="mt-1">{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <section aria-labelledby="r-edu">
          <h2 id="r-edu" className="text-step-3">
            Education
          </h2>
          <ul className="mt-6 space-y-4">
            {education.map((e) => (
              <li key={e.degree}>
                <p className="text-step-1">{e.degree}</p>
                <p className="text-muted">
                  {e.institution}, {e.start}–{e.end}
                  {e.note ? ` · ${e.note}` : ""}
                </p>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-step-1">Awards</h3>
          <ul className="mt-2 space-y-1 text-muted">
            {awards.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="r-lang">
          <h2 id="r-lang" className="text-step-3">
            Languages
          </h2>
          <dl className="mt-6 space-y-3">
            {languages.map((l) => (
              <div key={l.name}>
                <dt className="text-step-1">{l.name}</dt>
                <dd className="text-muted">{l.level}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-8 text-step-1">Contact</h3>
          <p className="mt-2 text-muted">
            <a href={`mailto:${siteConfig.email}`} className="text-laurel underline">
              {siteConfig.email}
            </a>
            <br />
            {siteConfig.phone}
          </p>
        </section>
      </div>
    </Container>
  );
}
