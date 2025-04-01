/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML NonceKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type NonceKind = CML.NonceKind;

/**
 * Identity variant of the NonceKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const Identity = CML.NonceKind.Identity;

/**
 * Hash variant of the NonceKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const Hash = CML.NonceKind.Hash;

/**
 * Get all values of the NonceKind enum
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
