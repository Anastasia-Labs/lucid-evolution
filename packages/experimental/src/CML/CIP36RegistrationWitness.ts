/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP36RegistrationWitness class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP36RegistrationWitness = CML.CIP36RegistrationWitness;

/**
 * Error class for CIP36RegistrationWitness operations
 *
 * This error is thrown when operations on CIP36RegistrationWitness instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP36RegistrationWitnessError extends Data.TaggedError(
  "CIP36RegistrationWitnessError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP36RegistrationWitness
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationWitness.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.CIP36RegistrationWitness,
  ): Effect.Effect<void, CIP36RegistrationWitnessError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationWitness.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationWitness.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP36RegistrationWitness): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP36RegistrationWitness
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationWitness.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.CIP36RegistrationWitness,
  ): Effect.Effect<Uint8Array, CIP36RegistrationWitnessError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.toCborBytes failed CIP36RegistrationWitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationWitness.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationWitness.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.CIP36RegistrationWitness,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of CIP36RegistrationWitness
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationWitness.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.CIP36RegistrationWitness,
  ): Effect.Effect<Uint8Array, CIP36RegistrationWitnessError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.toCanonicalCborBytes failed CIP36RegistrationWitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationWitness.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationWitness.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.CIP36RegistrationWitness,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of CIP36RegistrationWitness
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36RegistrationWitness.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP36RegistrationWitness.from_cbor_bytes(cborBytes),
    catch: () =>
      new CIP36RegistrationWitnessError({
        message: `CIP36RegistrationWitness.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls CIP36RegistrationWitness.fromCborBytes without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationWitness.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationWitness.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP36RegistrationWitness
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationWitness.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.CIP36RegistrationWitness,
  ): Effect.Effect<string, CIP36RegistrationWitnessError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.toCborHex failed CIP36RegistrationWitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationWitness.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationWitness.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (
  instance: CML.CIP36RegistrationWitness,
): string => Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of CIP36RegistrationWitness
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationWitness.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.CIP36RegistrationWitness,
  ): Effect.Effect<string, CIP36RegistrationWitnessError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.toCanonicalCborHex failed CIP36RegistrationWitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationWitness.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationWitness.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.CIP36RegistrationWitness,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of CIP36RegistrationWitness
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36RegistrationWitness.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP36RegistrationWitness.from_cbor_hex(cborBytes),
    catch: () =>
      new CIP36RegistrationWitnessError({
        message: `CIP36RegistrationWitness.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls CIP36RegistrationWitness.fromCborHex without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationWitness.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationWitness.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP36RegistrationWitness
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationWitness.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.CIP36RegistrationWitness,
  ): Effect.Effect<string, CIP36RegistrationWitnessError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.toJson failed CIP36RegistrationWitness is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationWitness.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationWitness.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (instance: CML.CIP36RegistrationWitness): string =>
  Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36RegistrationWitness
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationWitness.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.CIP36RegistrationWitness,
  ): Effect.Effect<any, CIP36RegistrationWitnessError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.toJsValue failed CIP36RegistrationWitness is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationWitness.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationWitness.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (instance: CML.CIP36RegistrationWitness): any =>
  Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36RegistrationWitness
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36RegistrationWitness.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP36RegistrationWitness.from_json(json),
    catch: () =>
      new CIP36RegistrationWitnessError({
        message: `CIP36RegistrationWitness.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls CIP36RegistrationWitness.fromJson without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationWitness.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationWitness.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method stakeWitness of CIP36RegistrationWitness
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36RegistrationWitness.stakeWitness(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeWitness = Effect.fn(
  (
    instance: CML.CIP36RegistrationWitness,
  ): Effect.Effect<CML.Ed25519Signature, CIP36RegistrationWitnessError> =>
    Effect.try({
      try: () => instance.stake_witness(),
      catch: () =>
        new CIP36RegistrationWitnessError({
          message: `CIP36RegistrationWitness.stakeWitness failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.stakeWitness without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36RegistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationWitness.stakeWitnessUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationWitness.stakeWitnessUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeWitnessUnsafe = (
  instance: CML.CIP36RegistrationWitness,
): CML.Ed25519Signature => Effect.runSync(stakeWitness(instance));

/**
 * Static method _new of CIP36RegistrationWitness
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36RegistrationWitness._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (stakeWitness: CML.Ed25519Signature) {
  return yield* Effect.try({
    try: () => CML.CIP36RegistrationWitness.new(stakeWitness),
    catch: () =>
      new CIP36RegistrationWitnessError({
        message: `CIP36RegistrationWitness._new failed with parameters: ${stakeWitness} (Ed25519Signature). `,
      }),
  });
});

/**
 * Unsafely calls CIP36RegistrationWitness._new without Effect wrapper
 *
 * @example
 * import { CIP36RegistrationWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36RegistrationWitness._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36RegistrationWitness._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (stakeWitness: CML.Ed25519Signature) =>
  Effect.runSync(_new(stakeWitness));
