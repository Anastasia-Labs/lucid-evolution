import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type PlutusV3Script = CML.PlutusV3Script;

export class PlutusV3ScriptError extends Data.TaggedError(
  "PlutusV3ScriptError",
)<{
  message?: string;
}> {}

/**
 * Method free of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV3Script.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.PlutusV3Script): Effect.Effect<void, PlutusV3ScriptError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.PlutusV3Script): void =>
  Effect.runSync(free(instance));

/**
 * Method hash of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV3Script.hash(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const hash = Effect.fn(
  (
    instance: CML.PlutusV3Script,
  ): Effect.Effect<CML.ScriptHash, PlutusV3ScriptError> =>
    Effect.try({
      try: () => instance.hash(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.hash failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.hash without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeHash(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeHash failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeHash = (instance: CML.PlutusV3Script): CML.ScriptHash =>
  Effect.runSync(hash(instance));

/**
 * Method toRawBytes of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV3Script.toRawBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toRawBytes = Effect.fn(
  (
    instance: CML.PlutusV3Script,
  ): Effect.Effect<Uint8Array, PlutusV3ScriptError> =>
    Effect.try({
      try: () => instance.to_raw_bytes(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toRawBytes failed PlutusV3Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toRawBytes without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeToRawBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeToRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToRawBytes = (instance: CML.PlutusV3Script): Uint8Array =>
  Effect.runSync(toRawBytes(instance));

/**
 * Static method fromRawBytes of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusV3Script.fromRawBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromRawBytes = Effect.fn(function* (bytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PlutusV3Script.from_raw_bytes(bytes),
    catch: () =>
      new PlutusV3ScriptError({
        message: `PlutusV3Script.fromRawBytes failed with parameters: ${bytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PlutusV3Script.fromRawBytes without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeFromRawBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeFromRawBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromRawBytes = (bytes: Uint8Array) =>
  Effect.runSync(fromRawBytes(bytes));

/**
 * Method toHex of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV3Script.toHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toHex = Effect.fn(
  (instance: CML.PlutusV3Script): Effect.Effect<string, PlutusV3ScriptError> =>
    Effect.try({
      try: () => instance.to_hex(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toHex failed PlutusV3Script is not valid for string conversion. Hint: Ensure hex string has valid characters and length.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toHex without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeToHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeToHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToHex = (instance: CML.PlutusV3Script): string =>
  Effect.runSync(toHex(instance));

/**
 * Static method fromHex of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusV3Script.fromHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromHex = Effect.fn(function* (input: string) {
  return yield* Effect.try({
    try: () => CML.PlutusV3Script.from_hex(input),
    catch: () =>
      new PlutusV3ScriptError({
        message: `PlutusV3Script.fromHex failed with parameters: ${input}. Hint: Ensure hex string has valid characters and length.`,
      }),
  });
});

/**
 * Unsafely calls PlutusV3Script.fromHex without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeFromHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeFromHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromHex = (input: string) => Effect.runSync(fromHex(input));

/**
 * Method toCborBytes of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV3Script.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.PlutusV3Script,
  ): Effect.Effect<Uint8Array, PlutusV3ScriptError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toCborBytes failed PlutusV3Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeToCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.PlutusV3Script): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV3Script.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.PlutusV3Script,
  ): Effect.Effect<Uint8Array, PlutusV3ScriptError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toCanonicalCborBytes failed PlutusV3Script is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (
  instance: CML.PlutusV3Script,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusV3Script.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PlutusV3Script.from_cbor_bytes(cborBytes),
    catch: () =>
      new PlutusV3ScriptError({
        message: `PlutusV3Script.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls PlutusV3Script.fromCborBytes without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeFromCborBytes failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV3Script.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.PlutusV3Script): Effect.Effect<string, PlutusV3ScriptError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toCborHex failed PlutusV3Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeToCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.PlutusV3Script): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV3Script.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.PlutusV3Script): Effect.Effect<string, PlutusV3ScriptError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toCanonicalCborHex failed PlutusV3Script is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (
  instance: CML.PlutusV3Script,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusV3Script.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.PlutusV3Script.from_cbor_hex(cborBytes),
    catch: () =>
      new PlutusV3ScriptError({
        message: `PlutusV3Script.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls PlutusV3Script.fromCborHex without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeFromCborHex failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV3Script.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.PlutusV3Script): Effect.Effect<string, PlutusV3ScriptError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toJson failed PlutusV3Script is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.PlutusV3Script): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *   const result = yield* PlutusV3Script.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.PlutusV3Script): Effect.Effect<any, PlutusV3ScriptError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PlutusV3ScriptError({
          message: `PlutusV3Script.toJsValue failed PlutusV3Script is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 * // Assume we have a PlutusV3Script instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.PlutusV3Script): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PlutusV3Script
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* PlutusV3Script.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.PlutusV3Script.from_json(json),
    catch: () =>
      new PlutusV3ScriptError({
        message: `PlutusV3Script.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls PlutusV3Script.fromJson without Effect wrapper
 *
 * @example
 * import { PlutusV3Script } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = PlutusV3Script.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`PlutusV3Script.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));
