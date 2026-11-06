import type { ComponentType } from "react";
import type { DiagramId } from "@/content/schema";
import type { Locale } from "@/i18n/config";
import { CleanArchitectureDiagram } from "./clean-architecture";
import { ClipPipelineDiagram } from "./clip-pipeline";
import { MultiBackendDiagram } from "./multi-backend";
import { OrderLifecycleDiagram } from "./order-lifecycle";
import { TestGuardsDiagram } from "./test-guards";

export type DiagramProps = { compact?: boolean; locale?: Locale };

/** Registry of interactive diagrams keyed by the id used in project content. */
export const DIAGRAMS: Record<DiagramId, ComponentType<DiagramProps>> = {
  "clean-architecture": CleanArchitectureDiagram,
  "multi-backend": MultiBackendDiagram,
  "clip-pipeline": ClipPipelineDiagram,
  "order-lifecycle": OrderLifecycleDiagram,
  "test-guards": TestGuardsDiagram,
};
