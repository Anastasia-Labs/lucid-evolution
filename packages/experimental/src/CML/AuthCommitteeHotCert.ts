import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type AuthCommitteeHotCert = CML.AuthCommitteeHotCert;

export class AuthCommitteeHotCertError extends Data.TaggedError("AuthCommitteeHotCertError")<{
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
  (instance: CML.AuthCommitteeHotCert): Effect.Effect<void, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    })
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
 *   const result = AuthCommitteeHotCert.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafeFree failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.AuthCommitteeHotCert): void =>
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
  (instance: CML.AuthCommitteeHotCert): Effect.Effect<Uint8Array, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toCborBytes failed AuthCommitteeHotCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
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
 *   const result = AuthCommitteeHotCert.unsafeToCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafeToCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborBytes = (instance: CML.AuthCommitteeHotCert): Uint8Array =>
  Effect.runSync(toCborBytes(instance));

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
  (instance: CML.AuthCommitteeHotCert): Effect.Effect<Uint8Array, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toCanonicalCborBytes failed AuthCommitteeHotCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    })
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
 *   const result = AuthCommitteeHotCert.unsafeToCanonicalCborBytes(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafeToCanonicalCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborBytes = (instance: CML.AuthCommitteeHotCert): Uint8Array =>
  Effect.runSync(toCanonicalCborBytes(instance));

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
    catch: () => new AuthCommitteeHotCertError({
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
 *   const result = AuthCommitteeHotCert.unsafeFromCborBytes( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafeFromCborBytes failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborBytes = (cborBytes: Uint8Array) =>
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
  (instance: CML.AuthCommitteeHotCert): Effect.Effect<string, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toCborHex failed AuthCommitteeHotCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
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
 *   const result = AuthCommitteeHotCert.unsafeToCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafeToCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCborHex = (instance: CML.AuthCommitteeHotCert): string =>
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
  (instance: CML.AuthCommitteeHotCert): Effect.Effect<string, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toCanonicalCborHex failed AuthCommitteeHotCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    })
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
 *   const result = AuthCommitteeHotCert.unsafeToCanonicalCborHex(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafeToCanonicalCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToCanonicalCborHex = (instance: CML.AuthCommitteeHotCert): string =>
  Effect.runSync(toCanonicalCborHex(instance));

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
    catch: () => new AuthCommitteeHotCertError({
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
 *   const result = AuthCommitteeHotCert.unsafeFromCborHex( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafeFromCborHex failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromCborHex = (cborBytes: string) =>
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
  (instance: CML.AuthCommitteeHotCert): Effect.Effect<string, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toJson failed AuthCommitteeHotCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    })
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
 *   const result = AuthCommitteeHotCert.unsafeToJson(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafeToJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJson = (instance: CML.AuthCommitteeHotCert): string =>
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
  (instance: CML.AuthCommitteeHotCert): Effect.Effect<any, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.toJsValue failed AuthCommitteeHotCert is not valid for any conversion. `,
        }),
    })
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
 *   const result = AuthCommitteeHotCert.unsafeToJsValue(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafeToJsValue failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeToJsValue = (instance: CML.AuthCommitteeHotCert): any =>
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
    catch: () => new AuthCommitteeHotCertError({
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
 *   const result = AuthCommitteeHotCert.unsafeFromJson( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafeFromJson failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafeFromJson = (json: string) =>
  Effect.runSync(fromJson(json));

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
  (instance: CML.AuthCommitteeHotCert): Effect.Effect<CML.Credential, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.committee_cold_credential(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.committeeColdCredential failed `,
        }),
    })
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
 *   const result = AuthCommitteeHotCert.unsafeCommitteeColdCredential(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafeCommitteeColdCredential failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCommitteeColdCredential = (instance: CML.AuthCommitteeHotCert): CML.Credential =>
  Effect.runSync(committeeColdCredential(instance));

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
  (instance: CML.AuthCommitteeHotCert): Effect.Effect<CML.Credential, AuthCommitteeHotCertError> =>
    Effect.try({
      try: () => instance.committee_hot_credential(),
      catch: () =>
        new AuthCommitteeHotCertError({
          message: `AuthCommitteeHotCert.committeeHotCredential failed `,
        }),
    })
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
 *   const result = AuthCommitteeHotCert.unsafeCommitteeHotCredential(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafeCommitteeHotCredential failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Methods
 */
export const unsafeCommitteeHotCredential = (instance: CML.AuthCommitteeHotCert): CML.Credential =>
  Effect.runSync(committeeHotCredential(instance));

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
export const _new = Effect.fn(function* (committeeColdCredential: CML.Credential, committeeHotCredential: CML.Credential) {
  return yield* Effect.try({
    try: () => CML.AuthCommitteeHotCert.new(committeeColdCredential, committeeHotCredential),
    catch: () => new AuthCommitteeHotCertError({
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
 *   const result = AuthCommitteeHotCert.unsafe_new( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`AuthCommitteeHotCert.unsafe_new failed: ${error.message}`);
 * }
 * 
 * @since 2.0.0
 * @category Constructors
 */
export const unsafe_new = (committeeColdCredential: CML.Credential, committeeHotCredential: CML.Credential) =>
  Effect.runSync(_new(committeeColdCredential, committeeHotCredential));
