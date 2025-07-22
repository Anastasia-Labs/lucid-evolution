import { Effect } from "effect";
import * as S from "@effect/schema/Schema";
import { CML, makeReturn } from "../core.js";
import { Wallet } from "@evolution-sdk/core-types";
import { Either } from "effect/Either";
import { TxSubmitError } from "../Errors.js";
import { CBORHex, Hash } from "../tx-builder/types.js";

export interface TxSigned {
  /** Submits the transaction and returns the transaction hash.
   *
   * Supports both canonical and non-canonical formats.
   *
   * Canonical format follows [RFC 7049 Section 3.9](https://datatracker.ietf.org/doc/html/rfc7049#section-3.9) rules
   *
   * Non-canonical format example:
   * ```typescript
   * .submit();
   * ```
   * Canonical format example:
   * ```typescript
   * .submit({ canonical: true });
   * ```
   */
  submit: (options?: { canonical: boolean }) => Promise<string>;

  /** Submits the transaction and returns the transaction hash or error as an effect.
   *
   * Supports both canonical and non-canonical formats.
   *
   * Canonical format follows [RFC 7049 Section 3.9](https://datatracker.ietf.org/doc/html/rfc7049#section-3.9) rules
   *
   * Non-canonical format example:
   * ```typescript
   * .submitProgram();
   * ```
   * Canonical format example:
   * ```typescript
   * .submitProgram({ canonical: true });
   * ```
   */
  submitProgram: (options?: {
    canonical: boolean;
  }) => Effect.Effect<string, TxSubmitError, never>;

  /** Safely submits the transaction, returning the transaction hash or an error as promise either type.
   *
   * Supports both canonical and non-canonical formats.
   *
   * Canonical format follows [RFC 7049 Section 3.9](https://datatracker.ietf.org/doc/html/rfc7049#section-3.9) rules
   *
   * Non-canonical format example:
   * ```typescript
   * .submitSafe();
   * ```
   * Canonical format example:
   * ```typescript
   * .submitSafe({ canonical: true });
   * ```
   */
  submitSafe: (options?: {
    canonical: boolean;
  }) => Promise<Either<string, TxSubmitError>>;

  /**
   * Converts the transaction to CBOR (Concise Binary Object Representation) format.
   *
   * Supports both canonical and non-canonical formats.
   *
   * Canonical format follows [RFC 7049 Section 3.9](https://datatracker.ietf.org/doc/html/rfc7049#section-3.9) rules
   *
   * Non-canonical format example:
   * ```typescript
   * .toCBOR();
   * ```
   * Canonical format example:
   * ```typescript
   * .toCBOR({ canonical: true });
   * ```
   */
  toCBOR: (options?: { canonical: boolean }) => CBORHex;
  toTransaction: () => CML.Transaction;
  /** Converts the transaction (transaction body and witnesses) to JSON format. */
  toJSON: () => object;
  /** Computes the hash of the transaction. */
  toHash: () => Hash;
}
export const makeSubmit = (
  wallet: Wallet,
  txSigned: CML.Transaction,
): TxSigned => {
  const submit = (options: { canonical: boolean }) =>
    Effect.tryPromise({
      try: () =>
        wallet.submitTx(
          options.canonical
            ? txSigned.to_canonical_cbor_hex()
            : txSigned.to_cbor_hex(),
        ),
      catch: (cause) => new TxSubmitError({ cause }),
    });
  return {
    submit: (options = { canonical: false }) =>
      makeReturn(submit(options)).unsafeRun(),
    submitProgram: (options = { canonical: false }) => submit(options),
    submitSafe: (options = { canonical: false }) =>
      makeReturn(submit(options)).safeRun(),
    toCBOR: (options = { canonical: false }) =>
      options.canonical
        ? txSigned.to_canonical_cbor_hex()
        : txSigned.to_cbor_hex(),
    toTransaction: () => txSigned,
    toJSON: () =>
      S.decodeUnknownSync(S.parseJson(S.Object))(txSigned.to_json()),
    toHash: () => CML.hash_transaction(txSigned.body()).to_hex(),
  };
};
