import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type ConstrPlutusData = CML.ConstrPlutusData;

export class ConstrPlutusDataError extends Data.TaggedError(
  "ConstrPlutusDataError",
)<{
  message?: string;
}> {}

/**
 * Method free of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *   const result = yield* ConstrPlutusData.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.ConstrPlutusData,
  ): Effect.Effect<void, ConstrPlutusDataError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.ConstrPlutusData): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *   const result = yield* ConstrPlutusData.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.ConstrPlutusData,
  ): Effect.Effect<Uint8Array, ConstrPlutusDataError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.toCborBytes failed ConstrPlutusData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.ConstrPlutusData): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *   const result = yield* ConstrPlutusData.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.ConstrPlutusData,
  ): Effect.Effect<Uint8Array, ConstrPlutusDataError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.toCanonicalCborBytes failed ConstrPlutusData is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.ConstrPlutusData,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ConstrPlutusData.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ConstrPlutusData.from_cbor_bytes(cborBytes),
    catch: () =>
      new ConstrPlutusDataError({
        message: `ConstrPlutusData.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ConstrPlutusData.fromCborBytes without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *   const result = yield* ConstrPlutusData.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.ConstrPlutusData,
  ): Effect.Effect<string, ConstrPlutusDataError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.toCborHex failed ConstrPlutusData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.ConstrPlutusData): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *   const result = yield* ConstrPlutusData.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.ConstrPlutusData,
  ): Effect.Effect<string, ConstrPlutusDataError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.toCanonicalCborHex failed ConstrPlutusData is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (
  instance: CML.ConstrPlutusData,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ConstrPlutusData.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ConstrPlutusData.from_cbor_hex(cborBytes),
    catch: () =>
      new ConstrPlutusDataError({
        message: `ConstrPlutusData.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ConstrPlutusData.fromCborHex without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *   const result = yield* ConstrPlutusData.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.ConstrPlutusData,
  ): Effect.Effect<string, ConstrPlutusDataError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.toJson failed ConstrPlutusData is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.ConstrPlutusData): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *   const result = yield* ConstrPlutusData.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.ConstrPlutusData): Effect.Effect<any, ConstrPlutusDataError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.toJsValue failed ConstrPlutusData is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.ConstrPlutusData): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ConstrPlutusData.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ConstrPlutusData.from_json(json),
    catch: () =>
      new ConstrPlutusDataError({
        message: `ConstrPlutusData.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls ConstrPlutusData.fromJson without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method alternative of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *   const result = yield* ConstrPlutusData.alternative(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const alternative = Effect.fn(
  (
    instance: CML.ConstrPlutusData,
  ): Effect.Effect<bigint, ConstrPlutusDataError> =>
    Effect.try({
      try: () => instance.alternative(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.alternative failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.alternative without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafeAlternative(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafeAlternative failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeAlternative = (instance: CML.ConstrPlutusData): bigint =>
  Effect.runSync(alternative(instance));

/**
 * Method fields of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *   const result = yield* ConstrPlutusData.fields(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const fields = Effect.fn(
  (
    instance: CML.ConstrPlutusData,
  ): Effect.Effect<CML.PlutusDataList, ConstrPlutusDataError> =>
    Effect.try({
      try: () => instance.fields(),
      catch: () =>
        new ConstrPlutusDataError({
          message: `ConstrPlutusData.fields failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.fields without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ConstrPlutusData instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafeFields(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafeFields failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFields = (
  instance: CML.ConstrPlutusData,
): CML.PlutusDataList => Effect.runSync(fields(instance));

/**
 * Static method _new of ConstrPlutusData
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ConstrPlutusData._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  alternative: bigint,
  fields: CML.PlutusDataList,
) {
  return yield* Effect.try({
    try: () => CML.ConstrPlutusData.new(alternative, fields),
    catch: () =>
      new ConstrPlutusDataError({
        message: `ConstrPlutusData._new failed with parameters: ${alternative}, ${fields} (PlutusDataList). `,
      }),
  });
});

/**
 * Unsafely calls ConstrPlutusData._new without Effect wrapper
 *
 * @example
 * import { ConstrPlutusData } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ConstrPlutusData.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ConstrPlutusData.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (alternative: bigint, fields: CML.PlutusDataList) =>
  Effect.runSync(_new(alternative, fields));
