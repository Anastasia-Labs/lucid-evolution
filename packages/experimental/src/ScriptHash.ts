import { Schema, Data, FastCheck, pipe, Inspectable, Effect } from "effect";
import * as Hex from "./Hex.js";
import * as Serialization from "./Serialization.js";

/**
 * The length in bytes of a ScriptHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const SCRIPTHASH_BYTES_LENGTH = 28;

/**
 * The length in hex characters of a ScriptHash.
 *
 * @since 2.0.0
 * @category constants
 */
export const SCRIPTHASH_HEX_LENGTH = 56;

/**
 * Error class for ScriptHash related operations.
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new ScriptHash.ScriptHashError({ message: "Invalid script hash" });
 * assert(error.message === "Invalid script hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class ScriptHashError extends Data.TaggedError("ScriptHashError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

export declare const NominalType: unique symbol;
export interface ScriptHash {
  readonly [NominalType]: unique symbol;
}

/**
 * Schema for ScriptHash representing a script hash credential.
 * Follows CIP-0019 binary representation.
 *
 * @since 2.0.0
 * @category schemas
 */
export class ScriptHash extends Schema.TaggedClass<ScriptHash>()("ScriptHash", {
  hash: Hex.HexString,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "ScriptHash",
      hash: this.hash,
    };
  }
}

/**
 * Create a ScriptHash directly from bytes.
 *
 * @example
 * import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const scriptHashEffect = ScriptHash.fromBytes(bytes);
 * const scriptHash = Effect.runSync(scriptHashEffect);
 * assert(scriptHash._tag === "ScriptHash");
 * assert(scriptHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytes: Serialization.FromBytes<ScriptHash, ScriptHashError> = (
  bytes: Uint8Array,
) =>
  pipe(
    Effect.succeed(bytes),
    Effect.filterOrFail(
      (b) => b.length === SCRIPTHASH_BYTES_LENGTH,
      () =>
        new ScriptHashError({
          message: `ScriptHash raw bytes must be ${SCRIPTHASH_BYTES_LENGTH} bytes long. Got ${bytes.length}.`,
          reason: "InvalidBytesLength",
        }),
    ),
    Effect.map(
      (validLengthBytes) =>
        new ScriptHash(
          { hash: Hex.fromBytes(validLengthBytes) },
          { disableValidation: true },
        ),
    ),
  );

/**
 * Create a ScriptHash directly from bytes, throws on error.
 *
 * @example
 * import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const bytes = Bytes.fromHexOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * assert(bytes.length === 28);
 * const scriptHash = ScriptHash.fromBytesOrThrow(bytes);
 * assert(scriptHash._tag === "ScriptHash");
 * assert(scriptHash.hash === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBytesOrThrow = (bytes: Uint8Array) =>
  Effect.runSync(fromBytes(bytes));

/**
 * Convert a ScriptHash to bytes.
 *
 * @example
 * import { ScriptHash, Bytes } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const scriptHash = ScriptHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const bytes = ScriptHash.toBytes(scriptHash);
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length === 28);
 * assert(Bytes.toHexOrThrow(bytes) === "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 *
 * @since 2.0.0
 * @category transformation
 */
export const toBytes: Serialization.ToBytes<ScriptHash> = (
  scriptHash: ScriptHash,
) => Hex.toBytes(scriptHash.hash);

/**
 * Construct a ScriptHash from a hex string.
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const hash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const scriptHashEffect = ScriptHash.make(hash);
 * const scriptHash = Effect.runSync(scriptHashEffect);
 * assert(scriptHash._tag === "ScriptHash");
 * assert(scriptHash.hash === hash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const make: Serialization.Make<ScriptHash, ScriptHashError> = (
  input: string,
) =>
  pipe(
    Hex.make(input),
    Effect.mapError(
      () =>
        new ScriptHashError({
          message: `ScriptHash hex string must be a valid hex string. Got ${input}.`,
          reason: "InvalidHexFormat",
        }),
    ),
    Effect.filterOrFail(
      (h) => h.length === SCRIPTHASH_HEX_LENGTH,
      (actualHash) =>
        new ScriptHashError({
          message: `ScriptHash hex string must be ${SCRIPTHASH_HEX_LENGTH} characters long. Got ${actualHash.length}.`,
          reason: "InvalidHexLength",
        }),
    ),
    Effect.map(
      (hex) => new ScriptHash({ hash: hex }, { disableValidation: true }),
    ),
  );

/**
 * Construct a ScriptHash from a hex string, throws on error.
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const hash = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
 * const scriptHash = ScriptHash.makeOrThrow(hash);
 * assert(scriptHash._tag === "ScriptHash");
 * assert(scriptHash.hash === hash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const makeOrThrow: Serialization.MakeOrThrow<string, ScriptHash> = (
  input,
) => Effect.runSync(make(input));

/**
 * Check if two ScriptHash instances are equal.
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const hash1 = ScriptHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const hash2 = ScriptHash.makeOrThrow("c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f");
 * const hash3 = ScriptHash.makeOrThrow("2cc106ddd406fe57fd1ec4025f5a03a3fd0701bd0204fc3c00bef952");
 *
 * assert(ScriptHash.equals(hash1, hash2) === true);
 * assert(ScriptHash.equals(hash1, hash3) === false);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: ScriptHash, b: ScriptHash): boolean =>
  a.hash === b.hash;

/**
 * Generate a random ScriptHash.
 *
 * @example
 * import { ScriptHash } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(ScriptHash.generator, 20);
 * randomSamples.forEach((scriptHash) => {
 *  assert(scriptHash.hash.length === 56);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: SCRIPTHASH_BYTES_LENGTH,
  maxLength: SCRIPTHASH_BYTES_LENGTH,
}).map((bytes) => fromBytesOrThrow(bytes));
