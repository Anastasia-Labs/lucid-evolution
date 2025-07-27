import { Schema, Data, FastCheck, pipe } from "effect";
import * as Hash28 from "./Hash28.js";
import { createEncoders } from "./Codec.js";

/**
 * Error class for PolicyId related operations.
 *
 * @example
 * import { PolicyIdError } from "@evolution-sdk/experimental";
 *
 * const error = new PolicyIdError({ message: "Invalid policy id" });
 * console.log(error.message); // "Invalid policy id"
 *
 * @since 2.0.0
 * @category errors
 */
export class PolicyIdError extends Data.TaggedError("PolicyIdError")<{
  message?: string;
  cause?: unknown;
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
 * import { PolicyId } from "@evolution-sdk/experimental";
 *
 * const policyIdHex = "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235";
 * const policyId = PolicyId.Codec.Decode.hex(policyIdHex);
 * console.log(policyId); // "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235"
 *
 * @since 2.0.0
 * @category schemas
 */
export const PolicyId = pipe(
  Hash28.HexSchema,
  Schema.brand("PolicyId"),
).annotations({
  identifier: "PolicyId",
});

export type PolicyId = typeof PolicyId.Type;

/**
 * Schema for transforming between Uint8Array and PolicyId.
 *
 * @since 2.0.0
 * @category schemas
 */
export const FromBytes = Schema.compose(
  Hash28.FromBytes, // Uint8Array -> hex string
  PolicyId, // hex string -> PolicyId
).annotations({
  identifier: "PolicyId.Bytes",
});

/**
 * Schema for transforming between hex string and PolicyId.
 *
 * @since 2.0.0
 * @category schemas
 */
export const FromHex = Schema.compose(
  Hash28.HexSchema, // string -> hex string
  PolicyId, // hex string -> PolicyId
).annotations({
  identifier: "PolicyId.Hex",
});

/**
 * Check if two PolicyId instances are equal.
 *
 * @example
 * import { PolicyId } from "@evolution-sdk/experimental";
 *
 * const policyIdHex = "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235";
 * const policyId1 = PolicyId.Codec.Decode.hex(policyIdHex);
 * const policyId2 = PolicyId.Codec.Decode.hex(policyIdHex);
 * console.log(equals(policyId1, policyId2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: PolicyId, b: PolicyId): boolean => a === b;

/**
 * Generate a random PolicyId.
 *
 * @example
 * import { PolicyId } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 *
 * const randomPolicyId = FastCheck.sample(generator, 1)[0];
 * console.log(typeof randomPolicyId); // string (branded as PolicyId)
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: Hash28.HASH28_BYTES_LENGTH,
  maxLength: Hash28.HASH28_BYTES_LENGTH,
}).map((bytes) => Codec.Decode.bytes(bytes));

/**
 * Codec utilities for PolicyId encoding and decoding operations.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Codec = createEncoders(
  {
    bytes: FromBytes,
    hex: FromHex,
  },
  PolicyIdError,
);
