/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML DatumOptionKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type DatumOptionKind = CML.DatumOptionKind;

/**
 * Hash variant of the DatumOptionKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const Hash = CML.DatumOptionKind.Hash;

/**
 * Datum variant of the DatumOptionKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const Datum = CML.DatumOptionKind.Datum;


/**
 * Get all values of the DatumOptionKind enum
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.DatumOptionKind> => [
  CML.DatumOptionKind.Hash,
  CML.DatumOptionKind.Datum
];

/**
 * Convert DatumOptionKind enum value to string
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.DatumOptionKind): string => {
  switch (value) {
    case CML.DatumOptionKind.Hash:
      return "Hash";
    case CML.DatumOptionKind.Datum:
      return "Datum";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to DatumOptionKind enum value
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.DatumOptionKind | undefined => {
  switch (str) {
    case "Hash":
      return CML.DatumOptionKind.Hash;
    case "Datum":
      return CML.DatumOptionKind.Datum;
    default:
      return undefined;
  }
};
