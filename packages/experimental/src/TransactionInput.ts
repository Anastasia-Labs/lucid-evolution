import { Data, Effect, Inspectable, Schema } from "effect";
import { Bytes } from "./index.js";
import * as CBOR from "./CBOR.js";
import * as SerdeImpl from "./SerdeImpl.js";
import * as TransactionHash from "./TransactionHash.js";

/**
 * CDDL specs
 * transaction_input = [transaction_id : $hash32, index : uint .size 2]
 */

/**
 * Transaction input with transaction id and index
 *
 * @since 2.0.0
 * @category schemas
 */
export class TransactionInput extends Schema.TaggedClass<TransactionInput>(
  "TransactionInput",
)("TransactionInput", {
  transactionId: TransactionHash.TransactionHash,
  index: Schema.Number,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "TransactionInput",
      transactionId: this.transactionId,
      index: this.index,
    };
  }
}

/**
 * Error thrown when transaction input operations fail
 *
 * @since 2.0.0
 * @category model
 */
export class TransactionInputError extends Data.TaggedError(
  "TransactionInputError",
)<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Check if the given value is a valid TransactionInput
 *
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionInput = TransactionInput.makeOrThrow(0, "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819")
 * const isValid = TransactionInput.isTransactionInput(transactionInput);
 * assert(isValid === true);
 *
 * @since 2.0.0
 * @category predicates
 */
export const isTransactionInput = Schema.is(TransactionInput);

/**
 * Decode CBOR bytes to a TransactionInput
 * Internal helper function used by fromCBOR
 *
 * @example
 * import { TransactionInput, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("TODO");
 * const transactionInputEffect = TransactionInput.fromCBORBytes(bytes);
 * const transactionInput = Effect.runSync(transactionInputEffect);
 * assert(transactionInput.transactionId === "TODO");
 * assert(transactionInput.index === 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytes: SerdeImpl.FromCBORBytes<
  TransactionInput,
  CBOR.CBORError | TransactionHash.TransactionHashError | TransactionInputError
> = Effect.fnUntraced(function* (bytes) {
  const [txHashBytes, index]: [Uint8Array, number] = yield* CBOR.decode(bytes);

  const transactionId = yield* TransactionHash.fromBytes(txHashBytes);

  return TransactionInput.make(
    {
      transactionId,
      index,
    },
    { disableValidation: true },
  );
});

/**
 * Decode a CBOR hex string to a TransactionInput
 *
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const cborHex = "TODO";
 * const transactionInputEffect = TransactionInput.fromCBOR(cborHex);
 * const transactionInput = Effect.runSync(transactionInputEffect);
 * assert(transactionInput.transactionId === "TODO");
 * assert(transactionInput.index === 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOR: SerdeImpl.FromCBOR<
  TransactionInput,
  | CBOR.CBORError
  | TransactionHash.TransactionHashError
  | TransactionInputError
  | Bytes.BytesError
> = Effect.fn(function* (cborHex) {
  const bytes = yield* Bytes.fromHex(cborHex);
  return yield* fromCBORBytes(bytes);
});

/**
 * Decode CBOR bytes to a TransactionInput, throws on error.
 *
 * @example
 * import { TransactionInput, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("TODO");
 * const transactionInput = TransactionInput.fromCBORBytesOrThrow(bytes);
 * assert(transactionInput.transactionId === "TODO");
 * assert(transactionInput.index === 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytesOrThrow: SerdeImpl.FromCBORBytesOrThrow<
  TransactionInput
> = (bytes) => Effect.runSync(fromCBORBytes(bytes));

/**
 * Decode a CBOR hex string to a TransactionInput, throws on error.
 *
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const cborHex = "TODO";
 * const transactionInput = TransactionInput.fromCBOROrThrow(cborHex);
 * assert(transactionInput.transactionId === "TODO");
 * assert(transactionInput.index === 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOROrThrow: SerdeImpl.FromCBOROrThrow<TransactionInput> = (
  cborHex: string,
) => {
  const bytes = Bytes.fromHexOrThrow(cborHex);
  return fromCBORBytesOrThrow(bytes);
};

/**
 * Check if two TransactionInput instances are equal.
 *
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionInput = TransactionInput.makeOrThrow(0, "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const sameTransactionInput = TransactionInput.makeOrThrow(0, "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const differentTransactionInput1 = TransactionInput.makeOrThrow(1, "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const differentTransactionInput2 = TransactionInput.makeOrThrow(0, "dddd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * assert(TransactionInput.equals(transactionInput, sameTransactionInput) === true);
 * assert(TransactionInput.equals(transactionInput, differentTransactionInput1) === false);
 * assert(TransactionInput.equals(transactionInput, differentTransactionInput2) === false);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: TransactionInput, b: TransactionInput): boolean => {
  return (
    a._tag === b._tag &&
    a.index === b.index &&
    a.transactionId.hash === b.transactionId.hash
  );
};

/**
 * Convert TransactionInput to CBOR bytes
 * Internal helper function used by toCBOR
 *
 * @example
 * import { TransactionInput, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const transactionInput = TransactionInput.makeOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const cborBytes = TransactionInput.toCBORBytes(transactionInput);
 * // Verify the bytes are correct by converting back to hex
 * const hexString = Bytes.toHexOrThrow(cborBytes);
 * assert(hexString.startsWith("82"));  // Array of 2 elements in CBOR
 * assert(hexString.includes("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819"));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
const toCBORBytes: SerdeImpl.ToCBORBytes<TransactionInput> = (
  transactionInput,
) => {
  return CBOR.encodeOrThrow([
    transactionInput.index,
    Bytes.fromHexOrThrow(transactionInput.transactionId.hash),
  ]);
};

/**
 * CBOR diagnostic notation for TransactionInput:
 * transactionInput = [transactionId, index]
 *
 * CBOR hex for TransactionInput:
 * [ 0, h'cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819' ]
 *
 * Convert TransactionInput to CBOR hex encoding
 * Uses a pre-configured CBOR encoder for better performance
 *
 * @example
 * import { TransactionInput } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactioninput = TransactionInput.makeOrThrow(0, "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const cbor = TransactionInput.toCBOR(transactioninput);
 * assert(cbor === "TODO");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBOR: SerdeImpl.ToCBOR<TransactionInput> = (transactionInput) =>
  Bytes.toHexOrThrow(toCBORBytes(transactionInput));
