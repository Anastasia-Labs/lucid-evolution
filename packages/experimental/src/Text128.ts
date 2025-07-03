import { FastCheck, pipe, Schema } from "effect";
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
 * Schema for validating variable-length text between 0 and 128 characters.
 * text .size (0 .. 128)
 *
 * @since 2.0.0
 * @category schemas
 */
export const VariableTextSchema = pipe(
  Text.TextSchema,
  Schema.filter(
    (text) =>
      text.length >= TEXT128_MIN_LENGTH && text.length <= TEXT128_MAX_LENGTH,
  ),
).annotations({
  message: (issue) =>
    `Text must be between ${TEXT128_MIN_LENGTH} and ${TEXT128_MAX_LENGTH} characters, but got ${(issue.actual as string).length}`,
  identifier: "Text128Variable",
});

/**
 * Schema for validating text with exactly 128 characters.
 * text .size 128
 *
 * @since 2.0.0
 * @category schemas
 */
export const TextSchema = pipe(
  Text.TextSchema,
  Schema.filter((text) => text.length === TEXT128_MAX_LENGTH),
).annotations({
  message: (issue) =>
    `Text must be exactly ${TEXT128_MAX_LENGTH} characters, but got ${(issue.actual as string).length}`,
  identifier: "Text128",
});

export const generator = FastCheck.string({
  minLength: TEXT128_MIN_LENGTH,
  maxLength: TEXT128_MAX_LENGTH,
});
