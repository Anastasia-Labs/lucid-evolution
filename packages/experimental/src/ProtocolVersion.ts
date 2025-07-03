import { Schema, Data } from "effect";
import * as Natural from "./Natural.js";

/**
 * Error class for ProtocolVersion related operations.
 *
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const error = new ProtocolVersion.ProtocolVersionError({ message: "Invalid protocol version" });
 * assert(error.message === "Invalid protocol version");
 *
 * @since 2.0.0
 * @category errors
 */
export class ProtocolVersionError extends Data.TaggedError(
  "ProtocolVersionError",
)<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * ProtocolVersion class based on Conway CDDL specification
 *
 * CDDL: protocol_version = [major_version : uint32, minor_version : uint32]
 *
 * @since 2.0.0
 * @category model
 */
export class ProtocolVersion extends Schema.TaggedClass<ProtocolVersion>()(
  "ProtocolVersion",
  {
    major: Natural.Natural,
    minor: Natural.Natural,
  },
) {}

/**
 * Check if two ProtocolVersion instances are equal.
 *
 * @example
 * import { ProtocolVersion } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const v1 = new ProtocolVersion({ major: 8n, minor: 0n });
 * const v2 = new ProtocolVersion({ major: 8n, minor: 0n });
 * assert(ProtocolVersion.equals(v1, v2) === true);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: ProtocolVersion, b: ProtocolVersion): boolean =>
  a.major === b.major && a.minor === b.minor;
