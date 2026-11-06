import { homeMetadata, HomeView } from "@/views/home";

export const metadata = homeMetadata("ar");

export default function Home() {
  return <HomeView locale="ar" />;
}
