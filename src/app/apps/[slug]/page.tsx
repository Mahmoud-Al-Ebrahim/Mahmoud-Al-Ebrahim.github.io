import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppCaseStudy } from "@/components/apps/app-case-study";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/content/site";
import { getAppEntry, getAppSlugs, getFamilyMembers } from "@/lib/content";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAppSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getAppEntry(slug);
  if (!entry) return {};
  return buildMetadata({ title: entry.name, description: entry.tagline, path: `/apps/${slug}` });
}

function applicationJsonLd(slug: string) {
  const entry = getAppEntry(slug);
  if (!entry) return null;
  const products = entry.kind === "family" ? getFamilyMembers(entry) : [entry];
  const os = Array.from(new Set(products.flatMap((p) => [p.stores.play && "Android", p.stores.appStore && "iOS"].filter(Boolean) as string[])));
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: entry.name,
    alternateName: entry.nameAr,
    description: entry.tagline,
    applicationCategory: "MobileApplication",
    operatingSystem: os.join(", "),
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: entry.publisher },
    url: absoluteUrl(`/apps/${slug}`),
  };
}

export default async function AppPage({ params }: Props) {
  const { slug } = await params;
  if (!getAppEntry(slug)) notFound();
  const ld = applicationJsonLd(slug);
  return (
    <>
      {ld ? <JsonLd data={ld} /> : null}
      <AppCaseStudy slug={slug} />
    </>
  );
}
