import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { LucidConfig } from "../lucid-evolution/LucidEvolution.js";
import { Wallet } from "@lucid-evolution/core-types";

export type TxSigned = {
  submit: () => Promise<string>;
  toCBOR: () => string;
  toHash: () => string;
};
export const completeTxSign = (wallet: Wallet, txSigned: CML.Transaction) => {
  return {
    submit: () => {
      return wallet.submitTx(txSigned.to_cbor_hex());
    },
    toCBOR: () => {
      return txSigned.to_cbor_hex();
    },
    toHash: () => {
      return CML.hash_transaction(txSigned.body()).to_hex();
    },
  };
};
