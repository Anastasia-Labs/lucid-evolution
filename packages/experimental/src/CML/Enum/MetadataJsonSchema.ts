import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type MetadataJsonSchema = CML.MetadataJsonSchema;

export const NoConversions = CML.MetadataJsonSchema.NoConversions;
export const BasicConversions = CML.MetadataJsonSchema.BasicConversions;
export const DetailedSchema = CML.MetadataJsonSchema.DetailedSchema;

/**
 * Get all values of the MetadataJsonSchema enum
 *
 * @example
 * import { MetadataJsonSchema } from "@lucid-evolution/experimental";
 *
 * const allValues = MetadataJsonSchema.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.MetadataJsonSchema> => [
  CML.MetadataJsonSchema.NoConversions,
  CML.MetadataJsonSchema.BasicConversions,
  CML.MetadataJsonSchema.DetailedSchema,
];

/**
 * Convert MetadataJsonSchema enum value to string
 *
 * @example
 * import { MetadataJsonSchema } from "@lucid-evolution/experimental";
 *
 * const name = MetadataJsonSchema.toString(CML.MetadataJsonSchema.NoConversions);
 * console.log(name); // "NoConversions"
 *
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.MetadataJsonSchema): string => {
  switch (value) {
    case CML.MetadataJsonSchema.NoConversions:
      return "NoConversions";
    case CML.MetadataJsonSchema.BasicConversions:
      return "BasicConversions";
    case CML.MetadataJsonSchema.DetailedSchema:
      return "DetailedSchema";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to MetadataJsonSchema enum value
 *
 * @example
 * import { MetadataJsonSchema } from "@lucid-evolution/experimental";
 *
 * const value = MetadataJsonSchema.fromString("NoConversions");
 * console.log(value); // Some(CML.MetadataJsonSchema.NoConversions)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.MetadataJsonSchema | undefined => {
  switch (str) {
    case "NoConversions":
      return CML.MetadataJsonSchema.NoConversions;
    case "BasicConversions":
      return CML.MetadataJsonSchema.BasicConversions;
    case "DetailedSchema":
      return CML.MetadataJsonSchema.DetailedSchema;
    default:
      return undefined;
  }
};
