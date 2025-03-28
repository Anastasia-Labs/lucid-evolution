import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CIP36RegistrationCbor = CML.CIP36RegistrationCbor;

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
 *   const result = CIP36RegistrationCbor.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CIP36RegistrationCbor): void =>
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
 *   const result = CIP36RegistrationCbor.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.unsafeToJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.CIP36RegistrationCbor): string =>
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
 *   const result = CIP36RegistrationCbor.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.unsafeToJsValue failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.CIP36RegistrationCbor): any =>
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
 *   const result = CIP36RegistrationCbor.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.unsafeFromJson failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) => Effect.runSync(fromJson(json));

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
 *   const result = CIP36RegistrationCbor.unsafeKeyRegistration(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.unsafeKeyRegistration failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeKeyRegistration = (
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
 *   const result = CIP36RegistrationCbor.unsafeRegistrationWitness(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.unsafeRegistrationWitness failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeRegistrationWitness = (
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
 *   const result = CIP36RegistrationCbor.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationCbor.unsafe_new failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (
  keyRegistration: CML.CIP36KeyRegistration,
  registrationWitness: CML.CIP36RegistrationWitness,
) => Effect.runSync(_new(keyRegistration, registrationWitness));
