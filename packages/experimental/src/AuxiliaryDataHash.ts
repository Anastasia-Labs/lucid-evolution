/**
 * Auxiliary Data Hash module - provides an alias for Hash32 specialized for auxiliary data hashing.
 *
 * In Cardano, auxiliary_data_hash = hash32, representing a 32-byte hash
 * used for auxiliary data (metadata) attached to transactions.
 *
 * @since 2.0.0
 */

import { Schema, Data, FastCheck } from "effect";
import * as Hash32 from "./Hash32.js";
import * as Bytes from "./Bytes.js";

/**
 * Error class for AuxiliaryDataHash related operations.
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new AuxiliaryDataHash.AuxiliaryDataHashError({ message: "Invalid auxiliary data hash" });
 * assert(error.message === "Invalid auxiliary data hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class AuxiliaryDataHashError extends Data.TaggedError(
  "AuxiliaryDataHashError",
)<{
  message?: string;
  reason?: "InvalidHexLength" | "InvalidBytesLength" | "InvalidHexFormat";
}> {}

/**
 * Schema for AuxiliaryDataHash representing auxiliary data hashes.
 * auxiliary_data_hash = hash32
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 *
 * const auxHash = new AuxiliaryDataHash({
 *   hash: "1234567890123456789012345678901234567890123456789012345678901234"
 * });
 *
 * @since 2.0.0
 * @category model
 */
export class AuxiliaryDataHash extends Schema.TaggedClass<AuxiliaryDataHash>()(
  "AuxiliaryDataHash",
  {
    hash: Hash32.HexSchema,
  },
) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: "AuxiliaryDataHash",
      hash: this.hash,
    };
  }
}

/**
 * Schema for transforming between Uint8Array and AuxiliaryDataHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const BytesSchema = Schema.transform(
  Hash32.BytesSchema,
  AuxiliaryDataHash,
  {
    strict: true,
    encode: (_, hash) => Bytes.Decode.hex(hash.hash),
    decode: (bytes) => new AuxiliaryDataHash({ hash: Bytes.Encode.hex(bytes) }),
  },
);

/**
 * Schema for transforming between hex string and AuxiliaryDataHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const HexSchema = Schema.transform(
  Schema.typeSchema(Hash32.HexSchema),
  AuxiliaryDataHash,
  {
    strict: true,
    encode: (_, hash) => hash.hash,
    decode: (hash) => new AuxiliaryDataHash({ hash }),
  },
);

/**
 * Check if two AuxiliaryDataHash instances are equal.
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 *
 * const auxHash1 = new AuxiliaryDataHash({
 *   hash: "1234567890123456789012345678901234567890123456789012345678901234"
 * });
 * const auxHash2 = new AuxiliaryDataHash({
 *   hash: "1234567890123456789012345678901234567890123456789012345678901234"
 * });
 * const isEqual = AuxiliaryDataHash.equals(auxHash1, auxHash2); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: AuxiliaryDataHash, b: AuxiliaryDataHash): boolean =>
  a.hash === b.hash;

/**
 * Generate a random AuxiliaryDataHash.
 *
 * @example
 * import { AuxiliaryDataHash } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(AuxiliaryDataHash.generator, 20);
 * randomSamples.forEach((auxHash) => {
 *  assert(auxHash.hash.length === 64);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: Hash32.HASH32_BYTES_LENGTH,
  maxLength: Hash32.HASH32_BYTES_LENGTH,
}).map((bytes) => new AuxiliaryDataHash({ hash: Bytes.Encode.hex(bytes) }));

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(HexSchema),
  bytes: Schema.encodeSync(BytesSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  hex: Schema.decodeUnknownSync(HexSchema),
  bytes: Schema.decodeUnknownSync(BytesSchema),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  hex: Schema.encodeEither(HexSchema),
  bytes: Schema.encodeEither(BytesSchema),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  hex: Schema.decodeUnknownEither(HexSchema),
  bytes: Schema.decodeUnknownEither(BytesSchema),
};
