/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML UnregDrepCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type UnregDrepCert = CML.UnregDrepCert;

/**
 * Error class for UnregDrepCert operations
 * 
 * This error is thrown when operations on UnregDrepCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class UnregDrepCertError extends Data.TaggedError("UnregDrepCertError")<{
  message?: string;
}> {}

/**
 * Method free of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.free(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<void, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
);

/**
 * Unsafely calls instance.free without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.freeUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.UnregDrepCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.toCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<Uint8Array, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toCborBytes failed UnregDrepCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.toCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (instance: CML.UnregDrepCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<Uint8Array, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toCanonicalCborBytes failed UnregDrepCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (instance: CML.UnregDrepCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UnregDrepCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.UnregDrepCert.from_cbor_bytes(cborBytes),
    catch: () => new UnregDrepCertError({
      message: `UnregDrepCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
    }),
  });
});

/**
 * Unsafely calls UnregDrepCert.fromCborBytes without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.toCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<string, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toCborHex failed UnregDrepCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.toCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.UnregDrepCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<string, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toCanonicalCborHex failed UnregDrepCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (instance: CML.UnregDrepCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UnregDrepCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.UnregDrepCert.from_cbor_hex(cborBytes),
    catch: () => new UnregDrepCertError({
      message: `UnregDrepCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
    }),
  });
});

/**
 * Unsafely calls UnregDrepCert.fromCborHex without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.fromCborHexUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.toJson(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<string, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toJson failed UnregDrepCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.toJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.UnregDrepCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.toJsValue(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<any, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.toJsValue failed UnregDrepCert is not valid for any conversion. `,
        }),
    })
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.toJsValueUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.UnregDrepCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UnregDrepCert.fromJson( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.UnregDrepCert.from_json(json),
    catch: () => new UnregDrepCertError({
      message: `UnregDrepCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
    }),
  });
});

/**
 * Unsafely calls UnregDrepCert.fromJson without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.fromJsonUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) =>
  Effect.runSync(fromJson(json));

/**
 * Method drepCredential of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.drepCredential(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const drepCredential = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<CML.Credential, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.drep_credential(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.drepCredential failed `,
        }),
    })
);

/**
 * Unsafely calls instance.drepCredential without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.drepCredentialUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.drepCredentialUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const drepCredentialUnsafe = (instance: CML.UnregDrepCert): CML.Credential =>
  Effect.runSync(drepCredential(instance));

/**
 * Method deposit of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 *   const result = yield* UnregDrepCert.deposit(instance);
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Methods
 */
export const deposit = Effect.fn(
  (instance: CML.UnregDrepCert): Effect.Effect<bigint, UnregDrepCertError> =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new UnregDrepCertError({
          message: `UnregDrepCert.deposit failed `,
        }),
    })
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * // Assume we have a UnregDrepCert instance
 * const instance = ... ;
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert.depositUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert.depositUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const depositUnsafe = (instance: CML.UnregDrepCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Static method _new of UnregDrepCert
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * 
 *   const result = yield* UnregDrepCert._new( parameters );
 *   console.log(result);
 * });
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (drepCredential: CML.Credential, deposit: bigint) {
  return yield* Effect.try({
    try: () => CML.UnregDrepCert.new(drepCredential, deposit),
    catch: () => new UnregDrepCertError({
      message: `UnregDrepCert._new failed with parameters: ${drepCredential} (Credential), ${deposit}. `,
    }),
  });
});

/**
 * Unsafely calls UnregDrepCert._new without Effect wrapper
 * 
 * @example
 * import { UnregDrepCert } from "@lucid-evolution/experimental";
 * 
 * 
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = UnregDrepCert._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`UnregDrepCert._newUnsafe failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (drepCredential: CML.Credential, deposit: bigint) =>
  Effect.runSync(_new(drepCredential, deposit));
