import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Writing",
  description:
    "Technical notes on on-device CLIP search, generic repositories, architecture-guard tests and prefetching in Flutter.",
  path: "/writing",
});

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export default function WritingPage() {
  const articles = getArticles();
  return (
    <Container as="main" id="main" className="py-12 md:py-20">
      <h1 className="text-step-5">Writing</h1>
      <p className="mt-4 max-w-[60ch] text-step-1 text-muted">
        Decisions from real codebases, written so another engineer could reproduce them. Each note ends with what I would do differently.
      </p>
      <ul className="mt-10 divide-y divide-rule border-y border-rule">
        {articles.map((a) => (
          <li key={a.slug} className="grid gap-3 py-8 md:grid-cols-12 md:gap-8">
            <div className="text-step--1 text-muted md:col-span-3">
              <p>{formatDate(a.date)}</p>
              <p>
                {a.source} · {a.readingMinutes} min
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-step-2">
                <Link href={`/writing/${a.slug}`} className="hover:text-laurel">
                  {a.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-[62ch] text-muted">{a.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
