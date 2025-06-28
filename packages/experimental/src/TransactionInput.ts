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
import * as Bytes from "./Bytes.js";
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
export const CBORBytesSchema = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf.annotations({
    identifier: "CBORBytes",
  }),
  Schema.typeSchema(TransactionInput),
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      pipe(
        ParseResult.encode(TransactionHash.BytesSchema)(toA.transactionId),
        Effect.map((hash) => CBOR.Encode.bytes([toA.index, hash])),
      ),
    decode: (fromA) =>
      pipe(
        ParseResult.decode(
          CBOR.makeCBORBytesSchema(
            Schema.Tuple(Numeric.Uint16, Schema.Uint8ArrayFromSelf),
          ),
        )(fromA),
        Effect.flatMap(([index, txHashBytes]) =>
          pipe(
            ParseResult.decode(TransactionHash.BytesSchema)(txHashBytes),
            Effect.map(
              (transactionId) =>
                new TransactionInput({
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
export const CBORHexSchema = Schema.transformOrFail(
  Bytes.HexSchema.annotations({
    identifier: "CBORHex",
  }),
  TransactionInput,
  {
    strict: true,
    encode: (_, __, ___, toA) =>
      pipe(
        ParseResult.encode(CBORBytesSchema)(toA),
        Effect.map(Bytes.Encode.hex),
      ),
    decode: (fromA) =>
      pipe(ParseResult.decode(CBORBytesSchema)(Bytes.Decode.hex(fromA))),
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

/**
 * Synchronous encoding utilities for enterprise address.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  cborHex: Schema.encodeSync(CBORHexSchema),
  cborBytes: Schema.encodeSync(CBORBytesSchema),
};

/**
 * Synchronous decoding utilities for enterprise address.
 *
 @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  cborHex: Schema.decodeUnknownSync(CBORHexSchema),
  cborBytes: Schema.decodeUnknownSync(CBORBytesSchema),
};

/**
 * Either encoding utilities for enterprise address.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  cborHex: Schema.encodeEither(CBORHexSchema),
  cborBytes: Schema.encodeEither(CBORBytesSchema),
};

/**
 * Either decoding utilities for enterprise address.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  cborHex: Schema.decodeUnknownEither(CBORHexSchema),
  cborBytes: Schema.decodeUnknownEither(CBORBytesSchema),
};

/**
 * Effectful encoding utilities for transaction input.
 */
export const EncodeEffect = {
  cborHex: Schema.encode(CBORHexSchema),
  cborBytes: Schema.encode(CBORBytesSchema),
};

/**
 * Effectful decoding utilities for transaction input.
 */
export const DecodeEffect = {
  cborHex: Schema.decodeUnknown(CBORHexSchema),
  cborBytes: Schema.decodeUnknown(CBORBytesSchema),
};
