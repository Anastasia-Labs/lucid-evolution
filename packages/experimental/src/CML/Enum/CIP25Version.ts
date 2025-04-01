/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP25Version enum
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP25Version = CML.CIP25Version;

/**
 * V1 variant of the CIP25Version enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const V1 = CML.CIP25Version.V1;

/**
 * V2 variant of the CIP25Version enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const V2 = CML.CIP25Version.V2;


/**
 * Get all values of the CIP25Version enum
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.CIP25Version> => [
  CML.CIP25Version.V1,
  CML.CIP25Version.V2
];

/**
 * Convert CIP25Version enum value to string
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.CIP25Version): string => {
  switch (value) {
    case CML.CIP25Version.V1:
      return "V1";
    case CML.CIP25Version.V2:
      return "V2";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to CIP25Version enum value
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.CIP25Version | undefined => {
  switch (str) {
    case "V1":
      return CML.CIP25Version.V1;
    case "V2":
      return CML.CIP25Version.V2;
    default:
      return undefined;
  }
};
