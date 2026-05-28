import type { TxGraphTrace } from "../model.js";
import {
  buildRenderGraph,
  edgeStyle,
  type RenderNode,
} from "./common.js";

export type TraceToMermaidOptions = {
  readonly direction?: "LR" | "TD";
};

export const traceToMermaid = (
  trace: TxGraphTrace,
  options: TraceToMermaidOptions = {},
): string => {
  const graph = buildRenderGraph(trace);
  const nodeIds = new Map(
    graph.nodes.map((node, index) => [node.id, `n${index}`] as const),
  );
  const lines = [
    `flowchart ${options.direction ?? "LR"}`,
    "  classDef tx fill:#eef2ff,stroke:#6366f1,color:#111827;",
    "  classDef utxo fill:#ecfdf5,stroke:#10b981,color:#111827;",
    "  classDef unresolved fill:#fee2e2,stroke:#dc2626,color:#111827;",
    "  classDef genesis fill:#fef3c7,stroke:#d97706,color:#111827;",
    "  classDef external fill:#f9fafb,stroke:#9ca3af,color:#111827;",
  ];

  for (const node of graph.nodes) {
    lines.push(`  ${nodeIds.get(node.id)}${nodeShape(node)}`);
    lines.push(
      `  class ${nodeIds.get(node.id)} ${
        node.unresolved ? "unresolved" : node.genesis ? "genesis" : nodeClass(node)
      };`,
    );
  }

  for (const edge of graph.edges) {
    const style = edgeStyle(edge.kind);
    lines.push(
      `  ${nodeIds.get(edge.from)} -->|${mermaidText(style.label)}| ${nodeIds.get(
        edge.to,
      )}`,
    );
  }

  return `${lines.join("\n")}\n`;
};

const nodeShape = (node: RenderNode): string => {
  const label = mermaidText(node.label);
  switch (node.kind) {
    case "transaction":
      return `["${label}"]`;
    case "utxo":
      return node.unresolved ? `{{"${label}"}}` : `("${label}")`;
    case "asset":
      return `(["${label}"])`;
    case "signer":
      return `{{"${label}"}}`;
    case "withdrawal":
    case "certificate":
    case "collateralReturn":
    case "external":
      return `["${label}"]`;
  }
};

const nodeClass = (node: RenderNode): string =>
  node.kind === "transaction" ? "tx" : node.kind === "utxo" ? "utxo" : "external";

const mermaidText = (value: string): string =>
  value
    .replace(/\\n/g, "<br/>")
    .replace(/\n/g, "<br/>")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, "'")
    .replace(/\|/g, "/");
