import { Schema, Data } from "effect";
import * as Text128 from "./Text128.js";

/**
 * Error class for Url related operations.
 *
 * @example
 * import { Url } from "@lucid-evolution/experimental";
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
 * Schema for Url representing URLs.
 * url = text .size (0 .. 128)
 *
 * Url extends Text128 for URL-specific validation.
 *
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 *
 * const url = new Url({ value: "https://example.com/metadata.json" });
 * console.log(url.value); // "https://example.com/metadata.json"
 *
 * @since 2.0.0
 * @category model
 */
export class Url extends Schema.TaggedClass<Url>()("Url", {
  value: Text128.TextSchema,
}) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: "Url",
      value: this.value,
    };
  }
}

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
    encode: (_, url) => url.value,
    decode: (value) => new Url({ value }),
  },
);

/**
 * Check if two Url instances are equal.
 *
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 *
 * const url1 = new Url({ value: "https://example.com" });
 * const url2 = new Url({ value: "https://example.com" });
 * console.log(Url.equals(url1, url2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: Url, b: Url): boolean => a.value === b.value;

/**
 * Check if a URL is empty.
 *
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 *
 * const emptyUrl = new Url({ value: "" });
 * console.log(Url.isEmpty(emptyUrl)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isEmpty = (url: Url): boolean => url.value.length === 0;

/**
 * Get the length of a URL.
 *
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 *
 * const url = new Url({ value: "https://example.com" });
 * console.log(Url.length(url)); // 19
 *
 * @since 2.0.0
 * @category transformation
 */
export const length = (url: Url): number => url.value.length;

/**
 * Generate a random Url.
 *
 * @example
 * import { Url } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(Url.generator, 10);
 * randomSamples.forEach((url) => {
 *   assert(url.value.length >= 0);
 *   assert(url.value.length <= 128);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = Text128.generator.map(
  (text) => new Url({ value: text }),
);

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(UrlTextSchema),
};

export const Decode = {
  hex: Schema.decodeUnknownSync(UrlTextSchema),
};

/**
 * Effect-based encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEffect = {
  hex: Schema.encode(UrlTextSchema),
};

export const DecodeEffect = {
  hex: Schema.decodeUnknown(UrlTextSchema),
};
