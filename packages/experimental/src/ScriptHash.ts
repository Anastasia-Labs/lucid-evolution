import { Effect, Schema, Data } from "effect";
import { HexString } from "./Combinator.js";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";
import { ParseError } from "effect/ParseResult";

/**
 * Error class for ScriptHash related operations
 * Extends TaggedError for better error handling and categorization
 *
 * @since 2.0.0
 * @category errors
 */
export class ScriptHashError extends Data.TaggedError("ScriptHashError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Schema for script hash credential
 * Following CIP-0019 binary representation
 *
 * @since 2.0.0
 * @category schemas
 */
export const ScriptHash = Schema.TaggedStruct("ScriptHash", {
  hash: Schema.String.pipe(HexString),
});

/**
 * Type representing a script hash credential
 * Used in addresses to identify script ownership
 *
 * @since 2.0.0
 * @category model
 */
export type ScriptHash = Schema.Schema.Type<typeof ScriptHash>;

/**
 * Convert a ScriptHash to CBOR bytes
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const scriptHash = {
 *   _tag: "ScriptHash",
 *   hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
 * } as const;
 * const bytesEffect = ScriptHash.toCBORBytes(scriptHash);
 * const bytes = Effect.runSync(bytesEffect);
 * // Returns Uint8Array containing CBOR encoded bytes
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBORBytes: (
  scriptHash: ScriptHash,
) => Effect.Effect<Uint8Array, CBOR.CBORError> = Effect.fnUntraced(
  function* (scriptHash) {
    return yield* CBOR.encode(scriptHash.hash);
  },
);

/**
 * Convert a ScriptHash to CBOR hex string
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const scriptHash = {
 *   _tag: "ScriptHash",
 *   hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
 * } as const;
 * const hexEffect = ScriptHash.toCBOR(scriptHash);
 * const hex = Effect.runSync(hexEffect);
 * // Returns a CBOR hex string representation
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBOR: (
  scriptHash: ScriptHash,
) => Effect.Effect<string, CBOR.CBORError> = (scriptHash) =>
  Effect.map(toCBORBytes(scriptHash), (bytes) => Bytes.toHex(bytes));

/**
 * Create a ScriptHash from CBOR bytes
 *
 * @example
 * import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const bytes = Bytes.fromHex("581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const scriptHashEffect = ScriptHash.fromCBORBytes(bytes);
 * const scriptHash = Effect.runSync(scriptHashEffect);
 * // Returns a ScriptHash object
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBORBytes: (
  bytes: Uint8Array,
) => Effect.Effect<ScriptHash, CBOR.CBORError | ParseError> = Effect.fnUntraced(
  function* (bytes) {
    const decoded = yield* CBOR.decode(bytes);
    return yield* Schema.encode(ScriptHash)({
      _tag: "ScriptHash",
      hash: Bytes.toHex(decoded),
    });
  },
);

/**
 * Create a ScriptHash from a CBOR hex string
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * const cborHex = "581cc37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const scriptHashEffect = ScriptHash.fromCBOR(cborHex);
 * const scriptHash = Effect.runSync(scriptHashEffect);
 * // Returns a ScriptHash object
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromCBOR: (
  hex: string,
) => Effect.Effect<ScriptHash, CBOR.CBORError | ParseError> = (hex) =>
  fromCBORBytes(Bytes.fromHex(hex));

/**
 * Create a ScriptHash directly from bytes
 *
 * @example
 * import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
 *
 * const bytes = Bytes.fromHex("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const scriptHash = ScriptHash.fromBytes(bytes);
 * // Returns { _tag: "ScriptHash", hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f" }
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytes = (bytes: Uint8Array): ScriptHash => {
  return {
    _tag: "ScriptHash",
    hash: Bytes.toHex(bytes),
  };
};

/**
 * Convert a ScriptHash to bytes
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 *
 * const scriptHash = {
 *   _tag: "ScriptHash",
 *   hash: "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
 * } as const;
 * const bytes = ScriptHash.toBytes(scriptHash);
 * // Returns Uint8Array containing the hash bytes
 *
 * @since 2.0.0
 * @category transformation
 */
export const toBytes = (scriptHash: ScriptHash): Uint8Array => {
  return Bytes.fromHex(scriptHash.hash);
};
