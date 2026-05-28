import type { TraceRedeemer, TxGraphTrace } from "../model.js";
import { outRefKey } from "../resolve.js";
import { shortHash } from "./common.js";
import type { ResolvedVisualRendererOptions } from "./options.js";
import type {
  SemanticRenderGraph,
  VisualDiagnostic,
  VisualEdge,
  VisualField,
  VisualNode,
  VisualSection,
} from "./semantic.js";

export type FormattedSemanticGraph = {
  readonly nodes: VisualNode[];
  readonly edges: VisualEdge[];
};

export const formatSemanticGraph = (
  graph: SemanticRenderGraph,
  options: ResolvedVisualRendererOptions,
): FormattedSemanticGraph => {
  const nodes = new Map(graph.nodes.map((node) => [node.id, node] as const));
  const edges = [...graph.edges];
  applyViewAnnotations(options, nodes);
  addDiagnosticNodes(graph, options, nodes, edges);
  addBudgetSummaries(options, nodes, edges);

  const connectedNodeIds = new Set<string>();
  for (const edge of edges) {
    connectedNodeIds.add(edge.from);
    connectedNodeIds.add(edge.to);
  }

  return {
    nodes: [...nodes.values()]
      .filter(
        (node) =>
          node.kind === "transaction" ||
          node.kind === "diagnostic" ||
          connectedNodeIds.has(node.id),
      )
      .sort((left, right) => left.id.localeCompare(right.id)),
    edges: edges.sort((left, right) => left.id.localeCompare(right.id)),
  };
};

export const semanticEdgeLabel = (
  trace: TxGraphTrace,
  edge: VisualEdge,
  options: ResolvedVisualRendererOptions,
): string => {
  if (!edge.redeemerKey || !edge.action) return edge.label;
  const base = `${edge.redeemerKey.tag} #${edge.redeemerKey.index}`;
  if (options.privacy.redeemer === "hidden") return base;
  if (options.mode === "overview" || options.privacy.redeemer === "label") {
    return edge.action.label;
  }

  const redeemer = findRedeemer(trace, edge);
  const parts = [base];
  if (edge.action.label !== base) parts.push(edge.action.label);
  parts.push(`redeemer list #${edge.redeemerKey.redeemerListIndex}`);
  if (redeemer)
    parts.push(`ex ${redeemer.exUnits.mem}/${redeemer.exUnits.steps}`);
  if (
    options.mode === "debug" ||
    options.privacy.redeemer === "constructor" ||
    options.privacy.redeemer === "full"
  ) {
    parts.push(
      ...Object.entries(edge.action.fields ?? {})
        .slice(0, options.budget.maxVisibleRedeemerFields)
        .map(([label, value]) => `${label}: ${value}`),
    );
  }
  if (options.mode === "debug") {
    parts.push(`${edge.action.source}/${edge.action.confidence}`);
  }
  return parts.join(" · ");
};

export const semanticChipLabels = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): string[] => {
  if (node.rawRef.type === "assetPolicy") {
    return [formatHash(node.rawRef.policyId, options)];
  }
  return node.chips
    .map((chip) => chip.label)
    .filter((label) => node.kind !== "utxo" || label !== "resolved");
};

export const visibleSemanticSections = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): VisualSection[] => {
  if (options.mode !== "overview") return node.sections;
  if (node.kind === "transaction") {
    return node.sections.filter((section) =>
      ["facts", "inputs", "assets", "redeemers"].includes(section.id),
    );
  }
  return node.sections;
};

export const visibleSemanticRows = (
  section: VisualSection,
  _node: VisualNode,
  options: ResolvedVisualRendererOptions,
): VisualField[] => {
  const maxRows =
    section.id === "assets"
      ? options.budget.maxVisibleAssetsPerUtxo
      : section.id === "redeemers"
        ? options.budget.maxVisibleRedeemerFields
        : Number.POSITIVE_INFINITY;
  const rows = section.rows.slice(0, maxRows);
  if (section.rows.length <= rows.length) return rows;
  return [
    ...rows,
    {
      id: `${section.id}:more`,
      label: "More",
      value: `+${section.rows.length - rows.length} more`,
      tone: "neutral",
    },
  ];
};

export const semanticFieldValue = (
  row: VisualField,
  options: ResolvedVisualRendererOptions,
): string => {
  if (row.id.startsWith("asset:") && row.rawValue) {
    const defaultShort = shortHash(row.rawValue, 6);
    if (
      options.privacy.hash === "hidden" &&
      (row.value === defaultShort || row.value === row.rawValue)
    ) {
      return "asset";
    }
    if (options.privacy.hash === "full" && row.value === defaultShort) {
      return row.rawValue;
    }
  }
  if (row.id === "address") {
    switch (options.privacy.address) {
      case "hidden":
        return "hidden";
      case "full":
        return row.rawValue ?? row.value;
      case "short":
        return row.rawValue ? shortHash(row.rawValue, 10) : row.value;
      case "alias":
        return row.value;
    }
  }
  if (row.id.startsWith("datum")) {
    switch (options.privacy.datum) {
      case "hidden":
        return "hidden";
      case "marker":
        return "present";
      case "full":
        return row.rawValue ?? row.value;
      default:
        return row.value;
    }
  }
  if (row.id === "keyHash" && row.rawValue) {
    return formatHash(row.rawValue, options);
  }
  if (row.id === "scriptRef" && row.rawValue) {
    if (options.privacy.hash === "hidden") {
      return row.rawValue.split(" ")[0] ?? "script ref";
    }
    return options.privacy.hash === "full" ? row.rawValue : row.value;
  }
  return row.value;
};

export const semanticFieldLabel = (
  row: VisualField,
  options: ResolvedVisualRendererOptions,
): string => {
  if (row.id.startsWith("asset:") && row.rawLabel) {
    const defaultShort = shortHash(row.rawLabel, 6);
    if (
      options.privacy.hash === "hidden" &&
      (row.label === defaultShort || row.label === row.rawLabel)
    ) {
      return "asset";
    }
    if (options.privacy.hash === "full" && row.label === defaultShort) {
      return row.rawLabel;
    }
  }
  return row.label;
};

export const semanticNodeTitle = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): string => {
  if (
    node.rawRef.type === "transaction" &&
    node.title === `tx ${shortHash(node.rawRef.txHash)}`
  ) {
    return `tx ${formatHash(node.rawRef.txHash, options)}`;
  }
  if (
    node.rawRef.type === "utxo" &&
    node.title === outRefKey(node.rawRef.outRef)
  ) {
    return `UTxO ${formatOutRef(node.rawRef.outRef, options)}`;
  }
  if (node.rawRef.type === "assetPolicy" && node.title.startsWith("policy ")) {
    return `policy ${formatHash(node.rawRef.policyId, options)}`;
  }
  return node.title;
};

export const semanticNodeSubtitle = (
  node: VisualNode,
  options: ResolvedVisualRendererOptions,
): string | undefined => {
  if (options.privacy.hash === "hidden") return undefined;
  switch (node.rawRef.type) {
    case "transaction":
      return formatHash(node.rawRef.txHash, options);
    case "utxo":
      return formatOutRef(node.rawRef.outRef, options);
    case "assetPolicy":
      return formatHash(node.rawRef.policyId, options);
    case "signer":
      return formatHash(node.rawRef.keyHash, options);
    case "withdrawal":
      return formatAddress(node.rawRef.rewardAddress, node.subtitle, options);
    case "certificate":
      return `${formatHash(node.rawRef.txHash, options)}#${node.rawRef.index}`;
    case "collateralReturn":
      return formatHash(node.rawRef.txHash, options);
    default:
      return node.subtitle;
  }
};

export const isGenesisNode = (node: VisualNode): boolean =>
  node.kind === "utxo" && node.chips.some((chip) => chip.label === "genesis");

export const isScriptNode = (node: VisualNode): boolean =>
  node.kind === "utxo" &&
  (node.sections.some((section) =>
    section.rows.some((row) =>
      ["datum", "datumHash", "scriptRef"].includes(row.id),
    ),
  ) ||
    node.chips.some((chip) => /script|datum|state/i.test(chip.label)));

export const isScriptInteractionEdge = (
  edge: VisualEdge,
  nodes: ReadonlyMap<string, VisualNode>,
): boolean =>
  (["spend", "read", "produce", "mint", "burn"].includes(edge.kind) &&
    [edge.from, edge.to].some((id) => {
      const node = nodes.get(id);
      return node ? isScriptNode(node) : false;
    })) ||
  edge.kind === "collateral";

const addDiagnosticNodes = (
  graph: SemanticRenderGraph,
  options: ResolvedVisualRendererOptions,
  nodes: Map<string, VisualNode>,
  edges: VisualEdge[],
): void => {
  const byTx = new Map<string, VisualDiagnostic[]>();
  for (const diagnostic of graph.diagnostics) {
    const key = diagnostic.txHash ?? "global";
    byTx.set(key, [...(byTx.get(key) ?? []), diagnostic]);
  }

  for (const [txHash, diagnostics] of byTx) {
    const visible = diagnostics.slice(0, options.budget.maxVisibleWarnings);
    for (const diagnostic of visible) {
      addDiagnosticNode(options, diagnostic, nodes, edges);
    }
    if (diagnostics.length > visible.length) {
      const hiddenCount = diagnostics.length - visible.length;
      const node = summaryNode(
        `summary:${txHash}:diagnostics`,
        `+${hiddenCount} diagnostics`,
        "warnings",
        hiddenCount,
      );
      nodes.set(node.id, node);
      if (txHash !== "global") {
        edges.push(summaryEdge(node.id, `tx:${txHash}`, txHash, "warnings"));
      }
    }
  }
};

const applyViewAnnotations = (
  options: ResolvedVisualRendererOptions,
  nodes: Map<string, VisualNode>,
): void => {
  if (options.view !== "scriptInteraction") return;
  for (const [id, node] of nodes) {
    if (node.kind !== "utxo" || !isScriptNode(node)) continue;
    nodes.set(id, {
      ...node,
      chips: [
        { label: "script interaction", tone: "accent" },
        ...node.chips.filter((chip) => chip.label !== "script interaction"),
      ],
    });
  }
};

const addDiagnosticNode = (
  options: ResolvedVisualRendererOptions,
  diagnostic: VisualDiagnostic,
  nodes: Map<string, VisualNode>,
  edges: VisualEdge[],
): void => {
  const node: VisualNode = {
    id: `diagnostic:${diagnostic.id}`,
    kind: "diagnostic",
    title: diagnostic.code,
    sections: [
      {
        id: "diagnostic",
        title: "Diagnostic",
        rows: [
          {
            id: "message",
            label: "Message",
            value: diagnosticMessage(diagnostic, options),
          },
        ],
      },
    ],
    ports: [],
    chips: [{ label: diagnostic.severity, tone: "danger" }],
    severity: diagnostic.severity === "error" ? "error" : "warning",
    rawRef: { type: "diagnostic", code: diagnostic.code },
  };
  nodes.set(node.id, node);
  if (diagnostic.txHash) {
    edges.push({
      id: `diagnostic-edge:${diagnostic.id}`,
      kind: "diagnostic",
      from: node.id,
      to: `tx:${diagnostic.txHash}`,
      label: diagnostic.severity,
      targetRef: {
        type: "diagnostic",
        txHash: diagnostic.txHash,
        code: diagnostic.code,
      },
      rawRef: { type: "diagnostic", code: diagnostic.code },
    });
  }
};

const addBudgetSummaries = (
  options: ResolvedVisualRendererOptions,
  nodes: Map<string, VisualNode>,
  edges: VisualEdge[],
): void => {
  const hidden = new Set<string>();
  for (const txHash of transactionHashes(nodes)) {
    hideExcessEdges(
      edges,
      txHash,
      "inputs",
      options.budget.maxVisibleInputs,
      (edge) =>
        edge.targetRef.txHash === txHash &&
        ["spend", "read", "collateral"].includes(edge.kind),
      hidden,
      nodes,
    );
    hideExcessEdges(
      edges,
      txHash,
      "outputs",
      options.budget.maxVisibleOutputs,
      (edge) => edge.targetRef.txHash === txHash && edge.kind === "produce",
      hidden,
      nodes,
    );
    hideExcessEdges(
      edges,
      txHash,
      "signers",
      options.budget.maxVisibleSigners,
      (edge) => edge.targetRef.txHash === txHash && edge.kind === "sign",
      hidden,
      nodes,
    );
  }
  for (let index = edges.length - 1; index >= 0; index--) {
    if (hidden.has(edges[index]!.id)) edges.splice(index, 1);
  }
};

const hideExcessEdges = (
  edges: VisualEdge[],
  txHash: string,
  group: "inputs" | "outputs" | "signers",
  maxVisible: number,
  matches: (edge: VisualEdge) => boolean,
  hidden: Set<string>,
  nodes: Map<string, VisualNode>,
): void => {
  const visibleLimit = Number.isFinite(maxVisible) ? maxVisible : edges.length;
  const candidates = edges
    .filter(matches)
    .sort((left, right) => left.id.localeCompare(right.id));
  const extra = candidates.slice(visibleLimit);
  for (const edge of extra) hidden.add(edge.id);
  if (extra.length === 0) return;

  const node = summaryNode(
    `summary:${txHash}:${group}`,
    `+${extra.length} ${group}`,
    group,
    extra.length,
  );
  nodes.set(node.id, node);
  edges.push(
    group === "outputs"
      ? summaryEdge(`tx:${txHash}`, node.id, txHash, group)
      : summaryEdge(node.id, `tx:${txHash}`, txHash, group),
  );
};

const summaryNode = (
  id: string,
  title: string,
  group: string,
  count: number,
): VisualNode => ({
  id,
  kind: "diagnostic",
  title,
  sections: [
    {
      id: "summary",
      title: "Collapsed",
      rows: [{ id: "count", label: "Count", value: String(count) }],
    },
  ],
  ports: [],
  chips: [{ label: "collapsed", tone: "neutral" }],
  rawRef: { type: "diagnostic", code: "collapsed", count, group },
});

const summaryEdge = (
  from: string,
  to: string,
  txHash: string,
  group: string,
): VisualEdge => ({
  id: `summary-edge:${txHash}:${group}:${from}->${to}`,
  kind: "summary",
  from,
  to,
  label: group,
  targetRef: {
    type: "diagnostic",
    txHash,
    code: "collapsed",
    group,
  },
  rawRef: { type: "diagnostic", code: "collapsed", group },
});

const transactionHashes = (nodes: ReadonlyMap<string, VisualNode>): string[] =>
  [...nodes.values()]
    .filter(
      (
        node,
      ): node is VisualNode & {
        rawRef: { type: "transaction"; txHash: string };
      } => node.rawRef.type === "transaction",
    )
    .map((node) => node.rawRef.txHash)
    .sort();

const formatOutRef = (
  outRef: { readonly txHash: string; readonly outputIndex: number },
  options: ResolvedVisualRendererOptions,
): string => {
  if (options.privacy.hash === "hidden") return `#${outRef.outputIndex}`;
  return `${formatHash(outRef.txHash, options)}#${outRef.outputIndex}`;
};

const formatHash = (
  hash: string,
  options: ResolvedVisualRendererOptions,
): string =>
  options.privacy.hash === "full"
    ? hash
    : options.privacy.hash === "hidden"
      ? "hidden"
      : shortHash(hash);

const formatAddress = (
  rawAddress: string,
  aliasOrShort: string | undefined,
  options: ResolvedVisualRendererOptions,
): string | undefined => {
  switch (options.privacy.address) {
    case "hidden":
      return undefined;
    case "full":
      return rawAddress;
    case "short":
      return shortHash(rawAddress, 10);
    case "alias":
      return aliasOrShort ?? shortHash(rawAddress, 10);
  }
};

const diagnosticMessage = (
  diagnostic: VisualDiagnostic,
  options: ResolvedVisualRendererOptions,
): string => {
  let message = diagnostic.message;
  if (diagnostic.outRef) {
    message = message.replace(
      outRefKey(diagnostic.outRef),
      formatOutRef(diagnostic.outRef, options),
    );
  }
  if (diagnostic.txHash) {
    message = message.replaceAll(
      diagnostic.txHash,
      formatHash(diagnostic.txHash, options),
    );
  }
  return message;
};

const findRedeemer = (
  trace: TxGraphTrace,
  edge: VisualEdge,
): TraceRedeemer | undefined => {
  const key = edge.redeemerKey;
  if (!key) return undefined;
  return trace.transactions
    .find((transaction) => transaction.hash === edge.targetRef.txHash)
    ?.redeemers.find(
      (redeemer) =>
        redeemer.tag === key.tag &&
        redeemer.index === key.index &&
        redeemer.redeemerListIndex === key.redeemerListIndex,
    );
};
