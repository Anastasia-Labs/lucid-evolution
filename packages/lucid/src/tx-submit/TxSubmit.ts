import * as Effect from "effect/Effect";
import * as S from "@effect/schema/Schema";
import { CML, makeReturn } from "../core.js";
import { Wallet } from "@lucid-evolution/core-types";
import { Either } from "effect/Either";
import { TxSubmitError } from "../Errors.js";
import { canonicalTransaction } from "../CanonicalTransaction.js";
import { withCMLScope } from "@lucid-evolution/core-utils";
import { CBORHex, Hash } from "../tx-builder/types.js";

export interface TxSigned {
  /** Submits the transaction and returns the transaction hash.
   *
   * Supports both canonical and non-canonical formats.
   * Canonical serialization is rejected if it changes the signed body hash.
   * Canonicalize the transaction before signing.
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
   * Canonical serialization is rejected if it changes the signed body hash.
   * Canonicalize the transaction before signing.
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
   * Canonical serialization is rejected if it changes the signed body hash.
   * Canonicalize the transaction before signing.
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
   * Canonical serialization is rejected if it changes the signed body hash.
   * Canonicalize the transaction before signing.
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
  const toCBOR = (options = { canonical: false }): CBORHex => {
    if (!options.canonical) return txSigned.to_cbor_hex();
    return withCMLScope((own) => {
      const canonical = own(canonicalTransaction(txSigned));
      const originalHash = own(CML.hash_transaction(own(txSigned.body())));
      const canonicalHash = own(CML.hash_transaction(own(canonical.body())));
      if (originalHash.to_hex() !== canonicalHash.to_hex()) {
        throw new Error(
          "Canonical serialization would change the signed transaction body hash. Canonicalize the transaction before signing.",
        );
      }
      return canonical.to_cbor_hex();
    });
  };
  const submit = (options: { canonical: boolean }) =>
    Effect.tryPromise({
      try: () => wallet.submitTx(toCBOR(options)),
      catch: (cause) => new TxSubmitError({ cause }),
    });
  return {
    submit: (options = { canonical: false }) =>
      makeReturn(submit(options)).unsafeRun(),
    submitProgram: (options = { canonical: false }) => submit(options),
    submitSafe: (options = { canonical: false }) =>
      makeReturn(submit(options)).safeRun(),
    toCBOR,
    toTransaction: () => txSigned,
    toJSON: () =>
      S.decodeUnknownSync(S.parseJson(S.Object))(txSigned.to_json()),
    toHash: () => CML.hash_transaction(txSigned.body()).to_hex(),
  };
};
