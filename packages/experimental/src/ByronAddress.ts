import { Inspectable, Schema } from "effect";
import { HexStringFilter } from "./Combinator.js";
import * as Bytes from "./Bytes.js";

export declare const NominalType: unique symbol;
export interface ByronAddress {
  readonly [NominalType]: unique symbol;
}

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
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "ByronAddress",
      bytes: this.bytes,
    };
  }
}

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
