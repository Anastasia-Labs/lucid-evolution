import { Schema, Data, FastCheck } from "effect";
import * as Coin from "./Coin.js";

/**
 * Error class for PositiveCoin related operations.
 *
 * @example
 * import { PositiveCoin } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new PositiveCoin.PositiveCoinError({ message: "Invalid positive coin amount" });
 * assert(error.message === "Invalid positive coin amount");
 *
 * @since 2.0.0
 * @category errors
 */
export class PositiveCoinError extends Data.TaggedError("PositiveCoinError")<{
  message?: string;
  reason?: "InvalidAmount" | "ZeroAmount" | "ExceedsMaxValue";
}> {}

/**
 * Minimum value for a positive coin amount.
 *
 * @since 2.0.0
 * @category constants
 */
export const MIN_POSITIVE_COIN_VALUE = 1n;

/**
 * Maximum value for a positive coin amount (maxWord64).
 *
 * @since 2.0.0
 * @category constants
 */
export const MAX_POSITIVE_COIN_VALUE = Coin.MAX_COIN_VALUE;

/**
 * Schema for validating positive coin amounts.
 * positive_coin = 1 .. maxWord64
 *
 * @since 2.0.0
 * @category schemas
 */
export const PositiveCoinSchema = Schema.BigIntFromSelf.pipe(
  Schema.filter(
    (value) =>
      value >= MIN_POSITIVE_COIN_VALUE && value <= MAX_POSITIVE_COIN_VALUE,
  ),
).annotations({
  message: (issue) =>
    `PositiveCoin must be between ${MIN_POSITIVE_COIN_VALUE} and ${MAX_POSITIVE_COIN_VALUE}, but got ${issue.actual}`,
  identifier: "PositiveCoin",
});

/**
 * Type alias for PositiveCoin representing positive amounts of native assets.
 * Used in multiasset maps where zero amounts are not allowed.
 *
 * @example
 * import { PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const positiveCoinAmount: PositiveCoin.PositiveCoin = 1000000n; // 1 ADA in lovelace
 * console.log(positiveCoinAmount); // 1000000n
 *
 * @since 2.0.0
 * @category model
 */
export type PositiveCoin = typeof PositiveCoinSchema.Type;

/**
 * Smart constructor for creating PositiveCoin values.
 *
 * @example
 * import { PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const positiveCoin = PositiveCoin.make(1000000n); // 1 ADA in lovelace
 * console.log(positiveCoin); // 1000000n
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (value: bigint): PositiveCoin =>
  PositiveCoinSchema.make(value);

/**
 * Create a PositiveCoin from a regular Coin, throwing if the value is zero.
 *
 * @example
 * import { PositiveCoin, Coin } from "@lucid-evolution/experimental";
 *
 * const coin = Coin.make(1000000n);
 * const positiveCoin = PositiveCoin.fromCoin(coin);
 * console.log(positiveCoin); // 1000000n
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromCoin = (coin: Coin.Coin): PositiveCoin => {
  if (coin === 0n) {
    throw new PositiveCoinError({
      message: "Cannot create PositiveCoin from zero coin amount",
      reason: "ZeroAmount",
    });
  }
  return make(coin);
};

/**
 * Convert a PositiveCoin to a regular Coin.
 *
 * @example
 * import { PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const positiveCoin = PositiveCoin.make(1000000n);
 * const coin = PositiveCoin.toCoin(positiveCoin);
 * console.log(coin); // 1000000n
 *
 * @since 2.0.0
 * @category transformation
 */
export const toCoin = (positiveCoin: PositiveCoin): Coin.Coin => positiveCoin;

/**
 * Check if a value is a valid PositiveCoin.
 *
 * @example
 * import { PositiveCoin } from "@lucid-evolution/experimental";
 *
 * console.log(PositiveCoin.is(1000000n)); // true
 * console.log(PositiveCoin.is(0n)); // false
 * console.log(PositiveCoin.is(-1n)); // false
 *
 * @since 2.0.0
 * @category predicates
 */
export const is = (value: unknown): value is PositiveCoin =>
  Schema.is(PositiveCoinSchema)(value);

/**
 * Add two positive coin amounts safely.
 *
 * @example
 * import { PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const coin1 = PositiveCoin.make(1000000n);
 * const coin2 = PositiveCoin.make(2000000n);
 * const result = PositiveCoin.add(coin1, coin2);
 * console.log(result); // 3000000n
 *
 * @since 2.0.0
 * @category transformation
 */
export const add = (a: PositiveCoin, b: PositiveCoin): PositiveCoin => {
  const result = a + b;
  if (result > MAX_POSITIVE_COIN_VALUE) {
    throw new PositiveCoinError({
      message: `Addition overflow: ${a} + ${b} exceeds maximum positive coin value`,
      reason: "ExceedsMaxValue",
    });
  }
  return result;
};

/**
 * Subtract two positive coin amounts safely.
 * Note: Result must still be positive.
 *
 * @example
 * import { PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const coin1 = PositiveCoin.make(3000000n);
 * const coin2 = PositiveCoin.make(1000000n);
 * const result = PositiveCoin.subtract(coin1, coin2);
 * console.log(result); // 2000000n
 *
 * @since 2.0.0
 * @category transformation
 */
export const subtract = (a: PositiveCoin, b: PositiveCoin): PositiveCoin => {
  const result = a - b;
  if (result <= 0n) {
    throw new PositiveCoinError({
      message: `Subtraction underflow: ${a} - ${b} results in non-positive value`,
      reason: "ZeroAmount",
    });
  }
  return result;
};

/**
 * Compare two positive coin amounts.
 *
 * @example
 * import { PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const coin1 = PositiveCoin.make(1000000n);
 * const coin2 = PositiveCoin.make(2000000n);
 * console.log(PositiveCoin.compare(coin1, coin2)); // -1 (coin1 < coin2)
 * console.log(PositiveCoin.compare(coin2, coin1)); // 1 (coin2 > coin1)
 * console.log(PositiveCoin.compare(coin1, coin1)); // 0 (equal)
 *
 * @since 2.0.0
 * @category ordering
 */
export const compare = (a: PositiveCoin, b: PositiveCoin): -1 | 0 | 1 => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * Check if two positive coin amounts are equal.
 *
 * @example
 * import { PositiveCoin } from "@lucid-evolution/experimental";
 *
 * const coin1 = PositiveCoin.make(1000000n);
 * const coin2 = PositiveCoin.make(1000000n);
 * console.log(PositiveCoin.equals(coin1, coin2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: PositiveCoin, b: PositiveCoin): boolean => a === b;

/**
 * Generate a random PositiveCoin value.
 *
 * @example
 * import { PositiveCoin } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(PositiveCoin.generator, 10);
 * randomSamples.forEach((coin) => {
 *   assert(coin >= 1n);
 *   assert(coin <= PositiveCoin.MAX_POSITIVE_COIN_VALUE);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.bigInt({
  min: MIN_POSITIVE_COIN_VALUE,
  max: MAX_POSITIVE_COIN_VALUE,
});

/**
 * Synchronous encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  sync: Schema.encodeSync(PositiveCoinSchema),
};

export const Decode = {
  sync: Schema.decodeUnknownSync(PositiveCoinSchema),
};

/**
 * Either encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  either: Schema.encodeEither(PositiveCoinSchema),
};

export const DecodeEither = {
  either: Schema.decodeUnknownEither(PositiveCoinSchema),
};
