/**
 * @since 2.0.0
 */
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ChunkableStringKind enum
 *
 * @since 2.0.0
 * @category Types
 */
export type ChunkableStringKind = CML.ChunkableStringKind;

/**
 * Single variant of the ChunkableStringKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const Single = CML.ChunkableStringKind.Single;

/**
 * Chunked variant of the ChunkableStringKind enum
 * 
 * @since 2.0.0
 * @category Variants
 */
export const Chunked = CML.ChunkableStringKind.Chunked;


/**
 * Get all values of the ChunkableStringKind enum
 * 
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.ChunkableStringKind> => [
  CML.ChunkableStringKind.Single,
  CML.ChunkableStringKind.Chunked
];

/**
 * Convert ChunkableStringKind enum value to string
 * 
 * @since 2.0.0
 * @category Utils
 */
export const toString = (value: CML.ChunkableStringKind): string => {
  switch (value) {
    case CML.ChunkableStringKind.Single:
      return "Single";
    case CML.ChunkableStringKind.Chunked:
      return "Chunked";
    default:
      return "Unknown";
  }
};

/**
 * Convert string to ChunkableStringKind enum value
 * 
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (str: string): CML.ChunkableStringKind | undefined => {
  switch (str) {
    case "Single":
      return CML.ChunkableStringKind.Single;
    case "Chunked":
      return CML.ChunkableStringKind.Chunked;
    default:
      return undefined;
  }
};
