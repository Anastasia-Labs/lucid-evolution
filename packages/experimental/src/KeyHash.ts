import { Schema, Data, FastCheck, pipe, Inspectable } from "effect";
import * as Hex from "./Hex.js";

/**
 * The length in bytes of a KeyHash.
 *
 * @since 2.0.0
 * @category constants
 */
const KEYHASH_BYTES_LENGTH = 28;

/**
 * The length in hex characters of a KeyHash.
 *
 * @since 2.0.0
 * @category constants
 */
const KEYHASH_HEX_LENGTH = 56;

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
class KeyHashError extends Data.TaggedError("KeyHashError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

declare const NominalType: unique symbol;
interface KeyHash {
  readonly [NominalType]: unique symbol;
}

/**
 * Schema for KeyHash representing a verification key hash.
 * Follows CIP-0019 binary representation.
 *
 * @since 2.0.0
 * @category schemas
 */
class KeyHash extends Schema.TaggedClass<KeyHash>()("KeyHash", {
  hash: Hex.HexString,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "KeyHash",
      hash: this.hash,
    };
  }
}

const KeyHashBytes = pipe(
  Schema.Uint8Array,
  Schema.filter((a) => a.length === KEYHASH_BYTES_LENGTH),
  Schema.typeSchema,
).annotations({
  message: (issue) =>
    `${issue.actual} must be a byte array of length ${KEYHASH_BYTES_LENGTH}`,
  identifier: "KeyHashBytes",
});

const KeyHashFromUint8Array = Schema.transform(KeyHashBytes, KeyHash, {
  strict: true,
  encode: (_toI, toA) => Hex.toBytes(toA.hash),
  decode: (_fromI, fromA) => new KeyHash({ hash: Hex.fromBytes(fromA) }),
});

const KeyHashFromHex = Schema.transform(Hex.HexString, KeyHash, {
  strict: true,
  encode: (_toI, toA) => toA.hash,
  decode: (fromI, _fromA) => new KeyHash({ hash: fromI }),
});

/**
 * Check if two KeyHash instances are equal.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const keyHash1 = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const keyHash2 = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const keyHash3 = KeyHash.makeOrThrow("530245ff0704032c031302cf01fb06010521a7fd024404010004f814");
 *
 * assert(KeyHash.equals(keyHash1, keyHash2) === true);
 * assert(KeyHash.equals(keyHash1, keyHash3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
const equals = (a: KeyHash, b: KeyHash): boolean => a.hash === b.hash;

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
const generator = FastCheck.uint8Array({
  minLength: KEYHASH_BYTES_LENGTH,
  maxLength: KEYHASH_BYTES_LENGTH,
}).map((bytes) => new KeyHash({ hash: Hex.fromBytes(bytes) }));

export {
  KeyHash,
  KeyHashError,
  KeyHashBytes,
  KeyHashFromUint8Array,
  KeyHashFromHex,
  equals,
  generator,
  KEYHASH_BYTES_LENGTH,
  KEYHASH_HEX_LENGTH,
};
