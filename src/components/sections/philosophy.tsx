import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getPrinciples } from "@/lib/content";

export function Philosophy({ locale = "en" }: { locale?: Locale }) {
  const principles = getPrinciples(locale);
  return (
    <ol className="grid gap-x-10 gap-y-8 md:grid-cols-2">
      {principles.map((p) => (
        <li key={p.title} className="border-t border-rule pt-5">
          <h3 className="text-step-1">{p.title}</h3>
          <p className="mt-2 max-w-[52ch] text-muted">{p.body}</p>
          <Link href={p.evidence.href} className="mt-3 inline-block text-step--1 text-laurel underline">
            {p.evidence.label}
          </Link>
        </li>
      ))}
    </ol>
  );
}
