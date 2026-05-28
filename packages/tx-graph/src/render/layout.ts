import type { TxGraphTrace } from "../model.js";
import { outRefKey } from "../resolve.js";
import type { ResolvedVisualRendererOptions } from "./options.js";
import type { FormattedSemanticGraph } from "./semantic-format.js";
import type {
  VisualEdge,
  VisualEdgeTargetRef,
  VisualNode,
  VisualPort,
} from "./semantic.js";
import {
  LABEL_GAP,
  LEGEND_HEIGHT,
  MARGIN,
  MIN_CANVAS_WIDTH,
  NODE_GAP_Y,
  RANK_GAP_X,
  TITLE_HEIGHT,
  measureLabel,
  measureNode,
  visibleEdgeLabel,
  type Size,
} from "./measure.js";

export type Box = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

export type Point = {
  readonly x: number;
  readonly y: number;
};

export type LayoutNode = Size & {
  readonly node: VisualNode;
  readonly x: number;
  readonly y: number;
};

export type LayoutEdgeLabel = Box & {
  readonly edgeId: string;
  readonly text: string;
};

export type LayoutGraph = {
  readonly nodes: Map<string, LayoutNode>;
  readonly portOffsets: Map<string, number>;
  readonly edgeLabels: Map<string, LayoutEdgeLabel>;
  readonly width: number;
  readonly height: number;
  readonly offsetX: number;
  readonly offsetY: number;
};

// Keep the SVG renderer synchronous to preserve the existing traceToSvg API.
// This measured layered layout gives UTxO flows ELK-like ranks and explicit ports
// without introducing an async layout dependency into the public renderer.
export const layoutGraph = (
  trace: TxGraphTrace,
  graph: FormattedSemanticGraph,
  options: ResolvedVisualRendererOptions,
): LayoutGraph => {
  const sizes = new Map(
    graph.nodes.map((node) => [node.id, measureNode(node, options)] as const),
  );
  const ranks = rankNodes(trace, graph);
  const rankedNodes = new Map<number, VisualNode[]>();
  for (const node of graph.nodes) {
    const rank = ranks.get(node.id) ?? 0;
    rankedNodes.set(rank, [...(rankedNodes.get(rank) ?? []), node]);
  }

  const orderedRanks = [...rankedNodes.keys()].sort(
    (left, right) => left - right,
  );
  const rankWidths = new Map(
    orderedRanks.map((rank) => [
      rank,
      Math.max(
        ...rankedNodes.get(rank)!.map((node) => sizes.get(node.id)!.width),
      ),
    ]),
  );
  const rankHeights = new Map(
    orderedRanks.map((rank) => [
      rank,
      rankedNodes
        .get(rank)!
        .reduce((sum, node) => sum + sizes.get(node.id)!.height, 0) +
        Math.max(0, rankedNodes.get(rank)!.length - 1) * NODE_GAP_Y,
    ]),
  );
  const maxRankHeight = Math.max(0, ...rankHeights.values());

  let x = MARGIN;
  const rankX = new Map<number, number>();
  for (const rank of orderedRanks) {
    rankX.set(rank, x);
    x += (rankWidths.get(rank) ?? 0) + RANK_GAP_X;
  }

  const positioned = new Map<string, LayoutNode>();
  for (const rank of orderedRanks) {
    const nodes = [...rankedNodes.get(rank)!].sort((left, right) =>
      nodeSortKey(left, graph).localeCompare(nodeSortKey(right, graph)),
    );
    let y =
      MARGIN +
      TITLE_HEIGHT +
      32 +
      Math.max(0, (maxRankHeight - (rankHeights.get(rank) ?? 0)) / 2);
    for (const node of nodes) {
      const size = sizes.get(node.id)!;
      positioned.set(node.id, {
        node,
        ...size,
        x:
          rankX.get(rank)! +
          ((rankWidths.get(rank) ?? size.width) - size.width) / 2,
        y,
      });
      y += size.height + NODE_GAP_Y;
    }
  }

  const ports = portOffsets(graph, positioned);
  const provisional: LayoutGraph = {
    nodes: positioned,
    portOffsets: ports,
    edgeLabels: new Map(),
    width: MIN_CANVAS_WIDTH,
    height: 260,
    offsetX: 0,
    offsetY: 0,
  };
  const edgeLabels = placeEdgeLabels(trace, graph, options, provisional);
  const boxes = [
    ...[...positioned.values()].map(nodeBox),
    ...edgeLabels.values(),
  ];

  const maxX = Math.max(0, ...boxes.map((box) => box.x + box.width));
  const maxY = Math.max(0, ...boxes.map((box) => box.y + box.height));

  return {
    nodes: positioned,
    portOffsets: ports,
    edgeLabels,
    width: Math.max(MIN_CANVAS_WIDTH, Math.ceil(maxX + MARGIN)),
    height: Math.ceil(maxY + MARGIN + LEGEND_HEIGHT),
    offsetX: 0,
    offsetY: 0,
  };
};

export const nodeBox = (node: LayoutNode): Box => ({
  x: node.x,
  y: node.y,
  width: node.width,
  height: node.height,
});

export const edgeAnchors = (
  edge: VisualEdge,
  graph: LayoutGraph,
): { readonly start: Point; readonly end: Point } | undefined => {
  const from = graph.nodes.get(edge.from);
  const to = graph.nodes.get(edge.to);
  if (!from || !to) return undefined;
  return {
    start: anchor(edge, "from", from, to, graph),
    end: anchor(edge, "to", to, from, graph),
  };
};

export const edgePath = (edge: VisualEdge, graph: LayoutGraph): string => {
  const anchors = edgeAnchors(edge, graph);
  if (!anchors) return "";
  const { start, end } = anchors;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (Math.abs(dx) < 80) {
    const curve = Math.max(50, Math.abs(dy) / 2);
    const direction = dy >= 0 ? 1 : -1;
    return `M ${start.x} ${start.y} C ${start.x} ${start.y + curve * direction}, ${end.x} ${end.y - curve * direction}, ${end.x} ${end.y}`;
  }
  const midX = start.x + dx / 2;
  return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
};

export const edgeLabelPoint = (edge: VisualEdge, graph: LayoutGraph): Point => {
  const anchors = edgeAnchors(edge, graph);
  if (!anchors) return { x: 0, y: 0 };
  const { start, end } = anchors;
  return {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  };
};

const rankNodes = (
  trace: TxGraphTrace,
  graph: FormattedSemanticGraph,
): Map<string, number> => {
  const txIndex = new Map(
    trace.transactions.map(
      (transaction, index) => [transaction.hash, index] as const,
    ),
  );
  const edgeTxIndices = new Map<string, number[]>();
  for (const edge of graph.edges) {
    const txHash = edge.targetRef.txHash;
    if (!txHash) continue;
    const index = txIndex.get(txHash);
    if (index === undefined) continue;
    for (const nodeId of [edge.from, edge.to]) {
      edgeTxIndices.set(nodeId, [...(edgeTxIndices.get(nodeId) ?? []), index]);
    }
  }

  const ranks = new Map<string, number>();
  for (const node of graph.nodes) {
    const attachedTxs = edgeTxIndices.get(node.id) ?? [0];
    const attachedTx = Math.min(...attachedTxs);
    const latestAttachedTx = Math.max(...attachedTxs);
    switch (node.rawRef.type) {
      case "transaction": {
        ranks.set(
          node.id,
          (txIndex.get(node.rawRef.txHash) ?? attachedTx) * 2 + 1,
        );
        break;
      }
      case "utxo": {
        const producer = txIndex.get(node.rawRef.outRef.txHash);
        ranks.set(
          node.id,
          producer === undefined ? attachedTx * 2 : producer * 2 + 2,
        );
        break;
      }
      case "assetPolicy":
        ranks.set(node.id, latestAttachedTx * 2 + 2);
        break;
      case "certificate":
      case "collateralReturn":
        ranks.set(node.id, attachedTx * 2 + 2);
        break;
      case "signer":
      case "withdrawal":
        ranks.set(node.id, attachedTx * 2);
        break;
      case "diagnostic":
        ranks.set(node.id, attachedTx * 2 + 1);
        break;
    }
  }
  return ranks;
};

const nodeSortKey = (
  node: VisualNode,
  graph: FormattedSemanticGraph,
): string => {
  const attached = graph.edges
    .filter((edge) => edge.from === node.id || edge.to === node.id)
    .map((edge) => targetRefSortIndex(edge.targetRef));
  const attachedIndex = attached.length === 0 ? 0 : Math.min(...attached);
  return [
    String(kindPriority(node)).padStart(2, "0"),
    String(attachedIndex).padStart(4, "0"),
    rawRefSortKey(node),
    node.id,
  ].join(":");
};

const targetRefSortIndex = (targetRef: VisualEdgeTargetRef): number => {
  switch (targetRef.type) {
    case "input":
    case "output":
    case "withdrawal":
    case "certificate":
      return targetRef.index;
    case "assetPolicy":
      return targetRef.policyIndex;
    case "signer":
    case "collateralReturn":
      return 0;
    case "diagnostic":
      return targetRef.count ?? 0;
  }
};

const kindPriority = (node: VisualNode): number => {
  switch (node.kind) {
    case "diagnostic":
      return 0;
    case "withdrawal":
      return 1;
    case "signer":
      return 2;
    case "transaction":
      return 3;
    case "utxo":
      return 4;
    case "asset":
      return 5;
    case "certificate":
      return 6;
    case "collateralReturn":
      return 7;
  }
};

const rawRefSortKey = (node: VisualNode): string => {
  switch (node.rawRef.type) {
    case "utxo":
      return outRefKey(node.rawRef.outRef);
    case "transaction":
      return node.rawRef.txHash;
    case "assetPolicy":
      return node.rawRef.policyId;
    case "signer":
      return node.rawRef.keyHash;
    case "withdrawal":
      return node.rawRef.rewardAddress;
    case "certificate":
      return `${node.rawRef.txHash}#${node.rawRef.index}`;
    case "collateralReturn":
      return node.rawRef.txHash;
    case "diagnostic":
      return node.rawRef.code;
  }
};

const placeEdgeLabels = (
  trace: TxGraphTrace,
  formatted: FormattedSemanticGraph,
  options: ResolvedVisualRendererOptions,
  graph: LayoutGraph,
): Map<string, LayoutEdgeLabel> => {
  const nodeBoxes = [...graph.nodes.values()].map((node) =>
    inflate(nodeBox(node), LABEL_GAP),
  );
  const placed: LayoutEdgeLabel[] = [];
  const result = new Map<string, LayoutEdgeLabel>();
  for (const edge of formatted.edges) {
    const text = visibleEdgeLabel(trace, edge, options);
    if (!text) continue;
    const labelText = fit(text, options.mode === "debug" ? 42 : 28);
    const size = measureLabel(labelText);
    const origin = edgeLabelPoint(edge, graph);
    const candidates = labelCandidates(origin, size);
    const box = candidates.find(
      (candidate) =>
        !nodeBoxes.some((node) => intersects(candidate, node)) &&
        !placed.some((label) =>
          intersects(candidate, inflate(label, LABEL_GAP)),
        ),
    );
    if (!box) continue;
    const label = { ...box, edgeId: edge.id, text: labelText };
    placed.push(label);
    result.set(edge.id, label);
  }
  return result;
};

const labelCandidates = (origin: Point, size: Size): Box[] => {
  const x = origin.x - size.width / 2;
  const y = origin.y - size.height / 2;
  const offsets = [
    [0, -28],
    [0, 28],
    [0, -56],
    [0, 56],
    [-44, -28],
    [44, -28],
    [-44, 28],
    [44, 28],
    [0, -84],
    [0, 84],
  ];
  return offsets.map(([dx, dy]) => ({
    x: x + dx,
    y: y + dy,
    width: size.width,
    height: size.height,
  }));
};

const portOffsets = (
  graph: FormattedSemanticGraph,
  nodes: ReadonlyMap<string, LayoutNode>,
): Map<string, number> => {
  const edgeCountByPort = new Map<string, number>();
  for (const edge of graph.edges) {
    for (const portId of [edge.fromPort, edge.toPort]) {
      if (portId)
        edgeCountByPort.set(portId, (edgeCountByPort.get(portId) ?? 0) + 1);
    }
  }

  const offsets = new Map<string, number>();
  for (const layoutNode of nodes.values()) {
    const ports = layoutNode.node.ports
      .filter((port) => edgeCountByPort.has(port.id))
      .sort((left, right) =>
        portSortKey(left, layoutNode.node).localeCompare(
          portSortKey(right, layoutNode.node),
        ),
      );
    const bySide = groupPortsBySide(ports);
    for (const sidePorts of bySide.values()) {
      sidePorts.forEach((port, index) => {
        if (port.side === "top" || port.side === "bottom") {
          offsets.set(
            port.id,
            ((index + 1) * layoutNode.width) / (sidePorts.length + 1),
          );
        } else {
          offsets.set(
            port.id,
            60 +
              ((index + 1) * Math.max(24, layoutNode.height - 92)) /
                (sidePorts.length + 1),
          );
        }
      });
    }
  }
  return offsets;
};

const groupPortsBySide = (
  ports: ReadonlyArray<VisualPort>,
): Map<string, VisualPort[]> => {
  const groups = new Map<string, VisualPort[]>();
  for (const port of ports) {
    groups.set(port.side, [...(groups.get(port.side) ?? []), port]);
  }
  return groups;
};

const portSortKey = (port: VisualPort, node: VisualNode): string =>
  [
    String(portSidePriority(port.side)).padStart(2, "0"),
    String(edgeKindPriority(port.edgeKind)).padStart(2, "0"),
    port.id.replace(
      /:(\d+)(?::|$)/g,
      (_match, index: string) => `:${index.padStart(4, "0")}:`,
    ),
    node.id,
  ].join(":");

const portSidePriority = (side: string): number => {
  switch (side) {
    case "left":
      return 0;
    case "right":
      return 1;
    case "top":
      return 2;
    case "bottom":
      return 3;
    default:
      return 4;
  }
};

const edgeKindPriority = (kind: string | undefined): number => {
  switch (kind) {
    case "spend":
      return 0;
    case "read":
      return 1;
    case "collateral":
      return 2;
    case "produce":
      return 3;
    case "mint":
      return 4;
    case "withdraw":
      return 5;
    case "certify":
      return 6;
    case "sign":
      return 7;
    default:
      return 8;
  }
};

const anchor = (
  edge: VisualEdge,
  endpoint: "from" | "to",
  node: LayoutNode,
  other: LayoutNode,
  graph: LayoutGraph,
): Point => {
  const portId = endpoint === "from" ? edge.fromPort : edge.toPort;
  const port = portId
    ? node.node.ports.find((candidate) => candidate.id === portId)
    : undefined;
  const offset = portId ? graph.portOffsets.get(portId) : undefined;
  if (port?.side === "top") {
    return { x: node.x + (offset ?? node.width / 2), y: node.y };
  }
  if (port?.side === "bottom") {
    return { x: node.x + (offset ?? node.width / 2), y: node.y + node.height };
  }
  if (port?.side === "left") {
    return { x: node.x, y: node.y + (offset ?? node.height / 2) };
  }
  if (port?.side === "right") {
    return { x: node.x + node.width, y: node.y + (offset ?? node.height / 2) };
  }

  const nodeCenterX = node.x + node.width / 2;
  const otherCenterX = other.x + other.width / 2;
  return {
    x: otherCenterX >= nodeCenterX ? node.x + node.width : node.x,
    y: node.y + node.height / 2,
  };
};

const inflate = (box: Box, padding: number): Box => ({
  x: box.x - padding,
  y: box.y - padding,
  width: box.width + padding * 2,
  height: box.height + padding * 2,
});

export const intersects = (left: Box, right: Box): boolean =>
  left.x < right.x + right.width &&
  left.x + left.width > right.x &&
  left.y < right.y + right.height &&
  left.y + left.height > right.y;

const fit = (value: string, maxChars: number): string =>
  value.length <= maxChars ? value : `${value.slice(0, maxChars - 3)}...`;
