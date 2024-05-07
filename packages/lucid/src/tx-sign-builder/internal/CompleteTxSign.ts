import { CML } from "../../core.js";
import { Wallet } from "@lucid-evolution/core-types";

export type TxSigned = {
  submit: () => Promise<string>;
  toCBOR: () => string;
  toHash: () => string;
};
export const completeTxSign = (wallet: Wallet, txSigned: CML.Transaction) => {
  return {
    //FIX: this can fail
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
