/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML TransactionWitnessSet class
 *
 * @since 2.0.0
 * @category Types
 */
export type TransactionWitnessSet = CML.TransactionWitnessSet;

/**
 * Error class for TransactionWitnessSet operations
 *
 * This error is thrown when operations on TransactionWitnessSet instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class TransactionWitnessSetError extends Data.TaggedError(
  "TransactionWitnessSetError",
)<{
  message?: string;
}> {}

/**
 * Method free of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<void, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.TransactionWitnessSet): void =>
  Effect.runSync(free(instance));

/**
 * Method addAllWitnesses of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.addAllWitnesses(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const addAllWitnesses = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    other: CML.TransactionWitnessSet,
  ): Effect.Effect<void, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.add_all_witnesses(other),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.addAllWitnesses failed with parameters: ${other} (TransactionWitnessSet). `,
        }),
    }),
);

/**
 * Unsafely calls instance.addAllWitnesses without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.addAllWitnessesUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.addAllWitnessesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const addAllWitnessesUnsafe = (
  instance: CML.TransactionWitnessSet,
  other: CML.TransactionWitnessSet,
): void => Effect.runSync(addAllWitnesses(instance, other));

/**
 * Method languages of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.languages(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const languages = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<CML.LanguageList, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.languages(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.languages failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.languages without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.languagesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.languagesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const languagesUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.LanguageList => Effect.runSync(languages(instance));

/**
 * Method toCborBytes of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<Uint8Array, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.toCborBytes failed TransactionWitnessSet is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.TransactionWitnessSet,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<Uint8Array, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.toCanonicalCborBytes failed TransactionWitnessSet is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.TransactionWitnessSet,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionWitnessSet.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.TransactionWitnessSet.from_cbor_bytes(cborBytes),
    catch: () =>
      new TransactionWitnessSetError({
        message: `TransactionWitnessSet.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls TransactionWitnessSet.fromCborBytes without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<string, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.toCborHex failed TransactionWitnessSet is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.TransactionWitnessSet): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<string, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.toCanonicalCborHex failed TransactionWitnessSet is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.TransactionWitnessSet,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionWitnessSet.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.TransactionWitnessSet.from_cbor_hex(cborBytes),
    catch: () =>
      new TransactionWitnessSetError({
        message: `TransactionWitnessSet.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls TransactionWitnessSet.fromCborHex without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<string, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.toJson failed TransactionWitnessSet is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.TransactionWitnessSet): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<any, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.toJsValue failed TransactionWitnessSet is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.TransactionWitnessSet): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionWitnessSet.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.TransactionWitnessSet.from_json(json),
    catch: () =>
      new TransactionWitnessSetError({
        message: `TransactionWitnessSet.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls TransactionWitnessSet.fromJson without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method setVkeywitnesses of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.setVkeywitnesses(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setVkeywitnesses = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    vkeywitnesses: CML.VkeywitnessList,
  ): Effect.Effect<void, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.set_vkeywitnesses(vkeywitnesses),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setVkeywitnesses failed with parameters: ${vkeywitnesses} (VkeywitnessList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setVkeywitnesses without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.setVkeywitnessesUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.setVkeywitnessesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setVkeywitnessesUnsafe = (
  instance: CML.TransactionWitnessSet,
  vkeywitnesses: CML.VkeywitnessList,
): void => Effect.runSync(setVkeywitnesses(instance, vkeywitnesses));

/**
 * Method vkeywitnesses of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.vkeywitnesses(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const vkeywitnesses = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<
    CML.VkeywitnessList | undefined,
    TransactionWitnessSetError
  > =>
    Effect.try({
      try: () => instance.vkeywitnesses(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.vkeywitnesses failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.vkeywitnesses without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.vkeywitnessesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.vkeywitnessesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const vkeywitnessesUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.VkeywitnessList | undefined => Effect.runSync(vkeywitnesses(instance));

/**
 * Method setNativeScripts of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.setNativeScripts(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setNativeScripts = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    nativeScripts: CML.NativeScriptList,
  ): Effect.Effect<void, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.set_native_scripts(nativeScripts),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setNativeScripts failed with parameters: ${nativeScripts} (NativeScriptList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setNativeScripts without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.setNativeScriptsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.setNativeScriptsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setNativeScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
  nativeScripts: CML.NativeScriptList,
): void => Effect.runSync(setNativeScripts(instance, nativeScripts));

/**
 * Method nativeScripts of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.nativeScripts(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const nativeScripts = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<
    CML.NativeScriptList | undefined,
    TransactionWitnessSetError
  > =>
    Effect.try({
      try: () => instance.native_scripts(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.nativeScripts failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.nativeScripts without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.nativeScriptsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.nativeScriptsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const nativeScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.NativeScriptList | undefined => Effect.runSync(nativeScripts(instance));

/**
 * Method setBootstrapWitnesses of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.setBootstrapWitnesses(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setBootstrapWitnesses = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    bootstrapWitnesses: CML.BootstrapWitnessList,
  ): Effect.Effect<void, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.set_bootstrap_witnesses(bootstrapWitnesses),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setBootstrapWitnesses failed with parameters: ${bootstrapWitnesses} (BootstrapWitnessList). Hint: Not all TransactionWitnessSet instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.setBootstrapWitnesses without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.setBootstrapWitnessesUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.setBootstrapWitnessesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setBootstrapWitnessesUnsafe = (
  instance: CML.TransactionWitnessSet,
  bootstrapWitnesses: CML.BootstrapWitnessList,
): void => Effect.runSync(setBootstrapWitnesses(instance, bootstrapWitnesses));

/**
 * Method bootstrapWitnesses of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.bootstrapWitnesses(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const bootstrapWitnesses = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<
    CML.BootstrapWitnessList | undefined,
    TransactionWitnessSetError
  > =>
    Effect.try({
      try: () => instance.bootstrap_witnesses(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.bootstrapWitnesses failed Hint: Not all TransactionWitnessSet instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.bootstrapWitnesses without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.bootstrapWitnessesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.bootstrapWitnessesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const bootstrapWitnessesUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.BootstrapWitnessList | undefined =>
  Effect.runSync(bootstrapWitnesses(instance));

/**
 * Method setPlutusV1Scripts of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.setPlutusV1Scripts(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setPlutusV1Scripts = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    plutusV1Scripts: CML.PlutusV1ScriptList,
  ): Effect.Effect<void, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.set_plutus_v1_scripts(plutusV1Scripts),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setPlutusV1Scripts failed with parameters: ${plutusV1Scripts} (PlutusV1ScriptList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setPlutusV1Scripts without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.setPlutusV1ScriptsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.setPlutusV1ScriptsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPlutusV1ScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
  plutusV1Scripts: CML.PlutusV1ScriptList,
): void => Effect.runSync(setPlutusV1Scripts(instance, plutusV1Scripts));

/**
 * Method plutusV1Scripts of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.plutusV1Scripts(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const plutusV1Scripts = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<
    CML.PlutusV1ScriptList | undefined,
    TransactionWitnessSetError
  > =>
    Effect.try({
      try: () => instance.plutus_v1_scripts(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.plutusV1Scripts failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.plutusV1Scripts without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.plutusV1ScriptsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.plutusV1ScriptsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusV1ScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.PlutusV1ScriptList | undefined =>
  Effect.runSync(plutusV1Scripts(instance));

/**
 * Method setPlutusDatums of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.setPlutusDatums(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setPlutusDatums = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    plutusDatums: CML.PlutusDataList,
  ): Effect.Effect<void, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.set_plutus_datums(plutusDatums),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setPlutusDatums failed with parameters: ${plutusDatums} (PlutusDataList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setPlutusDatums without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.setPlutusDatumsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.setPlutusDatumsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPlutusDatumsUnsafe = (
  instance: CML.TransactionWitnessSet,
  plutusDatums: CML.PlutusDataList,
): void => Effect.runSync(setPlutusDatums(instance, plutusDatums));

/**
 * Method plutusDatums of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.plutusDatums(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const plutusDatums = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<
    CML.PlutusDataList | undefined,
    TransactionWitnessSetError
  > =>
    Effect.try({
      try: () => instance.plutus_datums(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.plutusDatums failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.plutusDatums without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.plutusDatumsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.plutusDatumsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusDatumsUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.PlutusDataList | undefined => Effect.runSync(plutusDatums(instance));

/**
 * Method setRedeemers of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.setRedeemers(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setRedeemers = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    redeemers: CML.Redeemers,
  ): Effect.Effect<void, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.set_redeemers(redeemers),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setRedeemers failed with parameters: ${redeemers} (Redeemers). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setRedeemers without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.setRedeemersUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.setRedeemersUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setRedeemersUnsafe = (
  instance: CML.TransactionWitnessSet,
  redeemers: CML.Redeemers,
): void => Effect.runSync(setRedeemers(instance, redeemers));

/**
 * Method redeemers of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.redeemers(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const redeemers = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<CML.Redeemers | undefined, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.redeemers(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.redeemers failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.redeemers without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.redeemersUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.redeemersUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const redeemersUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.Redeemers | undefined => Effect.runSync(redeemers(instance));

/**
 * Method setPlutusV2Scripts of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.setPlutusV2Scripts(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setPlutusV2Scripts = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    plutusV2Scripts: CML.PlutusV2ScriptList,
  ): Effect.Effect<void, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.set_plutus_v2_scripts(plutusV2Scripts),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setPlutusV2Scripts failed with parameters: ${plutusV2Scripts} (PlutusV2ScriptList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setPlutusV2Scripts without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.setPlutusV2ScriptsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.setPlutusV2ScriptsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPlutusV2ScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
  plutusV2Scripts: CML.PlutusV2ScriptList,
): void => Effect.runSync(setPlutusV2Scripts(instance, plutusV2Scripts));

/**
 * Method plutusV2Scripts of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.plutusV2Scripts(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const plutusV2Scripts = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<
    CML.PlutusV2ScriptList | undefined,
    TransactionWitnessSetError
  > =>
    Effect.try({
      try: () => instance.plutus_v2_scripts(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.plutusV2Scripts failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.plutusV2Scripts without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.plutusV2ScriptsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.plutusV2ScriptsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusV2ScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.PlutusV2ScriptList | undefined =>
  Effect.runSync(plutusV2Scripts(instance));

/**
 * Method setPlutusV3Scripts of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.setPlutusV3Scripts(instance,  parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const setPlutusV3Scripts = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
    plutusV3Scripts: CML.PlutusV3ScriptList,
  ): Effect.Effect<void, TransactionWitnessSetError> =>
    Effect.try({
      try: () => instance.set_plutus_v3_scripts(plutusV3Scripts),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.setPlutusV3Scripts failed with parameters: ${plutusV3Scripts} (PlutusV3ScriptList). `,
        }),
    }),
);

/**
 * Unsafely calls instance.setPlutusV3Scripts without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.setPlutusV3ScriptsUnsafe(instance,  parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.setPlutusV3ScriptsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const setPlutusV3ScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
  plutusV3Scripts: CML.PlutusV3ScriptList,
): void => Effect.runSync(setPlutusV3Scripts(instance, plutusV3Scripts));

/**
 * Method plutusV3Scripts of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *   const result = yield* TransactionWitnessSet.plutusV3Scripts(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const plutusV3Scripts = Effect.fn(
  (
    instance: CML.TransactionWitnessSet,
  ): Effect.Effect<
    CML.PlutusV3ScriptList | undefined,
    TransactionWitnessSetError
  > =>
    Effect.try({
      try: () => instance.plutus_v3_scripts(),
      catch: () =>
        new TransactionWitnessSetError({
          message: `TransactionWitnessSet.plutusV3Scripts failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.plutusV3Scripts without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 * // Assume we have a TransactionWitnessSet instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet.plutusV3ScriptsUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet.plutusV3ScriptsUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const plutusV3ScriptsUnsafe = (
  instance: CML.TransactionWitnessSet,
): CML.PlutusV3ScriptList | undefined =>
  Effect.runSync(plutusV3Scripts(instance));

/**
 * Static method _new of TransactionWitnessSet
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* TransactionWitnessSet._new();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.TransactionWitnessSet.new(),
    catch: () =>
      new TransactionWitnessSetError({
        message: `TransactionWitnessSet._new failed `,
      }),
  });
});

/**
 * Unsafely calls TransactionWitnessSet._new without Effect wrapper
 *
 * @example
 * import { TransactionWitnessSet } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = TransactionWitnessSet._newUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`TransactionWitnessSet._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = () => Effect.runSync(_new());
