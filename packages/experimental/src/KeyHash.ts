import { Schema, Data, FastCheck, pipe, Inspectable, Effect } from "effect";
import * as Hex from "./Hex.js";
import * as Serialization from "./Serialization.js";

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
  hash: Hex.HexString,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "KeyHash",
      hash: this.hash,
    };
  }
}

/**
 * Create a KeyHash directly from bytes.
 *
 * @example
 * import { KeyHash, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const keyHashEffect = KeyHash.fromBytes(bytes);
 * const keyHash = Effect.runSync(keyHashEffect);
 * assert(keyHash._tag === "KeyHash");
 * assert(keyHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytes: Serialization.FromBytes<KeyHash, KeyHashError> = (
  bytes: Uint8Array,
) =>
  pipe(
    Effect.succeed(bytes),
    Effect.filterOrFail(
      (b) => b.length === KEYHASH_BYTES_LENGTH,
      () =>
        new KeyHashError({
          message: `KeyHash raw bytes must be ${KEYHASH_BYTES_LENGTH} bytes long. Got ${bytes.length}.`,
          reason: "InvalidBytesLength",
        }),
    ),
    Effect.map(
      (validLengthBytes) =>
        new KeyHash(
          { hash: Hex.fromBytes(validLengthBytes) },
          { disableValidation: true },
        ),
    ),
  );

/**
 * Create a KeyHash directly from bytes, throws on error.
 *
 * @example
 * import { KeyHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * assert(bytes.length === 28);
 * const keyHash = KeyHash.fromBytesOrThrow(bytes);
 * assert(keyHash._tag === "KeyHash");
 * assert(keyHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytesOrThrow = (bytes: Uint8Array) =>
  Effect.runSync(fromBytes(bytes));

/**
 * Convert a KeyHash to bytes.
 *
 * @example
 * import { KeyHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const keyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const bytes = KeyHash.toBytes(keyHash);
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length === 28);
 * assert(Bytes.toHexOrThrow(bytes) === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category transformation
 */
export const toBytes: Serialization.ToBytes<KeyHash> = (keyHash: KeyHash) =>
  Hex.toBytes(keyHash.hash);

/**
 * Construct a KeyHash from a hex string.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const hash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const keyHashEffect = KeyHash.make(hash);
 * const keyHash = Effect.runSync(keyHashEffect);
 * assert(keyHash._tag === "KeyHash");
 * assert(keyHash.hash === hash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const make: Serialization.Make<KeyHash, KeyHashError> = (
  input: string,
) =>
  pipe(
    Hex.make(input),
    Effect.mapError(
      () =>
        new KeyHashError({
          message: `KeyHash hex string must be a valid hex string. Got ${input}.`,
          reason: "InvalidHexFormat",
        }),
    ),
    Effect.filterOrFail(
      (h) => h.length === KEYHASH_HEX_LENGTH,
      (actualHash) =>
        new KeyHashError({
          message: `KeyHash hex string must be ${KEYHASH_HEX_LENGTH} characters long. Got ${actualHash.length}.`,
          reason: "InvalidHexLength",
        }),
    ),
    Effect.map(
      (hex) => new KeyHash({ hash: hex }, { disableValidation: true }),
    ),
  );

/**
 * Construct a KeyHash from a hex string, throws on error.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const hash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const keyHash = KeyHash.makeOrThrow(hash);
 * assert(keyHash._tag === "KeyHash");
 * assert(keyHash.hash === hash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const makeOrThrow: Serialization.MakeOrThrow<string, KeyHash> = (
  input,
) => Effect.runSync(make(input));

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
  minLength: KEYHASH_BYTES_LENGTH,
  maxLength: KEYHASH_BYTES_LENGTH,
}).map((bytes) => fromBytesOrThrow(bytes));
