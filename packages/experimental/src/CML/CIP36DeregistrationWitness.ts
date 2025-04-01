/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CIP36DeregistrationWitness class
 *
 * @since 2.0.0
 * @category Types
 */
export type CIP36DeregistrationWitness = CML.CIP36DeregistrationWitness;

/**
 * Error class for CIP36DeregistrationWitness operations
 *
 * This error is thrown when operations on CIP36DeregistrationWitness instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CIP36DeregistrationWitnessError extends Data.TaggedError(
  "CIP36DeregistrationWitnessError",
)<{
  message?: string;
}> {}

/**
 * Method free of CIP36DeregistrationWitness
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationWitness.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.CIP36DeregistrationWitness,
  ): Effect.Effect<void, CIP36DeregistrationWitnessError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CIP36DeregistrationWitnessError({
          message: `CIP36DeregistrationWitness.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationWitness.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationWitness.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CIP36DeregistrationWitness): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of CIP36DeregistrationWitness
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationWitness.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.CIP36DeregistrationWitness,
  ): Effect.Effect<Uint8Array, CIP36DeregistrationWitnessError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new CIP36DeregistrationWitnessError({
          message: `CIP36DeregistrationWitness.toCborBytes failed CIP36DeregistrationWitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationWitness.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationWitness.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.CIP36DeregistrationWitness,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Method toCanonicalCborBytes of CIP36DeregistrationWitness
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationWitness.toCanonicalCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborBytes = Effect.fn(
  (
    instance: CML.CIP36DeregistrationWitness,
  ): Effect.Effect<Uint8Array, CIP36DeregistrationWitnessError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_bytes(),
      catch: () =>
        new CIP36DeregistrationWitnessError({
          message: `CIP36DeregistrationWitness.toCanonicalCborBytes failed CIP36DeregistrationWitness is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborBytes without Effect wrapper
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationWitness.toCanonicalCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationWitness.toCanonicalCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborBytesUnsafe = (
  instance: CML.CIP36DeregistrationWitness,
): Uint8Array => Effect.runSync(toCanonicalCborBytes(instance));

/**
 * Static method fromCborBytes of CIP36DeregistrationWitness
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36DeregistrationWitness.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.CIP36DeregistrationWitness.from_cbor_bytes(cborBytes),
    catch: () =>
      new CIP36DeregistrationWitnessError({
        message: `CIP36DeregistrationWitness.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls CIP36DeregistrationWitness.fromCborBytes without Effect wrapper
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationWitness.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationWitness.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of CIP36DeregistrationWitness
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationWitness.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.CIP36DeregistrationWitness,
  ): Effect.Effect<string, CIP36DeregistrationWitnessError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new CIP36DeregistrationWitnessError({
          message: `CIP36DeregistrationWitness.toCborHex failed CIP36DeregistrationWitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationWitness.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationWitness.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (
  instance: CML.CIP36DeregistrationWitness,
): string => Effect.runSync(toCborHex(instance));

/**
 * Method toCanonicalCborHex of CIP36DeregistrationWitness
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationWitness.toCanonicalCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCanonicalCborHex = Effect.fn(
  (
    instance: CML.CIP36DeregistrationWitness,
  ): Effect.Effect<string, CIP36DeregistrationWitnessError> =>
    Effect.try({
      try: () => instance.to_canonical_cbor_hex(),
      catch: () =>
        new CIP36DeregistrationWitnessError({
          message: `CIP36DeregistrationWitness.toCanonicalCborHex failed CIP36DeregistrationWitness is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCanonicalCborHex without Effect wrapper
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationWitness.toCanonicalCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationWitness.toCanonicalCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCanonicalCborHexUnsafe = (
  instance: CML.CIP36DeregistrationWitness,
): string => Effect.runSync(toCanonicalCborHex(instance));

/**
 * Static method fromCborHex of CIP36DeregistrationWitness
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36DeregistrationWitness.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.CIP36DeregistrationWitness.from_cbor_hex(cborBytes),
    catch: () =>
      new CIP36DeregistrationWitnessError({
        message: `CIP36DeregistrationWitness.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls CIP36DeregistrationWitness.fromCborHex without Effect wrapper
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationWitness.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationWitness.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Method toJson of CIP36DeregistrationWitness
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationWitness.toJson(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJson = Effect.fn(
  (
    instance: CML.CIP36DeregistrationWitness,
  ): Effect.Effect<string, CIP36DeregistrationWitnessError> =>
    Effect.try({
      try: () => instance.to_json(),
      catch: () =>
        new CIP36DeregistrationWitnessError({
          message: `CIP36DeregistrationWitness.toJson failed CIP36DeregistrationWitness is not valid for string conversion. Hint: Validate your JSON structure.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toJson without Effect wrapper
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationWitness.toJsonUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationWitness.toJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsonUnsafe = (
  instance: CML.CIP36DeregistrationWitness,
): string => Effect.runSync(toJson(instance));

/**
 * Method toJsValue of CIP36DeregistrationWitness
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationWitness.toJsValue(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toJsValue = Effect.fn(
  (
    instance: CML.CIP36DeregistrationWitness,
  ): Effect.Effect<any, CIP36DeregistrationWitnessError> =>
    Effect.try({
      try: () => instance.to_js_value(),
      catch: () =>
        new CIP36DeregistrationWitnessError({
          message: `CIP36DeregistrationWitness.toJsValue failed CIP36DeregistrationWitness is not valid for any conversion. `,
        }),
    }),
);

/**
 * Unsafely calls instance.toJsValue without Effect wrapper
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationWitness.toJsValueUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationWitness.toJsValueUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toJsValueUnsafe = (
  instance: CML.CIP36DeregistrationWitness,
): any => Effect.runSync(toJsValue(instance));

/**
 * Static method fromJson of CIP36DeregistrationWitness
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36DeregistrationWitness.fromJson( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromJson = Effect.fn(function* (json: string) {
  return yield* Effect.try({
    try: () => CML.CIP36DeregistrationWitness.from_json(json),
    catch: () =>
      new CIP36DeregistrationWitnessError({
        message: `CIP36DeregistrationWitness.fromJson failed with parameters: ${json}. Hint: Validate your JSON structure.`,
      }),
  });
});

/**
 * Unsafely calls CIP36DeregistrationWitness.fromJson without Effect wrapper
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationWitness.fromJsonUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationWitness.fromJsonUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromJsonUnsafe = (json: string) => Effect.runSync(fromJson(json));

/**
 * Method stakeWitness of CIP36DeregistrationWitness
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *   const result = yield* CIP36DeregistrationWitness.stakeWitness(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const stakeWitness = Effect.fn(
  (
    instance: CML.CIP36DeregistrationWitness,
  ): Effect.Effect<CML.Ed25519Signature, CIP36DeregistrationWitnessError> =>
    Effect.try({
      try: () => instance.stake_witness(),
      catch: () =>
        new CIP36DeregistrationWitnessError({
          message: `CIP36DeregistrationWitness.stakeWitness failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.stakeWitness without Effect wrapper
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CIP36DeregistrationWitness instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationWitness.stakeWitnessUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationWitness.stakeWitnessUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const stakeWitnessUnsafe = (
  instance: CML.CIP36DeregistrationWitness,
): CML.Ed25519Signature => Effect.runSync(stakeWitness(instance));

/**
 * Static method _new of CIP36DeregistrationWitness
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* CIP36DeregistrationWitness._new( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const _new = Effect.fn(function* (stakeWitness: CML.Ed25519Signature) {
  return yield* Effect.try({
    try: () => CML.CIP36DeregistrationWitness.new(stakeWitness),
    catch: () =>
      new CIP36DeregistrationWitnessError({
        message: `CIP36DeregistrationWitness._new failed with parameters: ${stakeWitness} (Ed25519Signature). `,
      }),
  });
});

/**
 * Unsafely calls CIP36DeregistrationWitness._new without Effect wrapper
 *
 * @example
 * import { CIP36DeregistrationWitness } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CIP36DeregistrationWitness._newUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CIP36DeregistrationWitness._newUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const _newUnsafe = (stakeWitness: CML.Ed25519Signature) =>
  Effect.runSync(_new(stakeWitness));
