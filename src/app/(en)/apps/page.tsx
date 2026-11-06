import { appsMetadata, AppsView } from "@/views/apps";

export const metadata = appsMetadata("en");

export default function AppsPage() {
  return <AppsView locale="en" />;
}
