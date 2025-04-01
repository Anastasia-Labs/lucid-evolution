/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusV2Script class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusV2Script = CML.PlutusV2Script;

/**
 * Error class for PlutusV2Script operations
 *
 * This error is thrown when operations on PlutusV2Script instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusV2ScriptError extends Data.TaggedError(
  "PlutusV2ScriptError",
)<{
  message?: string;
}> {}

/**
 * Method free of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV2Script.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PlutusV2Script): Effect.Effect<void, PlutusV2ScriptError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusV2Script): void =>
  Effect.runSync(free(instance));

/**
 * Method hash of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV2Script.hash(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const hash = Effect.fn(
  (
    instance: CML.PlutusV2Script,
  ): Effect.Effect<CML.ScriptHash, PlutusV2ScriptError> =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.hash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.hashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.hashUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hashUnsafe = (instance: CML.PlutusV2Script): CML.ScriptHash =>
  Effect.runSync(hash(instance));

/**
 * Method toRawBytes of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV2Script.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (
    instance: CML.PlutusV2Script,
  ): Effect.Effect<Uint8Array, PlutusV2ScriptError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toRawBytes failed PlutusV2Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.toRawBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.PlutusV2Script): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusV2Script.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PlutusV2Script.from_raw_bytes(bytes),
    catch: () =>
      new PlutusV2ScriptError({
        message: `PlutusV2Script.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PlutusV2Script.fromRawBytes without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.fromRawBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.fromRawBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV2Script.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.PlutusV2Script): Effect.Effect<string, PlutusV2ScriptError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toHex failed PlutusV2Script is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.toHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.toHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.PlutusV2Script): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusV2Script.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.PlutusV2Script.from_hex(input),
    catch: () =>
      new PlutusV2ScriptError({
        message: `PlutusV2Script.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls PlutusV2Script.fromHex without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.fromHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.fromHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string) => Effect.runSync(fromHex(input));

/**
 * Method toCborBytes of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV2Script.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.PlutusV2Script,
  ): Effect.Effect<Uint8Array, PlutusV2ScriptError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toCborBytes failed PlutusV2Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PlutusV2Script): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV2Script.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.PlutusV2Script,
  ): Effect.Effect<Uint8Array, PlutusV2ScriptError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toCanonicalCborBytes failed PlutusV2Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.PlutusV2Script,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusV2Script.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PlutusV2Script.from_cbor_bytes(cborBytes),
    catch: () =>
      new PlutusV2ScriptError({
        message: `PlutusV2Script.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PlutusV2Script.fromCborBytes without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV2Script.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.PlutusV2Script): Effect.Effect<string, PlutusV2ScriptError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toCborHex failed PlutusV2Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PlutusV2Script): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV2Script.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.PlutusV2Script): Effect.Effect<string, PlutusV2ScriptError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toCanonicalCborHex failed PlutusV2Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.PlutusV2Script,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusV2Script.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.PlutusV2Script.from_cbor_hex(cborBytes),
    catch: () =>
      new PlutusV2ScriptError({
        message: `PlutusV2Script.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls PlutusV2Script.fromCborHex without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV2Script.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.PlutusV2Script): Effect.Effect<string, PlutusV2ScriptError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toJson failed PlutusV2Script is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.PlutusV2Script): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV2Script.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.PlutusV2Script): Effect.Effect<any, PlutusV2ScriptError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PlutusV2ScriptError({
          message: `PlutusV2Script.toJsValue failed PlutusV2Script is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV2Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.PlutusV2Script): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PlutusV2Script
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusV2Script.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.PlutusV2Script.from_json(json),
    catch: () =>
      new PlutusV2ScriptError({
        message: `PlutusV2Script.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls PlutusV2Script.fromJson without Effect wrapper
 *
 * @example
 * import { PlutusV2Script } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV2Script.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV2Script.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));
