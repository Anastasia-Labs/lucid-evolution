/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML RedeemerTag enum
 *
 * @since 2.0.0
 * @category Types
 */
export type RedeemerTag = CML.RedeemerTag;

/**
 * Spend variant of the RedeemerTag enum
 *
 * @example
 * import { RedeemerTag } from "@lucid-evolution/experimental";
 *
 * const kind = RedeemerTag.Spend;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Spend = CML.RedeemerTag.Spend;

/**
 * Mint variant of the RedeemerTag enum
 *
 * @example
 * import { RedeemerTag } from "@lucid-evolution/experimental";
 *
 * const kind = RedeemerTag.Mint;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Mint = CML.RedeemerTag.Mint;

/**
 * Cert variant of the RedeemerTag enum
 *
 * @example
 * import { RedeemerTag } from "@lucid-evolution/experimental";
 *
 * const kind = RedeemerTag.Cert;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Cert = CML.RedeemerTag.Cert;

/**
 * Reward variant of the RedeemerTag enum
 *
 * @example
 * import { RedeemerTag } from "@lucid-evolution/experimental";
 *
 * const kind = RedeemerTag.Reward;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Reward = CML.RedeemerTag.Reward;

/**
 * Voting variant of the RedeemerTag enum
 *
 * @example
 * import { RedeemerTag } from "@lucid-evolution/experimental";
 *
 * const kind = RedeemerTag.Voting;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Voting = CML.RedeemerTag.Voting;

/**
 * Proposing variant of the RedeemerTag enum
 *
 * @example
 * import { RedeemerTag } from "@lucid-evolution/experimental";
 *
 * const kind = RedeemerTag.Proposing;
 *
 * @since 2.0.0
 * @category Variants
 */
export const Proposing = CML.RedeemerTag.Proposing;

/**
 * Get all values of the RedeemerTag enum
 *
 * @example
 * import { RedeemerTag } from "@lucid-evolution/experimental";
 *
 * const allValues = RedeemerTag.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.RedeemerTag> => [
  CML.RedeemerTag.Spend,
  CML.RedeemerTag.Mint,
  CML.RedeemerTag.Cert,
  CML.RedeemerTag.Reward,
  CML.RedeemerTag.Voting,
  CML.RedeemerTag.Proposing,
];

/**
 * Convert RedeemerTag enum value to string
 *
 * @example
 * import { RedeemerTag } from "@lucid-evolution/experimental";
 *
 * const name = RedeemerTag.toString(CML.RedeemerTag.Spend);
 * console.log(name); // "Spend"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.RedeemerTag): string => {
  switch (value) {
    case CML.RedeemerTag.Spend:
      return "Spend";
    case CML.RedeemerTag.Mint:
      return "Mint";
    case CML.RedeemerTag.Cert:
      return "Cert";
    case CML.RedeemerTag.Reward:
      return "Reward";
    case CML.RedeemerTag.Voting:
      return "Voting";
    case CML.RedeemerTag.Proposing:
      return "Proposing";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to RedeemerTag enum value
 *
 * @example
 * import { RedeemerTag } from "@lucid-evolution/experimental";
 *
 * const value = RedeemerTag.fromString("Spend");
 * console.log(value); // Some(CML.RedeemerTag.Spend)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.RedeemerTag | undefined => {
  switch (str) {
    case "Spend":
      return CML.RedeemerTag.Spend;
    case "Mint":
      return CML.RedeemerTag.Mint;
    case "Cert":
      return CML.RedeemerTag.Cert;
    case "Reward":
      return CML.RedeemerTag.Reward;
    case "Voting":
      return CML.RedeemerTag.Voting;
    case "Proposing":
      return CML.RedeemerTag.Proposing;
    default:
      return undefined;
  }
};
