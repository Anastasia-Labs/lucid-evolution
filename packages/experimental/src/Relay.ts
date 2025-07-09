import { Schema, Data, FastCheck } from "effect";
import * as SingleHostAddr from "./SingleHostAddr.js";
import * as SingleHostName from "./SingleHostName.js";
import * as MultiHostName from "./MultiHostName.js";
import * as CBOR from "./CBOR.js";

/**
 * Error class for Relay related operations.
 *
 * @example
 * import { Relay } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new Relay.RelayError({ message: "Invalid relay configuration" });
 * assert(error.message === "Invalid relay configuration");
 *
 * @since 2.0.0
 * @category errors
 */
export class RelayError extends Data.TaggedError("RelayError")<{
  message?: string;
  reason?: "InvalidStructure" | "UnsupportedType";
}> {}

/**
 * Union schema for Relay representing various relay configurations.
 * relay = [ single_host_addr // single_host_name // multi_host_name ]
 *
 * @since 2.0.0
 * @category schemas
 */
export const Relay = Schema.Union(
  SingleHostAddr.SingleHostAddr,
  SingleHostName.SingleHostName,
  MultiHostName.MultiHostName,
);

/**
 * Type alias for Relay.
 *
 * @since 2.0.0
 * @category model
 */
export type Relay = typeof Relay.Type;

/**
 * CBOR bytes transformation schema for Relay.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = undefined;

/**
 * CBOR hex transformation schema for Relay.
 *
 * @since 2.0.0
 * @category schemas
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
 * Pattern match on a Relay to handle different relay types.
 *
 * @example
 * import { Relay, SingleHostAddr, SingleHostName, MultiHostName } from "@lucid-evolution/experimental";
 *
 * const relay = Relay.fromMultiHostName(MultiHostName.make("pool.example.com"));
 *
 * const result = Relay.match(relay, {
 *   SingleHostAddr: (addr) => `Single host address with tag ${addr.tag}`,
 *   SingleHostName: (name) => `Single host name with tag ${name.tag}`,
 *   MultiHostName: (multi) => `Multi host name: ${MultiHostName.getDnsName(multi)}`
 * });
 *
 * @since 2.0.0
 * @category transformation
 */
export const match = <A, B, C>(
  relay: Relay,
  cases: {
    SingleHostAddr: (addr: SingleHostAddr.SingleHostAddr) => A;
    SingleHostName: (name: SingleHostName.SingleHostName) => B;
    MultiHostName: (multi: MultiHostName.MultiHostName) => C;
  },
): A | B | C => {
  switch (relay._tag) {
    case "SingleHostAddr":
      return cases.SingleHostAddr(relay);
    case "SingleHostName":
      return cases.SingleHostName(relay);
    case "MultiHostName":
      return cases.MultiHostName(relay);
    default:
      throw new Error(
        `Exhaustive check failed: Unhandled case '${(relay as { _tag: string })._tag}' encountered.`,
      );
  }
};

/**
 * Check if a Relay is a SingleHostAddr.
 *
 * @example
 * import { Relay, SingleHostAddr } from "@lucid-evolution/experimental";
 *
 * const relay = Relay.fromSingleHostAddr(new SingleHostAddr.SingleHostAddr({ ... }));
 * console.log(Relay.isSingleHostAddr(relay)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isSingleHostAddr = (
  relay: Relay,
): relay is SingleHostAddr.SingleHostAddr => relay._tag === "SingleHostAddr";

/**
 * Check if a Relay is a SingleHostName.
 *
 * @example
 * import { Relay, SingleHostName } from "@lucid-evolution/experimental";
 *
 * const relay = Relay.fromSingleHostName(new SingleHostName.SingleHostName({ ... }));
 * console.log(Relay.isSingleHostName(relay)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isSingleHostName = (
  relay: Relay,
): relay is SingleHostName.SingleHostName => relay._tag === "SingleHostName";

/**
 * Check if a Relay is a MultiHostName.
 *
 * @example
 * import { Relay, MultiHostName } from "@lucid-evolution/experimental";
 *
 * const relay = new MultiHostName.MultiHostName({ tag: 2, dnsName: ... });
 * console.log(isMultiHostName(relay)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isMultiHostName = (
  relay: Relay,
): relay is MultiHostName.MultiHostName => relay._tag === "MultiHostName";

/**
 * FastCheck generator for Relay instances.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.oneof(
  SingleHostAddr.generator,
  SingleHostName.generator,
  MultiHostName.generator,
);

/**
 * Check if two Relay instances are equal.
 *
 * @example
 * import { Relay, MultiHostName } from "@lucid-evolution/experimental";
 *
 * const relay1 = Relay.fromMultiHostName(MultiHostName.make("pool.example.com"));
 * const relay2 = Relay.fromMultiHostName(MultiHostName.make("pool.example.com"));
 * const isEqual = Relay.equals(relay1, relay2); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (self: Relay, that: Relay): boolean => {
  if (self._tag !== that._tag) return false;

  switch (self._tag) {
    case "SingleHostAddr":
      return SingleHostAddr.equals(self, that as SingleHostAddr.SingleHostAddr);
    case "SingleHostName":
      return SingleHostName.equals(self, that as SingleHostName.SingleHostName);
    case "MultiHostName":
      return MultiHostName.equals(self, that as MultiHostName.MultiHostName);
    default:
      return false;
  }
};
