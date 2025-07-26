import { Schema, Data } from "effect";
import * as Numeric from "./Numeric.js";

/**
 * CDDL specification:
 * epoch_no = uint .size 8
 *
 */

/**
 * Error class for EpochNo related operations.
 *
 * @example
 * import { EpochNo } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new EpochNo.EpochNoError({ message: "Invalid epoch number" });
 * assert(error.message === "Invalid epoch number");
 *
 * @since 2.0.0
 * @category errors
 */
export class EpochNoError extends Data.TaggedError("EpochNoError")<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * Schema for validating epoch numbers (0-255).
 *
 * @since 2.0.0
 * @category schemas
 */
export const EpochNoSchema = Numeric.Uint8Schema.pipe(Schema.brand("EpochNo"));

/**
 * Type alias for EpochNo representing blockchain epoch numbers.
 *
 * @example
 * import { EpochNo } from "@evolution-sdk/experimental";
 *
 * const epoch: EpochNo.EpochNo = 123;
 * console.log(epoch); // 123
 *
 * @since 2.0.0
 * @category model
 */
export type EpochNo = typeof EpochNoSchema.Type;

/**
 * Smart constructor for creating EpochNo values.
 *
 * @example
 * import { EpochNo } from "@evolution-sdk/experimental";
 *
 * const epoch = EpochNo.make(123);
 * console.log(epoch); // 123
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = EpochNoSchema.make;

/**
 * Check if a value is a valid EpochNo.
 *
 * @example
 * import { EpochNo } from "@evolution-sdk/experimental";
 *
 * console.log(EpochNo.is(123)); // true
 * console.log(EpochNo.is(-1)); // false
 * console.log(EpochNo.is(256)); // false
 *
 * @since 2.0.0
 * @category predicates
 */
export const is = Schema.is(EpochNoSchema);

/**
 * Check if two EpochNo instances are equal.
 *
 * @example
 * import { EpochNo } from "@evolution-sdk/experimental";
 *
 * const epoch1 = EpochNo.make(123);
 * const epoch2 = EpochNo.make(123);
 * console.log(EpochNo.equals(epoch1, epoch2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: EpochNo, b: EpochNo): boolean => a === b;

/**
 * Compare two EpochNo values.
 *
 * @example
 * import { EpochNo } from "@evolution-sdk/experimental";
 *
 * const epoch1 = EpochNo.make(100);
 * const epoch2 = EpochNo.make(200);
 * console.log(EpochNo.compare(epoch1, epoch2)); // -1 (epoch1 < epoch2)
 *
 * @since 2.0.0
 * @category ordering
 */
export const compare = (a: EpochNo, b: EpochNo): -1 | 0 | 1 => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * Generate a random EpochNo.
 *
 * @example
 * import { EpochNo } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(EpochNo.generator, 10);
 * randomSamples.forEach((epoch) => {
 *   assert(epoch >= 0);
 *   assert(epoch <= 255);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = Numeric.Uint8Generator;
