import { Schema } from "effect";
import { HexStringFilter } from "./Combinator.js";
import * as Bytes from "./Bytes.js";

/**
 * Byron legacy address format
 *
 * @since 2.0.0
 * @category schemas
 */
export class ByronAddress extends Schema.TaggedClass<ByronAddress>(
  "ByronAddress",
)("ByronAddress", {
  bytes: Schema.String.pipe(HexStringFilter),
}) {}

/**
 * Byron legacy address has limited support
 * @since 2.0.0
 */
export const fromBytes = (bytes: Uint8Array) =>
  ByronAddress.make(
    {
      bytes: Bytes.toHexOrThrow(bytes),
    },
    {
      disableValidation: true,
    },
  );
