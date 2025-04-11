import { Effect, Schema, Data } from "effect";
import { HexString } from "./Combinator.js";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";
import { ParseError } from "effect/ParseResult";

/**
 * Error class for KeyHash related operations
 * Extends TaggedError for better error handling and categorization
 *
 * @since 2.0.0
 * @category errors
 */
export class KeyHashError extends Data.TaggedError("KeyHashError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Schema for KeyHash representing a verification key hash
 * Following CIP-0019 binary representation
 *
 * @since 2.0.0
 * @category schemas
 */
export const KeyHash = Schema.TaggedStruct("KeyHash", {
  hash: Schema.String.pipe(HexString),
});

/**
 * Type representing a key hash credential
 * Used in addresses to identify verification key ownership
 *
 * @since 2.0.0
 * @category model
 */
export type KeyHash = Schema.Schema.Type<typeof KeyHash>;

/**
 * Convert a KeyHash to CBOR bytes
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const keyHash = { _tag: "KeyHash", hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f" } as const;
 * const bytesEffect = KeyHash.toCBORBytes(keyHash);
 * const bytes = Effect.runSync(bytesEffect);
 * // Returns Uint8Array containing CBOR encoded bytes
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBORBytes: (
  keyHash: KeyHash,
) => Effect.Effect<Uint8Array, CBOR.CBORError> = Effect.fnUntraced(
  function* (keyHash) {
    return yield* CBOR.encode(keyHash.hash);
  },
);

/**
 * Convert a KeyHash to CBOR hex string
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const keyHash = { _tag: "KeyHash", hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f" } as const
 * const hexEffect = KeyHash.toCBOR(keyHash);
 * const hex = Effect.runSync(hexEffect);
 * // Returns a CBOR hex string representation
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBOR: (
  keyHash: KeyHash,
) => Effect.Effect<string, CBOR.CBORError> = (keyHash) =>
  Effect.map(toCBORBytes(keyHash), (bytes) => Bytes.toHex(bytes));

/**
 * Create a KeyHash from a CBOR hex string
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const cborHex = "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const keyHashEffect = KeyHash.fromCBOR(cborHex);
 * const keyHash = Effect.runSync(keyHashEffect);
 * // Returns a KeyHash object
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOR: (
  hex: string,
) => Effect.Effect<KeyHash, CBOR.CBORError | ParseError> = (hex) =>
  fromCBORBytes(Bytes.fromHex(hex));

/**
 * Create a KeyHash from CBOR bytes
 *
 * @example
 * import { KeyHash, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const bytes = Bytes.fromHex("581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const keyHashEffect = KeyHash.fromCBORBytes(bytes);
 * const keyHash = Effect.runSync(keyHashEffect);
 * // Returns a KeyHash object
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytes: (
  bytes: Uint8Array,
) => Effect.Effect<KeyHash, CBOR.CBORError | ParseError> = Effect.fnUntraced(
  function* (bytes) {
    const decoded = yield* CBOR.decode(bytes);
    return yield* Schema.encode(KeyHash)({
      _tag: "KeyHash",
      hash: Bytes.toHex(decoded),
    });
  },
);

/**
 * Create a KeyHash directly from bytes
 *
 * @example
 * import { KeyHash, Bytes } from "@lucid-evolution/experimental";
 *
 * const bytes = Bytes.fromHex("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const keyHash = KeyHash.fromBytes(bytes);
 * // Returns { _tag: "KeyHash", hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f" }
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytes = (bytes: Uint8Array): KeyHash => {
  return {
    _tag: "KeyHash",
    hash: Bytes.toHex(bytes),
  };
};

/**
 * Convert a KeyHash to bytes
 *
 * @example
 * import { KeyHash } from "@lucid-evolution/experimental";
 *
 * const keyHash = { _tag: "KeyHash", hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f" } as const;
 * const bytes = KeyHash.toBytes(keyHash);
 * // Returns Uint8Array containing the hash bytes
 *
 * @since 2.0.0
 * @category transformation
 */
export const toBytes = (keyHash: KeyHash): Uint8Array => {
  return Bytes.fromHex(keyHash.hash);
};
