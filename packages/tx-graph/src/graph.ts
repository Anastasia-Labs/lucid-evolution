import type { Provider, UTxO } from "@lucid-evolution/core-types";
import type { TxGraphTagger } from "./labels.js";
import type {
  TraceAliases,
  TraceEdge,
  TraceEdgeKind,
  TraceEvaluationRedeemer,
  TraceOutRef,
  TraceStatus,
  TraceTransaction,
  TraceUtxo,
  TraceWarning,
  TxGraphTrace,
} from "./model.js";
import {
  parseTransaction,
  type ParseTransactionOptions,
  type TxGraphTransactionInput,
} from "./parse.js";
import {
  createResolutionCache,
  outRefKey,
  type TxGraphResolutionProvider,
  type TxGraphUtxoResolver,
} from "./resolve.js";
import { traceToDot, type TraceToDotOptions } from "./render/dot.js";
import { traceToHtml, type TraceToHtmlOptions } from "./render/html.js";
import {
  traceToMermaid,
  type TraceToMermaidOptions,
} from "./render/mermaid.js";
import { traceToSvg, type TraceToSvgOptions } from "./render/svg.js";
import {
  buildSemanticRenderGraph,
  type SemanticRenderGraph,
  type SemanticRenderOptions,
} from "./render/semantic.js";
import {
  wrapProvider as wrapTxGraphProvider,
  type TxGraphProviderWrapperOptions,
} from "./provider-wrapper.js";

export type CreateTxGraphOptions = {
  readonly provider?: TxGraphResolutionProvider;
  readonly resolver?: TxGraphUtxoResolver;
  readonly labels?: ReadonlyArray<TxGraphTagger>;
  readonly assets?: Record<string, string>;
  readonly addresses?: Record<string, string>;
  readonly aliases?: Partial<TraceAliases>;
  readonly createdAt?: string;
};

export type TxGraphRecordOptions = ParseTransactionOptions & {
  readonly status?: TraceStatus;
  readonly failureMessage?: string;
  readonly evaluation?: ReadonlyArray<TraceEvaluationRedeemer>;
};

export type TxGraph = {
  record: (
    tx: TxGraphTransactionInput,
    options?: TxGraphRecordOptions,
  ) => Promise<TraceTransaction>;
  recordCbor: (
    cbor: string,
    options?: TxGraphRecordOptions,
  ) => Promise<TraceTransaction>;
  addResolvedUtxos: (utxos: ReadonlyArray<UTxO | TraceUtxo>) => void;
  resolveWith: (resolver: TxGraphUtxoResolver) => void;
  addWarning: (warning: TraceWarning) => void;
  wrapProvider: (
    provider: Provider,
    options?: TxGraphProviderWrapperOptions,
  ) => Provider;
  toJSON: () => TxGraphTrace;
  toSemantic: (options?: SemanticRenderOptions) => SemanticRenderGraph;
  toDot: (options?: TraceToDotOptions) => string;
  toHtml: (options?: TraceToHtmlOptions) => string;
  toMermaid: (options?: TraceToMermaidOptions) => string;
  toSvg: (options?: TraceToSvgOptions) => string;
};

export const createTxGraph = (options: CreateTxGraphOptions = {}): TxGraph => {
  const transactions: TraceTransaction[] = [];
  const preloadedUtxos: Array<UTxO | TraceUtxo> = [];
  let utxos = new Map<string, TraceUtxo>();
  let edges: TraceEdge[] = [];
  let warnings: TraceWarning[] = [];
  let spentBy = new Map<string, string>();
  let resolutionCache = createResolutionCache();
  const externalWarnings: TraceWarning[] = [];
  const resolvers: TxGraphUtxoResolver[] = options.resolver
    ? [options.resolver]
    : [];
  const aliases: TraceAliases = {
    assets: sortRecord({
      ...(options.aliases?.assets ?? {}),
      ...(options.assets ?? {}),
    }),
    addresses: sortRecord({
      ...(options.aliases?.addresses ?? {}),
      ...(options.addresses ?? {}),
    }),
  };
  const taggers = [...(options.labels ?? [])];

  const graph: TxGraph = {
    record: async (input, recordOptions = {}) => {
      const parsed = parseTransaction(input, recordOptions);
      const nextTransaction = withFailureMessage(parsed, recordOptions);
      const existingIndex = transactions.findIndex(
        (transaction) => transaction.hash === nextTransaction.hash,
      );
      const transaction =
        existingIndex >= 0
          ? mergeRecordedTransaction(
              transactions[existingIndex],
              nextTransaction,
            )
          : nextTransaction;

      if (existingIndex >= 0) {
        transactions[existingIndex] = transaction;
        await rebuildTrace();
      } else {
        transactions.push(transaction);
        await appendTransactionToTrace(transaction);
      }
      return jsonClone(transaction);
    },
    recordCbor: async (cbor, recordOptions = {}) =>
      graph.record(cbor, recordOptions),
    addResolvedUtxos: (resolvedUtxos) => {
      preloadedUtxos.push(...resolvedUtxos);
      resolutionCache.addResolvedUtxos(resolvedUtxos);
    },
    resolveWith: (resolver) => {
      resolvers.push(resolver);
    },
    addWarning: (warning) => {
      externalWarnings.push(jsonClone(warning));
    },
    wrapProvider: (provider, wrapperOptions = {}) =>
      wrapTxGraphProvider(provider, graph, wrapperOptions),
    toJSON: () => {
      const trace: TxGraphTrace = {
        version: 1,
        ...(options.createdAt ? { createdAt: options.createdAt } : {}),
        transactions: transactions.map(jsonClone),
        utxos: sortedUtxoRecord(utxos),
        edges: sortedEdges(edges),
        warnings: [...warnings, ...externalWarnings].map(jsonClone),
        aliases,
      };
      return jsonClone(trace);
    },
    toSemantic: (renderOptions = {}) =>
      buildSemanticRenderGraph(graph.toJSON(), renderOptions),
    toDot: (renderOptions = {}) => traceToDot(graph.toJSON(), renderOptions),
    toHtml: (renderOptions = {}) => traceToHtml(graph.toJSON(), renderOptions),
    toMermaid: (renderOptions = {}) =>
      traceToMermaid(graph.toJSON(), renderOptions),
    toSvg: (renderOptions = {}) => traceToSvg(graph.toJSON(), renderOptions),
  };

  const rebuildTrace = async (): Promise<void> => {
    utxos = new Map<string, TraceUtxo>();
    edges = [];
    warnings = [];
    spentBy = new Map<string, string>();
    resolutionCache = createResolutionCache();
    resolutionCache.addResolvedUtxos(preloadedUtxos);

    for (const transaction of transactions) {
      await appendTransactionToTrace(transaction);
    }
  };

  const appendTransactionToTrace = async (
    transaction: TraceTransaction,
  ): Promise<void> => {
    await resolveTransactionInputs(transaction);
    recordDoubleSpends(transaction);
    addProducedOutputs(transaction);
    addEdges(transaction);
    if (transaction.status === "failed") {
      warnings.push({
        code: "failed-transaction",
        message:
          transaction.failureMessage ??
          `Transaction ${transaction.hash} was recorded as failed`,
        txHash: transaction.hash,
      });
    }
  };

  const resolveTransactionInputs = async (
    transaction: TraceTransaction,
  ): Promise<void> => {
    const allInputs = [
      ...transaction.inputs,
      ...transaction.referenceInputs,
      ...transaction.collateralInputs,
    ];
    if (allInputs.length === 0) return;

    const resolution = await resolutionCache.resolveOutRefs(allInputs, {
      provider: options.provider,
      resolver: resolvers.length > 0 ? resolveWithUserResolvers : undefined,
    });
    for (const warning of resolution.warnings) {
      warnings.push({ ...warning, txHash: transaction.hash });
    }
    for (const utxo of resolution.utxos) {
      setInputUtxo(tagUtxo(utxo, "input", transaction));
    }

    const resolvedByKey = new Map(
      resolution.utxos.map((utxo) => [outRefKey(utxo), utxo] as const),
    );
    warnUnresolvedInputs(
      transaction,
      "spend",
      transaction.inputs,
      resolvedByKey,
    );
    warnUnresolvedInputs(
      transaction,
      "reference",
      transaction.referenceInputs,
      resolvedByKey,
    );
    warnUnresolvedInputs(
      transaction,
      "collateral",
      transaction.collateralInputs,
      resolvedByKey,
    );
  };

  const resolveWithUserResolvers: TxGraphUtxoResolver = async (outRefs) => {
    const resolved: Array<UTxO | TraceUtxo> = [];
    let missing = [...outRefs];
    for (const resolver of resolvers) {
      if (missing.length === 0) break;
      const resolverUtxos = await resolver(missing);
      resolved.push(...resolverUtxos);
      const resolvedKeys = new Set(resolverUtxos.map(outRefKey));
      missing = missing.filter(
        (outRef) => !resolvedKeys.has(outRefKey(outRef)),
      );
    }
    return resolved;
  };

  const addProducedOutputs = (transaction: TraceTransaction): void => {
    const outputs = transaction.outputs.map((utxo) =>
      tagUtxo(utxo, "output", transaction),
    );
    for (const utxo of outputs) {
      utxos.set(outRefKey(utxo), jsonClone(utxo));
    }
    if (transaction.status !== "failed") {
      resolutionCache.addTransactionOutputs({ outputs });
    }
    updateStoredTransactionOutputs(transaction.hash, outputs);
  };

  const recordDoubleSpends = (transaction: TraceTransaction): void => {
    if (transaction.status === "failed") return;
    const seenInTx = new Set<string>();
    for (const input of transaction.inputs) {
      const key = outRefKey(input);
      const previousTxHash = seenInTx.has(key)
        ? transaction.hash
        : spentBy.get(key);
      if (previousTxHash) {
        warnings.push({
          code: "duplicate-spend",
          message:
            previousTxHash === transaction.hash
              ? `Transaction ${transaction.hash} spends ${key} more than once`
              : `Transaction ${transaction.hash} spends ${key}, already spent by ${previousTxHash}`,
          txHash: transaction.hash,
          outRef: input,
        });
      }
      seenInTx.add(key);
      if (!spentBy.has(key)) spentBy.set(key, transaction.hash);
    }
  };

  const setInputUtxo = (utxo: TraceUtxo): void => {
    const key = outRefKey(utxo);
    const existing = utxos.get(key);
    if (
      existing?.resolution === "resolved" &&
      utxo.resolution === "unresolved"
    ) {
      return;
    }
    utxos.set(key, jsonClone(utxo));
  };

  const warnUnresolvedInputs = (
    transaction: TraceTransaction,
    kind: "spend" | "reference" | "collateral",
    inputs: ReadonlyArray<TraceOutRef>,
    resolvedByKey: ReadonlyMap<string, TraceUtxo>,
  ): void => {
    for (const input of inputs) {
      const resolved = resolvedByKey.get(outRefKey(input));
      if (resolved?.resolution !== "unresolved") continue;
      warnings.push({
        code: `unresolved-${kind}-input`,
        message: `Transaction ${transaction.hash} has unresolved ${kind} input ${outRefKey(input)} (${resolved.unresolvedReason ?? "unresolved"})`,
        txHash: transaction.hash,
        outRef: input,
      });
    }
  };

  const addEdges = (transaction: TraceTransaction): void => {
    addInputEdges("spends", transaction.inputs, transaction);
    addInputEdges("reads", transaction.referenceInputs, transaction);
    addInputEdges("collateral", transaction.collateralInputs, transaction);
    for (const output of transaction.outputs) {
      edges.push({
        kind: "produces",
        from: txNodeId(transaction.hash),
        to: utxoNodeId(output),
      });
    }
    if (transaction.collateralReturn) {
      edges.push({
        kind: "collateralReturn",
        from: txNodeId(transaction.hash),
        to: collateralReturnNodeId(transaction.hash),
      });
    }
    addAssetEdges("mints", transaction.hash, transaction.mintedAssets);
    addAssetEdges("burns", transaction.hash, transaction.burnedAssets);
    for (const withdrawal of transaction.withdrawals) {
      edges.push({
        kind: "withdraws",
        from: withdrawalNodeId(withdrawal.rewardAddress),
        to: txNodeId(transaction.hash),
      });
    }
    for (const certificate of transaction.certificates) {
      edges.push({
        kind: "certifies",
        from: txNodeId(transaction.hash),
        to: certificateNodeId(transaction.hash, certificate.index),
      });
    }
    for (const signer of transaction.requiredSigners) {
      edges.push({
        kind: "requiresSigner",
        from: signerNodeId(signer),
        to: txNodeId(transaction.hash),
      });
    }
  };

  const addInputEdges = (
    kind: Extract<TraceEdgeKind, "spends" | "reads" | "collateral">,
    inputs: ReadonlyArray<TraceOutRef>,
    transaction: TraceTransaction,
  ): void => {
    for (const input of inputs) {
      edges.push({
        kind,
        from: utxoNodeId(input),
        to: txNodeId(transaction.hash),
      });
    }
  };

  const addAssetEdges = (
    kind: Extract<TraceEdgeKind, "mints" | "burns">,
    txHash: string,
    assets: Record<string, string>,
  ): void => {
    for (const unit of Object.keys(assets).sort()) {
      edges.push(
        kind === "mints"
          ? {
              kind,
              from: txNodeId(txHash),
              to: assetNodeId(unit),
            }
          : {
              kind,
              from: assetNodeId(unit),
              to: txNodeId(txHash),
            },
      );
    }
  };

  const tagUtxo = (
    utxo: TraceUtxo,
    direction: "input" | "output",
    transaction: TraceTransaction,
  ): TraceUtxo => {
    if (taggers.length === 0) return utxo;
    const tags = new Set(utxo.tags);
    for (const tagger of taggers) {
      const nextTags = tagger({
        utxo,
        direction,
        transaction,
        graph: currentTrace(),
      });
      for (const tag of normalizeTags(nextTags)) {
        tags.add(tag);
      }
    }
    return {
      ...utxo,
      tags: [...tags].sort(),
    };
  };

  const updateStoredTransactionOutputs = (
    txHash: string,
    outputs: TraceUtxo[],
  ): void => {
    const index = transactions.findIndex(
      (transaction) => transaction.hash === txHash,
    );
    if (index >= 0) {
      transactions[index] = {
        ...transactions[index],
        outputs: outputs.map(jsonClone),
      };
    }
  };

  const currentTrace = (): TxGraphTrace => ({
    version: 1,
    ...(options.createdAt ? { createdAt: options.createdAt } : {}),
    transactions: transactions.map(jsonClone),
    utxos: sortedUtxoRecord(utxos),
    edges: sortedEdges(edges),
    warnings: [...warnings, ...externalWarnings].map(jsonClone),
    aliases,
  });

  return graph;
};

const withFailureMessage = (
  transaction: TraceTransaction,
  options: TxGraphRecordOptions,
): TraceTransaction => ({
  ...transaction,
  ...(options.failureMessage ? { failureMessage: options.failureMessage } : {}),
  ...(options.evaluation ? { evaluation: [...options.evaluation] } : {}),
});

const mergeRecordedTransaction = (
  existing: TraceTransaction,
  next: TraceTransaction,
): TraceTransaction => {
  const failureMessage =
    next.status === "failed"
      ? (next.failureMessage ?? existing.failureMessage)
      : undefined;
  const evaluation =
    next.evaluation ??
    (next.status === "failed" ? undefined : existing.evaluation);
  return {
    ...next,
    label: next.label ?? existing.label,
    ...(failureMessage !== undefined ? { failureMessage } : {}),
    ...(evaluation !== undefined ? { evaluation } : {}),
  };
};

const sortedUtxoRecord = (
  utxos: ReadonlyMap<string, TraceUtxo>,
): Record<string, TraceUtxo> => {
  const result: Record<string, TraceUtxo> = {};
  for (const key of [...utxos.keys()].sort()) {
    const utxo = utxos.get(key);
    if (utxo) result[key] = jsonClone(utxo);
  }
  return result;
};

const sortedEdges = (edges: ReadonlyArray<TraceEdge>): TraceEdge[] =>
  [...edges].sort((left, right) => {
    const leftKey = edgeSortKey(left);
    const rightKey = edgeSortKey(right);
    return leftKey.localeCompare(rightKey);
  });

const edgeSortKey = (edge: TraceEdge): string =>
  `${edge.from}\u0000${edge.kind}\u0000${edge.to}`;

const sortRecord = (record: Record<string, string>): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const key of Object.keys(record).sort()) {
    result[key] = record[key];
  }
  return result;
};

const normalizeTags = (
  tags: string | ReadonlyArray<string> | undefined,
): string[] => {
  if (!tags) return [];
  const values = Array.isArray(tags) ? tags : [tags];
  return values.map((tag) => tag.trim()).filter((tag) => tag.length > 0);
};

const jsonClone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const txNodeId = (txHash: string): string => `tx:${txHash}`;
const utxoNodeId = (outRef: TraceOutRef): string => `utxo:${outRefKey(outRef)}`;
const assetNodeId = (unit: string): string => `asset:${unit}`;
const withdrawalNodeId = (rewardAddress: string): string =>
  `withdrawal:${rewardAddress}`;
const certificateNodeId = (txHash: string, index: number): string =>
  `certificate:${txHash}#${index}`;
const signerNodeId = (keyHash: string): string => `signer:${keyHash}`;
const collateralReturnNodeId = (txHash: string): string =>
  `collateral-return:${txHash}`;
