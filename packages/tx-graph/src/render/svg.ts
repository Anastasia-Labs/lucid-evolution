import type { TxGraphTrace } from "../model.js";
import {
  resolveVisualRendererOptions,
  type VisualRendererOptions,
} from "./options.js";
import {
  formatSemanticGraph,
  type FormattedSemanticGraph,
} from "./semantic-format.js";
import {
  buildSemanticRenderGraph,
  type SemanticRenderOptions,
  type VisualNode,
} from "./semantic.js";
import { renderEdge } from "./edge-renderer.js";
import { layoutGraph } from "./layout.js";
import { renderLegend, renderNode } from "./node-renderer.js";

export type TraceToSvgOptions = VisualRendererOptions &
  SemanticRenderOptions & {
    readonly title?: string;
  };

const MARGIN = 40;

export const traceToSvg = (
  trace: TxGraphTrace,
  options: TraceToSvgOptions = {},
): string => {
  const resolved = resolveVisualRendererOptions(options);
  const semantic = formatSemanticGraph(
    buildSemanticRenderGraph(trace, { redeemers: options.redeemers }),
    resolved,
  );
  const layout = layoutGraph(trace, semantic, resolved);
  const title = options.title ?? "Lucid Evolution Transaction Graph";
  const diagnostics = semantic.nodes.filter(
    (node) => node.kind === "diagnostic",
  );
  const semanticNodes = new Map(
    [...layout.nodes.entries()].map(([id, layoutNode]) => [
      id,
      layoutNode.node,
    ]),
  );

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" role="img" width="${layout.width}" height="${layout.height}" viewBox="0 0 ${layout.width} ${layout.height}">`,
    `<title>${xmlText(title)}</title>`,
    "<defs>",
    '<marker id="txg-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="context-stroke"/></marker>',
    "</defs>",
    `<rect width="100%" height="100%" fill="#ffffff"/>`,
    renderTitle(title, trace, diagnostics.length),
    ...semantic.edges.map((edge, index) =>
      renderEdge(trace, edge, index, layout, resolved, semanticNodes, semantic),
    ),
    ...[...layout.nodes.values()]
      .sort((left, right) => left.node.id.localeCompare(right.node.id))
      .map((node, index) =>
        renderNode(node, layout, resolved, index, semantic),
      ),
    renderLegend(layout, semantic),
    "</svg>",
  ].join("\n");
};

export const semanticSvgForTesting = (
  trace: TxGraphTrace,
  options: TraceToSvgOptions = {},
): {
  readonly semantic: FormattedSemanticGraph;
  readonly nodes: VisualNode[];
} => {
  const resolved = resolveVisualRendererOptions(options);
  const semantic = formatSemanticGraph(
    buildSemanticRenderGraph(trace, { redeemers: options.redeemers }),
    resolved,
  );
  return { semantic, nodes: semantic.nodes };
};

const renderTitle = (
  title: string,
  trace: TxGraphTrace,
  diagnosticCount: number,
): string =>
  [
    `<text x="${MARGIN}" y="34" font-family="Inter, Arial" font-size="20" font-weight="700" fill="#111827">${xmlText(title)}</text>`,
    `<text x="${MARGIN}" y="58" font-family="Inter, Arial" font-size="12" fill="#475569">${trace.transactions.length} transaction${trace.transactions.length === 1 ? "" : "s"} · ${Object.keys(trace.utxos).length} UTxOs · ${diagnosticCount} diagnostic${diagnosticCount === 1 ? "" : "s"}</text>`,
  ].join("\n");

const xmlText = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
