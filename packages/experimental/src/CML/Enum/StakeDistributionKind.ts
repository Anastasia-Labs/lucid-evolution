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
 * @example
 * import { StakeDistributionKind } from "@lucid-evolution/experimental";
 * 
 * const kind = StakeDistributionKind.SingleKey;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const SingleKey = CML.StakeDistributionKind.SingleKey;

/**
 * BootstrapEra variant of the StakeDistributionKind enum
 * 
 * @example
 * import { StakeDistributionKind } from "@lucid-evolution/experimental";
 * 
 * const kind = StakeDistributionKind.BootstrapEra;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const BootstrapEra = CML.StakeDistributionKind.BootstrapEra;


/**
 * Get all values of the StakeDistributionKind enum
 * 
 * @example
 * import { StakeDistributionKind } from "@lucid-evolution/experimental";
 * 
 * const allValues = StakeDistributionKind.values();
 * console.log(allValues);
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.StakeDistributionKind> => [
  CML.StakeDistributionKind.SingleKey,
  CML.StakeDistributionKind.BootstrapEra
];

/**
 * Convert StakeDistributionKind enum value to string
 * 
 * @example
 * import { StakeDistributionKind } from "@lucid-evolution/experimental";
 * 
 * const name = StakeDistributionKind.toString(CML.StakeDistributionKind.SingleKey);
 * console.log(name); // "SingleKey"
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
 * @example
 * import { StakeDistributionKind } from "@lucid-evolution/experimental";
 * 
 * const value = StakeDistributionKind.fromString("SingleKey");
 * console.log(value); // Some(CML.StakeDistributionKind.SingleKey)
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.StakeDistributionKind | undefined => {
  switch (str) {
    case "SingleKey":
      return CML.StakeDistributionKind.SingleKey;
    case "BootstrapEra":
      return CML.StakeDistributionKind.BootstrapEra;
    default:
      return undefined;
  }
};
