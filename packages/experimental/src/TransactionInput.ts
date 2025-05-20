import { Data, Effect, Inspectable, pipe, Schema } from "effect";
import * as CBOR from "./CBOR.js";
import * as Hex from "./Hex.js";
import * as Serialization from "./Serialization.js";
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
  "TransactionInput"
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
  "TransactionInputError"
)<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Check if the given value is a valid TransactionInput
 *
 * @example
 * import { TransactionHash, TransactionInput } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionId = TransactionHash.decodeHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionInput = TransactionInput.makeOrThrow(transactionId, 0)
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
 * const bytes = Bytes.fromHexOrThrow("82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionInputEffect = TransactionInput.decodeCBORBytes(bytes);
 * const transactionInput = Effect.runSync(transactionInputEffect);
 * assert(transactionInput.transactionId.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * assert(transactionInput.index === 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeCBORBytes: Serialization.FromCBORBytes<
  TransactionInput,
  TransactionInputError
> = Effect.fnUntraced(
  function* (bytes) {
    const [index, txHashBytes]: [number, Uint8Array] =
      yield* CBOR.decodeBytes(bytes);

    const transactionId = yield* TransactionHash.decodeBytes(txHashBytes);

    return TransactionInput.make(
      {
        transactionId,
        index,
      },
      { disableValidation: true }
    );
  },
  Effect.mapError(
    (error) =>
      new TransactionInputError({
        message: "Failed to decode TransactionInput from CBOR bytes",
        cause: error,
      })
  )
);

/**
 * Decode a CBOR hex string to a TransactionInput
 *
 * @example
 * import { TransactionInput, Hex } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const cborHex = "82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
 * const transactionInputEffect = TransactionInput.decodeCBORHex(cborHex);
 * const transactionInput = Effect.runSync(transactionInputEffect);
 * assert(transactionInput.transactionId.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * assert(transactionInput.index === 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeCBORHex: Serialization.FromCBOR<
  string,
  TransactionInput,
  TransactionInputError
> = (maybeHex) =>
  pipe(
    Hex.decode(maybeHex),
    Effect.mapError((e) => new TransactionInputError({ message: e.message })),
    Effect.map((hex) => Hex.toBytes(hex)),
    Effect.flatMap((bytes) => decodeCBORBytes(bytes))
  );

/**
 * Decode CBOR bytes to a TransactionInput, throws on error.
 *
 * @example
 * import { TransactionInput, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionInput = TransactionInput.decodeCBORBytesOrThrow(bytes);
 * assert(transactionInput.transactionId.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * assert(transactionInput.index === 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeCBORBytesOrThrow: Serialization.FromCBORBytesOrThrow<
  TransactionInput
> = (bytes) => Effect.runSync(decodeCBORBytes(bytes));

/**
 * Decode a CBOR hex string to a TransactionInput, throws on error.
 *
 * @example
 * import { TransactionInput, Hex } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const cborHex = "82005820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819" as Hex.HexString;
 * const transactionInput = TransactionInput.decodeCBORHexOrThrow(cborHex);
 * assert(transactionInput.transactionId.hash === "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * assert(transactionInput.index === 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const decodeCBORHexOrThrow: Serialization.FromCBOROrThrow<
  Hex.HexString,
  TransactionInput
> = (cborHex) => Effect.runSync(decodeCBORHex(cborHex));

/**
 * Check if two TransactionInput instances are equal.
 *
 * @example
 * import { TransactionHash, TransactionInput } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionId1 = TransactionHash.decodeHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionId2 = TransactionHash.decodeHexOrThrow("dddd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const transactionInput = TransactionInput.makeOrThrow(transactionId1, 0);
 * const sameTransactionInput = TransactionInput.makeOrThrow(transactionId1, 0);
 * const differentTransactionInput1 = TransactionInput.makeOrThrow(transactionId1, 1);
 * const differentTransactionInput2 = TransactionInput.makeOrThrow(transactionId2, 0);
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
 * import { Bytes, TransactionHash, TransactionInput } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionHash = "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
 * const transactionId = TransactionHash.decodeHexOrThrow(transactionHash);
 * const transactionInput = TransactionInput.makeOrThrow(transactionId, 0);
 * const cborBytes = TransactionInput.encodeCBORBytes(transactionInput);
 * 
 * // Verify the bytes are correct by converting back to hex
 * const hexString = Bytes.toHexOrThrow(cborBytes);
 * assert(hexString.startsWith("82")); // Array of 2 elements in CBOR
 * assert(hexString.includes(transactionHash));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeCBORBytes: Serialization.ToCBORBytes<TransactionInput> = (
  transactionInput
) =>
  CBOR.encodeAsBytesOrThrow([
    transactionInput.index,
    TransactionHash.encodeCBORBytes(transactionInput.transactionId),
  ]);

/**
 * CBOR diagnostic notation for TransactionInput:
 * transactionInput = [index, transactionId]
 *
 * CBOR hex for TransactionInput:
 * [ 0, h'cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819' ]
 *
 * Convert TransactionInput to CBOR hex encoding
 * Uses a pre-configured CBOR encoder for better performance
 *
 * @example
 * import { TransactionHash, TransactionInput } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionHash = "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819";
 * const transactionId = TransactionHash.decodeHexOrThrow(transactionHash);
 * const transactionInput = TransactionInput.makeOrThrow(transactionId, 0);
 * const cbor = TransactionInput.encodeCBORHex(transactionInput);
 * assert(cbor === "820058225820cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const encodeCBORHex: Serialization.ToCBOR<TransactionInput> = (
  transactionInput
) => Hex.fromBytes(encodeCBORBytes(transactionInput));

export const make = (
  transactionId: TransactionHash.TransactionHash,
  index: number
) =>
  pipe(
    Effect.succeed(index),
    Effect.filterOrFail(
      (index) => Number.isInteger(index) && index >= 0,
      () =>
        new TransactionInputError({
          message: `TransactionInput index must be a non-negative integer, got: ${index}`,
        })
    ),
    Effect.filterOrFail(
      (index) => index <= 65535,
      () =>
        new TransactionInputError({
          message: `TransactionInput index is not a 2 byte number, got: ${index}`,
        })
    ),
    Effect.map(
      () =>
        new TransactionInput(
          { transactionId, index },
          { disableValidation: true }
        )
    )
  );

/**
 * Construct a TransactionInput, throws on error.
 *
 * @example
 * import { TransactionHash, TransactionInput } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const transactionHash = "cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819"
 * const transactionId = TransactionHash.decodeHexOrThrow(transactionHash);
 * const transactionInput = TransactionInput.makeOrThrow(transactionId, 0);
 * assert(transactionInput._tag === "TransactionInput");
 * assert(transactionInput.transactionId.hash === transactionHash);
 * assert(transactionInput.index === 0);
 *
 * @since 2.0.0
 * @category constructors
 */
export const makeOrThrow = (
  transactionId: TransactionHash.TransactionHash,
  index: number
): TransactionInput => Effect.runSync(make(transactionId, index));
