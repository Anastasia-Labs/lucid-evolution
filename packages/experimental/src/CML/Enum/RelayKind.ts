/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RelayKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type RelayKind = CML.RelayKind;

/**
 * SingleHostAddr variant of the RelayKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const SingleHostAddr = CML.RelayKind.SingleHostAddr;

/**
 * SingleHostName variant of the RelayKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const SingleHostName = CML.RelayKind.SingleHostName;

/**
 * MultiHostName variant of the RelayKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const MultiHostName = CML.RelayKind.MultiHostName;


/**
 * Get all values of the RelayKind enum
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.RelayKind> => [
  CML.RelayKind.SingleHostAddr,
  CML.RelayKind.SingleHostName,
  CML.RelayKind.MultiHostName
];

/**
 * Convert RelayKind enum value to string
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.RelayKind): string => {
  switch (value) {
    case CML.RelayKind.SingleHostAddr:
      return "SingleHostAddr";
    case CML.RelayKind.SingleHostName:
      return "SingleHostName";
    case CML.RelayKind.MultiHostName:
      return "MultiHostName";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to RelayKind enum value
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.RelayKind | undefined => {
  switch (str) {
    case "SingleHostAddr":
      return CML.RelayKind.SingleHostAddr;
    case "SingleHostName":
      return CML.RelayKind.SingleHostName;
    case "MultiHostName":
      return CML.RelayKind.MultiHostName;
    default:
      return undefined;
  }
};
