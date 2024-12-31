export type Network = "Mainnet" | "Preview" | "Preprod" | "Custom";

export const toId = (network: Network): number => {
  switch (network) {
    case "Preview":
      return 0;
    case "Preprod":
      return 0;
    case "Custom":
      return 0;
    case "Mainnet":
      return 1;
    default:
      throw new Error("Network not found");
  }
};
