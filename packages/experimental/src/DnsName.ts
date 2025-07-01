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
 * Schema for DnsName representing DNS hostnames.
 * dns_name = text .size (0 .. 128)
 *
 * DnsName extends Text128 for DNS-specific validation.
 *
 * @example
 * import { DnsName } from "@lucid-evolution/experimental";
 *
 * const dnsName = new DnsName({ name: "example.com" });
 * console.log(dnsName.name); // "example.com"
 *
 * @since 2.0.0
 * @category model
 */
export class DnsName extends Schema.TaggedClass<DnsName>()("DnsName", {
  name: Text128.TextSchema,
}) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: "DnsName",
      name: this.name,
    };
  }
}

/**
 * Schema for transforming between Text128 and DnsName.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DnsNameTextSchema = Schema.transform(
  Schema.typeSchema(Text128.TextSchema),
  DnsName,
  {
    strict: true,
    encode: (_, dnsName) => dnsName.name,
    decode: (name) => new DnsName({ name }),
  },
);

/**
 * Check if two DnsName instances are equal.
 *
 * @example
 * import { DnsName } from "@lucid-evolution/experimental";
 *
 * const dns1 = new DnsName({ name: "example.com" });
 * const dns2 = new DnsName({ name: "example.com" });
 * console.log(DnsName.equals(dns1, dns2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: DnsName, b: DnsName): boolean => a.name === b.name;

/**
 * Check if a DNS name is empty.
 *
 * @example
 * import { DnsName } from "@lucid-evolution/experimental";
 *
 * const emptyDns = new DnsName({ name: "" });
 * console.log(DnsName.isEmpty(emptyDns)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isEmpty = (dnsName: DnsName): boolean => dnsName.name.length === 0;

/**
 * Get the length of a DNS name.
 *
 * @example
 * import { DnsName } from "@lucid-evolution/experimental";
 *
 * const dnsName = new DnsName({ name: "example.com" });
 * console.log(DnsName.length(dnsName)); // 11
 *
 * @since 2.0.0
 * @category transformation
 */
export const length = (dnsName: DnsName): number => dnsName.name.length;

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
 *   assert(dnsName.name.length >= 0);
 *   assert(dnsName.name.length <= 128);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = Text128.generator.map(
  (text) => new DnsName({ name: text }),
);

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  hex: Schema.encodeSync(DnsNameTextSchema),
};

export const Decode = {
  hex: Schema.decodeUnknownSync(DnsNameTextSchema),
};

/**
 * Effect-based encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEffect = {
  hex: Schema.encode(DnsNameTextSchema),
};

export const DecodeEffect = {
  hex: Schema.decodeUnknown(DnsNameTextSchema),
};
