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
  options?: { defaultNetwork?: Options }
): InferReturnType<ID, Options> => {
  const { defaultNetwork = "Preview" } = options ?? {};
  if (id === 1) return "Mainnet" as InferReturnType<ID, Options>;
  return defaultNetwork as InferReturnType<ID, Options>;
};
type InferReturnType<ID, Options> = ID extends 1 ? "Mainnet" : Options;
