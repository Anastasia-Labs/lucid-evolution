import { Effect, Schema, Data, FastCheck, Inspectable } from "effect";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";
import { HexStringSchema } from "./Combinator.js";
import * as SerdeImpl from "./SerdeImpl.js";

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
  message: string;
  cause?: unknown;
}> {}

/**
 * Schema for validating KeyHash hex strings with proper length.
 *
 * @since 2.0.0
 * @category schemas
 */
const KeyHashHexString = HexStringSchema.pipe(
  Schema.length(KEYHASH_HEX_LENGTH),
).annotations({
  message: (issue) =>
    `must be ${KEYHASH_HEX_LENGTH} characters, got: ${issue.actual}.`,
});

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
  hash: KeyHashHexString,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "KeyHash",
      hash: this.hash,
    };
  }
}

/**
 * Convert a KeyHash to CBOR bytes.
 *
 * @example
 * import { KeyHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const keyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const bytes = KeyHash.toCBORBytes(keyHash);
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length > 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBORBytes: SerdeImpl.ToCBORBytes<KeyHash> = (keyHash) => {
  const hashBytes = Bytes.fromHexOrThrow(keyHash.hash);
  return CBOR.encodeOrThrow(hashBytes);
};

/**
 * Convert a KeyHash to CBOR hex string.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const keyHash = KeyHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const hex = KeyHash.toCBOR(keyHash);
 * assert(hex.startsWith("581c"));
 * assert(hex.includes("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBOR: SerdeImpl.ToCBOR<KeyHash> = (keyHash) => {
  const bytes = toCBORBytes(keyHash);
  return Bytes.toHexOrThrow(bytes);
};

/**
 * Create a KeyHash from a CBOR hex string.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const cborHex = "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const keyHashEffect = KeyHash.fromCBOR(cborHex);
 * const keyHash = Effect.runSync(keyHashEffect);
 * assert(keyHash._tag === "KeyHash");
 * assert(keyHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOR: SerdeImpl.FromCBOR<
  KeyHash,
  CBOR.CBORError | Bytes.BytesError | KeyHashError
> = Effect.fn(function* (cborHex) {
  const keyHash = yield* CBOR.decodeHex(cborHex);
  return yield* fromBytes(keyHash);
});

/**
 * Create a KeyHash from a CBOR hex string, throws on error.
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const keyHash = KeyHash.fromCBOROrThrow("581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * assert(keyHash._tag === "KeyHash");
 * assert(keyHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOROrThrow = (cborHex: string) => {
  const bytes = CBOR.decodeHexOrThrow(cborHex);
  return fromBytesOrThrow(bytes);
};

/**
 * Create a KeyHash from CBOR bytes.
 *
 * @example
 * import { KeyHash, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const keyHashEffect = KeyHash.fromCBORBytes(bytes);
 * const keyHash = Effect.runSync(keyHashEffect);
 * assert(keyHash._tag === "KeyHash");
 * assert(keyHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytes: SerdeImpl.FromCBORBytes<
  KeyHash,
  CBOR.CBORError | KeyHashError
> = Effect.fn(function* (cborBytes) {
  const hashBytes = yield* CBOR.decode(cborBytes);
  return yield* fromBytes(hashBytes);
});

/**
 * Create a KeyHash from CBOR bytes, throws on error.
 *
 * @example
 * import { KeyHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const keyHash = KeyHash.fromCBORBytesOrThrow(bytes);
 * assert(keyHash._tag === "KeyHash");
 * assert(keyHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytesOrThrow = (bytes: Uint8Array) =>
  Effect.runSync(fromCBORBytes(bytes));

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
export const fromBytes: SerdeImpl.FromBytes<KeyHash, KeyHashError> =
  Effect.fnUntraced(function* (bytes) {
    if (bytes.length !== KEYHASH_BYTES_LENGTH) {
      return yield* new KeyHashError({
        message: `KeyHash must be ${KEYHASH_BYTES_LENGTH} bytes long, got: ${bytes.length}.`,
      });
    }
    const hash = Bytes.toHexOrThrow(bytes);
    return new KeyHash({ hash }, { disableValidation: true });
  });

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
export const fromBytesOrThrow = (bytes: Uint8Array) => {
  if (bytes.length !== KEYHASH_BYTES_LENGTH) {
    throw new KeyHashError({
      message: `KeyHash must be ${KEYHASH_BYTES_LENGTH} bytes long.`,
    });
  }
  const hash = Bytes.toHexOrThrow(bytes);
  return new KeyHash({ hash }, { disableValidation: true });
};

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
export const toBytes: SerdeImpl.ToBytes<KeyHash> = (keyHash) =>
  Bytes.fromHexOrThrow(keyHash.hash);

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
export const make: SerdeImpl.Make<KeyHash, KeyHashError> = Effect.fnUntraced(
  function* (hash) {
    if (hash.length !== KEYHASH_HEX_LENGTH) {
      return yield* new KeyHashError({
        message: `KeyHash must be ${KEYHASH_HEX_LENGTH} characters long.`,
      });
    }
    if (!Bytes.isHex(hash)) {
      return yield* new KeyHashError({
        message: `KeyHash must be a valid hex string.`,
      });
    }
    return new KeyHash({ hash }, { disableValidation: true });
  },
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
export const makeOrThrow: SerdeImpl.MakeOrThrow<KeyHash> = (hash: string) => {
  if (!Bytes.isHex(hash)) {
    throw new KeyHashError({
      message: `KeyHash must be a valid hex string.`,
    });
  }
  if (hash.length !== KEYHASH_HEX_LENGTH) {
    throw new KeyHashError({
      message: `KeyHash must be ${KEYHASH_HEX_LENGTH} characters long.`,
    });
  }
  return new KeyHash({ hash }, { disableValidation: true });
};

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
