/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ScriptKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type ScriptKind = CML.ScriptKind;

/**
 * Native variant of the ScriptKind enum
 * 
 * @example
 * import { ScriptKind } from "@lucid-evolution/experimental";
 * 
 * const kind = ScriptKind.Native;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const Native = CML.ScriptKind.Native;

/**
 * PlutusV1 variant of the ScriptKind enum
 * 
 * @example
 * import { ScriptKind } from "@lucid-evolution/experimental";
 * 
 * const kind = ScriptKind.PlutusV1;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const PlutusV1 = CML.ScriptKind.PlutusV1;

/**
 * PlutusV2 variant of the ScriptKind enum
 * 
 * @example
 * import { ScriptKind } from "@lucid-evolution/experimental";
 * 
 * const kind = ScriptKind.PlutusV2;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const PlutusV2 = CML.ScriptKind.PlutusV2;

/**
 * PlutusV3 variant of the ScriptKind enum
 * 
 * @example
 * import { ScriptKind } from "@lucid-evolution/experimental";
 * 
 * const kind = ScriptKind.PlutusV3;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const PlutusV3 = CML.ScriptKind.PlutusV3;


/**
 * Get all values of the ScriptKind enum
 * 
 * @example
 * import { ScriptKind } from "@lucid-evolution/experimental";
 * 
 * const allValues = ScriptKind.values();
 * console.log(allValues);
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.ScriptKind> => [
  CML.ScriptKind.Native,
  CML.ScriptKind.PlutusV1,
  CML.ScriptKind.PlutusV2,
  CML.ScriptKind.PlutusV3
];

/**
 * Convert ScriptKind enum value to string
 * 
 * @example
 * import { ScriptKind } from "@lucid-evolution/experimental";
 * 
 * const name = ScriptKind.toString(CML.ScriptKind.Native);
 * console.log(name); // "Native"
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.ScriptKind): string => {
  switch (value) {
    case CML.ScriptKind.Native:
      return "Native";
    case CML.ScriptKind.PlutusV1:
      return "PlutusV1";
    case CML.ScriptKind.PlutusV2:
      return "PlutusV2";
    case CML.ScriptKind.PlutusV3:
      return "PlutusV3";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to ScriptKind enum value
 * 
 * @example
 * import { ScriptKind } from "@lucid-evolution/experimental";
 * 
 * const value = ScriptKind.fromString("Native");
 * console.log(value); // Some(CML.ScriptKind.Native)
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.ScriptKind | undefined => {
  switch (str) {
    case "Native":
      return CML.ScriptKind.Native;
    case "PlutusV1":
      return CML.ScriptKind.PlutusV1;
    case "PlutusV2":
      return CML.ScriptKind.PlutusV2;
    case "PlutusV3":
      return CML.ScriptKind.PlutusV3;
    default:
      return undefined;
  }
};
