/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PlutusV1Script class
 *
 * @since 2.0.0
 * @category Types
 */
export type PlutusV1Script = CML.PlutusV1Script;

/**
 * Error class for PlutusV1Script operations
 * 
 * This error is thrown when operations on PlutusV1Script instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PlutusV1ScriptError extends Data.TaggedError("PlutusV1ScriptError")<{
  message?: string;
}> {}

/**
 * Method free of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV1Script.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PlutusV1Script): Effect.Effect<void, PlutusV1ScriptError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusV1ScriptError({
          message: `PlutusV1Script.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PlutusV1Script): void =>
  Effect.runSync(free(instance));

/**
 * Method hash of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV1Script.hash(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const hash = Effect.fn(
  (instance: CML.PlutusV1Script): Effect.Effect<CML.ScriptHash, PlutusV1ScriptError> =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new PlutusV1ScriptError({
          message: `PlutusV1Script.hash failed `,
        }),
    })
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.hashUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.hashUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const hashUnsafe = (instance: CML.PlutusV1Script): CML.ScriptHash =>
  Effect.runSync(hash(instance));

/**
 * Method toRawBytes of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV1Script.toRawBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (instance: CML.PlutusV1Script): Effect.Effect<Uint8Array, PlutusV1ScriptError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new PlutusV1ScriptError({
          message: `PlutusV1Script.toRawBytes failed PlutusV1Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.toRawBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.toRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toRawBytesUnsafe = (instance: CML.PlutusV1Script): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PlutusV1Script.fromRawBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PlutusV1Script.from_raw_bytes(bytes),
    catch: () => new PlutusV1ScriptError({
      message: `PlutusV1Script.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls PlutusV1Script.fromRawBytes without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.fromRawBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.fromRawBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromRawBytesUnsafe = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV1Script.toHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.PlutusV1Script): Effect.Effect<string, PlutusV1ScriptError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new PlutusV1ScriptError({
          message: `PlutusV1Script.toHex failed PlutusV1Script is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    })
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.toHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.toHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toHexUnsafe = (instance: CML.PlutusV1Script): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PlutusV1Script.fromHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.PlutusV1Script.from_hex(input),
    catch: () => new PlutusV1ScriptError({
      message: `PlutusV1Script.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
    }),
  });
});

/**
 * Unsafely calls PlutusV1Script.fromHex without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.fromHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.fromHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromHexUnsafe = (input: string) =>
  Effect.runSync(fromHex(input));

/**
 * Method toCborBytes of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV1Script.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.PlutusV1Script): Effect.Effect<Uint8Array, PlutusV1ScriptError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PlutusV1ScriptError({
          message: `PlutusV1Script.toCborBytes failed PlutusV1Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PlutusV1Script): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV1Script.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.PlutusV1Script): Effect.Effect<Uint8Array, PlutusV1ScriptError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PlutusV1ScriptError({
          message: `PlutusV1Script.toCanonicalCborBytes failed PlutusV1Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.PlutusV1Script): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PlutusV1Script.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PlutusV1Script.from_cbor_bytes(cborBytes),
    catch: () => new PlutusV1ScriptError({
      message: `PlutusV1Script.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls PlutusV1Script.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV1Script.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.PlutusV1Script): Effect.Effect<string, PlutusV1ScriptError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PlutusV1ScriptError({
          message: `PlutusV1Script.toCborHex failed PlutusV1Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PlutusV1Script): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV1Script.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.PlutusV1Script): Effect.Effect<string, PlutusV1ScriptError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PlutusV1ScriptError({
          message: `PlutusV1Script.toCanonicalCborHex failed PlutusV1Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.PlutusV1Script): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PlutusV1Script.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.PlutusV1Script.from_cbor_hex(cborBytes),
    catch: () => new PlutusV1ScriptError({
      message: `PlutusV1Script.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls PlutusV1Script.fromCborHex without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV1Script.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.PlutusV1Script): Effect.Effect<string, PlutusV1ScriptError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PlutusV1ScriptError({
          message: `PlutusV1Script.toJson failed PlutusV1Script is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.PlutusV1Script): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV1Script.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.PlutusV1Script): Effect.Effect<any, PlutusV1ScriptError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PlutusV1ScriptError({
          message: `PlutusV1Script.toJsValue failed PlutusV1Script is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a PlutusV1Script instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.PlutusV1Script): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PlutusV1Script
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* PlutusV1Script.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.PlutusV1Script.from_json(json),
    catch: () => new PlutusV1ScriptError({
      message: `PlutusV1Script.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls PlutusV1Script.fromJson without Effect wrapper
 * 
 * @example
 * import { PlutusV1Script } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV1Script.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV1Script.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));
