import { Schema, Data, FastCheck } from "effect";
import * as Bytes from "./Bytes.js";
import * as Hash28 from "./Hash28.js";

/**
 * Error class for ScriptHash related operations.
 *
 * @example
 * import { ScriptHash } from "@evolution-sdk/experimental";
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

/**
 * Schema for ScriptHash representing a script hash credential.
 * script_hash = hash28
 * Follows CIP-0019 binary representation.
 *
 * @since 2.0.0
 * @category schemas
 */
export const ScriptHash = Hash28.HexSchema.pipe(Schema.brand("ScriptHash"));
export type ScriptHash = typeof ScriptHash.Type;

export const BytesSchema = Schema.transform(Hash28.BytesSchema, ScriptHash, {
  strict: true,
  encode: (_, toA) => Bytes.Decode.hex(toA),
  decode: (_, fromA) => Schema.decodeSync(ScriptHash)(Bytes.Encode.hex(fromA)),
});

export const HexSchema = Schema.transform(
  Schema.typeSchema(Hash28.HexSchema),
  ScriptHash,
  {
    strict: true,
    encode: (_, toA) => toA,
    decode: (fromI) => Schema.decodeSync(ScriptHash)(fromI),
  },
);

/**
 * Check if two ScriptHash instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: ScriptHash, b: ScriptHash): boolean => a === b;

/**
 * Generate a random ScriptHash.
 *
 * @example
 * import { ScriptHash } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(ScriptHash.generator, 20);
 * randomSamples.forEach((scriptHash) => {
 *  assert(scriptHash.length === 56);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: Hash28.HASH28_BYTES_LENGTH,
  maxLength: Hash28.HASH28_BYTES_LENGTH,
}).map((bytes) => ScriptHash.make(Bytes.Encode.hex(bytes)));

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
