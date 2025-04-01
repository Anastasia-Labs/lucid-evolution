/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML AuthCommitteeHotCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type AuthCommitteeHotCert = CML.AuthCommitteeHotCert;

/**
 * Error class for AuthCommitteeHotCert operations
 *
 * This error is thrown when operations on AuthCommitteeHotCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class AuthCommitteeHotCertError extends Data.TaggedError(
  "AuthCommitteeHotCertError",
)<{
  message?: string;
}> {}

/**
 * Method free of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *   const result = yield* AuthCommitteeHotCert.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.AuthCommitteeHotCert,
  ): Effect.Effect<void, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.AuthCommitteeHotCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *   const result = yield* AuthCommitteeHotCert.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.AuthCommitteeHotCert,
  ): Effect.Effect<Uint8Array, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toCborBytes failed AuthCommitteeHotCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.AuthCommitteeHotCert,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *   const result = yield* AuthCommitteeHotCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.AuthCommitteeHotCert,
  ): Effect.Effect<Uint8Array, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toCanonicalCborBytes failed AuthCommitteeHotCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.AuthCommitteeHotCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AuthCommitteeHotCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.AuthCommitteeHotCert.from_cbor_bytes(cborBytes),
    catch: () =>
      new AuthCommitteeHotCertError({
        message: `AuthCommitteeHotCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls AuthCommitteeHotCert.fromCborBytes without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *   const result = yield* AuthCommitteeHotCert.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.AuthCommitteeHotCert,
  ): Effect.Effect<string, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toCborHex failed AuthCommitteeHotCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.AuthCommitteeHotCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *   const result = yield* AuthCommitteeHotCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.AuthCommitteeHotCert,
  ): Effect.Effect<string, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toCanonicalCborHex failed AuthCommitteeHotCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.AuthCommitteeHotCert,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AuthCommitteeHotCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.AuthCommitteeHotCert.from_cbor_hex(cborBytes),
    catch: () =>
      new AuthCommitteeHotCertError({
        message: `AuthCommitteeHotCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls AuthCommitteeHotCert.fromCborHex without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *   const result = yield* AuthCommitteeHotCert.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.AuthCommitteeHotCert,
  ): Effect.Effect<string, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toJson failed AuthCommitteeHotCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.AuthCommitteeHotCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *   const result = yield* AuthCommitteeHotCert.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.AuthCommitteeHotCert,
  ): Effect.Effect<any, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toJsValue failed AuthCommitteeHotCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.AuthCommitteeHotCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AuthCommitteeHotCert.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.AuthCommitteeHotCert.from_json(json),
    catch: () =>
      new AuthCommitteeHotCertError({
        message: `AuthCommitteeHotCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls AuthCommitteeHotCert.fromJson without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method committeeColdCredential of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *   const result = yield* AuthCommitteeHotCert.committeeColdCredential(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const committeeColdCredential = Effect.fn(
  (
    instance: CML.AuthCommitteeHotCert,
  ): Effect.Effect<CML.Credential, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.committee_cold_credential(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.committeeColdCredential failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.committeeColdCredential without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert.committeeColdCredentialUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.committeeColdCredentialUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeColdCredentialUnsafe = (
  instance: CML.AuthCommitteeHotCert,
): CML.Credential => Effect.runSync(committeeColdCredential(instance));

/**
 * Method committeeHotCredential of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *   const result = yield* AuthCommitteeHotCert.committeeHotCredential(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const committeeHotCredential = Effect.fn(
  (
    instance: CML.AuthCommitteeHotCert,
  ): Effect.Effect<CML.Credential, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.committee_hot_credential(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.committeeHotCredential failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.committeeHotCredential without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a AuthCommitteeHotCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert.committeeHotCredentialUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.committeeHotCredentialUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeHotCredentialUnsafe = (
  instance: CML.AuthCommitteeHotCert,
): CML.Credential => Effect.runSync(committeeHotCredential(instance));

/**
 * Static method _new of AuthCommitteeHotCert
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* AuthCommitteeHotCert._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  committeeColdCredential: CML.Credential,
  committeeHotCredential: CML.Credential,
) {
  return yield* Effect.try({
    try: () =>
      CML.AuthCommitteeHotCert.new(
        committeeColdCredential,
        committeeHotCredential,
      ),
    catch: () =>
      new AuthCommitteeHotCertError({
        message: `AuthCommitteeHotCert._new failed with parameters: ${committeeColdCredential} (Credential), ${committeeHotCredential} (Credential). `,
      }),
  });
});

/**
 * Unsafely calls AuthCommitteeHotCert._new without Effect wrapper
 *
 * @example
 * import { AuthCommitteeHotCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = AuthCommitteeHotCert._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  committeeColdCredential: CML.Credential,
  committeeHotCredential: CML.Credential,
) => Effect.runSync(_new(committeeColdCredential, committeeHotCredential));
