import { aboutMetadata, AboutView } from "@/views/about";

export const metadata = aboutMetadata("ar");

export default function AboutPage() {
  return <AboutView locale="ar" />;
}
