/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML StakeDistribution class
 *
 * @since 2.0.0
 * @category Types
 */
export type StakeDistribution = CML.StakeDistribution;

/**
 * Error class for StakeDistribution operations
 *
 * This error is thrown when operations on StakeDistribution instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class StakeDistributionError extends Data.TaggedError(
  "StakeDistributionError",
)<{
  message?: string;
}> {}

/**
 * Method free of StakeDistribution
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *   const result = yield* StakeDistribution.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.StakeDistribution,
  ): Effect.Effect<void, StakeDistributionError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.freeUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.freeUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.StakeDistribution): void =>
  Effect.runSync(free(instance));

/**
 * Method toCborBytes of StakeDistribution
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *   const result = yield* StakeDistribution.toCborBytes(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborBytes = Effect.fn(
  (
    instance: CML.StakeDistribution,
  ): Effect.Effect<Uint8Array, StakeDistributionError> =>
    Effect.try({
      try: () => instance.to_cbor_bytes(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.toCborBytes failed StakeDistribution is not valid for Uint8Array conversion. Hint: Check byte length and encoding.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborBytes without Effect wrapper
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.toCborBytesUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.toCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborBytesUnsafe = (
  instance: CML.StakeDistribution,
): Uint8Array => Effect.runSync(toCborBytes(instance));

/**
 * Static method fromCborBytes of StakeDistribution
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* StakeDistribution.fromCborBytes( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborBytes = Effect.fn(function* (cborBytes: Uint8Array) {
  return yield* Effect.try({
    try: () => CML.StakeDistribution.from_cbor_bytes(cborBytes),
    catch: () =>
      new StakeDistributionError({
        message: `StakeDistribution.fromCborBytes failed with parameters: ${cborBytes}. Hint: Check byte length and encoding.`,
      }),
  });
});

/**
 * Unsafely calls StakeDistribution.fromCborBytes without Effect wrapper
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.fromCborBytesUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.fromCborBytesUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborBytesUnsafe = (cborBytes: Uint8Array) =>
  Effect.runSync(fromCborBytes(cborBytes));

/**
 * Method toCborHex of StakeDistribution
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *   const result = yield* StakeDistribution.toCborHex(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const toCborHex = Effect.fn(
  (
    instance: CML.StakeDistribution,
  ): Effect.Effect<string, StakeDistributionError> =>
    Effect.try({
      try: () => instance.to_cbor_hex(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.toCborHex failed StakeDistribution is not valid for string conversion. Hint: Make sure it's a valid hex string representing CBOR data.`,
        }),
    }),
);

/**
 * Unsafely calls instance.toCborHex without Effect wrapper
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.toCborHexUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.toCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const toCborHexUnsafe = (instance: CML.StakeDistribution): string =>
  Effect.runSync(toCborHex(instance));

/**
 * Static method fromCborHex of StakeDistribution
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* StakeDistribution.fromCborHex( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const fromCborHex = Effect.fn(function* (cborBytes: string) {
  return yield* Effect.try({
    try: () => CML.StakeDistribution.from_cbor_hex(cborBytes),
    catch: () =>
      new StakeDistributionError({
        message: `StakeDistribution.fromCborHex failed with parameters: ${cborBytes}. Hint: Make sure it's a valid hex string representing CBOR data.`,
      }),
  });
});

/**
 * Unsafely calls StakeDistribution.fromCborHex without Effect wrapper
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.fromCborHexUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.fromCborHexUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const fromCborHexUnsafe = (cborBytes: string) =>
  Effect.runSync(fromCborHex(cborBytes));

/**
 * Static method newSingleKey of StakeDistribution
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* StakeDistribution.newSingleKey( parameters );
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newSingleKey = Effect.fn(function* (
  stakeholderId: CML.StakeholderId,
) {
  return yield* Effect.try({
    try: () => CML.StakeDistribution.new_single_key(stakeholderId),
    catch: () =>
      new StakeDistributionError({
        message: `StakeDistribution.newSingleKey failed with parameters: ${stakeholderId} (StakeholderId). `,
      }),
  });
});

/**
 * Unsafely calls StakeDistribution.newSingleKey without Effect wrapper
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.newSingleKeyUnsafe( parameters );
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.newSingleKeyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newSingleKeyUnsafe = (stakeholderId: CML.StakeholderId) =>
  Effect.runSync(newSingleKey(stakeholderId));

/**
 * Static method newBootstrapEra of StakeDistribution
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *
 *   const result = yield* StakeDistribution.newBootstrapEra();
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Constructors
 */
export const newBootstrapEra = Effect.fn(function* () {
  return yield* Effect.try({
    try: () => CML.StakeDistribution.new_bootstrap_era(),
    catch: () =>
      new StakeDistributionError({
        message: `StakeDistribution.newBootstrapEra failed Hint: Not all StakeDistribution instances can be stringified.`,
      }),
  });
});

/**
 * Unsafely calls StakeDistribution.newBootstrapEra without Effect wrapper
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 *
 *
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.newBootstrapEraUnsafe();
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.newBootstrapEraUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category ConstructorsUnsafe
 */
export const newBootstrapEraUnsafe = () => Effect.runSync(newBootstrapEra());

/**
 * Method kind of StakeDistribution
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *   const result = yield* StakeDistribution.kind(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const kind = Effect.fn(
  (
    instance: CML.StakeDistribution,
  ): Effect.Effect<CML.StakeDistributionKind, StakeDistributionError> =>
    Effect.try({
      try: () => instance.kind(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.kind failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.kind without Effect wrapper
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.kindUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.kindUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const kindUnsafe = (
  instance: CML.StakeDistribution,
): CML.StakeDistributionKind => Effect.runSync(kind(instance));

/**
 * Method asSingleKey of StakeDistribution
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *   const result = yield* StakeDistribution.asSingleKey(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const asSingleKey = Effect.fn(
  (
    instance: CML.StakeDistribution,
  ): Effect.Effect<CML.StakeholderId | undefined, StakeDistributionError> =>
    Effect.try({
      try: () => instance.as_single_key(),
      catch: () =>
        new StakeDistributionError({
          message: `StakeDistribution.asSingleKey failed `,
        }),
    }),
);

/**
 * Unsafely calls instance.asSingleKey without Effect wrapper
 *
 * @example
 * import { StakeDistribution } from "@lucid-evolution/experimental";
 *
 * // Assume we have a StakeDistribution instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = StakeDistribution.asSingleKeyUnsafe(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`StakeDistribution.asSingleKeyUnsafe failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const asSingleKeyUnsafe = (
  instance: CML.StakeDistribution,
): CML.StakeholderId | undefined => Effect.runSync(asSingleKey(instance));
