import type {
  TraceAliases,
  TraceOutRef,
  TraceRedeemer,
  TraceTransaction,
  TraceUtxo,
  TraceWarning,
  TxGraphTrace,
} from "../model.js";
import { CML } from "../core.js";
import { outRefKey } from "../resolve.js";
import { addressName, assetName, shortHash } from "./common.js";

export type VisualTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "accent";

export type VisualNodeKind =
  | "transaction"
  | "utxo"
  | "asset"
  | "signer"
  | "withdrawal"
  | "certificate"
  | "collateralReturn"
  | "diagnostic";

export type VisualEdgeKind =
  | "spend"
  | "read"
  | "collateral"
  | "produce"
  | "collateralReturn"
  | "mint"
  | "burn"
  | "withdraw"
  | "certify"
  | "sign"
  | "diagnostic"
  | "summary";

export type VisualPortSide = "left" | "right" | "top" | "bottom";

export type VisualField = {
  readonly id: string;
  readonly label: string;
  readonly rawLabel?: string;
  readonly value: string;
  readonly rawValue?: string;
  readonly tone?: VisualTone;
  readonly mono?: boolean;
};

export type VisualSection = {
  readonly id: string;
  readonly title: string;
  readonly rows: VisualField[];
  readonly collapsed?: boolean;
};

export type VisualChip = {
  readonly label: string;
  readonly tone?: VisualTone;
};

export type VisualPort = {
  readonly id: string;
  readonly nodeId: string;
  readonly side: VisualPortSide;
  readonly label: string;
  readonly edgeKind?: VisualEdgeKind;
};

export type VisualRawRef =
  | { readonly type: "transaction"; readonly txHash: string }
  | { readonly type: "utxo"; readonly outRef: TraceOutRef }
  | { readonly type: "assetPolicy"; readonly policyId: string }
  | { readonly type: "signer"; readonly keyHash: string }
  | { readonly type: "withdrawal"; readonly rewardAddress: string }
  | {
      readonly type: "certificate";
      readonly txHash: string;
      readonly index: number;
    }
  | { readonly type: "collateralReturn"; readonly txHash: string }
  | {
      readonly type: "diagnostic";
      readonly code: string;
      readonly count?: number;
      readonly group?: string;
    };

export type VisualNode = {
  readonly id: string;
  readonly kind: VisualNodeKind;
  readonly title: string;
  readonly subtitle?: string;
  readonly sections: VisualSection[];
  readonly ports: VisualPort[];
  readonly chips: VisualChip[];
  readonly severity?: "info" | "warning" | "error";
  readonly rawRef: VisualRawRef;
};

export type RedeemerKey = {
  readonly tag: TraceRedeemer["tag"];
  readonly index: string;
  readonly redeemerListIndex: number;
};

export type VisualAction = {
  readonly label: string;
  readonly intent?: string;
  readonly fields?: Record<string, string>;
  readonly source: "user" | "schema" | "constructor" | "generic";
  readonly confidence: "high" | "medium" | "fallback";
};

export type VisualEdgeTargetRef =
  | {
      readonly type: "input";
      readonly inputKind: "spend" | "read" | "collateral";
      readonly txHash: string;
      readonly index: number;
      readonly outRef: TraceOutRef;
    }
  | {
      readonly type: "output";
      readonly txHash: string;
      readonly index: number;
      readonly outRef: TraceOutRef;
    }
  | {
      readonly type: "assetPolicy";
      readonly txHash: string;
      readonly policyId: string;
      readonly policyIndex: number;
      readonly assets: Record<string, string>;
    }
  | {
      readonly type: "withdrawal";
      readonly txHash: string;
      readonly index: number;
      readonly rewardAddress: string;
    }
  | {
      readonly type: "certificate";
      readonly txHash: string;
      readonly index: number;
    }
  | {
      readonly type: "signer";
      readonly txHash: string;
      readonly keyHash: string;
    }
  | {
      readonly type: "collateralReturn";
      readonly txHash: string;
    }
  | {
      readonly type: "diagnostic";
      readonly txHash?: string;
      readonly code: string;
      readonly count?: number;
      readonly group?: string;
    };

export type VisualEdge = {
  readonly id: string;
  readonly kind: VisualEdgeKind;
  readonly from: string;
  readonly to: string;
  readonly fromPort?: string;
  readonly toPort?: string;
  readonly label: string;
  readonly action?: VisualAction;
  readonly redeemerKey?: RedeemerKey;
  readonly targetRef: VisualEdgeTargetRef;
  readonly severity?: "info" | "warning" | "error";
  readonly rawRef: VisualRawRef;
};

export type VisualDiagnostic = {
  readonly id: string;
  readonly severity: "warning" | "error";
  readonly code: string;
  readonly message: string;
  readonly txHash?: string;
  readonly outRef?: TraceOutRef;
  readonly redeemerKey?: RedeemerKey;
};

export type VisualLegendItem = {
  readonly kind: string;
  readonly label: string;
};

export type VisualLegend = {
  readonly nodes: VisualLegendItem[];
  readonly edges: VisualLegendItem[];
};

export type SemanticRenderGraph = {
  readonly version: 1;
  readonly nodes: VisualNode[];
  readonly edges: VisualEdge[];
  readonly diagnostics: VisualDiagnostic[];
  readonly legend: VisualLegend;
  readonly aliases: TraceAliases;
};

export type RedeemerDescriberContext = {
  readonly trace: TxGraphTrace;
  readonly transaction: TraceTransaction;
  readonly redeemer: TraceRedeemer;
  readonly target: VisualEdgeTargetRef;
  readonly edge: Omit<VisualEdge, "action">;
};

export type RedeemerDescriber = (
  context: RedeemerDescriberContext,
) => VisualAction | undefined;

export type RedeemerSelector = {
  readonly tag: TraceRedeemer["tag"];
  readonly index: number | string;
  readonly txHash?: string;
  readonly target?: (target: VisualEdgeTargetRef) => boolean;
};

export type ConstructorRedeemerSelector = RedeemerSelector & {
  readonly constructor: number;
};

export type SemanticRenderOptions = {
  readonly redeemers?: ReadonlyArray<RedeemerDescriber>;
};

export const buildSemanticRenderGraph = (
  trace: TxGraphTrace,
  options: SemanticRenderOptions = {},
): SemanticRenderGraph => {
  const nodes = new Map<string, VisualNode>();
  const edges: VisualEdge[] = [];
  const mappedRedeemers = new Set<string>();

  for (const [key, utxo] of Object.entries(trace.utxos).sort(
    ([left], [right]) => left.localeCompare(right),
  )) {
    nodes.set(utxoNodeId(utxo), utxoNode(key, utxo, trace));
  }

  for (const transaction of trace.transactions) {
    nodes.set(
      transactionNodeId(transaction.hash),
      transactionNode(transaction, trace),
    );
    addTransactionEdges(trace, transaction, nodes, edges, mappedRedeemers);
  }

  const diagnostics = [
    ...trace.warnings.map(visualDiagnostic),
    ...unmappedRedeemerDiagnostics(trace, mappedRedeemers),
  ];

  return {
    version: 1,
    nodes: [...nodes.values()].sort((left, right) =>
      left.id.localeCompare(right.id),
    ),
    edges: edges
      .map((edge) => applyAction(trace, edge, options.redeemers ?? []))
      .sort((left, right) => left.id.localeCompare(right.id)),
    diagnostics,
    legend: defaultLegend,
    aliases: trace.aliases,
  };
};

export const labelRedeemer =
  (
    selector: RedeemerSelector,
    label: string,
    intent?: string,
  ): RedeemerDescriber =>
  (context) => {
    if (!matchesRedeemer(selector, context)) return undefined;
    return {
      label,
      ...(intent ? { intent } : {}),
      source: "user",
      confidence: "high",
    };
  };

export const describeRedeemerByConstructor =
  (
    selector: ConstructorRedeemerSelector,
    label: string,
    intent?: string,
  ): RedeemerDescriber =>
  (context) => {
    const { redeemer } = context;
    if (!matchesRedeemer(selector, context)) return undefined;
    if (constructorOf(redeemer.data) !== selector.constructor) return undefined;
    return {
      label,
      ...(intent ? { intent } : {}),
      fields: { constructor: String(selector.constructor) },
      source: "constructor",
      confidence: "medium",
    };
  };

export const describeRedeemerWith =
  (describe: RedeemerDescriber): RedeemerDescriber =>
  (context) =>
    describe(context);

const addTransactionEdges = (
  trace: TxGraphTrace,
  transaction: TraceTransaction,
  nodes: Map<string, VisualNode>,
  edges: VisualEdge[],
  mappedRedeemers: Set<string>,
): void => {
  addInputEdges(
    trace,
    transaction,
    nodes,
    edges,
    mappedRedeemers,
    "spend",
    transaction.inputs,
  );
  addInputEdges(
    trace,
    transaction,
    nodes,
    edges,
    mappedRedeemers,
    "read",
    transaction.referenceInputs,
  );
  addInputEdges(
    trace,
    transaction,
    nodes,
    edges,
    mappedRedeemers,
    "collateral",
    transaction.collateralInputs,
  );
  addOutputEdges(transaction, edges);
  addAssetPolicyEdges(
    trace,
    transaction,
    nodes,
    edges,
    mappedRedeemers,
    "mint",
  );
  addAssetPolicyEdges(
    trace,
    transaction,
    nodes,
    edges,
    mappedRedeemers,
    "burn",
  );
  addWithdrawalEdges(trace, transaction, nodes, edges, mappedRedeemers);
  addCertificateEdges(transaction, nodes, edges, mappedRedeemers);
  addSignerEdges(transaction, nodes, edges);
  addCollateralReturnEdge(transaction, nodes, edges);
};

const addInputEdges = (
  trace: TxGraphTrace,
  transaction: TraceTransaction,
  nodes: Map<string, VisualNode>,
  edges: VisualEdge[],
  mappedRedeemers: Set<string>,
  kind: "spend" | "read" | "collateral",
  inputs: ReadonlyArray<TraceOutRef>,
): void => {
  inputs.forEach((outRef, index) => {
    const inputKey = outRefKey(outRef);
    const from = utxoNodeId(outRef);
    const to = transactionNodeId(transaction.hash);
    const redeemerKey =
      kind === "spend"
        ? redeemerKeyFor(transaction, "spend", index, mappedRedeemers)
        : undefined;
    ensureUtxoPlaceholder(trace, nodes, outRef);
    edges.push({
      id: `${to}:${kind}:${index}:${inputKey}`,
      kind,
      from,
      to,
      fromPort: utxoPortId(inputKey, "out"),
      toPort: transactionPortId(transaction.hash, kind, index),
      label: `${kind} #${index}`,
      ...(redeemerKey ? { redeemerKey } : {}),
      targetRef: {
        type: "input",
        inputKind: kind,
        txHash: transaction.hash,
        index,
        outRef,
      },
      rawRef: { type: "utxo", outRef },
    });
  });
};

const addOutputEdges = (
  transaction: TraceTransaction,
  edges: VisualEdge[],
): void => {
  transaction.outputs.forEach((output, index) => {
    const outputKey = outRefKey(output);
    edges.push({
      id: `${transactionNodeId(transaction.hash)}:produce:${index}`,
      kind: "produce",
      from: transactionNodeId(transaction.hash),
      to: utxoNodeId(output),
      fromPort: transactionPortId(transaction.hash, "produce", index),
      toPort: utxoPortId(outputKey, "in"),
      label: `output #${index}`,
      targetRef: {
        type: "output",
        txHash: transaction.hash,
        index,
        outRef: {
          txHash: output.txHash,
          outputIndex: output.outputIndex,
        },
      },
      rawRef: {
        type: "utxo",
        outRef: {
          txHash: output.txHash,
          outputIndex: output.outputIndex,
        },
      },
    });
  });
};

const addAssetPolicyEdges = (
  trace: TxGraphTrace,
  transaction: TraceTransaction,
  nodes: Map<string, VisualNode>,
  edges: VisualEdge[],
  mappedRedeemers: Set<string>,
  kind: "mint" | "burn",
): void => {
  const assets =
    kind === "mint" ? transaction.mintedAssets : transaction.burnedAssets;
  const byPolicy = assetsByPolicy(assets);
  const policyIds = sortedPolicyIds(transaction.mint);
  for (const [policyId, policyAssets] of Object.entries(byPolicy).sort(
    ([a], [b]) => a.localeCompare(b),
  )) {
    const policyIndex = policyIds.indexOf(policyId);
    const index = policyIndex >= 0 ? policyIndex : 0;
    const redeemerKey = redeemerKeyFor(
      transaction,
      "mint",
      index,
      mappedRedeemers,
    );
    const assetNode = assetPolicyNode(policyId, policyAssets, trace);
    nodes.set(
      assetNode.id,
      mergeAssetPolicyNode(nodes.get(assetNode.id), assetNode),
    );
    const edge: VisualEdge = {
      id: `${transactionNodeId(transaction.hash)}:${kind}:${index}:${policyId}`,
      kind,
      from:
        kind === "mint"
          ? transactionNodeId(transaction.hash)
          : assetPolicyNodeId(policyId),
      to:
        kind === "mint"
          ? assetPolicyNodeId(policyId)
          : transactionNodeId(transaction.hash),
      fromPort:
        kind === "mint"
          ? transactionPortId(transaction.hash, "mint", index)
          : assetPolicyPortId(policyId),
      toPort:
        kind === "mint"
          ? assetPolicyPortId(policyId)
          : transactionPortId(transaction.hash, "burn", index),
      label: `${kind} #${index}`,
      ...(redeemerKey ? { redeemerKey } : {}),
      targetRef: {
        type: "assetPolicy",
        txHash: transaction.hash,
        policyId,
        policyIndex: index,
        assets: policyAssets,
      },
      rawRef: { type: "assetPolicy", policyId },
    };
    edges.push(edge);
  }
};

const addWithdrawalEdges = (
  trace: TxGraphTrace,
  transaction: TraceTransaction,
  nodes: Map<string, VisualNode>,
  edges: VisualEdge[],
  mappedRedeemers: Set<string>,
): void => {
  transaction.withdrawals.forEach((withdrawal, index) => {
    const node = withdrawalNode(withdrawal.rewardAddress, trace);
    const redeemerKey = redeemerKeyFor(
      transaction,
      "withdraw",
      index,
      mappedRedeemers,
    );
    nodes.set(node.id, node);
    edges.push({
      id: `${transactionNodeId(transaction.hash)}:withdraw:${index}:${withdrawal.rewardAddress}`,
      kind: "withdraw",
      from: node.id,
      to: transactionNodeId(transaction.hash),
      fromPort: withdrawalPortId(withdrawal.rewardAddress),
      toPort: transactionPortId(transaction.hash, "withdraw", index),
      label: `withdraw #${index}`,
      ...(redeemerKey ? { redeemerKey } : {}),
      targetRef: {
        type: "withdrawal",
        txHash: transaction.hash,
        index,
        rewardAddress: withdrawal.rewardAddress,
      },
      rawRef: { type: "withdrawal", rewardAddress: withdrawal.rewardAddress },
    });
  });
};

const addCertificateEdges = (
  transaction: TraceTransaction,
  nodes: Map<string, VisualNode>,
  edges: VisualEdge[],
  mappedRedeemers: Set<string>,
): void => {
  transaction.certificates.forEach((certificate) => {
    const node = certificateNode(
      transaction.hash,
      certificate.index,
      certificate.kindName,
    );
    const redeemerKey = redeemerKeyFor(
      transaction,
      "publish",
      certificate.index,
      mappedRedeemers,
    );
    nodes.set(node.id, node);
    edges.push({
      id: `${transactionNodeId(transaction.hash)}:cert:${certificate.index}`,
      kind: "certify",
      from: transactionNodeId(transaction.hash),
      to: node.id,
      fromPort: transactionPortId(
        transaction.hash,
        "certify",
        certificate.index,
      ),
      toPort: certificatePortId(transaction.hash, certificate.index),
      label: `cert #${certificate.index}`,
      ...(redeemerKey ? { redeemerKey } : {}),
      targetRef: {
        type: "certificate",
        txHash: transaction.hash,
        index: certificate.index,
      },
      rawRef: {
        type: "certificate",
        txHash: transaction.hash,
        index: certificate.index,
      },
    });
  });
};

const addSignerEdges = (
  transaction: TraceTransaction,
  nodes: Map<string, VisualNode>,
  edges: VisualEdge[],
): void => {
  transaction.requiredSigners.forEach((keyHash, index) => {
    const node = signerNode(keyHash);
    nodes.set(node.id, node);
    edges.push({
      id: `${transactionNodeId(transaction.hash)}:signer:${keyHash}`,
      kind: "sign",
      from: node.id,
      to: transactionNodeId(transaction.hash),
      fromPort: signerPortId(keyHash),
      toPort: transactionPortId(transaction.hash, "sign", index),
      label: "requires signer",
      targetRef: {
        type: "signer",
        txHash: transaction.hash,
        keyHash,
      },
      rawRef: { type: "signer", keyHash },
    });
  });
};

const addCollateralReturnEdge = (
  transaction: TraceTransaction,
  nodes: Map<string, VisualNode>,
  edges: VisualEdge[],
): void => {
  if (!transaction.collateralReturn) return;
  const node = collateralReturnNode(transaction);
  nodes.set(node.id, node);
  edges.push({
    id: `${transactionNodeId(transaction.hash)}:collateral-return`,
    kind: "collateralReturn",
    from: transactionNodeId(transaction.hash),
    to: node.id,
    fromPort: transactionPortId(transaction.hash, "collateralReturn", 0),
    toPort: collateralReturnPortId(transaction.hash),
    label: "collateral return",
    targetRef: {
      type: "collateralReturn",
      txHash: transaction.hash,
    },
    rawRef: { type: "collateralReturn", txHash: transaction.hash },
  });
};

const transactionNode = (
  transaction: TraceTransaction,
  trace: TxGraphTrace,
): VisualNode => {
  const warningCount = trace.warnings.filter(
    (warning) => warning.txHash === transaction.hash,
  ).length;
  return {
    id: transactionNodeId(transaction.hash),
    kind: "transaction",
    title: transaction.label ?? `tx ${shortHash(transaction.hash)}`,
    subtitle: shortHash(transaction.hash),
    chips: [
      { label: transaction.status, tone: statusTone(transaction.status) },
      ...(warningCount > 0
        ? [{ label: `${warningCount} warnings`, tone: "warning" as const }]
        : []),
    ],
    sections: [
      section("facts", "Facts", [
        field("fee", "Fee", transaction.fee),
        field("size", "Size", `${transaction.sizeBytes} bytes`),
        ...(transaction.validityInterval.validFrom
          ? [
              field(
                "validFrom",
                "Valid from",
                transaction.validityInterval.validFrom,
              ),
            ]
          : []),
        ...(transaction.validityInterval.validTo
          ? [field("validTo", "Valid to", transaction.validityInterval.validTo)]
          : []),
      ]),
      section("inputs", "Inputs", [
        field("spend", "Spend", String(transaction.inputs.length)),
        field("read", "Read", String(transaction.referenceInputs.length)),
        field(
          "collateral",
          "Collateral",
          String(transaction.collateralInputs.length),
        ),
      ]),
      section("assets", "Assets", [
        field(
          "mint",
          "Mint policies",
          String(sortedPolicyIds(transaction.mintedAssets).length),
        ),
        field(
          "burn",
          "Burn policies",
          String(sortedPolicyIds(transaction.burnedAssets).length),
        ),
      ]),
      section("authority", "Authority", [
        field("signers", "Signers", String(transaction.requiredSigners.length)),
        field(
          "certificates",
          "Certificates",
          String(transaction.certificates.length),
        ),
        field(
          "withdrawals",
          "Withdrawals",
          String(transaction.withdrawals.length),
        ),
      ]),
      section("redeemers", "Redeemers", [
        field("redeemers", "Redeemers", String(transaction.redeemers.length)),
      ]),
    ],
    ports: transactionPorts(transaction),
    ...(transaction.status === "failed" ? { severity: "error" as const } : {}),
    rawRef: { type: "transaction", txHash: transaction.hash },
  };
};

const utxoNode = (
  key: string,
  utxo: TraceUtxo,
  trace: TxGraphTrace,
): VisualNode => {
  const title =
    utxo.resolution === "genesis"
      ? "genesis UTxO"
      : utxo.tags.length > 0
        ? utxo.tags.join(", ")
        : key;
  return {
    id: utxoNodeId(utxo),
    kind: "utxo",
    title,
    subtitle: key,
    chips: [
      {
        label: utxo.resolution,
        tone:
          utxo.resolution === "unresolved"
            ? "danger"
            : utxo.resolution === "genesis"
              ? "warning"
              : "success",
      },
      ...utxo.tags.map((tag) => ({ label: tag, tone: "neutral" as const })),
    ],
    sections: [
      section("owner", "Owner", [
        field(
          "address",
          "Address",
          addressName(utxo.address, trace),
          true,
          undefined,
          utxo.address,
        ),
      ]),
      section(
        "assets",
        "Assets",
        Object.entries(utxo.assets)
          .sort(([left], [right]) => assetSort(left, right))
          .map(([unit, amount]) =>
            field(
              `asset:${unit}`,
              assetName(unit, trace),
              amount,
              false,
              undefined,
              undefined,
              unit,
            ),
          ),
      ),
      section("state", "State", [
        ...(utxo.datum ? [field("datum", "Datum", "inline datum")] : []),
        ...(utxo.datumHash
          ? [
              field(
                "datumHash",
                "Datum hash",
                shortHash(utxo.datumHash),
                true,
                undefined,
                utxo.datumHash,
              ),
            ]
          : []),
        ...(utxo.scriptRef
          ? [
              field(
                "scriptRef",
                "Script ref",
                `${utxo.scriptRef.type}${
                  utxo.scriptRef.hash
                    ? ` ${shortHash(utxo.scriptRef.hash)}`
                    : ""
                }`,
                false,
                undefined,
                utxo.scriptRef.hash
                  ? `${utxo.scriptRef.type} ${utxo.scriptRef.hash}`
                  : utxo.scriptRef.type,
              ),
            ]
          : []),
        ...(utxo.unresolvedReason
          ? [
              field(
                "unresolved",
                "Unresolved",
                utxo.unresolvedReason,
                false,
                "danger",
              ),
            ]
          : []),
      ]),
    ],
    ports: [
      port(utxoPortId(key, "in"), utxoNodeId(utxo), "left", "in"),
      port(utxoPortId(key, "out"), utxoNodeId(utxo), "right", "out"),
    ],
    ...(utxo.resolution === "unresolved" ? { severity: "error" as const } : {}),
    rawRef: {
      type: "utxo",
      outRef: { txHash: utxo.txHash, outputIndex: utxo.outputIndex },
    },
  };
};

const assetPolicyNode = (
  policyId: string,
  assets: Record<string, string>,
  trace: TxGraphTrace,
): VisualNode => ({
  id: assetPolicyNodeId(policyId),
  kind: "asset",
  title: `policy ${shortHash(policyId, 6)}`,
  sections: [
    section(
      "assets",
      "Assets",
      Object.entries(assets)
        .sort(([left], [right]) => assetSort(left, right))
        .map(([unit]) =>
          field(
            `asset:${unit}`,
            "Asset",
            assetName(unit, trace),
            false,
            undefined,
            unit,
          ),
        ),
    ),
  ],
  ports: [
    port(
      assetPolicyPortId(policyId),
      assetPolicyNodeId(policyId),
      "left",
      "asset",
    ),
  ],
  chips: [{ label: shortHash(policyId, 6), tone: "accent" }],
  rawRef: { type: "assetPolicy", policyId },
});

const mergeAssetPolicyNode = (
  existing: VisualNode | undefined,
  next: VisualNode,
): VisualNode => {
  if (!existing) return next;
  const rows = new Map<string, VisualField>();
  for (const node of [existing, next]) {
    const assetRows = node.sections.find(
      (section) => section.id === "assets",
    )?.rows;
    for (const row of assetRows ?? []) {
      rows.set(row.id, row);
    }
  }
  return {
    ...existing,
    sections: [
      section(
        "assets",
        "Assets",
        [...rows.values()].sort((left, right) =>
          left.id.localeCompare(right.id),
        ),
      ),
    ],
  };
};

const withdrawalNode = (
  rewardAddress: string,
  trace: TxGraphTrace,
): VisualNode => ({
  id: withdrawalNodeId(rewardAddress),
  kind: "withdrawal",
  title: "withdrawal",
  subtitle: addressName(rewardAddress, trace),
  sections: [
    section("reward", "Reward address", [
      field(
        "address",
        "Address",
        addressName(rewardAddress, trace),
        true,
        undefined,
        rewardAddress,
      ),
    ]),
  ],
  ports: [
    port(
      withdrawalPortId(rewardAddress),
      withdrawalNodeId(rewardAddress),
      "right",
      "withdraw",
    ),
  ],
  chips: [],
  rawRef: { type: "withdrawal", rewardAddress },
});

const certificateNode = (
  txHash: string,
  index: number,
  kindName: string,
): VisualNode => ({
  id: certificateNodeId(txHash, index),
  kind: "certificate",
  title: kindName,
  subtitle: `certificate #${index}`,
  sections: [
    section("certificate", "Certificate", [field("kind", "Kind", kindName)]),
  ],
  ports: [
    port(
      certificatePortId(txHash, index),
      certificateNodeId(txHash, index),
      "left",
      "cert",
    ),
  ],
  chips: [],
  rawRef: { type: "certificate", txHash, index },
});

const signerNode = (keyHash: string): VisualNode => ({
  id: signerNodeId(keyHash),
  kind: "signer",
  title: "signer",
  subtitle: shortHash(keyHash),
  sections: [
    section("signer", "Signer", [
      field(
        "keyHash",
        "Key hash",
        shortHash(keyHash),
        true,
        undefined,
        keyHash,
      ),
    ]),
  ],
  ports: [port(signerPortId(keyHash), signerNodeId(keyHash), "right", "sign")],
  chips: [],
  rawRef: { type: "signer", keyHash },
});

const collateralReturnNode = (transaction: TraceTransaction): VisualNode => ({
  id: collateralReturnNodeId(transaction.hash),
  kind: "collateralReturn",
  title: "collateral return",
  subtitle: shortHash(transaction.hash),
  sections: [
    section("assets", "Assets", [
      ...Object.entries(transaction.collateralReturn?.assets ?? {})
        .sort(([left], [right]) => assetSort(left, right))
        .map(([unit, amount]) =>
          field(
            `asset:${unit}`,
            unit,
            amount,
            false,
            undefined,
            undefined,
            unit,
          ),
        ),
    ]),
  ],
  ports: [
    port(
      collateralReturnPortId(transaction.hash),
      collateralReturnNodeId(transaction.hash),
      "left",
      "collateral return",
    ),
  ],
  chips: [],
  rawRef: { type: "collateralReturn", txHash: transaction.hash },
});

const ensureUtxoPlaceholder = (
  trace: TxGraphTrace,
  nodes: Map<string, VisualNode>,
  outRef: TraceOutRef,
): void => {
  const id = utxoNodeId(outRef);
  if (nodes.has(id)) return;
  const key = outRefKey(outRef);
  nodes.set(
    id,
    utxoNode(
      key,
      {
        ...outRef,
        address: "unresolved",
        assets: {},
        resolution: "unresolved",
        unresolvedReason: "missing-from-trace",
        tags: [],
      },
      trace,
    ),
  );
};

const transactionPorts = (transaction: TraceTransaction): VisualPort[] => [
  ...transaction.inputs.map((_input, index) =>
    port(
      transactionPortId(transaction.hash, "spend", index),
      transactionNodeId(transaction.hash),
      "left",
      `spend #${index}`,
      "spend",
    ),
  ),
  ...transaction.referenceInputs.map((_input, index) =>
    port(
      transactionPortId(transaction.hash, "read", index),
      transactionNodeId(transaction.hash),
      "left",
      `read #${index}`,
      "read",
    ),
  ),
  ...transaction.collateralInputs.map((_input, index) =>
    port(
      transactionPortId(transaction.hash, "collateral", index),
      transactionNodeId(transaction.hash),
      "left",
      `collateral #${index}`,
      "collateral",
    ),
  ),
  ...transaction.outputs.map((_output, index) =>
    port(
      transactionPortId(transaction.hash, "produce", index),
      transactionNodeId(transaction.hash),
      "right",
      `output #${index}`,
      "produce",
    ),
  ),
  ...sortedPolicyIds(transaction.mintedAssets).map((policyId) => {
    const index = sortedPolicyIds(transaction.mint).indexOf(policyId);
    return port(
      transactionPortId(transaction.hash, "mint", index),
      transactionNodeId(transaction.hash),
      "bottom",
      `mint #${index}`,
      "mint",
    );
  }),
  ...sortedPolicyIds(transaction.burnedAssets).map((policyId) => {
    const index = sortedPolicyIds(transaction.mint).indexOf(policyId);
    return port(
      transactionPortId(transaction.hash, "burn", index),
      transactionNodeId(transaction.hash),
      "bottom",
      `burn #${index}`,
      "burn",
    );
  }),
  ...transaction.withdrawals.map((_withdrawal, index) =>
    port(
      transactionPortId(transaction.hash, "withdraw", index),
      transactionNodeId(transaction.hash),
      "left",
      `withdraw #${index}`,
      "withdraw",
    ),
  ),
  ...transaction.certificates.map((certificate) =>
    port(
      transactionPortId(transaction.hash, "certify", certificate.index),
      transactionNodeId(transaction.hash),
      "right",
      `cert #${certificate.index}`,
      "certify",
    ),
  ),
  ...transaction.requiredSigners.map((_signer, index) =>
    port(
      transactionPortId(transaction.hash, "sign", index),
      transactionNodeId(transaction.hash),
      "left",
      `signer #${index}`,
      "sign",
    ),
  ),
  ...(transaction.collateralReturn
    ? [
        port(
          transactionPortId(transaction.hash, "collateralReturn", 0),
          transactionNodeId(transaction.hash),
          "right",
          "collateral return",
          "collateralReturn",
        ),
      ]
    : []),
];

const redeemerKeyFor = (
  transaction: TraceTransaction,
  tag: TraceRedeemer["tag"],
  index: number,
  mappedRedeemers?: Set<string>,
): RedeemerKey | undefined => {
  const redeemer = transaction.redeemers.find(
    (candidate) => candidate.tag === tag && candidate.index === String(index),
  );
  if (!redeemer) return undefined;
  mappedRedeemers?.add(redeemerMapKey(transaction.hash, redeemer));
  return {
    tag: redeemer.tag,
    index: redeemer.index,
    redeemerListIndex: redeemer.redeemerListIndex,
  };
};

const applyAction = (
  trace: TxGraphTrace,
  edge: VisualEdge,
  describers: ReadonlyArray<RedeemerDescriber>,
): VisualEdge => {
  const context = redeemerContext(trace, edge);
  if (!context) return edge;
  for (const describer of describers) {
    const action = describer(context);
    if (action) {
      return { ...edge, action, label: action.label };
    }
  }
  const fallback = genericAction(context.redeemer);
  return {
    ...edge,
    action: fallback,
    label: fallback.label,
  };
};

const redeemerContext = (
  trace: TxGraphTrace,
  edge: VisualEdge,
): RedeemerDescriberContext | undefined => {
  if (!edge.redeemerKey) return undefined;
  const transaction = trace.transactions.find(
    (candidate) => candidate.hash === edge.targetRef.txHash,
  );
  const redeemer = transaction?.redeemers.find(
    (candidate) =>
      candidate.tag === edge.redeemerKey?.tag &&
      candidate.index === edge.redeemerKey.index &&
      candidate.redeemerListIndex === edge.redeemerKey.redeemerListIndex,
  );
  return transaction && redeemer
    ? {
        trace,
        transaction,
        redeemer,
        target: edge.targetRef,
        edge,
      }
    : undefined;
};

const genericAction = (redeemer: TraceRedeemer): VisualAction => ({
  label: `${redeemer.tag} #${redeemer.index}`,
  source: "generic",
  confidence: "fallback",
});

const matchesRedeemer = (
  selector: RedeemerSelector,
  { transaction, redeemer, target }: RedeemerDescriberContext,
): boolean =>
  redeemer.tag === selector.tag &&
  redeemer.index === String(selector.index) &&
  (!selector.txHash || transaction.hash === selector.txHash) &&
  (!selector.target || selector.target(target));

const constructorOf = (data: string): number | undefined => {
  try {
    const alternative = CML.PlutusData.from_cbor_hex(data)
      .as_constr_plutus_data()
      ?.alternative();
    if (alternative === undefined) return undefined;
    const value = Number(alternative);
    return Number.isSafeInteger(value) ? value : undefined;
  } catch {
    return undefined;
  }
};

const visualDiagnostic = (
  warning: TraceWarning,
  index: number,
): VisualDiagnostic => ({
  id: `diagnostic:${index}:${warning.code}`,
  severity: warning.code.includes("failed") ? "error" : "warning",
  code: warning.code,
  message: warning.message,
  ...(warning.txHash ? { txHash: warning.txHash } : {}),
  ...(warning.outRef ? { outRef: warning.outRef } : {}),
});

const unmappedRedeemerDiagnostics = (
  trace: TxGraphTrace,
  mappedRedeemers: ReadonlySet<string>,
): VisualDiagnostic[] =>
  trace.transactions.flatMap((transaction) =>
    transaction.redeemers
      .filter(
        (redeemer) =>
          !mappedRedeemers.has(redeemerMapKey(transaction.hash, redeemer)),
      )
      .map((redeemer) => ({
        id: `diagnostic:${transaction.hash}:unmapped-redeemer:${redeemer.tag}:${redeemer.index}`,
        severity: "warning" as const,
        code: "unmapped-redeemer",
        message: `Redeemer ${redeemer.tag} #${redeemer.index} in transaction ${transaction.hash} has no matching semantic edge`,
        txHash: transaction.hash,
        redeemerKey: {
          tag: redeemer.tag,
          index: redeemer.index,
          redeemerListIndex: redeemer.redeemerListIndex,
        },
      })),
  );

const redeemerMapKey = (
  txHash: string,
  redeemer: Pick<TraceRedeemer, "tag" | "index" | "redeemerListIndex">,
): string =>
  `${txHash}\u0000${redeemer.tag}\u0000${redeemer.index}\u0000${redeemer.redeemerListIndex}`;

const assetsByPolicy = (
  assets: Record<string, string>,
): Record<string, Record<string, string>> => {
  const result: Record<string, Record<string, string>> = {};
  for (const [unit, amount] of Object.entries(assets)) {
    const policyId = policyIdOfUnit(unit);
    result[policyId] = {
      ...(result[policyId] ?? {}),
      [unit]: amount,
    };
  }
  return result;
};

const sortedPolicyIds = (assets: Record<string, string>): string[] =>
  [...new Set(Object.keys(assets).map(policyIdOfUnit))].sort();

const policyIdOfUnit = (unit: string): string =>
  unit === "lovelace" ? "lovelace" : unit.slice(0, 56);

const section = (
  id: string,
  title: string,
  rows: ReadonlyArray<VisualField>,
): VisualSection => ({
  id,
  title,
  rows: [...rows],
  collapsed: rows.length === 0,
});

const field = (
  id: string,
  label: string,
  value: string,
  mono = false,
  tone?: VisualTone,
  rawValue?: string,
  rawLabel?: string,
): VisualField => ({
  id,
  label,
  ...(rawLabel ? { rawLabel } : {}),
  value,
  ...(rawValue ? { rawValue } : {}),
  ...(mono ? { mono } : {}),
  ...(tone ? { tone } : {}),
});

const port = (
  id: string,
  nodeId: string,
  side: VisualPortSide,
  label: string,
  edgeKind?: VisualEdgeKind,
): VisualPort => ({
  id,
  nodeId,
  side,
  label,
  ...(edgeKind ? { edgeKind } : {}),
});

const statusTone = (status: TraceTransaction["status"]): VisualTone => {
  switch (status) {
    case "submitted":
    case "confirmed":
      return "success";
    case "failed":
      return "danger";
    case "built":
    case "signed":
      return "info";
  }
};

const assetSort = (left: string, right: string): number => {
  if (left === "lovelace") return -1;
  if (right === "lovelace") return 1;
  return left.localeCompare(right);
};

const transactionNodeId = (txHash: string): string => `tx:${txHash}`;
const utxoNodeId = (outRef: TraceOutRef): string => `utxo:${outRefKey(outRef)}`;
const assetPolicyNodeId = (policyId: string): string =>
  `asset-policy:${policyId}`;
const signerNodeId = (keyHash: string): string => `signer:${keyHash}`;
const withdrawalNodeId = (rewardAddress: string): string =>
  `withdrawal:${rewardAddress}`;
const certificateNodeId = (txHash: string, index: number): string =>
  `certificate:${txHash}#${index}`;
const collateralReturnNodeId = (txHash: string): string =>
  `collateral-return:${txHash}`;

const transactionPortId = (
  txHash: string,
  kind: VisualEdgeKind,
  index: number,
): string => `tx:${txHash}:port:${kind}:${index}`;
const utxoPortId = (key: string, direction: "in" | "out"): string =>
  `utxo:${key}:port:${direction}`;
const assetPolicyPortId = (policyId: string): string =>
  `asset-policy:${policyId}:port`;
const signerPortId = (keyHash: string): string => `signer:${keyHash}:port`;
const withdrawalPortId = (rewardAddress: string): string =>
  `withdrawal:${rewardAddress}:port`;
const certificatePortId = (txHash: string, index: number): string =>
  `certificate:${txHash}#${index}:port`;
const collateralReturnPortId = (txHash: string): string =>
  `collateral-return:${txHash}:port`;

const defaultLegend: VisualLegend = {
  nodes: [
    { kind: "transaction", label: "Transaction" },
    { kind: "utxo", label: "UTxO" },
    { kind: "asset", label: "Asset policy" },
    { kind: "diagnostic", label: "Diagnostic" },
  ],
  edges: [
    { kind: "spend", label: "Spend input" },
    { kind: "read", label: "Reference input" },
    { kind: "collateral", label: "Collateral input" },
    { kind: "produce", label: "Produced output" },
    { kind: "mint", label: "Mint policy" },
    { kind: "burn", label: "Burn policy" },
    { kind: "withdraw", label: "Withdrawal" },
    { kind: "certify", label: "Certificate" },
    { kind: "sign", label: "Required signer" },
  ],
};
