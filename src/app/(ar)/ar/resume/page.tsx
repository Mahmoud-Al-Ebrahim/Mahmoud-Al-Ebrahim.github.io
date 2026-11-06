import { resumeMetadata, ResumeView } from "@/views/resume";

export const metadata = resumeMetadata("ar");

export default function ResumePage() {
  return <ResumeView locale="ar" />;
}
