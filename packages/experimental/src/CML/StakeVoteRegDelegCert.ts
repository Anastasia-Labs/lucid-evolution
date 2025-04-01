/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeVoteRegDelegCert class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeVoteRegDelegCert = CML.StakeVoteRegDelegCert;

/**
 * Error class for StakeVoteRegDelegCert operations
 *
 * This error is thrown when operations on StakeVoteRegDelegCert instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeVoteRegDelegCertError extends Data.TaggedError(
  "StakeVoteRegDelegCertError",
)<{
  message?: string;
}> {}

/**
 * Method free of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.StakeVoteRegDelegCert,
  ): Effect.Effect<void, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeVoteRegDelegCert): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.StakeVoteRegDelegCert,
  ): Effect.Effect<Uint8Array, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toCborBytes failed StakeVoteRegDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.StakeVoteRegDelegCert,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.StakeVoteRegDelegCert,
  ): Effect.Effect<Uint8Array, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toCanonicalCborBytes failed StakeVoteRegDelegCert is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.StakeVoteRegDelegCert,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* StakeVoteRegDelegCert.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.StakeVoteRegDelegCert.from_cbor_bytes(cborBytes),
    catch: () =>
      new StakeVoteRegDelegCertError({
        message: `StakeVoteRegDelegCert.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls StakeVoteRegDelegCert.fromCborBytes without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.StakeVoteRegDelegCert,
  ): Effect.Effect<string, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toCborHex failed StakeVoteRegDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.StakeVoteRegDelegCert): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.StakeVoteRegDelegCert,
  ): Effect.Effect<string, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toCanonicalCborHex failed StakeVoteRegDelegCert is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.StakeVoteRegDelegCert,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* StakeVoteRegDelegCert.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.StakeVoteRegDelegCert.from_cbor_hex(cborBytes),
    catch: () =>
      new StakeVoteRegDelegCertError({
        message: `StakeVoteRegDelegCert.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls StakeVoteRegDelegCert.fromCborHex without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.StakeVoteRegDelegCert,
  ): Effect.Effect<string, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toJson failed StakeVoteRegDelegCert is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.StakeVoteRegDelegCert): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.StakeVoteRegDelegCert,
  ): Effect.Effect<any, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.toJsValue failed StakeVoteRegDelegCert is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.StakeVoteRegDelegCert): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* StakeVoteRegDelegCert.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.StakeVoteRegDelegCert.from_json(json),
    catch: () =>
      new StakeVoteRegDelegCertError({
        message: `StakeVoteRegDelegCert.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls StakeVoteRegDelegCert.fromJson without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method stakeCredential of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.stakeCredential(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeCredential = Effect.fn(
  (
    instance: CML.StakeVoteRegDelegCert,
  ): Effect.Effect<CML.Credential, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.stake_credential(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.stakeCredential failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.stakeCredential without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.stakeCredentialUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.stakeCredentialUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeCredentialUnsafe = (
  instance: CML.StakeVoteRegDelegCert,
): CML.Credential => Effect.runSync(stakeCredential(instance));

/**
 * Method pool of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.pool(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const pool = Effect.fn(
  (
    instance: CML.StakeVoteRegDelegCert,
  ): Effect.Effect<CML.Ed25519KeyHash, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.pool(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.pool failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.pool without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.poolUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.poolUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const poolUnsafe = (
  instance: CML.StakeVoteRegDelegCert,
): CML.Ed25519KeyHash => Effect.runSync(pool(instance));

/**
 * Method dRep of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.dRep(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const dRep = Effect.fn(
  (
    instance: CML.StakeVoteRegDelegCert,
  ): Effect.Effect<CML.DRep, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.d_rep(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.dRep failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.dRep without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.dRepUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.dRepUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const dRepUnsafe = (instance: CML.StakeVoteRegDelegCert): CML.DRep =>
  Effect.runSync(dRep(instance));

/**
 * Method deposit of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *   const result = yield* StakeVoteRegDelegCert.deposit(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const deposit = Effect.fn(
  (
    instance: CML.StakeVoteRegDelegCert,
  ): Effect.Effect<bigint, StakeVoteRegDelegCertError> =>
    Effect.try({
      try: () => instance.deposit(),
      catch: () =>
        new StakeVoteRegDelegCertError({
          message: `StakeVoteRegDelegCert.deposit failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.deposit without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeVoteRegDelegCert instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert.depositUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert.depositUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const depositUnsafe = (instance: CML.StakeVoteRegDelegCert): bigint =>
  Effect.runSync(deposit(instance));

/**
 * Static method _new of StakeVoteRegDelegCert
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* StakeVoteRegDelegCert._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
  deposit: bigint,
) {
  return yield* Effect.try({
    try: () =>
      CML.StakeVoteRegDelegCert.new(stakeCredential, pool, dRep, deposit),
    catch: () =>
      new StakeVoteRegDelegCertError({
        message: `StakeVoteRegDelegCert._new failed with parameters: ${stakeCredential} (Credential), ${pool} (Ed25519KeyHash), ${dRep} (DRep), ${deposit}. `,
      }),
  });
});

/**
 * Unsafely calls StakeVoteRegDelegCert._new without Effect wrapper
 *
 * @example
 * import { StakeVoteRegDelegCert } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeVoteRegDelegCert._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeVoteRegDelegCert._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (
  stakeCredential: CML.Credential,
  pool: CML.Ed25519KeyHash,
  dRep: CML.DRep,
  deposit: bigint,
) => Effect.runSync(_new(stakeCredential, pool, dRep, deposit));
