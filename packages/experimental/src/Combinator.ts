import { pipe, Schema } from "effect";

/**
 * Regular expression that matches valid hexadecimal strings.
 * Validates that a string:
 * - Contains only hexadecimal characters (0-9, a-f)
 * - Has an even number of characters (bytes are represented as pairs of hex digits)
 * - Can be empty (matches zero or more pairs)
 */
export const HEX_REGEX = /^(?:[0-9a-f]{2})*$/;

export const HexString = <Source extends string, Target>(
  self: Schema.Schema<Source, Target>
) => pipe(self, Schema.pattern(HEX_REGEX));

