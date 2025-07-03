import { Schema, Data } from "effect";
import * as Text128 from "./Text128.js";

/**
 * Error class for DnsName related operations.
 *
 * @example
 * import { DnsName } from "@lucid-evolution/experimental";
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
  reason?: "InvalidLength" | "InvalidFormat" | "TooLong";
}> {}

/**
 * Schema for DnsName with DNS-specific validation.
 * dns_name = text .size (0 .. 128)
 *
 * @example
 * import { DnsName } from "@lucid-evolution/experimental";
 *
 * const dnsName = DnsName.make("example.com");
 * console.log(dnsName); // "example.com" (branded as DnsName)
 *
 * @since 2.0.0
 * @category model
 */
export const DnsName = Text128.VariableTextSchema.pipe(Schema.brand("DnsName"));

/**
 * Type alias for DnsName.
 *
 * @since 2.0.0
 * @category model
 */
export type DnsName = typeof DnsName.Type;

/**
 * Create a DnsName from a string.
 *
 * @example
 * import { DnsName } from "@lucid-evolution/experimental";
 *
 * const dnsName = DnsName.make("example.com");
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = Schema.decodeSync(DnsName);

/**
 * Check if two DnsName instances are equal.
 *
 * @example
 * import { DnsName } from "@lucid-evolution/experimental";
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
 * Check if a DNS name is empty.
 *
 * @example
 * import { DnsName } from "@lucid-evolution/experimental";
 *
 * const emptyDns = DnsName.make("");
 * console.log(DnsName.isEmpty(emptyDns)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isEmpty = (dnsName: DnsName): boolean => dnsName.length === 0;

/**
 * Get the length of a DNS name.
 *
 * @example
 * import { DnsName } from "@lucid-evolution/experimental";
 *
 * const dnsName = DnsName.make("example.com");
 * console.log(DnsName.length(dnsName)); // 11
 *
 * @since 2.0.0
 * @category transformation
 */
export const length = (dnsName: DnsName): number => dnsName.length;

/**
 * Generate a random DnsName.
 *
 * @example
 * import { DnsName } from "@lucid-evolution/experimental";
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
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(DnsName),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  hex: Schema.decodeUnknownSync(DnsName),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  hex: Schema.encodeEither(DnsName),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  hex: Schema.decodeUnknownEither(DnsName),
};

/**
 * Effect-based encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEffect = {
  hex: Schema.encode(DnsName),
};

/**
 * Effect-based decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEffect = {
  hex: Schema.decodeUnknown(DnsName),
};
