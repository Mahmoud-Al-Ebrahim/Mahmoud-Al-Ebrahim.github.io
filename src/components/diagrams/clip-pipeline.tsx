"use client";

import { DiagramFrame, type DiagramNode } from "./diagram-frame";
import { Box, Defs, Edge, Lane } from "./primitives";
import type { DiagramProps } from "./index";

const NODES: DiagramNode[] = [
  { id: "photo", label: "Photos and videos", detail: "Loaded through photo_manager in pages of 100; videos contribute four evenly spaced frames." },
  { id: "resize", label: "Decode and resize", detail: "Decoded with package:image in the worker and resized to 224×224, normalized to the model's input range." },
  { id: "image-enc", label: "Image encoder", detail: "CLIP image encoder in TensorFlow Lite, loaded once with Interpreter.fromFile inside a long-lived worker isolate." },
  { id: "cache", label: "Embedding cache", detail: "One JSON vector per file keyed by SHA-1 of the path, with a path index in preferences. Indexing is incremental and resumable." },
  { id: "query", label: "Query", detail: "Free text in Arabic or English. Non-English is translated on device with ML Kit before encoding." },
  { id: "tokenizer", label: "BPE tokenizer", detail: "A 294-line Dart port of CLIP's byte-level BPE: byte-to-unicode table, merge ranking, per-word cache. Must match the reference token ids exactly." },
  { id: "text-enc", label: "Text encoder", detail: "CLIP text encoder in TensorFlow Lite taking a 77-token sequence." },
  { id: "rank", label: "Cosine ranking", detail: "Brute-force cosine similarity over cached vectors with a threshold, sorted descending. Fine for tens of thousands of photos." },
  { id: "isolate", label: "Worker isolate", detail: "Owns both interpreters. A message protocol (init, embed job, embed result) keeps inference off the UI thread." },
];

export function ClipPipelineDiagram({ compact = false, locale = "en" }: DiagramProps) {
  return (
    <DiagramFrame
      diagramId="clip-pipeline"
      locale={locale}
      title="CLIP on the phone"
      description="Gallery AI's offline semantic search: images and text are encoded into one vector space and ranked by cosine similarity, with nothing leaving the device."
      nodes={NODES}
      minWidth={compact ? 640 : 760}
    >
      {(ctx) => (
        <svg viewBox="0 0 800 320" width="100%" role="presentation" style={{ display: "block" }}>
          <Defs />
          <Lane x={200} y={10} w={360} h={140} label="Worker isolate" />
          <Box id="isolate" x={212} y={120} w={120} h={22} label="message protocol" ctx={ctx} tone="muted" />
          <Box id="photo" x={20} y={40} w={150} h={48} label="Photos and videos" sub="photo_manager" ctx={ctx} />
          <Box id="resize" x={220} y={40} w={150} h={48} label="Decode and resize" sub="224 × 224" ctx={ctx} />
          <Box id="image-enc" x={400} y={40} w={140} h={48} label="Image encoder" sub="TFLite" ctx={ctx} tone="laurel" />
          <Box id="cache" x={600} y={40} w={180} h={48} label="Embedding cache" sub="sha1(path) → vector" ctx={ctx} tone="laurel" />
          <Box id="query" x={20} y={210} w={150} h={48} label="Query" sub="ar → en on device" ctx={ctx} />
          <Box id="tokenizer" x={220} y={210} w={150} h={48} label="BPE tokenizer" sub="pure Dart" ctx={ctx} tone="laurel" />
          <Box id="text-enc" x={400} y={210} w={140} h={48} label="Text encoder" sub="77 tokens" ctx={ctx} />
          <Box id="rank" x={600} y={210} w={180} h={48} label="Cosine ranking" sub="threshold · sort" ctx={ctx} />

          <Edge from={[170, 64]} to={[220, 64]} />
          <Edge from={[370, 64]} to={[400, 64]} />
          <Edge from={[540, 64]} to={[600, 64]} label="vector" />
          <Edge from={[170, 234]} to={[220, 234]} />
          <Edge from={[370, 234]} to={[400, 234]} label="ids" />
          <Edge from={[540, 234]} to={[600, 234]} label="vector" />
          <Edge from={[690, 88]} to={[690, 210]} label="all vectors" dashed />
          <Edge from={[780, 234]} to={[790, 234]} />
          <text x={792} y={238} fontSize={11} fontFamily="var(--font-mono)" fill="var(--muted)" textAnchor="end" aria-hidden>
            {""}
          </text>
          <text x={690} y={290} textAnchor="middle" fontSize={12} fontFamily="var(--font-sans)" fill="currentColor" aria-hidden>
            Results, best match first
          </text>
          <Edge from={[690, 258]} to={[690, 278]} />
        </svg>
      )}
    </DiagramFrame>
  );
}
