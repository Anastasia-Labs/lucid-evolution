import { Schema, Data, FastCheck, pipe } from "effect";
import * as Bytes32 from "./Bytes32.js";
import { createEncoders } from "./Codec.js";

/**
 * Error class for TransactionHash related operations.
 *
 * @example
 * import { TransactionHashError } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new TransactionHashError({ message: "Invalid transaction hash" });
 * assert(error.message === "Invalid transaction hash");
 *
 * @since 2.0.0
 * @category errors
 */
export class TransactionHashError extends Data.TaggedError(
  "TransactionHashError",
)<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * Schema for TransactionHash.
 * transaction_hash = Bytes32
 *
 * @since 2.0.0
 * @category schemas
 */
export const TransactionHash = pipe(
  Bytes32.HexSchema,
  Schema.brand("TransactionHash"),
).annotations({
  identifier: "TransactionHash",
});

export type TransactionHash = typeof TransactionHash.Type;

/**
 * Schema for transforming between Uint8Array and TransactionHash.
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesSchema = Schema.compose(
  Bytes32.FromBytes, // Uint8Array -> hex string
  TransactionHash, // hex string -> TransactionHash
).annotations({
  identifier: "TransactionHash.Bytes",
});

/**
 * Schema for transforming between hex string and TransactionHash.
 *
 * @since 2.0.0
 * @category schemas
 */
export const HexSchema = Schema.compose(
  Bytes32.HexSchema, // string -> hex string
  TransactionHash, // hex string -> TransactionHash
).annotations({
  identifier: "TransactionHash.Hex",
});

/**
 * Check if two TransactionHash instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: TransactionHash, b: TransactionHash): boolean =>
  a === b;

/**
 * Generate a random TransactionHash.
 *
 * @example
 * import { TransactionHash } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(TransactionHash.generator, 20);
 * randomSamples.forEach((transactionHash) => {
 *  assert(transactionHash.length === 64);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: Bytes32.Bytes32_BYTES_LENGTH,
  maxLength: Bytes32.Bytes32_BYTES_LENGTH,
}).map((bytes) => Codec.Decode.bytes(bytes));

/**
 * Codec utilities for TransactionHash encoding and decoding operations.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Codec = createEncoders(
  {
    bytes: BytesSchema,
    hex: HexSchema,
  },
  TransactionHashError,
);
