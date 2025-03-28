import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CIP36DeregistrationCbor = CML.CIP36DeregistrationCbor;

export class CIP36DeregistrationCborError extends Data.TaggedError("CIP36DeregistrationCborError")<{
  message?: string;
}> {}

/**
 * Method free of CIP36DeregistrationCbor
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationCbor instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationCbor.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.CIP36DeregistrationCbor): Effect.Effect<void, CIP36DeregistrationCborError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36DeregistrationCborError({
          message: `CIP36DeregistrationCbor.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DeregistrationCbor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationCbor.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationCbor.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CIP36DeregistrationCbor): void =>
  Effect.runSync(free(instance));

/**
 * Method toJson of CIP36DeregistrationCbor
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationCbor instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationCbor.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.CIP36DeregistrationCbor): Effect.Effect<string, CIP36DeregistrationCborError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP36DeregistrationCborError({
          message: `CIP36DeregistrationCbor.toJson failed CIP36DeregistrationCbor is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DeregistrationCbor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationCbor.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationCbor.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.CIP36DeregistrationCbor): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36DeregistrationCbor
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationCbor instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationCbor.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.CIP36DeregistrationCbor): Effect.Effect<any, CIP36DeregistrationCborError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP36DeregistrationCborError({
          message: `CIP36DeregistrationCbor.toJsValue failed CIP36DeregistrationCbor is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DeregistrationCbor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationCbor.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationCbor.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.CIP36DeregistrationCbor): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36DeregistrationCbor
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36DeregistrationCbor.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP36DeregistrationCbor.from_json(json),
    catch: () => new CIP36DeregistrationCborError({
      message: `CIP36DeregistrationCbor.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls CIP36DeregistrationCbor.fromJson without Effect wrapper
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationCbor.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationCbor.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method keyDeregistration of CIP36DeregistrationCbor
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationCbor instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationCbor.keyDeregistration(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keyDeregistration = Effect.fn(
  (instance: CML.CIP36DeregistrationCbor): Effect.Effect<CML.CIP36KeyDeregistration, CIP36DeregistrationCborError> =>
    Effect.try({
      try: () => instance.key_deregistration(),
      catch: () =>
        new CIP36DeregistrationCborError({
          message: `CIP36DeregistrationCbor.keyDeregistration failed Hint: Not all CIP36DeregistrationCbor instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.keyDeregistration without Effect wrapper
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DeregistrationCbor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationCbor.unsafeKeyDeregistration(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationCbor.unsafeKeyDeregistration failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeyDeregistration = (instance: CML.CIP36DeregistrationCbor): CML.CIP36KeyDeregistration =>
  Effect.runSync(keyDeregistration(instance));

/**
 * Method deregistrationWitness of CIP36DeregistrationCbor
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationCbor instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationCbor.deregistrationWitness(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const deregistrationWitness = Effect.fn(
  (instance: CML.CIP36DeregistrationCbor): Effect.Effect<CML.CIP36DeregistrationWitness, CIP36DeregistrationCborError> =>
    Effect.try({
      try: () => instance.deregistration_witness(),
      catch: () =>
        new CIP36DeregistrationCborError({
          message: `CIP36DeregistrationCbor.deregistrationWitness failed Hint: Not all CIP36DeregistrationCbor instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.deregistrationWitness without Effect wrapper
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a CIP36DeregistrationCbor instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationCbor.unsafeDeregistrationWitness(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationCbor.unsafeDeregistrationWitness failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeDeregistrationWitness = (instance: CML.CIP36DeregistrationCbor): CML.CIP36DeregistrationWitness =>
  Effect.runSync(deregistrationWitness(instance));

/**
 * Static method _new of CIP36DeregistrationCbor
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* CIP36DeregistrationCbor._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (keyDeregistration: CML.CIP36KeyDeregistration, deregistrationWitness: CML.CIP36DeregistrationWitness) {
  return yield* Effect.try({
    try: () => CML.CIP36DeregistrationCbor.new(keyDeregistration, deregistrationWitness),
    catch: () => new CIP36DeregistrationCborError({
      message: `CIP36DeregistrationCbor._new failed with parameters: ${keyDeregistration} (CIP36KeyDeregistration), ${deregistrationWitness} (CIP36DeregistrationWitness). `,
    }),
  });
});

/**
 * Unsafely calls CIP36DeregistrationCbor._new without Effect wrapper
 * 
 * @example
 * import { CIP36DeregistrationCbor } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationCbor.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationCbor.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (keyDeregistration: CML.CIP36KeyDeregistration, deregistrationWitness: CML.CIP36DeregistrationWitness) =>
  Effect.runSync(_new(keyDeregistration, deregistrationWitness));
