/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusData class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusData = CML.PlutusData;

/**
 * Error class for PlutusData operations
 *
 * This error is thrown when operations on PlutusData instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusDataError extends Data.TaggedError("PlutusDataError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PlutusData): Effect.Effect<void, PlutusDataError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusData): void =>
  Effect.runSync(free(instance));

/**
 * Method toCardanoNodeFormat of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.toCardanoNodeFormat(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCardanoNodeFormat = Effect.fn(
  (instance: CML.PlutusData): Effect.Effect<CML.PlutusData, PlutusDataError> =>
    Effect.try({
      try: () => instance.to_cardano_node_format(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toCardanoNodeFormat failed PlutusData is not valid for PlutusData conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toCardanoNodeFormat without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.toCardanoNodeFormatUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.toCardanoNodeFormatUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCardanoNodeFormatUnsafe = (
  instance: CML.PlutusData,
): CML.PlutusData => Effect.runSync(toCardanoNodeFormat(instance));

/**
 * Method toCborBytes of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.PlutusData): Effect.Effect<Uint8Array, PlutusDataError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toCborBytes failed PlutusData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PlutusData): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.PlutusData): Effect.Effect<Uint8Array, PlutusDataError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toCanonicalCborBytes failed PlutusData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.PlutusData,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusData.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PlutusData.from_cbor_bytes(cborBytes),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PlutusData.fromCborBytes without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.PlutusData): Effect.Effect<string, PlutusDataError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toCborHex failed PlutusData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PlutusData): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.PlutusData): Effect.Effect<string, PlutusDataError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toCanonicalCborHex failed PlutusData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.PlutusData): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusData.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.PlutusData.from_cbor_hex(cborBytes),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls PlutusData.fromCborHex without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.PlutusData): Effect.Effect<string, PlutusDataError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toJson failed PlutusData is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.PlutusData): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.PlutusData): Effect.Effect<any, PlutusDataError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.toJsValue failed PlutusData is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.PlutusData): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusData.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.PlutusData.from_json(json),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls PlutusData.fromJson without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Static method newConstrPlutusData of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusData.newConstrPlutusData( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newConstrPlutusData = Effect.fn(function* (
  constrPlutusData: CML.ConstrPlutusData,
) {
  return yield* Effect.try({
    try: () => CML.PlutusData.new_constr_plutus_data(constrPlutusData),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.newConstrPlutusData failed with parameters: ${constrPlutusData} (ConstrPlutusData). Hint: Not all PlutusData instances can be stringified.`,
      }),
  });
});

/**
 * Unsafely calls PlutusData.newConstrPlutusData without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.newConstrPlutusDataUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.newConstrPlutusDataUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newConstrPlutusDataUnsafe = (
  constrPlutusData: CML.ConstrPlutusData,
) => Effect.runSync(newConstrPlutusData(constrPlutusData));

/**
 * Static method newMap of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusData.newMap( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newMap = Effect.fn(function* (map: CML.PlutusMap) {
  return yield* Effect.try({
    try: () => CML.PlutusData.new_map(map),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.newMap failed with parameters: ${map} (PlutusMap). `,
      }),
  });
});

/**
 * Unsafely calls PlutusData.newMap without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.newMapUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.newMapUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newMapUnsafe = (map: CML.PlutusMap) => Effect.runSync(newMap(map));

/**
 * Static method newList of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusData.newList( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newList = Effect.fn(function* (list: CML.PlutusDataList) {
  return yield* Effect.try({
    try: () => CML.PlutusData.new_list(list),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.newList failed with parameters: ${list} (PlutusDataList). `,
      }),
  });
});

/**
 * Unsafely calls PlutusData.newList without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.newListUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.newListUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newListUnsafe = (list: CML.PlutusDataList) =>
  Effect.runSync(newList(list));

/**
 * Static method newInteger of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusData.newInteger( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newInteger = Effect.fn(function* (bigInt: CML.BigInteger) {
  return yield* Effect.try({
    try: () => CML.PlutusData.new_integer(bigInt),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.newInteger failed with parameters: ${bigInt} (BigInteger). `,
      }),
  });
});

/**
 * Unsafely calls PlutusData.newInteger without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.newIntegerUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.newIntegerUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newIntegerUnsafe = (bigInt: CML.BigInteger) =>
  Effect.runSync(newInteger(bigInt));

/**
 * Static method newBytes of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusData.newBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PlutusData.new_bytes(bytes),
    catch: () =>
      new PlutusDataError({
        message: `PlutusData.newBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PlutusData.newBytes without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.newBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.newBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(newBytes(bytes));

/**
 * Method kind of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.kind(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (
    instance: CML.PlutusData,
  ): Effect.Effect<CML.PlutusDataKind, PlutusDataError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.kindUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.kindUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (instance: CML.PlutusData): CML.PlutusDataKind =>
  Effect.runSync(kind(instance));

/**
 * Method asConstrPlutusData of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.asConstrPlutusData(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asConstrPlutusData = Effect.fn(
  (
    instance: CML.PlutusData,
  ): Effect.Effect<CML.ConstrPlutusData | undefined, PlutusDataError> =>
    Effect.try({
      try: () => instance.as_constr_plutus_data(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.asConstrPlutusData failed Hint: Not all PlutusData instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.asConstrPlutusData without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.asConstrPlutusDataUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.asConstrPlutusDataUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asConstrPlutusDataUnsafe = (
  instance: CML.PlutusData,
): CML.ConstrPlutusData | undefined =>
  Effect.runSync(asConstrPlutusData(instance));

/**
 * Method asMap of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.asMap(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asMap = Effect.fn(
  (
    instance: CML.PlutusData,
  ): Effect.Effect<CML.PlutusMap | undefined, PlutusDataError> =>
    Effect.try({
      try: () => instance.as_map(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.asMap failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asMap without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.asMapUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.asMapUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asMapUnsafe = (
  instance: CML.PlutusData,
): CML.PlutusMap | undefined => Effect.runSync(asMap(instance));

/**
 * Method asList of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.asList(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asList = Effect.fn(
  (
    instance: CML.PlutusData,
  ): Effect.Effect<CML.PlutusDataList | undefined, PlutusDataError> =>
    Effect.try({
      try: () => instance.as_list(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.asList failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asList without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.asListUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.asListUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asListUnsafe = (
  instance: CML.PlutusData,
): CML.PlutusDataList | undefined => Effect.runSync(asList(instance));

/**
 * Method asInteger of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.asInteger(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asInteger = Effect.fn(
  (
    instance: CML.PlutusData,
  ): Effect.Effect<CML.BigInteger | undefined, PlutusDataError> =>
    Effect.try({
      try: () => instance.as_integer(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.asInteger failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asInteger without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.asIntegerUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.asIntegerUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asIntegerUnsafe = (
  instance: CML.PlutusData,
): CML.BigInteger | undefined => Effect.runSync(asInteger(instance));

/**
 * Method asBytes of PlutusData
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *   const result = yield* PlutusData.asBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asBytes = Effect.fn(
  (
    instance: CML.PlutusData,
  ): Effect.Effect<Uint8Array | undefined, PlutusDataError> =>
    Effect.try({
      try: () => instance.as_bytes(),
      catch: () =>
        new PlutusDataError({
          message: `PlutusData.asBytes failed Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.asBytes without Effect wrapper
 *
 * @example
 * import { PlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusData.asBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusData.asBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asBytesUnsafe = (
  instance: CML.PlutusData,
): Uint8Array | undefined => Effect.runSync(asBytes(instance));
