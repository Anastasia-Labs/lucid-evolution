export type Network = "Mainnet" | "Preview" | "Preprod" | "Custom";

/**
 * Converts a Network type to Id number
 *
 * @since 1.0.0
 *
 * @example
 * ```ts
 * import { Network } from "@lucid-evolution/..."
 *
 * Network.toId("Preprod"); // 0
 * Network.toId("Mainnet"); // 1
 * ```
 */

export const toId = (network: Network) => {
  switch (network) {
    case "Preview":
      return 0 as const;
    case "Preprod":
      return 0 as const;
    case "Custom":
      return 0 as const;
    case "Mainnet":
      return 1 as const;
    default:
      throw new Error("Network not found");
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
export const fromId = (
  id: 0 | 1,
  options: { defaultNetwork?: Network } = {},
): Network => {
  const { defaultNetwork = "Preview" } = options;
  if (id === 1) return "Mainnet";
  return defaultNetwork;
};
