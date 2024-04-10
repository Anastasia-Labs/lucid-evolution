import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";

export type TxSigned = {
  submit: () => Promise<string> | undefined;
  toCBOR: () => string;
  toHash: () => string;
};
export const completeTxSign = (
  lucidConfig: LucidConfig,
  txSigned: CML.Transaction,
) => {
  return {
    submit: () => {
      return lucidConfig.wallet?.submitTx(txSigned.to_cbor_hex());
    },
    toCBOR: () => {
      return txSigned.to_cbor_hex();
    },
    toHash: () => {
      return CML.hash_transaction(txSigned.body()).to_hex();
    },
  };
};
