import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type DRepKind = CML.DRepKind;

export const Key = CML.DRepKind.Key;
export const Script = CML.DRepKind.Script;
export const AlwaysAbstain = CML.DRepKind.AlwaysAbstain;
export const AlwaysNoConfidence = CML.DRepKind.AlwaysNoConfidence;

/**
 * Get all values of the DRepKind enum
 *
 * @example
 * import { DRepKind } from "@lucid-evolution/experimental";
 *
 * const allValues = DRepKind.values();
 * console.log(allValues);
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
 * @example
 * import { DRepKind } from "@lucid-evolution/experimental";
 *
 * const name = DRepKind.toString(CML.DRepKind.Key);
 * console.log(name); // "Key"
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
 * @example
 * import { DRepKind } from "@lucid-evolution/experimental";
 *
 * const value = DRepKind.fromString("Key");
 * console.log(value); // Some(CML.DRepKind.Key)
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
