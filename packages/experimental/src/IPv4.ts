import { Schema, Data, FastCheck } from "effect";
import * as Bytes from "./Bytes.js";
import * as Bytes4 from "./Bytes4.js";
import * as Numeric from "./Numeric.js";

/**
 * CDDL specification:
 * ipv4 = bytes .size 4
 *
 * @since 2.0.0
 * @category constants
 */
export const IPV4_BYTES_LENGTH = 4;
export const IPV4_HEX_LENGTH = 8;

/**
 * Error class for IPv4 related operations.
 *
 * @example
 * import { IPv4 } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new IPv4.IPv4Error({ message: "Invalid IPv4 address" });
 * assert(error.message === "Invalid IPv4 address");
 *
 * @since 2.0.0
 * @category errors
 */
export class IPv4Error extends Data.TaggedError("IPv4Error")<{
  message?: string;
  reason?:
    | "InvalidBytesLength"
    | "InvalidHexLength"
    | "InvalidFormat"
    | "InvalidOctet";
}> {}

/**
 * Schema for validating IPv4 address bytes (exactly 4 bytes).
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesSchema = Bytes4.BytesSchema;

/**
 * Schema for IPv4 representing an IPv4 network address.
 * Stored as 4 bytes in network byte order (big-endian).
 *
 * @example
 * import { IPv4 } from "@lucid-evolution/experimental";
 *
 * const ipv4 = IPv4.make("c0a80001"); // 192.168.0.1 in hex
 * console.log(ipv4); // "c0a80001"
 *
 * @since 2.0.0
 * @category model
 */
export const IPv4 = Bytes4.HexSchema.pipe(Schema.brand("IPv4"));

/**
 * Type alias for IPv4.
 *
 * @since 2.0.0
 * @category model
 */
export type IPv4 = typeof IPv4.Type;

/**
 * Schema for transforming between Uint8Array and IPv4.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const IPv4BytesSchema = Schema.transform(BytesSchema, IPv4, {
  strict: true,
  encode: (_, ipv4) => Bytes.Decode.hex(ipv4),
  decode: (bytes) => IPv4.make(Bytes.Encode.hex(bytes)),
});

/**
 * Schema for transforming between hex string and IPv4.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const IPv4HexSchema = Schema.transform(
  Schema.typeSchema(Bytes4.HexSchema),
  IPv4,
  {
    strict: true,
    encode: (_, ipv4) => ipv4,
    decode: (address) => IPv4.make(address),
  },
);

/**
 * Create an IPv4 from dotted decimal notation.
 *
 * @example
 * import { IPv4 } from "@lucid-evolution/experimental";
 *
 * const ipv4 = IPv4.fromString("192.168.0.1");
 * console.log(ipv4); // "c0a80001"
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromString = (dotted: string): IPv4 => {
  const parts = dotted.split(".");
  if (parts.length !== 4) {
    throw new IPv4Error({
      message: `Invalid IPv4 format: ${dotted}. Expected 4 octets separated by dots.`,
      reason: "InvalidFormat",
    });
  }

  const bytes = new Uint8Array(4);
  for (let i = 0; i < 4; i++) {
    const octet = parseInt(parts[i], 10);
    if (isNaN(octet) || !Schema.is(Numeric.Uint8Schema)(octet)) {
      throw new IPv4Error({
        message: `Invalid octet: ${parts[i]}. Must be a valid 8-bit unsigned integer (${Numeric.UINT8_MIN}-${Numeric.UINT8_MAX}).`,
        reason: "InvalidOctet",
      });
    }
    bytes[i] = octet;
  }

  return IPv4.make(Bytes.Encode.hex(bytes));
};

/**
 * Convert an IPv4 to dotted decimal notation.
 *
 * @example
 * import { IPv4 } from "@lucid-evolution/experimental";
 *
 * const ipv4 = IPv4.fromString("192.168.0.1");
 * console.log(IPv4.toString(ipv4)); // "192.168.0.1"
 *
 * @since 2.0.0
 * @category transformation
 */
export const toString = (ipv4: IPv4): string => {
  const bytes = Bytes.Decode.hex(ipv4);
  return Array.from(bytes).join(".");
};

/**
 * Check if two IPv4 instances are equal.
 *
 * @example
 * import { IPv4 } from "@lucid-evolution/experimental";
 *
 * const ipv4_1 = IPv4.fromString("192.168.0.1");
 * const ipv4_2 = IPv4.fromString("192.168.0.1");
 * console.log(IPv4.equals(ipv4_1, ipv4_2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: IPv4, b: IPv4): boolean => a === b;

/**
 * Generate a random IPv4.
 *
 * @example
 * import { IPv4 } from "@lucid-evolution/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(IPv4.generator, 10);
 * randomSamples.forEach((ipv4) => {
 *   assert(ipv4.length === 8);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: IPV4_BYTES_LENGTH,
  maxLength: IPV4_BYTES_LENGTH,
}).map((bytes) => IPv4.make(Bytes.Encode.hex(bytes)));

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(IPv4HexSchema),
  bytes: Schema.encodeSync(IPv4BytesSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  hex: Schema.decodeUnknownSync(IPv4HexSchema),
  bytes: Schema.decodeUnknownSync(IPv4BytesSchema),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  hex: Schema.encodeEither(IPv4HexSchema),
  bytes: Schema.encodeEither(IPv4BytesSchema),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  hex: Schema.decodeUnknownEither(IPv4HexSchema),
  bytes: Schema.decodeUnknownEither(IPv4BytesSchema),
};
