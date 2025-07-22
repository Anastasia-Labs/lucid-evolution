import { Schema, Data, FastCheck, Effect, ParseResult } from "effect";
import * as DnsName from "./DnsName.js";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";

/**
 * Error class for MultiHostName related operations.
 *
 * @example
 * import { MultiHostName } from "@evolution-sdk/experimental";
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
  cause?: unknown;
}> {}

/**
 * Schema for MultiHostName representing a multiple host name record.
 * multi_host_name = (2, dns_name)
 *
 * @example
 * import { MultiHostName, DnsName } from "@evolution-sdk/experimental";
 *
 * const hostName = new MultiHostName({
 *   dnsName: DnsName.make("pool.example.com")
 * });
 *
 * @since 2.0.0
 * @category model
 */
export class MultiHostName extends Schema.TaggedClass<MultiHostName>()(
  "MultiHostName",
  {
    dnsName: DnsName.DnsName,
  },
) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: "MultiHostName",
      dnsName: this.dnsName,
    };
  }
}

/**
 * CDDL schema for MultiHostName.
 * multi_host_name = (2, dns_name)
 *
 * @since 2.0.0
 * @category schemas
 */
export const MultiHostNameCDDLSchema = Schema.transformOrFail(
  Schema.Tuple(
    Schema.Literal(2n), // tag (literal 2)
    Schema.String, // dns_name (string)
  ),
  Schema.typeSchema(MultiHostName),
  {
    strict: true,
    encode: (toA) =>
      Effect.gen(function* () {
        const dnsName = yield* ParseResult.encode(DnsName.DnsName)(toA.dnsName);
        return yield* Effect.succeed([2n, dnsName] as const);
      }),
    decode: ([, dnsNameValue]) =>
      Effect.gen(function* () {
        const dnsName = yield* ParseResult.decode(DnsName.DnsName)(
          dnsNameValue,
        );
        return yield* Effect.succeed(new MultiHostName({ dnsName }));
      }),
  },
);

/**
 * CBOR bytes transformation schema for MultiHostName.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.CBORBytesSchema(options), // Uint8Array → CBOR
    MultiHostNameCDDLSchema, // CBOR → MultiHostName
  );

/**
 * CBOR hex transformation schema for MultiHostName.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.BytesSchema, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → MultiHostName
  );

/**
 * Create a MultiHostName instance.
 *
 * @example
 * import { MultiHostName, DnsName } from "@evolution-sdk/experimental";
 *
 * const hostName = MultiHostName.make(DnsName.make("pool.example.com"));
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (dnsName: DnsName.DnsName): MultiHostName =>
  new MultiHostName({ dnsName });

/**
 * Get the DNS name from a MultiHostName.
 *
 * @example
 * import { MultiHostName } from "@evolution-sdk/experimental";
 *
 * const dnsName = MultiHostName.getDnsName(hostName);
 * console.log(dnsName); // "pool.example.com"
 *
 * @since 2.0.0
 * @category transformation
 */
export const getDnsName = (hostName: MultiHostName): DnsName.DnsName =>
  hostName.dnsName;

/**
 * Check if two MultiHostName instances are equal.
 *
 * @example
 * import { MultiHostName, DnsName } from "@evolution-sdk/experimental";
 *
 * const hostName1 = new MultiHostName({ dnsName: DnsName.make("pool.example.com") });
 * const hostName2 = new MultiHostName({ dnsName: DnsName.make("pool.example.com") });
 * const isEqual = equals(hostName1, hostName2); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (self: MultiHostName, that: MultiHostName): boolean =>
  DnsName.equals(self.dnsName, that.dnsName);

/**
 * FastCheck generator for MultiHostName instances.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.record({
  dnsName: DnsName.generator,
}).map((props) => new MultiHostName(props));

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
