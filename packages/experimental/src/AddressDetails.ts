import * as Address from "./Address.js";
import * as _Bech32 from "./Bech32.js";
import { Effect, ParseResult, Schema } from "effect";
import * as NetworkId from "./NetworkId.js";
import * as Hex from "./Hex.js";

/**
 * Extended address information with both structured data and serialized formats
 * Contains the address structure and its serialized representations
 *
 * @since 2.0.0
 * @category model
 */

declare const NominalType: unique symbol;
interface AddressDetails {
  readonly [NominalType]: unique symbol;
}

/**
 * Pointer address with payment credential and pointer to stake registration
 *
 * @since 2.0.0
 * @category schemas
 */
class AddressDetails extends Schema.TaggedClass<AddressDetails>(
  "AddressDetails",
)("AddressDetails", {
  networkId: NetworkId.NetworkId,
  type: Schema.Literal(Address.Address.Type._tag),
  address: Address.Address,
  bech32: _Bech32.Bech32,
  hex: Hex.HexString,
}) {}

const Bech32 = Schema.transformOrFail(
  Schema.typeSchema(_Bech32.Bech32),
  AddressDetails,
  {
    strict: true,
    encode: (toI, options, ast, toA) => ParseResult.succeed(toA.bech32),
    decode: (fromI, options, ast, fromA) =>
      Effect.gen(function* () {
        const address = yield* ParseResult.decode(Address.Bech32)(fromA);
        const hex = yield* ParseResult.encode(Address.HexString)(address);
        return new AddressDetails({
          networkId: address.networkId,
          type: address._tag,
          address,
          bech32: fromA,
          hex,
        });
      }),
  },
);

const HexString = Schema.transformOrFail(
  Schema.typeSchema(Hex.HexString),
  AddressDetails,
  {
    strict: true,
    encode: (toI, options, ast, toA) => ParseResult.succeed(toA.hex),
    decode: (fromI, options, ast, fromA) =>
      Effect.gen(function* () {
        const address = yield* ParseResult.decode(Address.HexString)(fromA);
        const bech32 = yield* ParseResult.encode(Address.Bech32)(address);
        return new AddressDetails({
          networkId: address.networkId,
          type: address._tag,
          address,
          bech32,
          hex: fromA,
        });
      }),
  },
);

export { AddressDetails, Bech32, HexString };
