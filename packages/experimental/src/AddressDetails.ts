import * as Address from "./Address.js";
import * as _Bech32 from "./Bech32.js";
import { Effect, ParseResult, Schema } from "effect";
import * as NetworkId from "./NetworkId.js";
import * as Bytes from "./Bytes.js";

/**
 * Extended address information with both structured data and serialized formats
 * Contains the address structure and its serialized representations
 *
 * @since 2.0.0
 * @category model
 */

declare const NominalType: unique symbol;
export interface AddressDetails {
  readonly [NominalType]: unique symbol;
}

/**
 * Pointer address with payment credential and pointer to stake registration
 *
 * @since 2.0.0
 * @category schemas
 */
export class AddressDetails extends Schema.TaggedClass<AddressDetails>(
  "AddressDetails",
)("AddressDetails", {
  networkId: NetworkId.NetworkId,
  type: Schema.Union(
    Schema.Literal("BaseAddress"),
    Schema.Literal("EnterpriseAddress"),
    Schema.Literal("PointerAddress"),
    Schema.Literal("RewardAccount"),
    Schema.Literal("ByronAddress"),
  ),
  address: Address.Address,
  bech32: _Bech32.Bech32Schema,
  hex: Bytes.HexSchema,
}) {}

export const Bech32 = Schema.transformOrFail(
  Schema.typeSchema(_Bech32.Bech32Schema),
  AddressDetails,
  {
    strict: true,
    encode: (_, __, ___, toA) => ParseResult.succeed(toA.bech32),
    decode: (_, __, ___, fromA) =>
      Effect.gen(function* () {
        const address = yield* ParseResult.decode(Address.Bech32Schema)(fromA);
        const hex = yield* ParseResult.encode(Address.HexSchema)(address);
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

export const HexSchema = Schema.transformOrFail(
  Schema.typeSchema(Bytes.HexSchema),
  AddressDetails,
  {
    strict: true,
    encode: (_, __, ___, toA) => ParseResult.succeed(toA.hex),
    decode: (_, __, ___, fromA) =>
      Effect.gen(function* () {
        const address = yield* ParseResult.decode(Address.HexSchema)(fromA);
        const bech32 = yield* ParseResult.encode(Address.Bech32Schema)(address);
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
