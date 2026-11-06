"use client";

import { DiagramFrame, type DiagramNode } from "./diagram-frame";
import { Box, Defs, Edge, Lane } from "./primitives";
import type { DiagramProps } from "./index";

const NODES: DiagramNode[] = [
  { id: "page", label: "Pages and widgets", detail: "Screens render state and dispatch events. They never call the network or know how data is stored." },
  { id: "bloc", label: "Bloc", detail: "Turns events into states. Calls a use case, folds its Either into success or failure, and emits. HydratedBloc persists the state across restarts where offline matters." },
  { id: "usecase", label: "Use case", detail: "One class per operation with a single call() method and typed params. The domain's vocabulary, independent of transport." },
  { id: "repo-i", label: "Repository interface", detail: "Declared in the domain layer so use cases depend on an abstraction. Returns Either<Failure, T>." },
  { id: "repo", label: "Repository implementation", detail: "Delegates to a generic network call: connectivity check, remote fetch, optional cache write, local fallback, failure mapping. Feature repositories become one-liners." },
  { id: "remote", label: "Remote data source", detail: "Dio with interceptors (auth header, logging, token refresh). Typed request and response contracts." },
  { id: "local", label: "Local source", detail: "Hive boxes, SharedPreferences or secure storage for caches, carts and tokens." },
  { id: "di", label: "injectable DI", detail: "get_it graph generated from annotations. Every layer receives its dependencies; nothing constructs its own collaborators." },
];

export function CleanArchitectureDiagram({ compact = false }: DiagramProps) {
  return (
    <DiagramFrame
      title="The playbook"
      description="Feature-first Clean Architecture as used in Safeer, Min Bayty, Trydos and the EdTech family. Data flows down as calls and comes back as Either values."
      nodes={NODES}
      minWidth={compact ? 640 : 720}
    >
      {(ctx) => (
        <svg viewBox="0 0 760 330" width="100%" role="presentation" style={{ display: "block" }}>
          <Defs />
          <Lane x={10} y={10} w={740} h={90} label="Presentation" />
          <Lane x={10} y={115} w={740} h={90} label="Domain" />
          <Lane x={10} y={220} w={740} h={100} label="Data" />

          <Box id="page" x={40} y={40} w={200} h={44} label="Pages and widgets" ctx={ctx} />
          <Box id="bloc" x={300} y={40} w={200} h={44} label="Bloc" sub="events → states" ctx={ctx} tone="laurel" />
          <Box id="usecase" x={300} y={145} w={200} h={44} label="Use case" sub="call(params)" ctx={ctx} />
          <Box id="repo-i" x={540} y={145} w={190} h={44} label="Repository interface" sub="Either<Failure, T>" ctx={ctx} />
          <Box id="repo" x={300} y={255} w={200} h={44} label="Repository impl" sub="NetworkRepository.call<T>" ctx={ctx} tone="laurel" />
          <Box id="remote" x={540} y={255} w={190} h={44} label="Remote data source" sub="Dio + interceptors" ctx={ctx} />
          <Box id="local" x={40} y={255} w={200} h={44} label="Local source" sub="Hive · prefs · secure" ctx={ctx} />
          <Box id="di" x={40} y={145} w={200} h={44} label="injectable DI" sub="get_it graph" ctx={ctx} tone="copper" />

          <Edge from={[240, 62]} to={[300, 62]} label="events" />
          <Edge from={[400, 84]} to={[400, 145]} label="call" />
          <Edge from={[500, 167]} to={[540, 167]} />
          <Edge from={[635, 189]} to={[635, 255]} label="implements" dashed />
          <Edge from={[500, 277]} to={[540, 277]} label="remote()" />
          <Edge from={[300, 277]} to={[240, 277]} label="cache / fallback" />
          <Edge from={[240, 167]} to={[300, 167]} dashed label="injects" />
        </svg>
      )}
    </DiagramFrame>
  );
}
