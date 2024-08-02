import { Effect } from "effect";
import * as S from "@effect/schema/Schema";
import { CML, makeReturn } from "../core.js";
import { Wallet } from "@lucid-evolution/core-types";
import { Either } from "effect/Either";
import { TxSubmitError } from "../Errors.js";
import { CBORHex, Hash } from "../tx-builder/types.js";

export interface TxSigned {
  /** Submits the transaction and returns the transaction hash. */
  submit: () => Promise<string>;
  /** Submits the transaction and returns the transaction hash or error as an effect. */
  submitProgram: () => Effect.Effect<string, TxSubmitError, never>;
  /** Safely submits the transaction, returning the transaction hash or an error as promise either type. */
  submitSafe: () => Promise<Either<string, TxSubmitError>>;
  /** Converts the transaction (transaction body and witnesses) to CBOR format. */
  toCBOR: () => CBORHex;
  /** Converts the transaction (transaction body and witnesses) to JSON format. */
  toJSON: () => object;
  /** Computes the hash of the transaction. */
  toHash: () => Hash;
}
export const makeSubmit = (
  wallet: Wallet,
  txSigned: CML.Transaction,
): TxSigned => {
  const submit = Effect.tryPromise({
    try: () => wallet.submitTx(txSigned.to_cbor_hex()),
    catch: (cause) => new TxSubmitError({ cause }),
  });
  return {
    submit: () => makeReturn(submit).unsafeRun(),
    submitProgram: () => submit,
    submitSafe: () => makeReturn(submit).safeRun(),
    toCBOR: () => txSigned.to_cbor_hex(),
    toJSON: () =>
      S.decodeUnknownSync(S.parseJson(S.Object))(txSigned.to_json()),
    toHash: () => CML.hash_transaction(txSigned.body()).to_hex(),
  };
};
