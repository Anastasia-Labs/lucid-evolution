import { Inspectable, Schema } from "effect";
import { HexStringFilter } from "./Combinator.js";
import { Hex } from "./index.js";
import { HexString } from "./Hex.js";

declare const NominalType: unique symbol;
interface ByronAddress {
  readonly [NominalType]: unique symbol;
}

/**
 * Byron legacy address format
 *
 * @since 2.0.0
 * @category schemas
 */
class ByronAddress extends Schema.TaggedClass<ByronAddress>("ByronAddress")(
  "ByronAddress",
  {
    bytes: HexString,
  },
) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "ByronAddress",
      bytes: this.bytes,
    };
  }
}

// /**
//  * Byron legacy address has limited support
//  * @since 2.0.0
//  */
const Bytes = Schema.transform(Schema.Uint8ArrayFromSelf, ByronAddress, {
  strict: true,
  encode: (toI, toA) => Hex.toBytes(toA.bytes),
  decode: (fromI, fromA) => new ByronAddress({ bytes: Hex.fromBytes(fromA) }),
});

export { Bytes, ByronAddress };
