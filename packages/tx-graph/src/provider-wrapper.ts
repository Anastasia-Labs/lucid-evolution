import type {
  EvalRedeemer,
  Provider,
  Transaction,
  UTxO,
} from "@lucid-evolution/core-types";
import type { TxGraph } from "./graph.js";
import type { TraceEvaluationRedeemer, TraceWarning } from "./model.js";

export type TxGraphProviderWrapperOptions = {
  readonly submitLabel?: string;
  readonly evaluateLabel?: string;
  readonly recordEvaluate?: boolean;
};

export const wrapProvider = (
  provider: Provider,
  graph: TxGraph,
  options: TxGraphProviderWrapperOptions = {},
): Provider => {
  graph.resolveWith((outRefs) => provider.getUtxosByOutRef(outRefs));

  return new Proxy(provider, {
    get(target, property, receiver) {
      if (property === "submitTx") {
        return (tx: Transaction) => submitTx(target, graph, tx, options);
      }
      if (property === "evaluateTx") {
        return (tx: Transaction, additionalUTxOs?: UTxO[]) =>
          evaluateTx(target, graph, tx, additionalUTxOs, options);
      }
      const value = Reflect.get(target, property, receiver);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
};

const submitTx = async (
  provider: Provider,
  graph: TxGraph,
  tx: Transaction,
  options: TxGraphProviderWrapperOptions,
): Promise<string> => {
  const parsed = await graph.record(tx, {
    label: options.submitLabel,
    status: "signed",
  });

  try {
    const txHash = await provider.submitTx(tx);
    await recordSubmitted(graph, tx, options.submitLabel, parsed.hash);
    if (txHash !== parsed.hash) {
      graph.addWarning({
        code: "provider-tx-hash-mismatch",
        message: `Provider returned transaction hash ${txHash}, but the submitted body hashes to ${parsed.hash}`,
        txHash: parsed.hash,
      });
    }
    return txHash;
  } catch (error) {
    await recordFailed(graph, tx, options.submitLabel, error);
    throw error;
  }
};

const evaluateTx = async (
  provider: Provider,
  graph: TxGraph,
  tx: Transaction,
  additionalUTxOs: UTxO[] | undefined,
  options: TxGraphProviderWrapperOptions,
): Promise<EvalRedeemer[]> => {
  if (options.recordEvaluate === false) {
    return provider.evaluateTx(tx, additionalUTxOs);
  }

  if (additionalUTxOs && additionalUTxOs.length > 0) {
    graph.addResolvedUtxos(additionalUTxOs);
  }
  await graph.record(tx, {
    label: options.evaluateLabel,
    status: "built",
  });

  try {
    const evaluation = await provider.evaluateTx(tx, additionalUTxOs);
    await recordEvaluation(graph, tx, options.evaluateLabel, evaluation);
    return evaluation;
  } catch (error) {
    await recordFailed(graph, tx, options.evaluateLabel, error);
    throw error;
  }
};

const recordSubmitted = async (
  graph: TxGraph,
  tx: Transaction,
  label: string | undefined,
  txHash: string,
): Promise<void> => {
  try {
    await graph.record(tx, { label, status: "submitted" });
  } catch (error) {
    graph.addWarning(
      traceRecordWarning("trace-submit-record-error", txHash, error),
    );
  }
};

const recordEvaluation = async (
  graph: TxGraph,
  tx: Transaction,
  label: string | undefined,
  evaluation: ReadonlyArray<EvalRedeemer>,
): Promise<void> => {
  try {
    await graph.record(tx, {
      label,
      status: "built",
      evaluation: evaluation.map(traceEvaluationRedeemer),
    });
  } catch (error) {
    graph.addWarning(
      traceRecordWarning("trace-evaluate-record-error", undefined, error),
    );
  }
};

const recordFailed = async (
  graph: TxGraph,
  tx: Transaction,
  label: string | undefined,
  error: unknown,
): Promise<void> => {
  try {
    await graph.record(tx, {
      label,
      status: "failed",
      failureMessage: errorMessage(error),
    });
  } catch {
    // Preserve the provider's original error.
  }
};

const traceEvaluationRedeemer = (
  redeemer: EvalRedeemer,
): TraceEvaluationRedeemer => ({
  tag: redeemer.redeemer_tag,
  redeemerIndex: redeemer.redeemer_index,
  exUnits: {
    mem: redeemer.ex_units.mem.toString(),
    steps: redeemer.ex_units.steps.toString(),
  },
});

const traceRecordWarning = (
  code: string,
  txHash: string | undefined,
  error: unknown,
): TraceWarning => ({
  code,
  message: errorMessage(error),
  ...(txHash ? { txHash } : {}),
});

const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);
