import { Schema, Data, FastCheck } from "effect";
import * as CBOR from "./CBOR.js";

/**
 * Error class for UnitInterval related operations.
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new UnitInterval.UnitIntervalError({ message: "Invalid unit interval" });
 * assert(error.message === "Invalid unit interval");
 *
 * @since 2.0.0
 * @category errors
 */
export class UnitIntervalError extends Data.TaggedError("UnitIntervalError")<{
  message?: string;
  reason?:
    | "InvalidNumerator"
    | "InvalidDenominator"
    | "DenominatorZero"
    | "InvalidRange";
}> {}

/**
 * Schema for UnitInterval representing a fractional value between 0 and 1.
 * unit_interval = #6.30([uint, uint])
 * Constraints:
 * 1. numerator <= denominator
 * 2. denominator > 0
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * const ratio = new UnitInterval.UnitInterval({
 *   numerator: 1n,
 *   denominator: 2n
 * });
 * console.log(ratio.numerator); // 1n
 * console.log(ratio.denominator); // 2n
 *
 * @since 2.0.0
 * @category model
 */
export class UnitInterval extends Schema.TaggedClass<UnitInterval>()(
  "UnitInterval",
  {
    numerator: Schema.BigIntFromSelf.pipe(
      Schema.filter((n) => n >= 0n),
    ).annotations({
      message: () => "numerator must be non-negative",
    }),
    denominator: Schema.BigIntFromSelf.pipe(
      Schema.filter((d) => d > 0n),
    ).annotations({
      message: () => "denominator must be positive",
    }),
  },
) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: "UnitInterval",
      numerator: this.numerator,
      denominator: this.denominator,
    };
  }
}

/**
 * CBOR bytes transformation schema for UnitInterval.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = undefined;

/**
 * CBOR hex transformation schema for UnitInterval.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = undefined;

/**
 * Create a UnitInterval from numerator and denominator.
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * const half = UnitInterval.make(1n, 2n);
 * console.log(half.numerator); // 1n
 * console.log(half.denominator); // 2n
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (numerator: bigint, denominator: bigint): UnitInterval => {
  if (denominator <= 0n) {
    throw new UnitIntervalError({
      message: "denominator must be positive",
      reason: "DenominatorZero",
    });
  }
  if (numerator > denominator) {
    throw new UnitIntervalError({
      message: `numerator (${numerator}) must be <= denominator (${denominator})`,
      reason: "InvalidRange",
    });
  }
  return new UnitInterval({ numerator, denominator });
};

/**
 * Check if two UnitInterval instances are equal.
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * const a = UnitInterval.make(1n, 2n);
 * const b = UnitInterval.make(1n, 2n);
 * console.log(UnitInterval.equals(a, b)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: UnitInterval, b: UnitInterval): boolean =>
  a.numerator === b.numerator && a.denominator === b.denominator;

/**
 * Convert UnitInterval to decimal value.
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * const half = UnitInterval.make(1n, 2n);
 * console.log(UnitInterval.toDecimal(half)); // 0.5
 *
 * @since 2.0.0
 * @category transformation
 */
export const toDecimal = (interval: UnitInterval): number =>
  Number(interval.numerator) / Number(interval.denominator);

/**
 * Create UnitInterval from decimal value (approximate).
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * const half = UnitInterval.fromDecimal(0.5);
 * console.log(half.numerator); // 1n
 * console.log(half.denominator); // 2n
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromDecimal = (value: number): UnitInterval => {
  if (value < 0 || value > 1) {
    throw new UnitIntervalError({
      message: `value must be between 0 and 1, got ${value}`,
      reason: "InvalidRange",
    });
  }

  // Convert to fraction with reasonable precision
  const precision = 1000000n; // 6 decimal places
  const numerator = BigInt(Math.round(value * Number(precision)));
  return make(numerator, precision);
};

/**
 * Generate a random UnitInterval.
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(UnitInterval.generator, 20);
 * randomSamples.forEach((interval) => {
 *   assert(interval.numerator <= interval.denominator);
 *   assert(interval.denominator > 0n);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.bigInt({ min: 1n, max: 1000000n }).chain(
  (denominator) =>
    FastCheck.bigInt({ min: 0n, max: denominator }).map(
      (numerator) => new UnitInterval({ numerator, denominator }),
    ),
);

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  bytes: Schema.encodeSync(CBORBytesSchema),
  hex: Schema.encodeSync(CBORHexSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  bytes: Schema.decodeUnknownSync(CBORBytesSchema),
  hex: Schema.decodeUnknownSync(CBORHexSchema),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  bytes: Schema.encodeEither(CBORBytesSchema),
  hex: Schema.encodeEither(CBORHexSchema),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  bytes: Schema.decodeUnknownEither(CBORBytesSchema),
  hex: Schema.decodeUnknownEither(CBORHexSchema),
};
