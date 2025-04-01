/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionMetadatumKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionMetadatumKind = CML.TransactionMetadatumKind;

/**
 * Map variant of the TransactionMetadatumKind enum
 *
 * @example
 * import { TransactionMetadatumKind } from "@lucid-evolution/experimental";
 *
 * const kind = TransactionMetadatumKind.Map;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Map = CML.TransactionMetadatumKind.Map;

/**
 * List variant of the TransactionMetadatumKind enum
 *
 * @example
 * import { TransactionMetadatumKind } from "@lucid-evolution/experimental";
 *
 * const kind = TransactionMetadatumKind.List;
 *
 * @since 2.0.0
 * @category Variants
 */
export const List = CML.TransactionMetadatumKind.List;

/**
 * Int variant of the TransactionMetadatumKind enum
 *
 * @example
 * import { TransactionMetadatumKind } from "@lucid-evolution/experimental";
 *
 * const kind = TransactionMetadatumKind.Int;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Int = CML.TransactionMetadatumKind.Int;

/**
 * Bytes variant of the TransactionMetadatumKind enum
 *
 * @example
 * import { TransactionMetadatumKind } from "@lucid-evolution/experimental";
 *
 * const kind = TransactionMetadatumKind.Bytes;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Bytes = CML.TransactionMetadatumKind.Bytes;

/**
 * Text variant of the TransactionMetadatumKind enum
 *
 * @example
 * import { TransactionMetadatumKind } from "@lucid-evolution/experimental";
 *
 * const kind = TransactionMetadatumKind.Text;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Text = CML.TransactionMetadatumKind.Text;

/**
 * Get all values of the TransactionMetadatumKind enum
 *
 * @example
 * import { TransactionMetadatumKind } from "@lucid-evolution/experimental";
 *
 * const allValues = TransactionMetadatumKind.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.TransactionMetadatumKind> => [
  CML.TransactionMetadatumKind.Map,
  CML.TransactionMetadatumKind.List,
  CML.TransactionMetadatumKind.Int,
  CML.TransactionMetadatumKind.Bytes,
  CML.TransactionMetadatumKind.Text,
];

/**
 * Convert TransactionMetadatumKind enum value to string
 *
 * @example
 * import { TransactionMetadatumKind } from "@lucid-evolution/experimental";
 *
 * const name = TransactionMetadatumKind.toString(CML.TransactionMetadatumKind.Map);
 * console.log(name); // "Map"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.TransactionMetadatumKind): string => {
  switch (value) {
    case CML.TransactionMetadatumKind.Map:
      return "Map";
    case CML.TransactionMetadatumKind.List:
      return "List";
    case CML.TransactionMetadatumKind.Int:
      return "Int";
    case CML.TransactionMetadatumKind.Bytes:
      return "Bytes";
    case CML.TransactionMetadatumKind.Text:
      return "Text";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to TransactionMetadatumKind enum value
 *
 * @example
 * import { TransactionMetadatumKind } from "@lucid-evolution/experimental";
 *
 * const value = TransactionMetadatumKind.fromString("Map");
 * console.log(value); // Some(CML.TransactionMetadatumKind.Map)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (
  str: string,
): CML.TransactionMetadatumKind | undefined => {
  switch (str) {
    case "Map":
      return CML.TransactionMetadatumKind.Map;
    case "List":
      return CML.TransactionMetadatumKind.List;
    case "Int":
      return CML.TransactionMetadatumKind.Int;
    case "Bytes":
      return CML.TransactionMetadatumKind.Bytes;
    case "Text":
      return CML.TransactionMetadatumKind.Text;
    default:
      return undefined;
  }
};
