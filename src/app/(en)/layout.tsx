import { rootMetadata, rootViewport, RootDocument } from "@/views/root-document";
import "../globals.css";

export const metadata = rootMetadata("en");
export const viewport = rootViewport;

/** Root layout for the English site (URLs at the root). */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
