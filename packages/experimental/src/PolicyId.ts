import { Schema, Data, FastCheck } from "effect";
import * as Bytes from "./Bytes.js";
import * as Hash28 from "./Hash28.js";

/**
 * Error class for PolicyId related operations.
 *
 * @example
 * import { PolicyId } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new PolicyId.PolicyIdError({ message: "Invalid policy id" });
 * assert(error.message === "Invalid policy id");
 *
 * @since 2.0.0
 * @category errors
 */
export class PolicyIdError extends Data.TaggedError("PolicyIdError")<{
  message?: string;
  reason?:
    | "InvalidHexLength"
    | "InvalidBytesLength"
    | "InvalidHexFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * Schema for PolicyId representing a minting policy identifier.
 * A PolicyId is a script hash (hash28) that identifies a minting policy.
 *
 * Note: PolicyId is equivalent to ScriptHash as defined in the CDDL:
 * policy_id = script_hash
 * script_hash = hash28
 *
 * @example
 * import { PolicyId } from "@lucid-evolution/experimental";
 *
 * const policyId = new PolicyId({
 *   hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235"
 * });
 * console.log(policyId.hash); // "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235"
 *
 * @since 2.0.0
 * @category model
 */
export const PolicyId = Hash28.HexSchema.pipe(
  Schema.brand("PolicyId"),
  Schema.annotations({
    identifier: "PolicyId",
    message: (issue) =>
      `PolicyId ${issue.actual} must be a valid hex string of length ${Hash28.HASH28_HEX_LENGTH}, but got ${(issue.actual as string).length}`,
  }),
);
export type PolicyId = typeof PolicyId.Type;

/**
 * Schema for transforming between Uint8Array and PolicyId.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const BytesSchema = Schema.transform(Hash28.BytesSchema, PolicyId, {
  strict: true,
  encode: (_, policyId) => Bytes.Decode.hex(policyId),
  decode: (bytes) => PolicyId.make(Bytes.Encode.hex(bytes)),
});

/**
 * Schema for transforming between hex string and PolicyId.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const HexSchema = Schema.transform(Schema.String, PolicyId, {
  strict: true,
  encode: (_, policyId) => policyId,
  decode: (hash) => PolicyId.make(hash),
});

/**
 * Check if two PolicyId instances are equal.
 *
 * @example
 * import { PolicyId } from "@lucid-evolution/experimental";
 *
 * const policyId1 = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * const policyId2 = new PolicyId({ hash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235" });
 * console.log(PolicyId.equals(policyId1, policyId2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: PolicyId, b: PolicyId): boolean => a === b;

/**
 * Generate a random PolicyId.
 *
 * @example
 * import { PolicyId } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(PolicyId.generator, 20);
 * randomSamples.forEach((policyId) => {
 *   assert(policyId.hash.length === 56);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: Hash28.HASH28_BYTES_LENGTH,
  maxLength: Hash28.HASH28_BYTES_LENGTH,
}).map((bytes) => PolicyId.make(Bytes.Encode.hex(bytes)));

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
  string: Schema.decodeSync(HexSchema),
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
