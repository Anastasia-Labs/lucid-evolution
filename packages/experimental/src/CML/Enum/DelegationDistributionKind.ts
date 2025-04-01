/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML DelegationDistributionKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type DelegationDistributionKind = CML.DelegationDistributionKind;

/**
 * Weighted variant of the DelegationDistributionKind enum
 *
 * @example
 * import { DelegationDistributionKind } from "@lucid-evolution/experimental";
 *
 * const kind = DelegationDistributionKind.Weighted;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Weighted = CML.DelegationDistributionKind.Weighted;

/**
 * Legacy variant of the DelegationDistributionKind enum
 *
 * @example
 * import { DelegationDistributionKind } from "@lucid-evolution/experimental";
 *
 * const kind = DelegationDistributionKind.Legacy;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Legacy = CML.DelegationDistributionKind.Legacy;

/**
 * Get all values of the DelegationDistributionKind enum
 *
 * @example
 * import { DelegationDistributionKind } from "@lucid-evolution/experimental";
 *
 * const allValues = DelegationDistributionKind.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.DelegationDistributionKind> => [
  CML.DelegationDistributionKind.Weighted,
  CML.DelegationDistributionKind.Legacy,
];

/**
 * Convert DelegationDistributionKind enum value to string
 *
 * @example
 * import { DelegationDistributionKind } from "@lucid-evolution/experimental";
 *
 * const name = DelegationDistributionKind.toString(CML.DelegationDistributionKind.Weighted);
 * console.log(name); // "Weighted"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.DelegationDistributionKind): string => {
  switch (value) {
    case CML.DelegationDistributionKind.Weighted:
      return "Weighted";
    case CML.DelegationDistributionKind.Legacy:
      return "Legacy";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to DelegationDistributionKind enum value
 *
 * @example
 * import { DelegationDistributionKind } from "@lucid-evolution/experimental";
 *
 * const value = DelegationDistributionKind.fromString("Weighted");
 * console.log(value); // Some(CML.DelegationDistributionKind.Weighted)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (
  str: string,
): CML.DelegationDistributionKind | undefined => {
  switch (str) {
    case "Weighted":
      return CML.DelegationDistributionKind.Weighted;
    case "Legacy":
      return CML.DelegationDistributionKind.Legacy;
    default:
      return undefined;
  }
};
