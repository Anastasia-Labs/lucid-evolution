/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CredentialKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type CredentialKind = CML.CredentialKind;

/**
 * PubKey variant of the CredentialKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const PubKey = CML.CredentialKind.PubKey;

/**
 * Script variant of the CredentialKind enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const Script = CML.CredentialKind.Script;

/**
 * Get all values of the CredentialKind enum
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.CredentialKind> => [
  CML.CredentialKind.PubKey,
  CML.CredentialKind.Script,
];

/**
 * Convert CredentialKind enum value to string
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.CredentialKind): string => {
  switch (value) {
    case CML.CredentialKind.PubKey:
      return "PubKey";
    case CML.CredentialKind.Script:
      return "Script";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to CredentialKind enum value
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.CredentialKind | undefined => {
  switch (str) {
    case "PubKey":
      return CML.CredentialKind.PubKey;
    case "Script":
      return CML.CredentialKind.Script;
    default:
      return undefined;
  }
};
