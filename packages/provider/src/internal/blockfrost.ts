import { pipe, Record } from "effect";
import * as CoreType from "@evolution-sdk/core-types";
import { applySingleCborEncoding } from "@evolution-sdk/utils";

/**
 * Blockfrost only supports Ogmios 5.6
 * For more information, visit:
 * https://ogmios.dev/api/v5.6/
 */

interface PlutusV1 {
  "plutus:v1": string;
}
interface PlutusV2 {
  "plutus:v2": string;
}

interface PlutusV3 {
  "plutus:v3": string;
}

type Script = PlutusV1 | PlutusV2 | PlutusV3;

/**
 *
 * The POLICY_ID and ASSET_NAME are both encoded in base16 and are exactly 56 characters and at most 64 characters respectively.
 *
 *  Examples assets:
 * - "3542acb3a64d80c29302260d62c3b87a742ad14abf855ebc6733081e"
 * - "b5ae663aaea8e500157bdf4baafd6f5ba0ce5759f7cd4101fc132f54.706174617465"
 */
export type Value = {
  coins: number;
  assets?: Asset;
};
export type Asset = Record<string, number>;

export interface TxIn {
  txId: string;
  index: number;
}

export interface TxOut {
  address: string;
  value: Value;
  datumHash?: string | null;
  datum?:
    | {
        [k: string]: unknown;
      }
    | string
    | null;
  script?: Script | null;
}

export const toAditionalUTXOs = (
  utxos: CoreType.UTxO[] | undefined,
): [TxIn, TxOut][] =>
  (utxos || []).map((utxo) => [
    {
      txId: utxo.txHash,
      index: utxo.outputIndex,
    } satisfies TxIn,
    {
      address: utxo.address,
      value: {
        coins: Number(utxo.assets["lovelace"]),
        assets: fromAssets(utxo.assets),
      },
      datumHash: utxo.datumHash,
      datum: utxo.datum,
      script: toTxOutScript(utxo.scriptRef),
    } satisfies TxOut,
  ]);

export const toTxOutScript = (
  scriptRef: CoreType.UTxO["scriptRef"],
): TxOut["script"] => {
  if (scriptRef) {
    switch (scriptRef.type) {
      case "PlutusV1":
        return { "plutus:v1": applySingleCborEncoding(scriptRef.script) };
      case "PlutusV2":
        return { "plutus:v2": applySingleCborEncoding(scriptRef.script) };
      case "PlutusV3":
        return { "plutus:v3": applySingleCborEncoding(scriptRef.script) };
      default:
        return undefined;
    }
  }
};

export const fromAssets = (assets: CoreType.Assets) =>
  pipe(
    Record.remove(assets, "lovelace"),
    Record.mapEntries((amount, unit) => [
      unit.length === 56
        ? unit.slice(0, 56)
        : unit.slice(0, 56) + "." + unit.slice(56),
      Number(amount),
    ]),
    (r) => (Record.isEmptyRecord(r) ? undefined : r),
  );

export type LegacyRedeemerTag = "spend" | "mint" | "certificate" | "withdrawal";

export const fromLegacyRedeemerTag = (
  redeemerTag: LegacyRedeemerTag,
): CoreType.RedeemerTag => {
  switch (redeemerTag) {
    case "certificate":
      return "publish";
    case "withdrawal":
      return "withdraw";
    default:
      return redeemerTag;
  }
};
