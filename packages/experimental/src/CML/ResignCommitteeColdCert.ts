/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML ResignCommitteeColdCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type ResignCommitteeColdCert = CML.ResignCommitteeColdCert;

/**
 * Error class for ResignCommitteeColdCert operations
 *
 * This error is thrown when operations on ResignCommitteeColdCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class ResignCommitteeColdCertError extends Data.TaggedError(
  "ResignCommitteeColdCertError",
)<{
  message?: string;
}> {}

/**
 * Method free of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *   const result = yield* ResignCommitteeColdCert.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.ResignCommitteeColdCert,
  ): Effect.Effect<void, ResignCommitteeColdCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.ResignCommitteeColdCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *   const result = yield* ResignCommitteeColdCert.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.ResignCommitteeColdCert,
  ): Effect.Effect<Uint8Array, ResignCommitteeColdCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.toCborBytes failed ResignCommitteeColdCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.ResignCommitteeColdCert,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *   const result = yield* ResignCommitteeColdCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.ResignCommitteeColdCert,
  ): Effect.Effect<Uint8Array, ResignCommitteeColdCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.toCanonicalCborBytes failed ResignCommitteeColdCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.ResignCommitteeColdCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ResignCommitteeColdCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.ResignCommitteeColdCert.from_cbor_bytes(cborBytes),
    catch: () =>
      new ResignCommitteeColdCertError({
        message: `ResignCommitteeColdCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls ResignCommitteeColdCert.fromCborBytes without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *   const result = yield* ResignCommitteeColdCert.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.ResignCommitteeColdCert,
  ): Effect.Effect<string, ResignCommitteeColdCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.toCborHex failed ResignCommitteeColdCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (
  instance: CML.ResignCommitteeColdCert,
): string => Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *   const result = yield* ResignCommitteeColdCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.ResignCommitteeColdCert,
  ): Effect.Effect<string, ResignCommitteeColdCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.toCanonicalCborHex failed ResignCommitteeColdCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.ResignCommitteeColdCert,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ResignCommitteeColdCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.ResignCommitteeColdCert.from_cbor_hex(cborBytes),
    catch: () =>
      new ResignCommitteeColdCertError({
        message: `ResignCommitteeColdCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls ResignCommitteeColdCert.fromCborHex without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *   const result = yield* ResignCommitteeColdCert.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.ResignCommitteeColdCert,
  ): Effect.Effect<string, ResignCommitteeColdCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.toJson failed ResignCommitteeColdCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.ResignCommitteeColdCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *   const result = yield* ResignCommitteeColdCert.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.ResignCommitteeColdCert,
  ): Effect.Effect<any, ResignCommitteeColdCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.toJsValue failed ResignCommitteeColdCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.ResignCommitteeColdCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ResignCommitteeColdCert.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.ResignCommitteeColdCert.from_json(json),
    catch: () =>
      new ResignCommitteeColdCertError({
        message: `ResignCommitteeColdCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls ResignCommitteeColdCert.fromJson without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method committeeColdCredential of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *   const result = yield* ResignCommitteeColdCert.committeeColdCredential(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const committeeColdCredential = Effect.fn(
  (
    instance: CML.ResignCommitteeColdCert,
  ): Effect.Effect<CML.Credential, ResignCommitteeColdCertError> =>
    Effect.try({
      try: () => instance.committee_cold_credential(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.committeeColdCredential failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.committeeColdCredential without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert.committeeColdCredentialUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert.committeeColdCredentialUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const committeeColdCredentialUnsafe = (
  instance: CML.ResignCommitteeColdCert,
): CML.Credential => Effect.runSync(committeeColdCredential(instance));

/**
 * Method anchor of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *   const result = yield* ResignCommitteeColdCert.anchor(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const anchor = Effect.fn(
  (
    instance: CML.ResignCommitteeColdCert,
  ): Effect.Effect<CML.Anchor | undefined, ResignCommitteeColdCertError> =>
    Effect.try({
      try: () => instance.anchor(),
      catch: () =>
        new ResignCommitteeColdCertError({
          message: `ResignCommitteeColdCert.anchor failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.anchor without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a ResignCommitteeColdCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert.anchorUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert.anchorUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const anchorUnsafe = (
  instance: CML.ResignCommitteeColdCert,
): CML.Anchor | undefined => Effect.runSync(anchor(instance));

/**
 * Static method _new of ResignCommitteeColdCert
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* ResignCommitteeColdCert._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  committeeColdCredential: CML.Credential,
  anchor: CML.Anchor,
) {
  return yield* Effect.try({
    try: () => CML.ResignCommitteeColdCert.new(committeeColdCredential, anchor),
    catch: () =>
      new ResignCommitteeColdCertError({
        message: `ResignCommitteeColdCert._new failed with parameters: ${committeeColdCredential} (Credential), ${anchor} (Anchor). `,
      }),
  });
});

/**
 * Unsafely calls ResignCommitteeColdCert._new without Effect wrapper
 *
 * @example
 * import { ResignCommitteeColdCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = ResignCommitteeColdCert._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`ResignCommitteeColdCert._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  committeeColdCredential: CML.Credential,
  anchor: CML.Anchor,
) => Effect.runSync(_new(committeeColdCredential, anchor));
