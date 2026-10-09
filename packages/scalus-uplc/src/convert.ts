import { Assets, RedeemerTag, UTxO } from "@lucid-evolution/core-types";
import { fromHex } from "@lucid-evolution/core-utils";
import type { Utxo, Value } from "scalus";

export type Scalus = typeof import("scalus");

/** Scalus names a redeemer's purpose as the ledger CDDL does; Lucid uses Ogmios' names. */
const SCALUS_TAGS: Record<string, RedeemerTag> = {
  Spend: "spend",
  Mint: "mint",
  Cert: "publish",
  Reward: "withdraw",
  Voting: "vote",
  Proposing: "propose",
};

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
export const toScalusUtxo = (scalus: Scalus, utxo: UTxO): Utxo => {
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
