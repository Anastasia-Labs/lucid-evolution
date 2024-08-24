/**
 * Blockfrost only supports Ogmios 5.6
 * All types defined below support Ogmio 5.6.
 * For more information, visit:
 * https://ogmios.dev/api/v5.6/
 */

interface PlutusV1 {
  "plutus:v1": string;
}
interface PlutusV2 {
  "plutus:v2": string;
}

type Script = PlutusV1 | PlutusV2;

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
