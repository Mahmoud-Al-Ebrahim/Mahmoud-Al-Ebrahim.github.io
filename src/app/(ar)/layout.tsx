import { rootMetadata, rootViewport, RootDocument } from "@/views/root-document";
import "../globals.css";

export const metadata = rootMetadata("ar");
export const viewport = rootViewport;

/** Root layout for the Arabic site, right to left, under /ar. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="ar">{children}</RootDocument>;
}
