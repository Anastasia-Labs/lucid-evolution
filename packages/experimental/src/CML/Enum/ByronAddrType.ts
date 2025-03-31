/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ByronAddrType enum
 *
 * @since 2.0.0
 * @category Types
 */
export type ByronAddrType = CML.ByronAddrType;

/**
 * PublicKey variant of the ByronAddrType enum
 * 
 * @example
 * import { ByronAddrType } from "@lucid-evolution/experimental";
 * 
 * const kind = ByronAddrType.PublicKey;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const PublicKey = CML.ByronAddrType.PublicKey;

/**
 * Script variant of the ByronAddrType enum
 * 
 * @example
 * import { ByronAddrType } from "@lucid-evolution/experimental";
 * 
 * const kind = ByronAddrType.Script;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const Script = CML.ByronAddrType.Script;

/**
 * Redeem variant of the ByronAddrType enum
 * 
 * @example
 * import { ByronAddrType } from "@lucid-evolution/experimental";
 * 
 * const kind = ByronAddrType.Redeem;
 * 
 * @since 2.0.0
 * @category Variants
 */
export const Redeem = CML.ByronAddrType.Redeem;


/**
 * Get all values of the ByronAddrType enum
 * 
 * @example
 * import { ByronAddrType } from "@lucid-evolution/experimental";
 * 
 * const allValues = ByronAddrType.values();
 * console.log(allValues);
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.ByronAddrType> => [
  CML.ByronAddrType.PublicKey,
  CML.ByronAddrType.Script,
  CML.ByronAddrType.Redeem
];

/**
 * Convert ByronAddrType enum value to string
 * 
 * @example
 * import { ByronAddrType } from "@lucid-evolution/experimental";
 * 
 * const name = ByronAddrType.toString(CML.ByronAddrType.PublicKey);
 * console.log(name); // "PublicKey"
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.ByronAddrType): string => {
  switch (value) {
    case CML.ByronAddrType.PublicKey:
      return "PublicKey";
    case CML.ByronAddrType.Script:
      return "Script";
    case CML.ByronAddrType.Redeem:
      return "Redeem";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to ByronAddrType enum value
 * 
 * @example
 * import { ByronAddrType } from "@lucid-evolution/experimental";
 * 
 * const value = ByronAddrType.fromString("PublicKey");
 * console.log(value); // Some(CML.ByronAddrType.PublicKey)
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.ByronAddrType | undefined => {
  switch (str) {
    case "PublicKey":
      return CML.ByronAddrType.PublicKey;
    case "Script":
      return CML.ByronAddrType.Script;
    case "Redeem":
      return CML.ByronAddrType.Redeem;
    default:
      return undefined;
  }
};
