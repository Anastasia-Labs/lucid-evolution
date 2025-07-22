import { Schema, Data } from "effect";
import * as Text128 from "./Text128.js";

/**
 * CDDL specification:
 * url = text .size (0..128)
 *
 * @since 2.0.0
 * @category constants
 */
export const URL_MAX_LENGTH = 128;

/**
 * Error class for Url related operations.
 *
 * @example
 * import { Url } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new Url.UrlError({ message: "Invalid URL" });
 * assert(error.message === "Invalid URL");
 *
 * @since 2.0.0
 * @category errors
 */
export class UrlError extends Data.TaggedError("UrlError")<{
  message?: string;
  reason?: "InvalidLength" | "InvalidFormat" | "TooLong";
}> {}

/**
 * Schema for Url representing URLs as branded text.
 * url = text .size (0..128)
 *
 * @example
 * import { Url } from "@evolution-sdk/experimental";
 *
 * const url = Url.make("https://example.com/metadata.json");
 * console.log(url); // "https://example.com/metadata.json"
 *
 * @since 2.0.0
 * @category model
 */
export const Url = Text128.VariableTextSchema.pipe(Schema.brand("Url"));

/**
 * Type alias for Url.
 *
 * @since 2.0.0
 * @category model
 */
export type Url = typeof Url.Type;

/**
 * Schema for transforming between Text128 and Url.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const UrlTextSchema = Schema.transform(
  Schema.typeSchema(Text128.TextSchema),
  Url,
  {
    strict: true,
    encode: (_, url) => url,
    decode: (value) => Url.make(value),
  },
);

/**
 * Check if two Url instances are equal.
 *
 * @example
 * import { Url } from "@evolution-sdk/experimental";
 *
 * const url1 = Url.make("https://example.com");
 * const url2 = Url.make("https://example.com");
 * console.log(Url.equals(url1, url2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: Url, b: Url): boolean => a === b;

/**
 * Check if a URL is empty.
 *
 * @example
 * import { Url } from "@evolution-sdk/experimental";
 *
 * const emptyUrl = Url.make("");
 * console.log(Url.isEmpty(emptyUrl)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isEmpty = (url: Url): boolean => url.length === 0;

/**
 * Get the length of a URL.
 *
 * @example
 * import { Url } from "@evolution-sdk/experimental";
 *
 * const url = Url.make("https://example.com");
 * console.log(Url.length(url)); // 19
 *
 * @since 2.0.0
 * @category transformation
 */
export const length = (url: Url): number => url.length;

/**
 * Generate a random Url.
 *
 * @example
 * import { Url } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(Url.generator, 10);
 * randomSamples.forEach((url) => {
 *   assert(url.length >= 0);
 *   assert(url.length <= 128);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = Text128.generator.map((text) => Url.make(text));

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  text: Schema.encodeSync(UrlTextSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  text: Schema.decodeUnknownSync(UrlTextSchema),
};

/**
 * Either-based encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  text: Schema.encodeEither(UrlTextSchema),
};

/**
 * Either-based decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  text: Schema.decodeUnknownEither(UrlTextSchema),
};

/**
 * Create a Url from a text string.
 *
 * @example
 * import { Url } from "@evolution-sdk/experimental";
 *
 * const url = Url.make("https://example.com/metadata.json");
 * console.log(url); // "https://example.com/metadata.json"
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (value: string): Url => Url.make(value);

/**
 * Check if the given value is a valid Url
 *
 * @since 2.0.0
 * @category predicates
 */
export const isUrl = Schema.is(Url);
