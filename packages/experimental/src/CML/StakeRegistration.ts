/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeRegistration class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeRegistration = CML.StakeRegistration;

/**
 * Error class for StakeRegistration operations
 * 
 * This error is thrown when operations on StakeRegistration instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeRegistrationError extends Data.TaggedError("StakeRegistrationError")<{
  message?: string;
}> {}

/**
 * Method free of StakeRegistration
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 *   const result = yield* StakeRegistration.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.StakeRegistration): Effect.Effect<void, StakeRegistrationError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeRegistrationError({
          message: `StakeRegistration.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeRegistration.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeRegistration.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeRegistration): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeRegistration
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 *   const result = yield* StakeRegistration.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.StakeRegistration): Effect.Effect<Uint8Array, StakeRegistrationError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new StakeRegistrationError({
          message: `StakeRegistration.toCborBytes failed StakeRegistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeRegistration.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeRegistration.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.StakeRegistration): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of StakeRegistration
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 *   const result = yield* StakeRegistration.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.StakeRegistration): Effect.Effect<Uint8Array, StakeRegistrationError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new StakeRegistrationError({
          message: `StakeRegistration.toCanonicalCborBytes failed StakeRegistration is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeRegistration.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeRegistration.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.StakeRegistration): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of StakeRegistration
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeRegistration.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.StakeRegistration.from_cbor_bytes(cborBytes),
    catch: () => new StakeRegistrationError({
      message: `StakeRegistration.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls StakeRegistration.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeRegistration.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeRegistration.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeRegistration
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 *   const result = yield* StakeRegistration.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.StakeRegistration): Effect.Effect<string, StakeRegistrationError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new StakeRegistrationError({
          message: `StakeRegistration.toCborHex failed StakeRegistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeRegistration.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeRegistration.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.StakeRegistration): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of StakeRegistration
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 *   const result = yield* StakeRegistration.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.StakeRegistration): Effect.Effect<string, StakeRegistrationError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new StakeRegistrationError({
          message: `StakeRegistration.toCanonicalCborHex failed StakeRegistration is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeRegistration.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeRegistration.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.StakeRegistration): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of StakeRegistration
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeRegistration.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.StakeRegistration.from_cbor_hex(cborBytes),
    catch: () => new StakeRegistrationError({
      message: `StakeRegistration.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls StakeRegistration.fromCborHex without Effect wrapper
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeRegistration.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeRegistration.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of StakeRegistration
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 *   const result = yield* StakeRegistration.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.StakeRegistration): Effect.Effect<string, StakeRegistrationError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new StakeRegistrationError({
          message: `StakeRegistration.toJson failed StakeRegistration is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeRegistration.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeRegistration.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.StakeRegistration): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of StakeRegistration
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 *   const result = yield* StakeRegistration.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.StakeRegistration): Effect.Effect<any, StakeRegistrationError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new StakeRegistrationError({
          message: `StakeRegistration.toJsValue failed StakeRegistration is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeRegistration.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeRegistration.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.StakeRegistration): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of StakeRegistration
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeRegistration.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.StakeRegistration.from_json(json),
    catch: () => new StakeRegistrationError({
      message: `StakeRegistration.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls StakeRegistration.fromJson without Effect wrapper
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeRegistration.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeRegistration.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of StakeRegistration
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 *   const result = yield* StakeRegistration.stakeCredential(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential = Effect.fn(
  (instance: CML.StakeRegistration): Effect.Effect<CML.Credential, StakeRegistrationError> =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new StakeRegistrationError({
          message: `StakeRegistration.stakeCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a StakeRegistration instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeRegistration.stakeCredentialUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeRegistration.stakeCredentialUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeCredentialUnsafe = (instance: CML.StakeRegistration): CML.Credential =>
  Effect.runSync(stakeCredential(instance));

/**
 * Static method _new of StakeRegistration
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* StakeRegistration._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (stakeCredential: CML.Credential) {
  return yield* Effect.try({
    try: () => CML.StakeRegistration.new(stakeCredential),
    catch: () => new StakeRegistrationError({
      message: `StakeRegistration._new failed with parameters: ${stakeCredential} (Credential). `,
    }),
  });
});

/**
 * Unsafely calls StakeRegistration._new without Effect wrapper
 * 
 * @example
 * import { StakeRegistration } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = StakeRegistration._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeRegistration._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (stakeCredential: CML.Credential) =>
  Effect.runSync(_new(stakeCredential));
