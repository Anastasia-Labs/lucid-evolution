import { Schema, Data, FastCheck } from "effect";

/**
 * Error class for Coin related operations.
 *
 * @example
 * import { Coin } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new Coin.CoinError({ message: "Invalid coin amount" });
 * assert(error.message === "Invalid coin amount");
 *
 * @since 2.0.0
 * @category errors
 */
export class CoinError extends Data.TaggedError("CoinError")<{
  message?: string;
  reason?: "InvalidAmount" | "NegativeAmount" | "ExceedsMaxValue";
}> {}

/**
 * Maximum value for a coin amount (maxWord64).
 *
 * @since 2.0.0
 * @category constants
 */
export const MAX_COIN_VALUE = 18446744073709551615n;

/**
 * Schema for validating coin amounts as unsigned 64-bit integers.
 * coin = uint
 *
 * @since 2.0.0
 * @category schemas
 */
export const CoinSchema = Schema.BigIntFromSelf.pipe(
  Schema.filter((value) => value >= 0n && value <= MAX_COIN_VALUE),
).annotations({
  message: (issue) =>
    `Coin must be between 0 and ${MAX_COIN_VALUE}, but got ${issue.actual}`,
  identifier: "Coin",
});

/**
 * Type alias for Coin representing ADA amounts in lovelace.
 * 1 ADA = 1,000,000 lovelace
 *
 * @example
 * import { Coin } from "@evolution-sdk/experimental";
 *
 * const coinAmount: Coin.Coin = 1000000n; // 1 ADA in lovelace
 * console.log(coinAmount); // 1000000n
 *
 * @since 2.0.0
 * @category model
 */
export type Coin = typeof CoinSchema.Type;

/**
 * Smart constructor for creating Coin values.
 *
 * @example
 * import { Coin } from "@evolution-sdk/experimental";
 *
 * const coin = Coin.make(1000000n); // 1 ADA in lovelace
 * console.log(coin); // 1000000n
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (value: bigint): Coin => CoinSchema.make(value);

/**
 * Check if a value is a valid Coin.
 *
 * @example
 * import { Coin } from "@evolution-sdk/experimental";
 *
 * console.log(Coin.is(1000000n)); // true
 * console.log(Coin.is(-1n)); // false
 * console.log(Coin.is(Coin.MAX_COIN_VALUE + 1n)); // false
 *
 * @since 2.0.0
 * @category predicates
 */
export const is = (value: unknown): value is Coin =>
  Schema.is(CoinSchema)(value);

/**
 * Add two coin amounts safely.
 *
 * @example
 * import { Coin } from "@evolution-sdk/experimental";
 *
 * const coin1 = Coin.make(1000000n);
 * const coin2 = Coin.make(2000000n);
 * const result = Coin.add(coin1, coin2);
 * console.log(result); // 3000000n
 *
 * @since 2.0.0
 * @category transformation
 */
export const add = (a: Coin, b: Coin): Coin => {
  const result = a + b;
  if (result > MAX_COIN_VALUE) {
    throw new CoinError({
      message: `Addition overflow: ${a} + ${b} exceeds maximum coin value`,
      reason: "ExceedsMaxValue",
    });
  }
  return result;
};

/**
 * Subtract two coin amounts safely.
 *
 * @example
 * import { Coin } from "@evolution-sdk/experimental";
 *
 * const coin1 = Coin.make(3000000n);
 * const coin2 = Coin.make(1000000n);
 * const result = Coin.subtract(coin1, coin2);
 * console.log(result); // 2000000n
 *
 * @since 2.0.0
 * @category transformation
 */
export const subtract = (a: Coin, b: Coin): Coin => {
  const result = a - b;
  if (result < 0n) {
    throw new CoinError({
      message: `Subtraction underflow: ${a} - ${b} results in negative value`,
      reason: "NegativeAmount",
    });
  }
  return result;
};

/**
 * Compare two coin amounts.
 *
 * @example
 * import { Coin } from "@evolution-sdk/experimental";
 *
 * const coin1 = Coin.make(1000000n);
 * const coin2 = Coin.make(2000000n);
 * console.log(Coin.compare(coin1, coin2)); // -1 (coin1 < coin2)
 * console.log(Coin.compare(coin2, coin1)); // 1 (coin2 > coin1)
 * console.log(Coin.compare(coin1, coin1)); // 0 (equal)
 *
 * @since 2.0.0
 * @category ordering
 */
export const compare = (a: Coin, b: Coin): -1 | 0 | 1 => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * Check if two coin amounts are equal.
 *
 * @example
 * import { Coin } from "@evolution-sdk/experimental";
 *
 * const coin1 = Coin.make(1000000n);
 * const coin2 = Coin.make(1000000n);
 * console.log(Coin.equals(coin1, coin2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: Coin, b: Coin): boolean => a === b;

/**
 * Generate a random Coin value.
 *
 * @example
 * import { Coin } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(Coin.generator, 10);
 * randomSamples.forEach((coin) => {
 *   assert(coin >= 0n);
 *   assert(coin <= Coin.MAX_COIN_VALUE);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.bigInt({
  min: 0n,
  max: MAX_COIN_VALUE,
});

/**
 * Synchronous encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  sync: Schema.encodeSync(CoinSchema),
};

export const Decode = {
  sync: Schema.decodeUnknownSync(CoinSchema),
};

/**
 * Either encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  either: Schema.encodeEither(CoinSchema),
};

export const DecodeEither = {
  either: Schema.decodeUnknownEither(CoinSchema),
};
