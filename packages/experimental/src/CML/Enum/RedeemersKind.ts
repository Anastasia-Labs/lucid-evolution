import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type RedeemersKind = CML.RedeemersKind;

export const ArrLegacyRedeemer = CML.RedeemersKind.ArrLegacyRedeemer;
export const MapRedeemerKeyToRedeemerVal =
  CML.RedeemersKind.MapRedeemerKeyToRedeemerVal;

/**
 * Get all values of the RedeemersKind enum
 *
 * @example
 * import { RedeemersKind } from "@lucid-evolution/experimental";
 *
 * const allValues = RedeemersKind.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.RedeemersKind> => [
  CML.RedeemersKind.ArrLegacyRedeemer,
  CML.RedeemersKind.MapRedeemerKeyToRedeemerVal,
];

/**
 * Convert RedeemersKind enum value to string
 *
 * @example
 * import { RedeemersKind } from "@lucid-evolution/experimental";
 *
 * const name = RedeemersKind.toString(CML.RedeemersKind.ArrLegacyRedeemer);
 * console.log(name); // "ArrLegacyRedeemer"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.RedeemersKind): string => {
  switch (value) {
    case CML.RedeemersKind.ArrLegacyRedeemer:
      return "ArrLegacyRedeemer";
    case CML.RedeemersKind.MapRedeemerKeyToRedeemerVal:
      return "MapRedeemerKeyToRedeemerVal";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to RedeemersKind enum value
 *
 * @example
 * import { RedeemersKind } from "@lucid-evolution/experimental";
 *
 * const value = RedeemersKind.fromString("ArrLegacyRedeemer");
 * console.log(value); // Some(CML.RedeemersKind.ArrLegacyRedeemer)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.RedeemersKind | undefined => {
  switch (str) {
    case "ArrLegacyRedeemer":
      return CML.RedeemersKind.ArrLegacyRedeemer;
    case "MapRedeemerKeyToRedeemerVal":
      return CML.RedeemersKind.MapRedeemerKeyToRedeemerVal;
    default:
      return undefined;
  }
};
