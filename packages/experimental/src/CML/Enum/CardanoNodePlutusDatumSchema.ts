import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CardanoNodePlutusDatumSchema = CML.CardanoNodePlutusDatumSchema;

export const BasicConversions =
  CML.CardanoNodePlutusDatumSchema.BasicConversions;
export const DetailedSchema = CML.CardanoNodePlutusDatumSchema.DetailedSchema;

/**
 * Get all values of the CardanoNodePlutusDatumSchema enum
 *
 * @example
 * import { CardanoNodePlutusDatumSchema } from "@lucid-evolution/experimental";
 *
 * const allValues = CardanoNodePlutusDatumSchema.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.CardanoNodePlutusDatumSchema> => [
  CML.CardanoNodePlutusDatumSchema.BasicConversions,
  CML.CardanoNodePlutusDatumSchema.DetailedSchema,
];

/**
 * Convert CardanoNodePlutusDatumSchema enum value to string
 *
 * @example
 * import { CardanoNodePlutusDatumSchema } from "@lucid-evolution/experimental";
 *
 * const name = CardanoNodePlutusDatumSchema.toString(CML.CardanoNodePlutusDatumSchema.BasicConversions);
 * console.log(name); // "BasicConversions"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.CardanoNodePlutusDatumSchema): string => {
  switch (value) {
    case CML.CardanoNodePlutusDatumSchema.BasicConversions:
      return "BasicConversions";
    case CML.CardanoNodePlutusDatumSchema.DetailedSchema:
      return "DetailedSchema";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to CardanoNodePlutusDatumSchema enum value
 *
 * @example
 * import { CardanoNodePlutusDatumSchema } from "@lucid-evolution/experimental";
 *
 * const value = CardanoNodePlutusDatumSchema.fromString("BasicConversions");
 * console.log(value); // Some(CML.CardanoNodePlutusDatumSchema.BasicConversions)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (
  str: string,
): CML.CardanoNodePlutusDatumSchema | undefined => {
  switch (str) {
    case "BasicConversions":
      return CML.CardanoNodePlutusDatumSchema.BasicConversions;
    case "DetailedSchema":
      return CML.CardanoNodePlutusDatumSchema.DetailedSchema;
    default:
      return undefined;
  }
};
