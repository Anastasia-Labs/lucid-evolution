import { Schema, Data } from "effect";
import * as Text128 from "./Text128.js";
import * as _Codec from "./Codec.js";

/**
 * Error class for DnsName related operations.
 *
 * @example
 * import { DnsName } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new DnsName.DnsNameError({ message: "Invalid DNS name" });
 * assert(error.message === "Invalid DNS name");
 *
 * @since 2.0.0
 * @category errors
 */
export class DnsNameError extends Data.TaggedError("DnsNameError")<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * Schema for DnsName with DNS-specific validation.
 * dns_name = text .size (0 .. 128)
 *
 * @example
 * import { DnsName } from "@evolution-sdk/experimental";
 *
 * const dnsName = DnsName.make("example.com");
 * console.log(dnsName); // "example.com" (branded as DnsName)
 *
 * @since 2.0.0
 * @category model
 */
export const DnsName = Text128.FromVariableHex.pipe(Schema.brand("DnsName"));

/**
 * Type alias for DnsName.
 *
 * @since 2.0.0
 * @category model
 */
export type DnsName = typeof DnsName.Type;

export const FromBytes = Schema.compose(
  Text128.FromVariableBytes,
  DnsName,
).annotations({
  identifier: "DnsName.FromBytes",
});

export const FromHex = Schema.compose(
  Text128.FromVariableHex,
  DnsName,
).annotations({
  identifier: "DnsName.FromHex",
});

/**
 * Create a DnsName from a string.
 *
 * @example
 * import { DnsName } from "@evolution-sdk/experimental";
 *
 * const dnsName = DnsName.make("example.com");
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = DnsName.make;

/**
 * Check if two DnsName instances are equal.
 *
 * @example
 * import { DnsName } from "@evolution-sdk/experimental";
 *
 * const dns1 = DnsName.make("example.com");
 * const dns2 = DnsName.make("example.com");
 * console.log(DnsName.equals(dns1, dns2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: DnsName, b: DnsName): boolean => a === b;

/**
 * Generate a random DnsName.
 *
 * @example
 * import { DnsName } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(DnsName.generator, 10);
 * randomSamples.forEach((dnsName) => {
 *   assert(dnsName.length >= 0);
 *   assert(dnsName.length <= 128);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = Text128.generator.map((text) => make(text));

/**
 * Codec utilities for DnsName encoding and decoding operations.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Codec = _Codec.createEncoders(
  {
    bytes: FromBytes,
    hex: FromHex,
  },
  DnsNameError,
);
