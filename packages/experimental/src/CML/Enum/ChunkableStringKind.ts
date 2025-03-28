import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ChunkableStringKind = CML.ChunkableStringKind;

export const Single = CML.ChunkableStringKind.Single;
export const Chunked = CML.ChunkableStringKind.Chunked;

/**
 * Get all values of the ChunkableStringKind enum
 *
 * @example
 * import { ChunkableStringKind } from "@lucid-evolution/experimental";
 *
 * const allValues = ChunkableStringKind.values();
 * console.log(allValues);
 *
 * @since 2.0.0
 * @category Utils
 */
export const values = (): Array<CML.ChunkableStringKind> => [
  CML.ChunkableStringKind.Single,
  CML.ChunkableStringKind.Chunked,
];

/**
 * Convert ChunkableStringKind enum value to string
 *
 * @example
 * import { ChunkableStringKind } from "@lucid-evolution/experimental";
 *
 * const name = ChunkableStringKind.toString(CML.ChunkableStringKind.Single);
 * console.log(name); // "Single"
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
 * @example
 * import { ChunkableStringKind } from "@lucid-evolution/experimental";
 *
 * const value = ChunkableStringKind.fromString("Single");
 * console.log(value); // Some(CML.ChunkableStringKind.Single)
 *
 * @since 2.0.0
 * @category Utils
 */
export const fromString = (
  str: string,
): CML.ChunkableStringKind | undefined => {
  switch (str) {
    case "Single":
      return CML.ChunkableStringKind.Single;
    case "Chunked":
      return CML.ChunkableStringKind.Chunked;
    default:
      return undefined;
  }
};
