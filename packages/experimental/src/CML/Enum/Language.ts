/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML Language enum
 *
 * @since 2.0.0
 * @category Types
 */
export type Language = CML.Language;

/**
 * PlutusV1 variant of the Language enum
 * 
 * @example
 * import { Language } from "@lucid-evolution/experimental";
 * 
 * const kind = Language.PlutusV1;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const PlutusV1 = CML.Language.PlutusV1;

/**
 * PlutusV2 variant of the Language enum
 * 
 * @example
 * import { Language } from "@lucid-evolution/experimental";
 * 
 * const kind = Language.PlutusV2;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const PlutusV2 = CML.Language.PlutusV2;

/**
 * PlutusV3 variant of the Language enum
 * 
 * @example
 * import { Language } from "@lucid-evolution/experimental";
 * 
 * const kind = Language.PlutusV3;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const PlutusV3 = CML.Language.PlutusV3;


/**
 * Get all values of the Language enum
 * 
 * @example
 * import { Language } from "@lucid-evolution/experimental";
 * 
 * const allValues = Language.values();
 * console.log(allValues);
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.Language> => [
  CML.Language.PlutusV1,
  CML.Language.PlutusV2,
  CML.Language.PlutusV3
];

/**
 * Convert Language enum value to string
 * 
 * @example
 * import { Language } from "@lucid-evolution/experimental";
 * 
 * const name = Language.toString(CML.Language.PlutusV1);
 * console.log(name); // "PlutusV1"
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.Language): string => {
  switch (value) {
    case CML.Language.PlutusV1:
      return "PlutusV1";
    case CML.Language.PlutusV2:
      return "PlutusV2";
    case CML.Language.PlutusV3:
      return "PlutusV3";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to Language enum value
 * 
 * @example
 * import { Language } from "@lucid-evolution/experimental";
 * 
 * const value = Language.fromString("PlutusV1");
 * console.log(value); // Some(CML.Language.PlutusV1)
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.Language | undefined => {
  switch (str) {
    case "PlutusV1":
      return CML.Language.PlutusV1;
    case "PlutusV2":
      return CML.Language.PlutusV2;
    case "PlutusV3":
      return CML.Language.PlutusV3;
    default:
      return undefined;
  }
};
