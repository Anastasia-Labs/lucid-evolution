/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML MetadataJsonSchema enum
 *
 * @since 2.0.0
 * @category Types
 */
export type MetadataJsonSchema = CML.MetadataJsonSchema;

/**
 * NoConversions variant of the MetadataJsonSchema enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const NoConversions = CML.MetadataJsonSchema.NoConversions;

/**
 * BasicConversions variant of the MetadataJsonSchema enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const BasicConversions = CML.MetadataJsonSchema.BasicConversions;

/**
 * DetailedSchema variant of the MetadataJsonSchema enum
 *
 * @since 2.0.0
 * @category Variants
 */
export const DetailedSchema = CML.MetadataJsonSchema.DetailedSchema;

/**
 * Get all values of the MetadataJsonSchema enum
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
