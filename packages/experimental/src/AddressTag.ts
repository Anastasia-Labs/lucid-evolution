import { Data, Effect } from "effect";
import * as Bech32 from "./Bech32.js";
import * as Header from "./Header.js";

/**
 * @since 2.0.0
 * @category model
 */
export class AddressTagError extends Data.TaggedError("AddressTagError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Address header kind - used to determine the type of address from its header
 * Following CIP-0019 address types
 *
 * @since 2.0.0
 * @category model
 */
export type AddressTag = "Base" | "Enterprise" | "Pointer" | "Reward" | "Byron";

// /**
//  * Get address kind from address string
//  *
//  * @example
//  * import { AddressTag } from "@evolution-sdk/experimental";
//  * import { Effect } from "effect";
//  * import assert from "assert";
//  *
//  * const effect = AddressTag.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
//  * const tag = Effect.runSync(effect);
//  * assert(tag === "Base");
//  *
//  * @since 2.0.0
//  * @category transformation
//  */
// export const fromBech32 = (
//   bech32Address: string,
// ): Effect.Effect<AddressTag, Bech32.Bech32Error> =>
//   Effect.map(Header.fromBech32(bech32Address), (header) => fromHeader(header));

// /**
//  * Get address tag from header byte
//  * Shifts the header byte to the right by 4 bits to isolate the address type
//  *
//  * @example
//  * import { AddressTag } from "@evolution-sdk/experimental";
//  * import assert from "assert";
//  *
//  * const tag = AddressTag.fromHeader(0);
//  * assert(tag === "Base");
//  *
//  * @since 2.0.0
//  * @category transformation
//  */
// export const fromHeader = (header: number): AddressTag => {
//   const addressType = header >> 4;
//   switch (addressType) {
//     case 0b0000:
//     case 0b0001:
//     case 0b0010:
//     case 0b0011:
//       return "Base";
//     case 0b0100:
//     case 0b0101:
//       return "Pointer";
//     case 0b0110:
//     case 0b0111:
//       return "Enterprise";
//     case 0b1000:
//       return "Byron";
//     case 0b1110:
//     case 0b1111:
//       return "Reward";
//     default:
//       throw new AddressTagError({
//         message: `Unknown address header: ${header}`,
//       });
//   }
// };
