import { Schema, Data, FastCheck, Inspectable } from "effect";
import * as Hex from "./Hex.js";
import * as Hash28 from "./Hash28.js";

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

declare const NominalType: unique symbol;
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
  hash: Hash28.HexString,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "ScriptHash",
      hash: this.hash,
    };
  }
}

export const Bytes = Schema.transform(Hash28.Bytes, ScriptHash, {
  strict: true,
  encode: (_toI, toA) => Hex.toBytes(toA.hash),
  decode: (_fromI, fromA) => new ScriptHash({ hash: Hex.fromBytes(fromA) }),
});

export const HexString = Schema.transform(Hash28.HexString, ScriptHash, {
  strict: true,
  encode: (_toI, toA) => toA.hash,
  decode: (fromI) => new ScriptHash({ hash: fromI }),
});

/**
 * Check if two ScriptHash instances are equal.
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
  minLength: Hash28.HASH28_BYTES_LENGTH,
  maxLength: Hash28.HASH28_BYTES_LENGTH,
}).map((bytes) => new ScriptHash({ hash: Hex.fromBytes(bytes) }));


/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(HexString),
  bytes: Schema.encodeSync(Bytes),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  hex: Schema.decodeUnknownSync(HexString),
  bytes: Schema.decodeUnknownSync(Bytes),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  hex: Schema.encodeEither(HexString),
  bytes: Schema.encodeEither(Bytes),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  hex: Schema.decodeUnknownEither(HexString),
  bytes: Schema.decodeUnknownEither(Bytes),
};

