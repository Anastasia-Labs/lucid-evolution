/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML PoolRegistration class
 *
 * @since 2.0.0
 * @category Types
 */
export type PoolRegistration = CML.PoolRegistration;

/**
 * Error class for PoolRegistration operations
 * 
 * This error is thrown when operations on PoolRegistration instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class PoolRegistrationError extends Data.TaggedError("PoolRegistrationError")<{
  message?: string;
}> {}

/**
 * Method free of PoolRegistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free: (instance: CML.PoolRegistration) => Effect.Effect<void, PoolRegistrationError> = Effect.fn(
  (instance: CML.PoolRegistration) =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.PoolRegistration): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of PoolRegistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes: (instance: CML.PoolRegistration) => Effect.Effect<Uint8Array, PoolRegistrationError> = Effect.fn(
  (instance: CML.PoolRegistration) =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.toCborBytes failed PoolRegistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.PoolRegistration): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of PoolRegistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes: (instance: CML.PoolRegistration) => Effect.Effect<Uint8Array, PoolRegistrationError> = Effect.fn(
  (instance: CML.PoolRegistration) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.toCanonicalCborBytes failed PoolRegistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.PoolRegistration): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of PoolRegistration
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes: (cborBytes: Uint8Array) => Effect.Effect<CML.PoolRegistration, PoolRegistrationError> = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.PoolRegistration.from_cbor_bytes(cborBytes),
    catch: () => new PoolRegistrationError({
      message: `PoolRegistration.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls PoolRegistration.fromCborBytes without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array): CML.PoolRegistration =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of PoolRegistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex: (instance: CML.PoolRegistration) => Effect.Effect<string, PoolRegistrationError> = Effect.fn(
  (instance: CML.PoolRegistration) =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.toCborHex failed PoolRegistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.PoolRegistration): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of PoolRegistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex: (instance: CML.PoolRegistration) => Effect.Effect<string, PoolRegistrationError> = Effect.fn(
  (instance: CML.PoolRegistration) =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.toCanonicalCborHex failed PoolRegistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.PoolRegistration): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of PoolRegistration
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex: (cborBytes: string) => Effect.Effect<CML.PoolRegistration, PoolRegistrationError> = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.PoolRegistration.from_cbor_hex(cborBytes),
    catch: () => new PoolRegistrationError({
      message: `PoolRegistration.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls PoolRegistration.fromCborHex without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string): CML.PoolRegistration =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of PoolRegistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson: (instance: CML.PoolRegistration) => Effect.Effect<string, PoolRegistrationError> = Effect.fn(
  (instance: CML.PoolRegistration) =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.toJson failed PoolRegistration is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.PoolRegistration): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of PoolRegistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue: (instance: CML.PoolRegistration) => Effect.Effect<any, PoolRegistrationError> = Effect.fn(
  (instance: CML.PoolRegistration) =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.toJsValue failed PoolRegistration is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.PoolRegistration): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of PoolRegistration
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson: (json: string) => Effect.Effect<CML.PoolRegistration, PoolRegistrationError> = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.PoolRegistration.from_json(json),
    catch: () => new PoolRegistrationError({
      message: `PoolRegistration.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls PoolRegistration.fromJson without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string): CML.PoolRegistration =>
  Effect.runSync(fromJson(json));

/**
 * Method poolParams of PoolRegistration
 * 
 * @since 2.0.0
 * @category Methods
 */
export const poolParams: (instance: CML.PoolRegistration) => Effect.Effect<CML.PoolParams, PoolRegistrationError> = Effect.fn(
  (instance: CML.PoolRegistration) =>
    Effect.try({
      try: () => instance.pool_params(),
      catch: () =>
        new PoolRegistrationError({
          message: `PoolRegistration.poolParams failed `,
        }),
    })
);

/**
 * Unsafely calls instance.poolParams without Effect wrapper
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolParamsUnsafe = (instance: CML.PoolRegistration): CML.PoolParams =>
  Effect.runSync(poolParams(instance));

/**
 * Static method _new of PoolRegistration
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new: (poolParams: CML.PoolParams) => Effect.Effect<CML.PoolRegistration, PoolRegistrationError> = Effect.fn(function* (poolParams: CML.PoolParams) {
  return yield* Effect.try({
    try: () => CML.PoolRegistration.new(poolParams),
    catch: () => new PoolRegistrationError({
      message: `PoolRegistration._new failed with parameters: ${poolParams} (PoolParams). `,
    }),
  });
});

/**
 * Unsafely calls PoolRegistration._new without Effect wrapper
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (poolParams: CML.PoolParams): CML.PoolRegistration =>
  Effect.runSync(_new(poolParams));
