import {
  Effect,
  Schema,
  Data,
  Inspectable,
  pipe,
  ParseResult,
  FastCheck,
} from "effect";
import * as CBOR from "./CBOR.js";
import * as Hex from "./Hex.js";

/**
 * The length in bytes of a TransactionHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const TRANSACTIONHASH_BYTES_LENGTH = 32;

/**
 * The length in hex characters of a TransactionHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const TRANSACTIONHASH_HEX_LENGTH = 64;

/**
 * Error class for TransactionHash related operations.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new TransactionHash.TransactionHashError({ message: "Invalid transaction hash" });
 * assert(error.message === "Invalid transaction hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class TransactionHashError extends Data.TaggedError(
  "TransactionHashError",
)<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

const Hash = Hex.HexString.pipe(
  Schema.filter((hex) => hex.length === TRANSACTIONHASH_HEX_LENGTH),
).annotations({
  message: (issue) =>
    `${issue.actual} must be a hex string of length ${TRANSACTIONHASH_HEX_LENGTH}`,
  identifier: "Hash",
});

/**
 * Schema for TransactionHash.
 *
 * @since 2.0.0
 * @category schemas
 */
export class TransactionHash extends Schema.TaggedClass<TransactionHash>()(
  "TransactionHash",
  {
    hash: Hash,
  },
) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "TransactionHash",
      hash: this.hash,
    };
  }
}

/**
 * Schema for TransactionHash bytes validation.
 *
 * @since 2.0.0
 * @category schemas
 */
const TransactionHashBytes = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((bytes) => bytes.length === TRANSACTIONHASH_BYTES_LENGTH),
  Schema.typeSchema,
).annotations({
  message: (issue) =>
    `${issue.actual} must be a byte array of length ${TRANSACTIONHASH_BYTES_LENGTH}.`,
  identifier: "TransactionHashBytes",
});

/**
 * Schema for transforming between Uint8Array and TransactionHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const TransactionHashFromUint8Array = Schema.transform(
  TransactionHashBytes,
  TransactionHash.pipe(Schema.asSchema),
  {
    strict: true,
    encode: (_, hash) => Hex.toBytes(hash.hash),
    decode: (bytes) => new TransactionHash({ hash: Hex.fromBytes(bytes) }),
  },
);

/**
 * Schema for transforming between hex string and TransactionHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const TransactionHashFromHex = Schema.transform(Hash, TransactionHash, {
  strict: true,
  encode: (_, hash) => hash.hash,
  decode: (hash) => new TransactionHash({ hash }),
});

/**
 * Schema for transforming between CBOR bytes and TransactionHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const TransactionHashFromCBORBytes = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf.annotations({
    identifier: "CBORBytes",
  }),
  TransactionHash,
  {
    strict: true,
    encode: (s, options, ast, transactionHash) =>
      pipe(
        CBOR.encodeAsBytes(Hex.toBytes(transactionHash.hash)),
        Effect.mapError((e) => new ParseResult.Type(ast, s, e.message)),
      ),
    decode: (bytes, options, ast) =>
      pipe(
        CBOR.decodeBytes(bytes),
        Effect.mapError(
          (error) => new ParseResult.Type(ast, bytes, error.message),
        ),
        Effect.flatMap(ParseResult.decode(TransactionHashFromUint8Array)),
      ),
  },
);

/**
 * Schema for transforming between CBOR hex and TransactionHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const TransactionHashFromCBORHex = Schema.transformOrFail(
  Hex.HexString.pipe(Schema.typeSchema).annotations({
    identifier: "CBORHex",
  }),
  TransactionHash,
  {
    strict: true,
    encode: (_, options, ast, transactionHash) =>
      ParseResult.succeed(CBOR.encodeAsCBORHexOrThrow(transactionHash.hash)),
    decode: (hexString, options, ast) =>
      pipe(
        CBOR.decodeHex(hexString),
        Effect.mapError(
          (error) => new ParseResult.Type(ast, hexString, error.message),
        ),
        Effect.flatMap(ParseResult.decode(TransactionHashFromUint8Array)),
      ),
  },
);

/**
 * Check if two TransactionHash instances are equal.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const hash1 = TransactionHash.decodeHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const hash2 = TransactionHash.decodeHexOrThrow("cefd2fcf657e5e5d6c35975f4e052f427819391b153ebb16ad8aa107ba5a3819");
 * const hash3 = TransactionHash.decodeHexOrThrow("dc97057e0949d9676e55b69f28fcb2dccb8002583a4ad761f1dbfb985f36085c");
 *
 * assert(TransactionHash.equals(hash1, hash2) === true);
 * assert(TransactionHash.equals(hash1, hash3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: TransactionHash, b: TransactionHash): boolean =>
  a.hash === b.hash;

/**
 * Generate a random TransactionHash.
 *
 * @example
 * import { TransactionHash } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(TransactionHash.generator, 20);
 * randomSamples.forEach((transactionHash) => {
 *  assert(transactionHash.hash.length === 64);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: TRANSACTIONHASH_BYTES_LENGTH,
  maxLength: TRANSACTIONHASH_BYTES_LENGTH,
}).map((bytes) => new TransactionHash({ hash: Hex.fromBytes(bytes) }));
