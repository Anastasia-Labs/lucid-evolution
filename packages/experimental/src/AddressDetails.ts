import * as Address from "./Address.js";
import * as SerdeImpl from "./Serialization.js";
import * as Bytes from "./Bytes.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as PointerAddress from "./PointerAddress.js";
import * as Bech32 from "./Bech32.js";
import * as PaymentAddress from "./PaymentAddress.js";
import * as RewardAddress from "./RewardAddress.js";
import { ParseError } from "effect/ParseResult";
import { Effect } from "effect";

/**
 * Extended address information with both structured data and serialized formats
 * Contains the address structure and its serialized representations
 *
 * @since 2.0.0
 * @category model
 */
export type AddressDetails = Address.Address & {
  address: {
    bech32: string;
    hex: string;
  };
};

/**
 * Extract detailed information from a bech32 address
 *
 * @example
 * import { AddressDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = AddressDetails.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const details = Effect.runSync(effect);
 * assert(details._tag === "BaseAddress");
 * assert(details.networkId === 1);
 * assert(details.address.bech32 === "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * assert(typeof details.address.hex === "string");
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromBech32: SerdeImpl.FromBech32<
  AddressDetails,
  | Bytes.BytesError
  | Address.AddressError
  | KeyHash.KeyHashError
  | ScriptHash.ScriptHashError
  | PointerAddress.PointerAddressError
  | Bech32.Bech32Error
  | ParseError
> = Effect.fnUntraced(function* (bech32Address) {
  const decodedAddress = yield* Address.fromBech32(bech32Address);
  const hex = Address.toHex(decodedAddress);
  return {
    ...decodedAddress,
    address: {
      bech32: bech32Address,
      hex,
    },
  } as AddressDetails;
});

/**
 * Extract detailed information from a hex-encoded address
 *
 * @example
 * import { AddressDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = AddressDetails.fromHex("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const details = Effect.runSync(effect);
 * assert(details._tag === "BaseAddress");
 * assert(details.networkId === 1);
 * assert(typeof details.address.bech32 === "string");
 * assert(details.address.hex === "019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromHex: SerdeImpl.FromHex<
  AddressDetails,
  | Bytes.BytesError
  | Address.AddressError
  | KeyHash.KeyHashError
  | ScriptHash.ScriptHashError
  | PointerAddress.PointerAddressError
  | ParseError
> = Effect.fnUntraced(function* (hexAddress) {
  const hex = yield* Bytes.fromHex(hexAddress);
  const decodedAddress = yield* Address.fromBytes(hex);
  const bech32 = Address.toBech32(decodedAddress);
  return {
    ...decodedAddress,
    address: {
      bech32,
      hex: hexAddress,
    },
  } as AddressDetails;
});

/**
 * Extract address details from a string (auto-detects bech32 or hex format)
 *
 * @example
 * import { AddressDetails } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * // From bech32
 * const bech32Effect = AddressDetails.fromString("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const bech32Details = Effect.runSync(bech32Effect);
 * assert(bech32Details._tag === "BaseAddress");
 *
 * // From hex
 * const hexEffect = AddressDetails.fromString("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const hexDetails = Effect.runSync(hexEffect);
 * assert(hexDetails._tag === "BaseAddress");
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromString = Effect.fnUntraced(function* (stringAddress: string) {
  const isBech32 =
    PaymentAddress.isPaymentAddress(stringAddress) ||
    RewardAddress.isRewardAddress(stringAddress);
  if (isBech32) {
    return yield* fromBech32(stringAddress);
  } else {
    return yield* fromHex(stringAddress);
  }
});
