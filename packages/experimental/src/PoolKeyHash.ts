import { Schema, Data, FastCheck, pipe } from "effect";
import * as Hash28 from "./Hash28.js";
import { createEncoders } from "./Codec.js";

/**
 * Error class for PoolKeyHash related operations.
 *
 * @example
 * import { PoolKeyHashError } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new PoolKeyHashError({ message: "Invalid pool key hash" });
 * assert(error.message === "Invalid pool key hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class PoolKeyHashError extends Data.TaggedError("PoolKeyHashError")<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * PoolKeyHash is a 28-byte hash representing a stake pool's verification key.
 * pool_keyhash = hash28
 *
 * @since 2.0.0
 * @category schemas
 */
export const PoolKeyHash = pipe(
  Hash28.HexSchema,
  Schema.brand("PoolKeyHash")
).annotations({
  identifier: "PoolKeyHash",
});

export type PoolKeyHash = typeof PoolKeyHash.Type;

/**
 * Schema for transforming between Uint8Array and PoolKeyHash.
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesSchema = Schema.compose(
  Hash28.BytesHexTransformer, // Uint8Array -> hex string
  PoolKeyHash // hex string -> PoolKeyHash
).annotations({
  identifier: "PoolKeyHash.Bytes",
});

/**
 * Schema for transforming between hex string and PoolKeyHash.
 *
 * @since 2.0.0
 * @category schemas
 */
export const HexSchema = Schema.compose(
  Hash28.HexSchema, // string -> hex string
  PoolKeyHash // hex string -> PoolKeyHash
).annotations({
  identifier: "PoolKeyHash.Hex",
});

/**
 * Check if two PoolKeyHash instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: PoolKeyHash, b: PoolKeyHash): boolean => a === b;

/**
 * Generate a random PoolKeyHash.
 *
 * @example
 * import { PoolKeyHash } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(PoolKeyHash.generator, 20);
 * randomSamples.forEach((poolKeyHash) => {
 *  assert(poolKeyHash.length === 56);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: Hash28.HASH28_BYTES_LENGTH,
  maxLength: Hash28.HASH28_BYTES_LENGTH,
}).map((bytes) => Codec.Decode.bytes(bytes));

/**
 * Codec utilities for PoolKeyHash encoding and decoding operations.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Codec = createEncoders(
  {
    bytes: BytesSchema,
    hex: HexSchema,
  },
  PoolKeyHashError
);
