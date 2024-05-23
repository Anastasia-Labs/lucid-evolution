import { Effect } from "effect";
import { CML, makeReturn } from "../../core.js";
import { Wallet } from "@lucid-evolution/core-types";
import { UnknownException } from "effect/Cause";
import { Either } from "effect/Either";

export type TxSigned = {
  submit: () => Promise<string>;
  submitProgram: () => Effect.Effect<string, UnknownException, never>;
  submitSafe: () => Promise<Either<string, UnknownException>>;
  toCBOR: () => string;
  toHash: () => string;
};
export const completeTxSign = (
  wallet: Wallet,
  txSigned: CML.Transaction,
): TxSigned => {
  return {
    //FIX: this can fail
    submit: () =>
      makeReturn(
        Effect.tryPromise(() => wallet.submitTx(txSigned.to_cbor_hex())),
      ).unsafeRun(),
    submitProgram: () =>
      makeReturn(
        Effect.tryPromise(() => wallet.submitTx(txSigned.to_cbor_hex())),
      ).program(),
    submitSafe: () =>
      makeReturn(
        Effect.tryPromise(() => wallet.submitTx(txSigned.to_cbor_hex())),
      ).safeRun(),
    toCBOR: () => {
      return txSigned.to_cbor_hex();
    },
    toHash: () => {
      return CML.hash_transaction(txSigned.body()).to_hex();
    },
  };
};
