import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type NonceKind = CML.NonceKind;

export const Identity = CML.NonceKind.Identity;
export const Hash = CML.NonceKind.Hash;

/**
 * Get all values of the NonceKind enum
 *
 * @example
 * import { NonceKind } from "@lucid-evolution/experimental";
 *
 * const allValues = NonceKind.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.NonceKind> => [
  CML.NonceKind.Identity,
  CML.NonceKind.Hash,
];

/**
 * Convert NonceKind enum value to string
 *
 * @example
 * import { NonceKind } from "@lucid-evolution/experimental";
 *
 * const name = NonceKind.toString(CML.NonceKind.Identity);
 * console.log(name); // "Identity"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.NonceKind): string => {
  switch (value) {
    case CML.NonceKind.Identity:
      return "Identity";
    case CML.NonceKind.Hash:
      return "Hash";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to NonceKind enum value
 *
 * @example
 * import { NonceKind } from "@lucid-evolution/experimental";
 *
 * const value = NonceKind.fromString("Identity");
 * console.log(value); // Some(CML.NonceKind.Identity)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.NonceKind | undefined => {
  switch (str) {
    case "Identity":
      return CML.NonceKind.Identity;
    case "Hash":
      return CML.NonceKind.Hash;
    default:
      return undefined;
  }
};
