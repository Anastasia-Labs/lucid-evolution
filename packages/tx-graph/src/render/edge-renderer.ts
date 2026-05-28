import type { TxGraphTrace } from "../model.js";
import {
  visualEdgeStyle,
  type ResolvedVisualRendererOptions,
} from "./options.js";
import {
  isScriptInteractionEdge,
  semanticEdgeLabel,
  type FormattedSemanticGraph,
} from "./semantic-format.js";
import type { VisualEdge, VisualNode } from "./semantic.js";
import type { LayoutGraph } from "./layout.js";
import { edgePath } from "./layout.js";

export const renderEdge = (
  trace: TxGraphTrace,
  edge: VisualEdge,
  index: number,
  graph: LayoutGraph,
  options: ResolvedVisualRendererOptions,
  semanticNodes: ReadonlyMap<string, VisualNode>,
  semantic: FormattedSemanticGraph,
): string => {
  if (!graph.nodes.has(edge.from) || !graph.nodes.has(edge.to)) return "";
  const path = edgePath(edge, graph);
  const style = visualEdgeStyle(edge.kind);
  const scriptFocus =
    options.view === "scriptInteraction" &&
    isScriptInteractionEdge(edge, semanticNodes);
  const label = graph.edgeLabels.get(edge.id);
  return [
    `<g data-txg-id="${opaqueId(semantic, edge.id)}" data-txg-type="edge" class="txg-edge txg-${edge.kind}">`,
    `<title>${xmlText(semanticEdgeLabel(trace, edge, options))}</title>`,
    `<path class="txg-edge-hit" d="${path}" fill="none" stroke="transparent" stroke-width="12" pointer-events="stroke"/>`,
    `<path d="${path}" fill="none" stroke="${style.color}" stroke-width="${strokeWidth(edge, scriptFocus)}" marker-end="url(#txg-arrow)"${dashArray(style.style)}/>`,
    label
      ? renderEdgeLabel(
          label.x,
          label.y,
          label.width,
          label.height,
          label.text,
          style.color,
        )
      : "",
    "</g>",
  ].join("\n");
};

const renderEdgeLabel = (
  x: number,
  y: number,
  width: number,
  height: number,
  label: string,
  color: string,
): string =>
  [
    `<rect class="txg-edge-label" x="${x}" y="${y}" width="${width}" height="${height}" rx="5" fill="#ffffff" stroke="#cbd5e1"/>`,
    `<text x="${x + width / 2}" y="${y + 14}" text-anchor="middle" font-family="Inter, Arial" font-size="10" font-weight="700" fill="${color}">${xmlText(label)}</text>`,
  ].join("\n");

const strokeWidth = (edge: VisualEdge, scriptFocus: boolean): string => {
  if (scriptFocus) return "2.8";
  if (edge.kind === "spend") return "2.2";
  if (edge.kind === "produce") return "1.9";
  if (edge.kind === "diagnostic") return "2";
  return "1.35";
};

const dashArray = (style: "solid" | "dashed" | "dotted"): string =>
  style === "solid"
    ? ""
    : style === "dotted"
      ? ' stroke-dasharray="2 4"'
      : ' stroke-dasharray="6 5"';

const opaqueId = (graph: FormattedSemanticGraph, id: string): string => {
  const nodeIndex = graph.nodes.findIndex((node) => node.id === id);
  if (nodeIndex >= 0) return `node:${nodeIndex}`;
  const edgeIndex = graph.edges.findIndex((edge) => edge.id === id);
  return edgeIndex >= 0 ? `edge:${edgeIndex}` : id;
};

const xmlText = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
