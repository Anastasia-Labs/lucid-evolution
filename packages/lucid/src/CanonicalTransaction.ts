import { withCMLScope } from "@lucid-evolution/core-utils";
import { CML } from "./core.js";

/**
 * Returns a copy of `tx` whose ledger containers use canonical CBOR while its
 * Plutus data keeps the original encoding.
 *
 * `to_canonical_cbor_bytes` also re-encodes Plutus data, sorting every Plutus
 * map by key. A Plutus map is an ordered list of pairs, so sorting it changes
 * the value that scripts see and the hash of a datum. Inline datums and
 * witness datums are copied from `tx` unchanged. A redeemer keeps its
 * canonical encoding only when its Plutus value is unchanged; otherwise the
 * original redeemer data is kept.
 *
 * The work happens in CML in one call, so no intermediate CML objects are
 * created or freed in JavaScript. The caller owns the returned transaction.
 *
 * @example
 * import { CML } from "./core.js";
 * import { canonicalTransaction } from "./CanonicalTransaction.js";
 *
 * const tx = CML.Transaction.from_cbor_hex(txCbor);
 * const canonical = canonicalTransaction(tx);
 * canonical.to_cbor_hex(); // canonical CBOR, with the original Plutus data
 * canonical.free();
 *
 * @since 0.7.0
 * @category Transactions
 */
export const canonicalTransaction = (tx: CML.Transaction): CML.Transaction =>
  tx.to_canonical_keeping_plutus_data();

/**
 * Canonical CBOR hex of `tx`; see {@link canonicalTransaction}.
 *
 * @example
 * import { CML } from "./core.js";
 * import { canonicalTransactionHex } from "./CanonicalTransaction.js";
 *
 * canonicalTransactionHex(CML.Transaction.from_cbor_hex(txCbor));
 *
 * @since 0.7.0
 * @category Transactions
 */
export const canonicalTransactionHex = (tx: CML.Transaction): string =>
  withCMLScope((own) => own(canonicalTransaction(tx)).to_cbor_hex());
