/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeDistributionKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeDistributionKind = CML.StakeDistributionKind;

/**
 * SingleKey variant of the StakeDistributionKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const SingleKey = CML.StakeDistributionKind.SingleKey;

/**
 * BootstrapEra variant of the StakeDistributionKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const BootstrapEra = CML.StakeDistributionKind.BootstrapEra;

/**
 * Get all values of the StakeDistributionKind enum
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.StakeDistributionKind> => [
  CML.StakeDistributionKind.SingleKey,
  CML.StakeDistributionKind.BootstrapEra,
];

/**
 * Convert StakeDistributionKind enum value to string
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.StakeDistributionKind): string => {
  switch (value) {
    case CML.StakeDistributionKind.SingleKey:
      return "SingleKey";
    case CML.StakeDistributionKind.BootstrapEra:
      return "BootstrapEra";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to StakeDistributionKind enum value
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (
  str: string,
): CML.StakeDistributionKind | undefined => {
  switch (str) {
    case "SingleKey":
      return CML.StakeDistributionKind.SingleKey;
    case "BootstrapEra":
      return CML.StakeDistributionKind.BootstrapEra;
    default:
      return undefined;
  }
};
