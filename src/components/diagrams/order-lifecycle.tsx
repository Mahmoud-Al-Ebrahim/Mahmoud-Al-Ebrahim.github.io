"use client";

import { DiagramFrame, type DiagramNode } from "./diagram-frame";
import { Box, Defs, Edge, Lane } from "./primitives";
import type { DiagramProps } from "./index";

const NODES: DiagramNode[] = [
  { id: "placed", label: "Placed", detail: "The customer app posts items, totals, coordinates, payment method and promo code; the wallet is debited." },
  { id: "preparing", label: "Preparing", detail: "The restaurant accepts from its board. A refusal moves the order to Canceled with a reason." },
  { id: "ready", label: "Ready", detail: "Marking Ready triggers the backend's notify-drivers endpoint, which fans out push notifications to available drivers." },
  { id: "approved", label: "Approved", detail: "A driver accepts; the backend assigns the order and sets Approved. The driver app only sees orders it can act on." },
  { id: "out", label: "Out for delivery", detail: "The driver picks up. The customer app opens its tracking page at this state." },
  { id: "delivered", label: "Delivered", detail: "The driver completes the order; the admin board counts it toward revenue and commission tiers." },
  { id: "canceled", label: "Cancelled / Manual", detail: "Side states the restaurant can set; admins see them in their own tabs." },
  { id: "fcm", label: "Push notifications", detail: "FCM carries every cross-role event with a background handler and a local-notification bridge in all four apps. There is no socket server." },
];

export function OrderLifecycleDiagram({ compact = false }: DiagramProps) {
  const y = { customer: 50, restaurant: 130, driver: 210, admin: 290 };
  return (
    <DiagramFrame
      title="One order, four apps"
      description="The Foodly order state machine as each role sees it. States are owned by the role that sets them; the admin app reads all of them."
      nodes={NODES}
      minWidth={compact ? 680 : 800}
    >
      {(ctx) => (
        <svg viewBox="0 0 840 340" width="100%" role="presentation" style={{ display: "block" }}>
          <Defs />
          <Lane x={10} y={14} w={820} h={72} label="Customer app" />
          <Lane x={10} y={94} w={820} h={72} label="Restaurant app" />
          <Lane x={10} y={174} w={820} h={72} label="Driver app" />
          <Lane x={10} y={254} w={820} h={72} label="Admin app" />

          <Box id="placed" x={30} y={y.customer - 6} w={110} h={40} label="Placed" ctx={ctx} tone="laurel" />
          <Box id="preparing" x={180} y={y.restaurant - 6} w={110} h={40} label="Preparing" ctx={ctx} />
          <Box id="ready" x={330} y={y.restaurant - 6} w={110} h={40} label="Ready" ctx={ctx} tone="laurel" />
          <Box id="canceled" x={180} y={y.admin - 6} w={160} h={40} label="Cancelled / Manual" ctx={ctx} tone="muted" />
          <Box id="approved" x={480} y={y.driver - 6} w={110} h={40} label="Approved" ctx={ctx} />
          <Box id="out" x={630} y={y.driver - 6} w={130} h={40} label="Out for delivery" ctx={ctx} />
          <Box id="delivered" x={690} y={y.customer - 6} w={120} h={40} label="Delivered" ctx={ctx} tone="laurel" />
          <Box id="fcm" x={480} y={y.admin - 6} w={300} h={40} label="Push notifications" sub="FCM data messages, all apps" ctx={ctx} tone="copper" />

          <Edge from={[140, y.customer + 14]} to={[180, y.restaurant + 14]} via={[[160, y.customer + 14], [160, y.restaurant + 14]]} label="POST /orders" />
          <Edge from={[290, y.restaurant + 14]} to={[330, y.restaurant + 14]} />
          <Edge from={[235, y.restaurant + 34]} to={[235, y.admin - 6]} dashed label="refuse" />
          <Edge from={[440, y.restaurant + 14]} to={[480, y.driver + 14]} via={[[460, y.restaurant + 14], [460, y.driver + 14]]} label="notify drivers" />
          <Edge from={[590, y.driver + 14]} to={[630, y.driver + 14]} label="pick up" />
          <Edge from={[760, y.driver + 14]} to={[750, y.customer + 34]} via={[[780, y.driver + 14], [780, y.customer + 40], [750, y.customer + 40]]} label="complete" />
          <Edge from={[630, y.admin + 14]} to={[630, y.driver + 34]} dashed />
          <Edge from={[500, y.admin + 14]} to={[500, y.customer + 34]} via={[[470, y.admin + 14], [470, y.customer + 34]]} dashed />
        </svg>
      )}
    </DiagramFrame>
  );
}
