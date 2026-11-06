import Link from "next/link";

export type PrevNextLink = { href: string; label: string };

export function PrevNext({
  prev,
  next,
  labels = { more: "More case studies", previous: "Previous", next: "Next" },
}: {
  prev?: PrevNextLink;
  next?: PrevNextLink;
  labels?: { more: string; previous: string; next: string };
}) {
  if (!prev && !next) return null;
  return (
    <nav aria-label={labels.more} className="mt-24 grid gap-px overflow-hidden rounded-[6px] border border-rule bg-rule sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className="group bg-paper p-6 transition-colors hover:bg-surface md:p-8">
          <span className="block text-step--1 text-muted">{labels.previous}</span>
          <span className="mt-1 block text-step-2 font-semibold tracking-tight group-hover:text-laurel">{prev.label}</span>
        </Link>
      ) : (
        <span className="hidden bg-paper sm:block" />
      )}
      {next ? (
        <Link href={next.href} className="group bg-paper p-6 text-end transition-colors hover:bg-surface md:p-8">
          <span className="block text-step--1 text-muted">{labels.next}</span>
          <span className="mt-1 block text-step-2 font-semibold tracking-tight group-hover:text-laurel">{next.label}</span>
        </Link>
      ) : (
        <span className="hidden bg-paper sm:block" />
      )}
    </nav>
  );
}
