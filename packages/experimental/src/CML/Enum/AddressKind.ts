import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type AddressKind = CML.AddressKind;

export const Base = CML.AddressKind.Base;
export const Ptr = CML.AddressKind.Ptr;
export const Enterprise = CML.AddressKind.Enterprise;
export const Reward = CML.AddressKind.Reward;
export const Byron = CML.AddressKind.Byron;

/**
 * Get all values of the AddressKind enum
 *
 * @example
 * import { AddressKind } from "@lucid-evolution/experimental";
 *
 * const allValues = AddressKind.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.AddressKind> => [
  CML.AddressKind.Base,
  CML.AddressKind.Ptr,
  CML.AddressKind.Enterprise,
  CML.AddressKind.Reward,
  CML.AddressKind.Byron,
];

/**
 * Convert AddressKind enum value to string
 *
 * @example
 * import { AddressKind } from "@lucid-evolution/experimental";
 *
 * const name = AddressKind.toString(CML.AddressKind.Base);
 * console.log(name); // "Base"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.AddressKind): string => {
  switch (value) {
    case CML.AddressKind.Base:
      return "Base";
    case CML.AddressKind.Ptr:
      return "Ptr";
    case CML.AddressKind.Enterprise:
      return "Enterprise";
    case CML.AddressKind.Reward:
      return "Reward";
    case CML.AddressKind.Byron:
      return "Byron";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to AddressKind enum value
 *
 * @example
 * import { AddressKind } from "@lucid-evolution/experimental";
 *
 * const value = AddressKind.fromString("Base");
 * console.log(value); // Some(CML.AddressKind.Base)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.AddressKind | undefined => {
  switch (str) {
    case "Base":
      return CML.AddressKind.Base;
    case "Ptr":
      return CML.AddressKind.Ptr;
    case "Enterprise":
      return CML.AddressKind.Enterprise;
    case "Reward":
      return CML.AddressKind.Reward;
    case "Byron":
      return CML.AddressKind.Byron;
    default:
      return undefined;
  }
};
