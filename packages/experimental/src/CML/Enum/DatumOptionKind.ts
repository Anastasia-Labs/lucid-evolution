import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type DatumOptionKind = CML.DatumOptionKind;

export const Hash = CML.DatumOptionKind.Hash;
export const Datum = CML.DatumOptionKind.Datum;


/**
 * Get all values of the DatumOptionKind enum
 * 
 * @example
 * import { DatumOptionKind } from "@lucid-evolution/experimental";
 * 
 * const allValues = DatumOptionKind.values();
 * console.log(allValues);
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
 * @example
 * import { DatumOptionKind } from "@lucid-evolution/experimental";
 * 
 * const name = DatumOptionKind.toString(CML.DatumOptionKind.Hash);
 * console.log(name); // "Hash"
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
 * @example
 * import { DatumOptionKind } from "@lucid-evolution/experimental";
 * 
 * const value = DatumOptionKind.fromString("Hash");
 * console.log(value); // Some(CML.DatumOptionKind.Hash)
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
