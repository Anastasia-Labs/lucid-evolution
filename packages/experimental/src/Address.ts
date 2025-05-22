import { Effect, Data, FastCheck, Schema, ParseResult, pipe } from "effect";
import * as PointerAddress from "./PointerAddress.js";
import * as BaseAddress from "./BaseAddress.js";
import * as EnterpriseAddress from "./EnterpriseAddress.js";
import * as RewardAccount from "./RewardAccount.js";
import * as ByronAddress from "./ByronAddress.js";
import * as Hex from "./Hex.js";

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
class AddressError extends Data.TaggedError("AddressError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Union type representing all possible address types
 *
 * @since 2.0.0
 * @category model
 */
const Address = Schema.Union(
  BaseAddress.BaseAddress,
  EnterpriseAddress.EnterpriseAddress,
  PointerAddress.PointerAddress,
  RewardAccount.RewardAccount,
  ByronAddress.ByronAddress,
);

type Address = typeof Address.Type;

const Bytes = Schema.transformOrFail(Schema.Uint8ArrayFromSelf, Address, {
  strict: true,
  encode: (toI, options, ast, toA) => {
    switch (toA._tag) {
      case "BaseAddress":
        return ParseResult.encode(BaseAddress.Bytes)(toA);
      case "EnterpriseAddress":
        return ParseResult.encode(EnterpriseAddress.Bytes)(toA);
      case "PointerAddress":
        return ParseResult.encode(PointerAddress.Bytes)(toA);
      case "RewardAccount":
        return ParseResult.encode(RewardAccount.Bytes)(toA);
      case "ByronAddress":
        return ParseResult.encode(ByronAddress.Bytes)(toA);
    }
  },
  decode: (fromI, options, ast, fromA) =>
    Effect.gen(function* () {
      const header = fromA[0];
      // Extract address type from the upper 4 bits (bits 4-7)
      const addressType = header >> 4;

      switch (addressType) {
        // Base address types (0000, 0001, 0010, 0011)
        // Format: [payment credential, stake credential]
        case 0b0000: // Key payment, Key stake
        case 0b0001: // Script payment, Key stake
        case 0b0010: // Key payment, Script stake
        case 0b0011:
          return yield* ParseResult.decode(BaseAddress.Bytes)(fromA);

        // Enterprise address types (0110, 0111)
        // Format: [payment credential only]
        case 0b0110: // Key payment
        case 0b0111:
          return yield* ParseResult.decode(EnterpriseAddress.Bytes)(fromA);

        // Pointer address types (0100, 0101)
        // Format: [payment credential, variable length integers for slot, txIndex, certIndex]
        case 0b0100: // Key payment with pointer
        case 0b0101:
          return yield* ParseResult.decode(PointerAddress.Bytes)(fromA);

        case 0b1110:
        case 0b1111:
          return yield* ParseResult.decode(RewardAccount.Bytes)(fromA);

        case 0b1000:
          return yield* ParseResult.decode(ByronAddress.Bytes)(fromA);

        default:
          return yield* ParseResult.fail(
            new ParseResult.Type(
              ast,
              fromA,
              `Unknown address type: ${addressType}`,
            ),
          );
      }
    }),
});

const HexString = Schema.transformOrFail(Hex.HexString, Address, {
  strict: true,
  encode: (toI, options, ast, toA) =>
    pipe(ParseResult.encode(Bytes)(toA), Effect.map(Hex.fromBytes)),
  decode: (fromI, options, ast, fromA) =>
    pipe(Hex.toBytes(fromA), ParseResult.decode(Bytes)),
});

// /**
//  * Parse the complete address structure into a typed representation
//  * This decodes the address format according to CIP-0019 specification
//  *
//  * @example
//  * import { Address } from "@lucid-evolution/experimental";
//  * import { Effect } from "effect";
//  * import assert from "assert";
//  *
//  * const effect = Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
//  * const address = Effect.runSync(effect);
//  * assert(address._tag === "BaseAddress");
//  * assert(address.networkId === 1);
//  *
//  * const stakeEffect = Address.fromBech32("stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw");
//  * const stakeAddress = Effect.runSync(stakeEffect);
//  * assert(stakeAddress._tag === "RewardAccount");
//  *
//  * @since 2.0.0
//  * @category encoding/decoding
//  */
// export const fromBech32: Serialization.FromBech32<
//   Address,
//   | KeyHash.KeyHashError
//   | ScriptHash.ScriptHashError
//   | Bytes.BytesError
//   | AddressError
//   | Bech32.Bech32Error
//   | ParseError
// > = Effect.fnUntraced(function* (bech32Address) {
//   const bytes = yield* Bech32.toBytes(bech32Address);
//   return yield* fromBytes(bytes);
// });

// /**
//  * Serialize a PaymentAddress to JSON format
//  *
//  * @example
//  * import { Address } from "@lucid-evolution/experimental";
//  * import assert from "assert";
//  *
//  * const json = Address.paymentAddressToJson("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
//  * assert(typeof json === "string");
//  * assert(JSON.parse(json).address === "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
//  *
//  * @since 2.0.0
//  * @category encoding/decoding
//  */
// export const paymentAddressToJson = (address: string): string =>
//   JSON.stringify({
//     address,
//   });

// /**
//  * Convert address to bech32 format
//  *
//  * @example
//  * import { Address, Bytes } from "@lucid-evolution/experimental";
//  * import { Effect, pipe } from "effect";
//  * import assert from "assert";
//  *
//  * // First create an address from bytes
//  * const bytesEffect = pipe(
//  *   Address.fromBytes(Bytes.fromHexOrThrow("019493315cd92eb5d8c4304e67b7e16ae36d61d34502694657811a2c8e337b62cfff6403a06a3acbc34f8c46003c69fe79a3628cefa9c47251")),
//  *   Effect.map(Address.toBech32)
//  * );
//  *
//  * const bech32 = Effect.runSync(bytesEffect);
//  * assert(typeof bech32 === "string");
//  * assert(bech32.startsWith("addr1"));
//  *
//  * @since 2.0.0
//  * @category encoding/decoding
//  */
// export const toBech32 = (address: Address): string => {
//   const bytes = toBytes(address);
//   let prefix: string;
//   switch (address._tag) {
//     case "BaseAddress":
//     case "EnterpriseAddress":
//     case "PointerAddress":
//       prefix = address.networkId === 0 ? "addr_test" : "addr";
//       break;
//     case "RewardAccount":
//       prefix = address.networkId === 0 ? "stake_test" : "stake";
//       break;
//     case "ByronAddress":
//       prefix = "";
//       break;
//   }
//   const words = bech32.toWords(bytes);
//   return bech32.encode(prefix, words, false);
// };

// /**
//  * Encode a Cardano address to CBOR format
//  *
//  * @example
//  * import { Address } from "@lucid-evolution/experimental";
//  * import { Effect } from "effect";
//  * import assert from "assert";
//  *
//  * const effect = Address.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x")
//  *   .pipe(Effect.map(Address.toCBOR));
//  *
//  * const cborHex = Effect.runSync(effect);
//  * assert(typeof cborHex === "string");
//  * assert(cborHex.length > 0);
//  *
//  * @since 2.0.0
//  * @category encoding/decoding
//  */
// export const toCBOR = (address: Address) =>
//   Hex.fromBytes(CBOR.encodeAsBytesOrThrow(toBytes(address)));

const equals = (a: Address, b: Address): boolean => {
  if (a._tag !== b._tag) {
    return false;
  }
  switch (a._tag) {
    case "BaseAddress":
      return BaseAddress.equals(a, b as BaseAddress.BaseAddress);
    case "EnterpriseAddress":
      return EnterpriseAddress.equals(
        a,
        b as EnterpriseAddress.EnterpriseAddress,
      );
    case "PointerAddress":
      return PointerAddress.equals(a, b as PointerAddress.PointerAddress);
    case "RewardAccount":
      return RewardAccount.equals(a, b as RewardAccount.RewardAccount);
    case "ByronAddress":
      return false;
  }
};

const generator = FastCheck.oneof(
  BaseAddress.generator,
  EnterpriseAddress.generator,
  PointerAddress.generator,
  RewardAccount.generator,
);

export { Address, AddressError, Bytes, HexString, equals, generator };
