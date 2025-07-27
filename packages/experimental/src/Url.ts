import { Schema, Data } from "effect";
import * as Text128 from "./Text128.js";
import * as _Codec from "./Codec.js";

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
export const Url = Text128.FromVariableHex.pipe(Schema.brand("Url"));

/**
 * Type alias for Url.
 *
 * @since 2.0.0
 * @category model
 */
export type Url = typeof Url.Type;

export const make = Url.make;

export const FromBytes = Schema.compose(
  Text128.FromVariableBytes, // Uint8Array -> hex string
  Url, // hex string -> Url
).annotations({
  identifier: "Url.Bytes",
});

export const FromHex = Schema.compose(
  Text128.FromVariableHex, // string -> hex string
  Url, // hex string -> Url
).annotations({
  identifier: "Url.Hex",
});

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

export const Codec = _Codec.createEncoders(
  {
    bytes: FromBytes,
    hex: FromHex,
  },
  UrlError,
);
