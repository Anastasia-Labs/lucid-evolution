import { FastCheck, Inspectable, Schema } from "effect";

/**
 * Natural number constructors
 * Used for validating non negative integers
 *
 * @since 2.0.0
 */
export const Natural = Schema.Positive.pipe(Schema.brand("Natural"));

export type Natural = typeof Natural.Type;

/**
 * Check if the given value is a valid PositiveNumber
 *
 * @example
 * import { Positive } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const positive = Positive.makeOrThrow(42);
 * assert(positive.number === 42);
 *
 * @since 2.0.0
 * @category predicates
 */
export const makeOrThrow = (number: number): Natural => {
  return Natural.make(number);
};

export const generator = FastCheck.integer({
  min: 0,
  max: Number.MAX_SAFE_INTEGER,
}).map((number) => makeOrThrow(number));
