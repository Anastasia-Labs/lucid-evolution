import { Schema, Data } from "effect";
import * as Numeric from "./Numeric.js";

/**
 * CDDL specification:
 * port = uint .le 65535
 *
 * @since 2.0.0
 * @category constants
 */
export const PORT_MIN_VALUE = Numeric.UINT16_MIN;
export const PORT_MAX_VALUE = Numeric.UINT16_MAX;

/**
 * Error class for Port related operations.
 *
 * @example
 * import { Port } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new Port.PortError({ message: "Invalid port number" });
 * assert(error.message === "Invalid port number");
 *
 * @since 2.0.0
 * @category errors
 */
export class PortError extends Data.TaggedError("PortError")<{
  message?: string;
  reason?: "InvalidRange" | "NegativeValue" | "ExceedsMaxValue";
}> {}

/**
 * Schema for validating port numbers (0-65535).
 *
 * @since 2.0.0
 * @category schemas
 */
export const PortSchema = Numeric.Uint16Schema.annotations({
  identifier: "Port",
  description: "Network port number (16-bit unsigned integer)",
});

/**
 * Type alias for Port representing network port numbers.
 * Valid range is 0-65535 as per standard TCP/UDP port specification.
 *
 * @example
 * import { Port } from "@evolution-sdk/experimental";
 *
 * const port: Port.Port = 8080;
 * console.log(port); // 8080
 *
 * @since 2.0.0
 * @category model
 */
export type Port = typeof PortSchema.Type;

/**
 * Smart constructor for creating Port values.
 *
 * @example
 * import { Port } from "@evolution-sdk/experimental";
 *
 * const port = Port.make(8080);
 * console.log(port); // 8080
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (value: number): Port => PortSchema.make(value);

/**
 * Check if a value is a valid Port.
 *
 * @example
 * import { Port } from "@evolution-sdk/experimental";
 *
 * console.log(Port.is(8080)); // true
 * console.log(Port.is(70000)); // false (too large)
 * console.log(Port.is(-1)); // false (negative)
 *
 * @since 2.0.0
 * @category predicates
 */
export const is = (value: unknown): value is Port =>
  Schema.is(PortSchema)(value);

/**
 * Check if two Port instances are equal.
 *
 * @example
 * import { Port } from "@evolution-sdk/experimental";
 *
 * const port1 = Port.make(8080);
 * const port2 = Port.make(8080);
 * console.log(Port.equals(port1, port2)); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: Port, b: Port): boolean => a === b;

/**
 * Check if a port is a well-known port (0-1023).
 *
 * @example
 * import { Port } from "@evolution-sdk/experimental";
 *
 * const port80 = Port.make(80);
 * const port8080 = Port.make(8080);
 * console.log(Port.isWellKnown(port80)); // true
 * console.log(Port.isWellKnown(port8080)); // false
 *
 * @since 2.0.0
 * @category predicates
 */
export const isWellKnown = (port: Port): boolean => port >= 0 && port <= 1023;

/**
 * Check if a port is a registered port (1024-49151).
 *
 * @example
 * import { Port } from "@evolution-sdk/experimental";
 *
 * const port8080 = Port.make(8080);
 * console.log(Port.isRegistered(port8080)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isRegistered = (port: Port): boolean =>
  port >= 1024 && port <= 49151;

/**
 * Check if a port is a dynamic/private port (49152-65535).
 *
 * @example
 * import { Port } from "@evolution-sdk/experimental";
 *
 * const port50000 = Port.make(50000);
 * console.log(Port.isDynamic(port50000)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isDynamic = (port: Port): boolean =>
  port >= 49152 && port <= 65535;

/**
 * Generate a random Port.
 *
 * @example
 * import { Port } from "@evolution-sdk/experimental";
 * import { FastCheck } from "effect";
 * import assert from "assert";
 *
 * const randomSamples = FastCheck.sample(Port.generator, 10);
 * randomSamples.forEach((port) => {
 *   assert(port >= 0);
 *   assert(port <= 65535);
 * });
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = Numeric.Uint16Generator;

/**
 * Synchronous encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  sync: Schema.encodeSync(PortSchema),
};

export const Decode = {
  sync: Schema.decodeUnknownSync(PortSchema),
};

/**
 * Either encoding/decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  either: Schema.encodeEither(PortSchema),
};

export const DecodeEither = {
  either: Schema.decodeUnknownEither(PortSchema),
};
