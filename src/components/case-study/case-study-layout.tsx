import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { MarginColumn, type MarginItem } from "./margin-column";
import { PrevNext, type PrevNextLink } from "./prev-next";

/** Breadcrumb back to a collection. */
export function Crumb({ href, label, current, className }: { href: string; label: string; current: string; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap gap-x-2 text-step--1" style={{ color: "var(--muted)" }}>
        <li>
          <Link href={href} className="underline decoration-1 underline-offset-4 hover:decoration-2">
            {label}
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

/**
 * Case-study body: a sticky facts column beside the story on desktop,
 * a compact facts strip above it on phones, and links to the neighbors.
 */
export function CaseStudyBody({
  margin,
  children,
  prev,
  next,
  after,
}: {
  margin: MarginItem[];
  children: ReactNode;
  prev?: PrevNextLink;
  next?: PrevNextLink;
  after?: ReactNode;
}) {
  return (
    <Container width="wide" className="py-14 md:py-20">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <MarginColumn items={margin} />
        <div className="min-w-0 md:col-span-8 md:col-start-5">{children}</div>
      </div>
      {after}
      <PrevNext prev={prev} next={next} />
    </Container>
  );
}

/** A case-study section heading with consistent spacing. */
export function StudySection({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} aria-label={title} className="mt-16 first:mt-0">
      <h2 className="mb-5 text-step-3">{title}</h2>
      {children}
    </section>
  );
}
