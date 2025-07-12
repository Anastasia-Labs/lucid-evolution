import { Effect, FastCheck, Schema } from "effect";
import * as Bech32 from "./Bech32.js";
import * as NetworkId from "./NetworkId.js";

const Network = Schema.Literal("Mainnet", "Preview", "Preprod", "Custom");
type Network = typeof Network.Type;

/**
 * Converts a Network type to Id number
 *
 * @example
 * ```ts
 * import { Network } from "@evolution-sdk/..."
 *
 * Network.toId("Preprod"); // 0
 * Network.toId("Mainnet"); // 1
 * ```
 *
 * @since 1.0.0
 */
const toId = <T extends Network>(network: T): NetworkId.NetworkId => {
  switch (network) {
    case "Preview":
    case "Preprod":
    case "Custom":
      return NetworkId.NetworkId.make(0);
    case "Mainnet":
      return NetworkId.NetworkId.make(1);
    default:
      throw new Error(`Exhaustive check failed: Unhandled case ${network}`);
  }
};

const fromId = (id: NetworkId.NetworkId): Network => {
  switch (id) {
    case 0:
      return "Preview";
    case 1:
      return "Mainnet";
    default:
      throw new Error(`Exhaustive check failed: Unhandled case ${id}`);
  }
};
