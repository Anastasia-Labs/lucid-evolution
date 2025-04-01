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
 * @since 2.0.0
 * @category Variants
 */
export const Weighted = CML.DelegationDistributionKind.Weighted;

/**
 * Legacy variant of the DelegationDistributionKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const Legacy = CML.DelegationDistributionKind.Legacy;


/**
 * Get all values of the DelegationDistributionKind enum
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.DelegationDistributionKind> => [
  CML.DelegationDistributionKind.Weighted,
  CML.DelegationDistributionKind.Legacy
];

/**
 * Convert DelegationDistributionKind enum value to string
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
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.DelegationDistributionKind | undefined => {
  switch (str) {
    case "Weighted":
      return CML.DelegationDistributionKind.Weighted;
    case "Legacy":
      return CML.DelegationDistributionKind.Legacy;
    default:
      return undefined;
  }
};
