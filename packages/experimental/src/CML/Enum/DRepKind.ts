/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML DRepKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type DRepKind = CML.DRepKind;

/**
 * Key variant of the DRepKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const Key = CML.DRepKind.Key;

/**
 * Script variant of the DRepKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const Script = CML.DRepKind.Script;

/**
 * AlwaysAbstain variant of the DRepKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const AlwaysAbstain = CML.DRepKind.AlwaysAbstain;

/**
 * AlwaysNoConfidence variant of the DRepKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const AlwaysNoConfidence = CML.DRepKind.AlwaysNoConfidence;

/**
 * Get all values of the DRepKind enum
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.DRepKind> => [
  CML.DRepKind.Key,
  CML.DRepKind.Script,
  CML.DRepKind.AlwaysAbstain,
  CML.DRepKind.AlwaysNoConfidence,
];

/**
 * Convert DRepKind enum value to string
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.DRepKind): string => {
  switch (value) {
    case CML.DRepKind.Key:
      return "Key";
    case CML.DRepKind.Script:
      return "Script";
    case CML.DRepKind.AlwaysAbstain:
      return "AlwaysAbstain";
    case CML.DRepKind.AlwaysNoConfidence:
      return "AlwaysNoConfidence";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to DRepKind enum value
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.DRepKind | undefined => {
  switch (str) {
    case "Key":
      return CML.DRepKind.Key;
    case "Script":
      return CML.DRepKind.Script;
    case "AlwaysAbstain":
      return CML.DRepKind.AlwaysAbstain;
    case "AlwaysNoConfidence":
      return CML.DRepKind.AlwaysNoConfidence;
    default:
      return undefined;
  }
};
