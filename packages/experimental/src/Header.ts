import * as Bech32 from "./Bech32.js";
import { Effect } from "effect";
/**
 * Parse header from address
 *
 * @example
 * import { Header } from "@evolution-sdk/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Header.fromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const header = Effect.runSync(effect);
 * assert(typeof header === "number");
 * assert(header === 0 || header === 1); // typically 0 for testnet, 1 for mainnet
 *
 * @since 2.0.0
 * @category transformation
 */
//FIX:
// export const fromBech32 = (
//   bech32Address: string,
// ): Effect.Effect<number, Bech32.Bech32Error> =>
//   Effect.map(Bech32.toBytes(bech32Address), (bytes) => bytes[0]);
