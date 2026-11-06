import { writingMetadata, WritingView } from "@/views/writing";

export const metadata = writingMetadata("ar");

export default function WritingPage() {
  return <WritingView locale="ar" />;
}
