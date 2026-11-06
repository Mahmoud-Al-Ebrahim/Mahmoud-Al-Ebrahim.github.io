import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export function absoluteUrl(path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${siteConfig.url}${clean}`;
}

/** The pre-generated share image for a path (see scripts/og.tsx). */
export function ogImagePath(path: string): string {
  const m = path.match(/^\/(apps|projects)\/([a-z0-9-]+)$/);
  return m ? `/og/${m[1]}-${m[2]}.png` : "/og/home.png";
}

/**
 * Page metadata with canonical, Open Graph and Twitter fields. The root layout
 * supplies the title template; pass `absoluteTitle` for the home page.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  image = image ?? absoluteUrl(ogImagePath(path));
  const fullTitle = absoluteTitle ? title : `${title} · ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url,
      locale: "en_US",
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Senior Flutter Developer and Mobile Architect",
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    sameAs: [siteConfig.github, siteConfig.linkedin],
    address: { "@type": "PostalAddress", addressLocality: "Aleppo", addressCountry: "SY" },
    knowsAbout: ["Flutter", "Dart", "Mobile architecture", "Node.js", "GraphQL", "On-device machine learning"],
  };
}
