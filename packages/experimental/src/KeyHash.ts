import { Schema, Data, FastCheck, Inspectable } from "effect";
import * as Bytes from "./Bytes.js";
import * as Hash28 from "./Hash28.js";

/**
 * Error class for KeyHash related operations.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
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
  hash: Hash28.HexSchema,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "KeyHash",
      hash: this.hash,
    };
  }
}

export const BytesSchema = Schema.transform(Hash28.BytesSchema, KeyHash, {
  strict: true,
  encode: (_, toA) => Bytes.Decode.hex(toA.hash),
  decode: (_, fromA) => new KeyHash({ hash: Bytes.Encode.hex(fromA) }),
});

export const HexSchema = Schema.transform(Hash28.HexSchema, KeyHash, {
  strict: true,
  encode: (_, toA) => toA.hash,
  decode: (fromI) => new KeyHash({ hash: fromI }),
});

/**
 * Check if two KeyHash instances are equal.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
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
 * import { KeyHash } from "@lucid-evolution/experimental";
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
  minLength: Hash28.HASH28_BYTES_LENGTH,
  maxLength: Hash28.HASH28_BYTES_LENGTH,
}).map((bytes) => new KeyHash({ hash: Bytes.Encode.hex(bytes) }));

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
