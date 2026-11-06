import { homeMetadata, HomeView } from "@/views/home";

export const metadata = homeMetadata("en");

export default function Home() {
  return <HomeView locale="en" />;
}
