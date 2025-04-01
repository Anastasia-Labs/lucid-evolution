/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RedeemersKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type RedeemersKind = CML.RedeemersKind;

/**
 * ArrLegacyRedeemer variant of the RedeemersKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const ArrLegacyRedeemer = CML.RedeemersKind.ArrLegacyRedeemer;

/**
 * MapRedeemerKeyToRedeemerVal variant of the RedeemersKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const MapRedeemerKeyToRedeemerVal = CML.RedeemersKind.MapRedeemerKeyToRedeemerVal;


/**
 * Get all values of the RedeemersKind enum
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.RedeemersKind> => [
  CML.RedeemersKind.ArrLegacyRedeemer,
  CML.RedeemersKind.MapRedeemerKeyToRedeemerVal
];

/**
 * Convert RedeemersKind enum value to string
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
