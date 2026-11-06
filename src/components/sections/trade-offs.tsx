import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getTradeOffs } from "@/lib/content";

/** Three worked decisions: situation, options, choice, outcome. */
export function TradeOffs({ locale = "en" }: { locale?: Locale }) {
  const tradeOffs = getTradeOffs(locale);
  const labels = getDictionary(locale).tradeOffs;
  return (
    <ol className="divide-y divide-rule border-y border-rule">
      {tradeOffs.map((t, i) => (
        <li key={t.title} className="grid gap-5 py-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="font-display text-step-1 text-muted">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-1 text-step-2">{t.title}</h3>
            <p className="mt-3 text-muted">{t.situation}</p>
            <Link href={t.project.href} className="mt-3 inline-block text-step--1 text-laurel underline">
              {t.project.label}
            </Link>
          </div>
          <dl className="space-y-5 md:col-span-8">
            <div>
              <dt className="text-step--1 text-muted">{labels.options}</dt>
              <dd>
                <ol className="mt-2 list-decimal space-y-2 ps-5">
                  {t.options.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ol>
              </dd>
            </div>
            <div className="border-s-2 border-laurel ps-4">
              <dt className="text-step--1 text-laurel">{labels.choice}</dt>
              <dd className="mt-1">{t.choice}</dd>
            </div>
            <div>
              <dt className="text-step--1 text-muted">{labels.outcome}</dt>
              <dd className="mt-1 text-muted">{t.outcome}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ol>
  );
}
