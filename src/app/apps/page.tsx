import type { Metadata } from "next";
import { AppsCollection } from "@/components/apps/apps-collection";
import { Container } from "@/components/ui/container";
import { getFamilies, getProducts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const ORDER = ["labeeny", "captain-labeeny", "fahim-bac", "fahim-uni", "atmtha", "coursaty", "min-bayty", "birdy-consults", "sayed", "assas", "zaman-alwasel"];

export const metadata: Metadata = buildMetadata({
  title: "Shipped apps",
  description:
    "Every app Mahmoud AlEbrahim has shipped to Google Play and the App Store: delivery, exam prep, marketplaces, veterinary care, payments and humanitarian search.",
  path: "/apps",
});

export default function AppsPage() {
  const products = [...getProducts()].sort((a, b) => {
    const ia = ORDER.indexOf(a.slug);
    const ib = ORDER.indexOf(b.slug);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
  const listings = products.reduce((n, p) => n + (p.stores.play ? 1 : 0) + (p.stores.appStore ? 1 : 0), 0);
  return (
    <Container as="main" id="main" width="wide" className="py-14 md:py-20">
      <h1 className="text-step-6 leading-[0.95]">Shipped apps</h1>
      <p className="mt-6 max-w-[56ch] text-step-1 text-muted">
        {products.length} apps across {listings} store listings, each with the role I played and a link to its case study.
      </p>
      <div className="mt-12">
        <AppsCollection products={products} families={getFamilies()} />
      </div>
    </Container>
  );
}
