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
export class CIP36RegistrationCborError extends Data.TaggedError("CIP36RegistrationCborError")<{
  message?: string;
}> {}

/**
 * Method free of CIP36RegistrationCbor
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.CIP36RegistrationCbor) => Effect.Effect<void, CIP36RegistrationCborError> = Effect.fn(
  (instance: CML.CIP36RegistrationCbor) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36RegistrationCborError({
          message: `CIP36RegistrationCbor.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP36RegistrationCbor): void =>
  Effect.runSync(free(instance));

/**
 * Method toJson of CIP36RegistrationCbor
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.CIP36RegistrationCbor) => Effect.Effect<string, CIP36RegistrationCborError> = Effect.fn(
  (instance: CML.CIP36RegistrationCbor) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP36RegistrationCborError({
          message: `CIP36RegistrationCbor.toJson failed CIP36RegistrationCbor is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP36RegistrationCbor): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36RegistrationCbor
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.CIP36RegistrationCbor) => Effect.Effect<any, CIP36RegistrationCborError> = Effect.fn(
  (instance: CML.CIP36RegistrationCbor) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP36RegistrationCborError({
          message: `CIP36RegistrationCbor.toJsValue failed CIP36RegistrationCbor is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP36RegistrationCbor): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36RegistrationCbor
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.CIP36RegistrationCbor, CIP36RegistrationCborError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP36RegistrationCbor.from_json(json),
    catch: () => new CIP36RegistrationCborError({
      message: `CIP36RegistrationCbor.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls CIP36RegistrationCbor.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.CIP36RegistrationCbor =>
  Effect.runSync(fromJson(json));

/**
 * Method keyRegistration of CIP36RegistrationCbor
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keyRegistration: (instance: CML.CIP36RegistrationCbor) => Effect.Effect<CML.CIP36KeyRegistration, CIP36RegistrationCborError> = Effect.fn(
  (instance: CML.CIP36RegistrationCbor) =>
    Effect.try({
      try: () => instance.key_registration(),
      catch: () =>
        new CIP36RegistrationCborError({
          message: `CIP36RegistrationCbor.keyRegistration failed Hint: Not all CIP36RegistrationCbor instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.keyRegistration without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keyRegistrationUnsafe = (instance: CML.CIP36RegistrationCbor): CML.CIP36KeyRegistration =>
  Effect.runSync(keyRegistration(instance));

/**
 * Method registrationWitness of CIP36RegistrationCbor
 * 
 * @since 2.0.0
 * @category Methods
 */
export const registrationWitness: (instance: CML.CIP36RegistrationCbor) => Effect.Effect<CML.CIP36RegistrationWitness, CIP36RegistrationCborError> = Effect.fn(
  (instance: CML.CIP36RegistrationCbor) =>
    Effect.try({
      try: () => instance.registration_witness(),
      catch: () =>
        new CIP36RegistrationCborError({
          message: `CIP36RegistrationCbor.registrationWitness failed Hint: Not all CIP36RegistrationCbor instances can be stringified.`,
        }),
    })
);

/**
 * Unsafely calls instance.registrationWitness without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const registrationWitnessUnsafe = (instance: CML.CIP36RegistrationCbor): CML.CIP36RegistrationWitness =>
  Effect.runSync(registrationWitness(instance));

/**
 * Static method _new of CIP36RegistrationCbor
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (keyRegistration: CML.CIP36KeyRegistration, registrationWitness: CML.CIP36RegistrationWitness) => Effect.Effect<CML.CIP36RegistrationCbor, CIP36RegistrationCborError> = Effect.fn(function* (keyRegistration: CML.CIP36KeyRegistration, registrationWitness: CML.CIP36RegistrationWitness) {
  return yield* Effect.try({
    try: () => CML.CIP36RegistrationCbor.new(keyRegistration, registrationWitness),
    catch: () => new CIP36RegistrationCborError({
      message: `CIP36RegistrationCbor._new failed with parameters: ${keyRegistration} (CIP36KeyRegistration), ${registrationWitness} (CIP36RegistrationWitness). `,
    }),
  });
});

/**
 * Unsafely calls CIP36RegistrationCbor._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (keyRegistration: CML.CIP36KeyRegistration, registrationWitness: CML.CIP36RegistrationWitness): CML.CIP36RegistrationCbor =>
  Effect.runSync(_new(keyRegistration, registrationWitness));
