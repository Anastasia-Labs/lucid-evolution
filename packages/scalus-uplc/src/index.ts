import {
  Assets,
  EvalRedeemer,
  EvaluationInput,
  EvaluatorAdapter,
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

export const createScalusEvaluator = (
  options: ScalusEvaluatorOptions = {},
): EvaluatorAdapter => ({
  name: options.name ?? "scalus",
  evaluate: async ({
    tx,
    additionalUTxOs,
    context,
  }: EvaluationInput): Promise<EvalRedeemer[]> => {
    const scalus = await loadScalus();
    return scalus.evaluator
      .evaluateTx(
        tx,
        additionalUTxOs.map((utxo) => toScalusUtxo(scalus, utxo)),
        context.slotConfig,
        context.protocolParameters.costModels,
        options.protocolMajorVersion ??
          context.protocolParameters.protocolMajorVersion ??
          DEFAULT_PROTOCOL_MAJOR_VERSION,
      )
      .map((redeemer) => ({
        redeemer_tag: mapScalusTag(redeemer.tag),
        redeemer_index: redeemer.index,
        ex_units: {
          mem: Number(redeemer.budget.memory),
          steps: Number(redeemer.budget.steps),
        },
      }));
  },
});
