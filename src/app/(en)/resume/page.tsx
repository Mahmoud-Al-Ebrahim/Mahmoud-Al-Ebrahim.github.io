import { resumeMetadata, ResumeView } from "@/views/resume";

export const metadata = resumeMetadata("en");

export default function ResumePage() {
  return <ResumeView locale="en" />;
}
