import {
  Schema,
  Data,
  Inspectable,
  FastCheck,
} from "effect";
import * as Hex from "./Hex.js";
import * as Hash32 from "./Hash32.js";

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
  "TransactionHashError"
)<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * Schema for TransactionHash.
 *
 * @since 2.0.0
 * @category schemas
 */
export class TransactionHash extends Schema.TaggedClass<TransactionHash>()(
  "TransactionHash",
  {
    hash: Hash32.HexString,
  }
) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "TransactionHash",
      hash: this.hash,
    };
  }
}

/**
 * Schema for transforming between Uint8Array and TransactionHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Bytes = Schema.transform(Hash32.Bytes, TransactionHash, {
  strict: true,
  encode: (_, hash) => Hex.toBytes(hash.hash),
  decode: (bytes) => new TransactionHash({ hash: Hex.fromBytes(bytes) }),
});

/**
 * Schema for transforming between hex string and TransactionHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const HexString = Schema.transform(Hash32.HexString, TransactionHash, {
  strict: true,
  encode: (_, hash) => hash.hash,
  decode: (hash) => new TransactionHash({ hash }),
});

/**
 * Check if two TransactionHash instances are equal.
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
  minLength: Hash32.HASH32_BYTES_LENGTH,
  maxLength: Hash32.HASH32_BYTES_LENGTH,
}).map((bytes) => new TransactionHash({ hash: Hex.fromBytes(bytes) }));

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(HexString),
  bytes: Schema.encodeSync(Bytes),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  hex: Schema.decodeUnknownSync(HexString),
  bytes: Schema.decodeUnknownSync(Bytes),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  hex: Schema.encodeEither(HexString),
  bytes: Schema.encodeEither(Bytes),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  hex: Schema.decodeUnknownEither(HexString),
  bytes: Schema.decodeUnknownEither(Bytes),
};
