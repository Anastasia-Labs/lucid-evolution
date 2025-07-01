import { pipe, Schema, Data, FastCheck } from "effect";

/**
 * Constants for NonZeroInt64 validation.
 * negInt64 = -9223372036854775808 .. -1
 * posInt64 = 1 .. 9223372036854775807
 * nonZeroInt64 = negInt64/ posInt64
 *
 * @since 2.0.0
 * @category constants
 */
export const NEG_INT64_MIN = -9223372036854775808n;
export const NEG_INT64_MAX = -1n;
export const POS_INT64_MIN = 1n;
export const POS_INT64_MAX = 9223372036854775807n;

/**
 * Error class for NonZeroInt64 related operations.
 *
 * @example
 * import { NonZeroInt64 } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new NonZeroInt64.NonZeroInt64Error({ message: "Invalid non-zero int64" });
 * assert(error.message === "Invalid non-zero int64");
 *
 * @since 2.0.0
 * @category errors
 */
export class NonZeroInt64Error extends Data.TaggedError("NonZeroInt64Error")<{
  message?: string;
  reason?: "ZeroValue" | "OutOfRange" | "InvalidValue";
}> {}

/**
 * Schema for validating negative 64-bit integers (-9223372036854775808 to -1).
 *
 * @since 2.0.0
 * @category schemas
 */
export const NegInt64Schema = pipe(
  Schema.BigIntFromSelf,
  Schema.filter((value) => value >= NEG_INT64_MIN && value <= NEG_INT64_MAX),
).annotations({
  message: (issue) =>
    `NegInt64 must be between ${NEG_INT64_MIN} and ${NEG_INT64_MAX}, but got ${issue.actual}`,
  identifier: "NegInt64",
});

/**
 * Schema for validating positive 64-bit integers (1 to 9223372036854775807).
 *
 * @since 2.0.0
 * @category schemas
 */
export const PosInt64Schema = pipe(
  Schema.BigIntFromSelf,
  Schema.filter((value) => value >= POS_INT64_MIN && value <= POS_INT64_MAX),
).annotations({
  message: (issue) =>
    `PosInt64 must be between ${POS_INT64_MIN} and ${POS_INT64_MAX}, but got ${issue.actual}`,
  identifier: "PosInt64",
});

/**
 * Schema for NonZeroInt64 representing non-zero 64-bit signed integers.
 * nonZeroInt64 = negInt64/ posInt64
 *
 * @since 2.0.0
 * @category schemas
 */
export const NonZeroInt64Schema = Schema.Union(NegInt64Schema, PosInt64Schema);

/**
 * Type alias for NonZeroInt64 representing non-zero signed 64-bit integers.
 * Used in minting operations where zero amounts are not allowed.
 *
 * @example
 * import { NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const positiveAmount: NonZeroInt64.NonZeroInt64 = 1000n;
 * const negativeAmount: NonZeroInt64.NonZeroInt64 = -500n;
 *
 * @since 2.0.0
 * @category model
 */
export type NonZeroInt64 = typeof NonZeroInt64Schema.Type;

/**
 * Smart constructor for creating NonZeroInt64 values.
 *
 * @example
 * import { NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const positiveValue = NonZeroInt64.make(1000n);
 * const negativeValue = NonZeroInt64.make(-500n);
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (value: bigint): NonZeroInt64 => {
  return Schema.decodeSync(NonZeroInt64Schema)(value);
};

/**
 * Check if a value is a valid NonZeroInt64.
 *
 * @example
 * import { NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * console.log(NonZeroInt64.is(1000n)); // true
 * console.log(NonZeroInt64.is(-500n)); // true
 * console.log(NonZeroInt64.is(0n)); // false
 *
 * @since 2.0.0
 * @category predicates
 */
export const is = (value: unknown): value is NonZeroInt64 =>
  Schema.is(NonZeroInt64Schema)(value);

/**
 * Check if a NonZeroInt64 is positive.
 *
 * @example
 * import { NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const positiveValue = NonZeroInt64.make(1000n);
 * console.log(NonZeroInt64.isPositive(positiveValue)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isPositive = (value: NonZeroInt64): boolean => value > 0n;

/**
 * Check if a NonZeroInt64 is negative.
 *
 * @example
 * import { NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const negativeValue = NonZeroInt64.make(-500n);
 * console.log(NonZeroInt64.isNegative(negativeValue)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isNegative = (value: NonZeroInt64): boolean => value < 0n;

/**
 * Get the absolute value of a NonZeroInt64.
 *
 * @example
 * import { NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const negativeValue = NonZeroInt64.make(-500n);
 * const absoluteValue = NonZeroInt64.abs(negativeValue);
 * console.log(absoluteValue); // 500n
 *
 * @since 2.0.0
 * @category transformation
 */
export const abs = (value: NonZeroInt64): NonZeroInt64 =>
  value < 0n ? make(-value) : value;

/**
 * Negate a NonZeroInt64.
 *
 * @example
 * import { NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const positiveValue = NonZeroInt64.make(1000n);
 * const negatedValue = NonZeroInt64.negate(positiveValue);
 * console.log(negatedValue); // -1000n
 *
 * @since 2.0.0
 * @category transformation
 */
export const negate = (value: NonZeroInt64): NonZeroInt64 => make(-value);

/**
 * Compare two NonZeroInt64 values.
 *
 * @example
 * import { NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const value1 = NonZeroInt64.make(100n);
 * const value2 = NonZeroInt64.make(200n);
 * console.log(NonZeroInt64.compare(value1, value2)); // -1 (value1 < value2)
 *
 * @since 2.0.0
 * @category ordering
 */
export const compare = (a: NonZeroInt64, b: NonZeroInt64): -1 | 0 | 1 => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * Check if two NonZeroInt64 values are equal.
 *
 * @example
 * import { NonZeroInt64 } from "@lucid-evolution/experimental";
 *
 * const value1 = NonZeroInt64.make(1000n);
 * const value2 = NonZeroInt64.make(1000n);
 * console.log(NonZeroInt64.equals(value1, value2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: NonZeroInt64, b: NonZeroInt64): boolean => a === b;

/**
 * Generate a random NonZeroInt64.
 *
 * @example
 * import { NonZeroInt64 } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(NonZeroInt64.generator, 10);
 * randomSamples.forEach((value) => {
 *   assert(value !== 0n);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.oneof(
  FastCheck.bigInt({ min: NEG_INT64_MIN, max: NEG_INT64_MAX }),
  FastCheck.bigInt({ min: POS_INT64_MIN, max: POS_INT64_MAX }),
);
