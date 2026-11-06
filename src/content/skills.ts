/** Skill groups for the résumé page, as listed in the CV and verified in code. */
export const skills: { group: string; items: string[] }[] = [
  { group: "Mobile", items: ["Flutter", "Dart", "Bloc and HydratedBloc", "Riverpod", "GetX", "Provider"] },
  { group: "Architecture", items: ["Clean Architecture", "SOLID", "DDD", "MVVM", "TDD", "injectable / get_it", "go_router"] },
  { group: "Backend and data", items: ["Node.js", "MongoDB", "GraphQL", "Hasura", "Nhost", "SQL", "REST design"] },
  { group: "Integrations", items: ["Firebase", "Dio", "WebSockets and Socket.IO", "SignalR", "Google Maps", "Bluetooth", "NFC", "Sqflite and Hive"] },
  { group: "On-device AI", items: ["TensorFlow Lite", "CLIP", "ML Kit", "Dart isolates"] },
  { group: "Tooling", items: ["Git and GitLab CI/CD", "Sentry", "Smartlook", "Cloudinary", "Figma", "Adobe XD"] },
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
];
