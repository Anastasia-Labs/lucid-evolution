/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP36DeregistrationCbor class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP36DeregistrationCbor = CML.CIP36DeregistrationCbor;

/**
 * Error class for CIP36DeregistrationCbor operations
 * 
 * This error is thrown when operations on CIP36DeregistrationCbor instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP36DeregistrationCborError extends Data.TaggedError("CIP36DeregistrationCborError")<{
  message?: string;
}> {}

/**
 * Method free of CIP36DeregistrationCbor
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.CIP36DeregistrationCbor) => Effect.Effect<void, CIP36DeregistrationCborError> = Effect.fn(
  (instance: CML.CIP36DeregistrationCbor) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP36DeregistrationCbor): void =>
  Effect.runSync(free(instance));

/**
 * Method toJson of CIP36DeregistrationCbor
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.CIP36DeregistrationCbor) => Effect.Effect<string, CIP36DeregistrationCborError> = Effect.fn(
  (instance: CML.CIP36DeregistrationCbor) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP36DeregistrationCbor): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36DeregistrationCbor
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.CIP36DeregistrationCbor) => Effect.Effect<any, CIP36DeregistrationCborError> = Effect.fn(
  (instance: CML.CIP36DeregistrationCbor) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP36DeregistrationCbor): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36DeregistrationCbor
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.CIP36DeregistrationCbor, CIP36DeregistrationCborError> = Effect.fn(function* (json: string) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.CIP36DeregistrationCbor =>
  Effect.runSync(fromJson(json));

/**
 * Method keyDeregistration of CIP36DeregistrationCbor
 * 
 * @since 2.0.0
 * @category Methods
 */
export const keyDeregistration: (instance: CML.CIP36DeregistrationCbor) => Effect.Effect<CML.CIP36KeyDeregistration, CIP36DeregistrationCborError> = Effect.fn(
  (instance: CML.CIP36DeregistrationCbor) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const keyDeregistrationUnsafe = (instance: CML.CIP36DeregistrationCbor): CML.CIP36KeyDeregistration =>
  Effect.runSync(keyDeregistration(instance));

/**
 * Method deregistrationWitness of CIP36DeregistrationCbor
 * 
 * @since 2.0.0
 * @category Methods
 */
export const deregistrationWitness: (instance: CML.CIP36DeregistrationCbor) => Effect.Effect<CML.CIP36DeregistrationWitness, CIP36DeregistrationCborError> = Effect.fn(
  (instance: CML.CIP36DeregistrationCbor) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const deregistrationWitnessUnsafe = (instance: CML.CIP36DeregistrationCbor): CML.CIP36DeregistrationWitness =>
  Effect.runSync(deregistrationWitness(instance));

/**
 * Static method _new of CIP36DeregistrationCbor
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (keyDeregistration: CML.CIP36KeyDeregistration, deregistrationWitness: CML.CIP36DeregistrationWitness) => Effect.Effect<CML.CIP36DeregistrationCbor, CIP36DeregistrationCborError> = Effect.fn(function* (keyDeregistration: CML.CIP36KeyDeregistration, deregistrationWitness: CML.CIP36DeregistrationWitness) {
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
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (keyDeregistration: CML.CIP36KeyDeregistration, deregistrationWitness: CML.CIP36DeregistrationWitness): CML.CIP36DeregistrationCbor =>
  Effect.runSync(_new(keyDeregistration, deregistrationWitness));
