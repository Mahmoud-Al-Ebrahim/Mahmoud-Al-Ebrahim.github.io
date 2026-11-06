import Link from "next/link";
import { AppIcon } from "@/components/ui/app-icon";
import { Container } from "@/components/ui/container";
import { StoreBadges } from "@/components/ui/store-badges";
import { DOMAIN_LABELS, ROLE_LABELS, type Product } from "@/content/schema";
import { storeUrls } from "@/lib/stores";

/** The remaining products as one compact, scannable list. */
export function AlsoShipped({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <Container width="wide" className="py-16 md:py-20">
      <div className="grid gap-8 md:grid-cols-12">
        <h3 className="text-step-2 md:col-span-3">Also shipped</h3>
        <ul data-testid="app-ledger" className="divide-y divide-rule border-y border-rule md:col-span-9">
          {products.map((p) => (
            <li key={p.slug} className="grid grid-cols-[52px_1fr] items-center gap-x-5 gap-y-3 py-5 md:grid-cols-[52px_minmax(0,1.2fr)_minmax(0,1.6fr)_auto]">
              <AppIcon slug={p.slug} src={p.icon} size={52} morph={false} />
              <div className="min-w-0">
                <Link href={`/apps/${p.slug}`} className="text-step-1 font-medium hover:text-laurel">
                  {p.name}
                </Link>
                {p.nameAr ? (
                  <span lang="ar" dir="rtl" className="ml-2 font-arabic text-muted">
                    {p.nameAr}
                  </span>
                ) : null}
                <p className="text-step--1 text-muted">
                  {DOMAIN_LABELS[p.domain]}, {p.roleLabel ?? ROLE_LABELS[p.role].toLowerCase()} for {p.publisher}
                </p>
              </div>
              <p className="col-span-2 text-muted md:col-span-1">{p.tagline}</p>
              <div className="col-span-2 md:col-span-1">
                <StoreBadges name={p.name} size="sm" {...storeUrls(p.stores)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
