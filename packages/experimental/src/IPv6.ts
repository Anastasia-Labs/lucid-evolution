import { Schema, Data, FastCheck } from "effect";
import * as Bytes from "./Bytes.js";
import * as Bytes16 from "./Bytes16.js";

/**
 * CDDL specification:
 * ipv6 = bytes .size 16
 *
 * @since 2.0.0
 * @category constants
 */
export const IPV6_BYTES_LENGTH = 16;
export const IPV6_HEX_LENGTH = 32;

/**
 * Error class for IPv6 related operations.
 *
 * @example
 * import { IPv6 } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new IPv6.IPv6Error({ message: "Invalid IPv6 address" });
 * assert(error.message === "Invalid IPv6 address");
 *
 * @since 2.0.0
 * @category errors
 */
export class IPv6Error extends Data.TaggedError("IPv6Error")<{
  message?: string;
  reason?:
    | "InvalidBytesLength"
    | "InvalidHexLength"
    | "InvalidFormat"
    | "InvalidCBORFormat";
}> {}

/**
 * Schema for validating IPv6 address bytes (exactly 16 bytes).
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesSchema = Bytes16.BytesSchema;

/**
 * Schema for IPv6 representing an IPv6 network address.
 * IPv6 addresses are exactly 16 bytes (32 hex characters).
 *
 * @example
 * import { IPv6 } from "@evolution-sdk/experimental";
 *
 * const ipv6 = IPv6.make("20010db885a3000000008a2e03707334");
 * console.log(ipv6); // "20010db885a3000000008a2e03707334"
 *
 * @since 2.0.0
 * @category model
 */
export const IPv6 = Bytes16.HexSchema.pipe(Schema.brand("IPv6"));

/**
 * Type alias for IPv6.
 *
 * @since 2.0.0
 * @category model
 */
export type IPv6 = typeof IPv6.Type;

/**
 * Schema for transforming between Uint8Array and IPv6.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const IPv6BytesSchema = Schema.transform(BytesSchema, IPv6, {
  strict: true,
  encode: (_, ipv6) => Bytes.Decode.hex(ipv6),
  decode: (bytes) => IPv6.make(Bytes.Encode.hex(bytes)),
});

/**
 * Schema for transforming between hex string and IPv6.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const IPv6HexSchema = Schema.transform(
  Schema.typeSchema(Bytes16.HexSchema),
  IPv6,
  {
    strict: true,
    encode: (_, ipv6) => ipv6,
    decode: (address) => IPv6.make(address),
  },
);

/**
 * Create an IPv6 address from a standard string representation.
 *
 * @example
 * import { IPv6 } from "@evolution-sdk/experimental";
 *
 * const ipv6 = IPv6.fromString("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
 * // Converts to hex representation
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromString = (ipv6String: string): IPv6 => {
  // Remove colons and convert to hex
  const hex = ipv6String.replace(/:/g, "").toLowerCase();
  if (hex.length !== IPV6_HEX_LENGTH) {
    throw new IPv6Error({
      message: `Invalid IPv6 string format: ${ipv6String}`,
      reason: "InvalidFormat",
    });
  }
  return IPv6.make(hex as Bytes.Hex);
};

/**
 * Convert an IPv6 address to standard string representation.
 *
 * @example
 * import { IPv6 } from "@evolution-sdk/experimental";
 *
 * const ipv6 = IPv6.make("20010db885a3000000008a2e03707334");
 * const string = IPv6.toString(ipv6);
 * console.log(string); // "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
 *
 * @since 2.0.0
 * @category transformation
 */
export const toString = (ipv6: IPv6): string => {
  const hex = ipv6;
  const groups = [];
  for (let i = 0; i < hex.length; i += 4) {
    groups.push(hex.slice(i, i + 4));
  }
  return groups.join(":");
};

/**
 * Check if two IPv6 instances are equal.
 *
 * @example
 * import { IPv6 } from "@evolution-sdk/experimental";
 *
 * const ipv6a = IPv6.make("20010db885a3000000008a2e03707334");
 * const ipv6b = IPv6.make("20010db885a3000000008a2e03707334");
 * console.log(IPv6.equals(ipv6a, ipv6b)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: IPv6, b: IPv6): boolean => a === b;

/**
 * Generate a random IPv6 address.
 *
 * @example
 * import { IPv6 } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(IPv6.generator, 10);
 * randomSamples.forEach((ipv6) => {
 *   assert(ipv6.length === 32);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: IPV6_BYTES_LENGTH,
  maxLength: IPV6_BYTES_LENGTH,
}).map((bytes) => IPv6.make(Bytes.Encode.hex(bytes)));

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(IPv6HexSchema),
  bytes: Schema.encodeSync(IPv6BytesSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  hex: Schema.decodeUnknownSync(IPv6HexSchema),
  bytes: Schema.decodeUnknownSync(IPv6BytesSchema),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  hex: Schema.encodeEither(IPv6HexSchema),
  bytes: Schema.encodeEither(IPv6BytesSchema),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  hex: Schema.decodeUnknownEither(IPv6HexSchema),
  bytes: Schema.decodeUnknownEither(IPv6BytesSchema),
};
