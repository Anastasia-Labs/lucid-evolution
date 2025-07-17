import { Schema, Data, FastCheck, Effect, ParseResult } from "effect";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";

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
 * CDDL schema for UnitInterval as defined in the specification:
 * unit_interval = #6.30([uint, uint])
 *
 * Transforms between CBOR tag structure and UnitInterval model.
 *
 * @since 2.0.0
 * @category schemas
 */
export const UnitIntervalCDDLSchema = Schema.transformOrFail(
  CBOR.Tag,
  Schema.typeSchema(UnitInterval),
  {
    strict: true,
    encode: (unitInterval) =>
      Effect.succeed({
        tag: 30,
        value: [unitInterval.numerator, unitInterval.denominator],
      }),
    decode: (taggedValue) =>
      Effect.gen(function* () {
        // Validate tag number
        if (taggedValue.tag !== 30) {
          return yield* Effect.fail(
            new ParseResult.Type(
              Schema.typeSchema(UnitInterval).ast,
              taggedValue,
              `Expected tag 30 for UnitInterval, got ${taggedValue.tag}`,
            ),
          );
        }

        // Validate that the value is a tuple of two integers
        const tupleValue = yield* ParseResult.decodeUnknown(
          Schema.Tuple(CBOR.Integer, CBOR.Integer),
        )(taggedValue.value);

        const [numerator, denominator] = tupleValue;

        // Validate numerator <= denominator constraint
        if (numerator > denominator) {
          return yield* Effect.fail(
            new ParseResult.Type(
              Schema.typeSchema(UnitInterval).ast,
              taggedValue,
              `numerator (${numerator}) must be <= denominator (${denominator})`,
            ),
          );
        }

        return new UnitInterval({ numerator, denominator });
      }),
  },
);

/**
 * CBOR bytes transformation schema for UnitInterval.
 * Transforms between Uint8Array and UnitInterval using CBOR encoding.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.CBORBytesSchema(options), // Uint8Array → CBOR
    UnitIntervalCDDLSchema, // CBOR → UnitInterval
  );

/**
 * CBOR hex transformation schema for UnitInterval.
 * Transforms between hex string and UnitInterval using CBOR encoding.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.BytesSchema, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → UnitInterval
  );

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
 * Create a UnitInterval from a percentage (0-100).
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * const fiftyPercent = UnitInterval.fromPercentage(50);
 * console.log(UnitInterval.toDecimal(fiftyPercent)); // 0.5
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromPercentage = (percentage: number): UnitInterval => {
  if (percentage < 0 || percentage > 100) {
    throw new UnitIntervalError({
      message: `percentage must be between 0 and 100, got ${percentage}`,
      reason: "InvalidRange",
    });
  }
  return fromDecimal(percentage / 100);
};

/**
 * Convert UnitInterval to percentage (0-100).
 *
 * @example
 * import { UnitInterval } from "@lucid-evolution/experimental";
 *
 * const half = UnitInterval.make(1n, 2n);
 * console.log(UnitInterval.toPercentage(half)); // 50
 *
 * @since 2.0.0
 * @category transformation
 */
export const toPercentage = (interval: UnitInterval): number =>
  toDecimal(interval) * 100;

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

export const Codec = (options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS) => ({
  Encode: {
    cborBytes: Schema.encodeSync(CBORBytesSchema(options)),
    cborHex: Schema.encodeSync(CBORHexSchema(options)),
  },
  Decode: {
    cborBytes: Schema.decodeUnknownSync(CBORBytesSchema(options)),
    cborHex: Schema.decodeUnknownSync(CBORHexSchema(options)),
  },
  EncodeEither: {
    cborBytes: Schema.encodeEither(CBORBytesSchema(options)),
    cborHex: Schema.encodeEither(CBORHexSchema(options)),
  },
  DecodeEither: {
    cborBytes: Schema.decodeEither(CBORBytesSchema(options)),
    cborHex: Schema.decodeEither(CBORHexSchema(options)),
  },
  EncodeEffect: {
    cborBytes: Schema.encode(CBORBytesSchema(options)),
    cborHex: Schema.encode(CBORHexSchema(options)),
  },
  DecodeEffect: {
    cborBytes: Schema.decode(CBORBytesSchema(options)),
    cborHex: Schema.decode(CBORHexSchema(options)),
  },
});
