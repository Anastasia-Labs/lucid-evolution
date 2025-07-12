import { Schema, Data, FastCheck, pipe, Inspectable } from "effect";
import * as Hex from "./Hex.js";

/**
 * The length in bytes of a KeyHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const KEYHASH_BYTES_LENGTH = 28;

/**
 * The length in hex characters of a KeyHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const KEYHASH_HEX_LENGTH = 56;

/**
 * Error class for KeyHash related operations.
 *
 * @example
 * import { KeyHash } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new KeyHash.KeyHashError({ message: "Invalid key hash" });
 * assert(error.message === "Invalid key hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class KeyHashError extends Data.TaggedError("KeyHashError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

export declare const NominalType: unique symbol;
export interface KeyHash {
  readonly [NominalType]: unique symbol;
}

/**
 * Schema for KeyHash representing a verification key hash.
 * Follows CIP-0019 binary representation.
 *
 * @since 2.0.0
 * @category schemas
 */
export class KeyHash extends Schema.TaggedClass<KeyHash>()("KeyHash", {
  hash: Hex.HexString,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "KeyHash",
      hash: this.hash,
    };
  }
}

export const KeyHashBytes = pipe(
  Schema.Uint8Array,
  Schema.filter((a) => a.length === KEYHASH_BYTES_LENGTH),
  Schema.typeSchema,
).annotations({
  message: (issue) =>
    `${issue.actual} must be a byte array of length ${KEYHASH_BYTES_LENGTH}`,
  identifier: "KeyHashBytes",
});

export const Bytes = Schema.transform(KeyHashBytes, KeyHash, {
  strict: true,
  encode: (_toI, toA) => Hex.toBytes(toA.hash),
  decode: (_fromI, fromA) => new KeyHash({ hash: Hex.fromBytes(fromA) }),
});

export const HexString = Schema.transform(Hex.HexString, KeyHash, {
  strict: true,
  encode: (_toI, toA) => toA.hash,
  decode: (fromI, _fromA) => new KeyHash({ hash: fromI }),
});

/**
 * Check if two KeyHash instances are equal.
 *
 * @example
 * import { KeyHash } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: KeyHash, b: KeyHash): boolean => a.hash === b.hash;

/**
 * Generate a random KeyHash.
 *
 * @example
 * import { KeyHash } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(KeyHash.generator, 20);
 * randomSamples.forEach((keyHash) => {
 *  assert(keyHash.hash.length === 56);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: KEYHASH_BYTES_LENGTH,
  maxLength: KEYHASH_BYTES_LENGTH,
}).map((bytes) => new KeyHash({ hash: Hex.fromBytes(bytes) }));

/**
 * Synchronous encoding utilities for KeyHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(HexString),
  bytes: Schema.encodeSync(Bytes),
};

/**
 * Synchronous decoding utilities for KeyHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  hex: Schema.decodeUnknownSync(HexString),
  bytes: Schema.decodeUnknownSync(Bytes),
};

/**
 * Either encoding utilities for KeyHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  hex: Schema.encodeEither(HexString),
  bytes: Schema.encodeEither(Bytes),
};

/**
 * Either decoding utilities for KeyHash.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  hex: Schema.decodeUnknownEither(HexString),
  bytes: Schema.decodeUnknownEither(Bytes),
};
