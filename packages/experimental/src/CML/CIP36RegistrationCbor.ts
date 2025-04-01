/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP36RegistrationCbor class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP36RegistrationCbor = CML.CIP36RegistrationCbor;

/**
 * Error class for CIP36RegistrationCbor operations
 *
 * This error is thrown when operations on CIP36RegistrationCbor instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP36RegistrationCborError extends Data.TaggedError(
  "CIP36RegistrationCborError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP36RegistrationCbor
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationCbor instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationCbor.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.CIP36RegistrationCbor,
  ): Effect.Effect<void, CIP36RegistrationCborError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36RegistrationCborError({
          message: `CIP36RegistrationCbor.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationCbor instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationCbor.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP36RegistrationCbor): void =>
  Effect.runSync(free(instance));

/**
 * Method toJson of CIP36RegistrationCbor
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationCbor instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationCbor.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.CIP36RegistrationCbor,
  ): Effect.Effect<string, CIP36RegistrationCborError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP36RegistrationCborError({
          message: `CIP36RegistrationCbor.toJson failed CIP36RegistrationCbor is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationCbor instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationCbor.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP36RegistrationCbor): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36RegistrationCbor
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationCbor instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationCbor.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.CIP36RegistrationCbor,
  ): Effect.Effect<any, CIP36RegistrationCborError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP36RegistrationCborError({
          message: `CIP36RegistrationCbor.toJsValue failed CIP36RegistrationCbor is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationCbor instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationCbor.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP36RegistrationCbor): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36RegistrationCbor
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36RegistrationCbor.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP36RegistrationCbor.from_json(json),
    catch: () =>
      new CIP36RegistrationCborError({
        message: `CIP36RegistrationCbor.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls CIP36RegistrationCbor.fromJson without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationCbor.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method keyRegistration of CIP36RegistrationCbor
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationCbor instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationCbor.keyRegistration(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const keyRegistration = Effect.fn(
  (
    instance: CML.CIP36RegistrationCbor,
  ): Effect.Effect<CML.CIP36KeyRegistration, CIP36RegistrationCborError> =>
    Effect.try({
      try: () => instance.key_registration(),
      catch: () =>
        new CIP36RegistrationCborError({
          message: `CIP36RegistrationCbor.keyRegistration failed Hint: Not all CIP36RegistrationCbor instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.keyRegistration without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationCbor instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationCbor.keyRegistrationUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.keyRegistrationUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keyRegistrationUnsafe = (
  instance: CML.CIP36RegistrationCbor,
): CML.CIP36KeyRegistration => Effect.runSync(keyRegistration(instance));

/**
 * Method registrationWitness of CIP36RegistrationCbor
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationCbor instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationCbor.registrationWitness(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const registrationWitness = Effect.fn(
  (
    instance: CML.CIP36RegistrationCbor,
  ): Effect.Effect<CML.CIP36RegistrationWitness, CIP36RegistrationCborError> =>
    Effect.try({
      try: () => instance.registration_witness(),
      catch: () =>
        new CIP36RegistrationCborError({
          message: `CIP36RegistrationCbor.registrationWitness failed Hint: Not all CIP36RegistrationCbor instances can be stringified.`,
        }),
    }),
);

/**
 * Unsafely calls instance.registrationWitness without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationCbor instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationCbor.registrationWitnessUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.registrationWitnessUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const registrationWitnessUnsafe = (
  instance: CML.CIP36RegistrationCbor,
): CML.CIP36RegistrationWitness =>
  Effect.runSync(registrationWitness(instance));

/**
 * Static method _new of CIP36RegistrationCbor
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36RegistrationCbor._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  keyRegistration: CML.CIP36KeyRegistration,
  registrationWitness: CML.CIP36RegistrationWitness,
) {
  return yield* Effect.try({
    try: () =>
      CML.CIP36RegistrationCbor.new(keyRegistration, registrationWitness),
    catch: () =>
      new CIP36RegistrationCborError({
        message: `CIP36RegistrationCbor._new failed with parameters: ${keyRegistration} (CIP36KeyRegistration), ${registrationWitness} (CIP36RegistrationWitness). `,
      }),
  });
});

/**
 * Unsafely calls CIP36RegistrationCbor._new without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationCbor } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationCbor._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  keyRegistration: CML.CIP36KeyRegistration,
  registrationWitness: CML.CIP36RegistrationWitness,
) => Effect.runSync(_new(keyRegistration, registrationWitness));
