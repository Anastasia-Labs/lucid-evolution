import { Effect, FastCheck } from "effect";
import * as Bech32 from "./Bech32.js";

/**
 * Address Network ID type - either a testnet (0) or mainnet (1)
 * As defined in CIP-0019
 *
 * @since 2.0.0
 * @category model
 */
export type NetworkId = 0 | 1 | number;

export type Network = "Mainnet" | "Preview" | "Preprod" | "Custom";

/**
 * Converts a Network type to Id number
 *
 * @example
 * ```ts
 * import { Network } from "@lucid-evolution/..."
 *
 * Network.toId("Preprod"); // 0
 * Network.toId("Mainnet"); // 1
 * ```
 *
 * @since 1.0.0
 */
export const toId = <T extends Network>(network: T): 0 | 1 => {
  switch (network) {
    case "Preview":
    case "Preprod":
    case "Custom":
      return 0;
    case "Mainnet":
      return 1;
    default:
      throw new Error(`Exhaustive check failed: Unhandled case ${network}`);
  }
};

/**
 * Converts a Id type to Network
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * import { Network } from "@lucid-evolution/..."
 *
 * Network.fromId(1); // "Mainnet"
 * Network.fromId(0); // "Preview"
 * Network.fromId(0, { defaultNetwork: "Preprod" }); // Preprod
 * ```
 */
export const fromId = <
  ID extends 0 | 1,
  Options extends Exclude<Network, "Mainnet">,
>(
  id: ID,
  options?: { defaultNetwork?: Options },
): InferReturnType<ID, Options> => {
  const { defaultNetwork = "Preview" } = options ?? {};
  if (id === 1) return "Mainnet" as InferReturnType<ID, Options>;
  return defaultNetwork as InferReturnType<ID, Options>;
};
type InferReturnType<ID, Options> = ID extends 1 ? "Mainnet" : Options;

/**
 * Extract network ID from address by applying a bit mask to isolate the network identifier
 * Network ID is stored in the lower 4 bits of the header byte (bits 0-3)
 *
 * @example
 * import { Address } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Address.networkIdFromBech32("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const networkId = Effect.runSync(effect);
 * assert(networkId === 1); // 1 for mainnet
 *
 * // For testnet addresses:
 * const testnetEffect = Address.networkIdFromBech32("addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae");
 * const testnetId = Effect.runSync(testnetEffect);
 * assert(testnetId === 0); // 0 for testnet
 *
 * @since 2.0.0
 * @category transformation
 */
export const fromBech32 = (
  bech32Address: string,
): Effect.Effect<NetworkId, Bech32.Bech32Error> =>
  // Apply bit mask 0b00001111 (0x0F) to extract only the last 4 bits
  // representing the network ID (0 for testnet, 1 for mainnet)
  Effect.map(Bech32.toBytes(bech32Address), (bytes) => bytes[0] & 0b00001111);

export const generator = FastCheck.integer({
  min: 0,
  max: 1,
});
