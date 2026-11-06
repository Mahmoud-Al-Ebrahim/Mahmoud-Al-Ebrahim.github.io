import { writingMetadata, WritingView } from "@/views/writing";

export const metadata = writingMetadata("en");

export default function WritingPage() {
  return <WritingView locale="en" />;
}
