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
const CBORBytes = Schema.transformOrFail(
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
              ParseResult.decode(TransactionInput)({
                _tag: "TransactionInput",
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
      pipe(ParseResult.encode(CBORBytes)(toA), Effect.map(Hex.fromBytes)),
    decode: (fromA, options, ast) =>
      pipe(Hex.toBytes(fromA), ParseResult.decode(CBORBytes)),
  },
);

/**
 * Check if two TransactionInput instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: TransactionInput, b: TransactionInput): boolean =>
  a._tag === b._tag &&
  a.index === b.index &&
  a.transactionId.hash === b.transactionId.hash;

export const generator = FastCheck.tuple(
  TransactionHash.generator,
  Numeric.Uint16Generator,
).map(
  ([transactionId, index]) =>
    new TransactionInput({
      transactionId,
      index,
    }),
);
