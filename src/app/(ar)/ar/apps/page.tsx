import { appsMetadata, AppsView } from "@/views/apps";

export const metadata = appsMetadata("ar");

export default function AppsPage() {
  return <AppsView locale="ar" />;
}
