import type { TxGraphTrace } from "../model.js";
import { buildRenderGraph, edgeStyle, type RenderNode } from "./common.js";
import {
  resolveVisualRendererOptions,
  visualEdgeStyle,
  type ResolvedVisualRendererOptions,
  type VisualRendererOptions,
} from "./options.js";
import {
  formatSemanticGraph,
  isGenesisNode,
  isScriptInteractionEdge,
  semanticChipLabels,
  semanticEdgeLabel,
  semanticFieldLabel,
  semanticFieldValue,
  semanticNodeTitle,
  semanticNodeSubtitle,
  visibleSemanticRows,
  visibleSemanticSections,
} from "./semantic-format.js";
import {
  buildSemanticRenderGraph,
  type SemanticRenderOptions,
  type VisualField,
  type VisualNode,
  type VisualSection,
} from "./semantic.js";

export type TraceToMermaidOptions = VisualRendererOptions &
  SemanticRenderOptions & {
    readonly direction?: "LR" | "TD";
    readonly legacy?: boolean;
  };

export const traceToMermaid = (
  trace: TxGraphTrace,
  options: TraceToMermaidOptions = {},
): string => {
  if (options.legacy) return traceToLegacyMermaid(trace, options);

  const resolved = resolveVisualRendererOptions(options);
  const graph = formatSemanticGraph(
    buildSemanticRenderGraph(trace, {
      redeemers: options.redeemers,
    }),
    resolved,
  );
  const nodeIds = new Map(
    graph.nodes.map((node, index) => [node.id, `n${index}`] as const),
  );
  const semanticNodes = new Map(
    graph.nodes.map((node) => [node.id, node] as const),
  );
  const lines = [
    `flowchart ${options.direction ?? "LR"}`,
    "  classDef tx fill:#eef2ff,stroke:#6366f1,color:#111827;",
    "  classDef utxo fill:#ecfdf5,stroke:#10b981,color:#111827;",
    "  classDef asset fill:#f5f3ff,stroke:#7c3aed,color:#111827;",
    "  classDef authority fill:#f3f4f6,stroke:#6b7280,color:#111827;",
    "  classDef governance fill:#eef2ff,stroke:#4f46e5,color:#111827;",
    "  classDef collateral fill:#fffbeb,stroke:#f59e0b,color:#111827;",
    "  classDef unresolved fill:#fee2e2,stroke:#dc2626,color:#111827;",
    "  classDef genesis fill:#fef3c7,stroke:#d97706,color:#111827;",
  ];
  const linkStyles: string[] = [];

  for (const node of graph.nodes) {
    const id = nodeIds.get(node.id)!;
    lines.push(`  ${id}${semanticNodeShape(node, resolved)}`);
    lines.push(`  class ${id} ${semanticNodeClass(node)};`);
  }

  for (const [index, edge] of graph.edges.entries()) {
    const style = visualEdgeStyle(edge.kind);
    const scriptFocus =
      resolved.view === "scriptInteraction" &&
      isScriptInteractionEdge(edge, semanticNodes);
    lines.push(
      `  ${nodeIds.get(edge.from)} -->|${mermaidText(
        semanticEdgeLabel(trace, edge, resolved),
      )}| ${nodeIds.get(edge.to)}`,
    );
    linkStyles.push(
      `  linkStyle ${index} stroke:${style.color},color:${style.color}${
        scriptFocus ? ",stroke-width:3px" : ""
      }${style.style === "solid" ? "" : ",stroke-dasharray: 5 5"};`,
    );
  }

  return `${[...lines, ...linkStyles].join("\n")}\n`;
};

const semanticNodeShape = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): string => {
  const label = mermaidText(semanticNodeLabel(node, options));
  switch (node.kind) {
    case "transaction":
      return `["${label}"]`;
    case "utxo":
      return node.severity === "error" ? `{{"${label}"}}` : `("${label}")`;
    case "asset":
      return `(["${label}"])`;
    case "signer":
      return `{{"${label}"}}`;
    case "withdrawal":
    case "certificate":
    case "collateralReturn":
    case "diagnostic":
      return `["${label}"]`;
  }
};

const semanticNodeLabel = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): string => {
  const subtitle = semanticNodeSubtitle(node, options);
  const chipLabels = semanticChipLabels(node, options);
  const chips = chipLabels.length > 0 ? chipLabels.join(" | ") : undefined;
  return [
    semanticNodeTitle(node, options),
    ...(subtitle ? [subtitle] : []),
    ...(chips ? [chips] : []),
    ...visibleSemanticSections(node, options)
      .map((section) => mermaidSectionLine(section, node, options))
      .filter((line): line is string => Boolean(line)),
  ].join("<br/>");
};

const mermaidSectionLine = (
  section: VisualSection,
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): string | undefined => {
  const rows = visibleSemanticRows(section, node, options);
  if (rows.length === 0) return undefined;
  return `${section.title}: ${rows
    .map((row) => mermaidRowText(section, row, options))
    .join(", ")}`;
};

const mermaidRowText = (
  section: VisualSection,
  row: VisualField,
  options: ResolvedVisualRendererOptions,
): string => {
  const value = semanticFieldValue(row, options);
  return section.id === "assets" && row.id.startsWith("asset:")
    ? `${value} ${semanticFieldLabel(row, options)}`
    : `${semanticFieldLabel(row, options)} ${value}`;
};

const semanticNodeClass = (node: VisualNode): string => {
  if (node.severity === "error") return "unresolved";
  if (isGenesisNode(node)) return "genesis";
  if (node.rawRef.type === "diagnostic" && node.rawRef.code === "collapsed") {
    return "authority";
  }
  switch (node.kind) {
    case "transaction":
      return "tx";
    case "utxo":
      return "utxo";
    case "asset":
      return "asset";
    case "withdrawal":
    case "signer":
      return "authority";
    case "certificate":
      return "governance";
    case "collateralReturn":
      return "collateral";
    case "diagnostic":
      return "unresolved";
  }
};

const traceToLegacyMermaid = (
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
    lines.push(`  ${nodeIds.get(node.id)}${legacyNodeShape(node)}`);
    lines.push(
      `  class ${nodeIds.get(node.id)} ${
        node.unresolved
          ? "unresolved"
          : node.genesis
            ? "genesis"
            : legacyNodeClass(node)
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

const legacyNodeShape = (node: RenderNode): string => {
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

const legacyNodeClass = (node: RenderNode): string =>
  node.kind === "transaction"
    ? "tx"
    : node.kind === "utxo"
      ? "utxo"
      : "external";

const mermaidText = (value: string): string =>
  value
    .replace(/\\n/g, "<br/>")
    .replace(/\n/g, "<br/>")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, "'")
    .replace(/\|/g, "/");
