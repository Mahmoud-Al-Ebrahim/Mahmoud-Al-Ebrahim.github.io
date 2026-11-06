import type { ProjectInput } from "../schema";

export const tiktag: ProjectInput = {
  slug: "tiktag",
  name: "Tiktag",
  tagline: "NFC business cards: write a profile to a tag, share by QR, collect contacts, read the analytics.",
  year: 2024,
  kind: "hardware",
  role: "Flutter developer",
  context: "Client project",
  summary:
    "A companion app for NFC smart tags. Owners build a profile card with links, galleries, files and videos, customise a QR code whose style is stored on the server, write the card to a physical tag, collect scanned connections with CSV export, group team cards, and view time-series insights. Four languages.",
  stack: ["Flutter", "GetX", "flutter_nfc_kit", "qr_flutter", "qr_code_scanner", "fl_chart", "OAuth2", "Google and Facebook sign-in", "csv"],
  metrics: [
    { label: "Dart files", value: "113" },
    { label: "Lines", value: "13,400" },
    { label: "Controllers", value: "20" },
    { label: "Languages", value: "4" },
  ],
  honesty: [
    "Networking is untyped and split across two ad-hoc clients; this is the project I would restructure first.",
    "It has no automated tests.",
  ],
  narrative: {
    problem: "Paper business cards die in a drawer. The client sold NFC tags and needed an app that turns a tag into a living profile with measurable reach.",
    requirements: "Profile editor, server-styled QR codes, NFC provisioning, connection capture and export, team groups with a leader role, insights charts, social login, Arabic, English, French and German.",
    constraints: "ISO 7816 tags with a vendor command set. OAuth2 password and social-token grants on a Django-style backend. Product videos in the onboarding.",
    architecture: "GetX MVC: controllers per feature with reactive fields, a routes map, a constants layer for endpoints, and widgets grouped by screen.",
    decisions: "Keep QR styling on the server so a card looks the same everywhere it is rendered. Treat NFC provisioning as a transaction: poll, transceive, parse the tag UUID, PATCH it to the purchased product. Export connections to CSV in device storage rather than email.",
    implementation: "The NFC controller polls for a tag, exchanges APDUs, extracts the UUID from the tag's URI and links it to the user's card. Insights load time-series endpoints per period and render with fl_chart. Connections paginate with infinite scroll. Translations are keyed tables switched at runtime and persisted.",
    challenges: "Tag reads failing silently on some Android models. Keeping four translations in sync.",
    solutions: "Explicit timeouts and user-facing retry states around the NFC session; a single translation table with numeric keys that every screen reads from.",
    results: "A shipped companion app covering the full tag lifecycle with analytics and team features.",
    lessons: "Hardware flows need typed state machines and typed responses; the next version would get a repository layer and model classes before any new feature.",
  },
};
