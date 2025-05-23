import { Inspectable, Schema } from "effect";
import * as Hex from "./Hex.js";
import * as NetworkId from "./NetworkId.js";

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
    networkId: NetworkId.NetworkId,
    bytes: Hex.HexString,
  },
) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "ByronAddress",
      networkId: this.networkId,
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
  decode: (fromI, fromA) =>
    new ByronAddress({
      networkId: NetworkId.NetworkId.make(0),
      bytes: Hex.fromBytes(fromA),
    }),
});

export { Bytes, ByronAddress };
