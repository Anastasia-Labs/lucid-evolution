import { Schema, Data, FastCheck, Option } from "effect";
import * as Port from "./Port.js";
import * as DnsName from "./DnsName.js";

/**
 * Error class for SingleHostName related operations.
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new SingleHostName.SingleHostNameError({ message: "Invalid single host name" });
 * assert(error.message === "Invalid single host name");
 *
 * @since 2.0.0
 * @category errors
 */
export class SingleHostNameError extends Data.TaggedError(
  "SingleHostNameError",
)<{
  message?: string;
  reason?: "InvalidStructure" | "MissingDnsName" | "InvalidPort";
}> {}

/**
 * Schema for SingleHostName representing a network host with DNS name.
 * single_host_name = (1, port/ nil, dns_name)
 *
 * Used for A or AAAA DNS records.
 *
 * @example
 * import { SingleHostName, Port, DnsName } from "@lucid-evolution/experimental";
 * import { Option } from "effect";
 *
 * const hostName = new SingleHostName({
 *   tag: 1,
 *   port: Option.some(Port.make(8080)),
 *   dnsName: new DnsName({ name: "relay.example.com" })
 * });
 *
 * @since 2.0.0
 * @category model
 */
export class SingleHostName extends Schema.TaggedClass<SingleHostName>()(
  "SingleHostName",
  {
    tag: Schema.Literal(1),
    port: Schema.OptionFromNullOr(Port.PortSchema),
    dnsName: DnsName.DnsName,
  },
) {
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      _tag: "SingleHostName",
      tag: this.tag,
      port: this.port,
      dnsName: this.dnsName,
    };
  }
}

/**
 * Create a SingleHostName with a port.
 *
 * @example
 * import { SingleHostName, Port, DnsName } from "@lucid-evolution/experimental";
 * import { Option } from "effect";
 *
 * const dnsName = new DnsName({ name: "relay.example.com" });
 * const hostName = SingleHostName.withPort(Port.make(8080), dnsName);
 *
 * @since 2.0.0
 * @category constructors
 */
export const withPort = (
  port: Port.Port,
  dnsName: DnsName.DnsName,
): SingleHostName =>
  new SingleHostName({
    tag: 1,
    port: Option.some(port),
    dnsName,
  });

/**
 * Create a SingleHostName without a port.
 *
 * @example
 * import { SingleHostName, DnsName } from "@lucid-evolution/experimental";
 *
 * const dnsName = new DnsName({ name: "relay.example.com" });
 * const hostName = SingleHostName.withoutPort(dnsName);
 *
 * @since 2.0.0
 * @category constructors
 */
export const withoutPort = (dnsName: DnsName.DnsName): SingleHostName =>
  new SingleHostName({
    tag: 1,
    port: Option.none(),
    dnsName,
  });

/**
 * Check if the host name has a port.
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 * console.log(SingleHostName.hasPort(hostName)); // true or false
 *
 * @since 2.0.0
 * @category predicates
 */
export const hasPort = (hostName: SingleHostName): boolean =>
  Option.isSome(hostName.port);

/**
 * Get the DNS name from a SingleHostName.
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 *
 * const dnsName = SingleHostName.getDnsName(hostName);
 * console.log(dnsName.name); // "relay.example.com"
 *
 * @since 2.0.0
 * @category transformation
 */
export const getDnsName = (hostName: SingleHostName): DnsName.DnsName =>
  hostName.dnsName;

/**
 * Get the port from a SingleHostName, if it exists.
 *
 * @example
 * import { SingleHostName } from "@lucid-evolution/experimental";
 * import { Option } from "effect";
 *
 * const port = SingleHostName.getPort(hostName);
 * if (Option.isSome(port)) {
 *   console.log(port.value); // port number
 * }
 *
 * @since 2.0.0
 * @category transformation
 */
export const getPort = (hostName: SingleHostName): Option.Option<Port.Port> =>
  hostName.port;

/**
 * Check if two SingleHostName instances are equal.
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: SingleHostName, b: SingleHostName): boolean =>
  a.tag === b.tag &&
  Option.getEquivalence(Port.equals)(a.port, b.port) &&
  DnsName.equals(a.dnsName, b.dnsName);

/**
 * Generate a random SingleHostName.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.record({
  port: FastCheck.option(Port.generator),
  dnsName: DnsName.generator,
}).map(
  ({ port, dnsName }) =>
    new SingleHostName({
      tag: 1 as const,
      port: port ? Option.some(port) : Option.none(),
      dnsName,
    }),
);

/**
 * Synchronous encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  sync: Schema.encodeSync(SingleHostName),
};

export const Decode = {
  sync: Schema.decodeUnknownSync(SingleHostName),
};

/**
 * Effect-based encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEffect = {
  effect: Schema.encode(SingleHostName),
};

export const DecodeEffect = {
  effect: Schema.decodeUnknown(SingleHostName),
};
