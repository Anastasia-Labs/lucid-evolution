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
  type VisualNode,
  type VisualSection,
} from "./semantic.js";

export type TraceToDotOptions = VisualRendererOptions &
  SemanticRenderOptions & {
    readonly graphName?: string;
    readonly legacy?: boolean;
  };

export const traceToDot = (
  trace: TxGraphTrace,
  options: TraceToDotOptions = {},
): string => {
  if (options.legacy) return traceToLegacyDot(trace, options);

  const resolved = resolveVisualRendererOptions(options);
  const graph = formatSemanticGraph(
    buildSemanticRenderGraph(trace, {
      redeemers: options.redeemers,
    }),
    resolved,
  );
  const semanticNodes = new Map(
    graph.nodes.map((node) => [node.id, node] as const),
  );
  const nodeIds = new Map(
    graph.nodes.map((node, index) => [node.id, `n${index}`] as const),
  );
  const lines = [
    `digraph ${dotString(options.graphName ?? "lucid-evolution-tx-graph")} {`,
    "  rankdir=LR;",
    "  splines=ortho;",
    "  nodesep=0.45;",
    "  ranksep=0.75;",
    '  graph [fontname="Inter, Arial", bgcolor="white", pad=0.2];',
    '  node [fontname="Inter, Arial", fontsize=10, shape=plain, margin=0];',
    '  edge [fontname="Inter, Arial", fontsize=9, arrowsize=0.7];',
  ];

  for (const node of graph.nodes) {
    lines.push(
      `  ${dotString(nodeIds.get(node.id)!)} [${semanticNodeAttributes(
        node,
        resolved,
      )}];`,
    );
  }

  for (const edge of graph.edges) {
    const style = visualEdgeStyle(edge.kind);
    const scriptFocus =
      resolved.view === "scriptInteraction" &&
      isScriptInteractionEdge(edge, semanticNodes);
    lines.push(
      `  ${dotString(nodeIds.get(edge.from)!)} -> ${dotString(
        nodeIds.get(edge.to)!,
      )} [` +
        [
          `label=${dotString(semanticEdgeLabel(trace, edge, resolved))}`,
          `color=${dotString(style.color)}`,
          `fontcolor=${dotString(style.color)}`,
          `style=${dotString(style.style)}`,
          `penwidth=${scriptFocus ? "2.8" : edge.kind === "spend" || edge.kind === "produce" ? "1.6" : "1.1"}`,
        ].join(", ") +
        "];",
    );
  }

  lines.push("}");
  return `${lines.join("\n")}\n`;
};

const semanticNodeAttributes = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): string =>
  [
    `label=<${semanticNodeLabel(node, options)}>`,
    `tooltip=${dotString(nodeTooltip(node, options))}`,
  ].join(", ");

const semanticNodeLabel = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): string => {
  const palette = nodePalette(node);
  const subtitle = semanticNodeSubtitle(node, options);
  const chips = semanticChipLabels(node, options);
  const sections = visibleSemanticSections(node, options);
  return [
    `<TABLE BORDER="1" CELLBORDER="0" CELLSPACING="0" CELLPADDING="5" COLOR="${palette.border}">`,
    `<TR><TD COLSPAN="2" BGCOLOR="${palette.header}"><B>${htmlText(semanticNodeTitle(node, options))}</B>${subtitle ? `<BR/><FONT POINT-SIZE="9">${htmlText(subtitle)}</FONT>` : ""}</TD></TR>`,
    ...(chips.length > 0
      ? [
          `<TR><TD COLSPAN="2" BGCOLOR="${palette.chip}"><FONT POINT-SIZE="9">${htmlText(
            chips.join(" | "),
          )}</FONT></TD></TR>`,
        ]
      : []),
    ...sections.flatMap((section) => sectionRows(section, node, options)),
    "</TABLE>",
  ].join("");
};

const sectionRows = (
  section: VisualSection,
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): string[] => {
  const rows = visibleSemanticRows(section, node, options);
  if (rows.length === 0) return [];
  return [
    `<TR><TD COLSPAN="2" ALIGN="LEFT" BGCOLOR="#f9fafb"><B>${htmlText(
      section.title,
    )}</B></TD></TR>`,
    ...rows.map((row) => {
      const value = semanticFieldValue(row, options);
      const valueFace = row.mono ? ' FACE="monospace"' : "";
      return `<TR><TD ALIGN="LEFT"><FONT POINT-SIZE="9">${htmlText(
        semanticFieldLabel(row, options),
      )}</FONT></TD><TD ALIGN="LEFT"><FONT${valueFace}>${htmlText(
        value,
      )}</FONT></TD></TR>`;
    }),
  ];
};

const nodeTooltip = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): string =>
  [
    semanticNodeTitle(node, options),
    ...(semanticNodeSubtitle(node, options)
      ? [semanticNodeSubtitle(node, options)!]
      : []),
    ...node.sections.flatMap((section) =>
      section.rows.map(
        (row) =>
          `${section.title}.${semanticFieldLabel(row, options)}: ${semanticFieldValue(
            row,
            options,
          )}`,
      ),
    ),
  ].join("\n");

const nodePalette = (
  node: VisualNode,
): {
  readonly header: string;
  readonly chip: string;
  readonly border: string;
} => {
  if (node.severity === "error") {
    return { header: "#fee2e2", chip: "#fef2f2", border: "#dc2626" };
  }
  if (isGenesisNode(node)) {
    return { header: "#fef3c7", chip: "#fffbeb", border: "#d97706" };
  }
  if (node.rawRef.type === "diagnostic" && node.rawRef.code === "collapsed") {
    return { header: "#f3f4f6", chip: "#f9fafb", border: "#6b7280" };
  }
  switch (node.kind) {
    case "transaction":
      return { header: "#eef2ff", chip: "#e0e7ff", border: "#6366f1" };
    case "utxo":
      return { header: "#ecfdf5", chip: "#d1fae5", border: "#10b981" };
    case "asset":
      return { header: "#f5f3ff", chip: "#ede9fe", border: "#7c3aed" };
    case "signer":
      return { header: "#f3f4f6", chip: "#f9fafb", border: "#6b7280" };
    case "withdrawal":
      return { header: "#ecfeff", chip: "#cffafe", border: "#0891b2" };
    case "certificate":
      return { header: "#eef2ff", chip: "#e0e7ff", border: "#4f46e5" };
    case "collateralReturn":
      return { header: "#fffbeb", chip: "#fef3c7", border: "#f59e0b" };
    case "diagnostic":
      return { header: "#fef2f2", chip: "#fee2e2", border: "#dc2626" };
  }
};

const htmlText = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\\n/g, "<BR/>")
    .replace(/\n/g, "<BR/>");

const traceToLegacyDot = (
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
    lines.push(`  ${dotString(node.id)} [${legacyNodeAttributes(node)}];`);
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

const legacyNodeAttributes = (node: RenderNode): string => {
  const attrs = [
    `label=${dotString(node.label)}`,
    `shape=${dotString(legacyNodeShape(node))}`,
    `style=${dotString(legacyNodeStyle(node))}`,
    `fillcolor=${dotString(legacyNodeFill(node))}`,
    `color=${dotString(legacyNodeColor(node))}`,
  ];
  return attrs.join(", ");
};

const legacyNodeShape = (node: RenderNode): string => {
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

const legacyNodeStyle = (node: RenderNode): string =>
  node.kind === "utxo" ? "rounded,filled" : "filled";

const legacyNodeFill = (node: RenderNode): string => {
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

const legacyNodeColor = (node: RenderNode): string =>
  node.unresolved ? "#dc2626" : node.genesis ? "#d97706" : "#9ca3af";

const dotString = (value: string): string =>
  JSON.stringify(value.replace(/\\n/g, "\n"));
