/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusMap class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusMap = CML.PlutusMap;

/**
 * Error class for PlutusMap operations
 *
 * This error is thrown when operations on PlutusMap instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusMapError extends Data.TaggedError("PlutusMapError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusMap
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.PlutusMap,
) => Effect.Effect<void, PlutusMapError> = Effect.fn(
  (instance: CML.PlutusMap) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusMap): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of PlutusMap
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (
  instance: CML.PlutusMap,
) => Effect.Effect<Uint8Array, PlutusMapError> = Effect.fn(
  (instance: CML.PlutusMap) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.toCborBytes failed PlutusMap is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PlutusMap): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PlutusMap
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (
  instance: CML.PlutusMap,
) => Effect.Effect<Uint8Array, PlutusMapError> = Effect.fn(
  (instance: CML.PlutusMap) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.toCanonicalCborBytes failed PlutusMap is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.PlutusMap,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PlutusMap
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (
  cborBytes: Uint8Array,
) => Effect.Effect<CML.PlutusMap, PlutusMapError> = Effect.fn(function* (
  cborBytes: Uint8Array,
) {
  return yield* Effect.try({
    try: () => CML.PlutusMap.from_cbor_bytes(cborBytes),
    catch: () =>
      new PlutusMapError({
        message: `PlutusMap.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PlutusMap.fromCborBytes without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.PlutusMap =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PlutusMap
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (
  instance: CML.PlutusMap,
) => Effect.Effect<string, PlutusMapError> = Effect.fn(
  (instance: CML.PlutusMap) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.toCborHex failed PlutusMap is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PlutusMap): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PlutusMap
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (
  instance: CML.PlutusMap,
) => Effect.Effect<string, PlutusMapError> = Effect.fn(
  (instance: CML.PlutusMap) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.toCanonicalCborHex failed PlutusMap is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.PlutusMap): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PlutusMap
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (
  cborBytes: string,
) => Effect.Effect<CML.PlutusMap, PlutusMapError> = Effect.fn(function* (
  cborBytes: string,
) {
  return yield* Effect.try({
    try: () => CML.PlutusMap.from_cbor_hex(cborBytes),
    catch: () =>
      new PlutusMapError({
        message: `PlutusMap.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls PlutusMap.fromCborHex without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.PlutusMap =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Static method _new of PlutusMap
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new: () => Effect.Effect<CML.PlutusMap, PlutusMapError> =
  Effect.fn(function* () {
    return yield* Effect.try({
      try: () => CML.PlutusMap.new(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap._new failed `,
        }),
    });
  });

/**
 * Unsafely calls PlutusMap._new without Effect wrapper
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (): CML.PlutusMap => Effect.runSync(_new());

/**
 * Method len of PlutusMap
 *
 * @since 2.0.0
 * @category Methods
 */
export const len: (
  instance: CML.PlutusMap,
) => Effect.Effect<number, PlutusMapError> = Effect.fn(
  (instance: CML.PlutusMap) =>
    Effect.try({
      try: () => instance.len(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.len failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.len without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const lenUnsafe = (instance: CML.PlutusMap): number =>
  Effect.runSync(len(instance));

/**
 * Method isEmpty of PlutusMap
 *
 * @since 2.0.0
 * @category Methods
 */
export const isEmpty: (
  instance: CML.PlutusMap,
) => Effect.Effect<boolean, PlutusMapError> = Effect.fn(
  (instance: CML.PlutusMap) =>
    Effect.try({
      try: () => instance.is_empty(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.isEmpty failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.isEmpty without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const isEmptyUnsafe = (instance: CML.PlutusMap): boolean =>
  Effect.runSync(isEmpty(instance));

/**
 * Method set of PlutusMap
 *
 * @since 2.0.0
 * @category Methods
 */
export const set: (
  instance: CML.PlutusMap,
  key: CML.PlutusData,
  value: CML.PlutusData,
) => Effect.Effect<void, PlutusMapError> = Effect.fn(
  (instance: CML.PlutusMap, key: CML.PlutusData, value: CML.PlutusData) =>
    Effect.try({
      try: () => instance.set(key, value),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.set failed with parameters: ${key} (PlutusData), ${value} (PlutusData). `,
        }),
    }),
);

/**
 * Unsafely calls instance.set without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setUnsafe = (
  instance: CML.PlutusMap,
  key: CML.PlutusData,
  value: CML.PlutusData,
): void => Effect.runSync(set(instance, key, value));

/**
 * Method get of PlutusMap
 *
 * @since 2.0.0
 * @category Methods
 */
export const get: (
  instance: CML.PlutusMap,
  key: CML.PlutusData,
) => Effect.Effect<CML.PlutusData | undefined, PlutusMapError> = Effect.fn(
  (instance: CML.PlutusMap, key: CML.PlutusData) =>
    Effect.try({
      try: () => instance.get(key),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.get failed with parameters: ${key} (PlutusData). `,
        }),
    }),
);

/**
 * Unsafely calls instance.get without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getUnsafe = (
  instance: CML.PlutusMap,
  key: CML.PlutusData,
): CML.PlutusData | undefined => Effect.runSync(get(instance, key));

/**
 * Method getAll of PlutusMap
 *
 * @since 2.0.0
 * @category Methods
 */
export const getAll: (
  instance: CML.PlutusMap,
  key: CML.PlutusData,
) => Effect.Effect<CML.PlutusDataList | undefined, PlutusMapError> = Effect.fn(
  (instance: CML.PlutusMap, key: CML.PlutusData) =>
    Effect.try({
      try: () => instance.get_all(key),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.getAll failed with parameters: ${key} (PlutusData). `,
        }),
    }),
);

/**
 * Unsafely calls instance.getAll without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const getAllUnsafe = (
  instance: CML.PlutusMap,
  key: CML.PlutusData,
): CML.PlutusDataList | undefined => Effect.runSync(getAll(instance, key));

/**
 * Method keys of PlutusMap
 *
 * @since 2.0.0
 * @category Methods
 */
export const keys: (
  instance: CML.PlutusMap,
) => Effect.Effect<CML.PlutusDataList, PlutusMapError> = Effect.fn(
  (instance: CML.PlutusMap) =>
    Effect.try({
      try: () => instance.keys(),
      catch: () =>
        new PlutusMapError({
          message: `PlutusMap.keys failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.keys without Effect wrapper
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keysUnsafe = (instance: CML.PlutusMap): CML.PlutusDataList =>
  Effect.runSync(keys(instance));
