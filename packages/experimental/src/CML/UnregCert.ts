/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML UnregCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type UnregCert = CML.UnregCert;

/**
 * Error class for UnregCert operations
 * 
 * This error is thrown when operations on UnregCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class UnregCertError extends Data.TaggedError("UnregCertError")<{
  message?: string;
}> {}

/**
 * Method free of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<void, UnregCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.UnregCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<Uint8Array, UnregCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toCborBytes failed UnregCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.UnregCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<Uint8Array, UnregCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toCanonicalCborBytes failed UnregCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.UnregCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UnregCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.UnregCert.from_cbor_bytes(cborBytes),
    catch: () => new UnregCertError({
      message: `UnregCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls UnregCert.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<string, UnregCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toCborHex failed UnregCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.UnregCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<string, UnregCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toCanonicalCborHex failed UnregCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.UnregCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UnregCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.UnregCert.from_cbor_hex(cborBytes),
    catch: () => new UnregCertError({
      message: `UnregCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls UnregCert.fromCborHex without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<string, UnregCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toJson failed UnregCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.UnregCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<any, UnregCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.toJsValue failed UnregCert is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.UnregCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UnregCert.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.UnregCert.from_json(json),
    catch: () => new UnregCertError({
      message: `UnregCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls UnregCert.fromJson without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.stakeCredential(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<CML.Credential, UnregCertError> =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.stakeCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.stakeCredentialUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.stakeCredentialUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeCredentialUnsafe = (instance: CML.UnregCert): CML.Credential =>
  Effect.runSync(stakeCredential(instance));

/**
 * Method deposit of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 *   const result = yield* UnregCert.deposit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const deposit = Effect.fn(
  (instance: CML.UnregCert): Effect.Effect<bigint, UnregCertError> =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new UnregCertError({
          message: `UnregCert.deposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert.depositUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert.depositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const depositUnsafe = (instance: CML.UnregCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Static method _new of UnregCert
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UnregCert._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (stakeCredential: CML.Credential, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.UnregCert.new(stakeCredential, deposit),
    catch: () => new UnregCertError({
      message: `UnregCert._new failed with parameters: ${stakeCredential} (Credential), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls UnregCert._new without Effect wrapper
 * 
 * @example
 * import { UnregCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregCert._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregCert._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (stakeCredential: CML.Credential, deposit: bigint) =>
  Effect.runSync(_new(stakeCredential, deposit));
