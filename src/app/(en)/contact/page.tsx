import { contactMetadata, ContactView } from "@/views/contact";

export const metadata = contactMetadata("en");

export default function ContactPage() {
  return <ContactView locale="en" />;
}
