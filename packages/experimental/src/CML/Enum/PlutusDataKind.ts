/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusDataKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusDataKind = CML.PlutusDataKind;

/**
 * ConstrPlutusData variant of the PlutusDataKind enum
 *
 * @example
 * import { PlutusDataKind } from "@lucid-evolution/experimental";
 *
 * const kind = PlutusDataKind.ConstrPlutusData;
 *
 * @since 2.0.0
 * @category Variants
 */
export const ConstrPlutusData = CML.PlutusDataKind.ConstrPlutusData;

/**
 * Map variant of the PlutusDataKind enum
 *
 * @example
 * import { PlutusDataKind } from "@lucid-evolution/experimental";
 *
 * const kind = PlutusDataKind.Map;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Map = CML.PlutusDataKind.Map;

/**
 * List variant of the PlutusDataKind enum
 *
 * @example
 * import { PlutusDataKind } from "@lucid-evolution/experimental";
 *
 * const kind = PlutusDataKind.List;
 *
 * @since 2.0.0
 * @category Variants
 */
export const List = CML.PlutusDataKind.List;

/**
 * Integer variant of the PlutusDataKind enum
 *
 * @example
 * import { PlutusDataKind } from "@lucid-evolution/experimental";
 *
 * const kind = PlutusDataKind.Integer;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Integer = CML.PlutusDataKind.Integer;

/**
 * Bytes variant of the PlutusDataKind enum
 *
 * @example
 * import { PlutusDataKind } from "@lucid-evolution/experimental";
 *
 * const kind = PlutusDataKind.Bytes;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Bytes = CML.PlutusDataKind.Bytes;

/**
 * Get all values of the PlutusDataKind enum
 *
 * @example
 * import { PlutusDataKind } from "@lucid-evolution/experimental";
 *
 * const allValues = PlutusDataKind.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.PlutusDataKind> => [
  CML.PlutusDataKind.ConstrPlutusData,
  CML.PlutusDataKind.Map,
  CML.PlutusDataKind.List,
  CML.PlutusDataKind.Integer,
  CML.PlutusDataKind.Bytes,
];

/**
 * Convert PlutusDataKind enum value to string
 *
 * @example
 * import { PlutusDataKind } from "@lucid-evolution/experimental";
 *
 * const name = PlutusDataKind.toString(CML.PlutusDataKind.ConstrPlutusData);
 * console.log(name); // "ConstrPlutusData"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.PlutusDataKind): string => {
  switch (value) {
    case CML.PlutusDataKind.ConstrPlutusData:
      return "ConstrPlutusData";
    case CML.PlutusDataKind.Map:
      return "Map";
    case CML.PlutusDataKind.List:
      return "List";
    case CML.PlutusDataKind.Integer:
      return "Integer";
    case CML.PlutusDataKind.Bytes:
      return "Bytes";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to PlutusDataKind enum value
 *
 * @example
 * import { PlutusDataKind } from "@lucid-evolution/experimental";
 *
 * const value = PlutusDataKind.fromString("ConstrPlutusData");
 * console.log(value); // Some(CML.PlutusDataKind.ConstrPlutusData)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.PlutusDataKind | undefined => {
  switch (str) {
    case "ConstrPlutusData":
      return CML.PlutusDataKind.ConstrPlutusData;
    case "Map":
      return CML.PlutusDataKind.Map;
    case "List":
      return CML.PlutusDataKind.List;
    case "Integer":
      return CML.PlutusDataKind.Integer;
    case "Bytes":
      return CML.PlutusDataKind.Bytes;
    default:
      return undefined;
  }
};
