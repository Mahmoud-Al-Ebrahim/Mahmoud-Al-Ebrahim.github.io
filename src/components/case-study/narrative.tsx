import type { ReactNode } from "react";
import { Paragraphs } from "@/components/ui/paragraphs";
import { NARRATIVE_ORDER, type Narrative as NarrativeData } from "@/content/schema";

/**
 * The eight-step case study: Problem, Constraints, Architecture, Decisions,
 * Implementation, Challenges, Results, Lessons learned. Numbered because it
 * is a sequence. The diagram, when there is one, sits inside Architecture.
 */
export function Narrative({ narrative, diagram }: { narrative: NarrativeData; diagram?: ReactNode }) {
  return (
    <ol className="space-y-14">
      {NARRATIVE_ORDER.map((step, i) => (
        <li key={step.label} id={step.label.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24 border-t border-rule pt-6">
          <p className="text-step--1 tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>
          <h2 className="mt-1 text-step-3">{step.label}</h2>
          {step.keys.map((k) => (
            <Paragraphs key={k} text={narrative[k]} className="mt-4" />
          ))}
          {step.label === "Architecture" && diagram ? <div className="mt-8">{diagram}</div> : null}
        </li>
      ))}
    </ol>
  );
}
