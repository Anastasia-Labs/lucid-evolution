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

/**
 * CDDL specs
 * hash32 = bytes .size 32
 */

/**
 * The length in bytes of a DatumHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const DATUM_HASH_BYTES_LENGTH = 32;

/**
 * The length in hex characters of a DatumHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const DATUM_HASH_HEX_LENGTH = 64;

/**
 * Error class for DatumHash related operations.
 *
 * @example
 * import { DatumHash } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new DatumHash.DatumHashError({ message: "Invalid datum hash" });
 * assert(error.message === "Invalid datum hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class DatumHashError extends Data.TaggedError("DatumHashError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * Schema for validating hex strings as datum hashes
 *
 * @since 2.0.0
 * @category schemas
 */
export const Hash = Hex.HexString.pipe(
  Schema.filter((hex) => hex.length === DATUM_HASH_HEX_LENGTH),
).annotations({
  message: (issue) =>
    `${issue.actual} must be a hex string of length ${DATUM_HASH_HEX_LENGTH}`,
  identifier: "Hash",
});

/**
 * Schema for a 32-byte datum hash
 *
 * @since 2.0.0
 * @category schemas
 */
export class DatumHash extends Schema.TaggedClass<DatumHash>()("DatumHash", {
  hash: Hash,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "DatumHash",
      hash: this.hash,
    };
  }
}

/**
 * Check if the given value is a valid DatumHash
 *
 * @since 2.0.0
 * @category predicates
 */
export const isDatumHash = Schema.is(DatumHash);

/**
 * Schema for DatumHash bytes validation
 *
 * @since 2.0.0
 * @category schemas
 */
export const DatumHashBytes = pipe(
  Schema.Uint8ArrayFromSelf,
  Schema.filter((bytes) => bytes.length === DATUM_HASH_BYTES_LENGTH),
  Schema.typeSchema,
).annotations({
  message: (issue) =>
    `${issue.actual} must be a byte array of length ${DATUM_HASH_BYTES_LENGTH}`,
  identifier: "DatumHashBytes",
});

/**
 * Schema for transforming between Uint8Array and DatumHash
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Bytes = Schema.transform(
  DatumHashBytes,
  DatumHash.pipe(Schema.asSchema),
  {
    strict: true,
    encode: (_, hash) => Hex.toBytes(hash.hash),
    decode: (bytes) => new DatumHash({ hash: Hex.fromBytes(bytes) }),
  },
);

/**
 * Schema for transforming between hex string and DatumHash
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const HexString = Schema.transform(Hash, DatumHash, {
  strict: true,
  encode: (_, hash) => hash.hash,
  decode: (hash) => new DatumHash({ hash }),
});

/**
 * Check if two DatumHash instances are equal.
 *
 * @example
 * import { DatumHash } from "@evolution-sdk/experimental";
 * import { Schema } from "effect";
 * import assert from "assert";
 *
 * const hash1 = Schema.decodeUnknownSync(DatumHash.HexString)(
 *   "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5"
 * );
 * const hash2 = Schema.decodeUnknownSync(DatumHash.HexString)(
 *   "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5"
 * );
 * const hash3 = Schema.decodeUnknownSync(DatumHash.HexString)(
 *   "bfd6dd1e96e4fd26c6379aa3093aaef25639d58ee76d045bd4528ef9f2fed808"
 * );
 *
 * assert(DatumHash.equals(hash1, hash2) === true);  // Same hash
 * assert(DatumHash.equals(hash1, hash3) === false); // Different hashes
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: DatumHash, b: DatumHash): boolean => {
  return a.hash === b.hash;
};

/**
 * Generator for creating random DatumHash instances for testing
 *
 * @example
 * import { DatumHash } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(DatumHash.generator, 10);
 * randomSamples.forEach((datumHash) => {
 *   assert(datumHash._tag === "DatumHash");
 *   assert(datumHash.hash.length === 64);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: DATUM_HASH_BYTES_LENGTH,
  maxLength: DATUM_HASH_BYTES_LENGTH,
}).map((bytes) => new DatumHash({ hash: Hex.fromBytes(bytes) }));
