import { pipe, Schema, Data, FastCheck } from "effect";
import * as Text from "./Text.js";

/**
 * Constants for Text128 validation.
 * text .size (0 .. 128)
 *
 * @since 2.0.0
 * @category constants
 */
export const TEXT128_MIN_LENGTH = 0;
export const TEXT128_MAX_LENGTH = 128;

/**
 * Error class for Text128 related operations.
 *
 * @example
 * import { Text128 } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new Text128.Text128Error({ message: "Invalid text length" });
 * assert(error.message === "Invalid text length");
 *
 * @since 2.0.0
 * @category errors
 */
export class Text128Error extends Data.TaggedError("Text128Error")<{
  message?: string;
  reason?: "InvalidLength" | "TooLong" | "TooShort";
}> {}

/**
 * Schema for validating text with length between 0 and 128 characters.
 * Uses Text.TextSchema as the base and adds length validation.
 *
 * @since 2.0.0
 * @category schemas
 */
export const TextSchema = pipe(
  Text.TextSchema,
  Schema.filter(
    (text) =>
      text.length >= TEXT128_MIN_LENGTH && text.length <= TEXT128_MAX_LENGTH,
  ),
).annotations({
  message: (issue) =>
    `Text must be between ${TEXT128_MIN_LENGTH} and ${TEXT128_MAX_LENGTH} characters, but got ${(issue.actual as string).length}`,
  identifier: "Text128",
});

/**
 * Type alias for Text128 representing bounded text strings.
 * Used for DNS names, URLs, and other text fields with length limits.
 *
 * @example
 * import { Text128 } from "@lucid-evolution/experimental";
 *
 * const text: Text128.Text128 = "example.com";
 * console.log(text); // "example.com"
 *
 * @since 2.0.0
 * @category model
 */
export type Text128 = typeof TextSchema.Type;

/**
 * Smart constructor for creating Text128 values.
 *
 * @example
 * import { Text128 } from "@lucid-evolution/experimental";
 *
 * const text = Text128.make("example.com");
 * console.log(text); // "example.com"
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (value: string): Text128 => TextSchema.make(value);

/**
 * Check if a value is a valid Text128.
 *
 * @example
 * import { Text128 } from "@lucid-evolution/experimental";
 *
 * console.log(Text128.is("valid")); // true
 * console.log(Text128.is("a".repeat(129))); // false (too long)
 *
 * @since 2.0.0
 * @category predicates
 */
export const is = (value: unknown): value is Text128 =>
  Schema.is(TextSchema)(value);

/**
 * Check if two Text128 instances are equal.
 *
 * @example
 * import { Text128 } from "@lucid-evolution/experimental";
 *
 * const text1 = Text128.make("example.com");
 * const text2 = Text128.make("example.com");
 * console.log(Text128.equals(text1, text2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: Text128, b: Text128): boolean => a === b;

/**
 * Get the length of a Text128 string.
 *
 * @example
 * import { Text128 } from "@lucid-evolution/experimental";
 *
 * const text = Text128.make("example.com");
 * console.log(Text128.length(text)); // 11
 *
 * @since 2.0.0
 * @category transformation
 */
export const length = (text: Text128): number => text.length;

/**
 * Check if a Text128 is empty.
 *
 * @example
 * import { Text128 } from "@lucid-evolution/experimental";
 *
 * const emptyText = Text128.make("");
 * console.log(Text128.isEmpty(emptyText)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isEmpty = (text: Text128): boolean => text.length === 0;

/**
 * Generate a random Text128.
 *
 * @example
 * import { Text128 } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(Text128.generator, 10);
 * randomSamples.forEach((text) => {
 *   assert(text.length >= 0);
 *   assert(text.length <= 128);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.string({
  minLength: TEXT128_MIN_LENGTH,
  maxLength: TEXT128_MAX_LENGTH,
});

/**
 * Synchronous encoding/decoding utilities.
 * Inherits from Text module and adds length validation.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(TextSchema),
};

export const Decode = {
  hex: Schema.decodeUnknownSync(TextSchema),
};

/**
 * Effect-based encoding/decoding utilities.
 * Inherits from Text module and adds length validation.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEffect = {
  hex: Schema.encode(TextSchema),
};

export const DecodeEffect = {
  hex: Schema.decodeUnknown(TextSchema),
};
