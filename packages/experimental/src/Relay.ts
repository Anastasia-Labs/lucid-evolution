import { Schema, Data, FastCheck, Effect, ParseResult, pipe } from "effect";
import * as SingleHostAddr from "./SingleHostAddr.js";
import * as SingleHostName from "./SingleHostName.js";
import * as MultiHostName from "./MultiHostName.js";
import * as Bytes from "./Bytes.js";
import * as CBOR from "./CBOR.js";

/**
 * Error class for Relay related operations.
 *
 * @example
 * import { Relay } from "@evolution-sdk/experimental";
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

export const RelayCDDLSchema = Schema.Union(
  SingleHostAddr.SingleHostAddrCDDLSchema,
  SingleHostName.SingleHostNameCDDLSchema,
  MultiHostName.MultiHostNameCDDLSchema,
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
 * For union types, we create a union of the child CBORBytesSchemas
 * rather than trying to create a complex three-layer transformation.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.Union(
    SingleHostAddr.CBORBytesSchema(options),
    SingleHostName.CBORBytesSchema(options),
    MultiHostName.CBORBytesSchema(options),
  );

/**
 * CBOR hex transformation schema for Relay.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.transformOrFail(Bytes.HexSchema, Schema.typeSchema(Relay), {
    strict: true,
    encode: (_, __, ___, toA) =>
      pipe(
        ParseResult.encode(CBORBytesSchema(options))(toA),
        Effect.map(Bytes.Encode.hex),
      ),
    decode: (fromA) =>
      pipe(
        Bytes.Decode.hex(fromA),
        ParseResult.decode(CBORBytesSchema(options)),
      ),
  });

export const Codec = (options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS) => ({
  Encode: {
    cborBytes: Schema.encodeSync(CBORBytesSchema(options)),
    cborHex: Schema.encodeSync(CBORHexSchema(options)),
  },
  Decode: {
    cborBytes: Schema.decodeUnknownSync(CBORBytesSchema(options)),
    cborHex: Schema.decodeUnknownSync(CBORHexSchema(options)),
  },
  EncodeEither: {
    cborBytes: Schema.encodeEither(CBORBytesSchema(options)),
    cborHex: Schema.encodeEither(CBORHexSchema(options)),
  },
  DecodeEither: {
    cborBytes: Schema.decodeEither(CBORBytesSchema(options)),
    cborHex: Schema.decodeEither(CBORHexSchema(options)),
  },
  EncodeEffect: {
    cborBytes: Schema.encode(CBORBytesSchema(options)),
    cborHex: Schema.encode(CBORHexSchema(options)),
  },
  DecodeEffect: {
    cborBytes: Schema.decode(CBORBytesSchema(options)),
    cborHex: Schema.decode(CBORHexSchema(options)),
  },
});

/**
 * Pattern match on a Relay to handle different relay types.
 *
 * @example
 * import { Relay, SingleHostAddr, SingleHostName, MultiHostName } from "@evolution-sdk/experimental";
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
 * import { Relay, SingleHostAddr } from "@evolution-sdk/experimental";
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
 * import { Relay, SingleHostName } from "@evolution-sdk/experimental";
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
 * import { Relay, MultiHostName } from "@evolution-sdk/experimental";
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
 * import { Relay, MultiHostName } from "@evolution-sdk/experimental";
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

/**
 * Create a Relay from a SingleHostAddr.
 *
 * @example
 * import { Relay, SingleHostAddr, Port, IPv4 } from "@evolution-sdk/experimental";
 * import { Option } from "effect";
 *
 * const ipv4 = new IPv4({ address: "c0a80001" });
 * const hostAddr = SingleHostAddr.withIPv4(Option.some(Port.make(8080)), ipv4);
 * const relay = Relay.fromSingleHostAddr(hostAddr);
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromSingleHostAddr = (
  singleHostAddr: SingleHostAddr.SingleHostAddr,
): Relay => singleHostAddr;

/**
 * Create a Relay from a SingleHostName.
 *
 * @example
 * import { Relay, SingleHostName, Port } from "@evolution-sdk/experimental";
 * import { Option } from "effect";
 *
 * const hostName = SingleHostName.make(Option.some(Port.make(3000)), "pool.example.com");
 * const relay = Relay.fromSingleHostName(hostName);
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromSingleHostName = (
  singleHostName: SingleHostName.SingleHostName,
): Relay => singleHostName;

/**
 * Create a Relay from a MultiHostName.
 *
 * @example
 * import { Relay, MultiHostName } from "@evolution-sdk/experimental";
 *
 * const multiHost = MultiHostName.make("pool.example.com");
 * const relay = Relay.fromMultiHostName(multiHost);
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromMultiHostName = (
  multiHostName: MultiHostName.MultiHostName,
): Relay => multiHostName;
