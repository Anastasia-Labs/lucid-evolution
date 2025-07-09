import { Schema, Data, FastCheck } from "effect";
import * as DnsName from "./DnsName.js";
import * as CBOR from "./CBOR.js";

/**
 * Error class for MultiHostName related operations.
 *
 * @example
 * import { MultiHostName } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new MultiHostName.MultiHostNameError({ message: "Invalid multi host name" });
 * assert(error.message === "Invalid multi host name");
 *
 * @since 2.0.0
 * @category errors
 */
export class MultiHostNameError extends Data.TaggedError("MultiHostNameError")<{
  message?: string;
  reason?: "InvalidStructure" | "InvalidDnsName";
}> {}

/**
 * Schema for MultiHostName representing a multiple host name record.
 * multi_host_name = (2, dns_name)
 *
 * @example
 * import { MultiHostName, DnsName } from "@lucid-evolution/experimental";
 *
 * const hostName = new MultiHostName({
 *   tag: 2,
 *   dnsName: new DnsName.DnsName({ name: "pool.example.com" })
 * });
 *
 * @since 2.0.0
 * @category model
 */
export class MultiHostName extends Schema.TaggedClass<MultiHostName>()(
  "MultiHostName",
  {
    tag: Schema.Literal(2),
    dnsName: DnsName.DnsName,
  },
) {}

/**
 * Schema for transforming between CBOR bytes and MultiHostName.
 * multi_host_name = (2, dns_name)
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORBytesSchema = undefined;

/**
 * Schema for transforming between CBOR hex and MultiHostName.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const CBORHexSchema = undefined;

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  bytes: Schema.encodeSync(CBORBytesSchema),
  hex: Schema.encodeSync(CBORHexSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  bytes: Schema.decodeUnknownSync(CBORBytesSchema),
  hex: Schema.decodeUnknownSync(CBORHexSchema),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  bytes: Schema.encodeEither(CBORBytesSchema),
  hex: Schema.encodeEither(CBORHexSchema),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  bytes: Schema.decodeUnknownEither(CBORBytesSchema),
  hex: Schema.decodeUnknownEither(CBORHexSchema),
};

/**
 * Check if two MultiHostName instances are equal.
 *
 * @example
 * import { MultiHostName, DnsName } from "@lucid-evolution/experimental";
 *
 * const hostName1 = new MultiHostName({ tag: 2, dnsName: new DnsName.DnsName({ name: "pool.example.com" }) });
 * const hostName2 = new MultiHostName({ tag: 2, dnsName: new DnsName.DnsName({ name: "pool.example.com" }) });
 * const isEqual = equals(hostName1, hostName2); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (self: MultiHostName, that: MultiHostName): boolean =>
  self.tag === that.tag && DnsName.equals(self.dnsName, that.dnsName);

/**
 * FastCheck generator for MultiHostName instances.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.record({
  tag: FastCheck.constant(2 as const),
  dnsName: DnsName.generator,
}).map((props) => new MultiHostName(props));
