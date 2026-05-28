import {
  isGenesisNode,
  semanticChipLabels,
  semanticFieldLabel,
  semanticFieldValue,
  semanticNodeSubtitle,
  semanticNodeTitle,
  visibleSemanticRows,
  visibleSemanticSections,
  type FormattedSemanticGraph,
} from "./semantic-format.js";
import {
  visualEdgeStyle,
  type ResolvedVisualRendererOptions,
} from "./options.js";
import type { VisualChip, VisualField, VisualNode } from "./semantic.js";
import type { LayoutGraph, LayoutNode } from "./layout.js";
import { LEGEND_HEIGHT } from "./measure.js";

export const renderNode = (
  layoutNode: LayoutNode,
  graph: LayoutGraph,
  options: ResolvedVisualRendererOptions,
  index: number,
  semantic: FormattedSemanticGraph,
): string => {
  switch (layoutNode.node.kind) {
    case "transaction":
      return renderTransactionNode(layoutNode, graph, options, index, semantic);
    case "utxo":
      return renderUtxoNode(layoutNode, graph, options, index, semantic);
    default:
      return renderGenericNode(layoutNode, graph, options, index, semantic);
  }
};

export const renderLegend = (
  graph: LayoutGraph,
  semantic: FormattedSemanticGraph,
): string => {
  const y = graph.height - LEGEND_HEIGHT + 34;
  const itemWidth = 156;
  const items = edgeLegendItems(semantic);
  const perRow = Math.max(1, Math.floor((graph.width - 80) / itemWidth));
  return [
    `<g class="txg-legend">`,
    `<text x="40" y="${y}" font-family="Inter, Arial" font-size="12" font-weight="700" fill="#111827">Legend</text>`,
    ...items.map(([label, title], index) => {
      const style = visualEdgeStyle(label);
      const x = 40 + (index % perRow) * itemWidth;
      const rowY = y + 24 + Math.floor(index / perRow) * 30;
      return [
        `<g>`,
        `<title>${xmlText(title)}</title>`,
        `<line x1="${x}" y1="${rowY}" x2="${x + 30}" y2="${rowY}" stroke="${style.color}" stroke-width="2.2"${dashArray(style.style)}/>`,
        `<text x="${x + 38}" y="${rowY + 4}" font-family="Inter, Arial" font-size="11" fill="#374151">${label}</text>`,
        `</g>`,
      ].join("\n");
    }),
    "</g>",
  ].join("\n");
};

const edgeLegendItems = (
  semantic: FormattedSemanticGraph,
): ReadonlyArray<readonly [string, string]> => {
  const present = new Set<string>(semantic.edges.map((edge) => edge.kind));
  const ordered = [
    "spend",
    "read",
    "collateral",
    "produce",
    "mint",
    "burn",
    "withdraw",
    "certify",
    "sign",
    "collateralReturn",
    "diagnostic",
    "summary",
  ].filter((kind) => present.has(kind));
  return (ordered.length > 0 ? ordered : ["spend", "produce"]).map((kind) => [
    kind,
    edgeLegendTitle(kind),
  ]);
};

const edgeLegendTitle = (kind: string): string => {
  switch (kind) {
    case "spend":
      return "Consumes an input UTxO";
    case "read":
      return "Reads a reference input without consuming it";
    case "collateral":
      return "Uses collateral for script validation";
    case "produce":
      return "Creates an output UTxO";
    case "mint":
      return "Mints assets under a policy";
    case "burn":
      return "Burns assets under a policy";
    case "withdraw":
      return "Withdraws staking rewards";
    case "certify":
      return "Applies a certificate";
    case "sign":
      return "Requires a signer";
    case "collateralReturn":
      return "Returns collateral";
    case "diagnostic":
      return "Warning or error";
    default:
      return kind;
  }
};

const dashArray = (style: "solid" | "dashed" | "dotted"): string =>
  style === "solid"
    ? ""
    : style === "dotted"
      ? ' stroke-dasharray="2 4"'
      : ' stroke-dasharray="6 5"';

const renderTransactionNode = (
  layoutNode: LayoutNode,
  graph: LayoutGraph,
  options: ResolvedVisualRendererOptions,
  index: number,
  semantic: FormattedSemanticGraph,
): string => {
  const { node, width, height } = layoutNode;
  const x = layoutNode.x + graph.offsetX;
  const y = layoutNode.y + graph.offsetY;
  const palette = nodePalette(node);
  const title = fit(semanticNodeTitle(node, options), 38);
  const subtitle = semanticNodeSubtitle(node, options);
  const status = node.chips[0]?.label ?? "tx";
  const metrics = transactionMetrics(node, options);
  const facts = sectionRows(node, options, "facts").slice(0, 4);
  const redeemers = sectionRows(node, options, "redeemers").slice(0, 1);
  let cursor = y + 64;

  const lines = baseNodeOpen(
    index,
    node,
    semantic,
    options,
    x,
    y,
    width,
    height,
    palette,
  );
  lines.push(
    `<rect x="${x}" y="${y}" width="${width}" height="54" rx="8" fill="${palette.header}"/>`,
    `<text x="${x + 14}" y="${y + 21}" font-family="Inter, Arial" font-size="14" font-weight="700" fill="#0f172a">${xmlText(title)}</text>`,
    `<text x="${x + 14}" y="${y + 40}" font-family="ui-monospace, SFMono-Regular, monospace" font-size="10" fill="#475569">${xmlText(fit(subtitle ?? "", 36))}</text>`,
    `<rect x="${x + width - 88}" y="${y + 13}" width="72" height="24" rx="12" fill="${statusFill(node)}" stroke="${statusStroke(node)}"/>`,
    `<text x="${x + width - 52}" y="${y + 29}" text-anchor="middle" font-family="Inter, Arial" font-size="10" font-weight="700" fill="${statusText(node)}">${xmlText(status)}</text>`,
  );

  if (metrics.length > 0) {
    lines.push(`<g class="txg-metrics">`);
    metrics.forEach((metric, metricIndex) => {
      const column = metricIndex % 4;
      const row = Math.floor(metricIndex / 4);
      const boxX = x + 14 + column * 74;
      const boxY = cursor + row * 34;
      lines.push(
        `<rect x="${boxX}" y="${boxY}" width="66" height="27" rx="6" fill="#f8fafc" stroke="#e5e7eb"/>`,
        `<text x="${boxX + 8}" y="${boxY + 11}" font-family="Inter, Arial" font-size="8" font-weight="700" fill="#64748b">${xmlText(fit(metric.label, 8))}</text>`,
        `<text x="${boxX + 8}" y="${boxY + 23}" font-family="Inter, Arial" font-size="12" font-weight="700" fill="#111827">${xmlText(metric.value)}</text>`,
      );
    });
    lines.push(`</g>`);
    cursor += Math.ceil(metrics.length / 4) * 34 + 8;
  }

  renderRows(lines, x, cursor, width, "Facts", [...facts, ...redeemers]);
  lines.push("</g>");
  return lines.join("\n");
};

const renderUtxoNode = (
  layoutNode: LayoutNode,
  graph: LayoutGraph,
  options: ResolvedVisualRendererOptions,
  index: number,
  semantic: FormattedSemanticGraph,
): string => {
  const { node, width, height } = layoutNode;
  const x = layoutNode.x + graph.offsetX;
  const y = layoutNode.y + graph.offsetY;
  const palette = nodePalette(node);
  const title = fit(semanticNodeTitle(node, options), 34);
  const subtitle = semanticNodeSubtitle(node, options);
  const chips = usefulChips(node, options);
  const assetRows = sectionRows(node, options, "assets");
  const stateRows = sectionRows(node, options, "state");
  const ownerRows = sectionRows(node, options, "owner");
  let cursor = y + 62;

  const lines = baseNodeOpen(
    index,
    node,
    semantic,
    options,
    x,
    y,
    width,
    height,
    palette,
  );
  lines.push(
    `<rect x="${x}" y="${y}" width="${width}" height="52" rx="8" fill="${palette.header}"/>`,
    `<text x="${x + 14}" y="${y + 21}" font-family="Inter, Arial" font-size="13" font-weight="700" fill="#0f172a">${xmlText(title)}</text>`,
    `<text x="${x + 14}" y="${y + 39}" font-family="ui-monospace, SFMono-Regular, monospace" font-size="10" fill="#475569">${xmlText(fit(subtitle ?? "", 38))}</text>`,
  );

  if (chips.length > 0) {
    cursor = renderChips(lines, x + 14, cursor, chips, width - 28) + 8;
  }
  cursor = renderRows(lines, x, cursor, width, "Value", assetRows);
  if (stateRows.length > 0) {
    cursor = renderRows(lines, x, cursor + 2, width, "State", stateRows);
  }
  if (options.mode !== "overview" && ownerRows.length > 0) {
    cursor = renderRows(lines, x, cursor + 2, width, "Owner", ownerRows);
  }
  lines.push("</g>");
  return lines.join("\n");
};

const renderGenericNode = (
  layoutNode: LayoutNode,
  graph: LayoutGraph,
  options: ResolvedVisualRendererOptions,
  index: number,
  semantic: FormattedSemanticGraph,
): string => {
  const { node, width, height } = layoutNode;
  const x = layoutNode.x + graph.offsetX;
  const y = layoutNode.y + graph.offsetY;
  const palette = nodePalette(node);
  const title = fit(semanticNodeTitle(node, options), 34);
  const subtitle = semanticNodeSubtitle(node, options);
  const chips = usefulChips(node, options);
  let cursor = y + 60;
  const lines = baseNodeOpen(
    index,
    node,
    semantic,
    options,
    x,
    y,
    width,
    height,
    palette,
  );
  lines.push(
    `<rect x="${x}" y="${y}" width="${width}" height="50" rx="8" fill="${palette.header}"/>`,
    `<text x="${x + 14}" y="${y + 21}" font-family="Inter, Arial" font-size="13" font-weight="700" fill="#0f172a">${xmlText(title)}</text>`,
  );
  if (subtitle) {
    lines.push(
      `<text x="${x + 14}" y="${y + 38}" font-family="ui-monospace, SFMono-Regular, monospace" font-size="10" fill="#475569">${xmlText(fit(subtitle, 34))}</text>`,
    );
  }
  if (chips.length > 0) {
    cursor = renderChips(lines, x + 14, cursor, chips, width - 28) + 8;
  }
  for (const section of visibleSemanticSections(node, options)) {
    const rows = visibleSemanticRows(section, node, options).map((row) => ({
      ...row,
      label: semanticFieldLabel(row, options),
      value: semanticFieldValue(row, options),
    }));
    if (rows.length === 0) continue;
    cursor = renderRows(lines, x, cursor, width, section.title, rows);
  }
  lines.push("</g>");
  return lines.join("\n");
};

const baseNodeOpen = (
  index: number,
  node: VisualNode,
  semantic: FormattedSemanticGraph,
  options: ResolvedVisualRendererOptions,
  x: number,
  y: number,
  width: number,
  height: number,
  palette: ReturnType<typeof nodePalette>,
): string[] => [
  `<g id="txg-node-${index}" data-txg-id="${opaqueId(semantic, node.id)}" data-txg-type="node" class="txg-node txg-${node.kind}">`,
  `<title>${xmlText(nodeTitle(node, options))}</title>`,
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="8" fill="#ffffff" stroke="${palette.border}" stroke-width="${node.severity ? "1.8" : "1.1"}"/>`,
];

const renderRows = (
  lines: string[],
  x: number,
  y: number,
  width: number,
  title: string,
  rows: ReadonlyArray<VisualField>,
): number => {
  if (rows.length === 0) return y;
  lines.push(
    `<line x1="${x + 12}" y1="${y - 9}" x2="${x + width - 12}" y2="${y - 9}" stroke="#e5e7eb"/>`,
    `<text x="${x + 14}" y="${y}" font-family="Inter, Arial" font-size="9" font-weight="800" fill="#475569" letter-spacing="0">${xmlText(title)}</text>`,
  );
  let cursor = y + 19;
  for (const row of rows) {
    const label = fit(row.label, 14);
    const value = fit(row.value, row.mono ? 26 : 24);
    lines.push(
      `<text x="${x + 16}" y="${cursor}" font-family="Inter, Arial" font-size="10" fill="#64748b">${xmlText(label)}</text>`,
      `<text x="${x + 118}" y="${cursor}" font-family="${row.mono ? "ui-monospace, SFMono-Regular, monospace" : "Inter, Arial"}" font-size="10" fill="#111827">${xmlText(value)}</text>`,
    );
    cursor += 21;
  }
  return cursor + 8;
};

const renderChips = (
  lines: string[],
  x: number,
  y: number,
  chips: ReadonlyArray<VisualChip>,
  maxWidth: number,
): number => {
  let cursorX = x;
  let cursorY = y;
  for (const chip of chips) {
    const label = fit(chip.label, 18);
    const width = Math.max(42, label.length * 6 + 18);
    if (cursorX + width > x + maxWidth) {
      cursorX = x;
      cursorY += 24;
    }
    const palette = chipPalette(chip);
    lines.push(
      `<rect x="${cursorX}" y="${cursorY - 13}" width="${width}" height="19" rx="9.5" fill="${palette.fill}" stroke="${palette.stroke}"/>`,
      `<text x="${cursorX + width / 2}" y="${cursorY}" text-anchor="middle" font-family="Inter, Arial" font-size="9" font-weight="700" fill="${palette.text}">${xmlText(label)}</text>`,
    );
    cursorX += width + 6;
  }
  return cursorY + 10;
};

const transactionMetrics = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): VisualField[] =>
  visibleSemanticSections(node, options)
    .filter((section) =>
      ["inputs", "assets", "authority", "redeemers"].includes(section.id),
    )
    .flatMap((section) =>
      visibleSemanticRows(section, node, options).map((row) => ({
        ...row,
        label: metricLabel(row.label),
      })),
    )
    .filter((row) => row.value !== "0");

const sectionRows = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
  sectionId: string,
): VisualField[] =>
  visibleSemanticSections(node, options)
    .find((section) => section.id === sectionId)
    ?.rows.map((row) => ({
      ...row,
      label: semanticFieldLabel(row, options),
      value: semanticFieldValue(row, options),
    })) ?? [];

const usefulChips = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): VisualChip[] => {
  const labels = new Set(semanticChipLabels(node, options));
  const chips = node.chips.filter((chip) => {
    if (node.kind === "utxo" && chip.label === "resolved") return false;
    return labels.has(chip.label);
  });
  if (isGenesisNode(node) && !chips.some((chip) => chip.label === "genesis")) {
    return [{ label: "genesis", tone: "warning" }, ...chips];
  }
  return chips;
};

const metricLabel = (label: string): string => {
  switch (label) {
    case "Mint policies":
      return "Mints";
    case "Certificates":
      return "Certs";
    case "Withdrawals":
      return "Wdrls";
    default:
      return label;
  }
};

const nodeTitle = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): string =>
  [
    semanticNodeTitle(node, options),
    semanticNodeSubtitle(node, options),
    ...usefulChips(node, options).map((chip) => chip.label),
  ]
    .filter(Boolean)
    .join("\n");

const opaqueId = (graph: FormattedSemanticGraph, id: string): string => {
  const nodeIndex = graph.nodes.findIndex((node) => node.id === id);
  if (nodeIndex >= 0) return `node:${nodeIndex}`;
  const edgeIndex = graph.edges.findIndex((edge) => edge.id === id);
  return edgeIndex >= 0 ? `edge:${edgeIndex}` : id;
};

const nodePalette = (
  node: VisualNode,
): {
  readonly header: string;
  readonly border: string;
} => {
  if (node.severity === "error")
    return { header: "#fee2e2", border: "#dc2626" };
  if (isGenesisNode(node)) return { header: "#fef3c7", border: "#d97706" };
  switch (node.kind) {
    case "transaction":
      return { header: "#eef2ff", border: "#6366f1" };
    case "utxo":
      return { header: "#ecfdf5", border: "#10b981" };
    case "asset":
      return { header: "#f5f3ff", border: "#7c3aed" };
    case "withdrawal":
      return { header: "#ecfeff", border: "#0891b2" };
    case "certificate":
      return { header: "#eef2ff", border: "#4f46e5" };
    case "collateralReturn":
      return { header: "#fffbeb", border: "#f59e0b" };
    case "signer":
      return { header: "#f8fafc", border: "#94a3b8" };
    case "diagnostic":
      return { header: "#fef2f2", border: "#dc2626" };
  }
};

const chipPalette = (
  chip: VisualChip,
): {
  readonly fill: string;
  readonly stroke: string;
  readonly text: string;
} => {
  switch (chip.tone) {
    case "danger":
      return { fill: "#fee2e2", stroke: "#fca5a5", text: "#991b1b" };
    case "warning":
      return { fill: "#fef3c7", stroke: "#fbbf24", text: "#92400e" };
    case "success":
      return { fill: "#dcfce7", stroke: "#86efac", text: "#166534" };
    case "accent":
      return { fill: "#ede9fe", stroke: "#c4b5fd", text: "#5b21b6" };
    case "info":
      return { fill: "#dbeafe", stroke: "#93c5fd", text: "#1e40af" };
    default:
      return { fill: "#f8fafc", stroke: "#cbd5e1", text: "#334155" };
  }
};

const statusFill = (node: VisualNode): string =>
  node.severity === "error" ? "#fee2e2" : "#ffffff";

const statusStroke = (node: VisualNode): string =>
  node.severity === "error" ? "#fca5a5" : "#c7d2fe";

const statusText = (node: VisualNode): string =>
  node.severity === "error" ? "#991b1b" : "#3730a3";

const fit = (value: string, maxChars: number): string =>
  value.length <= maxChars ? value : `${value.slice(0, maxChars - 3)}...`;

const xmlText = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
