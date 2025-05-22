import { Schema, Data, FastCheck, pipe, Inspectable } from "effect";
import * as Hex from "./Hex.js";

/**
 * The length in bytes of a ScriptHash.
 *
 * @since 2.0.0
 * @category constants
 */
const SCRIPTHASH_BYTES_LENGTH = 28;

/**
 * The length in hex characters of a ScriptHash.
 *
 * @since 2.0.0
 * @category constants
 */
const SCRIPTHASH_HEX_LENGTH = 56;

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
class ScriptHashError extends Data.TaggedError("ScriptHashError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

declare const NominalType: unique symbol;
interface ScriptHash {
  readonly [NominalType]: unique symbol;
}

/**
 * Schema for ScriptHash representing a script hash credential.
 * Follows CIP-0019 binary representation.
 *
 * @since 2.0.0
 * @category schemas
 */
class ScriptHash extends Schema.TaggedClass<ScriptHash>()("ScriptHash", {
  hash: Hex.HexString,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "ScriptHash",
      hash: this.hash,
    };
  }
}

const ScriptHashBytes = pipe(
  Schema.Uint8Array,
  Schema.filter((a) => a.length === SCRIPTHASH_BYTES_LENGTH),
  Schema.typeSchema,
).annotations({
  message: (issue) =>
    `${issue.actual} must be a byte array of length ${SCRIPTHASH_BYTES_LENGTH}`,
  identifier: "ScriptHashBytes",
});

const Bytes = Schema.transform(ScriptHashBytes, ScriptHash, {
  strict: true,
  encode: (_toI, toA) => Hex.toBytes(toA.hash),
  decode: (_fromI, fromA) => new ScriptHash({ hash: Hex.fromBytes(fromA) }),
});

const ScriptHashFromHex = Schema.transform(Hex.HexString, ScriptHash, {
  strict: true,
  encode: (_toI, toA) => toA.hash,
  decode: (fromI, _fromA) => new ScriptHash({ hash: fromI }),
});

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
const equals = (a: ScriptHash, b: ScriptHash): boolean => a.hash === b.hash;

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
const generator = FastCheck.uint8Array({
  minLength: SCRIPTHASH_BYTES_LENGTH,
  maxLength: SCRIPTHASH_BYTES_LENGTH,
}).map((bytes) => new ScriptHash({ hash: Hex.fromBytes(bytes) }));

export {
  ScriptHash,
  ScriptHashError,
  Bytes,
  ScriptHashFromHex,
  equals,
  generator,
  SCRIPTHASH_BYTES_LENGTH,
  SCRIPTHASH_HEX_LENGTH,
};
