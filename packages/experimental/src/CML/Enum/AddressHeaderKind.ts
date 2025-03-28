import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type AddressHeaderKind = CML.AddressHeaderKind;

export const BasePaymentKeyStakeKey =
  CML.AddressHeaderKind.BasePaymentKeyStakeKey;
export const BasePaymentScriptStakeKey =
  CML.AddressHeaderKind.BasePaymentScriptStakeKey;
export const BasePaymentKeyStakeScript =
  CML.AddressHeaderKind.BasePaymentKeyStakeScript;
export const BasePaymentScriptStakeScript =
  CML.AddressHeaderKind.BasePaymentScriptStakeScript;
export const PointerKey = CML.AddressHeaderKind.PointerKey;
export const PointerScript = CML.AddressHeaderKind.PointerScript;
export const EnterpriseKey = CML.AddressHeaderKind.EnterpriseKey;
export const EnterpriseScript = CML.AddressHeaderKind.EnterpriseScript;
export const Byron = CML.AddressHeaderKind.Byron;
export const RewardKey = CML.AddressHeaderKind.RewardKey;
export const RewardScript = CML.AddressHeaderKind.RewardScript;

/**
 * Get all values of the AddressHeaderKind enum
 *
 * @example
 * import { AddressHeaderKind } from "@lucid-evolution/experimental";
 *
 * const allValues = AddressHeaderKind.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.AddressHeaderKind> => [
  CML.AddressHeaderKind.BasePaymentKeyStakeKey,
  CML.AddressHeaderKind.BasePaymentScriptStakeKey,
  CML.AddressHeaderKind.BasePaymentKeyStakeScript,
  CML.AddressHeaderKind.BasePaymentScriptStakeScript,
  CML.AddressHeaderKind.PointerKey,
  CML.AddressHeaderKind.PointerScript,
  CML.AddressHeaderKind.EnterpriseKey,
  CML.AddressHeaderKind.EnterpriseScript,
  CML.AddressHeaderKind.Byron,
  CML.AddressHeaderKind.RewardKey,
  CML.AddressHeaderKind.RewardScript,
];

/**
 * Convert AddressHeaderKind enum value to string
 *
 * @example
 * import { AddressHeaderKind } from "@lucid-evolution/experimental";
 *
 * const name = AddressHeaderKind.toString(CML.AddressHeaderKind.BasePaymentKeyStakeKey);
 * console.log(name); // "BasePaymentKeyStakeKey"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.AddressHeaderKind): string => {
  switch (value) {
    case CML.AddressHeaderKind.BasePaymentKeyStakeKey:
      return "BasePaymentKeyStakeKey";
    case CML.AddressHeaderKind.BasePaymentScriptStakeKey:
      return "BasePaymentScriptStakeKey";
    case CML.AddressHeaderKind.BasePaymentKeyStakeScript:
      return "BasePaymentKeyStakeScript";
    case CML.AddressHeaderKind.BasePaymentScriptStakeScript:
      return "BasePaymentScriptStakeScript";
    case CML.AddressHeaderKind.PointerKey:
      return "PointerKey";
    case CML.AddressHeaderKind.PointerScript:
      return "PointerScript";
    case CML.AddressHeaderKind.EnterpriseKey:
      return "EnterpriseKey";
    case CML.AddressHeaderKind.EnterpriseScript:
      return "EnterpriseScript";
    case CML.AddressHeaderKind.Byron:
      return "Byron";
    case CML.AddressHeaderKind.RewardKey:
      return "RewardKey";
    case CML.AddressHeaderKind.RewardScript:
      return "RewardScript";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to AddressHeaderKind enum value
 *
 * @example
 * import { AddressHeaderKind } from "@lucid-evolution/experimental";
 *
 * const value = AddressHeaderKind.fromString("BasePaymentKeyStakeKey");
 * console.log(value); // Some(CML.AddressHeaderKind.BasePaymentKeyStakeKey)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.AddressHeaderKind | undefined => {
  switch (str) {
    case "BasePaymentKeyStakeKey":
      return CML.AddressHeaderKind.BasePaymentKeyStakeKey;
    case "BasePaymentScriptStakeKey":
      return CML.AddressHeaderKind.BasePaymentScriptStakeKey;
    case "BasePaymentKeyStakeScript":
      return CML.AddressHeaderKind.BasePaymentKeyStakeScript;
    case "BasePaymentScriptStakeScript":
      return CML.AddressHeaderKind.BasePaymentScriptStakeScript;
    case "PointerKey":
      return CML.AddressHeaderKind.PointerKey;
    case "PointerScript":
      return CML.AddressHeaderKind.PointerScript;
    case "EnterpriseKey":
      return CML.AddressHeaderKind.EnterpriseKey;
    case "EnterpriseScript":
      return CML.AddressHeaderKind.EnterpriseScript;
    case "Byron":
      return CML.AddressHeaderKind.Byron;
    case "RewardKey":
      return CML.AddressHeaderKind.RewardKey;
    case "RewardScript":
      return CML.AddressHeaderKind.RewardScript;
    default:
      return undefined;
  }
};
