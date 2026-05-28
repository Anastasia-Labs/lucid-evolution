import type {
  TraceAssets,
  TraceEdge,
  TraceEdgeKind,
  TraceOutRef,
  TraceTransaction,
  TraceUtxo,
  TxGraphTrace,
} from "../model.js";
import { outRefKey } from "../resolve.js";

export type RenderNodeKind =
  | "transaction"
  | "utxo"
  | "asset"
  | "withdrawal"
  | "certificate"
  | "signer"
  | "collateralReturn"
  | "external";

export type RenderNode = {
  readonly id: string;
  readonly kind: RenderNodeKind;
  readonly label: string;
  readonly unresolved?: boolean;
  readonly genesis?: boolean;
};

export type RenderGraph = {
  readonly nodes: RenderNode[];
  readonly edges: TraceEdge[];
};

export type RenderLabelOptions = {
  readonly maxAssets?: number;
  readonly maxWarnings?: number;
};

export const buildRenderGraph = (trace: TxGraphTrace): RenderGraph => {
  const nodes = new Map<string, RenderNode>();
  for (const transaction of trace.transactions) {
    nodes.set(txNodeId(transaction.hash), {
      id: txNodeId(transaction.hash),
      kind: "transaction",
      label: transactionLabel(transaction, trace),
    });
  }
  for (const [key, utxo] of Object.entries(trace.utxos).sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    nodes.set(utxoNodeId(utxo), {
      id: utxoNodeId(utxo),
      kind: "utxo",
      label: utxoLabel(key, utxo, trace),
      unresolved: utxo.resolution === "unresolved",
      genesis: utxo.resolution === "genesis",
    });
  }
  for (const edge of sortedEdges(trace.edges)) {
    ensureEndpointNode(nodes, edge.from, trace);
    ensureEndpointNode(nodes, edge.to, trace);
  }
  return {
    nodes: [...nodes.values()].sort((left, right) =>
      left.id.localeCompare(right.id),
    ),
    edges: sortedEdges(trace.edges),
  };
};

export const sortedEdges = (edges: ReadonlyArray<TraceEdge>): TraceEdge[] =>
  [...edges].sort((left, right) =>
    edgeSortKey(left).localeCompare(edgeSortKey(right)),
  );

export const edgeStyle = (
  kind: TraceEdgeKind,
): {
  readonly label: string;
  readonly color: string;
  readonly style: "solid" | "dashed" | "dotted";
} => {
  switch (kind) {
    case "spends":
      return { label: "spends", color: "#374151", style: "solid" };
    case "reads":
      return { label: "reads", color: "#2563eb", style: "dashed" };
    case "collateral":
      return { label: "collateral", color: "#d97706", style: "dashed" };
    case "collateralReturn":
      return { label: "collateral return", color: "#f59e0b", style: "solid" };
    case "produces":
      return { label: "produces", color: "#15803d", style: "solid" };
    case "mints":
      return { label: "mints", color: "#7c3aed", style: "solid" };
    case "burns":
      return { label: "burns", color: "#dc2626", style: "solid" };
    case "withdraws":
      return { label: "withdraws", color: "#0891b2", style: "solid" };
    case "certifies":
      return { label: "certifies", color: "#4f46e5", style: "solid" };
    case "requiresSigner":
      return { label: "requires signer", color: "#6b7280", style: "dotted" };
  }
};

export const txNodeId = (txHash: string): string => `tx:${txHash}`;
export const utxoNodeId = (outRef: TraceOutRef): string =>
  `utxo:${outRefKey(outRef)}`;

export const shortHash = (value: string, size = 8): string =>
  value.length <= size * 2
    ? value
    : `${value.slice(0, size)}...${value.slice(-size)}`;

export const assetName = (unit: string, trace: TxGraphTrace): string => {
  const alias = trace.aliases.assets[unit];
  if (alias) return alias;
  if (unit === "lovelace") return "lovelace";
  return shortHash(unit, 6);
};

export const addressName = (address: string, trace: TxGraphTrace): string =>
  trace.aliases.addresses[address] ?? shortHash(address, 10);

export const formatAssets = (
  assets: TraceAssets,
  trace: TxGraphTrace,
  options: RenderLabelOptions = {},
): string => {
  const units = Object.keys(assets).sort(assetUnitSort);
  const maxAssets = options.maxAssets ?? 4;
  const visible = units.slice(0, maxAssets);
  const rendered = visible.map(
    (unit) => `${assets[unit]} ${assetName(unit, trace)}`,
  );
  if (units.length > visible.length) {
    rendered.push(`+${units.length - visible.length} more`);
  }
  return rendered.length > 0 ? rendered.join("\\n") : "no assets";
};

export const transactionLabel = (
  transaction: TraceTransaction,
  trace: TxGraphTrace,
): string => {
  const lines = [
    transaction.label ?? `tx ${shortHash(transaction.hash)}`,
    `status: ${transaction.status}`,
    `fee: ${transaction.fee}`,
  ];
  if (Object.keys(transaction.mintedAssets).length > 0) {
    lines.push(`mint: ${formatAssets(transaction.mintedAssets, trace)}`);
  }
  if (Object.keys(transaction.burnedAssets).length > 0) {
    lines.push(`burn: ${formatAssets(transaction.burnedAssets, trace)}`);
  }
  const warningCount = trace.warnings.filter(
    (warning) => warning.txHash === transaction.hash,
  ).length;
  if (warningCount > 0) lines.push(`warnings: ${warningCount}`);
  return lines.join("\\n");
};

export const utxoLabel = (
  key: string,
  utxo: TraceUtxo,
  trace: TxGraphTrace,
): string => {
  if (utxo.resolution === "genesis") {
    const lines = ["genesis UTxO", key];
    if (Object.keys(utxo.assets).length > 0) {
      lines.push(formatAssets(utxo.assets, trace));
    }
    lines.push("external funding source");
    return lines.join("\\n");
  }

  const lines = [
    utxo.tags.length > 0 ? `[${utxo.tags.join(", ")}]` : key,
    formatAssets(utxo.assets, trace),
    addressName(utxo.address, trace),
  ];
  if (utxo.datum) {
    lines.push("inline datum");
  } else if (utxo.datumHash) {
    lines.push(`datum ${shortHash(utxo.datumHash)}`);
  }
  if (utxo.scriptRef) {
    lines.push(
      `script ref ${utxo.scriptRef.type}${
        utxo.scriptRef.hash ? ` ${shortHash(utxo.scriptRef.hash)}` : ""
      }`,
    );
  }
  if (utxo.resolution === "unresolved") {
    lines.push(`unresolved: ${utxo.unresolvedReason ?? "unknown"}`);
  }
  return lines.join("\\n");
};

export const externalNodeLabel = (
  nodeId: string,
  trace: TxGraphTrace,
): string => {
  if (nodeId.startsWith("asset:")) {
    return assetName(nodeId.slice("asset:".length), trace);
  }
  if (nodeId.startsWith("withdrawal:")) {
    return `withdrawal\\n${addressName(nodeId.slice("withdrawal:".length), trace)}`;
  }
  if (nodeId.startsWith("signer:")) {
    return `signer\\n${shortHash(nodeId.slice("signer:".length))}`;
  }
  if (nodeId.startsWith("collateral-return:")) {
    return `collateral return\\n${shortHash(
      nodeId.slice("collateral-return:".length),
    )}`;
  }
  if (nodeId.startsWith("certificate:")) {
    const { txHash, index } = parseIndexedNode(
      nodeId.slice("certificate:".length),
    );
    const certificate = trace.transactions
      .find((transaction) => transaction.hash === txHash)
      ?.certificates.find((candidate) => candidate.index === index);
    return certificate
      ? `certificate\\n${certificate.kindName}`
      : `certificate\\n${shortHash(txHash)}#${index}`;
  }
  return nodeId;
};

const ensureEndpointNode = (
  nodes: Map<string, RenderNode>,
  nodeId: string,
  trace: TxGraphTrace,
): void => {
  if (nodes.has(nodeId)) return;
  nodes.set(nodeId, {
    id: nodeId,
    kind: externalNodeKind(nodeId),
    label: externalNodeLabel(nodeId, trace),
  });
};

const externalNodeKind = (nodeId: string): RenderNodeKind => {
  if (nodeId.startsWith("asset:")) return "asset";
  if (nodeId.startsWith("withdrawal:")) return "withdrawal";
  if (nodeId.startsWith("certificate:")) return "certificate";
  if (nodeId.startsWith("signer:")) return "signer";
  if (nodeId.startsWith("collateral-return:")) return "collateralReturn";
  return "external";
};

const edgeSortKey = (edge: TraceEdge): string =>
  `${edge.from}\u0000${edge.kind}\u0000${edge.to}`;

const assetUnitSort = (left: string, right: string): number => {
  if (left === "lovelace") return -1;
  if (right === "lovelace") return 1;
  return left.localeCompare(right);
};

const parseIndexedNode = (
  value: string,
): {
  readonly txHash: string;
  readonly index: number;
} => {
  const separator = value.lastIndexOf("#");
  return {
    txHash: separator >= 0 ? value.slice(0, separator) : value,
    index: separator >= 0 ? Number(value.slice(separator + 1)) : 0,
  };
};
