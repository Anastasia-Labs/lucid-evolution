import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type SpendingDataKind = CML.SpendingDataKind;

export const SpendingDataPubKey = CML.SpendingDataKind.SpendingDataPubKey;
export const SpendingDataScript = CML.SpendingDataKind.SpendingDataScript;
export const SpendingDataRedeem = CML.SpendingDataKind.SpendingDataRedeem;

/**
 * Get all values of the SpendingDataKind enum
 *
 * @example
 * import { SpendingDataKind } from "@lucid-evolution/experimental";
 *
 * const allValues = SpendingDataKind.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.SpendingDataKind> => [
  CML.SpendingDataKind.SpendingDataPubKey,
  CML.SpendingDataKind.SpendingDataScript,
  CML.SpendingDataKind.SpendingDataRedeem,
];

/**
 * Convert SpendingDataKind enum value to string
 *
 * @example
 * import { SpendingDataKind } from "@lucid-evolution/experimental";
 *
 * const name = SpendingDataKind.toString(CML.SpendingDataKind.SpendingDataPubKey);
 * console.log(name); // "SpendingDataPubKey"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.SpendingDataKind): string => {
  switch (value) {
    case CML.SpendingDataKind.SpendingDataPubKey:
      return "SpendingDataPubKey";
    case CML.SpendingDataKind.SpendingDataScript:
      return "SpendingDataScript";
    case CML.SpendingDataKind.SpendingDataRedeem:
      return "SpendingDataRedeem";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to SpendingDataKind enum value
 *
 * @example
 * import { SpendingDataKind } from "@lucid-evolution/experimental";
 *
 * const value = SpendingDataKind.fromString("SpendingDataPubKey");
 * console.log(value); // Some(CML.SpendingDataKind.SpendingDataPubKey)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.SpendingDataKind | undefined => {
  switch (str) {
    case "SpendingDataPubKey":
      return CML.SpendingDataKind.SpendingDataPubKey;
    case "SpendingDataScript":
      return CML.SpendingDataKind.SpendingDataScript;
    case "SpendingDataRedeem":
      return CML.SpendingDataKind.SpendingDataRedeem;
    default:
      return undefined;
  }
};
