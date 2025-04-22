import { Schema, Effect, Data } from "effect";
import { bech32 } from "@scure/base";
import * as Bytes from "./Bytes.js";
import * as CBOR from "./CBOR.js";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as SerdeImpl from "./SerdeImpl.js";
import * as PointerAddress from "./PointerAddress.js";
import * as BaseAddress from "./BaseAddress.js";
import * as EnterpriseAddress from "./EnterpriseAddress.js";
import * as RewardAccount from "./RewardAccount.js";
import * as ByronAddress from "./ByronAddress.js";
import * as Bech32 from "./Bech32.js";
import { ParseError } from "effect/ParseResult";

/**
 * CDDL specs
 * ; address format:
 * ;   [ 8 bit header | payload ];
 * ;
 * ; shelley payment addresses:
 * ;      bit 7: 0
 * ;      bit 6: base/other
 * ;      bit 5: pointer/enterprise [for base: stake cred is keyhash/scripthash]
 * ;      bit 4: payment cred is keyhash/scripthash
 * ;   bits 3-0: network id
 * ;
 * ; reward addresses:
 * ;   bits 7-5: 111
 * ;      bit 4: credential is keyhash/scripthash
 * ;   bits 3-0: network id
 * ;
 * ; byron addresses:
 * ;   bits 7-4: 1000
 * ;
 * ;      0000: base address: keyhash28,keyhash28
 * ;      0001: base address: scripthash28,keyhash28
 * ;      0010: base address: keyhash28,scripthash28
 * ;      0011: base address: scripthash28,scripthash28
 * ;      0100: pointer address: keyhash28, 3 variable length uint
 * ;      0101: pointer address: scripthash28, 3 variable length uint
 * ;      0110: enterprise address: keyhash28
 * ;      0111: enterprise address: scripthash28
 * ;      1000: byron address
 * ;      1110: reward account: keyhash28
 * ;      1111: reward account: scripthash28
 * ;      1001-1101: future formats
 */

/**
 * Error thrown when address operations fail
 *
 * @since 2.0.0
 * @category model
 */
export class AddressError extends Data.TaggedError("AddressError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Union schema representing all possible address formats
 * Discriminated by the 'kind' field
 *
 * @since 2.0.0
 * @category schemas
 */
export const Address = Schema.Union(
  BaseAddress.BaseAddress,
  EnterpriseAddress.EnterpriseAddress,
  PointerAddress.PointerAddress,
  RewardAccount.RewardAccount,
  ByronAddress.ByronAddress,
);

/**
 * Type inferred from the AddressInfo schema
 *
 * @since 2.0.0
 * @category model
 */
export type Address =
  | BaseAddress.BaseAddress
  | EnterpriseAddress.EnterpriseAddress
  | PointerAddress.PointerAddress
  | RewardAccount.RewardAccount
  | ByronAddress.ByronAddress;

/**
 * Convert bytes to an address structure
 *
 * @example
 * import { Address, Bytes } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const addressBytes = Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251");
 * const effect = Address.fromBytes(addressBytes);
 * const address = Effect.runSync(effect);
 * assert(address._tag === "BaseAddress");
 * assert(address.networkId === 1);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromBytes: SerdeImpl.FromBytes<
  Address,
  | AddressError
  | KeyHash.KeyHashError
  | ScriptHash.ScriptHashError
  | Bytes.BytesError
  | PointerAddress.PointerAddressError
  | ParseError
> = Effect.fnUntraced(function* (bytes: Uint8Array) {
  const header = bytes[0];
  // Extract address type from the upper 4 bits (bits 4-7)
  const addressType = header >> 4;

  switch (addressType) {
    // Base address types (0000, 0001, 0010, 0011)
    // Format: [payment credential, stake credential]
    case 0b0000: // Key payment, Key stake
    case 0b0001: // Script payment, Key stake
    case 0b0010: // Key payment, Script stake
    case 0b0011:
      return yield* BaseAddress.fromBytes(bytes);

    // Enterprise address types (0110, 0111)
    // Format: [payment credential only]
    case 0b0110: // Key payment
    case 0b0111:
      return yield* EnterpriseAddress.fromBytes(bytes);

    // Pointer address types (0100, 0101)
    // Format: [payment credential, variable length integers for slot, txIndex, certIndex]
    case 0b0100: // Key payment with pointer
    case 0b0101:
      return yield* PointerAddress.fromBytes(bytes);

    case 0b1110:
    case 0b1111:
      return yield* RewardAccount.fromBytes(bytes);

    case 0b1000:
      return ByronAddress.fromBytes(bytes);

    default:
      return yield* new AddressError({
        message: `Unknown address type: ${addressType}`,
      });
  }
});

/**
 * Parse the complete address structure into a typed representation
 * This decodes the address format according to CIP-0019 specification
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const address = Effect.runSync(effect);
 * assert(address._tag === "BaseAddress");
 * assert(address.networkId === 1);
 *
 * const stakeEffect = Address.fromBech32("stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw");
 * const stakeAddress = Effect.runSync(stakeEffect);
 * assert(stakeAddress._tag === "RewardAccount");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const fromBech32: SerdeImpl.FromBech32<
  Address,
  | KeyHash.KeyHashError
  | ScriptHash.ScriptHashError
  | Bytes.BytesError
  | AddressError
  | PointerAddress.PointerAddressError
  | Bech32.Bech32Error
  | ParseError
> = Effect.fnUntraced(function* (bech32Address) {
  const bytes = yield* Bech32.toBytes(bech32Address);
  return yield* fromBytes(bytes);
});

/**
 * Serialize a PaymentAddress to JSON format
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const json = Address.paymentAddressToJson("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * assert(typeof json === "string");
 * assert(JSON.parse(json).address === "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const paymentAddressToJson = (address: string): string =>
  JSON.stringify({
    address,
  });

/**
 * Convert address to bytes
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect, pipe } from "effect";
 * import assert from "assert";
 *
 * const addressEffect = pipe(
 *   Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x"),
 *   Effect.map(Address.toBytes)
 * );
 *
 * const bytes = Effect.runSync(addressEffect);
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length > 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toBytes = (address: Address) => {
  switch (address._tag) {
    case "BaseAddress":
      return BaseAddress.toBytes(address);
    case "EnterpriseAddress":
      return EnterpriseAddress.toBytes(address);
    case "PointerAddress":
      return PointerAddress.toBytes(address);
    case "RewardAccount":
      return RewardAccount.toBytes(address);
    case "ByronAddress":
      return Bytes.fromHexOrThrow(address.bytes);
  }
};

/**
 * Convert address to hex string
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect, pipe } from "effect";
 * import assert from "assert";
 *
 * const effect = pipe(
 *   Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x"),
 *   Effect.map(Address.toHex)
 * );
 *
 * const hex = Effect.runSync(effect);
 * assert(typeof hex === "string");
 * assert(hex.length > 0);
 * assert(/^[0-9a-f]+$/i.test(hex));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toHex = (address: Address) => Bytes.toHexOrThrow(toBytes(address));

/**
 * Convert address to bech32 format
 *
 * @example
 * import { Address, Bytes } from "@lucid-evolution/experimental";
 * import { Effect, pipe } from "effect";
 * import assert from "assert";
 *
 * // First create an address from bytes
 * const bytesEffect = pipe(
 *   Address.fromBytes(Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251")),
 *   Effect.map(Address.toBech32)
 * );
 *
 * const bech32 = Effect.runSync(bytesEffect);
 * assert(typeof bech32 === "string");
 * assert(bech32.startsWith("addr1"));
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toBech32 = (address: Address): string => {
  const bytes = toBytes(address);
  let prefix: string;
  switch (address._tag) {
    case "BaseAddress":
    case "EnterpriseAddress":
    case "PointerAddress":
      prefix = address.networkId === 0 ? "addr_test" : "addr";
      break;
    case "RewardAccount":
      prefix = address.networkId === 0 ? "stake_test" : "stake";
      break;
    case "ByronAddress":
      prefix = "";
      break;
  }
  const words = bech32.toWords(bytes);
  return bech32.encode(prefix, words, false);
};

/**
 * Encode a Cardano address to CBOR format
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x")
 *   .pipe(Effect.map(Address.toCBOR));
 *
 * const cborHex = Effect.runSync(effect);
 * assert(typeof cborHex === "string");
 * assert(cborHex.length > 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toCBOR = (address: Address) =>
  Bytes.toHexOrThrow(CBOR.encodeOrThrow(toBytes(address)));
