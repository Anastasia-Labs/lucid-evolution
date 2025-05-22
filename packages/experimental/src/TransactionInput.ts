import {
  Data,
  Effect,
  FastCheck,
  Inspectable,
  ParseResult,
  pipe,
  Schema,
} from "effect";
import * as CBOR from "./CBOR.js";
import * as Hex from "./Hex.js";
import * as TransactionHash from "./TransactionHash.js";
import * as Numeric from "./Numeric.js";

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
  index: Numeric.Uint16,
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
 * @category errors
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
 * Schema for transforming between CBOR bytes and TransactionInput
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const TransactionInputFromCBORBytes = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf.annotations({
    identifier: "CBORBytes",
  }),
  TransactionInput,
  {
    strict: true,
    encode: (toI, options, ast, toA) =>
      pipe(
        ParseResult.encode(TransactionHash.CBORBytes)(toA.transactionId),
        Effect.map((hash) => CBOR.encodeAsBytesOrThrow([toA.index, hash])),
      ),
    decode: (fromA, options, ast, fromI) =>
      pipe(
        CBOR.decodeBytes(fromA),
        Effect.mapError(
          (error) => new ParseResult.Type(ast, fromA, error.message),
        ),
        Effect.flatMap(([index, txHashBytes]) =>
          pipe(
            ParseResult.decodeUnknown(TransactionHash.CBORBytes)(txHashBytes),
            Effect.flatMap((transactionId) =>
              ParseResult.decodeUnknown(TransactionInput)({
                transactionId,
                index,
              }),
            ),
          ),
        ),
      ),
  },
);

/**
 * Schema for transforming between CBOR hex and TransactionInput
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORHex = Schema.transformOrFail(
  Hex.HexString.pipe(Schema.typeSchema).annotations({
    identifier: "CBORHex",
  }),
  TransactionInput,
  {
    strict: true,
    encode: (toI, options, ast, toA) =>
      pipe(
        ParseResult.encode(TransactionInputFromCBORBytes)(toA),
        Effect.map(Hex.fromBytes),
      ),
    decode: (fromA, options, ast) =>
      pipe(
        Hex.toBytes(fromA),
        ParseResult.decode(TransactionInputFromCBORBytes),
      ),
  },
);

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
export const equals = (a: TransactionInput, b: TransactionInput): boolean =>
  a._tag === b._tag &&
  a.index === b.index &&
  a.transactionId.hash === b.transactionId.hash;
