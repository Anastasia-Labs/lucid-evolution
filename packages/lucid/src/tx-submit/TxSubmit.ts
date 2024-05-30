import { Effect } from "effect";
import { CML, makeReturn } from "../core.js";
import { Wallet } from "@lucid-evolution/core-types";
import { Either } from "effect/Either";
import { TxSubmitError } from "../Errors.js";

const submitError = (cause: string, message?: string) =>
  new TxSubmitError({ cause, module: "Submit", message });

export type TxSigned = {
  submit: () => Promise<string>;
  submitProgram: () => Effect.Effect<string, TxSubmitError, never>;
  submitSafe: () => Promise<Either<string, TxSubmitError>>;
  toCBOR: () => string;
  toHash: () => string;
};
export const makeSubmit = (
  wallet: Wallet,
  txSigned: CML.Transaction,
): TxSigned => {
  const submit = Effect.tryPromise({
    try: () => wallet.submitTx(txSigned.to_cbor_hex()),
    catch: (error) => submitError("SubmitError", String(error)),
  });
  return {
    submit: () => makeReturn(submit).unsafeRun(),
    submitProgram: () => makeReturn(submit).program(),
    submitSafe: () => makeReturn(submit).safeRun(),
    toCBOR: () => txSigned.to_cbor_hex(),
    toHash: () => CML.hash_transaction(txSigned.body()).to_hex(),
  };
};
