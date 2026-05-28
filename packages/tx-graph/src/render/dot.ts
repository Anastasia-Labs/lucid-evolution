import type { TxGraphTrace } from "../model.js";
import { buildRenderGraph, edgeStyle, type RenderNode } from "./common.js";

export type TraceToDotOptions = {
  readonly graphName?: string;
};

export const traceToDot = (
  trace: TxGraphTrace,
  options: TraceToDotOptions = {},
): string => {
  const graph = buildRenderGraph(trace);
  const lines = [
    `digraph ${dotString(options.graphName ?? "lucid-evolution-tx-graph")} {`,
    "  rankdir=LR;",
    '  graph [fontname="Inter, Arial", bgcolor="white"];',
    '  node [fontname="Inter, Arial", fontsize=10, margin="0.08,0.06"];',
    '  edge [fontname="Inter, Arial", fontsize=9, arrowsize=0.7];',
  ];

  for (const node of graph.nodes) {
    lines.push(`  ${dotString(node.id)} [${nodeAttributes(node)}];`);
  }

  for (const edge of graph.edges) {
    const style = edgeStyle(edge.kind);
    lines.push(
      `  ${dotString(edge.from)} -> ${dotString(edge.to)} [` +
        [
          `label=${dotString(style.label)}`,
          `color=${dotString(style.color)}`,
          `fontcolor=${dotString(style.color)}`,
          `style=${dotString(style.style)}`,
        ].join(", ") +
        "];",
    );
  }

  lines.push("}");
  return `${lines.join("\n")}\n`;
};

const nodeAttributes = (node: RenderNode): string => {
  const attrs = [
    `label=${dotString(node.label)}`,
    `shape=${dotString(nodeShape(node))}`,
    `style=${dotString(nodeStyle(node))}`,
    `fillcolor=${dotString(nodeFill(node))}`,
    `color=${dotString(nodeColor(node))}`,
  ];
  return attrs.join(", ");
};

const nodeShape = (node: RenderNode): string => {
  switch (node.kind) {
    case "transaction":
      return "box";
    case "utxo":
      return "box";
    case "asset":
      return "component";
    case "signer":
      return "octagon";
    case "withdrawal":
    case "certificate":
    case "collateralReturn":
    case "external":
      return "note";
  }
};

const nodeStyle = (node: RenderNode): string =>
  node.kind === "utxo" ? "rounded,filled" : "filled";

const nodeFill = (node: RenderNode): string => {
  if (node.unresolved) return "#fee2e2";
  if (node.genesis) return "#fef3c7";
  switch (node.kind) {
    case "transaction":
      return "#eef2ff";
    case "utxo":
      return "#ecfdf5";
    case "asset":
      return "#f5f3ff";
    case "signer":
      return "#f3f4f6";
    case "withdrawal":
      return "#ecfeff";
    case "certificate":
      return "#eef2ff";
    case "collateralReturn":
      return "#fffbeb";
    case "external":
      return "#f9fafb";
  }
};

const nodeColor = (node: RenderNode): string =>
  node.unresolved ? "#dc2626" : node.genesis ? "#d97706" : "#9ca3af";

const dotString = (value: string): string =>
  JSON.stringify(value.replace(/\\n/g, "\n"));
