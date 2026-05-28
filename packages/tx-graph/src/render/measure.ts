import type { TxGraphTrace } from "../model.js";
import {
  semanticChipLabels,
  semanticEdgeLabel,
  visibleSemanticRows,
  visibleSemanticSections,
  type FormattedSemanticGraph,
} from "./semantic-format.js";
import type { ResolvedVisualRendererOptions } from "./options.js";
import type { VisualEdge, VisualNode } from "./semantic.js";

export type Size = {
  readonly width: number;
  readonly height: number;
};

export const MARGIN = 40;
export const TITLE_HEIGHT = 74;
export const LEGEND_HEIGHT = 132;
export const MIN_CANVAS_WIDTH = 940;
export const NODE_GAP_Y = 34;
export const RANK_GAP_X = 170;
export const LABEL_GAP = 8;

export const measureNode = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): Size => {
  const width = nodeWidth(node);
  if (node.kind === "transaction") {
    return { width, height: measureTransactionNode(node, options) };
  }

  const sections = visibleSemanticSections(node, options);
  const rowCount = sections.reduce(
    (sum, section) => sum + visibleSemanticRows(section, node, options).length,
    0,
  );
  const populatedSections = sections.filter(
    (section) => visibleSemanticRows(section, node, options).length > 0,
  ).length;
  const chips = semanticChipLabels(node, options);
  const chipRows = estimateChipRows(chips, width - 28);

  return {
    width,
    height: 58 + chipRows * 24 + populatedSections * 24 + rowCount * 23 + 22,
  };
};

export const measureLabel = (label: string): Size => ({
  width: Math.min(260, Math.max(54, label.length * 6.4 + 18)),
  height: 22,
});

export const visibleEdgeLabel = (
  trace: TxGraphTrace,
  edge: VisualEdge,
  options: ResolvedVisualRendererOptions,
): string | undefined => {
  if (edge.action || edge.redeemerKey) {
    return edge.action?.label ?? semanticEdgeLabel(trace, edge, options);
  }
  if (edge.kind === "diagnostic")
    return semanticEdgeLabel(trace, edge, options);
  if (edge.kind === "mint" || edge.kind === "burn") {
    return options.mode === "overview" ? undefined : edge.label;
  }
  if (edge.kind === "withdraw" || edge.kind === "certify") return edge.label;
  if (edge.kind === "collateral" || edge.kind === "collateralReturn") {
    return options.mode === "debug" ? edge.label : undefined;
  }
  return undefined;
};

export const graphNodeById = (
  graph: FormattedSemanticGraph,
  nodeId: string,
): VisualNode | undefined => graph.nodes.find((node) => node.id === nodeId);

const nodeWidth = (node: VisualNode): number => {
  switch (node.kind) {
    case "transaction":
      return 330;
    case "utxo":
      return 306;
    case "diagnostic":
      return 286;
    case "asset":
      return 270;
    case "withdrawal":
    case "certificate":
    case "collateralReturn":
      return 270;
    case "signer":
      return 240;
  }
};

const metricRowCount = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): number => {
  const metricRows = visibleSemanticSections(node, options)
    .filter((section) =>
      ["inputs", "assets", "authority", "redeemers"].includes(section.id),
    )
    .flatMap((section) => visibleSemanticRows(section, node, options))
    .filter((row) => row.value !== "0").length;
  return metricRows === 0 ? 0 : Math.ceil(metricRows / 4);
};

const measureTransactionNode = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): number => {
  const metricRows = metricRowCount(node, options);
  const facts = rowsForSection(node, options, "facts").slice(0, 4);
  const redeemers = rowsForSection(node, options, "redeemers").slice(0, 1);
  const detailRows = facts.length + redeemers.length;
  const metricsHeight = metricRows === 0 ? 0 : metricRows * 34 + 8;
  const detailsHeight = detailRows === 0 ? 0 : 27 + detailRows * 21;
  return 64 + metricsHeight + detailsHeight + 12;
};

const rowsForSection = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
  sectionId: string,
) =>
  visibleSemanticSections(node, options)
    .filter((section) => section.id === sectionId)
    .flatMap((section) => visibleSemanticRows(section, node, options))
    .filter((row) => row.value !== "0");

const estimateChipRows = (
  chips: ReadonlyArray<string>,
  availableWidth: number,
): number => {
  if (chips.length === 0) return 0;
  let rows = 1;
  let cursor = 0;
  for (const chip of chips) {
    const width = Math.max(42, Math.min(18, chip.length) * 6 + 18) + 6;
    if (cursor > 0 && cursor + width > availableWidth) {
      rows += 1;
      cursor = 0;
    }
    cursor += width;
  }
  return rows;
};
