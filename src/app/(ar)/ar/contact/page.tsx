import { contactMetadata, ContactView } from "@/views/contact";

export const metadata = contactMetadata("ar");

export default function ContactPage() {
  return <ContactView locale="ar" />;
}
