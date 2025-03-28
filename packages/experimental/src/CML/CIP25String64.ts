import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CIP25String64 = CML.CIP25String64;

export class CIP25String64Error extends Data.TaggedError("CIP25String64Error")<{
  message?: string;
}> {}

/**
 * Method free of CIP25String64
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 *   const result = yield* CIP25String64.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.CIP25String64): Effect.Effect<void, CIP25String64Error> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CIP25String64): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP25String64
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 *   const result = yield* CIP25String64.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.CIP25String64): Effect.Effect<Uint8Array, CIP25String64Error> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.toCborBytes failed CIP25String64 is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.CIP25String64): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of CIP25String64
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP25String64.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP25String64.from_cbor_bytes(cborBytes),
    catch: () => new CIP25String64Error({
      message: `CIP25String64.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls CIP25String64.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP25String64
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 *   const result = yield* CIP25String64.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.CIP25String64): Effect.Effect<string, CIP25String64Error> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.toCborHex failed CIP25String64 is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.CIP25String64): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of CIP25String64
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP25String64.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP25String64.from_cbor_hex(cborBytes),
    catch: () => new CIP25String64Error({
      message: `CIP25String64.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls CIP25String64.fromCborHex without Effect wrapper
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP25String64
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 *   const result = yield* CIP25String64.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.CIP25String64): Effect.Effect<string, CIP25String64Error> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.toJson failed CIP25String64 is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.CIP25String64): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP25String64
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 *   const result = yield* CIP25String64.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.CIP25String64): Effect.Effect<any, CIP25String64Error> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.toJsValue failed CIP25String64 is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.CIP25String64): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP25String64
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP25String64.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP25String64.from_json(json),
    catch: () => new CIP25String64Error({
      message: `CIP25String64.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls CIP25String64.fromJson without Effect wrapper
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method get of CIP25String64
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 *   const result = yield* CIP25String64.get(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const get = Effect.fn(
  (instance: CML.CIP25String64): Effect.Effect<string, CIP25String64Error> =>
    Effect.try({
      try: () => instance.get(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.get failed `,
        }),
    })
);

/**
 * Unsafely calls instance.get without Effect wrapper
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64.unsafeGet(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64.unsafeGet failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGet = (instance: CML.CIP25String64): string =>
  Effect.runSync(get(instance));

/**
 * Static method _new of CIP25String64
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP25String64._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (s: string) {
  return yield* Effect.try({
    try: () => CML.CIP25String64.new(s),
    catch: () => new CIP25String64Error({
      message: `CIP25String64._new failed with parameters: ${s}. `,
    }),
  });
});

/**
 * Unsafely calls CIP25String64._new without Effect wrapper
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (s: string) =>
  Effect.runSync(_new(s));

/**
 * Method toStr of CIP25String64
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 *   const result = yield* CIP25String64.toStr(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toStr = Effect.fn(
  (instance: CML.CIP25String64): Effect.Effect<string, CIP25String64Error> =>
    Effect.try({
      try: () => instance.to_str(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.toStr failed CIP25String64 is not valid for string conversion. Hint: Not all CIP25String64 instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.toStr without Effect wrapper
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64.unsafeToStr(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64.unsafeToStr failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToStr = (instance: CML.CIP25String64): string =>
  Effect.runSync(toStr(instance));

/**
 * Method getStr of CIP25String64
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 *   const result = yield* CIP25String64.getStr(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const getStr = Effect.fn(
  (instance: CML.CIP25String64): Effect.Effect<string, CIP25String64Error> =>
    Effect.try({
      try: () => instance.get_str(),
      catch: () =>
        new CIP25String64Error({
          message: `CIP25String64.getStr failed Hint: Not all CIP25String64 instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.getStr without Effect wrapper
 * 
 * @example
 * import { CIP25String64 } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP25String64 instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP25String64.unsafeGetStr(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP25String64.unsafeGetStr failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeGetStr = (instance: CML.CIP25String64): string =>
  Effect.runSync(getStr(instance));
