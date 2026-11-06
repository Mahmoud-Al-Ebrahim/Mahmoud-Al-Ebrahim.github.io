"use client";

import { DiagramFrame, type DiagramNode } from "./diagram-frame";
import { Box, Defs, Edge } from "./primitives";
import type { DiagramProps } from "./index";

const NODES: DiagramNode[] = [
  { id: "usecase", label: "Use cases", detail: "Seventy-six use cases call repositories; none knows which service answers." },
  { id: "api", label: "BaseApi<T>", detail: "One generic HTTP client over Dio. A RequestConfig<T> carries the path, method, body and a fromJson; the client adds the right bearer token, locale and country headers for the target server." },
  { id: "enum", label: "ServerName", detail: "An enum (market, chat, stories, elastic, cloudinary, gemini, location) that selects the base URL and the token to attach. Base URLs are switchable at runtime for QA." },
  { id: "tokens", label: "Token store", detail: "Login fans out to three services and stores each token under its server name. The client looks tokens up by enum, never by string." },
  { id: "market", label: "Market API", detail: "Boutiques, categories, products, cart, back-in-stock alerts." },
  { id: "chat", label: "Chat API", detail: "Conversations, media messages, receipts. Live delivery arrives through FCM data messages." },
  { id: "stories", label: "Stories API", detail: "Product stories; media uploaded to Cloudinary first." },
  { id: "elastic", label: "Search", detail: "Elasticsearch-backed product search; Gemini handles search by image." },
  { id: "log", label: "Logging interceptor", detail: "Records request timings into Firebase Analytics and keeps a local request log for support." },
];

export function MultiBackendDiagram({ compact = false }: DiagramProps) {
  return (
    <DiagramFrame
      title="One HTTP stack, four services"
      description="How Trydos talks to its market, chat, stories and search backends with distinct tokens through a single generic client."
      nodes={NODES}
      minWidth={compact ? 640 : 760}
    >
      {(ctx) => (
        <svg viewBox="0 0 800 300" width="100%" role="presentation" style={{ display: "block" }}>
          <Defs />
          <Box id="usecase" x={20} y={118} w={150} h={48} label="Use cases" sub="76 × Either" ctx={ctx} />
          <Box id="api" x={230} y={118} w={170} h={48} label="BaseApi<T>" sub="RequestConfig<T>" ctx={ctx} tone="laurel" />
          <Box id="enum" x={460} y={118} w={150} h={48} label="ServerName" sub="enum → URL + token" ctx={ctx} tone="laurel" />
          <Box id="tokens" x={230} y={20} w={170} h={44} label="Token store" sub="one per server" ctx={ctx} />
          <Box id="log" x={230} y={222} w={170} h={44} label="Logging interceptor" sub="timings → analytics" ctx={ctx} tone="muted" />
          <Box id="market" x={660} y={12} w={125} h={44} label="Market API" ctx={ctx} />
          <Box id="chat" x={660} y={82} w={125} h={44} label="Chat API" ctx={ctx} />
          <Box id="stories" x={660} y={152} w={125} h={44} label="Stories API" ctx={ctx} />
          <Box id="elastic" x={660} y={222} w={125} h={44} label="Search" sub="Elastic · Gemini" ctx={ctx} />

          <Edge from={[170, 142]} to={[230, 142]} label="request" />
          <Edge from={[400, 142]} to={[460, 142]} label="resolve" />
          <Edge from={[315, 64]} to={[315, 118]} dashed label="bearer" />
          <Edge from={[315, 166]} to={[315, 222]} dashed />
          <Edge from={[610, 142]} to={[660, 34]} via={[[635, 142], [635, 34]]} />
          <Edge from={[610, 142]} to={[660, 104]} via={[[635, 142], [635, 104]]} />
          <Edge from={[610, 142]} to={[660, 174]} via={[[635, 142], [635, 174]]} />
          <Edge from={[610, 142]} to={[660, 244]} via={[[635, 142], [635, 244]]} />
        </svg>
      )}
    </DiagramFrame>
  );
}
