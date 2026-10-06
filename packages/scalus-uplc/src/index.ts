import {
  Assets,
  CostModels,
  EvalRedeemer,
  EvaluationBytesInput,
  EvaluationInput,
  EvaluatorAdapter,
  PlutusVersion,
  RedeemerTag,
  UTxO,
} from "@lucid-evolution/core-types";
import { fromHex } from "@lucid-evolution/core-utils";
import type { Utxo, Value } from "scalus";

type Scalus = typeof import("scalus");
let scalusModule: Promise<Scalus> | undefined;
// Loaded on first evaluation. Scalus is ESM-only, and `import()` reaches it from the CJS build on
// any Node version, where a top-level `require` would need Node 20.19 or 22.12.
const loadScalus = (): Promise<Scalus> => (scalusModule ??= import("scalus"));

export type ScalusEvaluatorOptions = {
  name?: string;
  /**
   * The ledger protocol version to cost against. Taken from the provider's protocol parameters
   * when they carry it, and 11 (van Rossem, what mainnet runs) otherwise.
   */
  protocolMajorVersion?: number;
};

/** Scalus names a redeemer's purpose as the ledger CDDL does; Lucid uses Ogmios' names. */
const SCALUS_TAGS: Record<string, RedeemerTag> = {
  Spend: "spend",
  Mint: "mint",
  Cert: "publish",
  Reward: "withdraw",
  Voting: "vote",
  Proposing: "propose",
};

const DEFAULT_PROTOCOL_MAJOR_VERSION = 11;

const toValue = ({ Asset, Value }: Scalus, assets: Assets): Value =>
  new Value(
    assets.lovelace ? BigInt(assets.lovelace) : 0n,
    Object.entries(assets)
      .filter(([unit]) => unit !== "lovelace")
      .map(
        ([unit, quantity]) =>
          new Asset(unit.slice(0, 56), unit.slice(56), BigInt(quantity)),
      ),
  );

/** The UTxO as a Scalus `Utxo`, which `evaluator.evaluateTx` takes without any CBOR. */
const toScalusUtxo = (scalus: Scalus, utxo: UTxO): Utxo => {
  let result = new scalus.Utxo(
    utxo.txHash,
    utxo.outputIndex,
    utxo.address,
    toValue(scalus, utxo.assets),
  );
  // A datum hash is what the output carries; `datum` is then only its resolved value.
  if (utxo.datumHash) result = result.withDatumHash(utxo.datumHash);
  else if (utxo.datum) result = result.withInlineDatum(fromHex(utxo.datum));
  if (utxo.scriptRef) result = result.withScriptRef(utxo.scriptRef);
  return result;
};

export const mapScalusTag = (tag: string): RedeemerTag => {
  const mapped = SCALUS_TAGS[tag];
  if (!mapped) throw new Error(`Unknown Scalus redeemer tag "${tag}"`);
  return mapped;
};

/** Whether two asset maps are equal in content and in key order. */
const sameAssets = (left: Assets, right: Assets): boolean => {
  const leftUnits = Object.keys(left);
  const rightUnits = Object.keys(right);
  return (
    leftUnits.length === rightUnits.length &&
    leftUnits.every(
      (unit, index) => unit === rightUnits[index] && left[unit] === right[unit],
    )
  );
};

/** Whether two UTxOs convert to the same Scalus `Utxo`. */
const sameUTxO = (left: UTxO, right: UTxO): boolean =>
  left.txHash === right.txHash &&
  left.outputIndex === right.outputIndex &&
  left.address === right.address &&
  (left.datumHash ?? undefined) === (right.datumHash ?? undefined) &&
  (left.datum ?? undefined) === (right.datum ?? undefined) &&
  (left.scriptRef ?? undefined)?.type ===
    (right.scriptRef ?? undefined)?.type &&
  (left.scriptRef ?? undefined)?.script ===
    (right.scriptRef ?? undefined)?.script &&
  sameAssets(left.assets, right.assets);

const cloneUTxO = (utxo: UTxO): UTxO => ({
  ...utxo,
  assets: { ...utxo.assets },
  scriptRef: utxo.scriptRef ? { ...utxo.scriptRef } : utxo.scriptRef,
});

const sameBytes = (left: Uint8Array, right: Uint8Array): boolean =>
  left.length === right.length &&
  left.every((byte, index) => byte === right[index]);

type CostModelsSnapshot = Partial<Record<PlutusVersion, readonly number[]>>;

const PLUTUS_VERSIONS: readonly PlutusVersion[] = [
  "PlutusV1",
  "PlutusV2",
  "PlutusV3",
];

const snapshotCostModels = (costModels: CostModels): CostModelsSnapshot =>
  Object.fromEntries(
    PLUTUS_VERSIONS.filter((version) => costModels[version]).map((version) => [
      version,
      [...costModels[version]],
    ]),
  );

const sameCostModels = (
  snapshot: CostModelsSnapshot,
  costModels: CostModels,
): boolean =>
  PLUTUS_VERSIONS.every((version) => {
    const left = snapshot[version];
    const right = costModels[version];
    if (!left || !right) return !left && !right;
    return (
      left.length === right.length &&
      left.every((value, index) => value === right[index])
    );
  });

type ScalusRequest = {
  tx: Uint8Array;
  utxos: readonly UTxO[];
  costModels: CostModelsSnapshot;
  zeroTime: number;
  zeroSlot: number;
  slotLength: number;
  protocolMajorVersion: number;
};

const cloneRedeemers = (redeemers: readonly EvalRedeemer[]): EvalRedeemer[] =>
  redeemers.map((redeemer) => ({
    ...redeemer,
    ex_units: { ...redeemer.ex_units },
  }));

/**
 * The Scalus evaluator. Like the built-in one, it remembers its last
 * successful request and returns that result again when the next request is
 * the same (transaction bytes, resolved UTxOs, cost models, slot
 * configuration and protocol version); evaluation is deterministic. Failures
 * are not remembered. It also keeps the Scalus `Utxo` of each resolved UTxO
 * of its latest request, since one completion evaluates the same inputs
 * repeatedly; those the latest request did not use are dropped.
 */
export const createScalusEvaluator = (
  options: ScalusEvaluatorOptions = {},
): EvaluatorAdapter => {
  let previous:
    | { request: ScalusRequest; redeemers: EvalRedeemer[] }
    | undefined;
  // Conversions used by the latest request, by out-ref.
  let converted = new Map<string, { utxo: UTxO; handle: Utxo }>();

  const toScalusUtxos = (
    scalus: Scalus,
    utxos: readonly UTxO[],
  ): { utxos: UTxO[]; handles: Utxo[] } => {
    const used = new Map<string, { utxo: UTxO; handle: Utxo }>();
    const entries = utxos.map((utxo) => {
      const key = `${utxo.txHash}#${utxo.outputIndex}`;
      const cached = converted.get(key);
      const entry =
        cached !== undefined && sameUTxO(cached.utxo, utxo)
          ? cached
          : { utxo: cloneUTxO(utxo), handle: toScalusUtxo(scalus, utxo) };
      used.set(key, entry);
      return entry;
    });
    converted = used;
    return {
      utxos: entries.map(({ utxo }) => utxo),
      handles: entries.map(({ handle }) => handle),
    };
  };

  const sameRequest = (
    request: ScalusRequest,
    { tx, additionalUTxOs, context }: EvaluationBytesInput,
    protocolMajorVersion: number,
  ): boolean =>
    sameBytes(request.tx, tx) &&
    request.utxos.length === additionalUTxOs.length &&
    request.utxos.every((utxo, index) =>
      sameUTxO(utxo, additionalUTxOs[index]),
    ) &&
    sameCostModels(request.costModels, context.protocolParameters.costModels) &&
    request.zeroTime === context.slotConfig.zeroTime &&
    request.zeroSlot === context.slotConfig.zeroSlot &&
    request.slotLength === context.slotConfig.slotLength &&
    request.protocolMajorVersion === protocolMajorVersion;

  const evaluateBytes = async (
    input: EvaluationBytesInput,
  ): Promise<EvalRedeemer[]> => {
    const { tx, additionalUTxOs, context } = input;
    const protocolMajorVersion =
      options.protocolMajorVersion ??
      context.protocolParameters.protocolMajorVersion ??
      DEFAULT_PROTOCOL_MAJOR_VERSION;
    if (previous && sameRequest(previous.request, input, protocolMajorVersion))
      return cloneRedeemers(previous.redeemers);
    previous = undefined;
    const scalus = await loadScalus();
    const { utxos, handles } = toScalusUtxos(scalus, additionalUTxOs);
    // A copy, so later changes to the caller's bytes cannot alter the key.
    const request: ScalusRequest = {
      tx: tx.slice(),
      utxos,
      costModels: snapshotCostModels(context.protocolParameters.costModels),
      zeroTime: context.slotConfig.zeroTime,
      zeroSlot: context.slotConfig.zeroSlot,
      slotLength: context.slotConfig.slotLength,
      protocolMajorVersion,
    };
    const redeemers = scalus.evaluator
      .evaluateTx(
        tx,
        handles,
        context.slotConfig,
        context.protocolParameters.costModels,
        protocolMajorVersion,
      )
      .map((redeemer) => ({
        redeemer_tag: mapScalusTag(redeemer.tag),
        redeemer_index: redeemer.index,
        ex_units: {
          mem: Number(redeemer.budget.memory),
          steps: Number(redeemer.budget.steps),
        },
      }));
    previous = { request, redeemers: cloneRedeemers(redeemers) };
    return redeemers;
  };

  const adapter: EvaluatorAdapter = {
    name: options.name ?? "scalus",
    evaluate: ({ tx, ...rest }: EvaluationInput) =>
      evaluateBytes({ ...rest, tx: fromHex(tx) }),
  };
  // Non-enumerable, as `EvaluatorAdapter.evaluateBytes` asks.
  Object.defineProperty(adapter, "evaluateBytes", { value: evaluateBytes });
  return adapter;
};
