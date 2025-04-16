import { Schema } from "effect";

/**
 * PositiveNumber constructors
 * Used for validating positive integers
 *
 * @since 2.0.0
 */
export class Positive extends Schema.Class<Positive>("Positive")({
  number: Schema.Positive,
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
export const makeOrThrow = (number: number): Positive => {
  return new Positive({ number });
};
