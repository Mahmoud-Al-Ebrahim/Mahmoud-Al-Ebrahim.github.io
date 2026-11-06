import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAppEntry } from "@/lib/content";
import { appMetadata, appStaticParams, AppView } from "@/views/apps";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = appStaticParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return appMetadata(slug, "en");
}

export default async function AppPage({ params }: Props) {
  const { slug } = await params;
  if (!getAppEntry(slug)) notFound();
  return <AppView slug={slug} locale="en" />;
}
