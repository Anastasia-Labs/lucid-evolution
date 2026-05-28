import type { TxGraphTrace } from "../model.js";
import { traceToSvg, type TraceToSvgOptions } from "./svg.js";
import { resolveVisualRendererOptions, visualEdgeStyle } from "./options.js";
import {
  formatSemanticGraph,
  semanticChipLabels,
  semanticEdgeLabel,
  semanticFieldLabel,
  semanticFieldValue,
  semanticNodeSubtitle,
  semanticNodeTitle,
  visibleSemanticRows,
  visibleSemanticSections,
} from "./semantic-format.js";
import {
  buildSemanticRenderGraph,
  type SemanticRenderOptions,
  type VisualEdge,
  type VisualNode,
} from "./semantic.js";

export type TraceToHtmlOptions = TraceToSvgOptions &
  SemanticRenderOptions & {
    readonly title?: string;
    readonly includeRawMetadata?: boolean;
  };

export const traceToHtml = (
  trace: TxGraphTrace,
  options: TraceToHtmlOptions = {},
): string => {
  const resolved = resolveVisualRendererOptions(options);
  const semantic = formatSemanticGraph(
    buildSemanticRenderGraph(trace, { redeemers: options.redeemers }),
    resolved,
  );
  const title = options.title ?? "Lucid Evolution Transaction Graph";
  const nodeIds = new Map(
    semantic.nodes.map((node, index) => [node.id, `node:${index}`] as const),
  );
  const metadata = {
    nodes: semantic.nodes.map((node, index) =>
      nodeMetadata(node, index, resolved, options.includeRawMetadata ?? false),
    ),
    edges: semantic.edges.map((edge, index) =>
      edgeMetadata(
        trace,
        edge,
        index,
        nodeIds,
        resolved,
        options.includeRawMetadata ?? false,
      ),
    ),
  };
  const filterKinds = [
    ...new Set(semantic.edges.map((edge) => edge.kind)),
  ].sort();

  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="utf-8"/>',
    '<meta name="viewport" content="width=device-width, initial-scale=1"/>',
    `<title>${htmlText(title)}</title>`,
    `<style>${cssText()}</style>`,
    "</head>",
    "<body>",
    '<main class="txg-shell">',
    '<aside class="txg-sidebar">',
    `<h1>${htmlText(title)}</h1>`,
    '<input id="txg-search" type="search" placeholder="Search tx, UTxO, asset, action..." autocomplete="off"/>',
    '<div class="txg-filters">',
    ...filterKinds.map(
      (kind) =>
        `<label><input type="checkbox" data-kind="${kind}" checked/> ${kind}</label>`,
    ),
    "</div>",
    `<div class="txg-sidebar-legend"><h2>Legend</h2>${edgeLegendHtml(filterKinds)}</div>`,
    '<section id="txg-details" class="txg-details">Select a node or edge.</section>',
    "</aside>",
    '<section class="txg-canvas">',
    '<div class="txg-toolbar"><button id="txg-zoom-in">+</button><button id="txg-zoom-out">-</button><button id="txg-fit">Fit</button><button id="txg-reset">Reset</button><label>Inspector <select id="txg-detail-mode"><option value="overview">overview</option><option value="audit" selected>audit</option><option value="debug">debug</option></select></label><button id="txg-copy">Copy JSON</button></div>',
    `<div id="txg-viewport" class="txg-viewport">${traceToSvg(trace, options)}</div>`,
    "</section>",
    "</main>",
    `<script type="application/json" id="txg-data">${scriptJson(metadata)}</script>`,
    `<script>${clientScript()}</script>`,
    "</body>",
    "</html>",
  ].join("\n");
};

const nodeMetadata = (
  node: VisualNode,
  index: number,
  resolved: ReturnType<typeof resolveVisualRendererOptions>,
  includeRawMetadata: boolean,
) => ({
  id: `node:${index}`,
  graphId: includeRawMetadata ? node.id : undefined,
  kind: node.kind,
  title: semanticNodeTitle(node, resolved),
  subtitle: semanticNodeSubtitle(node, resolved),
  chips: semanticChipLabels(node, resolved),
  sections: visibleSemanticSections(node, resolved).map((section) => ({
    title: section.title,
    rows: visibleSemanticRows(section, node, resolved).map((row) => ({
      label: semanticFieldLabel(row, resolved),
      value: semanticFieldValue(row, resolved),
    })),
  })),
  ...(includeRawMetadata ? { rawRef: node.rawRef } : {}),
});

const edgeMetadata = (
  trace: TxGraphTrace,
  edge: VisualEdge,
  index: number,
  nodeIds: ReadonlyMap<string, string>,
  resolved: ReturnType<typeof resolveVisualRendererOptions>,
  includeRawMetadata: boolean,
) => ({
  id: `edge:${index}`,
  graphId: includeRawMetadata ? edge.id : undefined,
  kind: edge.kind,
  title: semanticEdgeLabel(trace, edge, resolved),
  from: includeRawMetadata ? edge.from : nodeIds.get(edge.from),
  to: includeRawMetadata ? edge.to : nodeIds.get(edge.to),
  action: edge.action,
  redeemerKey: edge.redeemerKey,
  ...(includeRawMetadata
    ? { targetRef: edge.targetRef, rawRef: edge.rawRef }
    : {}),
});

const edgeLegendHtml = (kinds: ReadonlyArray<string>): string =>
  kinds
    .map((kind) => {
      const style = visualEdgeStyle(kind);
      return [
        '<div class="txg-legend-row">',
        `<svg width="42" height="14" viewBox="0 0 42 14" aria-hidden="true"><line x1="2" y1="7" x2="36" y2="7" stroke="${style.color}" stroke-width="2.4"${htmlDashArray(style.style)}/></svg>`,
        `<span>${htmlText(kind)}</span>`,
        "</div>",
      ].join("");
    })
    .join("");

const htmlDashArray = (style: "solid" | "dashed" | "dotted"): string =>
  style === "solid"
    ? ""
    : style === "dotted"
      ? ' stroke-dasharray="2 4"'
      : ' stroke-dasharray="6 5"';

const cssText = (): string => `
html, body { height: 100%; }
body { margin: 0; overflow: hidden; font-family: Inter, Arial, sans-serif; color: #111827; background: #f8fafc; }
.txg-shell { display: grid; grid-template-columns: 320px 1fr; height: 100vh; min-height: 0; }
.txg-sidebar { position: sticky; top: 0; max-height: 100vh; border-right: 1px solid #d1d5db; background: #ffffff; padding: 16px; overflow: auto; }
.txg-sidebar h1 { font-size: 16px; margin: 0 0 14px; }
#txg-search { box-sizing: border-box; width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 6px; }
.txg-filters { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 10px; margin: 14px 0; font-size: 12px; }
.txg-sidebar-legend { border-top: 1px solid #e5e7eb; padding-top: 12px; margin-bottom: 12px; }
.txg-sidebar-legend h2 { font-size: 12px; margin: 0 0 8px; color: #111827; }
.txg-legend-row { display: inline-flex; align-items: center; gap: 6px; min-width: 132px; margin: 0 6px 6px 0; font-size: 11px; color: #374151; }
.txg-details { border-top: 1px solid #e5e7eb; padding-top: 12px; font-size: 12px; line-height: 1.45; }
.txg-details h2 { font-size: 14px; margin: 0 0 8px; }
.txg-details table { border-collapse: collapse; width: 100%; margin: 8px 0; }
.txg-details td { border-top: 1px solid #e5e7eb; padding: 4px 0; vertical-align: top; }
.txg-details td:first-child { color: #64748b; width: 38%; }
.txg-canvas { display: grid; grid-template-rows: auto 1fr; min-width: 0; min-height: 0; overflow: hidden; }
.txg-toolbar { display: flex; gap: 8px; padding: 10px; border-bottom: 1px solid #d1d5db; background: #ffffff; }
.txg-toolbar button { border: 1px solid #cbd5e1; background: #ffffff; border-radius: 6px; padding: 6px 10px; }
.txg-toolbar label { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #475569; }
.txg-toolbar select { border: 1px solid #cbd5e1; border-radius: 6px; padding: 5px 8px; background: #ffffff; }
.txg-viewport { min-height: 0; overflow: auto; padding: 18px; transform-origin: top left; cursor: grab; }
.txg-viewport.txg-panning { cursor: grabbing; user-select: none; }
.txg-viewport svg { background: #ffffff; box-shadow: 0 1px 4px rgba(15, 23, 42, 0.12); }
.txg-hidden { opacity: 0.08; pointer-events: none; }
.txg-match rect:first-of-type { stroke-width: 3px; }
.txg-selected rect:first-of-type { stroke-width: 3px; stroke: #0f172a; }
.txg-connected path { stroke-width: 3px; }
.txg-details pre { white-space: pre-wrap; word-break: break-word; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 6px; padding: 8px; }
@media (max-width: 800px) { body { overflow: auto; } .txg-shell { grid-template-columns: 1fr; height: auto; min-height: 100vh; } .txg-sidebar { position: static; max-height: none; border-right: 0; border-bottom: 1px solid #d1d5db; } .txg-canvas { min-height: 70vh; } }
`;

const clientScript = (): string => `
const data = JSON.parse(document.getElementById("txg-data").textContent);
let selected = null;
let zoom = 1;
const viewport = document.getElementById("txg-viewport");
const svg = viewport.querySelector("svg");
const details = document.getElementById("txg-details");
const search = document.getElementById("txg-search");
const detailMode = document.getElementById("txg-detail-mode");
const checks = [...document.querySelectorAll("[data-kind]")];
const byId = new Map([...data.nodes, ...data.edges].map((item) => [item.id, item]));
const itemElements = new Map([...document.querySelectorAll(".txg-node,.txg-edge")].map((el) => [el.dataset.txgId, el]));

const setZoom = (nextZoom) => {
  zoom = Math.max(0.25, Math.min(2.5, nextZoom));
  viewport.style.zoom = zoom;
};

const itemBox = (item) => {
  const el = item ? itemElements.get(item.id) : null;
  if (!el || !el.getBBox) return null;
  try { return el.getBBox(); } catch (_error) { return null; }
};

const centerBox = (box) => {
  if (!box) return;
  viewport.scrollLeft = Math.max(0, (box.x + box.width / 2) * zoom - viewport.clientWidth / 2);
  viewport.scrollTop = Math.max(0, (box.y + box.height / 2) * zoom - viewport.clientHeight / 2);
};

const primaryTransaction = () =>
  data.nodes.find((node) => node.kind === "transaction" && node.chips?.includes("failed")) ||
  [...data.nodes].reverse().find((node) => node.kind === "transaction") ||
  data.nodes[0];

const fitToView = (overview = false) => {
  if (!svg?.viewBox?.baseVal) return;
  const viewBox = svg.viewBox.baseVal;
  const widthZoom = (viewport.clientWidth - 36) / Math.max(1, viewBox.width);
  const readableFloor = viewport.clientWidth < 720 ? 0.55 : 0.72;
  setZoom(
    overview
      ? Math.min(1, Math.max(0.35, widthZoom))
      : Math.min(1, Math.max(readableFloor, widthZoom)),
  );
  requestAnimationFrame(() => centerBox(itemBox(primaryTransaction())));
};

const renderDetails = (item) => {
  selected = item;
  if (!item) { details.textContent = "Select a node or edge."; return; }
  const mode = detailMode.value;
  const summaryRows = [["kind", item.kind], ...(item.subtitle ? [["subtitle", item.subtitle]] : []), ...(item.chips?.length ? [["tags", item.chips.join(", ")]] : [])];
  const auditRows = item.sections ? item.sections.flatMap((section) => section.rows.map((row) => [section.title + "." + row.label, row.value])) : Object.entries(item).filter(([key]) => !["sections"].includes(key)).map(([key, value]) => [key, typeof value === "string" ? value : JSON.stringify(value)]);
  if (mode === "debug") {
    details.innerHTML = "<h2>" + escapeHtml(item.title || item.id) + "</h2><pre>" + escapeHtml(JSON.stringify(item, null, 2)) + "</pre>";
    return;
  }
  const rows = mode === "overview" ? summaryRows : [...summaryRows, ...auditRows];
  details.innerHTML = "<h2>" + escapeHtml(item.title || item.id) + "</h2>" + "<table>" + rows.map(([key, value]) => "<tr><td>" + escapeHtml(String(key)) + "</td><td>" + escapeHtml(String(value)) + "</td></tr>").join("") + "</table>";
};

const textFor = (item) => JSON.stringify(item).toLowerCase();
const applyFilters = () => {
  const query = search.value.toLowerCase();
  const enabled = new Set(checks.filter((check) => check.checked).map((check) => check.dataset.kind));
  const visibleEdgeIds = new Set(data.edges.filter((edge) => enabled.has(edge.kind) && (!query || textFor(edge).includes(query))).map((edge) => edge.id));
  const matchingNodeIds = new Set(data.nodes.filter((node) => query && textFor(node).includes(query)).map((node) => node.id));
  document.querySelectorAll(".txg-edge").forEach((edge) => {
    edge.classList.toggle("txg-hidden", !visibleEdgeIds.has(edge.dataset.txgId));
  });
  document.querySelectorAll(".txg-node").forEach((node) => {
    node.classList.toggle("txg-match", matchingNodeIds.has(node.dataset.txgId));
  });
};

document.querySelectorAll(".txg-node,.txg-edge").forEach((el) => {
  el.addEventListener("click", () => {
    const item = byId.get(el.dataset.txgId) || null;
    renderDetails(item);
    document.querySelectorAll(".txg-selected,.txg-connected").forEach((candidate) => candidate.classList.remove("txg-selected", "txg-connected"));
    el.classList.add("txg-selected");
    if (item?.from) itemElements.get(item.from)?.classList.add("txg-connected");
    if (item?.to) itemElements.get(item.to)?.classList.add("txg-connected");
    if (item?.id?.startsWith("node:")) {
      data.edges.filter((edge) => edge.from === item.id || edge.to === item.id).forEach((edge) => itemElements.get(edge.id)?.classList.add("txg-connected"));
    }
  });
});
search.addEventListener("input", applyFilters);
checks.forEach((check) => check.addEventListener("change", applyFilters));
detailMode.addEventListener("change", () => renderDetails(selected));
document.getElementById("txg-zoom-in").addEventListener("click", () => setZoom(zoom + 0.1));
document.getElementById("txg-zoom-out").addEventListener("click", () => setZoom(zoom - 0.1));
document.getElementById("txg-fit").addEventListener("click", () => fitToView(true));
document.getElementById("txg-reset").addEventListener("click", () => { search.value = ""; checks.forEach((check) => check.checked = true); applyFilters(); fitToView(false); });
document.getElementById("txg-copy").addEventListener("click", async () => { if (selected) await navigator.clipboard.writeText(JSON.stringify(selected, null, 2)); });

let panStart = null;
viewport.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".txg-node,.txg-edge")) return;
  panStart = { x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
  viewport.classList.add("txg-panning");
  viewport.setPointerCapture(event.pointerId);
});
viewport.addEventListener("pointermove", (event) => {
  if (!panStart) return;
  viewport.scrollLeft = panStart.left - (event.clientX - panStart.x);
  viewport.scrollTop = panStart.top - (event.clientY - panStart.y);
});
viewport.addEventListener("pointerup", (event) => {
  panStart = null;
  viewport.classList.remove("txg-panning");
  viewport.releasePointerCapture(event.pointerId);
});
window.addEventListener("resize", () => fitToView(false));
requestAnimationFrame(() => fitToView(false));

const escapeHtml = (value) => value.replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\\"": "&quot;" }[char]));
`;

const htmlText = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const scriptJson = (value: unknown): string =>
  JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
