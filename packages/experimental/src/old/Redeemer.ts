import * as UTXO from "./UTXO.js";

/** Hex (Redeemer is only PlutusData, same as Datum) */
export type Redeemer = string; // Plutus Data (same as Datum)
/** TODO docs  */
export type RedeemerBuilder =
  | {
      kind: "selected";
      makeRedeemer: (inputIndices: bigint[]) => Redeemer;
      inputs: UTXO.UTxO[];
    }
  | {
      kind: "self";
      makeRedeemer: (inputIndex: bigint) => Redeemer;
      inputs?: UTXO.UTxO[];
    };
