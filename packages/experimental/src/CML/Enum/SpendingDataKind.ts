/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML SpendingDataKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type SpendingDataKind = CML.SpendingDataKind;

/**
 * SpendingDataPubKey variant of the SpendingDataKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const SpendingDataPubKey = CML.SpendingDataKind.SpendingDataPubKey;

/**
 * SpendingDataScript variant of the SpendingDataKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const SpendingDataScript = CML.SpendingDataKind.SpendingDataScript;

/**
 * SpendingDataRedeem variant of the SpendingDataKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const SpendingDataRedeem = CML.SpendingDataKind.SpendingDataRedeem;

/**
 * Get all values of the SpendingDataKind enum
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.SpendingDataKind> => [
  CML.SpendingDataKind.SpendingDataPubKey,
  CML.SpendingDataKind.SpendingDataScript,
  CML.SpendingDataKind.SpendingDataRedeem,
];

/**
 * Convert SpendingDataKind enum value to string
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.SpendingDataKind): string => {
  switch (value) {
    case CML.SpendingDataKind.SpendingDataPubKey:
      return "SpendingDataPubKey";
    case CML.SpendingDataKind.SpendingDataScript:
      return "SpendingDataScript";
    case CML.SpendingDataKind.SpendingDataRedeem:
      return "SpendingDataRedeem";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to SpendingDataKind enum value
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.SpendingDataKind | undefined => {
  switch (str) {
    case "SpendingDataPubKey":
      return CML.SpendingDataKind.SpendingDataPubKey;
    case "SpendingDataScript":
      return CML.SpendingDataKind.SpendingDataScript;
    case "SpendingDataRedeem":
      return CML.SpendingDataKind.SpendingDataRedeem;
    default:
      return undefined;
  }
};
