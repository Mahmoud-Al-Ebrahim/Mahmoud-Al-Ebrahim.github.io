"use client";

import { DiagramFrame, type DiagramNode } from "./diagram-frame";
import { Box, Defs, Edge } from "./primitives";
import type { DiagramProps } from "./index";

const NODES: DiagramNode[] = [
  { id: "t-endpoints", label: "Endpoint coverage test", detail: "Collects every Bloc event that calls an endpoint and asserts some screen dispatches it. A short allowlist covers events raised by other Blocs." },
  { id: "t-locale", label: "Localization test", detail: "Scans Dart files for Arabic characters outside the locale keys, and checks both locale files share identical keys and every typed key resolves." },
  { id: "t-session", label: "Session-clear test", detail: "Every Bloc must declare a Clear event and every sign-out must route through the single helper that clears all of them." },
  { id: "t-scope", label: "Provider-scope test", detail: "No role shell may re-provide a root Bloc; a second instance would split state silently." },
  { id: "blocs", label: "17 Blocs", detail: "One template: per-action status enums, copyWith state, a Clear event. All provided at the app root so pushed routes reach them." },
  { id: "screens", label: "56 screens", detail: "Customer, store owner, payment employee and super admin shells." },
  { id: "locales", label: "2 locale files", detail: "ar-SY and en-US with roughly 600 keys each, read through typed constants." },
  { id: "signout", label: "Sign-out helper", detail: "clearSessionBlocs: the one place that resets Blocs and the chat singleton when the account changes." },
];

export function TestGuardsDiagram({ compact = false }: DiagramProps) {
  return (
    <DiagramFrame
      title="Tests that read the source tree"
      description="fashion_store's four architecture-guard tests and the conventions each one enforces at build time."
      nodes={NODES}
      minWidth={compact ? 620 : 720}
    >
      {(ctx) => (
        <svg viewBox="0 0 760 300" width="100%" role="presentation" style={{ display: "block" }}>
          <Defs />
          <text x={20} y={24} fontSize={11} fontFamily="var(--font-display)" fontStyle="italic" fill="var(--laurel)" aria-hidden>
            Guard tests
          </text>
          <text x={520} y={24} fontSize={11} fontFamily="var(--font-display)" fontStyle="italic" fill="var(--laurel)" aria-hidden>
            What they protect
          </text>
          <Box id="t-endpoints" x={20} y={40} w={220} h={44} label="Endpoint coverage" sub="event ↔ screen" ctx={ctx} tone="laurel" />
          <Box id="t-locale" x={20} y={104} w={220} h={44} label="Localization" sub="no raw Arabic · equal keys" ctx={ctx} tone="laurel" />
          <Box id="t-session" x={20} y={168} w={220} h={44} label="Session clear" sub="Clear event ↔ sign-out" ctx={ctx} tone="laurel" />
          <Box id="t-scope" x={20} y={232} w={220} h={44} label="Provider scope" sub="root Blocs provided once" ctx={ctx} tone="laurel" />

          <Box id="blocs" x={520} y={40} w={220} h={44} label="17 Blocs" sub="one template" ctx={ctx} />
          <Box id="screens" x={520} y={104} w={220} h={44} label="56 screens" sub="4 role shells" ctx={ctx} />
          <Box id="locales" x={520} y={168} w={220} h={44} label="2 locale files" sub="~600 keys each" ctx={ctx} />
          <Box id="signout" x={520} y={232} w={220} h={44} label="Sign-out helper" sub="clearSessionBlocs" ctx={ctx} />

          <Edge from={[240, 62]} to={[520, 62]} />
          <Edge from={[240, 62]} to={[520, 126]} via={[[380, 62], [380, 126]]} />
          <Edge from={[240, 126]} to={[520, 190]} via={[[360, 126], [360, 190]]} />
          <Edge from={[240, 190]} to={[520, 254]} via={[[400, 190], [400, 254]]} />
          <Edge from={[240, 190]} to={[520, 62]} via={[[340, 190], [340, 62]]} dashed />
          <Edge from={[240, 254]} to={[520, 126]} via={[[420, 254], [420, 126]]} dashed />
          <Edge from={[240, 254]} to={[520, 62]} via={[[300, 254], [300, 62]]} dashed />
        </svg>
      )}
    </DiagramFrame>
  );
}
