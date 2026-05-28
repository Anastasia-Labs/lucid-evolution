import type {
  Assets,
  Credential,
  OutRef,
  Provider,
  Script,
  TxOutput,
  UTxO,
} from "@lucid-evolution/core-types";
import { getAddressDetails } from "@lucid-evolution/utils";
import { CML } from "./core.js";
import type {
  TraceAssets,
  TraceOutRef,
  TraceScriptRef,
  TraceTransaction,
  TraceTxOutput,
  TraceUtxo,
  TraceWarning,
} from "./model.js";

export type TxGraphResolutionProvider = Pick<Provider, "getUtxosByOutRef">;

export type TxGraphUtxoResolver = (
  outRefs: TraceOutRef[],
) => Promise<ReadonlyArray<UTxO | TraceUtxo>> | ReadonlyArray<UTxO | TraceUtxo>;

export type TxGraphResolutionSource =
  | "scenario-cache"
  | "provider"
  | "known-utxos"
  | "resolver"
  | "genesis"
  | "unresolved";

export type ResolveOutRefsOptions = {
  readonly provider?: TxGraphResolutionProvider;
  readonly resolver?: TxGraphUtxoResolver;
};

export type ResolveOutRefsResult = {
  readonly utxos: TraceUtxo[];
  readonly sources: Record<string, TxGraphResolutionSource>;
  readonly warnings: TraceWarning[];
};

export type TxGraphResolutionCache = {
  addProducedUtxos: (utxos: ReadonlyArray<TraceUtxo>) => void;
  addTransactionOutputs: (
    transaction: Pick<TraceTransaction, "outputs">,
  ) => void;
  addResolvedUtxos: (utxos: ReadonlyArray<UTxO | TraceUtxo>) => void;
  getProducedUtxo: (outRef: TraceOutRef) => TraceUtxo | undefined;
  getKnownUtxo: (outRef: TraceOutRef) => TraceUtxo | undefined;
  resolveOutRefs: (
    outRefs: ReadonlyArray<TraceOutRef>,
    options?: ResolveOutRefsOptions,
  ) => Promise<ResolveOutRefsResult>;
};

export const createResolutionCache = (): TxGraphResolutionCache => {
  const producedUtxos = new Map<string, TraceUtxo>();
  const knownUtxos = new Map<string, TraceUtxo>();

  const addProducedUtxos = (utxos: ReadonlyArray<TraceUtxo>): void => {
    for (const utxo of utxos) {
      producedUtxos.set(outRefKey(utxo), normalizeTraceUtxo(utxo));
    }
  };

  const addResolvedUtxos = (utxos: ReadonlyArray<UTxO | TraceUtxo>): void => {
    for (const utxo of utxos) {
      const traceUtxo = normalizeResolvedUtxo(utxo);
      knownUtxos.set(outRefKey(traceUtxo), traceUtxo);
    }
  };

  return {
    addProducedUtxos,
    addTransactionOutputs: (transaction) =>
      addProducedUtxos(producedUtxosFromTransaction(transaction)),
    addResolvedUtxos,
    getProducedUtxo: (outRef) => producedUtxos.get(outRefKey(outRef)),
    getKnownUtxo: (outRef) => knownUtxos.get(outRefKey(outRef)),
    resolveOutRefs: (outRefs, options = {}) =>
      resolveOutRefs(outRefs, {
        ...options,
        producedUtxos,
        knownUtxos,
      }),
  };
};

export const outRefKey = (outRef: TraceOutRef): string =>
  `${outRef.txHash}#${outRef.outputIndex}`;

export const parseOutRefKey = (key: string): TraceOutRef => {
  const separator = key.lastIndexOf("#");
  if (separator < 1) throw new Error(`Invalid out ref key: ${key}`);
  const outputIndex = Number(key.slice(separator + 1));
  if (!Number.isInteger(outputIndex) || outputIndex < 0) {
    throw new Error(`Invalid out ref key: ${key}`);
  }
  return {
    txHash: key.slice(0, separator),
    outputIndex,
  };
};

export const producedUtxosFromTransaction = (
  transaction: Pick<TraceTransaction, "outputs">,
): TraceUtxo[] => transaction.outputs.map((utxo) => normalizeTraceUtxo(utxo));

export const toTraceUtxo = (
  utxo: UTxO,
  options: {
    readonly tags?: ReadonlyArray<string>;
    readonly resolution?: TraceUtxo["resolution"];
    readonly unresolvedReason?: string;
  } = {},
): TraceUtxo => ({
  txHash: utxo.txHash,
  outputIndex: utxo.outputIndex,
  ...toTraceTxOutput(utxo),
  resolution: options.resolution ?? "resolved",
  unresolvedReason: options.unresolvedReason,
  tags: [...(options.tags ?? [])],
});

export const toTraceTxOutput = (output: TxOutput): TraceTxOutput => {
  const credentials = credentialsOf(output.address);
  return {
    address: output.address,
    paymentCredential: credentials.paymentCredential,
    stakeCredential: credentials.stakeCredential,
    assets: traceAssets(output.assets),
    datumHash: output.datumHash ?? undefined,
    datum: output.datum ?? undefined,
    scriptRef: output.scriptRef ? traceScriptRef(output.scriptRef) : undefined,
  };
};

export const unresolvedUtxo = (
  outRef: TraceOutRef,
  reason: string,
): TraceUtxo => ({
  txHash: outRef.txHash,
  outputIndex: outRef.outputIndex,
  address: "unresolved",
  assets: {},
  resolution: "unresolved",
  unresolvedReason: reason,
  tags: [],
});

export const genesisUtxo = (outRef: TraceOutRef): TraceUtxo => ({
  txHash: outRef.txHash,
  outputIndex: outRef.outputIndex,
  address: "genesis",
  assets: {},
  resolution: "genesis",
  tags: ["genesis"],
});

type ResolveOutRefsInternalOptions = ResolveOutRefsOptions & {
  readonly producedUtxos?: ReadonlyMap<string, TraceUtxo>;
  readonly knownUtxos?: ReadonlyMap<string, TraceUtxo>;
};

const resolveOutRefs = async (
  outRefs: ReadonlyArray<TraceOutRef>,
  options: ResolveOutRefsInternalOptions,
): Promise<ResolveOutRefsResult> => {
  const requested = uniqueOutRefs(outRefs);
  const requestedKeys = new Set(requested.map(outRefKey));
  const resolved = new Map<string, TraceUtxo>();
  const sources: Record<string, TxGraphResolutionSource> = {};
  const missReasons = new Map<string, string>();
  const warnings: TraceWarning[] = [];

  const recordResolved = (
    utxo: UTxO | TraceUtxo,
    source: TxGraphResolutionSource,
  ): void => {
    const traceUtxo =
      source === "genesis"
        ? normalizeGenesisUtxo(utxo)
        : normalizeResolvedUtxo(utxo);
    const key = outRefKey(traceUtxo);
    if (!requestedKeys.has(key) || resolved.has(key)) return;
    resolved.set(key, traceUtxo);
    sources[key] = source;
    missReasons.delete(key);
  };

  for (const outRef of requested) {
    if (!isGenesisOutRef(outRef)) continue;
    const knownGenesisUtxo = options.knownUtxos?.get(outRefKey(outRef));
    recordResolved(knownGenesisUtxo ?? genesisUtxo(outRef), "genesis");
  }

  for (const outRef of requested) {
    const utxo = options.producedUtxos?.get(outRefKey(outRef));
    if (utxo) recordResolved(utxo, "scenario-cache");
  }

  let missing = unresolvedOutRefs(requested, resolved);
  if (missing.length > 0) {
    if (options.provider) {
      try {
        const providerUtxos = await options.provider.getUtxosByOutRef(
          missing.map(toProviderOutRef),
        );
        for (const utxo of providerUtxos) {
          recordResolved(utxo, "provider");
        }
        for (const outRef of unresolvedOutRefs(missing, resolved)) {
          missReasons.set(outRefKey(outRef), "provider-miss");
        }
      } catch (error) {
        const message = errorMessage(error);
        warnings.push({
          code: "provider-resolution-error",
          message,
        });
        for (const outRef of missing) {
          missReasons.set(outRefKey(outRef), "provider-error");
        }
      }
    } else {
      for (const outRef of missing) {
        missReasons.set(outRefKey(outRef), "missing-provider");
      }
    }
  }

  missing = unresolvedOutRefs(requested, resolved);
  for (const outRef of missing) {
    const utxo = options.knownUtxos?.get(outRefKey(outRef));
    if (utxo) recordResolved(utxo, "known-utxos");
  }

  missing = unresolvedOutRefs(requested, resolved);
  if (missing.length > 0 && options.resolver) {
    try {
      const resolverUtxos = await options.resolver([...missing]);
      for (const utxo of resolverUtxos) {
        recordResolved(utxo, "resolver");
      }
      for (const outRef of unresolvedOutRefs(missing, resolved)) {
        missReasons.set(outRefKey(outRef), "resolver-miss");
      }
    } catch (error) {
      const message = errorMessage(error);
      warnings.push({
        code: "resolver-resolution-error",
        message,
      });
      for (const outRef of missing) {
        missReasons.set(outRefKey(outRef), "resolver-error");
      }
    }
  }

  const utxos = outRefs.map((outRef) => {
    const key = outRefKey(outRef);
    const utxo = resolved.get(key);
    if (utxo) return utxo;
    sources[key] = "unresolved";
    return unresolvedUtxo(outRef, missReasons.get(key) ?? "unresolved");
  });

  return { utxos, sources, warnings };
};

const uniqueOutRefs = (outRefs: ReadonlyArray<TraceOutRef>): TraceOutRef[] => {
  const seen = new Set<string>();
  const result: TraceOutRef[] = [];
  for (const outRef of outRefs) {
    const key = outRefKey(outRef);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(outRef);
  }
  return result;
};

const unresolvedOutRefs = (
  outRefs: ReadonlyArray<TraceOutRef>,
  resolved: ReadonlyMap<string, TraceUtxo>,
): TraceOutRef[] =>
  outRefs.filter((outRef) => !resolved.has(outRefKey(outRef)));

const toProviderOutRef = (outRef: TraceOutRef): OutRef => ({
  txHash: outRef.txHash,
  outputIndex: outRef.outputIndex,
});

const isGenesisOutRef = (outRef: TraceOutRef): boolean =>
  /^0{64}$/.test(outRef.txHash);

const normalizeResolvedUtxo = (utxo: UTxO | TraceUtxo): TraceUtxo => {
  const traceUtxo = isTraceUtxo(utxo)
    ? normalizeTraceUtxo({ ...utxo, resolution: "resolved" })
    : toTraceUtxo(utxo);
  return isGenesisOutRef(traceUtxo)
    ? normalizeGenesisUtxo(traceUtxo)
    : traceUtxo;
};

const normalizeGenesisUtxo = (utxo: UTxO | TraceUtxo): TraceUtxo => {
  const traceUtxo = isTraceUtxo(utxo)
    ? normalizeTraceUtxo(utxo)
    : toTraceUtxo(utxo);
  return normalizeTraceUtxo({
    ...traceUtxo,
    resolution: "genesis",
    unresolvedReason: undefined,
    tags: [...new Set(["genesis", ...traceUtxo.tags])],
  });
};

const normalizeTraceUtxo = (utxo: TraceUtxo): TraceUtxo => ({
  ...utxo,
  assets: sortedTraceAssets(utxo.assets),
  tags: [...utxo.tags].sort(),
});

const isTraceUtxo = (utxo: UTxO | TraceUtxo): utxo is TraceUtxo =>
  "resolution" in utxo && "tags" in utxo;

const credentialsOf = (
  address: string,
): {
  paymentCredential?: Credential;
  stakeCredential?: Credential;
} => {
  try {
    const { paymentCredential, stakeCredential } = getAddressDetails(address);
    return {
      paymentCredential: paymentCredential ?? undefined,
      stakeCredential: stakeCredential ?? undefined,
    };
  } catch {
    return {};
  }
};

const traceAssets = (assets: Assets): TraceAssets => {
  const result: TraceAssets = {};
  for (const unit of Object.keys(assets).sort()) {
    result[unit] = assets[unit].toString();
  }
  return result;
};

const sortedTraceAssets = (assets: TraceAssets): TraceAssets => {
  const result: TraceAssets = {};
  for (const unit of Object.keys(assets).sort()) {
    result[unit] = assets[unit];
  }
  return result;
};

const traceScriptRef = (script: Script): TraceScriptRef => ({
  type: script.type,
  hash: scriptHash(script),
  sizeBytes: script.script.length / 2,
});

const scriptHash = (script: Script): string | undefined => {
  try {
    switch (script.type) {
      case "Native":
        return CML.NativeScript.from_cbor_hex(script.script).hash().to_hex();
      case "PlutusV1":
        return CML.PlutusScript.from_v1(
          CML.PlutusV1Script.from_cbor_hex(script.script),
        )
          .hash()
          .to_hex();
      case "PlutusV2":
        return CML.PlutusScript.from_v2(
          CML.PlutusV2Script.from_cbor_hex(script.script),
        )
          .hash()
          .to_hex();
      case "PlutusV3":
        return CML.PlutusScript.from_v3(
          CML.PlutusV3Script.from_cbor_hex(script.script),
        )
          .hash()
          .to_hex();
    }
  } catch {
    return undefined;
  }
};

const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);
