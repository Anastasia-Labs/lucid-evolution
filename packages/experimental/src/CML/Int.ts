import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type Int = CML.Int;

export class IntError extends Data.TaggedError("IntError")<{
  message?: string;
}> {}

/**
 * Method free of Int
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Int instance
 * const instance = ... ;
 *   const result = yield* Int.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.Int): Effect.Effect<void, IntError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new IntError({
          message: `Int.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Int instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Int.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Int.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.Int): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of Int
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Int instance
 * const instance = ... ;
 *   const result = yield* Int.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.Int): Effect.Effect<Uint8Array, IntError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new IntError({
          message: `Int.toCborBytes failed Int is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Int instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Int.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Int.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.Int): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of Int
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Int.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.Int.from_cbor_bytes(cborBytes),
    catch: () => new IntError({
      message: `Int.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls Int.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Int.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Int.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toJson of Int
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Int instance
 * const instance = ... ;
 *   const result = yield* Int.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.Int): Effect.Effect<string, IntError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new IntError({
          message: `Int.toJson failed Int is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Int instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Int.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Int.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.Int): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsonValue of Int
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Int instance
 * const instance = ... ;
 *   const result = yield* Int.toJsonValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsonValue = Effect.fn(
  (instance: CML.Int): Effect.Effect<any, IntError> =>
    Effect.try({
      try: () => instance.to_json_value(),
      catch: () =>
        new IntError({
          message: `Int.toJsonValue failed Int is not valid for any conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJsonValue without Effect wrapper
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Int instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Int.unsafeToJsonValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Int.unsafeToJsonValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsonValue = (instance: CML.Int): any =>
  Effect.runSync(toJsonValue(instance));

/**
 * Static method fromJson of Int
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Int.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.Int.from_json(json),
    catch: () => new IntError({
      message: `Int.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls Int.fromJson without Effect wrapper
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Int.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Int.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Static method _new of Int
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Int._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (x: bigint) {
  return yield* Effect.try({
    try: () => CML.Int.new(x),
    catch: () => new IntError({
      message: `Int._new failed with parameters: ${x}. `,
    }),
  });
});

/**
 * Unsafely calls Int._new without Effect wrapper
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Int.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Int.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (x: bigint) =>
  Effect.runSync(_new(x));

/**
 * Method toStr of Int
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a Int instance
 * const instance = ... ;
 *   const result = yield* Int.toStr(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toStr = Effect.fn(
  (instance: CML.Int): Effect.Effect<string, IntError> =>
    Effect.try({
      try: () => instance.to_str(),
      catch: () =>
        new IntError({
          message: `Int.toStr failed Int is not valid for string conversion. Hint: Not all Int instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.toStr without Effect wrapper
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a Int instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Int.unsafeToStr(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Int.unsafeToStr failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToStr = (instance: CML.Int): string =>
  Effect.runSync(toStr(instance));

/**
 * Static method fromStr of Int
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* Int.fromStr( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromStr = Effect.fn(function* (string: string) {
  return yield* Effect.try({
    try: () => CML.Int.from_str(string),
    catch: () => new IntError({
      message: `Int.fromStr failed with parameters: ${string}. Hint: Not all Int instances can be stringified.`,
    }),
  });
});

/**
 * Unsafely calls Int.fromStr without Effect wrapper
 * 
 * @example
 * import { Int } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = Int.unsafeFromStr( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`Int.unsafeFromStr failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromStr = (string: string) =>
  Effect.runSync(fromStr(string));
