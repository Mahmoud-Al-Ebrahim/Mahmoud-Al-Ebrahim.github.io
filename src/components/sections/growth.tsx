import Link from "next/link";
import { Section } from "@/components/ui/section";
import { artefacts, learningLog } from "@/content/growth";
import { getArticles, getTeaching } from "@/lib/content";

function SmartLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const external = href.startsWith("http");
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Learning, teaching and explaining, each backed by something you can open. */
export function Growth({ showArticles = true }: { showArticles?: boolean }) {
  const teaching = getTeaching();
  const articles = getArticles();
  return (
    <Section
      id="learning"
      title="Learning and teaching"
      lede="Every technology here was learned on a live project and is linked to where it shipped. The teaching started in 2018 and never stopped."
    >
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h3 className="text-step-2">What I learned, and where it shipped</h3>
          <ol className="mt-6 border-l border-rule">
            {learningLog.map((step) => (
              <li key={step.skill} className="relative grid gap-1 pb-7 pl-6 last:pb-0 sm:grid-cols-[4.5rem_1fr] sm:gap-4">
                <span aria-hidden className="absolute -left-[4.5px] top-[0.55em] h-2 w-2 rounded-full bg-laurel" />
                <p className="text-step--1 tabular-nums text-muted sm:pt-0.5">{step.year}</p>
                <div>
                  <p className="font-medium">{step.skill}</p>
                  <p className="mt-1 text-muted">{step.how}</p>
                  <SmartLink href={step.evidence.href} className="link mt-1 inline-block text-step--1">
                    {step.evidence.label}
                  </SmartLink>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-14 lg:col-span-5">
          <div>
            <h3 className="text-step-2">Teaching</h3>
            <dl className="mt-6 space-y-5">
              {teaching.map((t) => (
                <div key={t.label} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-t border-rule pt-4">
                  <dt className="text-step-3 font-semibold tracking-tight">{t.value}</dt>
                  <dd>
                    <span className="font-medium">{t.label}.</span> <span className="text-muted">{t.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="text-step-2">Documentation I write</h3>
            <ul className="mt-6 space-y-5">
              {artefacts.map((a) => (
                <li key={a.title} className="border-t border-rule pt-4">
                  <p className="font-medium">
                    {a.href ? (
                      <Link href={a.href} className="hover:text-laurel">
                        {a.title}
                      </Link>
                    ) : (
                      a.title
                    )}
                  </p>
                  <p className="mt-1 text-muted">{a.detail}</p>
                  <p className="mt-1 text-step--1 text-muted">{a.source}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showArticles ? (
        <div id="writing" className="mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-step-3">Writing</h3>
            <Link href="/writing" className="link">
              All articles
            </Link>
          </div>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-[6px] border border-rule bg-rule md:grid-cols-2">
            {articles.map((a) => (
              <li key={a.slug} className="bg-paper p-6 md:p-8">
                <p className="text-step--1 text-muted">
                  From {a.source}, {a.readingMinutes} minute read
                </p>
                <h4 className="mt-2 text-step-2">
                  <Link href={`/writing/${a.slug}`} className="hover:text-laurel">
                    {a.title}
                  </Link>
                </h4>
                <p className="mt-2 text-muted">{a.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
