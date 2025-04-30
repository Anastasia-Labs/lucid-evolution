import { FastCheck, Schema } from "effect";

/**
 * Natural number constructors
 * Used for validating positive integers
 *
 * @since 2.0.0
 */
export class Natural extends Schema.Class<Natural>("Natural")({
  number: Schema.NonNegative,
}) {}

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
  return new Natural({ number });
};

export const generator = FastCheck.integer({
  min: 1,
  max: Number.MAX_SAFE_INTEGER,
}).map((number) => makeOrThrow(number));
